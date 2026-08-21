# Phase 7 산출물 — 변수 포함·제외 이유

- 과제 ID: `P07-T01`
- 산출물 ID: `P07-T01-O06`
- 제출자: 송민호 (`@minhosong-mse`)
- 제출 시각: 2026-08-21T03:15:03.331Z
- 관련 Issue: [#7](https://github.com/jujushmaterial/VCAT-1T1C-DRAM-TCAD-Research/issues/7)
- 제출 방식: files

## 제출 파일

- [P07-T01-O06_Variable_Inclusion_Exclusion.csv](./files/P07-T01-O06_Variable_Inclusion_Exclusion.csv) (2.8KB)

## 제출 메모

P8 변수 포함·제외 판단 근거. Xbnd1_nm/Xbnd2_nm은 independent geometry tolerance variable이며 sensitivity와 interaction이 실제 존재하므로 포함한다. M1/M2/M3는 derived라 중복되므로 제외하고, Tox/channel dimension은 현재 B1/B2만으로도 P8 2D campaign을 구성할 근거가 충분해 추가 dimension으로 채택하지 않는다. 각 제외변수에 limitation과 향후 reopen trigger를 기록하였다.
