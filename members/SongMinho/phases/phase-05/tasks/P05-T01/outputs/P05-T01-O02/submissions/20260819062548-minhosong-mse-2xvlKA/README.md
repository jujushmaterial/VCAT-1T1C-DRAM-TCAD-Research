# Phase 5 산출물 — P5 공통 Bias·Physics·Mesh·추출 조건표

- 과제 ID: `P05-T01`
- 산출물 ID: `P05-T01-O02`
- 제출자: 송민호 (`@minhosong-mse`)
- 제출 시각: 2026-08-19T06:25:48.491Z
- 관련 Issue: [#5](https://github.com/jujushmaterial/VCAT-1T1C-DRAM-TCAD-Research/issues/5)
- 제출 방식: table

## 저장된 표

- 크기: 15행 × 5열
- 첫 행 제목 사용: 예
- [CSV 원본](./table.csv)
- [TSV 원본](./table.tsv)
- [JSON 원본](./table.json)

## 표 설명

P5 공통 Bias·Physics·Mesh·추출 조건. P2와 global+junction mesh 정책은 같고 Multi의 실제 WF boundary refinement만 추가.

| Category | Item | Value | Unit | Note |
| --- | --- | --- | --- | --- |
| Structure | Work Function | 4.33 / 4.70 / 4.33 | eV | P3-fixed; no WF resweep |
| Structure | Gate span / Lg | 20–80 / 60 | nm | fixed |
| Structure | Tox / Dpillar | 1 / 12 | nm | fixed |
| Doping | Nbody / NSD | 1e17 / 1e20 | cm^-3 | fixed |
| Forward | Vd / Vg | 0.05,1.0 / 0→1.0 | V | storage biased; bitline=0; 3 gates simultaneous |
| GIDL | Vd / Vg | 1.0 / 0→-0.4 | V | 3 gates simultaneous |
| Temperature | Temp | 300 | K | fixed |
| Physics | Statistics/BGN | Fermi / OldSlotboom |  | same comparison physics |
| Physics | Mobility | PhuMob + HighFieldSaturation |  | same comparison physics |
| Physics | Recombination | SRH + Band2Band(Model=NonlocalPath) |  | BTBT retained |
| Math | 2D coordinate | Cylindrical(yAxis=0) |  | 2D only |
| Mesh | Common base | global + SN/BL junction refinement |  | P2/P5 common policy |
| Mesh | Multi WF boundary | moving ±4 nm windows |  | physical WF boundary only; no artificial P2 boundary refinement |
| Extraction | Ion/Ioff/Vth/SS/DIBL | P5 common criteria |  | final code package contains criteria |
