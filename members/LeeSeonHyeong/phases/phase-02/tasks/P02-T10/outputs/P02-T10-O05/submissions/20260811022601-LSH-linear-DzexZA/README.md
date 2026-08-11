# Phase 2 산출물 — 후속 Phase용 Mesh Baseline 안내서

- 과제 ID: `P02-T10`
- 산출물 ID: `P02-T10-O05`
- 제출자: 이선형 (`@LSH-linear`)
- 제출 시각: 2026-08-11T02:26:01.143Z
- 관련 Issue: [#2](https://github.com/jujushmaterial/VCAT-1T1C-DRAM-TCAD-Research/issues/2)
- 제출 방식: files

## 제출 파일

- [P02-T10-O05_local-mesh-baseline-final-handoff.pdf](./files/P02-T10-O05_local-mesh-baseline-final-handoff.pdf) (547.9KB)

## 제출 메모

Phase 2 Local Mesh 최종 검증 및 후속 Phase 적용 기준 안내서.
일반적인 후속 2D VCAT sweep에는 기존 P02_T10_LocalMesh_Contour_v1을 baseline으로 사용하고, GIDL/BTBT 절대값 정밀 검증에는 Uniform Fine 0.5를 reference로 유지한다.
Junction Mesh 추가 Fine split은 계산 안정성과 비용이 악화되어 최종 baseline에는 적용하지 않는다.
담당자 검토 결과 본 방향을 승인받았으며 Phase 3 이후에는 Local Mesh를 기본 2D screening mesh로 사용한다.
