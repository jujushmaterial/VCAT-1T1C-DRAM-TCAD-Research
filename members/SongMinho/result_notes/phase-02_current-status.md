# P02 Single-WF VCAT — Current Status

## 상태 기준

이 문서는 연구 조건과 다음 작업을 설명하는 보조 기록이다. Task 완료 여부와 제출 개수의 기준은 다음 자동 생성 자료이다.

- `docs/data/status.json`
- `docs/generated/phases/phase-02.md`
- `docs/data/integrity-report.json`

## 작업 정보

- Owner: `@minhosong-mse`
- Phase / Issue: Phase 2 / #2
- Personal folder: `members/SongMinho/`
- Phase folder: `members/SongMinho/phases/phase-02/`
- Status: Single-WF baseline 구조·nominal mesh·DC 특성 제출 완료; 방향성·누설·mesh independence 검증 대기
- Shared baseline status: not approved yet

## Task mapping

| Task | 자동 상태 | 근거·비고 |
|---|---|---|
| `P02-T01` | 완료 | 기준 조건 사진, 좌표·단위 표, 조건 CSV 제출 |
| `P02-T02` | 완료 | 전체 SDE 코드와 실제 TDR 구조 이미지 제출 |
| `P02-T03` | 완료 | Contact·Region 확인 자료와 oxide 측정값 제출 |
| `P02-T04` | 완료 | 도핑 조건·분포, 정식 X-cut 이미지와 접합 위치 CSV 제출 |
| `P02-T05` | 완료 | nominal mesh 설정, 구조·메시 이미지, 실제 mesh log 요약 제출 |
| `P02-T06` | 완료 | SDevice 코드, Id–Vg·Id–Vd 원본, 4개 그래프, DC 지표 제출 |
| `P02-T07` | 진행 전 | 양방향 전류·비대칭 비교 필요 |
| `P02-T08` | 진행 전 | GIDL·전계 분포·최대 전계 정량값 필요 |
| `P02-T09` | 진행 전 | Coarse / Medium / Fine mesh independence 필요 |

## 데이터 연결 주의사항

- `P02-T04-O03`의 정식 제출본에는 X-cut 이미지와 `P02-T04-O03_Junction_Positions.csv`가 존재한다.
- 제출본 `20260731060911-minhosong-mse-5JVyrQ`는 파일명이 `P02-T04-O03_Doping_Xcut.png`이지만 `P02-T04-O02`에 등록된 중복·오연결 자료이다.
- 해당 제출본은 삭제하지 않고 `docs/data/submission-classifications.json`에 보존 분류하며, 자동 완료 증거에서는 제외한다.

## 확인된 DC 지표

- `Vd=0.05 V`: Vti `0.506666774 V`, SS `60.245798 mV/dec`, Ion `2.8646552e-06 A`, Ioff `4.3877986e-16 A`
- `Vd=1.00 V`: Vti `0.503429775 V`, SS `60.047977 mV/dec`, Ion `8.4764497e-06 A`, Ioff `3.1012418e-15 A`
- DIBL: `3.407367 mV/V`
- Vti criterion: `|Id|=1E-7 A`, log-current interpolation

## 다음 실행

1. `P02-T07` 양방향 전류와 비대칭 비율
2. `P02-T08` GIDL 및 electric-field 분포
3. `P02-T09` mesh independence
4. 검토 권장 결과 확인 및 shared baseline 채택 판단
