# P02-T07 Supplemental Code Consistency Review

## 기존 결과

- Forward Ion: 약 `8.47645 µA`
- Reverse Ion: 약 `8.47015 µA`
- Vg=1 V 최종점 차이: 약 `0.074%`
- 전체 비교의 최대 상대차이: 약 `0.148%`

Single-WF 구조와 대칭 도핑 조건에서 양방향 전류가 거의 일치하므로 기존 결과는 유의미한 symmetry sanity check이다.

## 피드백 보완

Forward 코드와 Reverse 코드의 SWB 변수명이 서로 다르게 사용된 것으로 검토되었다.

- Forward: `WF`, `Temp`, `VdBias`, `VgStop`
- Reverse: `WF1`, `Temp1`, `VdBias1`, `VgStop1`

기존 실행에서 두 변수 집합에 동일한 값이 입력되었다는 기록을 전제로 하면 기존 결과를 무효화할 근거는 없다. 그러나 향후 조건 변경 시 서로 다른 값이 전달될 위험이 있으므로 재현성 측면의 코드 위험이다.

## 권장 조치

다음 코드 버전에서는 Forward/Reverse가 동일한 공통 SWB 변수명을 사용하도록 통일한다.

- `WF`
- `Temp`
- `VdBias`
- `VgStop`

기존 제출본을 덮어쓰지 않고 새로운 버전으로 남기며, 새 코드로 재실행할 경우 기존 결과와의 차이를 별도로 기록한다.

## 현재 상태

이번 보완에서는 새로운 T07 시뮬레이션을 수행하지 않았다. 기존 양방향 결과는 유지하고, 코드 변수명 일관성 문제만 투명하게 기록한다.
