# P02 Single-WF VCAT — Task / Output Mapping

## 체크 완료 대상

### P02-T01 — 기준 구조와 조건
- `P02-T01-O01`: `tables/P02_SWB_Parameters.csv`
- `P02-T01-O02`: `tables/P02_SWF_Coordinates_Units_Variables.csv`

### P02-T02 — Single-Metal VCAT SDE 구조
- `P02-T02-O01`: `code/P02_SWF_VCAT_SDE_v0p1.cmd`
- `P02-T02-O02`: `figures/P02_SWF_SDE_Summary.svg`

### P02-T03 — 전극·게이트·절연막
- `P02-T03-O01`: `tables/P02_SWF_Contact_Region_Summary.csv`
- `P02-T03-O02`: `tables/P02_SWF_Contact_Region_Summary.csv`
  - measured oxide thickness: `1.00219 nm`

### P02-T05 — 메시 설정·구조 확인
- `P02-T05-O01`: `tables/P02_SWF_Mesh_Settings.csv`
- `P02-T05-O02`: `figures/P02_SWF_SDE_Summary.svg`
- `P02-T05-O03`: `notes/P02_SWF_Mesh_Run_Summary.md`
  - minimum edge: `0.078125 nm`
  - points/elements: `881 / 1616`

## 진행 중 대상

### P02-T04 — 도핑과 접합 위치
- 조건과 2D 분포는 확보함.
- Donor/acceptor X-cut 기반 실제 metallurgical junction 위치가 남아 있어 미체크.

### P02-T06 — Id–Vg / Id–Vd
- `code/P02_SWF_SDevice_IdVg_v0p2.cmd` 업로드.
- `VdBias=0.05 V`와 `1.0 V` Id–Vg는 분리 노드에서 수렴 확인.
- Id–Vd, 원본 CSV, Vth/SS/Ion/Ioff/DIBL 표가 남아 있어 미체크.

## 아직 미진행
- P02-T07 양방향 전류
- P02-T08 GIDL 및 전계 분포
- P02-T09 mesh independence
