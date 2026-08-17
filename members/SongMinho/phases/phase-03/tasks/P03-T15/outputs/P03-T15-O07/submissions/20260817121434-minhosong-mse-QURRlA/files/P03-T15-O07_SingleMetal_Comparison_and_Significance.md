# Single-Metal baseline 대비 L-H-L의 결과와 의의

## Control 검증
동일 3-zone 20/20/20 geometry에서 WF_LOW=WF_HIGH=4.70 eV로 두면 P2 Single-Metal과 거의 같은 결과가 재현된다.
- Ion: 8.4759e-6 A vs P2 8.47645e-6 A
- Ioff: 3.1039e-15 A vs P2 3.10124e-15 A
- GIDL: 2.9113e-14 A vs P2 2.92056e-14 A

따라서 3-contact/3-region 분할 자체가 성능 변화를 만든 것이 아니라, L-H-L WorkFunction split이 핵심 변수라는 control evidence가 된다.

## n73 G0 (20/20/20, Ti/TiN/Ti) vs P2
- Ion +27.6%
- Ioff -9.5%
- GIDL -87.5%
- Vth 약 42 mV 낮아짐
- SS 약 +1.2% 변화
- DIBL +53.1% 악화

즉 구동전류와 GIDL 억제의 큰 이득을 얻었지만 electrostatic DIBL trade-off가 남는다. 이것이 P5에서 WF를 다시 sweep하기보다 geometry/boundary를 최적화할 이유이다.

## G2 coarse result vs P2
- Ion +24.0%
- Ioff -67.8%
- GIDL -87.7%
- DIBL -31.6%

G2(15/30/15)는 coarse 3점 중 trade-off를 가장 잘 완화하는 방향으로 보인다. 하지만 T15-O05 양방향 전류 비대칭을 아직 측정하지 않았으므로 P4 final representative로 확정하지 않는다.
