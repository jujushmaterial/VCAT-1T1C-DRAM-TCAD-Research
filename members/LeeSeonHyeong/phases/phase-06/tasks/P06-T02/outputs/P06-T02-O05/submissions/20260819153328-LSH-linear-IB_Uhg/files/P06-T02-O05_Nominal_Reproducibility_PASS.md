# P06-T02-O05 Nominal Reproducibility — PASS

## Decision

**PASS**

P6 parameterized Nominal (`Xbnd1=35 nm`, `Xbnd2=67 nm`, WF `4.33/4.70/4.33 eV`) was independently rerun from the P6 project and reproduces the P5 Original Forward Id–Vg result.

## Independent-execution evidence

- Server project: `/user/semi/semi333/VCAT/P6_/P6_T1`
- Vd=1.0 V: `n561`, finished `2026-08-19 19:45:07 KST`, wallclock `868.93 s`
- Vd=0.05 V: `n564`, finished `2026-08-19 19:57:48 KST`, wallclock `757.06 s`
- Fresh P6 log hashes are different from the previously copied P5 logs.
- Fresh P6 nominal mesh SHA256: `6547306be7dc90e706d48b561faecaffc7933b20be2dead1d70c6df1bd11baff`
- Fresh P6 nominal mesh hash differs from the prior P5 mesh-file hash, confirming the P6 mesh file was newly rebuilt.

## Electrical reproduction evidence

Fresh P6 raw Forward PLT SHA256:

- `n561` Vd=1.0: `73bd9d04f22536aee76521778f55efaec8c16203484df581b061f6d8899ac006`
- `n564` Vd=0.05: `eabe860c01e3852196c95cffc64e72b06d9c1229a69167bd941a3dc100331060`

These match the P5 Original raw PLT SHA256 values previously verified directly on the research server. Therefore the complete Id–Vg data are byte-identical at both drain biases.

The seven Forward metrics in `P06-T02-O01_P5_vs_P6_Nominal_Performance.csv` have zero difference at the stored precision:
Ion, Ioff, Ion/Ioff, Vth@0.05 V, Vth@1.0 V, SS, and DIBL.

## Scope

- This PASS freezes the P5-exact Forward mesh/physics/bias/solver/extraction baseline for P7/P8.
- GIDL uses the P5 final `PRODFAST` deck carried forward from P5. The P5 submission records that it passed conservative 3-point cross-validation; GIDL was not independently rerun as part of this fresh P6 Forward reproducibility package.
- WF is fixed and is not a P6/P7/P8 sweep variable.
- Independent geometry tolerance variables are `Xbnd1_nm` and `Xbnd2_nm`; M1/M2/M3 are derived values.

## Raw preservation

User-retained archives:
- `P06_T02_AllFresh_10Nodes_20260819.tar.gz`
- `P06_T02_Nominal_Fresh_WithMesh_20260819.tar.gz`
- `P06_T02_Nominal_Fresh_20260819.tar(1).gz`

No raw archive is deleted by this package.
