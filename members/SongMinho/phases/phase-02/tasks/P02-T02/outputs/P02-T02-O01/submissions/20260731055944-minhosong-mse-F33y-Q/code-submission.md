# Phase 2 산출물 — Single-Metal VCAT 전체 SDE 코드

- 과제 ID: `P02-T02`
- 산출물 ID: `P02-T02-O01`
- 제출자: 송민호 (`@minhosong-mse`)
- 제출 시각: 2026-07-31T05:59:44.394Z
- 관련 Issue: [#2](https://github.com/jujushmaterial/VCAT-1T1C-DRAM-TCAD-Research/issues/2)
- 제출 방식: code

## 1. 싱글메탈sde

- 코드 종류: Sentaurus SDevice
- 원본 파일: [`sde.cmd`](./source/sde.cmd)

```tcl
;======================================================================
; P02: Single-Work-Function VCAT baseline candidate v0.1
;
; Coordinate system (SDE UCS):
;   x = vertical transport direction
;       top    : Storage Node (SN)
;       bottom : Bit Line (BL)
;   y = radial direction
;       y = 0  : cylindrical symmetry axis
;
; Paper-based fixed values:
;   pillar diameter = 12 nm
;   gate oxide      = 1 nm
;   gate length     = 60 nm
;   body doping     = 1e17 cm^-3
;   S/D peak doping = 1e20 cm^-3, Gaussian
;
; Engineering assumptions not explicitly published:
;   Lsn, Lbl, Gaussian junction depths, Gaussian factor, single WF
;======================================================================

;----------------------------------------------------------------------
; 0. Initialize
;----------------------------------------------------------------------

(sde:clear)
(sdegeo:set-default-boolean "ABA")


;======================================================================
; 1. SWB parameters
;======================================================================

; Geometry [nm]
(define Dpillar_nm      @Dpillar_nm@)
(define Tox_nm          @Tox_nm@)
(define Lg_nm           @Lg_nm@)
(define Lsn_nm          @Lsn_nm@)
(define Lbl_nm          @Lbl_nm@)

; Doping [cm^-3]
(define Nbody           @Nbody@)
(define NSD             @NSD@)

; Gaussian junction settings [nm, dimensionless]
(define JDepthSN_nm     @JDepthSN_nm@)
(define JDepthBL_nm     @JDepthBL_nm@)
(define GaussFactor     @GaussFactor@)

; Mesh scaling
;   2.0 = coarse, 1.0 = medium, 0.5 = fine
(define MeshScale       @MeshScale@)


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
(define XgateMid   (+ XsnEnd (/ Lg 2.0)))

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

; Continuous gate oxide
(sdegeo:create-rectangle
  (position XsnEnd YsiOuter 0.0)
  (position XgateEnd YoxOuter 0.0)
  "SiO2"
  "R.GateOxide"
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

(sdegeo:define-contact-set
  "gate"
  4.0
  (color:rgb 1.0 0.0 1.0)
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

; One continuous gate contact on the outer oxide boundary
(sdegeo:set-contact
  (find-edge-id
    (position XgateMid YoxOuter 0.0)
  )
  "gate"
)


;======================================================================
; 6. Doping
;
; A uniform boron background is applied to all silicon regions.
; Gaussian arsenic profiles are then superposed from the top and bottom.
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
; 7-2. Junction windows for BTBT and peak-field accuracy
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

