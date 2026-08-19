# Phase 5 산출물 — 제외 조건·치명적 열화 기준

- 과제 ID: `P05-T01`
- 산출물 ID: `P05-T01-O05`
- 제출자: 송민호 (`@minhosong-mse`)
- 제출 시각: 2026-08-19T06:28:00.275Z
- 관련 Issue: [#5](https://github.com/jujushmaterial/VCAT-1T1C-DRAM-TCAD-Research/issues/5)
- 제출 방식: table

## 저장된 표

- 크기: 6행 × 4열
- 첫 행 제목 사용: 예
- [CSV 원본](./table.csv)
- [TSV 원본](./table.tsv)
- [JSON 원본](./table.json)

## 표 설명

short-M2 leakage/SCE 악화, non-convergence, Ion-only optimum 등 탈락 기준.

| ExclusionCase | Rule | ObservedExample | Reason |
| --- | --- | --- | --- |
| Incomplete/non-converged | reject | none among final 49 Forward | unreliable metrics |
| Ioff and DIBL both worse than P2 | reject unless separately justified | short-M2, especially M2<=18 nm | leakage/SCE penalty |
| Order-level Ioff rise | reject | 45/55: Ioff about 16.6× P2 | catastrophic leakage |
| Ion-only optimum | do not select automatically | 45/55 | balanced optimization |
| Minor one-metric variation | not automatic fail | 35/65 SS slightly worse | sub-percent variation |
