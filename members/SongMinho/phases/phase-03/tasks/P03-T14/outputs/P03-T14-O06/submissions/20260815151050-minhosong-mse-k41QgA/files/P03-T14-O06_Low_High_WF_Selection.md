# P03-T14-O06 Low·High WF 선정표와 선정 근거

## 최종 선정안
- **LOW WF: Ti = 4.33 eV**
- **HIGH WF: TiN = 4.70 eV**
- **선정 Node: n73**
- L-H-L 배치: Ti / TiN / Ti

## 대표 3조건 비교
| Node | Pair | Ion@Vd1 (A) | Ioff@Vd1 (A) | Vth@Vd1 (V) | SS@Vd1 (mV/dec) | DIBL (mV/V) | GIDL@-0.4 (A) | Emax (V/cm) | Peak BTBT |
|---|---|---:|---:|---:|---:|---:|---:|---:|---:|
| n72 | Al/TiN | 1.0957e-05 | 3.3114e-15 | 0.4587 | 61.14 | 6.48 | 1.8361e-15 | 5.309e6 | 4.882e23 |
| n73 | Ti/TiN | 1.0816e-05 | 2.8052e-15 | 0.4611 | 60.76 | 5.22 | 3.6456e-15 | 4.667e6 | 8.470e23 |
| n74 | W/TiN | 9.8832e-06 | 1.3735e-15 | 0.4745 | 59.66 | 0.81 | 1.7564e-14 | 5.200e6 | 4.190e24 |

## 선정 근거
1. n72는 GIDL/BTBT가 가장 낮고 Ion이 소폭 높지만, 대표 3조건 중 DIBL과 Emax가 더 크다.
2. n74는 Ioff·SS·DIBL이 우수하지만 GIDL이 n73 대비 약 4.8배, peak BTBT generation이 약 5배 수준으로 증가하고 Ion도 낮아진다.
3. n73은 n74의 큰 GIDL/BTBT 증가를 피하면서 n72 대비 DIBL과 Emax를 낮춰 Forward/Leakage/Field 간 균형이 가장 좋다.
4. 따라서 단일 지표의 global best가 아니라 **치명적 열화 없이 전체 지표의 균형을 유지하는 조합**으로 Ti/TiN을 선정한다.

## 해석 주의
- GIDL은 storage=1.0 V, gate=-0.4 V 최종점의 |storage TotalCurrent|로 비교했다.
- Forward raw의 Vg=0 지점은 약 1e-5 V 첫 점으로 Ioff를 근사한다.
- 원본 signed current는 변경하지 않고, 전류 크기 비교에서만 절댓값을 사용했다.
