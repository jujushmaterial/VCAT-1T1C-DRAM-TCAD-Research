# Phase 5 산출물 — P6 전달 Nominal 구조·Fixed WF·Boundary 값

- 과제 ID: `P05-T04`
- 산출물 ID: `P05-T04-O06`
- 제출자: 이택규 (`@LEE-TAEK-GYU`)
- 제출 시각: 2026-08-22T09:19:17.293Z
- 관련 Issue: [#5](https://github.com/jujushmaterial/VCAT-1T1C-DRAM-TCAD-Research/issues/5)
- 제출 방식: table

## 저장된 표

- 크기: 13행 × 4열
- 첫 행 제목 사용: 예
- [CSV 원본](./table.csv)
- [TSV 원본](./table.tsv)
- [JSON 원본](./table.json)

| Source: P05-T04 Multi-Metal 3D 구조 검증 (완료) / Nominal geometry = Xbnd1_nm 35, Xbnd2_nm 67 |  |  |  |
| --- | --- | --- | --- |
|  |  |  |  |
| Parameter | Value | Unit | Note |
| Xbnd1_nm | 35 | nm | Boundary 1 (Nominal, independent variable) |
| Xbnd2_nm | 67 | nm | Boundary 2 (Nominal, independent variable) |
| M1_nm | 15 | nm | Derived = Xbnd1_nm - Lsn_nm(20) |
| M2_nm | 32 | nm | Derived = Xbnd2_nm - Xbnd1_nm |
| M3_nm | 13 | nm | Derived = 80 - Xbnd2_nm (XgateEnd=80nm) |
| WF_LOW | 4.33 | eV | Fixed work function (gate_m1, gate_m3) |
| WF_HIGH | 4.7 | eV | Fixed work function (gate_m2) |
| Temp | 300 | K | Fixed simulation temperature |
|  |  |  |  |
| M1/M2/M3는 SDE 코드 내부에서 자동 계산되는 파생값이며 별도 스윕 변수가 아님. P6로 넘어가는 실제 독립변수는 Xbnd1_nm, Xbnd2_nm 두 개뿐임. Source: P05-T04 검증 완료 구조 (구조·Mesh·Contact·Doping 5단계 검증 통과). |  |  |  |
