# prego_docs 변경사항 검증 요약

## 테스트 결과 (검증 완료)

### 1. 빌드
- `pnpm run build` 성공 (19페이지 빌드)

### 2. 빌드 산출물 검증
| 항목 | 결과 |
|------|------|
| 커스텀 Header | `prego-header`, `logo-black.png`, `docs-label`, `nav-links` (Manual, API, Log in) HTML에 포함됨 |
| 로고 이미지 | `dist/logo-black.png` (12KB), `dist/logo-white.png` (24KB) 복사됨 |
| 커스텀 CSS | `dist/_astro/index.DTO-8gF9.css`에 green(#10b981), sidebar-width(13.75rem) 등 반영됨 |
| PageFrame | `header-strip`, `sidebar-pane`, `help-button` 포함 |
| TwoColumnContent | `right-sidebar-container`, `main-pane` 레이아웃 포함 |

### 3. preview 서버 응답
- `pnpm run preview` 후 `http://localhost:4323/guides/tenant-onboarding/` 요청 시 커스텀 컴포넌트가 렌더된 HTML이 반환됨

## 로컬에서 변경사항 확인 방법

1. **의존성 및 빌드**
   ```bash
   cd /Users/marco/develop/prego/prego_docs
   pnpm install
   pnpm run build
   ```

2. **개발 서버 (실시간 반영)**
   ```bash
   pnpm dev
   ```
   브라우저에서 http://localhost:4323/ 접속

3. **빌드 결과물로 확인**
   ```bash
   pnpm run preview
   ```
   http://localhost:4323/ 접속 (기본 포트가 사용 중이면 터미널에 표시된 포트 사용)

4. **캐시 이슈 시**
   - 브라우저 강력 새로고침: Cmd+Shift+R (Mac) / Ctrl+Shift+R (Windows)
   - `pnpm run build` 후 다시 `pnpm dev` 또는 `pnpm run preview` 실행

## 적용된 변경사항 (prego_docs 레포 기준)

- **Header.astro**: 로고(/logo-black.png, /logo-white.png), Docs 라벨(1rem, bold, #000/#fff), Manual/API/Log in 우측 정렬
- **PageFrame.astro**: 상단 스트립, 헤더 하단 구분선만 유지, 좌측 사이드바 구분선 제거, Help 버튼
- **TwoColumnContent.astro**: 좌/우 220px 동일, 우측 구분선 제거, main-pane 너비 계산
- **custom.css**: green accent, 좌/우 220px 강제, 구분선 제거, 타이틀 h1 하단선 제거, 본문/타이포 스타일
- **public/logo-black.png**: 실제 Prego 로고 이미지로 교체
- **Legal 문서**: terms, privacy, cookie-policy, dpa, sla, responsible-ai 본문 반영
