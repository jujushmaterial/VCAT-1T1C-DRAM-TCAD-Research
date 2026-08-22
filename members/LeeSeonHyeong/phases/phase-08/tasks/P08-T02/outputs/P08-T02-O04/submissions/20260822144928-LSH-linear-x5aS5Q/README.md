# Phase 8 산출물 — 변수별 Device-level 허용범위·Limiting Metric

- 과제 ID: `P08-T02`
- 산출물 ID: `P08-T02-O04`
- 제출자: 이선형 (`@LSH-linear`)
- 제출 시각: 2026-08-22T14:49:28.753Z
- 관련 Issue: [#8](https://github.com/jujushmaterial/VCAT-1T1C-DRAM-TCAD-Research/issues/8)
- 제출 방식: table

## 저장된 표

- 크기: 4행 × 10열
- 첫 행 제목 사용: 예
- [CSV 원본](./table.csv)
- [TSV 원본](./table.tsv)
- [JSON 원본](./table.json)

## 표 설명

P08-T02-O04 — 변수별 Device-level 허용범위·Limiting Metric

목적
- primary 31점 안에서 변수별 관측 허용범위와 실제 Window를 제한하는 metric을 정리한다.

결과
- Xbnd1 OAT @Xbnd2=67: 33~37 nm 전부 PASS
- Xbnd2 OAT @Xbnd1=35: 63~69 nm 전부 PASS
- Joint 2D grid: PASS 28, MARGINAL 3, FAIL 0
- MARGINAL strip: 36/63, 37/63, 37/64
- 주요 limiting metric: DIBL

주의
- 단독 OAT boundary는 현재 search domain 안에서 닫히지 않았다.
- primary 31점 내부에는 FAIL이 없으므로 외곽 hard-fail boundary가 완전히 결정된 것은 아니다.

| Scope | Tested_Range | PASS_Observed_Range | Marginal_Points | FAIL_Points | Boundary_Resolved | Limiting_Metric | Closest_Threshold_Point | Closest_Point_Min_Core_RIF | Interpretation |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| Xbnd1 OAT at Xbnd2=67 nm | 33..37 nm @1 nm | 33..37 nm | none | none | NO | DIBL at high-Xbnd1 side | 37/67 | 0.8043583370593038 | All tested centerline points PASS; Xbnd1-only tolerance boundary is outside/not resolved by current centerline. |
| Xbnd2 OAT at Xbnd1=35 nm | 63..69 nm @1 nm | 63..69 nm | none | none | NO | DIBL at low-Xbnd2 side | 35/63 | 0.5535452078930442 | All tested centerline points PASS; 35/63 is close to the 50% DIBL-retention threshold. |
| Joint 2D active grid | B1 33..37; B2 63..69; 31 active of 35 | 28 active points | 36/63; 37/63; 37/64 | none | PARTIAL_PASS_MARGINAL_ONLY | DIBL | 35/63 PASS ↔ 36/63 MARGINAL; 37/64 MARGINAL ↔ 37/65 PASS |  | Interaction creates a lower-right Marginal strip. No Device FAIL appears inside the official active domain, so an outer FAIL boundary is not closed. |
