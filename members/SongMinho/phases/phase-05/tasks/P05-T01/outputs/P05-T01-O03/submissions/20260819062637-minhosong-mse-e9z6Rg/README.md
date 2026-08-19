# Phase 5 산출물 — 두 Metal Boundary 탐색 범위표

- 과제 ID: `P05-T01`
- 산출물 ID: `P05-T01-O03`
- 제출자: 송민호 (`@minhosong-mse`)
- 제출 시각: 2026-08-19T06:26:37.588Z
- 관련 Issue: [#5](https://github.com/jujushmaterial/VCAT-1T1C-DRAM-TCAD-Research/issues/5)
- 제출 방식: table

## 저장된 표

- 크기: 5행 × 6열
- 첫 행 제목 사용: 예
- [CSV 원본](./table.csv)
- [TSV 원본](./table.tsv)
- [JSON 원본](./table.json)

## 표 설명

B1 33–45, B2 55–67 nm, 2 nm step의 7×7=49 geometry 범위. Segment는 boundary 파생값.

| Variable | Values | Min | Max | Step_nm | Role |
| --- | --- | --- | --- | --- | --- |
| Xbnd1_nm | 33,35,37,39,41,43,45 | 33 | 45 | 2 | independent |
| Xbnd2_nm | 55,57,59,61,63,65,67 | 55 | 67 | 2 | independent |
| Geometry count | 7×7 |  |  |  | 49 geometries |
| M2_HIGH | B2-B1 | 10 | 34 |  | derived; not independently swept |
