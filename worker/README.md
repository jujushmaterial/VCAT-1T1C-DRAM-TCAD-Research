# VCAT Dashboard 편집·결과물 제출·미리보기 API

GitHub Pages 대시보드에서 GitHub Issue 체크리스트를 수정하고, 결과물 파일·코드·서버 경로를 개인 연구 폴더에 제출하며, 제출 파일을 웹 내부에서 확인하기 위한 Cloudflare Worker입니다.

## 사용자 동작

1. 대시보드에서 `GitHub 로그인`을 누릅니다.
2. 저장소에 쓰기 권한이 있는 사용자는 체크리스트를 편집할 수 있습니다.
3. 결과물은 파일 업로드, 코드 삽입, 서버 경로 등록 또는 표 입력 방식으로 제출합니다.
4. 제출 파일은 로그인한 사용자의 `members/<영문이름>/phases/phase-XX/tasks/PXX-TXX/outputs/PXX-TXX-OXX/` 아래에 저장됩니다.
5. `결과 확인`을 누르면 GitHub 페이지로 이동하지 않고 통합 제출본 뷰어가 열립니다.
6. 코드·이미지·PDF·텍스트·JSON·Markdown·로그는 웹에서 미리보고, 그 밖의 파일은 정보와 다운로드 인터페이스를 사용합니다.

일반 연구원은 GitHub 로그인과 최초 권한 승인 외에 별도 프로그램 설치나 토큰 복사가 필요하지 않습니다. 공개 저장소의 읽기 전용 미리보기는 로그인하지 않아도 사용할 수 있습니다.

## 제출본 조회 API v8

- `GET /api/submissions/:submissionId/manifest?outputId=PXX-TXX-OXX`
  - 제출 메타데이터, 동적 파일 목록, 파일 종류, 미리보기·다운로드·GitHub 원본 URL을 반환합니다.
- `GET /api/submissions/:submissionId/files/:fileId?outputId=PXX-TXX-OXX`
  - 검증된 제출 폴더 내부 파일을 인라인으로 반환합니다.
- `GET /api/submissions/:submissionId/files/:fileId/download?outputId=PXX-TXX-OXX`
  - 동일 파일을 첨부 다운로드로 반환합니다.

파일 경로는 반드시 `docs/data/submissions.json`에 등록된 제출 폴더 내부여야 합니다. 브라우저에는 저장소 토큰이 전달되지 않습니다. Worker는 로그인 세션 토큰을 우선 사용하고, 선택적으로 `GITHUB_READ_TOKEN` secret을 읽기 전용 API 할당량 보강에 사용할 수 있습니다.

## 지원 미리보기

- 코드: Sentaurus CMD, Tcl, Python, JavaScript/TypeScript, C/C++, Verilog/VHDL, Shell 등 텍스트 기반 소스
- 이미지: PNG, JPG/JPEG, WEBP, GIF, SVG, BMP, AVIF
- 문서: PDF
- 텍스트: TXT, LOG, OUT, ERR, CSV, TSV, XML, YAML
- 구조화 텍스트: JSON, Markdown
- 다운로드 전용: DOCX, PPTX, XLS/XLSX, ZIP 및 기타 바이너리

XLS/XLSX 스프레드시트 미리보기와 Excel형 편집기는 3차 작업 범위이며 v8에는 포함하지 않습니다.

## 관리자 배포

코드 병합 후 기존 Worker를 한 번 다시 배포합니다.

```bash
cd worker
npm install
npx wrangler deploy
```

선택적인 읽기 전용 토큰을 사용할 때만 다음을 추가합니다.

```bash
npx wrangler secret put GITHUB_READ_TOKEN
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
members/<MemberFolder>/phases/phase-XX/tasks/PXX-TXX/outputs/PXX-TXX-OXX/
├─ README.md
└─ submissions/<제출ID>/
   ├─ README.md
   ├─ submission.json
   ├─ files/                 # 일반 파일 제출
   ├─ source/                # 코드 원본 파일
   └─ code-submission.md     # 보기용 코드 문서
```

전체 제출 인덱스는 `docs/data/submissions.json`에 저장되며, Pages의 결과 확인 버튼, 통합 뷰어와 자동 상태 동기화에 사용됩니다.

## 제한

- 파일당 최대 10MB
- 제출 1회 최대 10개, 총합 30MB
- 코드 블록당 최대 500KB, 제출 전체 최대 1MB
- 웹 인라인 미리보기 최대 10MB
- `.tdr`, `.plt`, `.dat` 등 대용량 TCAD 원본은 서버 경로 등록 사용

## 보안·충돌 방지

- GitHub Client Secret과 access token은 Cloudflare에만 저장합니다.
- 브라우저에는 8시간 유효한 임의 세션 ID만 전달합니다.
- 파일 API는 `submissions.json`에 등록된 제출본과 파일 경로만 허용합니다.
- `..`, 절대 경로, 다른 연구원 폴더로 벗어나는 경로를 차단합니다.
- 파일 응답에는 MIME 고정, `nosniff`, sandbox CSP와 안전한 `Content-Disposition`을 적용합니다.
- PDF Range 요청을 전달해 브라우저 미리보기를 지원합니다.
- 기존 제출·삭제·Issue 편집 요청은 v7 구현으로 위임해 동작을 유지합니다.
