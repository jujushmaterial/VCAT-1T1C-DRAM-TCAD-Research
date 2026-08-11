# Phase 2 산출물 — 기존 Mesh 결과 재사용·적용 범위 표

- 과제 ID: `P02-T10`
- 산출물 ID: `P02-T10-O01`
- 제출자: 이선형 (`@LSH-linear`)
- 제출 시각: 2026-08-11T02:56:53.476Z
- 관련 Issue: [#2](https://github.com/jujushmaterial/VCAT-1T1C-DRAM-TCAD-Research/issues/2)
- 제출 방식: files

## 제출 파일

- [P02-T10-O01_mesh-reuse-scope.xlsx](./files/P02-T10-O01_mesh-reuse-scope.xlsx) (11.6KB)

## 제출 메모

P02-T10-O01 — 기존 Mesh 결과 재사용·적용 범위 표

P02-T10에서는 P02-T09에서 확보한 Coarse / Medium / Fine 0.5 Mesh 결과를 새로 재실행하지 않고 기존 결과를 재사용하였다.

Coarse와 Medium은 Mesh 민감도 및 계산비용 비교용으로 활용하였고, Fine 0.5는 GIDL/BTBT 정밀 검증 reference로 유지하였다.

P02-T10에서 별도로 검증한 기존 Local Mesh는 계산비용과 ElectricField 재현성을 고려하여 후속 Phase의 일반적인 2D screening baseline으로 최종 채택하였다. 단, GIDL/BTBT 절대값 정밀 해석에는 Fine 0.5 결과를 reference로 유지한다.

추가로 수행한 Reference-Local JunctionFine v1은 Junction 영역만 세분화한 민감도 검증이며, GIDL sweep 수렴 실패 및 계산비용 증가로 인해 최종 적용하지 않고 검증 기록으로만 보존한다.

첨부 표에는 각 Mesh 조건의 재사용 여부, 재실행 여부, GIDL, runtime, mesh 규모 및 최종 적용 범위를 함께 정리하였다.
