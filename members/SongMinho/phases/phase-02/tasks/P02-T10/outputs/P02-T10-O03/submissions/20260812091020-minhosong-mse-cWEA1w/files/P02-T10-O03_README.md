# P02-T10-O03 Local Mesh 후보 코드와 Mesh 이미지

## 포함 파일
- `P02-T10-O03_LocalMesh_Contour_v1.cmd` — 2D axisymmetric VCAT Local Mesh SDE 코드
- `P02-T10-O03_LocalMesh_Overall.png` — 전체 mesh 구조
- `P02-T10-O03_LocalMesh_SN_Zoom.png` — Storage-side gate edge / junction 확대
- `P02-T10-O03_LocalMesh_BL_Zoom.png` — Bitline-side gate edge / junction 확대

## 코드 설명
전체 영역을 Uniform Fine으로 설정하지 않고 공간별 민감도에 따라 mesh를 나눈다.

- A: outer/quiet region — coarse-like
- B: gate electrostatic/channel region — medium-like
- C: SN/BL junction support — medium junction mesh
- E: gate-edge / Si-SiO2 / high-field core — fine contour

Fine contour는 SN/BL 양쪽에 대칭적으로 적용되며 4개의 overlapping rectangle을 이용해 interface에서 넓고 silicon 내부로 갈수록 좁아지는 stepped contour를 만든다.

## 중요 주의사항
코드의 fine contour 좌표는 P02 Fine/GIDL hotspot에서 직접 계측한 경계가 아니라, 첫 reusable baseline을 위한 보수적인 engineering candidate이다. 따라서 제출 설명에서 '측정된 hotspot contour'라고 표현하지 않는다.

Workbench의 `MeshScale` 파라미터는 이 Local CMD 내부에서 사용되지 않는다. 실제 mesh는 `GlobalMesh`, `MiddleMesh`, `JunctionMesh`, `FineCoreMesh` 정의로 결정된다.
