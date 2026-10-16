// Run with a local server on port 8000: node tests/browser.cjs
const { chromium, devices } = require('playwright');
const assert = require('node:assert/strict');
const baseURL = process.env.TEST_URL || 'http://127.0.0.1:8000/';
(async()=>{
 const browser=await chromium.launch({executablePath:process.env.CHROMIUM_PATH||'/usr/bin/chromium',headless:true,args:['--no-sandbox']});
 let assertions=0;const check=(value,message)=>{assert.ok(value,message);assertions++};
 for(const mobile of [false,true]){
  const context=await browser.newContext(mobile?{...devices['iPhone 13']}:{viewport:{width:1440,height:1100}});
  const page=await context.newPage();const errors=[];page.on('pageerror',e=>errors.push(e.message));page.on('console',m=>{if(m.type()==='error')errors.push(m.text())});
  await page.goto(baseURL);
  await page.evaluate(()=>document.fonts.ready);
  check(await page.evaluate(()=>document.fonts.check('15px Pretendard')),'Pretendard loaded');
  check(await page.getByRole('tab').count()===9,'nine dates including return');
  for(let i=0;i<9;i++){await page.getByRole('tab').nth(i).click();check(await page.getByRole('tab').nth(i).getAttribute('aria-selected')==='true','date selection');check(await page.locator('.event').count()>=2,'nonempty agenda');}
  check(await page.locator('#nextDay').isDisabled(),'last boundary');await page.getByRole('tab').first().click();check(await page.locator('#prevDay').isDisabled(),'first boundary');
  await page.locator('#nextDay').click();check((await page.locator('#dayKicker').innerText()).includes('10.27'),'next day');await page.locator('#prevDay').click();
  await page.getByRole('tab').first().focus();await page.keyboard.press('End');check(await page.getByRole('tab').last().getAttribute('aria-selected')==='true','keyboard End');await page.keyboard.press('Home');await page.keyboard.press('ArrowRight');check(await page.getByRole('tab').nth(1).getAttribute('aria-selected')==='true','keyboard arrows');
  await page.getByRole('tab').nth(2).click();const tour=new URL(await page.locator('#routes a').getAttribute('href'));check(tour.searchParams.get('waypoints').includes('Lempuyang'),'east route waypoint');
  await page.getByRole('tab').nth(4).click();check((await page.locator('#dayTitle').innerText()).includes('누사페니다'),'10/30 correction');const routes=await page.locator('#routes a').evaluateAll(a=>a.map(x=>x.href));check(routes.length===2&&routes.every(u=>!u.includes('Nusa')),'no driving over sea');check(await page.locator('#routes button').isDisabled(),'island route withheld');
  await page.getByRole('tab').nth(7).click();check(await page.locator('#routes button').isDisabled(),'unknown south tour withheld');
  await page.getByRole('tab').nth(5).click();check((await page.locator('#agenda').innerText()).includes('울루와뚜 쇼핑'),'default Uluwatu shopping');await page.locator('input[value=seminyak]').check();check(!(await page.locator('#agenda').innerText()).includes('울루와뚜 쇼핑'),'exclusive shopping');
  await page.getByRole('tab').nth(6).click();check((await page.locator('#agenda').innerText()).includes('Potato Head'),'optional Seminyak');const shoppingURL=new URL(await page.locator('#routes a').getAttribute('href'));check(shoppingURL.searchParams.get('waypoints').includes('Bintang')&&shoppingURL.searchParams.get('waypoints').includes('Potato Head'),'shopping route changes');check(!(await page.locator('#agenda').innerText()).includes('누사페니다'),'11/1 corrected');
  await page.locator('#checks input').first().check();await page.locator('#memo').fill('우리의 여행 메모');await page.locator('#budgets input').first().fill('120000');check((await page.locator('#total').innerText())==='120,000원','budget total');
  await page.reload();check(await page.locator('#checks input').first().isChecked(),'check persists');check(await page.locator('#memo').inputValue()==='우리의 여행 메모','memo persists');check(await page.locator('input[value=seminyak]').isChecked(),'shopping persists');check(await page.locator('#total').innerText()==='120,000원','budget persists');
  const links=await page.locator('a[target=_blank]').evaluateAll(aa=>aa.map(a=>({href:a.href,rel:a.rel})));check(links.every(a=>a.href.startsWith('https://www.google.com/maps/')&&a.rel.includes('noopener')),'safe external maps');
  check(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth),'no page overflow');check(errors.length===0,'zero console/runtime errors: '+errors.join(';'));
  await page.getByRole('tab').nth(4).click();await page.screenshot({path:`/tmp/bali-artifacts/${mobile?'iphone':'desktop'}.png`,fullPage:true});await context.close();
 }
 const ctx=await browser.newContext();await ctx.addInitScript(()=>{Object.defineProperty(window,'localStorage',{get(){throw new Error('blocked')}})});const page=await ctx.newPage();await page.route('https://cdn.jsdelivr.net/**',r=>r.fulfill({body:''}));const errors=[];page.on('pageerror',e=>errors.push(e.message));await page.goto(baseURL);await page.locator('#memo').fill('blocked storage');await page.locator('#checks input').first().check();await page.locator('input[value=seminyak]').check();check((await page.locator('#storageStatus').innerText()).includes('保存')===false&& (await page.locator('#storageStatus').innerText()).includes('저장할 수 없어요'),'storage failure reported');check(errors.length===0,'storage blocked without crash');await ctx.close();
 const bad=await browser.newContext();await bad.addInitScript(()=>localStorage.setItem('bali-2026-checks-v3','null'));const bp=await bad.newPage();await bp.goto(baseURL);check(await bp.locator('#checks input').count()===10,'malformed storage handled');await bad.close();await browser.close();console.log(`PASS: ${assertions} assertions, desktop + iPhone + storage failure. Screenshots: /tmp/bali-artifacts/`);
})().catch(e=>{console.error(e);process.exit(1)});
