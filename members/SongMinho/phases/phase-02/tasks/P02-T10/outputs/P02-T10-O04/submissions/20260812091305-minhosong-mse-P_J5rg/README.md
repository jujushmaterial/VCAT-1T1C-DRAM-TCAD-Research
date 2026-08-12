# Phase 2 산출물 — 기존 Medium 또는 Fine 대비 최소 비교표

- 과제 ID: `P02-T10`
- 산출물 ID: `P02-T10-O04`
- 제출자: 송민호 (`@minhosong-mse`)
- 제출 시각: 2026-08-12T09:13:05.803Z
- 관련 Issue: [#2](https://github.com/jujushmaterial/VCAT-1T1C-DRAM-TCAD-Research/issues/2)
- 제출 방식: files

## 제출 파일

- [P02-T10-O04_Local_vs_Reference_Comparison.xlsx](./files/P02-T10-O04_Local_vs_Reference_Comparison.xlsx) (9.5KB)

## 제출 메모

Local Contour v1과 기존 Uniform Fine 0.5/Medium 1.0을 비교했다. DC 및 peak ElectricField는 Fine에 근접했으나 GIDL(-0.4 V)은 Fine보다 약 19.96%, BTBT peak는 약 15.93% 높았다. 반면 GIDL runtime은 약 33.7%, SDevice element 수는 약 36.4% 감소했다. 따라서 Local mesh는 2D screening baseline으로 채택하되 absolute GIDL/BTBT precision reference는 Fine 0.5를 유지한다.
