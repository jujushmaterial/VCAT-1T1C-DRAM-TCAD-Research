# Phase 6 산출물 — P7·P8 공통 Mesh·Bias·Physics·Solver 조건표

- 과제 ID: `P06-T02`
- 산출물 ID: `P06-T02-O03`
- 제출자: 이선형 (`@LSH-linear`)
- 제출 시각: 2026-08-19T15:29:02.032Z
- 관련 Issue: [#6](https://github.com/jujushmaterial/VCAT-1T1C-DRAM-TCAD-Research/issues/6)
- 제출 방식: table

## 저장된 표

- 크기: 64행 × 6열
- 첫 행 제목 사용: 예
- [CSV 원본](./table.csv)
- [TSV 원본](./table.tsv)
- [JSON 원본](./table.json)

## 표 설명

P6 Nominal 재현성 PASS를 기준으로 P7/P8 tolerance sweep에 공통 적용할 Mesh, Bias, Physics, Solver 조건을 고정하였다. Geometry와 WF의 물리적 의미는 P5 기준을 유지하고, Forward simulation은 P5 validated exact deck을 공통 baseline으로 사용한다.

| Category | Item | Fixed_Value_or_Rule | Unit | Status | Basis |
| --- | --- | --- | --- | --- | --- |
| Geometry | Nominal Xbnd1 | 35 | nm | FROZEN | P6 fresh Forward PASS / P6 T01 official code |
| Geometry | Nominal Xbnd2 | 67 | nm | FROZEN | P6 fresh Forward PASS / P6 T01 official code |
| Geometry | Tolerance independent variables | Xbnd1_nm, Xbnd2_nm |  | FROZEN | P06-T01 official parameterization |
| Geometry | Derived segments | M1=B1-20; M2=B2-B1; M3=80-B2 | nm | FROZEN | P06-T01 official parameterization |
| Geometry | Topology guard | 20 < Xbnd1 < Xbnd2 < 80 | nm | FROZEN | P06-T01 official parameterization |
| Geometry/Doping | Dpillar | 12 | nm | FROZEN | P6 fresh Forward PASS / P6 T01 official code |
| Geometry/Doping | Tox | 1 | nm | FROZEN | P6 fresh Forward PASS / P6 T01 official code |
| Geometry/Doping | Lg | 60 | nm | FROZEN | P6 fresh Forward PASS / P6 T01 official code |
| Geometry/Doping | Lsn | 20 | nm | FROZEN | P6 fresh Forward PASS / P6 T01 official code |
| Geometry/Doping | Lbl | 20 | nm | FROZEN | P6 fresh Forward PASS / P6 T01 official code |
| Geometry/Doping | Nbody | 1e+17 | cm^-3 | FROZEN | P6 fresh Forward PASS / P6 T01 official code |
| Geometry/Doping | NSD | 1e+20 | cm^-3 | FROZEN | P6 fresh Forward PASS / P6 T01 official code |
| Geometry/Doping | JDepthSN | 20 | nm | FROZEN | P6 fresh Forward PASS / P6 T01 official code |
| Geometry/Doping | JDepthBL | 20 | nm | FROZEN | P6 fresh Forward PASS / P6 T01 official code |
| Geometry/Doping | GaussFactor | 0.8 | - | FROZEN | P6 fresh Forward PASS / P6 T01 official code |
| Geometry/Doping | MeshScale | 1.0 | - | FROZEN | P6 fresh Forward PASS / P6 T01 official code |
| Electrode | WF gate_m1 / gate_m2 / gate_m3 | 4.33 / 4.70 / 4.33 | eV | FROZEN | P6 fresh Forward PASS / P6 T01 official code |
| Temperature | Temperature | 300 | K | FROZEN | P6 fresh Forward PASS / P6 T01 official code |
| Forward Bias | bitline | 0 | V | FROZEN | P6 fresh Forward PASS / P6 T01 official code |
| Forward Bias | storage drain bias | 0.05 and 1.0 | V | FROZEN | P6 fresh Forward PASS / P6 T01 official code |
| Forward Bias | gate_m1/m2/m3 sweep | 0 -> 1.0 | V | FROZEN | P6 fresh Forward PASS / P6 T01 official code |
| GIDL Bias | storage drain bias | 1.0 | V | FROZEN (P5 carry-over) | P5 final validated PRODFAST deck |
| GIDL Bias | gate_m1/m2/m3 sweep | 0 -> -0.4 | V | FROZEN (P5 carry-over) | P5 final validated PRODFAST deck |
| Mesh | Global refinement-size arguments | 0.0050, 0.0010, 0.0005, 0.0001 × MeshScale | um | FROZEN | P6 fresh Forward PASS / P6 T01 official code |
| Mesh | Global doping refinement | DopingConcentration MaxTransDiff = 1 |  | FROZEN | P6 fresh Forward PASS / P6 T01 official code |
| Mesh | Si/SiO2 interface refinement | MaxLenInt=0.0002 × MeshScale; factor=1.5; DoubleSide | um | FROZEN | P6 fresh Forward PASS / P6 T01 official code |
| Mesh | Junction refinement-size arguments | 0.0010, 0.0005, 0.0002, 0.0001 × MeshScale | um | FROZEN | P6 fresh Forward PASS / P6 T01 official code |
| Mesh | SN/BL junction window half-range | 0.004 | um | FROZEN | P6 fresh Forward PASS / P6 T01 official code |
| Mesh | Metal boundary B1/B2 window half-range | 0.004 | um | FROZEN | P6 fresh Forward PASS / P6 T01 official code |
| Mesh Verification | Fresh nominal grid points | 1313 | points | OBSERVED | n561/n564 fresh SDevice logs |
| Mesh Verification | Fresh nominal mesh SHA256 | 6547306be7dc90e706d48b561faecaffc7933b20be2dead1d70c6df1bd11baff |  | OBSERVED | P6 fresh n555_msh.tdr |
| Physics | Carrier statistics | Fermi |  | FROZEN | P6 fresh Forward PASS / P6 T01 official code |
| Physics | Effective intrinsic density | OldSlotboom |  | FROZEN | P6 fresh Forward PASS / P6 T01 official code |
| Physics | Mobility | PhuMob + HighFieldSaturation |  | FROZEN | P6 fresh Forward PASS / P6 T01 official code |
| Physics | Recombination | SRH |  | FROZEN | P6 fresh Forward PASS / P6 T01 official code |
| Physics | Band-to-band tunneling | Band2Band(Model=NonlocalPath) |  | FROZEN | P6 fresh Forward PASS / P6 T01 official code |
| Forward Math | Coordinate system | AsIs |  | FROZEN | P6 fresh Forward PASS / P6 T01 official code |
| Forward Math | Cylindrical | yAxis=0.0 |  | FROZEN | P6 fresh Forward PASS / P6 T01 official code |
| Forward Math | Contact handling | ExcludeTouchingContactParts |  | FROZEN | P6 fresh Forward PASS / P6 T01 official code |
| Forward Math | Derivatives | ON |  | FROZEN | P6 fresh Forward PASS / P6 T01 official code |
| Forward Math | RelErrControl | ON |  | FROZEN | P6 fresh Forward PASS / P6 T01 official code |
| Forward Math | Digits | 5 |  | FROZEN | P6 fresh Forward PASS / P6 T01 official code |
| Forward Math | ErrRef Electron / Hole | 1e8 / 1e8 |  | FROZEN | P6 fresh Forward PASS / P6 T01 official code |
| Forward Math | Math Iterations | 100 |  | FROZEN | P6 fresh Forward PASS / P6 T01 official code |
| Forward Math | NotDamped | 30 |  | FROZEN | P6 fresh Forward PASS / P6 T01 official code |
| Forward Math | Method | ILS |  | FROZEN | P6 fresh Forward PASS / P6 T01 official code |
| Forward Math | ExtendedPrecision | ON |  | FROZEN | P6 fresh Forward PASS / P6 T01 official code |
| Forward Solve | Initial Poisson | Coupled; Iterations=100 |  | FROZEN | P6 fresh Forward PASS / P6 T01 official code |
| Forward Solve | Initial carriers | Coupled Poisson Electron Hole; Iterations=150; LineSearchDamping=1e-2 |  | FROZEN | P6 fresh Forward PASS / P6 T01 official code |
| Forward Solve | Drain ramp | InitialStep=1e-4; Increment=1.12; Decrement=4; MaxStep=0.002; MinStep=1e-12 |  | FROZEN | P6 fresh Forward PASS / P6 T01 official code |
| Forward Solve | Drain ramp coupled | Iterations=150; LineSearchDamping=1e-3 |  | FROZEN | P6 fresh Forward PASS / P6 T01 official code |
| Forward Solve | Gate sweep | InitialStep=1e-5; Increment=1.12; Decrement=4; MaxStep=0.002; MinStep=1e-12 |  | FROZEN | P6 fresh Forward PASS / P6 T01 official code |
| Forward Solve | Gate sweep coupled | Iterations=150; LineSearchDamping=1e-3 |  | FROZEN | P6 fresh Forward PASS / P6 T01 official code |
| GIDL PRODFAST Solve | Math Iterations | 40 |  | FROZEN (P5 carry-over) | P5 final code; submission comment states conservative 3-point cross-validation passed |
| GIDL PRODFAST Solve | NotDamped | 30 |  | FROZEN (P5 carry-over) | P5 final code; submission comment states conservative 3-point cross-validation passed |
| GIDL PRODFAST Solve | Method | ILS |  | FROZEN (P5 carry-over) | P5 final code; submission comment states conservative 3-point cross-validation passed |
| GIDL PRODFAST Solve | ExtendedPrecision | ON |  | FROZEN (P5 carry-over) | P5 final code; submission comment states conservative 3-point cross-validation passed |
| GIDL PRODFAST Solve | Extrapolate | ON |  | FROZEN (P5 carry-over) | P5 final code; submission comment states conservative 3-point cross-validation passed |
| GIDL PRODFAST Solve | Initial Poisson | Coupled; Iterations=50 |  | FROZEN (P5 carry-over) | P5 final code; submission comment states conservative 3-point cross-validation passed |
| GIDL PRODFAST Solve | Initial carriers | Coupled Poisson Electron Hole; Iterations=75; LineSearchDamping=1e-2 |  | FROZEN (P5 carry-over) | P5 final code; submission comment states conservative 3-point cross-validation passed |
| GIDL PRODFAST Solve | Drain ramp | InitialStep=0.01; Increment=1.40; Decrement=4; MaxStep=0.05; MinStep=1e-6 |  | FROZEN (P5 carry-over) | P5 final code; submission comment states conservative 3-point cross-validation passed |
| GIDL PRODFAST Solve | Gate sweep | InitialStep=0.01; Increment=1.40; Decrement=4; MaxStep=0.05; MinStep=1e-6 |  | FROZEN (P5 carry-over) | P5 final code; submission comment states conservative 3-point cross-validation passed |
| GIDL PRODFAST Solve | Coupled iterations during ramps | 40 |  | FROZEN (P5 carry-over) | P5 final code; submission comment states conservative 3-point cross-validation passed |
