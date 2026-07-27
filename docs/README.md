# HTML 연구 대시보드

`docs/index.html`은 단계별 진행률, 담당자, 과정의 이유와 다음 과정을 카드 형태로 보여줍니다.

## 상태가 반영되는 방식

1. 연구원이 각 Phase의 GitHub Issue에서 체크박스를 수정합니다.
2. `.github/workflows/sync-dashboard.yml`이 실행됩니다.
3. `scripts/sync_dashboard.py`가 Issue 체크 상태를 읽습니다.
4. `docs/data/status.json`이 자동 갱신됩니다.
5. 대시보드를 새로고침하면 진행률이 반영됩니다.

## 대시보드에서 하는 일

- 전체 연구 진행률 확인
- 단계별 상태와 담당자 확인
- 과정의 이유와 다음 과정 확인
- GitHub 공동 체크리스트 바로 열기

실제 체크와 작업 기록은 GitHub Issue와 개인 폴더에서 수행합니다.

## GitHub Pages 설정

저장소 관리자가 GitHub의 `Settings → Pages`에서 배포 원본을 설정해야 웹 주소가 생성됩니다.

권장 설정:

- Source: Deploy from a branch
- Branch: `main`
- Folder: `/docs`

저장소가 비공개이므로 Pages 사용 가능 여부와 공개 범위는 계정 및 조직 설정을 확인한 뒤 결정합니다. 연구 내용이 외부에 공개되면 안 되는 경우 Pages를 켜기 전에 공개 범위를 반드시 확인합니다.
