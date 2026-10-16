"""Create the single-file Sites handoff from the canonical sources."""
from pathlib import Path
import base64
root = Path(__file__).resolve().parents[1]
html = (root / 'index.html').read_text()
html = html.replace('<link rel="stylesheet" href="styles.css">', '<style>\n' + (root / 'styles.css').read_text() + '\n</style>')
html = html.replace('<script defer src="app.js"></script>', '')
html = html.replace('</body>', '<script>\n' + (root / 'app.js').read_text() + '\n</script></body>')
(root / 'sites').mkdir(exist_ok=True)
font = base64.b64encode((root / 'assets/PretendardVariable.woff2').read_bytes()).decode()
html = html.replace('assets/PretendardVariable.woff2', 'data:font/woff2;base64,' + font)
license_text = (root / 'assets/Pretendard-LICENSE.txt').read_text()
html = html.replace('</head>', '<!-- Bundled Pretendard font license:\n' + license_text + '\n--></head>')
(root / 'sites/index.html').write_text(html)
print('Built sites/index.html')
