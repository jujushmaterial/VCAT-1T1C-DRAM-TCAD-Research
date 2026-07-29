# 송민호 작업 타임라인

이 문서는 `members/SongMinho/` 아래의 모든 생성·수정·삭제·이동·제출 작업을 시간순으로 기록합니다. 새 기록은 맨 아래에 추가하며, 개인 폴더 변경과 같은 작업 또는 같은 커밋에서 반드시 갱신합니다.

---

## 2026-07-28 14:40 KST — AI 작업 가이드 및 통합 타임라인 도입

- **작성자:** OpenAI ChatGPT
- **Phase / Issue:** 해당 없음
- **결과물 ID:** 해당 없음
- **변경 유형:** 생성 / 수정
- **변경 파일:** `members/SongMinho/AGENTS.md`, `members/SongMinho/README.md`, `members/SongMinho/TIMELINE.md`
- **작업 내용:** 개인 폴더용 AI 지침과 필수 타임라인 표준을 추가했습니다.
- **작업 이유:** AI 도구별 작성 형식을 통일하고 모든 변경 이력을 남기기 위해서입니다.
- **결과 및 검증:** 문서 구조와 상대 링크를 검토했습니다. TCAD 실행은 수행하지 않았습니다.
- **남은 일:** 이후 개인 폴더의 모든 변경 시 새 기록을 추가합니다.

## 2026-07-30 02:51 KST — Phase 2 잘못된 폴더 복구 및 산출물 연결

- **작성자:** 주상현 (`@jujushmaterial`), OpenAI ChatGPT 지원
- **Phase / Issue:** Phase 2 / #2
- **결과물 ID:** `P02-T01-O01`, `P02-T01-O02`, `P02-T02-O01`, `P02-T02-O02`, `P02-T03-O01`, `P02-T03-O02`, `P02-T05-O01`, `P02-T05-O02`, `P02-T05-O03`, `P02-T06-O01`
- **변경 유형:** 이동 / 제출 연결 / 문서화 / 정리
- **변경 파일:** `members/minhosong-mse/phase2_single_metal_vcat/`의 기존 파일, `members/SongMinho/phases/phase-02/`, `members/SongMinho/result_notes/phase-02_current-status.md`, `members/SongMinho/handoff/phase-02_output-mapping.md`, `docs/data/submissions.json`
- **작업 내용:** 잘못 생성된 `members/minhosong-mse/phase2_single_metal_vcat/`의 Phase 2 자료를 송민호의 정식 개인 폴더와 과제·산출물 ID별 표준 제출 경로로 재배치하고 대시보드 제출 이력에 연결했습니다. 동일 자료가 두 산출물의 근거인 경우 각 산출물 제출 경로에서 확인할 수 있도록 같은 Git blob을 연결했습니다.
- **작업 이유:** Issue의 과제 완료 체크와 실제 산출물 파일이 분리되어 웹에서 `파일 없음`으로 표시되던 문제를 해결하고, 개인 폴더·타임라인·산출물 경로 규칙을 복구하기 위해서입니다.
- **결과 및 검증:** 기존 파일 11개를 확인했습니다. 완료된 `P02-T01`, `P02-T02`, `P02-T03`, `P02-T05`의 9개 산출물과 진행 중인 `P02-T06`의 SDevice 코드 1개를 연결했습니다. P02-T04와 P02-T06의 나머지 결과 및 P02-T07~T09는 실제 자료가 없어 연결하지 않았습니다. TCAD 재실행은 수행하지 않았습니다.
- **남은 일:** Pull Request 검증·병합 후 GitHub Pages에서 Phase 2 산출물 표시를 확인하고, 접합 X-cut·Id–Vd·DC 지표·mesh independence를 계속 수행합니다.
