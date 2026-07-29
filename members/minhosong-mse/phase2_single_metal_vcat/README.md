# Phase 2 Single-Metal VCAT — SDE Progress

## 목적

다중 일함수 VCAT 후보 구조와 비교하기 위한 Single-Work-Function VCAT 기준 구조를 SDE에서 구현하고, 구조·접촉·도핑·메시가 의도대로 생성되는지 검증한다.

## 현재 상태

- 2D axisymmetric cylindrical VCAT 구조 생성 성공
- Single continuous gate contact 구현
- Storage / Bitline / Gate contact 확인
- Gaussian 형태의 상·하부 S/D 도핑 전이 확인
- Si/SiO2 계면 및 접합부 국부 메시 적용
- SDE 및 Sentaurus Mesh 실행 성공

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
| SN Gaussian depth | 20 nm |
| BL Gaussian depth | 20 nm |
| Gaussian factor | 0.8 |
| MeshScale | 1.0 |

## 구조 및 접촉

### Regions

- `R.SN`
- `R.Channel`
- `R.BL`
- `R.GateOxide`

### Contacts

- `storage`
- `bitline`
- `gate`

## 메시 결과

- 881 points
- 1616 elements
- 4 material regions in SDevice mesh readout
- Minimum edge length: `7.8125e-05 um` = `0.078125 nm`
- Minimum angle: `1.718358 deg`
- Non-Delaunay elements: 0

## 현재 확보한 산출물

- SWB parameter screenshot
- Region list screenshot
- Contact list screenshot
- 2D doping distribution screenshot
- Full mesh screenshot
- Junction / Si-SiO2 interface mesh zoom screenshot
- Gate oxide thickness measurement screenshot
- Sentaurus Mesh run log summary

## 현재 한계

- Metallurgical junction 위치의 X-cut 정량 추출은 아직 미완료
- Id-Vg / Id-Vd 검증은 별도 SDevice 단계에서 진행 중
- Mesh independence 검증은 아직 미완료
- 아직 `shared/` 기준 코드가 아닌 개인 작업 중간 결과임

## 다음 작업

1. Donor / Acceptor concentration X-cut으로 접합 위치 측정
2. Single-WF Id-Vg at Vd = 0.05 V and 1.0 V 안정화
3. Id-Vd 계산
4. Vth, SS, Ion, Ioff, DIBL 추출
5. 양방향 전류, GIDL, 전계 분포, mesh independence 검증
