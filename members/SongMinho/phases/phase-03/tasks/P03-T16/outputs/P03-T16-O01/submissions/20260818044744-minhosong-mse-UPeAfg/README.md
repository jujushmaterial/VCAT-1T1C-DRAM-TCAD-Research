# Phase 3 산출물 — P4 전달 L-H-L 대표구조 조건표

- 과제 ID: `P03-T16`
- 산출물 ID: `P03-T16-O01`
- 제출자: 송민호 (`@minhosong-mse`)
- 제출 시각: 2026-08-18T04:47:44.713Z
- 관련 Issue: [#3](https://github.com/jujushmaterial/VCAT-1T1C-DRAM-TCAD-Research/issues/3)
- 제출 방식: table

## 저장된 표

- 크기: 21행 × 4열
- 첫 행 제목 사용: 예
- [CSV 원본](./table.csv)
- [TSV 원본](./table.tsv)
- [JSON 원본](./table.json)

## 표 설명

P03-T16 최종 대표구조 조건표입니다. P03-T15 coarse geometry 평가와 양방향 검증 후 G2(1:2:1, 15/30/15 nm)를 P4 전달 대표구조로 고정합니다. Xbnd1=0.035 um, Xbnd2=0.065 um이며 최종 handoff mesh는 Mesh ON입니다.

| P03-T16-O01 P4 전달 L-H-L 대표구조 조건표 |  |  |  |
| --- | --- | --- | --- |
|  |  |  |  |
| Item | Value | Unit | Note |
| Structure | Low-High-Low three-zone VCAT |  | P4 final representative |
| Geometry ID | G2 |  | T15/T16 representative |
| M1:M2:M3 | 1:2:1 |  | relative segment ratio |
| Segment lengths | 15 / 30 / 15 | nm | Lg=60 nm |
| Dpillar | 12 | nm |  |
| Tox | 1 | nm |  |
| Lg | 60 | nm |  |
| Lsn / Lbl | 20 / 20 | nm |  |
| Xgate span | 0.020 ~ 0.080 | um |  |
| Xbnd1 | 0.035 | um | M1/M2 boundary |
| Xbnd2 | 0.065 | um | M2/M3 boundary |
| Nbody | 1e17 | cm^-3 |  |
| NSD | 1e20 | cm^-3 |  |
| JDepthSN / JDepthBL | 20 / 20 | nm |  |
| GaussFactor | 0.8 |  |  |
| MeshScale | 1 |  |  |
| Temp | 300 | K |  |
| Final mesh | Mesh ON |  | WF-boundary dedicated refinement retained |
