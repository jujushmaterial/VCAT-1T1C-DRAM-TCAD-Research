# VCAT Dashboard 편집 API

GitHub Pages 대시보드에서 GitHub Issue 체크리스트를 직접 확인·수정하기 위한 Cloudflare Worker입니다.

## 사용자 동작

1. 대시보드에서 `GitHub 로그인`을 누릅니다.
2. GitHub 권한 승인 화면에서 승인합니다.
3. 저장소에 쓰기 권한이 있는 사용자만 체크리스트를 편집할 수 있습니다.
4. 저장하면 Issue 본문의 `1. 해야 할 것`, `2. 나와야 하는 결과물` 영역만 갱신됩니다.
5. 다른 사용자가 먼저 수정한 경우 저장을 중단하고 최신 내용을 다시 불러옵니다.

일반 연구원은 최초 로그인과 권한 승인 외에 별도 프로그램 설치나 토큰 복사가 필요하지 않습니다.

## 최초 1회 관리자 설정

### 1. Cloudflare Worker 준비

```bash
cd worker
npm install
npx wrangler login
npx wrangler kv namespace create SESSIONS
```

출력된 KV namespace ID를 `wrangler.toml`의 `REPLACE_WITH_KV_NAMESPACE_ID`에 입력합니다.

### 2. GitHub OAuth App 등록

GitHub → Settings → Developer settings → OAuth Apps → New OAuth App에서 등록합니다.

- Homepage URL: `https://jujushmaterial.github.io/VCAT-1T1C-DRAM-TCAD-Research/`
- Authorization callback URL: `https://<Worker 주소>/auth/callback`

생성된 Client ID와 Client Secret을 Worker secret으로 등록합니다.

```bash
npx wrangler secret put GITHUB_CLIENT_ID
npx wrangler secret put GITHUB_CLIENT_SECRET
```

### 3. Worker 주소 반영

`worker/wrangler.toml`의 `API_BASE_URL`을 실제 Worker 주소로 바꿉니다.

```bash
npm run deploy
```

배포 후 `docs/config.js`의 `apiBaseUrl`에도 같은 Worker 주소를 입력합니다.

## 보안 방식

- GitHub Client Secret은 Worker secret에만 저장합니다.
- 브라우저에는 GitHub access token을 전달하지 않습니다.
- 브라우저에는 8시간 유효한 임의 세션 ID만 저장합니다.
- 세션과 GitHub token은 Cloudflare KV에 저장됩니다.
- 저장소에 push 권한이 없는 GitHub 사용자는 편집 API에 접근할 수 없습니다.
- Issue 전체를 무조건 덮어쓰지 않고 체크리스트 두 영역만 교체합니다.
- `updated_at` 충돌 검사를 사용해 동시 수정 덮어쓰기를 막습니다.

## 무료 사용 범위

소규모 공동 연구 대시보드는 일반적으로 Cloudflare Workers Free와 KV 무료 범위 안에서 운영할 수 있습니다. 무료 한도를 넘기면 요청이 실패하며, 유료 플랜으로 직접 전환하지 않는 한 자동으로 유료 과금되는 구조로 사용하지 않아도 됩니다.
