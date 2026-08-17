# Phase 3 산출물 — Coarse Geometry 조건표

- 과제 ID: `P03-T15`
- 산출물 ID: `P03-T15-O01`
- 제출자: 송민호 (`@minhosong-mse`)
- 제출 시각: 2026-08-17T12:10:29.055Z
- 관련 Issue: [#3](https://github.com/jujushmaterial/VCAT-1T1C-DRAM-TCAD-Research/issues/3)
- 제출 방식: table

## 저장된 표

- 크기: 13행 × 12열
- 첫 행 제목 사용: 예
- [CSV 원본](./table.csv)
- [TSV 원본](./table.tsv)
- [JSON 원본](./table.json)

## 표 설명

P03-T15-O01 — Coarse Geometry 조건표

Fixed WF는 T14 확정값 Ti/TiN/Ti = 4.33/4.70/4.33 eV이다.
총 gate 60 nm와 대칭 L-H-L을 유지하면서 중앙 HIGH 길이를 10/20/30 nm로 넓게 세 점만 확인했다:
- G1 = 25/10/25 nm (HIGH-short)
- G0 = 20/20/20 nm (baseline)
- G2 = 15/30/15 nm (HIGH-long)

이 범위는 최적점을 찾기 위한 정밀 Sweep이 아니라 방향성/robustness를 확인하는 coarse bracket이다. P5에서는 WF를 고정하고 두 boundary를 독립변수로 더 촘촘히 Sweep한다.

| P03-T15-O01 Coarse Geometry 조건표 |  |  |  |  |  |  |  |  |  |  |  |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
|  |  |  |  |  |  |  |  |  |  |  |  |
| ID | M1:M2:M3 | M1 (nm) | M2 HIGH (nm) | M3 (nm) | Xbnd1 (µm) | Xbnd2 (µm) | WF_LOW | WF_HIGH | Forward Vd | GIDL | Purpose |
| G1 | 2.5:1:2.5 | 25 | 10 | 25 | 0.045 | 0.055 | 4.33 | 4.7 | 0.05 / 1.0 | Vd=1; Vg 0→-0.4 | HIGH-short coarse point |
| G0 | 1:1:1 | 20 | 20 | 20 | 0.04 | 0.06 | 4.33 | 4.7 | 0.05 / 1.0 | Vd=1; Vg 0→-0.4 | Existing n73 baseline |
| G2 | 1:2:1 | 15 | 30 | 15 | 0.035 | 0.065 | 4.33 | 4.7 | 0.05 / 1.0 | Vd=1; Vg 0→-0.4 | HIGH-long coarse point |
|  |  |  |  |  |  |  |  |  |  |  |  |
| 범위 선정 이유: 총 gate 60 nm와 L-H-L 대칭을 유지하면서 중앙 HIGH 구간을 10/20/30 nm로 넓게 세 점만 배치했다. P3의 목적은 최적화가 아니라 HIGH-short / baseline / HIGH-long에서 전기특성이 급격히 무너지는지와 방향성을 확인하는 coarse check이다. P5에서는 Fixed WF 상태에서 두 boundary를 독립변수로 촘촘한 2D Sweep을 수행하므로 P3에서 더 많은 ratio 점을 돌리면 중복된다. |  |  |  |  |  |  |  |  |  |  |  |
|  |  |  |  |  |  |  |  |  |  |  |  |
|  |  |  |  |  |  |  |  |  |  |  |  |
|  |  |  |  |  |  |  |  |  |  |  |  |
|  |  |  |  |  |  |  |  |  |  |  |  |
| Legacy P03-T06도 2-zone Dual-Metal에서 RatioSN=0.25/0.50/0.75를 넓게 확인했다. 현재 T15 3-zone 세 점 역시 coarse bracket이며 최종 geometry optimum을 의미하지 않는다. |  |  |  |  |  |  |  |  |  |  |  |
