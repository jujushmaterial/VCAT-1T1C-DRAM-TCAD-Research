# Phase 8 산출물 — P7 핵심 변수·전체 후보 2D Grid 정의표

- 과제 ID: `P08-T01`
- 산출물 ID: `P08-T01-O04`
- 제출자: 송민호 (`@minhosong-mse`)
- 제출 시각: 2026-08-22T14:47:26.181Z
- 관련 Issue: [#8](https://github.com/jujushmaterial/VCAT-1T1C-DRAM-TCAD-Research/issues/8)
- 제출 방식: table

## 저장된 표

- 크기: 36행 × 14열
- 첫 행 제목 사용: 예
- [CSV 원본](./table.csv)
- [TSV 원본](./table.tsv)
- [JSON 원본](./table.json)

## 표 설명

P08-T01-O04 — P7 핵심 변수·전체 후보 2D Grid 정의표

목적
- P8 결과 확인 전에 전체 candidate geometry domain을 고정한다.

Grid
- Xbnd1: 33, 34, 35, 36, 37 nm
- Xbnd2: 63, 64, 65, 66, 67, 68, 69 nm
- 총 35 geometry
- Nominal: 35/67

해석
- Xbnd1/Xbnd2만 독립변수이다.
- M1=Xbnd1-20, M2=Xbnd2-Xbnd1, M3=80-Xbnd2는 파생값이다.

주의
- 이 35점은 최종 tolerance 자체가 아니라 P8 1차 Device Window 탐색 domain이다.

| Grid_ID | B1_nm | B2_nm | M1_nm | M2_HIGH_nm | M3_nm | Topology_PASS | P5_Electrical_Known | P6_Preflight_Known | P7_LocalSlope_Direct_Point | Holdout_Status | P8_Active | Required_P8_Electrical | Notes |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| G001 | 33 | 63 | 13 | 30 | 17 | PASS | YES | NO | NO | ACTIVE | YES | SDE+FWD_VD1+FWD_VD0p05+GIDL | P5 electrical prior exists; fresh rerun if ACTIVE |
| G002 | 33 | 64 | 13 | 31 | 16 | PASS | NO | NO | NO | ACTIVE | YES | SDE+FWD_VD1+FWD_VD0p05+GIDL |  |
| G003 | 33 | 65 | 13 | 32 | 15 | PASS | YES | NO | NO | ACTIVE | YES | SDE+FWD_VD1+FWD_VD0p05+GIDL | P5 electrical prior exists; fresh rerun if ACTIVE |
| G004 | 33 | 66 | 13 | 33 | 14 | PASS | NO | NO | NO | ACTIVE | YES | SDE+FWD_VD1+FWD_VD0p05+GIDL |  |
| G005 | 33 | 67 | 13 | 34 | 13 | PASS | YES | YES | YES | ACTIVE | YES | SDE+FWD_VD1+FWD_VD0p05+GIDL | P5 electrical prior exists; fresh rerun if ACTIVE; P6 visual/geometry preflight exists |
| G006 | 33 | 68 | 13 | 35 | 12 | PASS | NO | NO | NO | ACTIVE | YES | SDE+FWD_VD1+FWD_VD0p05+GIDL | new P8 electrical side above P5 B2 electrical edge |
| G007 | 33 | 69 | 13 | 36 | 11 | PASS | NO | NO | NO | ACTIVE | YES | SDE+FWD_VD1+FWD_VD0p05+GIDL | new P8 electrical side above P5 B2 electrical edge |
| G008 | 34 | 63 | 14 | 29 | 17 | PASS | NO | NO | NO | ACTIVE | YES | SDE+FWD_VD1+FWD_VD0p05+GIDL |  |
| G009 | 34 | 64 | 14 | 30 | 16 | PASS | NO | NO | NO | SEALED_HOLDOUT | NO | NONE_IN_P8 |  |
| G010 | 34 | 65 | 14 | 31 | 15 | PASS | NO | NO | NO | ACTIVE | YES | SDE+FWD_VD1+FWD_VD0p05+GIDL |  |
| G011 | 34 | 66 | 14 | 32 | 14 | PASS | NO | NO | NO | ACTIVE | YES | SDE+FWD_VD1+FWD_VD0p05+GIDL |  |
| G012 | 34 | 67 | 14 | 33 | 13 | PASS | NO | NO | NO | ACTIVE | YES | SDE+FWD_VD1+FWD_VD0p05+GIDL |  |
| G013 | 34 | 68 | 14 | 34 | 12 | PASS | NO | NO | NO | SEALED_HOLDOUT | NO | NONE_IN_P8 | new P8 electrical side above P5 B2 electrical edge |
| G014 | 34 | 69 | 14 | 35 | 11 | PASS | NO | NO | NO | ACTIVE | YES | SDE+FWD_VD1+FWD_VD0p05+GIDL | new P8 electrical side above P5 B2 electrical edge |
| G015 | 35 | 63 | 15 | 28 | 17 | PASS | YES | NO | YES | ACTIVE | YES | SDE+FWD_VD1+FWD_VD0p05+GIDL | P5 electrical prior exists; fresh rerun if ACTIVE |
| G016 | 35 | 64 | 15 | 29 | 16 | PASS | NO | NO | NO | ACTIVE | YES | SDE+FWD_VD1+FWD_VD0p05+GIDL |  |
| G017 | 35 | 65 | 15 | 30 | 15 | PASS | YES | YES | YES | ACTIVE | YES | SDE+FWD_VD1+FWD_VD0p05+GIDL | P5 electrical prior exists; fresh rerun if ACTIVE; P6 visual/geometry preflight exists |
| G018 | 35 | 66 | 15 | 31 | 14 | PASS | NO | NO | NO | ACTIVE | YES | SDE+FWD_VD1+FWD_VD0p05+GIDL |  |
| G019 | 35 | 67 | 15 | 32 | 13 | PASS | YES | YES | YES | ACTIVE | YES | SDE+FWD_VD1+FWD_VD0p05+GIDL | P5 electrical prior exists; fresh rerun if ACTIVE; P6 visual/geometry preflight exists |
| G020 | 35 | 68 | 15 | 33 | 12 | PASS | NO | NO | NO | ACTIVE | YES | SDE+FWD_VD1+FWD_VD0p05+GIDL | new P8 electrical side above P5 B2 electrical edge |
| G021 | 35 | 69 | 15 | 34 | 11 | PASS | NO | YES | NO | ACTIVE | YES | SDE+FWD_VD1+FWD_VD0p05+GIDL | P6 visual/geometry preflight exists; new P8 electrical side above P5 B2 electrical edge |
| G022 | 36 | 63 | 16 | 27 | 17 | PASS | NO | NO | NO | ACTIVE | YES | SDE+FWD_VD1+FWD_VD0p05+GIDL |  |
| G023 | 36 | 64 | 16 | 28 | 16 | PASS | NO | NO | NO | SEALED_HOLDOUT | NO | NONE_IN_P8 |  |
| G024 | 36 | 65 | 16 | 29 | 15 | PASS | NO | NO | NO | ACTIVE | YES | SDE+FWD_VD1+FWD_VD0p05+GIDL |  |
| G025 | 36 | 66 | 16 | 30 | 14 | PASS | NO | NO | NO | ACTIVE | YES | SDE+FWD_VD1+FWD_VD0p05+GIDL |  |
| G026 | 36 | 67 | 16 | 31 | 13 | PASS | NO | NO | NO | ACTIVE | YES | SDE+FWD_VD1+FWD_VD0p05+GIDL |  |
| G027 | 36 | 68 | 16 | 32 | 12 | PASS | NO | NO | NO | SEALED_HOLDOUT | NO | NONE_IN_P8 | new P8 electrical side above P5 B2 electrical edge |
| G028 | 36 | 69 | 16 | 33 | 11 | PASS | NO | NO | NO | ACTIVE | YES | SDE+FWD_VD1+FWD_VD0p05+GIDL | new P8 electrical side above P5 B2 electrical edge |
| G029 | 37 | 63 | 17 | 26 | 17 | PASS | YES | NO | NO | ACTIVE | YES | SDE+FWD_VD1+FWD_VD0p05+GIDL | P5 electrical prior exists; fresh rerun if ACTIVE |
| G030 | 37 | 64 | 17 | 27 | 16 | PASS | NO | NO | NO | ACTIVE | YES | SDE+FWD_VD1+FWD_VD0p05+GIDL |  |
| G031 | 37 | 65 | 17 | 28 | 15 | PASS | YES | NO | NO | ACTIVE | YES | SDE+FWD_VD1+FWD_VD0p05+GIDL | P5 electrical prior exists; fresh rerun if ACTIVE |
| G032 | 37 | 66 | 17 | 29 | 14 | PASS | NO | NO | NO | ACTIVE | YES | SDE+FWD_VD1+FWD_VD0p05+GIDL |  |
| G033 | 37 | 67 | 17 | 30 | 13 | PASS | YES | YES | YES | ACTIVE | YES | SDE+FWD_VD1+FWD_VD0p05+GIDL | P5 electrical prior exists; fresh rerun if ACTIVE; P6 visual/geometry preflight exists |
| G034 | 37 | 68 | 17 | 31 | 12 | PASS | NO | NO | NO | ACTIVE | YES | SDE+FWD_VD1+FWD_VD0p05+GIDL | new P8 electrical side above P5 B2 electrical edge |
| G035 | 37 | 69 | 17 | 32 | 11 | PASS | NO | NO | NO | ACTIVE | YES | SDE+FWD_VD1+FWD_VD0p05+GIDL | new P8 electrical side above P5 B2 electrical edge |
