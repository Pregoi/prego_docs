# prego_docs — 좌/우 영역 너비 비대칭 및 상단 메뉴 스타일 기획서

## 1. 개요

| 항목 | 내용 |
|------|------|
| **대상** | prego_docs (Astro + Starlight) — `src/components/`, `src/styles/custom.css` |
| **참조** | 사용자 제공 스크린캡쳐 (좌측·우측 영역 비대칭, 상단 메뉴) |
| **목표** | (1) 좌측 영역을 기준으로 20% 더 넓게, 우측 영역은 좌측과 동일 너비로 대칭화 (2) 상단 메뉴(Manual, API, Log in) 폰트 한 단계 확대, bold, 간격 30% 확대 |
| **코드 생성** | 본 기획서는 원인 분석 및 방향만 기술하며, 코드 변경은 별도 작업에서 수행 |

---

## 2. 문제 1: 좌측·우측 영역 너비 비대칭

### 2.1 현상

- **좌측 영역** (Overview 텍스트가 있는 division): 현재보다 **더 좁게** 보임.
- **우측 영역** (On this page 텍스트가 있는 division): 현재보다 **더 넓게** 보임.
- 요구사항: 좌측을 기준으로 **20% 더 넓게** 하고, 우측은 **좌측과 같은 너비**로 맞춘다.

### 2.2 근본 원인

#### (1) 우측 TOC 내부 컨테이너의 가변 max-width (주요 원인)

- **파일**: Starlight 기본 컴포넌트 `node_modules/@astrojs/starlight/components/PageSidebar.astro`
- **구조**: 우리가 쓰는 `right-sidebar` 슬롯에는 Starlight의 `PageSidebar`가 들어가고, 그 안에 `.right-sidebar-panel` → `.sl-container` → TOC(On this page)가 있음.
- **좌측**  
  - `PageFrame.astro`의 `.sidebar-pane`이 `width: var(--sl-sidebar-width)` (현재 13.75rem).  
  - `.sidebar-content`가 `padding: 1rem var(--sl-sidebar-pad-x) 0` (좌우 각 1rem).  
  - 따라서 **실제 콘텐츠 영역 너비** = `13.75rem - 2rem` = **11.75rem 고정**.
- **우측**  
  - 우리 커스텀 `TwoColumnContent.astro`와 `custom.css`로 `.right-sidebar-container` / `.right-sidebar`를 `var(--sl-toc-width)`(= 13.75rem)로 고정함.  
  - 그러나 **내부**는 Starlight `PageSidebar.astro`가 제어:
    - `.right-sidebar-panel { padding: 1rem var(--sl-sidebar-pad-x); }`
    - `.sl-container { width: calc(var(--sl-sidebar-width) - 2 * var(--sl-sidebar-pad-x)); }`  
      → 기본적으로 11.75rem.
    - **@media (min-width: 72rem)** 에서:
      ```css
      .sl-container {
        max-width: calc(
          (100vw - var(--sl-sidebar-width) - 2 * var(--sl-content-pad-x) - 2 * var(--sl-sidebar-pad-x)) * 0.25
        );
      }
      ```
  - 즉, **72rem 이상**에서 우측 **내부** `.sl-container`는 “뷰포트에서 좌측·패딩을 뺀 나머지의 25%”까지 **늘어날 수 있음**.  
  - 넓은 화면에서는 이 값이 11.75rem보다 커져, **우측 “On this page” division이 좌측 “Overview” division보다 넓어짐**.

결과적으로:

- **좌측**: 컬럼 전체 13.75rem, 내부 콘텐츠 11.75rem **고정**.
- **우측**: 컬럼 전체 13.75rem으로 맞췄지만, **내부** `.sl-container`는 Starlight 공식에 의해 **가변**이라 넓은 뷰포트에서 더 넓게 보임 → **비대칭의 직접 원인**.

#### (2) 좌/우 적용 시점(미디어쿼리) 차이

- **좌측**: `PageFrame.astro`에서 `@media (min-width: 50rem)` 부터 `width: var(--sl-sidebar-width)` 적용.
- **우측**: `TwoColumnContent.astro`와 `custom.css`에서 `@media (min-width: 72rem)` 부터 고정 너비 적용.
- 50rem ~ 72rem 구간에서는 좌만 13.75rem, 우는 다른 레이아웃일 수 있어, 일부 해상도에서 비대칭 인상이 더 날 수 있음. 다만 “좌가 더 좁고 우가 더 넓다”는 현상의 **주요 원인은 (1)**.

#### (3) 현재 사용 중인 수치

