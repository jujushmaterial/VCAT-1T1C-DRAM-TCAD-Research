# VCAT Dashboard 편집·결과물 제출 API

GitHub Pages 대시보드에서 GitHub Issue 체크리스트를 수정하고, 결과물 파일·코드·서버 경로를 개인 연구 폴더에 제출하기 위한 Cloudflare Worker입니다.

## 사용자 동작

1. 대시보드에서 `GitHub 로그인`을 누릅니다.
2. 저장소에 쓰기 권한이 있는 사용자는 체크리스트를 편집할 수 있습니다.
3. 결과물 체크 시 다음 중 하나를 선택합니다.
   - 파일 업로드
   - 코드 삽입
   - 서버 경로 등록
   - 체크만 완료
4. 제출 파일은 로그인한 사용자의 `members/<영문이름>/phases/...` 폴더에 저장됩니다.
5. 코드는 보기용 Markdown과 실행용 원본 코드 파일로 동시에 생성됩니다.
6. 제출이 성공한 뒤에만 Issue 결과물 체크가 완료됩니다.

일반 연구원은 GitHub 로그인과 최초 권한 승인 외에 별도 프로그램 설치나 토큰 복사가 필요하지 않습니다.

## 관리자 배포

기존 Worker를 사용하는 경우 코드 갱신 후 아래 명령만 다시 실행합니다.

```bash
cd worker
npm install
npx wrangler deploy
```

Client ID, Client Secret, KV namespace와 Worker 주소는 기존 설정을 그대로 사용합니다. OAuth 권한 범위도 기존 `public_repo`로 충분합니다.

## 최초 1회 설정

```bash
cd worker
npm install
npx wrangler login
npx wrangler kv namespace create SESSIONS
npx wrangler secret put GITHUB_CLIENT_ID
npx wrangler secret put GITHUB_CLIENT_SECRET
npx wrangler deploy
```

GitHub OAuth App 설정:

- Homepage URL: `https://jujushmaterial.github.io/VCAT-1T1C-DRAM-TCAD-Research/`
- Authorization callback URL: `https://vcat-dashboard-api.jujushmaterial.workers.dev/auth/callback`

## 저장 구조

```text
members/<MemberFolder>/phases/phase-01/outputs/P01-O01/
├─ README.md
└─ submissions/<제출ID>/
   ├─ README.md
   ├─ submission.json
   ├─ files/                 # 일반 파일 제출
   ├─ source/                # 코드 원본 파일
   └─ code-submission.md     # 보기용 코드 문서
```

전체 제출 인덱스는 `docs/data/submissions.json`에 저장되며, Pages의 `결과 확인` 버튼과 자동 동기화에 사용됩니다.

## 제한

- 일반 파일: `.png`, `.jpg`, `.jpeg`, `.svg`, `.webp`, `.pdf`, `.docx`, `.pptx`, `.xlsx`, `.csv`, `.json`, `.txt`, `.md`, `.zip`
- 파일당 최대 10MB
- 제출 1회 최대 10개, 총합 30MB
- 코드 블록당 최대 500KB, 제출 전체 최대 1MB
- `.tdr`, `.plt` 등 대용량 TCAD 원본은 `서버 경로 등록` 사용

## 보안·충돌 방지

- GitHub Client Secret과 access token은 Cloudflare에만 저장합니다.
- 브라우저에는 8시간 유효한 임의 세션 ID만 전달합니다.
- 저장소 쓰기 권한이 없는 계정은 API를 사용할 수 없습니다.
- 결과물 제출은 Phase 담당자 또는 관리자만 가능하며, 담당자가 없는 Phase는 공동 연구원이 제출할 수 있습니다.
- 파일은 GitHub Git Data API로 한 커밋에 저장됩니다.
- Issue `updated_at`을 확인해 다른 사용자의 변경을 덮어쓰지 않습니다.
- 제출 경로와 파일명은 Worker에서 검증해 경로 이탈과 실행 파일 업로드를 차단합니다.
