# P03-T16-O03 대표구조 선정 이유

## 최종 대표구조
- G2 = M1:M2:M3 = **1:2:1**
- Segment = **15 / 30 / 15 nm**
- Fixed WF = **4.33 / 4.70 / 4.33 eV** (Ti / TiN / Ti)

## 선정 논리
1. P03-T14에서 Low/High WF를 4.33/4.70 eV로 고정하였다.
2. P03-T15에서 1:1:1, 1:2:1, 2.5:1:2.5의 coarse geometry를 비교하였다.
3. G2는 단일 Ion 최대값만을 목표로 하지 않고 Ioff·DIBL을 함께 고려한 균형 후보로 유지되었다.
4. P03-T15-O05 양방향 검증에서 G2의 Vd=1.0 V Ion 방향 비대칭은 약 0.031%로 매우 작아 방향성 때문에 배제할 근거가 없었다.
5. P03-T16 Mesh ON/OFF 비교에서 Ion·GIDL·Vth·SS의 변화가 작고, 대표구조 판단을 뒤집는 mesh 민감성이 관찰되지 않았다.
6. 따라서 P4 전달 대표구조는 G2로 확정하고, 보수적으로 기존 Mesh ON 설정을 최종 handoff mesh로 유지한다.

## 주의
- T16은 geometry 재최적화 단계가 아니라 P4 전달 후보 1개의 mesh 안정성 확인 단계이다.
- Mesh OFF는 sensitivity 비교용이며 P4 최종 SDE는 Mesh ON을 사용한다.
- Issue #3에는 정량 pass/fail cutoff가 명시되어 있지 않으므로 임의 cutoff를 만들지 않고 절대 변화량과 대표구조 선정 유지 여부를 기준으로 기록한다.
