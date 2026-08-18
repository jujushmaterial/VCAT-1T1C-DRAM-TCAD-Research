;======================================================================
; P03-T02: Low / High / Low Three-Zone VCAT structure  v0.1
;
; Base: P03-T01 v1 Dual-Metal (2-zone) SDE
; Purpose: build P03-T02 three-zone gate geometry before WF/ratio sweeps.
;
; Changes vs. P03-T01 v1:
;   1. One metal boundary -> Xbnd1 / Xbnd2
;   2. Two gate zones -> three zones M1 / M2 / M3
;   3. RatioSN -> M1Ratio / M2Ratio / M3Ratio
;   4. Metal-boundary mesh refinement at both boundaries
;
; SDE only creates three independent gate-contact zones.
; LOW/HIGH/LOW work functions are assigned later in SDevice.
;
; Initial validation:
;   M1Ratio = 1, M2Ratio = 1, M3Ratio = 1
;   With Lg = 60 nm -> 20 / 20 / 20 nm
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

; Three-zone relative-length parameters
(define M1Ratio         @M1Ratio@)
(define M2Ratio         @M2Ratio@)
(define M3Ratio         @M3Ratio@)

(define RatioSum        (+ M1Ratio M2Ratio M3Ratio))
(define FracM1          (/ M1Ratio RatioSum))
(define FracM2          (/ M2Ratio RatioSum))
(define FracM3          (/ M3Ratio RatioSum))

; nm -> um
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

(define Xtop       0.000)
(define XsnEnd     (+ Xtop Lsn))
(define XgateEnd   (+ XsnEnd Lg))
(define Xbottom    (+ XgateEnd Lbl))

; M1: XsnEnd -> Xbnd1
; M2: Xbnd1  -> Xbnd2
; M3: Xbnd2  -> XgateEnd
(define Xbnd1
  (+ XsnEnd (* Lg FracM1))
)

(define Xbnd2
  (+ XsnEnd (* Lg (+ FracM1 FracM2)))
)

(define XmidM1 (/ (+ XsnEnd Xbnd1) 2.0))
(define XmidM2 (/ (+ Xbnd1 Xbnd2) 2.0))
(define XmidM3 (/ (+ Xbnd2 XgateEnd) 2.0))

(define Yaxis      0.000)
(define YsiOuter   Rsi)
(define YoxOuter   (+ Rsi Tox))
(define YsiMid     (/ Rsi 2.0))

;======================================================================
; 3. Device geometry
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

; Three SiO2 zones. Same oxide material; split only for three contacts.
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
; 5. Attach contacts
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
; 6. Doping -- unchanged from P03-T01 / P02 baseline
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
; 7. Mesh
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

; Two WF-boundary refinement windows
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
