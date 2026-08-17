# Phase 3 산출물 — Dual-Metal 비교 조건표

- 과제 ID: `P03-T12`
- 산출물 ID: `P03-T12-O03`
- 제출자: 송민호 (`@minhosong-mse`)
- 제출 시각: 2026-08-17T12:03:14.435Z
- 관련 Issue: [#3](https://github.com/jujushmaterial/VCAT-1T1C-DRAM-TCAD-Research/issues/3)
- 제출 방식: table

## 저장된 표

- 크기: 6행 × 10열
- 첫 행 제목 사용: 예
- [CSV 원본](./table.csv)
- [TSV 원본](./table.tsv)
- [JSON 원본](./table.json)

## 표 설명

P03-T12-O03 — Dual-Metal 비교 조건표

평균 WF가 약 4.70 eV가 되도록 ΔWF=0, ±0.2, ±0.4 eV의 공간 배치 방향을 비교했다.
Forward는 Vd=0.05 V와 1.0 V에서 수행했고 GIDL은 storage=1.0 V, gate=0→-0.4 V에서 수행했다.
RatioSN=0.5, Temp=300 K, P2 기준 geometry/doping/mesh를 공통 유지했다.

| Case | DeltaWF_eV | WF_SN_eV | WF_BL_eV | RatioSN | SN_nm | BL_nm | Forward_Vd_V | GIDLDrain_V | GIDLGateStop_V |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| DM0 | 0 | 4.7 | 4.7 | 0.5 | 30 | 30 | 0.05/1.0 | 1 | -0.4 |
| DM+0.4 | 0.4 | 4.9 | 4.5 | 0.5 | 30 | 30 | 0.05/1.0 | 1 | -0.4 |
| DM+0.2 | 0.2 | 4.8 | 4.6 | 0.5 | 30 | 30 | 0.05/1.0 | 1 | -0.4 |
| DM-0.2 | -0.2 | 4.6 | 4.8 | 0.5 | 30 | 30 | 0.05/1.0 | 1 | -0.4 |
| DM-0.4 | -0.4 | 4.5 | 4.9 | 0.5 | 30 | 30 | 0.05/1.0 | 1 | -0.4 |
