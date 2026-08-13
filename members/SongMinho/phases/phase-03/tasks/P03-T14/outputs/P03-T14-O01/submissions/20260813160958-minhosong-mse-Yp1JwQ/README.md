# Phase 3 산출물 — WF Split 범위·조건표

- 과제 ID: `P03-T14`
- 산출물 ID: `P03-T14-O01`
- 제출자: 송민호 (`@minhosong-mse`)
- 제출 시각: 2026-08-13T16:09:58.026Z
- 관련 Issue: [#3](https://github.com/jujushmaterial/VCAT-1T1C-DRAM-TCAD-Research/issues/3)
- 제출 방식: table

## 저장된 표

- 크기: 31행 × 14열
- 첫 행 제목 사용: 예
- [CSV 원본](./table.csv)
- [TSV 원본](./table.tsv)
- [JSON 원본](./table.json)

## 표 설명

Al/Ti/W/TiN/Mo(110) 프로젝트 WF 값을 이용한 LOW<HIGH 10개 pair를 Vd=0.05 V와 1.0 V에서 실행한 총 20개 Forward WF Split 조건표이다.

| Set | Node | LOW metal | WF_LOW_eV | HIGH metal | WF_HIGH_eV | Delta_WF_eV | Vd_V | VgStop_V | Temp_K | M1Ratio | M2Ratio | M3Ratio | Mapping |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| Vd0p05 | n52 | Al | 4.28 | Ti | 4.33 | 0.05 | 0.05 | 1.00 | 300 | 1 | 1 | 1 | LOW/HIGH/LOW |
| Vd0p05 | n68 | Al | 4.28 | W | 4.55 | 0.27 | 0.05 | 1.00 | 300 | 1 | 1 | 1 | LOW/HIGH/LOW |
| Vd0p05 | n72 | Al | 4.28 | TiN | 4.70 | 0.42 | 0.05 | 1.00 | 300 | 1 | 1 | 1 | LOW/HIGH/LOW |
| Vd0p05 | n76 | Al | 4.28 | Mo(110) | 4.95 | 0.67 | 0.05 | 1.00 | 300 | 1 | 1 | 1 | LOW/HIGH/LOW |
| Vd0p05 | n69 | Ti | 4.33 | W | 4.55 | 0.22 | 0.05 | 1.00 | 300 | 1 | 1 | 1 | LOW/HIGH/LOW |
| Vd0p05 | n73 | Ti | 4.33 | TiN | 4.70 | 0.37 | 0.05 | 1.00 | 300 | 1 | 1 | 1 | LOW/HIGH/LOW |
| Vd0p05 | n77 | Ti | 4.33 | Mo(110) | 4.95 | 0.62 | 0.05 | 1.00 | 300 | 1 | 1 | 1 | LOW/HIGH/LOW |
| Vd0p05 | n74 | W | 4.55 | TiN | 4.70 | 0.15 | 0.05 | 1.00 | 300 | 1 | 1 | 1 | LOW/HIGH/LOW |
| Vd0p05 | n78 | W | 4.55 | Mo(110) | 4.95 | 0.40 | 0.05 | 1.00 | 300 | 1 | 1 | 1 | LOW/HIGH/LOW |
| Vd0p05 | n79 | TiN | 4.70 | Mo(110) | 4.95 | 0.25 | 0.05 | 1.00 | 300 | 1 | 1 | 1 | LOW/HIGH/LOW |
| Vd1p0 | n52 | Al | 4.28 | Ti | 4.33 | 0.05 | 1.00 | 1.00 | 300 | 1 | 1 | 1 | LOW/HIGH/LOW |
| Vd1p0 | n68 | Al | 4.28 | W | 4.55 | 0.27 | 1.00 | 1.00 | 300 | 1 | 1 | 1 | LOW/HIGH/LOW |
| Vd1p0 | n72 | Al | 4.28 | TiN | 4.70 | 0.42 | 1.00 | 1.00 | 300 | 1 | 1 | 1 | LOW/HIGH/LOW |
| Vd1p0 | n76 | Al | 4.28 | Mo(110) | 4.95 | 0.67 | 1.00 | 1.00 | 300 | 1 | 1 | 1 | LOW/HIGH/LOW |
| Vd1p0 | n69 | Ti | 4.33 | W | 4.55 | 0.22 | 1.00 | 1.00 | 300 | 1 | 1 | 1 | LOW/HIGH/LOW |
| Vd1p0 | n73 | Ti | 4.33 | TiN | 4.70 | 0.37 | 1.00 | 1.00 | 300 | 1 | 1 | 1 | LOW/HIGH/LOW |
| Vd1p0 | n77 | Ti | 4.33 | Mo(110) | 4.95 | 0.62 | 1.00 | 1.00 | 300 | 1 | 1 | 1 | LOW/HIGH/LOW |
| Vd1p0 | n74 | W | 4.55 | TiN | 4.70 | 0.15 | 1.00 | 1.00 | 300 | 1 | 1 | 1 | LOW/HIGH/LOW |
| Vd1p0 | n78 | W | 4.55 | Mo(110) | 4.95 | 0.40 | 1.00 | 1.00 | 300 | 1 | 1 | 1 | LOW/HIGH/LOW |
| Vd1p0 | n79 | TiN | 4.70 | Mo(110) | 4.95 | 0.25 | 1.00 | 1.00 | 300 | 1 | 1 | 1 | LOW/HIGH/LOW |
|  |  |  |  |  |  |  |  |  |  |  |  |  |  |
|  |  |  |  |  |  |  |  |  |  |  |  |  |  |
| Common condition | Value |  |  |  |  |  |  |  |  |  |  |  |  |
| Dpillar | 12 nm |  |  |  |  |  |  |  |  |  |  |  |  |
| Tox | 1 nm |  |  |  |  |  |  |  |  |  |  |  |  |
| Lg / Lsn / Lbl | 60 / 20 / 20 nm |  |  |  |  |  |  |  |  |  |  |  |  |
| Nbody / NSD | 1e17 / 1e20 cm^-3 |  |  |  |  |  |  |  |  |  |  |  |  |
| JDepthSN / JDepthBL | 20 / 20 nm |  |  |  |  |  |  |  |  |  |  |  |  |
| GaussFactor / MeshScale | 0.8 / 1.0 |  |  |  |  |  |  |  |  |  |  |  |  |
| Note | Node numbers repeat because Vd=0.05 and Vd=1.0 were executed in separate SWB sets. |  |  |  |  |  |  |  |  |  |  |  |  |
