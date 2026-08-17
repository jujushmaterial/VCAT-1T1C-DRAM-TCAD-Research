# Phase 3 산출물 — Dual-Metal 양방향 구조 코드

- 과제 ID: `P03-T12`
- 산출물 ID: `P03-T12-O01`
- 제출자: 송민호 (`@minhosong-mse`)
- 제출 시각: 2026-08-17T12:01:06.896Z
- 관련 Issue: [#3](https://github.com/jujushmaterial/VCAT-1T1C-DRAM-TCAD-Research/issues/3)
- 제출 방식: code

## 1. P03-T12-O01_DualMetal_SDE

- 코드 종류: Sentaurus SDE
- 원본 파일: [`P03-T12-O01_DualMetal_SDE.cmd`](./source/P03-T12-O01_DualMetal_SDE.cmd)

```tcl
;======================================================================
; P03-T01: Dual-Metal (2-zone work function) VCAT structure  v0.1
;
; Base code:
;   members/SongMinho/.../P02-T02-O01/.../sde.cmd   (Single-WF baseline)
;
; Changes vs. baseline (ONLY these four):
;   1. Gate oxide split into R.GateOxide.SN / R.GateOxide.BL at Xbnd
;   2. Two gate contacts: gate_sn / gate_bl
;      (Sentaurus assigns WorkFunction per electrode, so two work
;       functions require two separate contacts)
;   3. New SWB parameter RatioSN = SN-side fraction of the gate length
;   4. Added mesh refinement window at the metal boundary (Xbnd)
;
; Everything else (geometry, doping, junction refinement, mesh sizes)
; is identical to the P02 baseline so that comparison stays valid.
;
; Coordinate system (SDE UCS):
;   x = vertical transport direction
;       top    : Storage Node (SN)
;       bottom : Bit Line (BL)
;   y = radial direction
;       y = 0  : cylindrical symmetry axis
;
; Control case:
;   RatioSN = 0.5 with WF_SN = WF_BL must reproduce the P02 baseline
;   result. Small deviation from the added mesh window is expected.
;======================================================================

;----------------------------------------------------------------------
; 0. Initialize
;----------------------------------------------------------------------

(sde:clear)
(sdegeo:set-default-boolean "ABA")


;======================================================================
; 1. SWB parameters
;======================================================================

; Geometry [nm]  -- unchanged from P02-T01-O03
(define Dpillar_nm      @Dpillar_nm@)
(define Tox_nm          @Tox_nm@)
(define Lg_nm           @Lg_nm@)
(define Lsn_nm          @Lsn_nm@)
(define Lbl_nm          @Lbl_nm@)

; Doping [cm^-3]  -- unchanged from P02-T01-O03
(define Nbody           @Nbody@)
(define NSD             @NSD@)

; Gaussian junction settings [nm, dimensionless]  -- unchanged
(define JDepthSN_nm     @JDepthSN_nm@)
(define JDepthBL_nm     @JDepthBL_nm@)
(define GaussFactor     @GaussFactor@)

; Mesh scaling
;   2.0 = coarse, 1.0 = medium, 0.5 = fine
(define MeshScale       @MeshScale@)

; NEW: SN-side metal fraction of the gate length [0.0 - 1.0]
;   0.5 = equal split
;   Physical metal boundary sits at Xbnd = XsnEnd + Lg * RatioSN
(define RatioSN         @RatioSN@)


;----------------------------------------------------------------------
; Convert nm to um
;----------------------------------------------------------------------

(define Dpillar  (* Dpillar_nm  1.0e-3))
(define Rsi      (/ Dpillar 2.0))
(define Tox      (* Tox_nm      1.0e-3))
(define Lg       (* Lg_nm       1.0e-3))
(define Lsn      (* Lsn_nm      1.0e-3))
(define Lbl      (* Lbl_nm      1.0e-3))

(define JDepthSN (* JDepthSN_nm 1.0e-3))
(define JDepthBL (* JDepthBL_nm 1.0e-3))


;======================================================================
; 2. Derived coordinates
;======================================================================

; Vertical x coordinates
(define Xtop       0.000)
(define XsnEnd     (+ Xtop Lsn))
(define XgateEnd   (+ XsnEnd Lg))
(define Xbottom    (+ XgateEnd Lbl))

; NEW: metal-to-metal boundary inside the gate
(define Xbnd       (+ XsnEnd (* Lg RatioSN)))

; Contact attach points: midpoint of each metal zone
(define XmidSN     (/ (+ XsnEnd Xbnd)     2.0))
(define XmidBL     (/ (+ Xbnd   XgateEnd) 2.0))

; Radial y coordinates
(define Yaxis      0.000)
(define YsiOuter   Rsi)
(define YoxOuter   (+ Rsi Tox))
(define YsiMid     (/ Rsi 2.0))


;======================================================================
; 3. Device geometry
;======================================================================

; Storage Node-side silicon
(sdegeo:create-rectangle
  (position Xtop Yaxis 0.0)
  (position XsnEnd YsiOuter 0.0)
  "Silicon"
  "R.SN"
)

; Floating-body channel
(sdegeo:create-rectangle
  (position XsnEnd Yaxis 0.0)
  (position XgateEnd YsiOuter 0.0)
  "Silicon"
  "R.Channel"
)

; Bit-Line-side silicon
(sdegeo:create-rectangle
  (position XgateEnd Yaxis 0.0)
  (position Xbottom YsiOuter 0.0)
  "Silicon"
  "R.BL"
)

;----------------------------------------------------------------------
; CHANGED: gate oxide split into two regions at Xbnd.
; The oxide itself is physically continuous and identical to the
; baseline; the split exists only to create two separate outer edges
; so that two independent gate contacts can be attached.
;----------------------------------------------------------------------

; Gate oxide, SN-side zone
(sdegeo:create-rectangle
  (position XsnEnd YsiOuter 0.0)
  (position Xbnd YoxOuter 0.0)
  "SiO2"
  "R.GateOxide.SN"
)

; Gate oxide, BL-side zone
(sdegeo:create-rectangle
  (position Xbnd YsiOuter 0.0)
  (position XgateEnd YoxOuter 0.0)
  "SiO2"
  "R.GateOxide.BL"
)


;======================================================================
; 4. Contact definitions
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

; CHANGED: two gate contact sets instead of one
(sdegeo:define-contact-set
  "gate_sn"
  4.0
  (color:rgb 1.0 0.0 1.0)
  "##"
)

(sdegeo:define-contact-set
  "gate_bl"
  4.0
  (color:rgb 0.0 1.0 1.0)
  "##"
)


;======================================================================
; 5. Attach contacts
;======================================================================

; Top contact: Storage Node
(sdegeo:set-contact
  (find-edge-id
    (position Xtop YsiMid 0.0)
  )
  "storage"
)

; Bottom contact: Bit Line
(sdegeo:set-contact
  (find-edge-id
    (position Xbottom YsiMid 0.0)
  )
  "bitline"
)

; CHANGED: SN-side gate contact on the outer oxide boundary
(sdegeo:set-contact
  (find-edge-id
    (position XmidSN YoxOuter 0.0)
  )
  "gate_sn"
)

; CHANGED: BL-side gate contact on the outer oxide boundary
(sdegeo:set-contact
  (find-edge-id
    (position XmidBL YoxOuter 0.0)
  )
  "gate_bl"
)


;======================================================================
; 6. Doping   -- identical to P02 baseline
;
; A uniform boron background is applied to all silicon regions.
; Gaussian arsenic profiles are then superposed from top and bottom.
;
; Metallurgical junction target:
;   As concentration = Nbody at JDepthSN / JDepthBL
;======================================================================

;----------------------------------------------------------------------
; 6-1. Uniform p-type background
;----------------------------------------------------------------------

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


;----------------------------------------------------------------------
; 6-2. Storage-Node-side Gaussian arsenic profile
;----------------------------------------------------------------------

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


;----------------------------------------------------------------------
; 6-3. Bit-Line-side Gaussian arsenic profile
;----------------------------------------------------------------------

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
; 7. Mesh
;======================================================================

;----------------------------------------------------------------------
; 7-1. Global mesh and automatic doping-gradient refinement
;      -- identical to P02 baseline
;----------------------------------------------------------------------

(sdedr:define-refeval-window
  "RefWin.Global"
  "Rectangle"
  (position Xtop Yaxis 0.0)
  (position Xbottom YoxOuter 0.0)
)

; Arguments: max-x, max-y, min-x, min-y [um]
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

; Si / SiO2 interface refinement
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


;----------------------------------------------------------------------
; 7-2. Junction windows  -- identical to P02 baseline
;----------------------------------------------------------------------

(define JunctionRange 0.004)

(sdedr:define-refinement-size
  "RefDef.Junction"
  (* 0.0010 MeshScale)
  (* 0.0005 MeshScale)
  (* 0.0002 MeshScale)
  (* 0.0001 MeshScale)
)

; SN / channel junction
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

; Channel / BL junction
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


;----------------------------------------------------------------------
; 7-3. NEW: metal-boundary window
;
; The work-function step at Xbnd creates a local potential and lateral
; field feature. Without refinement here the boundary effect is a mesh
; artifact rather than physics. Window spans silicon and oxide so the
; interface region is captured on both sides.
;
; This is an addition to the P02 baseline mesh and must be recorded as
; a deviation in TIMELINE.md.
;----------------------------------------------------------------------

(define MetalBndRange 0.004)

(sdedr:define-refeval-window
  "RefWin.MetalBnd"
  "Rectangle"
  (position (- Xbnd MetalBndRange) Yaxis 0.0)
  (position (+ Xbnd MetalBndRange) YoxOuter 0.0)
)

(sdedr:define-refinement-placement
  "Place.MetalBnd"
  "RefDef.Junction"
  "RefWin.MetalBnd"
)


;======================================================================
; 8. Save and build mesh
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

## 2. P03-T12-O01_DualMetal_Forward_SDevice

- 코드 종류: Sentaurus SDevice
- 원본 파일: [`P03-T12-O01_DualMetal_Forward_SDevice.cmd`](./source/P03-T12-O01_DualMetal_Forward_SDevice.cmd)

```tcl
*----------------------------------------------------------------------
* P03-T05 / P03-T12 reuse: Dual-Metal (2-zone WF) VCAT Forward Id-Vg v0.3
* Source: user-provided actual run code; same physics/bias as P2 baseline.
*----------------------------------------------------------------------
File {
  Grid    = "@tdr@"
  Plot    = "@tdrdat@"
  Current = "@plot@"
  Output  = "@log@"
}
Electrode {
  { Name="bitline" Voltage=0.0 }
  { Name="storage" Voltage=0.0 }
  { Name="gate_sn" Voltage=0.0 WorkFunction=@WF_SN@ }
  { Name="gate_bl" Voltage=0.0 WorkFunction=@WF_BL@ }
}
Physics {
  Temperature=@Temp@
  Fermi
  EffectiveIntrinsicDensity(OldSlotboom)
  Mobility(PhuMob HighFieldSaturation)
  Recombination(SRH Band2Band(Model=NonlocalPath))
}
Plot {
  eDensity hDensity
  TotalCurrent/Vector eCurrent/Vector hCurrent/Vector
  Potential ElectricField/Vector SpaceCharge
  DopingConcentration DonorConcentration AcceptorConcentration
  eMobility hMobility eVelocity hVelocity
  ConductionBand ValenceBand eQuasiFermi hQuasiFermi
  srhRecombination
  eBand2BandGeneration hBand2BandGeneration Band2BandGeneration
}
Math {
  CoordinateSystem { AsIs }
  Cylindrical(yAxis=0.0)
  ExcludeTouchingContactParts
  Derivatives
  RelErrControl
  Digits=5
  ErrRef(Electron)=1.0e8
  ErrRef(Hole)=1.0e8
  Iterations=100
  NotDamped=30
  Method=ILS
  ExtendedPrecision
}
Solve {
  Coupled(Iterations=100){ Poisson }
  Coupled(Iterations=150 LineSearchDamping=1.0e-2){ Poisson Electron Hole }
  NewCurrentPrefix="ForwardDrainRamp_"
  Quasistationary(
    InitialStep=1.0e-4 Increment=1.12 Decrement=4.0 MaxStep=0.002 MinStep=1.0e-12
    Goal { Name="storage" Voltage=@VdBias@ }
  ){
    Coupled(Iterations=150 LineSearchDamping=1.0e-3){ Poisson Electron Hole }
  }
  NewCurrentPrefix="ForwardIdVg_"
  Quasistationary(
    InitialStep=1.0e-5 Increment=1.12 Decrement=4.0 MaxStep=0.002 MinStep=1.0e-12
    Goal { Name="gate_sn" Voltage=@VgStop@ }
    Goal { Name="gate_bl" Voltage=@VgStop@ }
  ){
    Coupled(Iterations=150 LineSearchDamping=1.0e-3){ Poisson Electron Hole }
  }
}

```

## 3. P03-T12-O01_DualMetal_GIDL_SDevice

- 코드 종류: Sentaurus SDevice
- 원본 파일: [`P03-T12-O01_DualMetal_GIDL_SDevice.cmd`](./source/P03-T12-O01_DualMetal_GIDL_SDevice.cmd)

```tcl
*----------------------------------------------------------------------
* P03-T12: Dual-Metal (2-zone WF) VCAT - GIDL
*
* Geometry:
*   Existing P03-T01 Dual-Metal SDE, RatioSN = 0.5
*
* Gate mapping:
*   gate_sn = WF_SN
*   gate_bl = WF_BL
*
* GIDL condition:
*   bitline = 0 V
*   storage = 0 -> GIDLDrain (= +1.0 V)
*   gate_sn / gate_bl = 0 -> GIDLGateStop (= -0.4 V)
*   Temp = 300 K
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

  {
    Name         = "gate_sn"
    Voltage      = 0.0
    WorkFunction = @WF_SN@
  }

  {
    Name         = "gate_bl"
    Voltage      = 0.0
    WorkFunction = @WF_BL@
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

  Coupled(
    Iterations = 100
  ){
    Poisson
  }

  Coupled(
    Iterations        = 150
    LineSearchDamping = 1.0e-2
  ){
    Poisson
    Electron
    Hole
  }

  NewCurrentPrefix = "GIDLDrainRamp_"

  Quasistationary(
    InitialStep = 1.0e-4
    Increment   = 1.12
    Decrement   = 4.0
    MaxStep = 0.002
    MinStep = 1.0e-12

    Goal {
      Name    = "storage"
      Voltage = @GIDLDrain@
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

  NewCurrentPrefix = "GIDLIdVg_"

  Quasistationary(
    InitialStep = 1.0e-5
    Increment   = 1.12
    Decrement   = 4.0
    MaxStep = 0.002
    MinStep = 1.0e-12

    Goal {
      Name    = "gate_sn"
      Voltage = @GIDLGateStop@
    }

    Goal {
      Name    = "gate_bl"
      Voltage = @GIDLGateStop@
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

```

## 실행 조건 및 설명

P03-T12-O01 — Dual-Metal 양방향 구조 코드

P2 기준 VCAT geometry/doping/mesh를 유지하고 gate oxide를 SN/BL 2-zone으로 분리한 Dual-Metal 구조이다.
RatioSN=0.5에서 gate 60 nm를 SN 30 nm / BL 30 nm로 동일 분할한다.
SDevice에서는 gate_sn과 gate_bl에 WF_SN/WF_BL을 독립 지정하고 두 gate는 하나의 word line처럼 동일 전압으로 sweep한다.

포함 파일:
- SDE: 2-zone geometry + metal-boundary local mesh
- Forward SDevice: Vd=0.05/1.0 V, gate 0→1.0 V
- GIDL SDevice: storage=1.0 V, gate 0→-0.4 V

'양방향'은 source/drain reverse-bias가 아니라 WF_SN/WF_BL의 공간 배치 방향(ΔWF 부호)을 뜻한다.
Physics는 Fermi, OldSlotboom, PhuMob, HighFieldSaturation, SRH, Band2Band NonlocalPath를 공통 사용한다.

