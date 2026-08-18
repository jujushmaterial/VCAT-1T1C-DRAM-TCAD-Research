# P03-T16-O07 Phase 4 Handoff

## P3 final representative
- Low-High-Low three-zone VCAT
- M1:M2:M3 = **1:2:1**
- Segment = **15 / 30 / 15 nm**
- Gate length = **60 nm**
- Xgate = **0.020 ~ 0.080 um**
- Xbnd1 = **0.035 um**
- Xbnd2 = **0.065 um**

## Fixed WF for P4 onward
- WF_LOW = **4.33 eV (Ti)**
- WF_HIGH = **4.70 eV (TiN)**
- gate_m1 / gate_m2 / gate_m3 = **4.33 / 4.70 / 4.33 eV**
- P4~P9에서 해당 WF를 다시 Sweep하지 않는다.

## Final mesh
- P4 전달은 **Mesh ON SDE** 사용.
- WF-boundary dedicated refinement를 유지한다.
- T16 Mesh OFF는 민감도 확인용 비교 구조이다.

## T16 stability evidence
- Mesh ON: **2697 elements / 1313 points**
- Mesh OFF: **1871 elements / 911 points**
- Ion @ Vd=1.0 V: 1.0507482e-5 -> 1.0542994e-5 A (**+0.338%**)
- GIDL @ Vg=-0.4 V: 3.5975206e-15 -> 3.6179195e-15 A (**+0.567%**)
- Vth @ Vd=1.0 V: 0.482613 -> 0.480103 V (**-2.510 mV**)
- SS @ Vd=1.0 V: 60.083 -> 60.214 mV/dec (**+0.131 mV/dec**)
- DIBL: 2.332 -> 2.827 mV/V (**absolute +0.496 mV/V**)
- Ioff @ Vd=1.0 V: 9.985e-16 -> 1.138e-15 A (**absolute +1.40e-16 A**)

## Conclusion
WF-boundary dedicated refinement를 제거해도 대표구조 판단을 뒤집는 성능 변화는 확인되지 않았다. 따라서 G2를 P4 전달 대표구조로 고정하고 Mesh ON을 보수적 final mesh로 전달한다.

## Status
이 문서는 T16 실험/제출 자료 기준 handoff이다. GitHub Issue #3의 공식 완료 상태는 실제 제출과 review/approval 상태에 따라 별도로 결정된다.
