# Phase 3 산출물 — Low·High·Low 영역 정의표

- 과제 ID: `P03-T13`
- 산출물 ID: `P03-T13-O03`
- 제출자: 송민호 (`@minhosong-mse`)
- 제출 시각: 2026-08-13T16:05:44.337Z
- 관련 Issue: [#3](https://github.com/jujushmaterial/VCAT-1T1C-DRAM-TCAD-Research/issues/3)
- 제출 방식: table

## 저장된 표

- 크기: 4행 × 7열
- 첫 행 제목 사용: 예
- [CSV 원본](./table.csv)
- [TSV 원본](./table.tsv)
- [JSON 원본](./table.json)

## 표 설명

M1/M2/M3 gate-oxide region과 gate contact의 LOW/HIGH/LOW 역할을 정리한 표이다. 1:1:1 조건에서 각 segment는 20 nm이다.

| Zone | Region name | Contact | WF role | Axial range (um) | Length (nm) | Material / note |
| --- | --- | --- | --- | --- | --- | --- |
| M1 (SN-side) | R.GateOxide.M1 | gate_m1 | LOW | 0.020–0.040 | 20 | SiO2 gate-oxide segment; WF assigned in SDevice |
| M2 (center) | R.GateOxide.M2 | gate_m2 | HIGH | 0.040–0.060 | 20 | SiO2 gate-oxide segment; WF assigned in SDevice |
| M3 (BL-side) | R.GateOxide.M3 | gate_m3 | LOW | 0.060–0.080 | 20 | SiO2 gate-oxide segment; WF assigned in SDevice |
