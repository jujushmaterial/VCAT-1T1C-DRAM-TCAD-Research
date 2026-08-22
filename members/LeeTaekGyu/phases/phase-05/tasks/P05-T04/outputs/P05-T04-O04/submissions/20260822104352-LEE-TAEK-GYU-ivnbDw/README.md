# Phase 5 산출물 — 2D–3D 핵심 성능 변화표

- 과제 ID: `P05-T04`
- 산출물 ID: `P05-T04-O04`
- 제출자: 이택규 (`@LEE-TAEK-GYU`)
- 제출 시각: 2026-08-22T10:43:52.055Z
- 관련 Issue: [#5](https://github.com/jujushmaterial/VCAT-1T1C-DRAM-TCAD-Research/issues/5)
- 제출 방식: table

## 저장된 표

- 크기: 14행 × 7열
- 첫 행 제목 사용: 예
- [CSV 원본](./table.csv)
- [TSV 원본](./table.tsv)
- [JSON 원본](./table.json)

| P05-T04-O04 — Multi-Metal Nominal 2D vs 3D 핵심 성능 변화표 |  |  |  |  |  |  |
| --- | --- | --- | --- | --- | --- | --- |
| 동일 Nominal 구조 (Xbnd1=35nm, Xbnd2=67nm, Segment 15/32/13nm, WF_LOW=4.33eV/WF_HIGH=4.70eV) 기준, 2D SDevice(P05-T03-O02) vs 3D SDevice(P05-T04) 결과 비교. Ion/Ioff/SS는 Vd=1.0V 기준 (2D 산출물 원자료 convention). |  |  |  |  |  |  |
|  |  |  |  |  |  |  |
| Metric | Unit | 2D (P05-T03-O02) | 3D (P05-T04) | Change (3D-2D) | %Change | Note |
| Ion @ Vd=1.0V | A | 1.047476E-05 | 1.039896E-05 | -7.58051E-08 | -0.72% |  |
| Ioff @ Vd=1.0V | A | 9.180392E-16 | 1.057818E-15 | 1.39779E-16 | 15.23% |  |
| Ion/Ioff @ Vd=1.0V | ratio | 1.140993E+10 | 9.830572E+09 | -1579356701 | -13.84% |  |
| Vth @ Vd=0.05V | V | 0.486441 | 0.486932 | 0.000491001 | 0.10% |  |
| Vth @ Vd=1.0V | V | 0.484422 | 0.485022 | 0.000599604 | 0.12% |  |
| SS @ Vd=1.0V | mV/dec | 60.028189 | 60.018411 | -0.009777813 | -0.02% |  |
| DIBL | mV/V | 2.124958 | 2.010638 | -0.114319839 | -5.38% |  |
| GIDL \|I\| @ Vg=-0.4V | A | 3.590329E-15 | N/A | N/A | N/A | 3D Multi-Metal GIDL 미실행 — 비교 불가 |
|  |  |  |  |  |  |  |
| 2D 값은 P05-T03-O02(Single-Metal-Multi-Metal 통합 성능 비교, 송민호 제출, 2026-08-19, 대시보드 기준 검토 필요/미승인 상태이나 이번 비교에 사용된 유일한 실측 2D Nominal 자료임)에서 인용. 3D 값은 이번 세션 P05-T04 SDevice Forward 결과(VdBias=0.05V/1.0V, Sentaurus Visual CSV export)로부터 compute_p5_metrics.py로 직접 계산·검증함. 확인되지 않은 수치는 포함하지 않음. |  |  |  |  |  |  |
