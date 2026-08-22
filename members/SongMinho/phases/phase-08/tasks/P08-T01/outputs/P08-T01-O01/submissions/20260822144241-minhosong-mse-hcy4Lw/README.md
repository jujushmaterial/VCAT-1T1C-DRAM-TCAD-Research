# Phase 8 산출물 — P6 Nominal·Fixed WF·공통 Simulation 입력표

- 과제 ID: `P08-T01`
- 산출물 ID: `P08-T01-O01`
- 제출자: 송민호 (`@minhosong-mse`)
- 제출 시각: 2026-08-22T14:42:41.888Z
- 관련 Issue: [#8](https://github.com/jujushmaterial/VCAT-1T1C-DRAM-TCAD-Research/issues/8)
- 제출 방식: table

## 저장된 표

- 크기: 55행 × 7열
- 첫 행 제목 사용: 예
- [CSV 원본](./table.csv)
- [TSV 원본](./table.tsv)
- [JSON 원본](./table.json)

## 표 설명

P08-T01-O01 — P6 Nominal·Fixed WF·공통 Simulation 입력표

목적
- P8 전체 2D tolerance campaign에서 바뀌면 안 되는 공통 입력조건을 한 표로 고정한다.

핵심 내용
- Nominal: Xbnd1=35 nm, Xbnd2=67 nm
- WF_LOW/WF_HIGH=4.33/4.70 eV, Temperature=300 K
- Dpillar, Tox, doping, mesh, physics, solver, Forward/GIDL bias와 추출법을 고정한다.
- P8 독립 geometry 변수는 Xbnd1/Xbnd2이며 M1/M2/M3는 파생값이다.

근거
- P5 최종 3D handoff와 P6 frozen simulation 기준을 최신 main에서 교차확인하였다.

주의
- 이 표의 고정항목은 P8에서 새 최적화 변수가 아니다.
- PASS/MARGINAL/FAIL 결과를 본 뒤 simulation 조건을 변경하지 않는다.

| Category | Item | P8_Value_or_Rule | Unit | Status | Source | P8_Note |
| --- | --- | --- | --- | --- | --- | --- |
| Geometry | Nominal Xbnd1 | 35 | nm | P5_3D_HANDOFF_CONFIRMED__P6_FROZEN | P05-T04-O06 / 20260822091917-LEE-TAEK-GYU-cVFNEg; P06-T02-O03 / 20260819152902-LSH-linear-JDZt-Q | Latest main confirms 3D-validated P5 handoff remains Xbnd1=35 nm, Xbnd2=67 nm; used unchanged in P8. |
| Geometry | Nominal Xbnd2 | 67 | nm | P5_3D_HANDOFF_CONFIRMED__P6_FROZEN | P05-T04-O06 / 20260822091917-LEE-TAEK-GYU-cVFNEg; P06-T02-O03 / 20260819152902-LSH-linear-JDZt-Q | Latest main confirms 3D-validated P5 handoff remains Xbnd1=35 nm, Xbnd2=67 nm; used unchanged in P8. |
| Geometry | Independent variables | Xbnd1_nm; Xbnd2_nm |  | P6_FROZEN | P06-T01-O02 / 20260819074531-minhosong-mse-rT_aGQ | Only independent geometry tolerance variables |
| Geometry | Derived segments | M1=B1-20; M2=B2-B1; M3=80-B2 | nm | P6_FROZEN | P06-T02-O03 | Do not sweep independently |
| Geometry | Topology guard | 20 < Xbnd1 < Xbnd2 < 80 | nm | P6_FROZEN | P06-T02-O03 | All current 35 candidate points pass |
| Geometry/Doping | Dpillar | 12 | nm | P6_FROZEN | P06-T02-O03 |  |
| Geometry/Doping | Tox | 1 | nm | P6_FROZEN | P06-T02-O03 | Not a P8 sweep variable |
| Geometry/Doping | Lg | 60 | nm | P6_FROZEN | P06-T02-O03 |  |
| Geometry/Doping | Lsn / Lbl | 20 / 20 | nm | P6_FROZEN | P06-T02-O03 |  |
| Geometry/Doping | Nbody | 1e+17 | cm^-3 | P6_FROZEN | P06-T02-O03 |  |
| Geometry/Doping | NSD | 1e+20 | cm^-3 | P6_FROZEN | P06-T02-O03 |  |
| Geometry/Doping | JDepthSN / JDepthBL | 20 / 20 | nm | P6_FROZEN | P06-T02-O03 |  |
| Geometry/Doping | GaussFactor | 0.8 | - | P6_FROZEN | P06-T02-O03 |  |
| Geometry/Doping | MeshScale | 1.0 | - | P6_FROZEN | P06-T02-O03 |  |
| Electrode | WF gate_m1 / gate_m2 / gate_m3 | 4.33 / 4.70 / 4.33 | eV | P5_3D_HANDOFF_CONFIRMED__P6_FROZEN | P05-T04-O06 / 20260822091917-LEE-TAEK-GYU-cVFNEg; P06-T02-O03 | Latest main confirms WF_LOW/HIGH=4.33/4.70 eV; WF is fixed, not a P8 sweep variable. |
| Temperature | Temperature | 300 | K | P5_3D_HANDOFF_CONFIRMED__P6_FROZEN | P05-T04-O06 / 20260822091917-LEE-TAEK-GYU-cVFNEg; P06-T02-O03 | Latest main confirms 300 K handoff. |
| Forward Bias | bitline | 0 | V | P6_FROZEN | P06-T02-O03 |  |
| Forward Bias | storage VdBias | 1.0; 0.05 | V | P6_FROZEN | P06-T02-O03 | Two Forward runs per active geometry |
| Forward Bias | gate sweep | 0 -> 1.0 | V | P6_FROZEN | P06-T02-O03 | All three gate segments together |
| GIDL Bias | storage drain | 1.0 | V | P5_CARRY_OVER_FROZEN | P06-T02-O03 / P05-T03-O05 | If GIDL is decision-active, one GIDL run per active geometry |
| GIDL Bias | gate sweep | 0 -> -0.4 | V | P5_CARRY_OVER_FROZEN | P06-T02-O03 / P05-T03-O05 | All three gate segments together |
| Mesh | Global refinement size args | 0.0050,0.0010,0.0005,0.0001 × MeshScale | um | P6_FROZEN | P06-T02-O03 |  |
| Mesh | Global doping refinement | DopingConcentration MaxTransDiff = 1 |  | P6_FROZEN | P06-T02-O03 |  |
| Mesh | Si/SiO2 interface | MaxLenInt=0.0002×MeshScale; factor=1.5; DoubleSide | um | P6_FROZEN | P06-T02-O03 |  |
| Mesh | Junction refinement size args | 0.0010,0.0005,0.0002,0.0001 × MeshScale | um | P6_FROZEN | P06-T02-O03 |  |
| Mesh | SN/BL junction window half-range | 0.004 | um | P6_FROZEN | P06-T02-O03 |  |
| Mesh | B1/B2 moving-boundary window half-range | 0.004 | um | P6_FROZEN | P06-T02-O03 |  |
| Physics | Carrier statistics | Fermi |  | P6_FROZEN | P06-T02-O03 |  |
| Physics | Effective intrinsic density | OldSlotboom |  | P6_FROZEN | P06-T02-O03 |  |
| Physics | Mobility | PhuMob + HighFieldSaturation |  | P6_FROZEN | P06-T02-O03 |  |
| Physics | Recombination | SRH |  | P6_FROZEN | P06-T02-O03 |  |
| Physics | BTBT | Band2Band(Model=NonlocalPath) |  | P6_FROZEN | P06-T02-O03 |  |
| Forward Math | Digits | 5 |  | P6_FROZEN | P06-T02-O03 |  |
| Forward Math | ErrRef Electron/Hole | 1e8 / 1e8 |  | P6_FROZEN | P06-T02-O03 |  |
| Forward Math | Iterations / NotDamped | 100 / 30 |  | P6_FROZEN | P06-T02-O03 |  |
| Forward Math | Method | ILS |  | P6_FROZEN | P06-T02-O03 |  |
| Forward Math | ExtendedPrecision | ON |  | P6_FROZEN | P06-T02-O03 |  |
| Forward Math | Cylindrical | yAxis=0.0 |  | P6_FROZEN | P06-T02-O03 |  |
| Forward Math | Contact handling | ExcludeTouchingContactParts |  | P6_FROZEN | P06-T02-O03 |  |
| Forward Solve | Initial Poisson | Coupled Iterations=100 |  | P6_FROZEN | P06-T02-O03 |  |
| Forward Solve | Initial carriers | Iterations=150; LineSearchDamping=1e-2 |  | P6_FROZEN | P06-T02-O03 |  |
| Forward Solve | Drain ramp | InitialStep=1e-4; Increment=1.12; Decrement=4; MaxStep=0.002; MinStep=1e-12 |  | P6_FROZEN | P06-T02-O03 |  |
| Forward Solve | Gate sweep | InitialStep=1e-5; Increment=1.12; Decrement=4; MaxStep=0.002; MinStep=1e-12 |  | P6_FROZEN | P06-T02-O03 |  |
| Forward Solve | Ramp coupled | Iterations=150; LineSearchDamping=1e-3 |  | P6_FROZEN | P06-T02-O03 |  |
| GIDL PRODFAST | Math | Iterations=40; NotDamped=30; ILS; ExtendedPrecision; Extrapolate |  | P5_CARRY_OVER_FROZEN | P06-T02-O03 / P05-T03-O05 | Validated P5 PRODFAST, not fresh-revalidated in P6 |
| GIDL PRODFAST | Initial Poisson/carriers | 50 / 75 iterations; carrier LineSearchDamping=1e-2 |  | P5_CARRY_OVER_FROZEN | P06-T02-O03 / P05-T03-O05 |  |
| GIDL PRODFAST | Drain & gate stepping | InitialStep=0.01; Increment=1.40; Decrement=4; MaxStep=0.05; MinStep=1e-6 |  | P5_CARRY_OVER_FROZEN | P06-T02-O03 / P05-T03-O05 |  |
| Extraction | Ion | Vd=1.0,Vg=1.0; final Forward Id-Vg point; \|storage TotalCurrent\| | A | P6_FROZEN | P06-T02-O04 |  |
| Extraction | Ioff | Vd=1.0; first stored Forward point (nominal Vg≈0; actual fresh first Vg=1e-5); \|storage TotalCurrent\| | A | P6_FROZEN | P06-T02-O04 | Preserve P5 behavior |
| Extraction | Ion/Ioff | Ion / Ioff | - | P6_FROZEN | P06-T02-O04 |  |
| Extraction | Vth | \|Id\|=1e-7 A; log-linear interpolation in log10(\|Id\|) | V | P6_FROZEN | P06-T02-O04 | Both Vd=0.05 and 1.0 |
| Extraction | SS | Vd=1.0; 1e-12<=\|Id\|<=1e-8; linear fit log10(\|Id\|) vs Vg; SS=1000/slope | mV/dec | P6_FROZEN | P06-T02-O04 | SS@0.05 kept supplemental |
| Extraction | DIBL | (Vth@0.05 - Vth@1.0)/0.95*1000 | mV/V | P6_FROZEN | P06-T02-O04 |  |
| Extraction | GIDL | Vd=1.0,Vg=-0.4; final GIDL point; \|storage TotalCurrent\| | A | P6_FROZEN | P06-T02-O04 | If adopted as P8 decision metric |
