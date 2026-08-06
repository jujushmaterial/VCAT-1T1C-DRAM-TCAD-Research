# Process Window Policy

- Process Window는 모든 필수 성능·형상·공정 규격의 교집합이다.
- 설계변수와 공정변수를 분리한다.
- 실제 데이터, 장비자료, SProcess, 문헌과 연구 가정을 구분한다.
- Robust point는 규격별 normalized margin의 최솟값이 큰 점을 우선한다.
- 기존 DOE와 1T1C 자료를 먼저 재사용한다.
- RSM·Monte Carlo·Cp·Cpk는 근거와 필요성이 있을 때만 추가한다.
- Phase 8 보정 조건과 Phase 9 holdout은 중복하지 않는다.

## 최소 적용 절차

1. 기존 Phase 4·7·8 자료를 먼저 재사용합니다.
2. Pass·Marginal·Fail 규격과 측정 조건을 기록합니다.
3. 모든 필수 규격의 교집합으로 Process Window를 정의합니다.
4. 규격별 normalized margin의 최솟값을 사용해 Robust point를 설명합니다.
5. Phase 8 보정 조건과 Phase 9 holdout을 분리합니다.
6. 기존 자료로 판단할 수 없는 대표 중심·경계·실패 조건만 조건부로 추가합니다.

## 계산량 제한

- RSM, Monte Carlo와 Cp·Cpk는 근거와 필요성이 있을 때만 수행합니다.
- 모든 DOE 조건을 Mixed-Mode로 계산하지 않습니다.
- 모든 Process Window 점을 3D로 계산하지 않습니다.
- Phase 9의 추가 3D는 가장 중요한 critical corner 최대 1개를 기본 한도로 합니다.
