# Phase 6 산출물 — Parameter–Geometry 대응표

- 과제 ID: `P06-T01`
- 산출물 ID: `P06-T01-O02`
- 제출자: 송민호 (`@minhosong-mse`)
- 제출 시각: 2026-08-19T07:45:31.803Z
- 관련 Issue: [#6](https://github.com/jujushmaterial/VCAT-1T1C-DRAM-TCAD-Research/issues/6)
- 제출 방식: table

## 저장된 표

- 크기: 8행 × 8열
- 첫 행 제목 사용: 예
- [CSV 원본](./table.csv)
- [TSV 원본](./table.tsv)
- [JSON 원본](./table.json)

## 표 설명

Xbnd1/Xbnd2와 M1/M2/M3의 geometry 대응표. B1/B2가 독립변수이며 M1=B1-20, M2=B2-B1, M3=80-B2는 파생값이다. WF는 고정값이다.

| Parameter | Role | Unit | Nominal | Geometry_Meaning | Derived_Relation | Constraint | P5_Data_Reuse_Note |
| --- | --- | --- | --- | --- | --- | --- | --- |
| Xbnd1_nm | independent tolerance variable | nm | 35.0 | LOW→HIGH metal/WF boundary | M1=Xbnd1-20; M2=Xbnd2-Xbnd1 | 20 < B1 < B2 | P5 grid has 33,35,37 neighbors at B2=67 |
| Xbnd2_nm | independent tolerance variable | nm | 67.0 | HIGH→LOW metal/WF boundary | M2=Xbnd2-Xbnd1; M3=80-Xbnd2 | B1 < B2 < 80 | P5 grid has 65,67; +2 nm=69 not in P5 raw |
| M1_nm | derived | nm | 15.0 | left LOW-WF segment length | B1-20 | M1>0 | Do not sweep independently |
| M2_HIGH_nm | derived | nm | 32.0 | central HIGH-WF segment length | B2-B1 | M2>0 | Physical interpretation variable; not independent |
| M3_nm | derived | nm | 13.0 | right LOW-WF segment length | 80-B2 | M3>0 | Do not sweep independently |
| WF_LOW | fixed | eV | 4.33 | gate_m1 and gate_m3 work function | fixed | no P6/P7/P8 WF optimization | P3/P5 fixed |
| WF_HIGH | fixed | eV | 4.7 | gate_m2 work function | fixed | no P6/P7/P8 WF optimization | P3/P5 fixed |
