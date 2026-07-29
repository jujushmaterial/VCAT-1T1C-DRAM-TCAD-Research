# P02 Single-WF VCAT — Current Status

## 작업 상태

- Owner: `@minhosong-mse`
- Status: SDE baseline verified; dual-bias Id–Vg completed; Id–Vd and metric extraction pending
- Personal folder: `members/minhosong-mse/phase2_single_metal_vcat/`
- Shared baseline status: not approved yet

## Task mapping

| Task | 상태 | 비고 |
|---|---|---|
| P02-T01 | 완료 | 기준 조건표와 좌표계·단위·변수명 표 업로드 |
| P02-T02 | 완료 | Single-gate 전체 SDE 코드와 구조 요약 업로드 |
| P02-T03 | 완료 | storage / bitline / gate, region 및 1.00219 nm oxide 확인 |
| P02-T04 | 부분 완료 | Gaussian 도핑 분포 확인, junction X-cut 미완료 |
| P02-T05 | 완료 | nominal mesh 설정·구조·최소 mesh 수치 업로드 |
| P02-T06 | 진행 중 | Vd=0.05/1.0 V Id–Vg 성공, Id–Vd·원본 CSV·DC 지표 미완료 |
| P02-T07 | 미진행 | 양방향 전류 |
| P02-T08 | 미진행 | GIDL / electric field |
| P02-T09 | 미진행 | mesh independence |

## 현재 확보 결과

- SDE / Sentaurus Mesh 성공
- 881 points, 1616 elements
- Minimum edge = 0.078125 nm
- Single continuous gate and three contacts verified
- `VdBias=0.05 V`, `1.0 V` split-node Id–Vg completed

## 다음 실행

1. Junction X-cut 측정값 추가
2. Id–Vd at representative gate voltages
3. Vth, SS, Ion, Ioff, DIBL 추출
4. 양방향·GIDL·mesh independence 순서로 진행
