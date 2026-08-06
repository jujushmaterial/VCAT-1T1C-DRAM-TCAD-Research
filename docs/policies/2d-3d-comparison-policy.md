# 2D–3D Comparison Policy

- 현재 2D 기준은 cylindrical 모델이다.
- full 3D는 total contact current를 우선 비교한다.
- sector 3D는 대칭이 성립할 때만 각도비로 환산한다.
- πD 정규화는 보조 지표로만 사용하며 중복 적용하지 않는다.
- 비교는 Vth, Ion, Ioff/GIDL 경향, 전계와 전류 경로를 우선한다.
- 이상이 없으면 추가 Mesh split이나 모든 curve를 강제하지 않는다.
- 3D는 실험값이 아니라 형상 충실도를 높인 검증 수단이다.

## 최소 검증 범위

- Single-Metal 3D는 기준 구조 1조건으로 시작합니다.
- 둘레 방향 Mesh 영향이 의심될 때만 Refinement 1조건을 추가합니다.
- Multi-WF 3D는 최종 후보 1개를 기본으로 하며 실제 후보 구조가 다를 때만 최대 2개로 제한합니다.
- Vth, Ion, Ioff/GIDL 경향, 전계 위치와 전류 경로를 우선 비교합니다.
- 결과가 정상이고 핵심 경향이 유지되면 추가 split과 모든 curve 계산을 요구하지 않습니다.

## 기록 항목

- 2D 표현과 3D 형상
- full 또는 sector 사용 여부
- 전류 환산 방법
- 비교 Bias와 추출 방법
- 핵심 지표 차이
- 2D 적용 가능 범위와 주의사항
