# Phase 2 Single-Metal VCAT — Baseline Progress

## 목적

다중 일함수 VCAT 후보 구조와 비교하기 위한 Single-Work-Function VCAT 기준 구조를 구현하고, 구조·접촉·도핑·메시·DC 특성을 단계적으로 검증한다.

## 현재 상태

- 완료: `P02-T01`, `P02-T02`, `P02-T03`, `P02-T05`
- 진행 중: `P02-T04`, `P02-T06`
- 미진행: `P02-T07`, `P02-T08`, `P02-T09`
- SDE와 Sentaurus Mesh 실행 성공
- 분리형 SDevice 노드에서 `VdBias=0.05 V`, `1.0 V` Id–Vg 수렴 확인
- Id–Vd, 접합 위치 정량값, DC 지표와 mesh independence는 미완료
- 아직 `shared/` 기준 자료로 승인되지 않은 개인 작업 결과

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

- `P02-T01-O01`: [기준 소자 조건표](./tasks/P02-T01/outputs/P02-T01-O01/)
- `P02-T01-O02`: [좌표계·단위·변수명 표](./tasks/P02-T01/outputs/P02-T01-O02/)
- `P02-T02-O01`: [Single-Metal VCAT 전체 SDE 코드](./tasks/P02-T02/outputs/P02-T02-O01/)
- `P02-T02-O02`: [최종 구조 이미지](./tasks/P02-T02/outputs/P02-T02-O02/)
- `P02-T03-O01`: [Contact·Region 확인 표](./tasks/P02-T03/outputs/P02-T03-O01/)
- `P02-T03-O02`: [절연막 두께 측정값](./tasks/P02-T03/outputs/P02-T03-O02/)
- `P02-T05-O01`: [메시 설정값](./tasks/P02-T05/outputs/P02-T05-O01/)
- `P02-T05-O02`: [구조와 메시 이미지](./tasks/P02-T05/outputs/P02-T05-O02/)
- `P02-T05-O03`: [주요 경계 최소 메시 크기](./tasks/P02-T05/outputs/P02-T05-O03/)
- `P02-T06-O01`: [전체 SDevice 코드](./tasks/P02-T06/outputs/P02-T06-O01/)

## 보조 기록

- [현재 상태](../../result_notes/phase-02_current-status.md)
- [산출물 연결표](../../handoff/phase-02_output-mapping.md)

## 확인된 결과

- Mesh points / elements: `881 / 1616`
- Minimum edge length: `0.078125 nm`
- Minimum angle: `1.71836 deg`
- Non-Delaunay elements: `0`
- Measured gate oxide thickness: `1.00219 nm`

## 남은 작업

1. Donor / Acceptor concentration X-cut으로 접합 위치를 정량 측정한다.
2. Id–Vd를 계산한다.
3. Vth, SS, Ion, Ioff, DIBL을 추출한다.
4. 양방향 전류, GIDL과 전계 분포를 검증한다.
5. Coarse / Medium / Fine mesh independence를 확인한다.
