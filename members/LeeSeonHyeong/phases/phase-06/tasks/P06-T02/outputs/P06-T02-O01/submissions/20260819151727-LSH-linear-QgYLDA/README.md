# Phase 6 산출물 — P5 원본–P6 Parameterized Nominal 성능 비교표

- 과제 ID: `P06-T02`
- 산출물 ID: `P06-T02-O01`
- 제출자: 이선형 (`@LSH-linear`)
- 제출 시각: 2026-08-19T15:17:27.546Z
- 관련 Issue: [#6](https://github.com/jujushmaterial/VCAT-1T1C-DRAM-TCAD-Research/issues/6)
- 제출 방식: table

## 저장된 표

- 크기: 8행 × 7열
- 첫 행 제목 사용: 예
- [CSV 원본](./table.csv)
- [TSV 원본](./table.tsv)
- [JSON 원본](./table.json)

## 표 설명

P5 최종 Nominal 구조(B1/B2=35/67 nm, WF=4.33/4.70/4.33 eV)와 P6 Parameterized Nominal fresh rerun 결과를 비교하였다. Ion, Ioff, Ion/Ioff, Vth@Vd=0.05/1.0 V, SS, DIBL이 동일하게 재현되었으며, parameterization 전후 Nominal 전기적 특성의 일치를 확인하였다.

| Metric | P5_Original | P6_Parameterized_Fresh | Absolute_Difference | Relative_Difference_percent | Unit | Result |
| --- | --- | --- | --- | --- | --- | --- |
| Ion | 1.0474762119570801e-05 | 1.0474762119570801e-05 | 0 | 0 | A | PASS |
| Ioff | 9.1803922619233009e-16 | 9.1803922619233009e-16 | 0 | 0 | A | PASS |
| Ion/Ioff | 11409928705.351778 | 11409928705.351778 | 0 | 0 | - | PASS |
| Vth@Vd=0.05 | 0.48644073014828199 | 0.48644073014828199 | 0 | 0 | V | PASS |
| Vth@Vd=1.0 | 0.4844220200010349 | 0.4844220200010349 | 0 | 0 | V | PASS |
| SS@Vd=1.0 | 60.028188813051067 | 60.028188813051067 | 0 | 0 | mV/dec | PASS |
| DIBL | 2.1249580497337712 | 2.1249580497337712 | 0 | 0 | mV/V | PASS |
