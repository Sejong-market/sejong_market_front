# 세종대학교 교내 중고거래 플랫폼 (가칭)

세종대학교 캠퍼스 내 학생·교직원을 위한 중고거래 서비스 프론트엔드 저장소입니다.

## 🔎 실시간 미리보기 (Live Preview)

`development` 브랜치에 변경이 머지되면 GitHub Actions가 자동으로 빌드하여 GitHub Pages에 배포합니다.
별도 서버 없이 최신 UI 상태를 누구나 바로 확인할 수 있습니다.

| 항목 | 값 |
|------|----|
| 미리보기 URL | https://sejong-market.github.io/sejong_market_front/ |
| 기준 브랜치 | `development` (push 시 자동 배포) |
| 배포 산출물 브랜치 | `gh-pages` (CI 전용 — **사람은 절대 수정·push 금지**) |
| 워크플로우 | `.github/workflows/deploy-pages.yml` |

> 새 PR이 `development`에 머지되는 순간부터 보통 1~2분 안에 위 URL이 갱신됩니다.

## 기술 스택

| 구분 | 기술 |
|------|------|
| Framework | React |
| Build Tool | Vite |
| Styling | Tailwind CSS |
| Routing | React Router |

## 팀 구조 (총 4명)

| 역할 | 담당 업무 |
|------|-----------|
| **조대승(팀장)** | 백엔드 기획, 백엔드 PR리뷰, 백엔드 개발  |
| **오예찬(파트장)** | 프론트엔드 PR리뷰, 백엔드 개발 |
| **김나현** | 로그인 페이지, 상품 상세 페이지 UI 개발 |
| **박민지** | 상품 게시판, 상품 등록, 마이페이지 UI 개발 |

## 프로젝트 구조

Feature-driven(도메인 주도) 폴더 구조를 사용합니다. 각 페이지 도메인은 자체 `api.js`, `components/`, 뷰 파일(`*.jsx`)을 갖고, 앱 전역 공통 요소는 `shared/`에 둡니다.

```
src/
├── App.jsx
├── main.jsx
├── shared/
│   ├── api/instance.js      # 공통 API 인스턴스
│   └── layout/              # Header, AppLayout
└── pages/
    ├── Login/
    │   ├── Login.jsx
    │   ├── api.js
    │   └── components/
    ├── ProductList/
    │   ├── ProductList.jsx
    │   ├── api.js
    │   └── components/
    ├── ProductDetail/
    │   ├── ProductDetail.jsx
    │   ├── api.js
    │   └── components/      # CommentList, CommentForm
    ├── ProductRegister/
    │   ├── ProductRegister.jsx
    │   ├── api.js
    │   ├── components/
    │   └── hooks/
    └── MyPage/
        ├── MyPage.jsx
        ├── api.js
        └── components/
```

## 라우팅

| 경로 | 페이지 | 접근 |
|------|--------|------|
| `/login` | 로그인 | 공개 |
| `/products` | 상품 목록 | 공개 |
| `/products/:productId` | 상품 상세 (댓글 문의) | 공개 |
| `/products/new` | 상품 등록 | 로그인 필요 |
| `/mypage` | 마이페이지 | 로그인 필요 |

## 시작하기

### 사전 요구사항

- Node.js 18 이상
- npm

### 설치 및 실행

```bash
# 의존성 설치
npm install

# 환경 변수 설정 (선택)
cp .env.example .env

# 개발 서버 실행
npm run dev

# 프로덕션 빌드
npm run build

# 빌드 결과물 미리보기
npm run preview
```

### 환경 변수

| 변수명 | 설명 | 기본값 |
|--------|------|--------|
| `VITE_API_BASE_URL` | 백엔드 API 베이스 URL | `http://localhost:8080/api` |

---

## 협업 전략

### UI-First 개발 방식

본 프로젝트는 **기획서 없이 프론트엔드가 UI를 먼저 개발**하는 **UI-First** 방식을 채택합니다.

| 단계 | 설명 |
|------|------|
| 1 | 프론트엔드가 화면·컴포넌트·라우팅을 먼저 구현 |
| 2 | 목(mock) 데이터 또는 임시 API로 UI 동작 확인 |
| 3 | 팀 전체가 UI를 보며 피드백·요구사항 정리 |
| 4 | 확정된 UI를 기준으로 백엔드 API 스펙 협의 및 연동 |

