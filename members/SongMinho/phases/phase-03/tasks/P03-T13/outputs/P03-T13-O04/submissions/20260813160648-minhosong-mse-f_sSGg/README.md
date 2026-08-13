# Phase 3 산출물 — 두 Metal Boundary 위치·Segment 조건표

- 과제 ID: `P03-T13`
- 산출물 ID: `P03-T13-O04`
- 제출자: 송민호 (`@minhosong-mse`)
- 제출 시각: 2026-08-13T16:06:48.568Z
- 관련 Issue: [#3](https://github.com/jujushmaterial/VCAT-1T1C-DRAM-TCAD-Research/issues/3)
- 제출 방식: table

## 저장된 표

- 크기: 5행 × 10열
- 첫 행 제목 사용: 예
- [CSV 원본](./table.csv)
- [TSV 원본](./table.tsv)
- [JSON 원본](./table.json)

## 표 설명

Lg=60 nm, M1:M2:M3=1:1:1 기준으로 Xbnd1=0.040 um, Xbnd2=0.060 um이며 각 segment 길이는 20 nm이다.

| Condition | Lg_nm | M1Ratio | M2Ratio | M3Ratio | M1_nm | M2_nm | M3_nm | Xbnd1_um | Xbnd2_um |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| Baseline | 60 | 1 | 1 | 1 | 20.0 | 20.0 | 20.0 | 0.040 | 0.060 |
|  |  |  |  |  |  |  |  |  |  |
| Derived from SDE: XsnEnd=0.020 um, XgateEnd=0.080 um; M1/M2/M3 ratios are normalized. |  |  |  |  |  |  |  |  |  |
| WF boundaries are structural segment boundaries; work functions are assigned in SDevice through gate_m1/gate_m2/gate_m3. |  |  |  |  |  |  |  |  |  |
