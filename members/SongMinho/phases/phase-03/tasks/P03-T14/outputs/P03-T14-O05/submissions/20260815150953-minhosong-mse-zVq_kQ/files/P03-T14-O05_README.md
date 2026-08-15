# P03-T14-O05 대표 WF 조건 Electric Field·Barrier 비교

## 비교 조건
- n72: LOW/HIGH = Al/TiN = 4.28/4.70 eV
- n73: LOW/HIGH = Ti/TiN = 4.33/4.70 eV
- n74: LOW/HIGH = W/TiN = 4.55/4.70 eV
- 공통 GIDL 상태: storage=+1.0 V, bitline=0 V, gate_m1/m2/m3=-0.4 V, Temp=300 K

## 원본 자료
- ElectricField, ConductionBandEnergy, Band2BandGeneration: Sentaurus Visual 원본 export 이미지
- Barrier cutline: 동일 Y 위치에서 추출한 ConductionBandEnergy CSV 3개 및 SVisual overlay
- 색상표는 각 개별 이미지에서 자동 범위이므로 색 자체보다 legend 수치와 cutline을 우선 비교함.

## 관찰값
| Node | Emax (V/cm) | Peak BTBT generation (cm^-3 s^-1) | GIDL @ -0.4 V (A) |
|---|---:|---:|---:|
| n72 | 5.309e6 | 4.882e23 | 1.836e-15 |
| n73 | 4.667e6 | 8.470e23 | 3.646e-15 |
| n74 | 5.200e6 | 4.190e24 | 1.756e-14 |

Cutline에서는 중앙 HIGH-WF 구간의 ConductionBandEnergy modulation이 n72 > n73 > n74 순으로 감소한다.
n74는 Forward DC 특성 일부가 우수하지만 GIDL 및 BTBT generation이 크게 증가한다.
n73은 n72와 n74 사이에서 Forward 성능, GIDL, E-field를 균형 있게 유지하는 후보로 판단한다.

주의: 위 해석은 현재 동일 GIDL 최종 상태의 SVisual 결과와 원본 CSV에 근거한 비교이며,
개별 color bar 범위가 다르므로 색상 면적만으로 정량 순위를 판단하지 않는다.
