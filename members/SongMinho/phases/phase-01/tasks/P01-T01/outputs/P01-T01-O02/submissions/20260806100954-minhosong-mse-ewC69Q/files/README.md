# P01-T01-O02 실행 원본 증거 보완본

현재 GitHub에 이미 올라간 Workbench 이미지와 실행 확인 CSV는 다시 포함하지 않았다. 이 보완본은 reviewer가 실행 성공과 profile/final TDR 생성을 직접 확인할 수 있도록 원본 SDevice 로그와 로그 기반 manifest만 추가한다.

## 포함 파일

- `logs/P01-T01-O02_LL_n2_sdevice.log`
- `logs/P01-T01-O02_LH_n19_sdevice.log`
- `logs/P01-T01-O02_HL_n15_sdevice.log`
- `logs/P01-T01-O02_HH_n21_sdevice.log`
- `P01-T01-O02_log_evidence_index.csv`
- `P01-T01-O02_tdr_manifest.csv`

## 확인 결과

- 네 로그 모두 `Sentaurus Device simulation finished`와 `Good Bye`까지 도달했다.
- 조건별 Low-Vd profile 6개, High-Vd profile 6개와 final TDR 기록이 확인된다.
- 대표 High-Vd profile index는 `0000=Vg 0 V`, `0003=Vg 1.0 V`, `0005=Vg 2.5 V`이다.
- 실제 TDR 바이너리는 포함하지 않았고, manifest는 로그의 `Writing plot ... done` 기록을 생성 증거로 사용한다.
- TCAD 재실행은 하지 않았다.
