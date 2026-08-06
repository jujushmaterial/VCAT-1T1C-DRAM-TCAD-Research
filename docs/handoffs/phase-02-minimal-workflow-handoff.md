# Phase 2 최소 개편 Handoff

- **기준일:** 2026-08-07
- **관련 Issue:** #2, #3, #5
- **목적:** 기존 Phase 2 제출물은 그대로 보존하면서 Local Mesh와 최소 3D 검증을 후속 연구에 연결합니다.
- **기존 개인 Handoff:** [`members/SongMinho/handoff/phase-02_output-mapping.md`](../../members/SongMinho/handoff/phase-02_output-mapping.md)

> 이 문서는 기존 개인 Handoff를 교체하거나 수정하지 않는 공용 보완 문서입니다.

## 1. 기존 결과 보존

- `P02-T01~T08`의 기존 Task, Output, 체크 상태와 제출물을 수정하지 않습니다.
- `P02-T09`는 기존 Uniform MeshScale 0.5·1·2 비교 Task로 유지합니다.
- 기존 DC, Id–Vg, Id–Vd, 양방향 전류, GIDL, BTBT와 E-field 결과를 다시 실행하지 않습니다.
- 기존 제출물의 raw data, 이미지, 코드와 해석 문서를 삭제·이동·덮어쓰기하지 않습니다.

## 2. P02-T09-O03 상태

`P02-T09-O03` 제출 자료에는 재실행이 아니라 허용 기준표와 판정식 보완이 필요하다는 검토 기록이 있습니다. 승인되지 않은 제출본을 완료 증거로 임의 처리하지 않으며, 기존 파일이나 검토 상태를 이번 Workflow 개편에서 변경하지 않습니다.

## 3. 신규 Phase 2 Task

### P02-T10 — 기존 자료 재사용 기반 Local Mesh Baseline

- 기존 `P02-T09` 자료를 먼저 사용합니다.
- A/B/C/E 공간 중요도를 정리합니다.
- Local Mesh 후보 1조건을 계산합니다.
- 결론이 불분명하거나 후보 순위에 영향이 있을 때만 Reference-Local 1조건을 추가합니다.
- 기존 Uniform Mesh 조건은 다시 계산하지 않습니다.

### P02-T11 — Single-Metal 3D 최소 기준 검증

- 기준 Single-Metal 3D 1조건을 생성합니다.
- `P02-T10`의 axial/radial Mesh 규칙을 재사용합니다.
- Mesh 영향이 의심될 때만 둘레 방향 Refinement 1조건을 추가합니다.
- 2D–3D의 핵심 성능, 전계와 전류 경향을 비교합니다.

## 4. Phase 3 전달 규칙

- Phase 3 초기 구조 탐색은 기존 Phase 2 결과로 시작할 수 있습니다.
- Phase 3 최종 후보 순위 확정 전 `P02-T10`을 반영합니다.
- 모든 Phase 3 후보를 다시 실행하지 않습니다.
- 상위 후보 최대 3개에서만 WF boundary·Gap edge Local Refinement를 확인합니다.
- 최종 Multi-WF 3D 전 `P02-T11`을 완료합니다.

## 5. 관련 정책

- [Mesh Baseline Policy](../policies/mesh-baseline-policy.md)
- [2D–3D Comparison Policy](../policies/2d-3d-comparison-policy.md)
- [Process Window Policy](../policies/process-window-policy.md)

## 6. 다음 작업자가 먼저 읽을 순서

1. GitHub Issue #2
2. 기존 `P02-T09` 제출 자료
3. [Mesh Baseline Policy](../policies/mesh-baseline-policy.md)
4. `P02-T10` 신규 Task
5. [2D–3D Comparison Policy](../policies/2d-3d-comparison-policy.md)
6. `P02-T11` 신규 Task

## 7. 완료 판단

- 기존 결과와 파일이 변경되지 않았습니다.
- 신규 Task는 모두 미완료 상태로 등록됩니다.
- 신규 계산은 Local Mesh 1조건과 Single-Metal 3D 1조건부터 시작합니다.
- 추가 계산은 결론이 불분명하거나 Mesh 영향이 의심되는 경우에만 수행합니다.
