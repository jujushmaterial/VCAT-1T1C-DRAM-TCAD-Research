# Phase 3 산출물 — WF Split Raw Data

- 과제 ID: `P03-T14`
- 산출물 ID: `P03-T14-O02`
- 제출자: 송민호 (`@minhosong-mse`)
- 제출 시각: 2026-08-13T16:11:28.457Z
- 관련 Issue: [#3](https://github.com/jujushmaterial/VCAT-1T1C-DRAM-TCAD-Research/issues/3)
- 제출 방식: table

## 저장된 표

- 크기: 11행 × 6열
- 첫 행 제목 사용: 예
- [CSV 원본](./table.csv)
- [TSV 원본](./table.tsv)
- [JSON 원본](./table.json)

## 표 설명

10개 WF pair × Vd 0.05/1.0 V의 Forward Id-Vg 원본을 하나의 표로 통합하였다. signed storage TotalCurrent와 source CSV 정보를 보존하였다. (10개의 law data가 하나의 엑셀로 합쳐져 업로드함. ai가 읽기에 이게 더 나은것같아서. 다만 너무 커서 별도파일로 첨부)

| Node | LOW metal | WF_LOW_eV | HIGH metal | WF_HIGH_eV | Delta_WF_eV |
| --- | --- | --- | --- | --- | --- |
| n52 | Al | 4.28 | Ti | 4.33 | 0.05 |
| n68 | Al | 4.28 | W | 4.55 | 0.27 |
| n72 | Al | 4.28 | TiN | 4.7 | 0.42 |
| n76 | Al | 4.28 | Mo(110) | 4.95 | 0.67 |
| n69 | Ti | 4.33 | W | 4.55 | 0.22 |
| n73 | Ti | 4.33 | TiN | 4.7 | 0.37 |
| n77 | Ti | 4.33 | Mo(110) | 4.95 | 0.62 |
| n74 | W | 4.55 | TiN | 4.7 | 0.15 |
| n78 | W | 4.55 | Mo(110) | 4.95 | 0.4 |
| n79 | TiN | 4.7 | Mo(110) | 4.95 | 0.25 |
