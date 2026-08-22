# Phase 8 산출물 — Device-level PASS·Marginal·FAIL 수치 기준표

- 과제 ID: `P08-T01`
- 산출물 ID: `P08-T01-O02`
- 제출자: 송민호 (`@minhosong-mse`)
- 제출 시각: 2026-08-22T14:43:25.785Z
- 관련 Issue: [#8](https://github.com/jujushmaterial/VCAT-1T1C-DRAM-TCAD-Research/issues/8)
- 제출 방식: files

## 제출 파일

- [P08-T01-O02_Criteria_Rationale_FINAL.txt](./files/P08-T01-O02_Criteria_Rationale_FINAL.txt) (4.1KB)
- [P08-T01-O02_Device_Level_Criteria_FINAL.csv](./files/P08-T01-O02_Device_Level_Criteria_FINAL.csv) (2.5KB)

## 제출 메모

P08-T01-O02 — Device-level PASS·MARGINAL·FAIL 수치 기준표

목적
- P8 결과를 보기 전에 Device-level 판정기준을 고정하여 post-hoc 판정을 방지한다.

핵심 기준
- FAIL: required run/extraction invalid 또는 Ion/Ioff/DIBL/GIDL 중 P2 hard boundary 위반
- PASS: Ion/Ioff/DIBL이 P2→P5 개선량의 50% 이상을 유지하고 GIDL P2 guard 통과
- MARGINAL: P2보다 악화되지는 않았지만 core metric 중 하나 이상이 50% 개선량을 유지하지 못함
- GIDL은 P2 hard guard, SS/Vth는 monitor metric으로 사용한다.

주의
- 이 판정은 DRAM PASS가 아니라 단일 Device-level 판정이다.
- 50% retention은 본 연구에서 결과 전에 정한 operational criterion이다.
