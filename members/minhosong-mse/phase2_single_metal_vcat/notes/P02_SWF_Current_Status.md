# P02 Single-WF VCAT — Current Status

## 작업 상태

- Owner: `@minhosong-mse`
- Status: SDE implementation completed; SDevice DC verification in progress
- Personal folder: `members/minhosong-mse/phase2_single_metal_vcat/`
- Shared baseline status: not approved yet

## Task mapping

| Task | 상태 | 비고 |
|---|---|---|
| P02-T01 | 진행 | 기준 조건표와 변수표 업로드 |
| P02-T02 | 진행 | Single-gate SDE 코드와 구조 요약 업로드 |
| P02-T03 | 진행 | storage / bitline / gate 및 1 nm oxide 확인 |
| P02-T04 | 부분 완료 | Gaussian 도핑 분포 확인, junction X-cut 미완료 |
| P02-T05 | 진행 | nominal mesh 생성 및 mesh summary 업로드 |
| P02-T06 | 진행 중 | Id-Vg 수렴 조건 정리 중 |
| P02-T07 | 미진행 | 양방향 전류 |
| P02-T08 | 미진행 | GIDL / electric field |
| P02-T09 | 미진행 | mesh independence |

## 다음 실행

1. `VdBias = 0.05 V`와 `1.0 V`를 별도 SDevice 노드로 분리
2. 두 Id-Vg 곡선 수렴 확인
3. Junction X-cut 측정값 추가
4. Id-Vd 및 DC metric 추출
