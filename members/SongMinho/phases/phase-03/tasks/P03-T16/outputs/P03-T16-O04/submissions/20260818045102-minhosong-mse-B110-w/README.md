# Phase 3 산출물 — WF Boundary Mesh 전·후 비교

- 과제 ID: `P03-T16`
- 산출물 ID: `P03-T16-O04`
- 제출자: 송민호 (`@minhosong-mse`)
- 제출 시각: 2026-08-18T04:51:02.299Z
- 관련 Issue: [#3](https://github.com/jujushmaterial/VCAT-1T1C-DRAM-TCAD-Research/issues/3)
- 제출 방식: files

## 제출 파일

- [P03-T16-O04_MeshOFF_LowerBoundary.png](./files/P03-T16-O04_MeshOFF_LowerBoundary.png) (496.0KB)
- [P03-T16-O04_MeshOFF_Overall.png](./files/P03-T16-O04_MeshOFF_Overall.png) (418.4KB)
- [P03-T16-O04_MeshOFF_UpperBoundary.png](./files/P03-T16-O04_MeshOFF_UpperBoundary.png) (498.6KB)
- [P03-T16-O04_MeshON_LowerBoundary.png](./files/P03-T16-O04_MeshON_LowerBoundary.png) (557.0KB)
- [P03-T16-O04_MeshON_Overall.png](./files/P03-T16-O04_MeshON_Overall.png) (420.8KB)
- [P03-T16-O04_MeshON_UpperBoundary.png](./files/P03-T16-O04_MeshON_UpperBoundary.png) (548.1KB)

## 제출 메모

G2 대표구조의 WF-boundary dedicated refinement ON/OFF를 원본 SVisual mesh 이미지로 비교합니다. ON=2697 elements/1313 points, OFF=1871 elements/911 points이며 동일 위치의 상·하 boundary 확대 이미지를 포함합니다. show_mesh/hide_mesh 표시 차이가 아니라 SDE boundary refinement 객체 유무가 ON/OFF 정의입니다.

P03-T16-O04 WF Boundary Mesh 전·후 비교

비교 대상
- Representative: G2 = 1:2:1 = 15/30/15 nm
- WF = 4.33/4.70/4.33 eV
- Mesh ON: RefWin/Place.MetalBnd1 및 RefWin/Place.MetalBnd2 적용
- Mesh OFF: 위 두 WF-boundary 전용 refinement만 제거
- Geometry/contact/doping/global/interface/junction mesh는 동일

원본 SVisual 증빙
- Mesh ON overall / upper boundary / lower boundary
- Mesh OFF overall / upper boundary / lower boundary

Mesh 규모
- Mesh ON: Elements 2697 / Points 1313
- Mesh OFF: Elements 1871 / Points 911
- OFF에서 Elements 약 30.63%, Points 약 30.62% 감소

해석
- 동일 위치의 show_mesh 확대를 통해 WF-boundary 전용 refinement 유무를 확인한다.
- show_mesh/hide_mesh는 화면 표시 옵션일 뿐 T16 Mesh ON/OFF의 정의가 아니다.
- T16의 Mesh ON/OFF는 SDE의 전용 boundary refinement 객체 존재/부재로 정의한다.