이 방식은 초기 기획 문서 없이도 빠르게 프로토타입을 공유하고, 실제 화면을 기준으로 백엔드·기획 방향을 맞출 수 있다는 장점이 있습니다.

### Git Flow 기반 브랜치 운영

Git Flow를 베이스로 아래 브랜치를 운영합니다.

```
master (main)     ← 배포 가능한 안정 버전
    │
develop           ← 통합 개발 브랜치
    │
feature/*         ← 기능 단위 작업 브랜치
```

| 브랜치 | 용도 |
|--------|------|
| `master` | 프로덕션 배포용. `develop`에서 검증된 코드만 병합 |
| `develop` | 일상 개발 통합 브랜치. feature 브랜치 병합 대상 |
| `feature/*` | 단일 기능·페이지 단위 작업 (예: `feature/login-page`, `feature/product-detail`) |

#### 기본 워크플로우

```bash
# 1. develop에서 feature 브랜치 생성
git checkout develop
git pull origin develop
git checkout -b feature/기능명

# 2. 작업 후 커밋·푸시
git add .
git commit -m "feat: 기능 설명"
git push origin feature/기능명

# 3. develop 대상으로 Pull Request 생성
# 4. 프론트엔드 파트장 리뷰 후 develop에 병합
# 5. 릴리스 시점에 develop → master 병합
```

### 피드백 반려 시 롤백 워크플로우 (Git 버전 제어 훈련)

코드 리뷰·피드백에서 **반려(reject)** 되었을 때, 단순히 새 커밋으로 덮지 않고 **`git reset` / `git revert`** 를 활용해 이전 상태로 되돌리는 연습을 병행합니다. 이는 팀원 전원의 Git 역량 강화를 위한 의도적인 워크플로우입니다.

#### `git reset` — 로컬·미푸시 커밋 되돌리기

아직 원격에 푸시하지 않은 커밋을 되돌릴 때 사용합니다.

```bash
# 마지막 커밋만 취소 (변경 파일은 스테이징 영역에 유지)
git reset --soft HEAD~1

# 마지막 커밋 취소 (변경 파일은 작업 디렉터리에 유지, unstaged)
git reset HEAD~1

# 마지막 커밋과 변경 내용 모두 제거 (주의: 복구 어려움)
git reset --hard HEAD~1
```

| 옵션 | 커밋 | 스테이징 | 작업 디렉터리 |
|------|------|----------|---------------|
| `--soft` | 제거 | 유지 | 유지 |
| (기본) | 제거 | 제거 | 유지 |
| `--hard` | 제거 | 제거 | 제거 |

> **주의:** 이미 `push`한 커밋에 `reset --hard` 후 force push는 팀원 작업에 영향을 줄 수 있으므로, 공유 브랜치에서는 사용을 지양합니다.

#### `git revert` — 이미 푸시된 커밋 안전하게 되돌리기

원격에 올라간 커밋을 **새 커밋으로 되돌리는** 방식입니다. 히스토리를 보존하므로 `develop` 등 공유 브랜치에 적합합니다.

```bash
# 특정 커밋을 되돌리는 새 커밋 생성
git revert <커밋해시>

# 여러 커밋 되돌리기
git revert <시작커밋>..<끝커밋>
```

#### 반려 시 권장 절차

```
피드백 반려
    │
    ├─ 아직 push 안 함 ──→ git reset (soft/mixed) 후 수정·재커밋
    │
    └─ 이미 push 함 ─────→ git revert 후 push
                              │
                              └─ feature 브랜치에서 PR 재요청
```

| 상황 | 권장 명령 | 이유 |
|------|-----------|------|
| 로컬에서만 작업한 반려 수정 | `git reset` | 히스토리 정리, 재작업 용이 |
| develop/feature에 이미 push된 반려 | `git revert` | 공유 브랜치 히스토리 안전 |
| 잘못 병합된 develop 커밋 | `git revert` | master/develop 보호 |

---

## 스크립트

| 명령 | 설명 |
|------|------|
| `npm run dev` | 개발 서버 실행 |
| `npm run build` | 프로덕션 빌드 |
| `npm run preview` | 빌드 결과물 로컬 미리보기 |
| `npm run lint` | ESLint 검사 |

## 라이선스

본 프로젝트는 [MIT License](./LICENSE) 하에 공개됩니다.
