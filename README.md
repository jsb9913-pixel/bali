# Bali 2026 · 원중 & 수빈

사진 없이 일정과 여행 준비에 집중한 모바일 반응형 신혼여행 플래너입니다. 정적 HTML/CSS/JavaScript이며 설치나 빌드 없이 실행됩니다. **Render를 사용하지 않습니다.**

## 실행

```sh
cd /workspace/bali  # 다른 환경에서는 이 저장소 디렉터리
python -m http.server 8000
```

브라우저로 로컬 서버를 열거나 `index.html`을 직접 여세요. 저장은 현재 브라우저·주소에만 적용되며 두 사람 간 동기화는 지원하지 않습니다. 저장 차단 시 화면에서 안내하고 나머지 기능은 유지합니다.

## 기능 및 일정

- 10/26~11/2 여행 일정 + 11/3 귀국 정보, 날짜 탭·이전/다음·방향키/Home/End
- 10/30 누사페니다: 호텔↔사누르 육상 구간만 경로 제공. 보트와 미확정 섬 내부 경로 분리
- 10/31 울루와뚜 쇼핑 후보 또는 11/1 스미냑 선택 외출, 두 지역을 동시에 필수 일정으로 잡지 않음
- 장소별 외부 Google Maps 검색, 확인 가능한 주요 지점의 전체 경로
- 예약 상태 구분, 기기별 체크리스트·예산·메모 저장
- 첨부 handoff HTML의 270만 원 예시 예산(식사 80·쇼핑 70·스파 50·차량 35·기타 35만 원), 빈 항목만 채우기, 누사페니다 별도 입력
- 항공·숙소·기예약 투어는 예시 예산에서 제외, 미입력 항목 안내
- 민감한 예약번호·실제 예약 금액을 소스에 포함하지 않음

여행 사실은 `CODEX_PROMPT.md`, 데이터는 `app.js`의 `days` 배열을 기준으로 합니다. 미확인 지점·행사·투어 방문지는 후보/확인 필요이며 경로를 임의 생성하지 않습니다.

## 브라우저 검증

현재 클라우드의 Playwright와 `/usr/bin/chromium`을 사용합니다. 다른 환경에서는 Playwright와 Chromium이 필요하며 `CHROMIUM_PATH`로 실행 파일을 지정할 수 있습니다.

```sh
node --check app.js
node tests/browser.cjs
python tools/build_sites.py
```

서버 실행 중 테스트합니다. 데스크톱 1440px와 iPhone 13 뷰포트에서 날짜·키보드·경로·쇼핑·저장·페이지 넘침·콘솔 오류를 검사하고 저장 차단/손상 데이터도 검증합니다. iPhone 검사는 Chromium의 모바일 에뮬레이션이며 실제 Safari 검증은 아닙니다. 캡처는 `/tmp/bali-artifacts/`에 저장합니다.

## ChatGPT @Sites

`python tools/build_sites.py`로 생성한 **`sites/index.html`**을 Sites에 첨부하세요. 자세한 절차와 복사할 요청은 [SITES_HANDOFF.md](SITES_HANDOFF.md)에 있습니다. Sites 도구가 이 환경에 없어 직접 가져오기·미리보기·공개 게시를 확인하지 않았습니다. 사용자 미리보기 승인 후 Sites에서 게시합니다. GitHub 저장과 공개 게시를 구분합니다.

## Sites에 전달할 단일 HTML (준비 완료)
- **최종 단일 파일:** `sites/index.html` — CSS/JS가 모두 포함되어 있어 이 파일 하나만 전달하면 됩니다.
- **GitHub 파일 보기:** https://github.com/jsb9913-pixel/bali/blob/main/sites/index.html
- **다운로드:** GitHub에서 위 파일을 열고 **Download raw file**을 누른 후 ChatGPT 일반 채팅에서 `@Sites`를 선택해 파일을 첨부하세요.
- 코덱스 클라우드 경로 `/workspace/bali/sites/index.html`은 ChatGPT의 파일 첨부 경로가 아닙니다.
- **게시 전** Sites 미리보기에서 날짜 선택/지도 경로/모바일 UI를 확인하세요.
