# Phase 3 산출물 — P4 전달 Fixed Low·High WF

- 과제 ID: `P03-T16`
- 산출물 ID: `P03-T16-O02`
- 제출자: 송민호 (`@minhosong-mse`)
- 제출 시각: 2026-08-18T04:48:18.889Z
- 관련 Issue: [#3](https://github.com/jujushmaterial/VCAT-1T1C-DRAM-TCAD-Research/issues/3)
- 제출 방식: table

## 저장된 표

- 크기: 9행 × 5열
- 첫 행 제목 사용: 예
- [CSV 원본](./table.csv)
- [TSV 원본](./table.tsv)
- [JSON 원본](./table.json)

## 표 설명

P03-T14에서 확정한 Fixed WF를 P4 전달값으로 정리했습니다. WF_LOW=4.33 eV(Ti), WF_HIGH=4.70 eV(TiN), gate_m1/m2/m3=4.33/4.70/4.33 eV입니다. 이후 P4~P9에서는 해당 WF를 다시 Sweep하지 않습니다.

| P03-T16-O02 P4 전달 Fixed Low·High WF |  |  |  |  |
| --- | --- | --- | --- | --- |
|  |  |  |  |  |
| Parameter | Value | Unit | Material | Mapping/Note |
| WF_LOW | 4.33 | eV | Ti | gate_m1 / gate_m3 |
| WF_HIGH | 4.7 | eV | TiN | gate_m2 |
| Delta WF | 0.37 | eV | TiN - Ti | Fixed after P03-T14 |
| gate_m1 | 4.33 | eV | Ti | SN-side LOW |
| gate_m2 | 4.7 | eV | TiN | center HIGH |
| gate_m3 | 4.33 | eV | Ti | BL-side LOW |
