# Phase 5 산출물 — 최종 2D SDE·SDevice 코드

- 과제 ID: `P05-T03`
- 산출물 ID: `P05-T03-O05`
- 제출자: 송민호 (`@minhosong-mse`)
- 제출 시각: 2026-08-19T06:44:17.042Z
- 관련 Issue: [#5](https://github.com/jujushmaterial/VCAT-1T1C-DRAM-TCAD-Research/issues/5)
- 제출 방식: code

## 1. P05-T03-O05_Final_2D_SDE

- 코드 종류: Sentaurus SDE
- 원본 파일: [`P05-T03-O05_Final_2D_SDE.cmd`](./source/P05-T03-O05_Final_2D_SDE.cmd)

```tcl
;======================================================================
; P05: L-H-L Three-Zone VCAT Boundary Optimization
;
; Base: P03-T02 Low / High / Low Three-Zone VCAT
; Purpose:
;   Optimize the two WF/metal boundary positions directly.
;
; SWB sweep parameters:
;   Xbnd1_nm : first LOW->HIGH boundary, absolute x coordinate [nm]
;   Xbnd2_nm : second HIGH->LOW boundary, absolute x coordinate [nm]
;
; Fixed baseline from current project:
;   Dpillar_nm  = 12
;   Tox_nm      = 1
;   Lg_nm       = 60
;   Lsn_nm      = 20
;   Lbl_nm      = 20
;   Nbody       = 1e17
;   NSD         = 1e20
;   JDepthSN_nm = 20
;   JDepthBL_nm = 20
;   GaussFactor = 0.8
;   MeshScale   = 1.0
;
; Nominal P3 G2:
;   Xbnd1_nm = 35
;   Xbnd2_nm = 65
;   -> M1/M2/M3 = 15/30/15 nm = 1:2:1
;
; P5 recommended sweep:
;   Xbnd1_nm = 33 35 37 39 41 43 45
;   Xbnd2_nm = 55 57 59 61 63 65 67
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

## 2. P05-T03-O05_Final_Forward_SDevice

- 코드 종류: Sentaurus SDevice
- 원본 파일: [`P05-T03-O05_Final_Forward_SDevice.cmd`](./source/P05-T03-O05_Final_Forward_SDevice.cmd)

```tcl
*----------------------------------------------------------------------
*
* P05: L-H-L Three-Zone VCAT
* Forward Id-Vg Boundary Optimization
*
* WF mapping:
*   gate_m1 = LOW
*   gate_m2 = HIGH
*   gate_m3 = LOW
*
* Current project values:
*   WF_LOW  = 4.33 eV
*   WF_HIGH = 4.70 eV
*   Temp    = 300 K
*   VgStop  = 1.0 V
*
* Forward Id-Vg:
*   VdBias = 0.05 V and 1.0 V
*
* Direction:
*   storage (+VdBias) -> bitline (0 V)
*
* Recommended P5 flow:
*   1) Run all Xbnd1/Xbnd2 cases with Forward Id-Vg
*   2) Extract Ion/Ioff/Vth/SS/DIBL
*   3) Keep a small shortlist (recommended: 3)
*   4) Run GIDL only for the shortlist
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

## 3. P05-T03-O05_Final_GIDL_PRODFAST_SDevice

- 코드 종류: Sentaurus SDevice
- 원본 파일: [`P05-T03-O05_Final_GIDL_PRODFAST_SDevice.cmd`](./source/P05-T03-O05_Final_GIDL_PRODFAST_SDevice.cmd)

