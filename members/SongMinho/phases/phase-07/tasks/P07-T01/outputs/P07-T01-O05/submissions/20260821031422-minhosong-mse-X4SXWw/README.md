# Phase 7 산출물 — P8 변수별 Sweep 범위

- 과제 ID: `P07-T01`
- 산출물 ID: `P07-T01-O05`
- 제출자: 송민호 (`@minhosong-mse`)
- 제출 시각: 2026-08-21T03:14:22.596Z
- 관련 Issue: [#7](https://github.com/jujushmaterial/VCAT-1T1C-DRAM-TCAD-Research/issues/7)
- 제출 방식: table

## 저장된 표

- 크기: 3행 × 13열
- 첫 행 제목 사용: 예
- [CSV 원본](./table.csv)
- [TSV 원본](./table.tsv)
- [JSON 원본](./table.json)

## 표 설명

P8 최초 2D tolerance campaign의 탐색범위로 B1=33–37 nm, B2=63–69 nm를 제안하고 primary step은 1 nm로 정리하였다. 총 후보는 5×7=35 geometry이다. 이 범위는 최종 공정 허용 Window가 아니라 P8에서 Device-level Window를 찾기 위한 campaign domain이다. 0.5 nm는 전체 Grid가 아니라 향후 사전 고정된 PASS/Marginal/FAIL 경계 주변 adaptive refinement 용도로만 남긴다. B2=68/69 electrical data는 P8에서 새 계산이 필요하다.

| Variable | Nominal_nm | P5_Evidence_Min_nm | P5_Evidence_Max_nm | P5_Coarse_Step_nm | P8_Initial_Campaign_Min_nm | P8_Initial_Campaign_Max_nm | P8_Primary_Step_nm | Point_Count | P8_Adaptive_Refinement | Range_Status | Basis | Important_Limit |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| Xbnd1_nm | 35 | 33 | 45 | 2 | 33 | 37 | 1 | 5 | 0.5 nm only near a predeclared Device PASS/Marginal/FAIL transition after the 1-nm grid | FINAL_FOR_P8_CAMPAIGN_HANDOFF | Brackets nominal with direct P5 electrical neighbors 33/35/37; 1 nm halves the coarse 2-nm P5 resolution because local response is measurably nonlinear | This is a P8 search/campaign domain, NOT the final process tolerance window |
| Xbnd2_nm | 67 | 55 | 67 | 2 | 63 | 69 | 1 | 7 | 0.5 nm only near a predeclared Device PASS/Marginal/FAIL transition after the 1-nm grid | FINAL_FOR_P8_CAMPAIGN_HANDOFF | 63/65/67 provide P5 one-sided curvature and shortlist evidence; 69 gives the +2-nm side around nominal and has P6 geometry/mesh preflight | 68/69 require new P8 electrical simulation; 35/69 is NOT a P7 electrical result |
