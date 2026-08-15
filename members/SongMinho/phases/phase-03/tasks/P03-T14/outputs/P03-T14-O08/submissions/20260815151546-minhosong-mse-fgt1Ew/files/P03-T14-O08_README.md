# P03-T14-O08 WF Split 전체 Raw Data

## 구성
- Forward Vd=0.05 V 원본 CSV: 10개
- Forward Vd=1.0 V 원본 CSV: 10개
- GIDL 원본 CSV: 10개
- GIDL Sentaurus Visual 원본 5-curve 화면: 2개
- GIDL SWB split/parameter 증거 화면
- GIDL 10조건 CSV 통합 Excel 그래프: 1개

## GIDL 실행 분할 설명
GIDL 계산은 계산시간을 고려하여 두 SWB 실행으로 5조건씩 나누어 수행하였다.
원본 실행 증거는 두 개의 Sentaurus Visual 5-curve 화면이며,
전체 10조건 비교 그래프는 각 실행에서 export한 10개 CSV를 하나로 통합하여 Excel에서 작성하였다.
Excel 그래프는 새로운 TCAD 데이터를 생성하지 않으며 원본 signed current를 보존한다.

## 파일명 주의
본 제출은 기존 O08 제출의 `P03-T14-O02_...` 접두어 불일치 경고를 반복하지 않도록
모든 새 보조파일을 `P03-T14-O08` 기준으로 정리하였다.
기존 제출본은 삭제하지 않는다.
