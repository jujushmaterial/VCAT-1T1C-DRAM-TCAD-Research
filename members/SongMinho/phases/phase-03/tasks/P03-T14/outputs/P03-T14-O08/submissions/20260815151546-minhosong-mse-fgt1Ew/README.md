# Phase 3 산출물 — WF Split Raw Data(전체 law data)

- 과제 ID: `P03-T14`
- 산출물 ID: `P03-T14-O08`
- 제출자: 송민호 (`@minhosong-mse`)
- 제출 시각: 2026-08-15T15:15:46.038Z
- 관련 Issue: [#3](https://github.com/jujushmaterial/VCAT-1T1C-DRAM-TCAD-Research/issues/3)
- 제출 방식: files

## 제출 파일

- [P03-T14-O08_GIDL_10WF_CSV_Integrated_Curve.xlsx](./files/P03-T14-O08_GIDL_10WF_CSV_Integrated_Curve.xlsx) (295.9KB)
- [P03-T14-O08_GIDL_Node_Map.csv](./files/P03-T14-O08_GIDL_Node_Map.csv) (305B)
- [P03-T14-O08_README.md](./files/P03-T14-O08_README.md) (978B)

## 제출 메모

Forward 원본 CSV 20개(Vd=0.05 V 10개 + Vd=1.0 V 10개)와
GIDL 원본 CSV 10개를 전체 raw data로 제출한다.

GIDL은 계산시간 때문에 5조건씩 두 개의 SWB 실행으로 나누어 수행하였다.
원본 실행 증거로 Sentaurus Visual 5-curve 화면 2개와 SWB split/parameter 화면을 첨부한다.

전체 10조건 GIDL 비교 그래프는 두 실행에서 export한 원본 CSV 10개를 통합해
Excel에서 작성하였다. 이 Excel은 새로운 TCAD 결과를 생성하지 않으며
원본 signed current를 보존한다.

기존 O08 제출본의 파일명이 P03-T14-O02로 시작해 integrity warning이 있으므로,
이번 보완본은 P03-T14-O08 접두어를 사용한다. 기존 제출본은 삭제하지 않는다.
