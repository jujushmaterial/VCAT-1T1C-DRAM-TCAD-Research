# Phase 6 산출물 — Nominal 재현성 Pass·Fail 판정

- 과제 ID: `P06-T02`
- 산출물 ID: `P06-T02-O05`
- 제출자: 이선형 (`@LSH-linear`)
- 제출 시각: 2026-08-19T15:33:28.283Z
- 관련 Issue: [#6](https://github.com/jujushmaterial/VCAT-1T1C-DRAM-TCAD-Research/issues/6)
- 제출 방식: files

## 제출 파일

- [P06-T02-O05_Nominal_Reproducibility_PASS.md](./files/P06-T02-O05_Nominal_Reproducibility_PASS.md) (2.1KB)
- [P06-T02-O05_Reproducibility_Evidence.csv](./files/P06-T02-O05_Reproducibility_Evidence.csv) (1.8KB)

## 제출 메모

P6 Parameterized Nominal fresh rerun은 2026-08-19에 독립 실행되었으며, 새 log와 fresh mesh를 사용하였다. P5 Original과 P6 fresh rerun의 Forward raw PLT는 Vd=0.05 V와 1.0 V 모두 SHA256이 일치했고, Ion, Ioff, Ion/Ioff, Vth, SS, DIBL도 동일하게 재현되었다. 따라서 parameterization 전후 Nominal 재현성은 PASS로 판정한다.
