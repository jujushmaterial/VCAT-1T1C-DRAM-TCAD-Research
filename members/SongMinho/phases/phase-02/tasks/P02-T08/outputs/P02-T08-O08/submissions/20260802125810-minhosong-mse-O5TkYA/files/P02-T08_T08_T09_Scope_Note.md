P02-T08 mesh-sensitivity 보완은 기존 P02-T09 코드를 대체하지 않는다.

- P02-T09: 양의 gate sweep에서 Vth, SS, Ion, Ioff, DIBL의 DC mesh independence 평가
- P02-T08 보완: 음의 gate bias에서 GIDL current, electric field, BTBT generation의 mesh sensitivity 평가

두 실험은 서로 다른 물리량과 bias condition을 검증하므로 코드가 다른 것이 정상이다. 각 실험 안에서는 mesh만 바꾸고 나머지 조건을 동일하게 유지했다.
