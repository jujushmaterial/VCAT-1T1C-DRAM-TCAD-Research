# P03-T15-O05

P03-T15-O05 — 양방향 전류 비대칭 비교

고정 조건
- WF_LOW / WF_HIGH = 4.33 / 4.70 eV
- gate_m1 / gate_m2 / gate_m3 = 4.33 / 4.70 / 4.33 eV
- Temp = 300 K, MeshScale = 1.0, Vg = 0→1.0 V
- Vd = 0.05 V, 1.0 V

Geometry
- G0 = 1:1:1 = 20/20/20 nm
- G2 = 1:2:1 = 15/30/15 nm
- G1 = 2.5:1:2.5 = 25/10/25 nm

Axes
- Forward: X = gate_m1 OuterVoltage [V], Y = storage TotalCurrent [A, signed raw]
- Reverse: X = gate_m1 OuterVoltage [V], Y = bitline TotalCurrent [A, signed raw]

비대칭 정의
- |FWD−REV| / ((|FWD|+|REV|)/2) × 100 %
- Issue가 특정 수식을 지정한 것은 아니므로, 본 산출물에서 사용한 비교 정의를 명시함.

결과
- Vd=1.0 V Ion 비대칭: G0≈0.0258 %, G2≈0.0308 %, G1≈0.0262 %
- Vd=0.05 V Ion 비대칭: 세 구조 모두 약 0.006 %
- Vth, SS, Ioff, DIBL 역시 Forward/Reverse에서 거의 동일함.

결론
- 세 coarse geometry 모두 유의한 양방향 전류 패널티가 관찰되지 않음.
- T15-O05 관점에서 G2를 배제할 방향성 문제는 없음.
- 최종 geometry 판단은 T15-O04와 함께 해석하며, 현재 G2가 대표후보로 유지됨.

업로드 권장
1) P03-T15-O05_Bidirectional_Current_Asymmetry.xlsx
2) RAW_CSV 12개
3) 가능하면 사용자가 이미 확보한 SVisual Reverse overlay 이미지(Vd=1.0 V / 0.05 V) 2장 추가
