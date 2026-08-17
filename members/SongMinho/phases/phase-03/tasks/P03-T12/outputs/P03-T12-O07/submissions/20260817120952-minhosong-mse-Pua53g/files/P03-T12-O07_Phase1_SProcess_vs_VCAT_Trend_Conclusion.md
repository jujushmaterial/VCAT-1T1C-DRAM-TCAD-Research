# P03-T12-O07 — Phase 1 기존 SProcess 대비 VCAT 경향성 결론

## 결론
Phase 1 SProcess 구조에서는 평균 WF가 같은 LH와 HL도 Vth/Ioff/DIBL 및 내부 Potential/CBE/ElectricField profile이 동일하지 않아 **WF의 source/drain 공간 배치 순서가 중요하다**는 근거가 확인되었다.

P3의 VCAT Dual-Metal에서도 같은 평균 WF(≈4.70 eV)를 유지한 채 ΔWF의 부호를 바꾸면 동일한 방향성 효과가 다시 나타났다. 특히 WF_SN<WF_BL인 negative ΔWF에서 Ioff·GIDL·DIBL이 낮아졌고, 반대로 WF_SN>WF_BL인 positive ΔWF에서는 GIDL·Ioff·DIBL이 증가했다.

따라서 SProcess와 VCAT은 geometry와 bias가 달라 절대 수치를 직접 비교할 수는 없지만, **평균 WF만이 아니라 WF의 공간 순서가 channel potential/barrier와 terminal current에 영향을 준다는 경향은 두 구조에서 공통으로 지지된다.** 이 결과가 P3에서 단순 Dual-Metal을 넘어 L-H-L 3-zone spatial design을 검토한 물리적 근거가 된다.

## 제한
- Phase 1과 P3의 geometry/bias는 동일하지 않으므로 절대값 비교가 아니라 trend comparison이다.
- Phase 1 Gap은 고정되어 Gap 효과는 별도로 평가되지 않았다.
- P3 Dual-Metal 결과는 RatioSN=0.5 기준이다.

## 공식 출처
- Phase 1 Issue #1: https://github.com/jujushmaterial/VCAT-1T1C-DRAM-TCAD-Research/issues/1
- Phase 3 Issue #3: https://github.com/jujushmaterial/VCAT-1T1C-DRAM-TCAD-Research/issues/3
- Phase 1 integrated conclusion: members/SongMinho/phases/phase-01/tasks/P01-T10/outputs/P01-T10-O02/.../P01-T10-O01_integrated_conclusion.md
