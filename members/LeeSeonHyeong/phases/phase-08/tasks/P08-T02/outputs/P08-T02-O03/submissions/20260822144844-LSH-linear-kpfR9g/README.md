# Phase 8 산출물 — Nominal 중심 OAT·민감도 정리

- 과제 ID: `P08-T02`
- 산출물 ID: `P08-T02-O03`
- 제출자: 이선형 (`@LSH-linear`)
- 제출 시각: 2026-08-22T14:48:44.666Z
- 관련 Issue: [#8](https://github.com/jujushmaterial/VCAT-1T1C-DRAM-TCAD-Research/issues/8)
- 제출 방식: files

## 제출 파일

- [P08-T02-O03_Nominal_Centerline_OAT.csv](./files/P08-T02-O03_Nominal_Centerline_OAT.csv) (3.0KB)
- [P08-T02-O03_Nominal_Local_Sensitivity.csv](./files/P08-T02-O03_Nominal_Local_Sensitivity.csv) (1.9KB)

## 제출 메모

P08-T02-O03 — Nominal 중심 OAT·민감도 정리

목적
- 별도 OAT campaign을 중복 실행하지 않고 primary 31-point grid의 nominal centerline을 재사용해 변수별 국소 민감도를 정리한다.

Centerline
- Xbnd2=67 nm 고정, Xbnd1=33~37 nm: 모두 PASS
- Xbnd1=35 nm 고정, Xbnd2=63~69 nm: 모두 PASS

주요 경향
- Xbnd1 증가 방향에서 Ioff/DIBL 악화
- Xbnd2 증가 방향에서 Ioff/DIBL 개선
- Nominal 주변 local slope와 curvature를 함께 기록

해석
- OAT만 보면 전체 범위가 안전해 보이지만, 조합 geometry에서는 MARGINAL이 발생하므로 2D interaction 분석이 필요하다.
