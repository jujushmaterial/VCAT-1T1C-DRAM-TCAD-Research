# Phase 6 산출물 — Parameterized SDE·SDevice 코드

- 과제 ID: `P06-T01`
- 산출물 ID: `P06-T01-O01`
- 제출자: 송민호 (`@minhosong-mse`)
- 제출 시각: 2026-08-19T07:44:55.525Z
- 관련 Issue: [#6](https://github.com/jujushmaterial/VCAT-1T1C-DRAM-TCAD-Research/issues/6)
- 제출 방식: code

## 1. P06-T01-O01_Parameterized_SDE

- 코드 종류: Sentaurus SDE
- 원본 파일: [`P06-T01-O01_Parameterized_SDE.cmd`](./source/P06-T01-O01_Parameterized_SDE.cmd)

```tcl
;======================================================================
; P06: L-H-L VCAT Geometry Tolerance Base SDE
;
; Source: P05-T03-O05 Final 2D SDE
; Executable body below is inherited from the verified P5 deck.
;
; P6 purpose:
;   - Preserve the P5 physical device and mesh policy.
;   - Use Xbnd1_nm / Xbnd2_nm as the independent geometry parameters.
;   - Default/provisional Nominal: Xbnd1_nm=35 nm, Xbnd2_nm=67 nm.
;   - Fixed work functions are handled by SDevice: 4.33 / 4.70 / 4.33 eV.
;
; Derived geometry:
;   M1 = Xbnd1 - 20 nm
;   M2 = Xbnd2 - Xbnd1
;   M3 = 80 nm - Xbnd2
;
; Topology guard for P6/P7/P8 campaigns:
;   20 < Xbnd1 < Xbnd2 < 80 nm.
;   M1/M2/M3 are derived values, NOT independent sweep variables.
;
; IMPORTANT:
;   P05-T04 3D official handoff is still required before final P6 freeze.
;   Do not resweep WF in P6.
;======================================================================

(sde:clear)
(sdegeo:set-default-boolean "ABA")

;======================================================================
; 1. SWB parameters
;======================================================================

(define Dpillar_nm      @Dpillar_nm@)
(define Tox_nm          @Tox_nm@)
(define Lg_nm           @Lg_nm@)
(define Lsn_nm          @Lsn_nm@)
(define Lbl_nm          @Lbl_nm@)

(define Nbody           @Nbody@)
(define NSD             @NSD@)

(define JDepthSN_nm     @JDepthSN_nm@)
(define JDepthBL_nm     @JDepthBL_nm@)
(define GaussFactor     @GaussFactor@)

(define MeshScale       @MeshScale@)

; P5 independent geometry variables
(define Xbnd1_nm        @Xbnd1_nm@)
(define Xbnd2_nm        @Xbnd2_nm@)

;======================================================================
; 2. nm -> um
;======================================================================

(define Dpillar  (* Dpillar_nm  1.0e-3))
(define Rsi      (/ Dpillar 2.0))
(define Tox      (* Tox_nm      1.0e-3))
(define Lg       (* Lg_nm       1.0e-3))
(define Lsn      (* Lsn_nm      1.0e-3))
(define Lbl      (* Lbl_nm      1.0e-3))

(define JDepthSN (* JDepthSN_nm 1.0e-3))
(define JDepthBL (* JDepthBL_nm 1.0e-3))

(define Xbnd1    (* Xbnd1_nm 1.0e-3))
(define Xbnd2    (* Xbnd2_nm 1.0e-3))

;======================================================================
; 3. Derived coordinates
;======================================================================

(define Xtop       0.000)
(define XsnEnd     (+ Xtop Lsn))
(define XgateEnd   (+ XsnEnd Lg))
(define Xbottom    (+ XgateEnd Lbl))

; M1: XsnEnd -> Xbnd1
; M2: Xbnd1  -> Xbnd2
; M3: Xbnd2  -> XgateEnd

(define M1Length (- Xbnd1 XsnEnd))
(define M2Length (- Xbnd2 Xbnd1))
(define M3Length (- XgateEnd Xbnd2))

(define XmidM1 (/ (+ XsnEnd Xbnd1) 2.0))
(define XmidM2 (/ (+ Xbnd1 Xbnd2) 2.0))
(define XmidM3 (/ (+ Xbnd2 XgateEnd) 2.0))

(define Yaxis      0.000)
(define YsiOuter   Rsi)
(define YoxOuter   (+ Rsi Tox))
(define YsiMid     (/ Rsi 2.0))

;======================================================================
; 4. Device geometry
;======================================================================

(sdegeo:create-rectangle
  (position Xtop Yaxis 0.0)
  (position XsnEnd YsiOuter 0.0)
  "Silicon"
  "R.SN"
)

(sdegeo:create-rectangle
  (position XsnEnd Yaxis 0.0)
  (position XgateEnd YsiOuter 0.0)
  "Silicon"
  "R.Channel"
)

(sdegeo:create-rectangle
  (position XgateEnd Yaxis 0.0)
  (position Xbottom YsiOuter 0.0)
  "Silicon"
  "R.BL"
)

; Same SiO2 material, split only to define three gate-contact zones
(sdegeo:create-rectangle
  (position XsnEnd YsiOuter 0.0)
  (position Xbnd1 YoxOuter 0.0)
  "SiO2"
  "R.GateOxide.M1"
)

(sdegeo:create-rectangle
  (position Xbnd1 YsiOuter 0.0)
  (position Xbnd2 YoxOuter 0.0)
  "SiO2"
  "R.GateOxide.M2"
)

(sdegeo:create-rectangle
  (position Xbnd2 YsiOuter 0.0)
  (position XgateEnd YoxOuter 0.0)
  "SiO2"
  "R.GateOxide.M3"
)

;======================================================================
; 5. Contact definitions
;======================================================================

(sdegeo:define-contact-set
  "storage"
  4.0
  (color:rgb 0.0 0.0 1.0)
  "##"
)

(sdegeo:define-contact-set
  "bitline"
  4.0
  (color:rgb 1.0 0.0 0.0)
  "##"
)

(sdegeo:define-contact-set
  "gate_m1"
  4.0
  (color:rgb 1.0 0.0 1.0)
  "##"
)

(sdegeo:define-contact-set
  "gate_m2"
  4.0
  (color:rgb 0.0 1.0 0.0)
  "##"
)

(sdegeo:define-contact-set
  "gate_m3"
  4.0
  (color:rgb 0.0 1.0 1.0)
  "##"
)

;======================================================================
; 6. Attach contacts
;======================================================================

(sdegeo:set-contact
  (find-edge-id
    (position Xtop YsiMid 0.0)
  )
  "storage"
)

(sdegeo:set-contact
  (find-edge-id
    (position Xbottom YsiMid 0.0)
  )
  "bitline"
)

(sdegeo:set-contact
  (find-edge-id
    (position XmidM1 YoxOuter 0.0)
  )
  "gate_m1"
)

(sdegeo:set-contact
  (find-edge-id
    (position XmidM2 YoxOuter 0.0)
  )
  "gate_m2"
)

(sdegeo:set-contact
  (find-edge-id
    (position XmidM3 YoxOuter 0.0)
  )
  "gate_m3"
)

;======================================================================
; 7. Doping
;======================================================================

(sdedr:define-constant-profile
  "Const.Body"
  "BoronActiveConcentration"
  Nbody
)

(sdedr:define-constant-profile-region
  "Place.Body.SN"
  "Const.Body"
  "R.SN"
)

(sdedr:define-constant-profile-region
  "Place.Body.Channel"
  "Const.Body"
  "R.Channel"
)

(sdedr:define-constant-profile-region
  "Place.Body.BL"
  "Const.Body"
  "R.BL"
)

; SN-side Gaussian As
(sdedr:define-refeval-window
  "BaseLine.SN"
  "Line"
  (position Xtop Yaxis 0.0)
  (position Xtop YsiOuter 0.0)
)

(sdedr:define-gaussian-profile
  "Gauss.SN"
  "ArsenicActiveConcentration"
  "PeakPos"       0.0
  "PeakVal"       NSD
  "ValueAtDepth"  Nbody
  "Depth"         JDepthSN
  "Gauss"
  "Factor"        GaussFactor
)

(sdedr:define-analytical-profile-placement
  "Place.Gauss.SN"
  "Gauss.SN"
  "BaseLine.SN"
  "Both"
  "NoReplace"
  "Eval"
)

; BL-side Gaussian As
(sdedr:define-refeval-window
  "BaseLine.BL"
  "Line"
  (position Xbottom Yaxis 0.0)
  (position Xbottom YsiOuter 0.0)
)

(sdedr:define-gaussian-profile
  "Gauss.BL"
  "ArsenicActiveConcentration"
  "PeakPos"       0.0
  "PeakVal"       NSD
  "ValueAtDepth"  Nbody
  "Depth"         JDepthBL
  "Gauss"
  "Factor"        GaussFactor
)

(sdedr:define-analytical-profile-placement
  "Place.Gauss.BL"
  "Gauss.BL"
  "BaseLine.BL"
  "Both"
  "NoReplace"
  "Eval"
)

;======================================================================
; 8. Mesh
;======================================================================

; Global mesh
(sdedr:define-refeval-window
  "RefWin.Global"
  "Rectangle"
  (position Xtop Yaxis 0.0)
  (position Xbottom YoxOuter 0.0)
)

(sdedr:define-refinement-size
  "RefDef.Global"
  (* 0.0050 MeshScale)
  (* 0.0010 MeshScale)
  (* 0.0005 MeshScale)
  (* 0.0001 MeshScale)
)

(sdedr:define-refinement-function
  "RefDef.Global"
  "DopingConcentration"
  "MaxTransDiff"
  1
)

(sdedr:define-refinement-function
  "RefDef.Global"
  "MaxLenInt"
  "Silicon"
  "SiO2"
  (* 0.0002 MeshScale)
  1.5
  "DoubleSide"
)

(sdedr:define-refinement-placement
  "Place.Global"
  "RefDef.Global"
  "RefWin.Global"
)

; Junction mesh
(define JunctionRange 0.004)

(sdedr:define-refinement-size
  "RefDef.Junction"
  (* 0.0010 MeshScale)
  (* 0.0005 MeshScale)
  (* 0.0002 MeshScale)
  (* 0.0001 MeshScale)
)

(sdedr:define-refeval-window
  "RefWin.SN_Junction"
  "Rectangle"
  (position (- XsnEnd JunctionRange) Yaxis 0.0)
  (position (+ XsnEnd JunctionRange) YsiOuter 0.0)
)

(sdedr:define-refinement-placement
  "Place.SN_Junction"
  "RefDef.Junction"
  "RefWin.SN_Junction"
)

(sdedr:define-refeval-window
  "RefWin.BL_Junction"
  "Rectangle"
  (position (- XgateEnd JunctionRange) Yaxis 0.0)
  (position (+ XgateEnd JunctionRange) YsiOuter 0.0)
)

(sdedr:define-refinement-placement
  "Place.BL_Junction"
  "RefDef.Junction"
  "RefWin.BL_Junction"
)

; Two moving WF-boundary refinement windows
(define MetalBndRange 0.004)

(sdedr:define-refeval-window
  "RefWin.MetalBnd1"
  "Rectangle"
  (position (- Xbnd1 MetalBndRange) Yaxis 0.0)
  (position (+ Xbnd1 MetalBndRange) YoxOuter 0.0)
)

(sdedr:define-refinement-placement
  "Place.MetalBnd1"
  "RefDef.Junction"
  "RefWin.MetalBnd1"
)

(sdedr:define-refeval-window
  "RefWin.MetalBnd2"
  "Rectangle"
  (position (- Xbnd2 MetalBndRange) Yaxis 0.0)
  (position (+ Xbnd2 MetalBndRange) YoxOuter 0.0)
)

(sdedr:define-refinement-placement
  "Place.MetalBnd2"
  "RefDef.Junction"
  "RefWin.MetalBnd2"
)

;======================================================================
; 9. Save and build mesh
;======================================================================

(sde:save-model "n@node@_geo")

(sde:build-mesh
  "snmesh"
  ""
  "n@node@_msh"
)

;======================================================================
; End
;======================================================================

```

## 2. P06-T01-O01_Parameterized_Forward_SDevice

- 코드 종류: Sentaurus SDevice
- 원본 파일: [`P06-T01-O01_Parameterized_Forward_SDevice.cmd`](./source/P06-T01-O01_Parameterized_Forward_SDevice.cmd)

```tcl
*----------------------------------------------------------------------
*
* P06: L-H-L VCAT Common Forward Id-Vg Base Deck
*
* Source: P05-T03-O05 Final Forward SDevice
* Executable body below is inherited from the P5 98-run verified deck.
*
* P6 default/provisional geometry is supplied by the SDE/SWB:
*   Xbnd1_nm = 35
*   Xbnd2_nm = 67
*
* Fixed WF:
*   gate_m1 / gate_m2 / gate_m3 = 4.33 / 4.70 / 4.33 eV
*
* P6 role:
*   1) Reproduce the P5 Nominal at 35/67.
*   2) Freeze the common P7/P8 forward solver only after reproducibility PASS.
*   3) Do not introduce an unvalidated fast-forward deck as official baseline.
*
*----------------------------------------------------------------------
File {

  Grid    = "@tdr@"
  Plot    = "@tdrdat@"
  Current = "@plot@"
  Output  = "@log@"

}

Electrode {

  {
    Name         = "bitline"
    Voltage      = 0.0
  }

  {
    Name         = "storage"
    Voltage      = 0.0
  }

  {
    Name         = "gate_m1"
    Voltage      = 0.0
    WorkFunction = @WF_LOW@
  }

  {
    Name         = "gate_m2"
    Voltage      = 0.0
    WorkFunction = @WF_HIGH@
  }

  {
    Name         = "gate_m3"
    Voltage      = 0.0
    WorkFunction = @WF_LOW@
  }

}

Physics {

  Temperature = @Temp@

  Fermi

  EffectiveIntrinsicDensity(
    OldSlotboom
  )

  Mobility(
    PhuMob
    HighFieldSaturation
  )

  Recombination(

    SRH

    Band2Band(
      Model = NonlocalPath
    )

  )

}

* Keep the P03 output set for comparability.
* If disk I/O becomes a problem, this Plot block can be reduced later.
Plot {

  eDensity
  hDensity

  TotalCurrent/Vector
  eCurrent/Vector
  hCurrent/Vector

  Potential
  ElectricField/Vector
  SpaceCharge

  DopingConcentration
  DonorConcentration
  AcceptorConcentration

  eMobility
  hMobility
  eVelocity
  hVelocity

  ConductionBand
  ValenceBand
  eQuasiFermi
  hQuasiFermi

  srhRecombination

  eBand2BandGeneration
  hBand2BandGeneration
  Band2BandGeneration

}

Math {

  CoordinateSystem {
    AsIs
  }

  Cylindrical(
    yAxis = 0.0
  )

  ExcludeTouchingContactParts

  Derivatives
  RelErrControl

  Digits = 5

  ErrRef(Electron) = 1.0e8
  ErrRef(Hole)     = 1.0e8

  Iterations = 100
  NotDamped  = 30

  Method = ILS
  ExtendedPrecision

}

Solve {

*----------------------------------------------------------------------
* 1. Initial Poisson
*----------------------------------------------------------------------

  Coupled(
    Iterations = 100
  ){
    Poisson
  }

*----------------------------------------------------------------------
* 2. Initial carrier solution
*----------------------------------------------------------------------

  Coupled(
    Iterations        = 150
    LineSearchDamping = 1.0e-2
  ){
    Poisson
    Electron
    Hole
  }

*----------------------------------------------------------------------
* 3. Forward drain ramp
*----------------------------------------------------------------------

  NewCurrentPrefix = "ForwardDrainRamp_"

  Quasistationary(

    InitialStep = 1.0e-4
    Increment   = 1.12
    Decrement   = 4.0

    MaxStep = 0.002
    MinStep = 1.0e-12

    Goal {
      Name    = "storage"
      Voltage = @VdBias@
    }

  ){

    Coupled(
      Iterations        = 150
      LineSearchDamping = 1.0e-3
    ){
      Poisson
      Electron
      Hole
    }

  }

*----------------------------------------------------------------------
* 4. Forward Id-Vg sweep
*----------------------------------------------------------------------

  NewCurrentPrefix = "ForwardIdVg_"

  Quasistationary(

    InitialStep = 1.0e-5
    Increment   = 1.12
    Decrement   = 4.0

    MaxStep = 0.002
    MinStep = 1.0e-12

    Goal {
      Name    = "gate_m1"
      Voltage = @VgStop@
    }

    Goal {
      Name    = "gate_m2"
      Voltage = @VgStop@
    }

    Goal {
      Name    = "gate_m3"
      Voltage = @VgStop@
    }

  ){

    Coupled(
      Iterations        = 150
      LineSearchDamping = 1.0e-3
    ){
      Poisson
      Electron
      Hole
    }

  }

}

*----------------------------------------------------------------------
* End
*----------------------------------------------------------------------

```

## 실행 조건 및 설명

P5 2D selected Nominal (B1/B2=35/67 nm) 기준의 tolerance용 parameterized SDE·Forward SDevice 코드. Xbnd1_nm/Xbnd2_nm을 독립 geometry 변수로 유지하고 WF_LOW/WF_HIGH=4.33/4.70 eV는 고정한다. P5 검증 deck의 executable body를 유지하며 P6/P7/P8에서 ratio를 별도 독립변수로 중복 sweep하지 않는다.

Parameter	Nominal_or_Value	Unit	P6_Role	Basis
Dpillar_nm	12	nm	fixed	P5 common
Tox_nm	1	nm	fixed	P5 common
Lg_nm	60	nm	fixed	P5 common
Lsn_nm	20	nm	fixed	P5 common
Lbl_nm	20	nm	fixed	P5 common
Nbody	1.00E+17	cm^-3	fixed	P5 common
NSD	1.00E+20	cm^-3	fixed	P5 common
JDepthSN_nm	20	nm	fixed	P5 common
JDepthBL_nm	20	nm	fixed	P5 common
GaussFactor	0.8	-	fixed	P5 common
MeshScale	1	-	fixed	P5 common
Xbnd1_nm	35	nm	tolerance variable	P5 selected nominal
Xbnd2_nm	67	nm	tolerance variable	P5 selected nominal
WF_LOW	4.33	eV	fixed	P3/P5 fixed; no P6 sweep
WF_HIGH	4.7	eV	fixed	P3/P5 fixed; no P6 sweep
Temp	300	K	fixed	P5 common
VgStop	1	V	fixed	Forward
VdBias	0.05, 1.0	V	fixed enumeration	Forward

