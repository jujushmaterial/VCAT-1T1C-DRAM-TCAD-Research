# P02-T09 DC Mesh Independence vs P02-T08 GIDL Mesh Sensitivity

## 기존 P02-T09

P02-T09는 Balanced Id–Vg code를 사용하여 다음 전역 DC 지표의 mesh dependence를 평가했다.

- Vth
- SS
- Ion
- Ioff
- Ion/Ioff
- DIBL

이 비교에서 Medium MeshScale=1.0은 Fine 대비 내부 기준을 만족하여 DC baseline mesh로 권장되었다.

## 이번 보완

이번 Coarse/Medium/Fine GIDL 비교는 P02-T09를 다시 실행한 것이 아니다. P02-T08 GIDL code와 bias condition을 그대로 유지하고 입력 mesh만 변경하여 다음 항목을 추가 검증했다.

- GIDL terminal current
- oxide field
- Silicon field
- BTBT generation

## 최종 범위 구분

- **DC Id–Vg:** Medium MeshScale=1.0 채택 결론 유지
- **Fixed-point Silicon BTBT:** Medium과 Fine이 거의 일치
- **Absolute GIDL current 및 oxide field:** 아직 mesh-sensitive

따라서 다음 문장이 가장 정확하다.

> P02-T09 established mesh independence for global DC Id–Vg metrics. A separate P02-T08 supplemental study showed that terminal GIDL current and local oxide field remain mesh sensitive, while fixed-point Silicon BTBT generation is nearly converged between Medium and Fine meshes.
