# Phase 2 Single-Metal VCAT — Baseline Progress

## 목적

다중 일함수 VCAT 후보 구조와 비교하기 위한 Single-Work-Function VCAT 기준 구조를 구현하고, 구조·접촉·도핑·메시·DC 특성을 단계적으로 검증한다.

## 현재 상태

- 자동 완료: `P02-T01`~`P02-T06`
- 미진행: `P02-T07`, `P02-T08`, `P02-T09`
- 필수 산출물 기준으로 기준 조건, SDE 구조, Contact·Region, 도핑·접합 위치, nominal mesh, Id–Vg·Id–Vd 및 DC 지표가 제출됨
- `P02-T04-O03`에는 Doping X-cut 이미지와 `Junction_Positions.csv`가 정식으로 연결됨
- 2026-07-31 15:09 KST에 `P02-T04-O02`로 추가 제출된 `P02-T04-O03_Doping_Xcut.png`는 중복·오연결 제출본으로 보존하며 자동 완료 증거에서는 제외함
- 아직 `shared/` 기준 자료로 승인되지 않은 개인 작업 결과

현재 완료 여부와 누락 산출물은 수동 문장이 아니라 다음 자동 생성 문서를 기준으로 확인한다.

- [Phase 2 자동 상태](../../../../docs/generated/phases/phase-02.md)
- [무결성 검사](../../../../docs/data/integrity-report.json)

## 기준 조건

| 항목 | 값 |
|---|---:|
| Pillar diameter | 12 nm |
| Gate oxide thickness | 1 nm |
| Gate length | 60 nm |
| Storage-side silicon length | 20 nm |
| Bitline-side silicon length | 20 nm |
| Body doping | 1e17 cm^-3, Boron |
| S/D peak doping | 1e20 cm^-3, Arsenic |
| SN / BL Gaussian depth | 20 nm / 20 nm |
| Gaussian factor | 0.8 |
| Gate work function | 4.70 eV |
| Temperature | 300 K |
| MeshScale | 1.0 |

## 연결된 산출물

### P02-T01 — 기준 조건

- `P02-T01-O01`: [기준 소자 조건표 사진](./tasks/P02-T01/outputs/P02-T01-O01/)
- `P02-T01-O02`: [좌표계·단위·변수명 표](./tasks/P02-T01/outputs/P02-T01-O02/)
- `P02-T01-O03`: [기준 소자 조건표 CSV](./tasks/P02-T01/outputs/P02-T01-O03/)

### P02-T02 — SDE 구조

- `P02-T02-O01`: [Single-Metal VCAT 전체 SDE 코드](./tasks/P02-T02/outputs/P02-T02-O01/)
- `P02-T02-O02`: [최종 구조 이미지](./tasks/P02-T02/outputs/P02-T02-O02/)

### P02-T03 — Contact·Region·절연막

- `P02-T03-O01`: [Contact·Region 확인 이미지 또는 표](./tasks/P02-T03/outputs/P02-T03-O01/)
- `P02-T03-O02`: [절연막 두께 측정값](./tasks/P02-T03/outputs/P02-T03-O02/)

### P02-T04 — 도핑·접합 위치

- `P02-T04-O01`: [도핑 조건표](./tasks/P02-T04/outputs/P02-T04-O01/)
- `P02-T04-O02`: [도핑 분포 이미지](./tasks/P02-T04/outputs/P02-T04-O02/)
- `P02-T04-O03`: [접합 위치 X-cut 및 측정값](./tasks/P02-T04/outputs/P02-T04-O03/)

### P02-T05 — nominal mesh

- `P02-T05-O01`: [메시 설정값](./tasks/P02-T05/outputs/P02-T05-O01/)
- `P02-T05-O02`: [구조와 메시 이미지](./tasks/P02-T05/outputs/P02-T05-O02/)
- `P02-T05-O03`: [주요 경계 최소 메시 크기](./tasks/P02-T05/outputs/P02-T05-O03/)

### P02-T06 — DC 특성

- `P02-T06-O01`: [전체 SDevice 코드](./tasks/P02-T06/outputs/P02-T06-O01/)
- `P02-T06-O02`: [Id–Vg·Id–Vd 원본 데이터](./tasks/P02-T06/outputs/P02-T06-O02/)
- `P02-T06-O03`: [Id–Vg·Id–Vd 그래프](./tasks/P02-T06/outputs/P02-T06-O03/)
- `P02-T06-O04`: [Vth, SS, Ion, Ioff, DIBL 결과표](./tasks/P02-T06/outputs/P02-T06-O04/)

## 확인된 nominal mesh 결과

| 항목 | 값 |
|---|---:|
| Grid points | 881 |
| Edges | 2545 |
| Elements | 1616 |
| Minimum edge length | 0.078125 nm |
| Minimum angle | 1.718358 deg |
| Non-Delaunay elements | 0 |
| Regions | 4 |

## 확인된 DC 결과

| Vd (V) | Vth/Vti (V) | SS (mV/dec) | Ioff (A) | Ion (A) | Ion/Ioff |
|---:|---:|---:|---:|---:|---:|
| 0.05 | 0.506666774 | 60.245798 | 4.3877986e-16 | 2.8646552e-06 | 6.528684338e9 |
| 1.00 | 0.503429775 | 60.047977 | 3.1012418e-15 | 8.4764497e-06 | 2.733243728e9 |

- DIBL: `3.407367 mV/V`
- Vth 기준: `|Id| = 1E-7 A` constant-current Vti
- 추출: log-current interpolation

## 남은 작업

1. `P02-T07`: 위→아래와 아래→위 전류 및 비대칭 비율을 확인한다.
2. `P02-T08`: GIDL과 전계 분포, 최대 전계 위치·값을 확인한다.
3. `P02-T09`: Coarse / Medium / Fine mesh independence와 오차율을 확인한다.
4. 검토 권장 산출물을 확인한 뒤 `shared/` 기준 자료 채택 여부를 결정한다.
