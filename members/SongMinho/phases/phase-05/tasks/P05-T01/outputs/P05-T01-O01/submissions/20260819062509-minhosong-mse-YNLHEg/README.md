# Phase 5 산출물 — P2 Single-Metal 기준 성능표

- 과제 ID: `P05-T01`
- 산출물 ID: `P05-T01-O01`
- 제출자: 송민호 (`@minhosong-mse`)
- 제출 시각: 2026-08-19T06:25:09.465Z
- 관련 Issue: [#5](https://github.com/jujushmaterial/VCAT-1T1C-DRAM-TCAD-Research/issues/5)
- 제출 방식: table

## 저장된 표

- 크기: 9행 × 5열
- 첫 행 제목 사용: 예
- [CSV 원본](./table.csv)
- [TSV 원본](./table.tsv)
- [JSON 원본](./table.json)

## 표 설명

P2 matched Single-Metal의 P5 비교 기준 성능표. Ion/Ioff/Vth/SS/DIBL/GIDL을 P5 공통 extraction으로 정리.

| Metric | Value | Unit | Condition | Extraction |
| --- | --- | --- | --- | --- |
| Ion | 8.47644973774148e-06 | A | Vd=1.0 V, Vg=1.0 V | \|storage TotalCurrent\| |
| Ioff | 3.10124663510952e-15 | A | Vd=1.0 V, Vg≈0 V | nearest Vg=0 point |
| Ion/Ioff | 2733239479.175488 | ratio | derived | Ion/Ioff |
| Vth@Vd0.05 | 0.5066665598316268 | V | Vd=0.05 V | \|Id\|=1e-7 A, log(Id)-linear interpolation |
| Vth@Vd1.0 | 0.5034297180662931 | V | Vd=1.0 V | \|Id\|=1e-7 A, log(Id)-linear interpolation |
| SS@Vd1.0 | 60.04591002381508 | mV/dec | 1e-12<=\|Id\|<=1e-8 A | regression log10\|Id\| vs Vg; SS=1000/slope |
| DIBL | 3.4072018582459744 | mV/V | Vd 0.05/1.0 V | (Vth0.05-Vth1.0)/0.95×1000 |
| GIDL | 2.87905306067451e-14 | A | Vd=1.0 V, Vg=-0.4 V | \|storage TotalCurrent\| |