```tcl
*----------------------------------------------------------------------
* P05 GIDL PRODUCTION-FAST CANDIDATE TEST
*
* Purpose:
*   Numerical-only acceleration test against the validated 35/65 baseline.
*   Keep geometry, mesh, contacts, work functions, temperature, biases,
*   and physical models unchanged.
*
* Reference structure:
*   Xbnd1 = 35 nm
*   Xbnd2 = 65 nm
*   Segment = 15 / 30 / 15 nm
*
* Reference GIDL:
*   |storage TotalCurrent| @ Vd=1.0 V, Vg=-0.4 V
*   = 3.59752063366802e-15 A
*
* Strategy:
*   - Keep ExtendedPrecision and Digits=5
*   - Keep all GIDL physics
*   - Use Extrapolate
*   - Relax Quasistationary stepping strongly versus baseline,
*     but more conservatively than the TURBO stress test
*   - Allow adaptive step reduction without letting MinStep fall to 1e-12
*
* IMPORTANT:
*   Validate this deck on 35/65 before using it for other nodes or 3D.
*----------------------------------------------------------------------

File {
  Grid    = "@tdr@"
  Plot    = "@tdrdat@"
  Current = "@plot@"
  Output  = "@log@"
}

Electrode {
  { Name = "bitline" Voltage = 0.0 }
  { Name = "storage" Voltage = 0.0 }

  { Name = "gate_m1" Voltage = 0.0 WorkFunction = @WF_LOW@  }
  { Name = "gate_m2" Voltage = 0.0 WorkFunction = @WF_HIGH@ }
  { Name = "gate_m3" Voltage = 0.0 WorkFunction = @WF_LOW@  }
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

* Keep the diagnostics needed for GIDL interpretation.
* This does not change the physical solution.
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
  CoordinateSystem { AsIs }
  Cylindrical( yAxis = 0.0 )
  ExcludeTouchingContactParts

  Derivatives
  RelErrControl

  * Keep the validated precision level.
  Digits = 5
  ErrRef(Electron) = 1.0e8
  ErrRef(Hole)     = 1.0e8

  * Faster continuation than the baseline while retaining
  * enough Newton headroom for difficult GIDL points.
  Iterations = 40
  NotDamped  = 30

  Method = ILS

  * Keep for the 1e-15 A GIDL regime.
  ExtendedPrecision

  * Use the previous converged points as the predictor.
  Extrapolate
}

Solve {

  *------------------------------------------------------------
  * 0) Equilibrium initialization
  *------------------------------------------------------------

  Coupled(
    Iterations = 50
  ){
    Poisson
  }

  Coupled(
    Iterations        = 75
    LineSearchDamping = 1.0e-2
  ){
    Poisson
    Electron
    Hole
  }

  *------------------------------------------------------------
  * 1) Drain ramp: storage 0 -> +1.0 V
  *------------------------------------------------------------

  NewCurrentPrefix = "PRODFAST_GIDL_DrainRamp_"

  Quasistationary(
    InitialStep = 0.01
    Increment   = 1.40
    Decrement   = 4.0
    MaxStep     = 0.05
    MinStep     = 1.0e-6

    Goal {
      Name    = "storage"
      Voltage = @GIDLDrain@
    }
  ){
    Coupled(
      Iterations = 40
    ){
      Poisson
      Electron
      Hole
    }
  }

  *------------------------------------------------------------
  * 2) GIDL gate sweep:
  *    gate_m1 / gate_m2 / gate_m3 = 0 -> -0.4 V
  *------------------------------------------------------------

  NewCurrentPrefix = "PRODFAST_GIDL_"

  Quasistationary(
    InitialStep = 0.01
    Increment   = 1.40
    Decrement   = 4.0
    MaxStep     = 0.05
    MinStep     = 1.0e-6

    Goal {
      Name    = "gate_m1"
      Voltage = @GIDLGateStop@
    }

    Goal {
      Name    = "gate_m2"
      Voltage = @GIDLGateStop@
    }

    Goal {
      Name    = "gate_m3"
      Voltage = @GIDLGateStop@
    }
  ){
    Coupled(
      Iterations = 40
    ){
      Poisson
      Electron
      Hole
    }
  }
}

```

## 실행 조건 및 설명

실제 98 Forward exact SDE/SDevice + validated PRODFAST GIDL + extraction criteria + final parameter.

SDE와 Forward SDevice는 실제 98 Forward campaign exact deck과 동일한 파일이다.
GIDL은 conservative 3점 cross-validation을 통과한 PRODFAST deck이다.
최종 Nominal은 parameter로 Xbnd1=35, Xbnd2=67을 넣어 사용한다.

Parameter	Value
Xbnd1_nm	35
Xbnd2_nm	67
WF_LOW	4.33
WF_HIGH	4.7
Temp	300
Forward_VdBias	1.0,0.05
Forward_VgStop	1
GIDLDrain	1
GIDLGateStop	-0.4

