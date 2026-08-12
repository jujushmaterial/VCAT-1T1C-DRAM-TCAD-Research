# P02-T10-O05 후속 Phase용 Mesh Baseline 안내서 v02

## 최종 baseline
후속 2D axisymmetric VCAT screening의 기본 mesh로 `P02_T10_LocalMesh_Contour_v1`을 사용한다.

## 채택 근거
Local mesh는 Uniform Fine 0.5 대비 mesh 규모와 GIDL 실행시간을 줄이면서 DC 특성과 peak electric field를 잘 유지했다.

- Ion @ Vd=0.05 V: Fine 대비 약 -1.35%
- Ion @ Vd=1.0 V: Fine 대비 약 -0.26%
- DIBL: Fine 대비 약 +0.42%
- ElectricField max: Fine 대비 약 -0.066%
- GIDL runtime: 1008.88 s -> 668.94 s
- SDevice elements: 5430 -> 3454

## 제한사항
Local mesh의 absolute leakage precision은 Fine과 동등하지 않다.

- GIDL @ -0.4 V: Fine 대비 약 +19.96%
- BTBT peak: Fine 대비 약 +15.93%

따라서 absolute GIDL/BTBT 평가 또는 최종 reference 계산에서는 Uniform Fine 0.5를 유지한다.

## 후속 Phase 운영 원칙
1. 구조가 P02와 유사하고 axisymmetric일 때는 Local Mesh를 기본으로 사용한다.
2. 새 work-function boundary, oxide geometry 변화, gap, hotspot 이동 등 새로운 민감 영역이 생기면 해당 영역만 추가 local refinement를 검토한다.
3. 모든 후보를 Uniform Fine으로 반복 계산하지 않는다.
4. 후보 screening 후 대표/최종 후보에 대해 Fine 0.5 reference spot-check를 수행한다.
5. 추가 refinement가 수렴성과 runtime을 크게 악화시키면 기존 Local baseline을 유지하고 실패 조건을 기록한다.

## 현재 수치적 주의사항
Local GIDL run은 gate=-0.4 V까지 정상 완료되었다. SDevice log에서 R.Channel DeltaVolume 0.05788% warning이 존재하지만 non-Delaunay element는 0이며 DC/GIDL sweep은 정상 종료되었다.
