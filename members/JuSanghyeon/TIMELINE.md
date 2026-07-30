# 주상현 작업 타임라인

이 문서는 `members/JuSanghyeon/` 아래에서 이루어진 모든 생성·수정·삭제·이동·제출 작업을 시간순으로 기록합니다.

- 새 기록은 문서 맨 아래에 추가합니다.
- 개인 폴더를 변경한 작업은 같은 작업 또는 같은 커밋에서 반드시 여기에 기록합니다.
- 확인하지 않은 결과를 성공으로 기록하지 않습니다.

---

## 2026-07-28 14:40 KST — AI 작업 가이드 및 통합 타임라인 도입

- **작성자:** OpenAI ChatGPT
- **Phase / Issue:** 해당 없음
- **결과물 ID:** 해당 없음
- **변경 유형:** 생성 / 수정
- **변경 파일:** `members/JuSanghyeon/AGENTS.md`, `members/JuSanghyeon/README.md`, `members/JuSanghyeon/TIMELINE.md`
- **작업 내용:** 개인 폴더를 AI가 일관된 방식으로 이해하고 작성하도록 지침과 타임라인 표준을 추가했습니다.
- **작업 이유:** AI 도구별 결과 형식 차이를 줄이고, 개인 폴더의 모든 변경 이력을 누락 없이 남기기 위해서입니다.
- **결과 및 검증:** 문서 구조와 상대 링크를 검토했습니다. TCAD 실행은 수행하지 않았습니다.
- **남은 일:** 이후 개인 폴더의 모든 변경 시 이 문서에 새 기록을 추가합니다.

## 2026-07-28 15:05 KST — Run Sheet 초기 구현 및 설계

- **작성자:** 주상현 (`@jujushmaterial`), OpenAI ChatGPT 지원
- **Phase / Issue:** 해당 없음 — 공동 연구 관리 시스템 설계
- **결과물 ID:** 해당 없음
- **변경 유형:** 설계 / 구현 / 문서화
- **변경 파일:** `docs/`, `docs/data/`, `scripts/sync_dashboard.py`, `worker/`, `.github/workflows/`
- **작업 내용:** VCAT–1T1C DRAM TCAD 공동 연구의 Phase 1~9 진행 상황을 한 화면에서 확인할 수 있는 Run Sheet 구조를 설계하고 초기 대시보드를 구현했습니다. GitHub Issue를 Phase별 체크리스트와 담당자 정보의 원본으로 사용하고, GitHub Pages에서 전체 단계 수, 진행률, 진행·완료·대기 상태, 공동 연구원, Phase별 해야 할 일과 결과물을 확인할 수 있도록 구성했습니다. 연구원별 개인 영문 폴더와 대시보드의 연구원 카드를 연결하고, Issue 변경 사항이 대시보드 데이터에 자동 반영되는 동기화 구조를 마련했습니다.
- **작업 이유:** 공동 연구원이 현재 해야 할 일, 필요한 결과물, 담당자, 진행 상태와 다음 과정을 GitHub 내부에서 일관된 형식으로 확인하고, 작업 기록과 결과물의 위치를 분산시키지 않기 위해서입니다.
- **결과 및 검증:** GitHub Pages 대시보드 표시, Phase 카드와 연구원 카드 연결, Issue 기반 진행률 계산 및 자동 동기화 구조를 확인했습니다. 이후 OAuth와 Cloudflare Worker를 이용한 체크리스트 편집·결과물 제출 기능으로 확장했습니다. TCAD 시뮬레이션 자체는 이 작업에서 수행하지 않았습니다.
- **남은 일:** 실제 연구 진행에 따라 Phase별 담당자와 체크리스트를 갱신하고, 각 연구원의 작업·결과물·오류·인수인계를 개인 `TIMELINE.md`에 지속적으로 기록합니다.


## 2026-07-30 17:00 KST — 자동 타임라인 보완

- **작성자:** GitHub Actions (`@jujushmaterial`의 변경 감지)
- **Phase / Issue:** Phase 1 / Issue 미확인
- **결과물 ID:** `해당 없음`
- **변경 유형:** 자동 기록
- **변경 파일:**
  - `members/JuSanghyeon/phases/phase-01/tasks/P01-T05/outputs/P01-T05-O01/README.md` (생성)
  - `members/JuSanghyeon/phases/phase-01/tasks/P01-T05/outputs/P01-T05-O01/submissions/20260730080004-jujushmaterial-14BZHQ/README.md` (생성)
  - `members/JuSanghyeon/phases/phase-01/tasks/P01-T05/outputs/P01-T05-O01/submissions/20260730080004-jujushmaterial-14BZHQ/code-submission.md` (생성)
  - `members/JuSanghyeon/phases/phase-01/tasks/P01-T05/outputs/P01-T05-O01/submissions/20260730080004-jujushmaterial-14BZHQ/source/Svisual_DIBL.tcl` (생성)
  - `members/JuSanghyeon/phases/phase-01/tasks/P01-T05/outputs/P01-T05-O01/submissions/20260730080004-jujushmaterial-14BZHQ/submission.json` (생성)
- **작업 내용:** 개인 폴더 변경에서 수동 `TIMELINE.md` 기록이 확인되지 않아 변경 파일 목록을 자동으로 추가했습니다.
- **작업 이유:** 개인 폴더의 모든 변경 이력을 반드시 남기는 저장소 규칙을 보장하기 위해서입니다.
- **결과 및 검증:** 커밋 `d86d9831c275` 감지. 커밋 메시지: `Submit P01-T05-O01 result by jujushmaterial`. 파일 내용과 TCAD 결과의 타당성은 자동 검증하지 않았습니다.
- **남은 일:** 실제 작업자는 필요하면 이 자동 기록 아래에 목적, 조건, 결과와 검증 내용을 보완해야 합니다.
