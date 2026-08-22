# Phase 8 산출물 — 1차 Device-level 2D Tolerance Window

- 과제 ID: `P08-T02`
- 산출물 ID: `P08-T02-O06`
- 제출자: 이선형 (`@LSH-linear`)
- 제출 시각: 2026-08-22T14:51:20.996Z
- 관련 Issue: [#8](https://github.com/jujushmaterial/VCAT-1T1C-DRAM-TCAD-Research/issues/8)
- 제출 방식: files

## 제출 파일

- [P08-T02-O06_First_2D_Window_Matrix.csv](./files/P08-T02-O06_First_2D_Window_Matrix.csv) (244B)
- [P08-T02-O06_Primary31_plus_Supp15_Tiered_Boundary_Evidence.csv](./files/P08-T02-O06_Primary31_plus_Supp15_Tiered_Boundary_Evidence.csv) (5.8KB)
- [P08-T02-O06_Primary31_plus_Supp15_Tiered_Map.csv](./files/P08-T02-O06_Primary31_plus_Supp15_Tiered_Map.csv) (705B)
- [P08-T02-O06_Primary31_plus_Supp15_Tiered_Map.png](./files/P08-T02-O06_Primary31_plus_Supp15_Tiered_Map.png) (80.1KB)
- [P08-T02-O06_Supplemental_Boundary_Interpretation.txt](./files/P08-T02-O06_Supplemental_Boundary_Interpretation.txt) (1.1KB)
- [P08-T02-O06_Window_Summary.txt](./files/P08-T02-O06_Window_Summary.txt) (396B)
- [P08-T02-O06_Device_Class_Map.png](./files/P08-T02-O06_Device_Class_Map.png) (53.1KB)
- [P08-T02-O06_DIBL_Map.png](./files/P08-T02-O06_DIBL_Map.png) (85.2KB)
- [P08-T02-O06_First_2D_Window_Long.csv](./files/P08-T02-O06_First_2D_Window_Long.csv) (4.8KB)

## 제출 메모

P08-T02-O06 — 1차 Device-level 2D Tolerance Window

목적
- preregistered primary 31-point campaign으로 P8의 첫 Device-level geometry Window를 시각화한다.

결과
- PASS: 28/31
- MARGINAL: 3/31
- FAIL: 0/31
- MARGINAL: 36/63, 37/63, 37/64
- Holdout: 34/64, 34/68, 36/64, 36/68 — 미실행 상태 유지
- limiting metric: DIBL

포함 시각자료
- Device class map
- DIBL 2D map
- long-form / matrix CSV

주의
- 이 산출물은 '1차 2D Device-level Window'이다.
- 최종 P08-T04 3D-calibrated Window 또는 DRAM PASS map으로 표현하지 않는다.

Supplemental extension의 역할
- primary 31점만으로는 original domain 안에서 FAIL이 없었다.
- 이후 15점 boundary reconnaissance에서 38/62, 39/62가 DIBL FAIL로 확인되어 high-Xbnd1/low-Xbnd2 방향의 외부 FAIL 영역을 bracket하였다.
- 따라서 O06에는 primary Window와 함께 evidence tier를 구분한 primary+supplemental map을 추가한다.
- supplemental 15점은 original preregistered 31점으로 재분류하지 않는다.
