# Phase 8 산출물 — P9 Holdout 2~4조건 사전 봉인표

- 과제 ID: `P08-T01`
- 산출물 ID: `P08-T01-O05`
- 제출자: 송민호 (`@minhosong-mse`)
- 제출 시각: 2026-08-22T14:52:00.094Z
- 관련 Issue: [#8](https://github.com/jujushmaterial/VCAT-1T1C-DRAM-TCAD-Research/issues/8)
- 제출 방식: files

## 제출 파일

- [P08-T01-O05_Holdout_4pt_SEALED.csv](./files/P08-T01-O05_Holdout_4pt_SEALED.csv) (827B)
- [P08-T01-O05_Holdout_Rationale_SEALED.txt](./files/P08-T01-O05_Holdout_Rationale_SEALED.txt) (2.4KB)

## 제출 메모

P08-T01-O05 — P9 Holdout 4조건 사전 봉인표

목적
- P9에서 독립적인 1T1C 검증을 하기 위해 P8 결과를 보기 전에 일부 geometry를 학습/보정 데이터에서 제외한다.

봉인 Holdout
- 34/64
- 34/68
- 36/64
- 36/68

선정 원칙
- P5 electrical-unseen
- P7 direct local-slope point가 아님
- P6 preflight point가 아님
- nominal centerline과 outer edge를 보존
- 네 quadrant를 고르게 포함

주의
- 이 4점은 P08-T02 2D 실행, P08-T03 3D calibration에 사용하지 않는다.
- P08-T04에서는 실제값이 아니라 최종 Window의 예측 class만 기록한다.
