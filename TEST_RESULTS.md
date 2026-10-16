# 검증 결과 · 2026-10-16

- `node --check app.js`: 통과
- `node tests/browser.cjs`: 89개 assertion 통과
- `TEST_URL=http://127.0.0.1:8000/sites/ node tests/browser.cjs`: 첨부용 단일 파일에서도 동일 89개 assertion 통과
- `git diff --check`: 통과

Chromium 데스크톱(1440×1100), iPhone 13 에뮬레이션(390×844)에서 검증했습니다. Pretendard 실제 로딩, 9개 날짜 선택, 이전/다음 경계, 키보드, 동부투어 경유지, 누사페니다 해상 구간 분리, 미확정 남부 경로 비활성, 쇼핑과 경로 연동, 체크·메모·예산 저장 및 새로고침 복원, 저장 차단과 손상 데이터, 외부 지도 URL, 모바일 페이지 넘침을 확인했습니다. 앱 콘솔 오류와 실행 오류는 0개였습니다.

화면 캡처: `/tmp/bali-artifacts/desktop.png`, `iphone.png` 및 `sites-*-viewport.png`. 현재 작업 환경의 파일이며 공개 미리보기 링크가 아닙니다.

Google Maps 검색/경로 URL과 인코딩은 검증했지만 Google Maps 외부 화면에서 실제 교통·업체 영업 상태는 확인하지 않았습니다. 공식 여행 업체 사이트는 네트워크 정책의 403 응답으로 조회 불가였으며 미확인 지점·행사·예약을 확정 표기하지 않았습니다. 실제 iOS Safari와 Sites 미리보기/공개 주소에서의 동작은 아직 검증하지 않았습니다.
