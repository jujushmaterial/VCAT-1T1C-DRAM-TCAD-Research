# Phase 5 산출물 — Single-Metal 대비 개선 판정 기준

- 과제 ID: `P05-T01`
- 산출물 ID: `P05-T01-O04`
- 제출자: 송민호 (`@minhosong-mse`)
- 제출 시각: 2026-08-19T06:27:20.073Z
- 관련 Issue: [#5](https://github.com/jujushmaterial/VCAT-1T1C-DRAM-TCAD-Research/issues/5)
- 제출 방식: table

## 저장된 표

- 크기: 8행 × 4열
- 첫 행 제목 사용: 예
- [CSV 원본](./table.csv)
- [TSV 원본](./table.tsv)
- [JSON 원본](./table.json)

## 표 설명

Ion-only가 아니라 drive/leakage/SS/DIBL/GIDL/convergence의 multi-metric 개선 기준.

| Criterion | PreferredDirection | DecisionRule | Reason |
| --- | --- | --- | --- |
| Drive | Ion higher than P2 | do not select Ion-only global best | avoid short-M2 leakage collapse |
| Off leakage | Ioff lower than P2 | strong increase = rejection evidence | off-state/retention risk |
| SS | no meaningful degradation | small sub-percent change may be accepted with strong total improvement | avoid arbitrary post-hoc cutoff |
| DIBL | lower than P2 | DIBL+Ioff both worse = strong reject | electrostatic control |
| GIDL | lower than P2 | shortlist/guard only, not all 49 | expensive BTBT calculation |
| Convergence | complete/reproducible | incomplete cannot be Nominal | numerical reliability |
| Final | multi-metric balance | core improvement + no catastrophic degradation | P5 objective |