- `custom.css`: `--sl-sidebar-width: 13.75rem`, `--sl-toc-width: var(--sl-sidebar-width)`, `--sl-sidebar-pad-x: 1rem`.
- Starlight 기본 `--sl-sidebar-width`는 18.75rem; 우리가 13.75rem으로 줄였지만, **우측 내부**는 위 (1)의 공식으로 별도 계산되므로, “같은 변수”만으로는 좌/우 시각적 너비가 같아지지 않음.

### 2.3 해결 방향 (구현 시 참고)

| 순서 | 내용 |
|------|------|
| 1 | **좌측 기준 20% 확대**: `--sl-sidebar-width`를 현재 13.75rem에서 약 20% 증가한 값(예: 16.5rem)으로 변경. `--sl-toc-width`는 계속 `var(--sl-sidebar-width)`로 두어 **컬럼 전체**는 좌·우 동일하게 유지. |
| 2 | **우측 내부가 좌측을 넘지 않도록**: Starlight `PageSidebar.astro`의 `.sl-container`에 적용되는 **가변 max-width**를 우리 쪽에서 덮어쓰기. 예: `custom.css` 등에서 `.right-sidebar-panel .sl-container`에 `max-width`를 좌측 콘텐츠 너비와 동일하게 고정 (예: `calc(var(--sl-sidebar-width) - 2 * var(--sl-sidebar-pad-x))`)하여, 우측 “On this page” division이 좌측 “Overview” division보다 넓어지지 않게 함. |
| 3 | **패딩 통일**: 좌측 `--sl-sidebar-pad-x`와 우측 TOC 내부 패딩이 동일하게 적용되도록 확인. (이미 둘 다 `var(--sl-sidebar-pad-x)` 사용 시, 1만 맞추면 됨.) |
| 4 | (선택) 50rem / 72rem 구간에서도 좌·우가 같은 “느낌”이 되도록, 필요 시 우측 레이아웃 전환 시점이나 좌측 너비 적용 시점을 검토. |

---

## 3. 문제 2: 상단 메뉴(Manual, API, Log in) 폰트·간격

### 3.1 요구사항

- **폰트 크기**: 현재보다 **한 단계** 더 크게.
- **폰트 굵기**: **bold**.
- **간격(spacing)**: 메뉴 텍스트 간 **30%** 더 넓게.

### 3.2 근본 원인 (현재 값의 위치)

- **파일**: `src/components/Header.astro`
- **현재 스타일**:
  - `.nav-link`: `font-size: 0.875rem`, `font-weight: 500`.
  - `.nav-links`: `gap: 1.25rem` (메뉴 항목 사이 간격).
- “원인”이라기보다 **의도된 현재 값**이 위와 같고, 요구사항을 만족하지 않는 상태임.

### 3.3 해결 방향 (구현 시 참고)

| 항목 | 현재 | 변경 목표 |
|------|------|-----------|
| **폰트 크기** | 0.875rem (14px) | 한 단계 확대 → 예: **1rem** (16px). (디자인 시스템에 “한 단계” 정의가 있으면 그에 맞춤.) |
| **폰트 굵기** | 500 | **700** (bold). |
| **간격** | 1.25rem | 30% 증가 → 1.25 × 1.3 = **1.625rem** (반올림해 1.63rem 등으로 사용 가능). |

- 수정 위치: `Header.astro` 내 `.nav-link` (font-size, font-weight), `.nav-links` (gap).
- 반응형에서 메뉴를 숨기는 구간(`@media (max-width: 50rem)`)은 유지하고, 50rem 이상에서만 위 값 적용되면 됨.

---

## 4. 수정 대상 파일 요약

| 문제 | 수정 대상 | 비고 |
|------|-----------|------|
| **1. 좌/우 너비** | `src/styles/custom.css` | `--sl-sidebar-width` 20% 증가, `.right-sidebar-panel .sl-container` max-width 오버라이드 등 |
| **1. 좌/우 너비** | (선택) `src/components/TwoColumnContent.astro` | 필요 시 변수 참조·미디어쿼리 정리 |
| **2. 상단 메뉴** | `src/components/Header.astro` | `.nav-link` font-size·font-weight, `.nav-links` gap |

---

## 5. 검증 포인트

- **너비**: 72rem 이상 뷰포트에서 좌측(Overview) division과 우측(On this page) division의 **시각적 너비가 동일**한지, 스크린캡쳐 또는 개발자 도구로 확인.
- **상단 메뉴**: Manual / API / Log in이 **한 단계 더 큰 크기**, **bold**, 이전보다 **30% 넓은 간격**으로 보이는지 확인.

---

*본 기획서는 근본 원인 분석과 해결 방향만 기술하며, 실제 코드 생성·수정은 별도로 진행한다.*
