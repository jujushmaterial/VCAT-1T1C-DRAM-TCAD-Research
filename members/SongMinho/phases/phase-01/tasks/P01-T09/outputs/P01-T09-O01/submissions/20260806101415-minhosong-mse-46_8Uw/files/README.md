# P01-T09-O01 지표 추출 재현성 보완본

현재 GitHub에 이미 올라간 Id–Vg CSV, metrics CSV와 그래프·표 이미지는 다시 포함하지 않는다. 본 보완본은 추출 Tcl과 계산 정의를 추가한다.

## 데이터와 계산 정의

- X: `gateS OuterVoltage`
- Y: `drain TotalCurrent`
- Low Vd = 0.08 V, High Vd = 0.7 V
- Ion: Vg=2.5 V
- Ioff: Vg=0 V
- current preprocessing: `abs(Id)+1e-30`
- Vth: 최대 gm 지점의 tangent intercept
- SS: `1000 / max(dlog10(Id)/dVg)` [mV/dec]
- 기존 DIBL: `abs((Vth_Low-Vth_High)/(0.7-0.08))*1000` [mV/V]

## 주의사항

- 네 조건 모두 기존 결과에서 `Vth_High > Vth_Low`이므로 기존 양수 DIBL 값은 signed DIBL이 아니라 절대 이동량이다.
- SVisual 축은 A/µm로 보이지만 Tcl 출력은 A로 표시되어, 전류 절대 단위는 normalization 확인 전 `raw exported unit`로 유지한다.
- Tcl은 사용자가 제공한 추출 스크립트이며 본 보완 과정에서 TCAD나 SVisual을 재실행하지 않았다.
