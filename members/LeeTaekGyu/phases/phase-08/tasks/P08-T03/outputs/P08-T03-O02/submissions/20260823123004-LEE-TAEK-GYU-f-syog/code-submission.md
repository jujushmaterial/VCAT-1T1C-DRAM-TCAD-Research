# Phase 8 산출물 — 대표조건 3D SDE·SDevice 코드

- 과제 ID: `P08-T03`
- 산출물 ID: `P08-T03-O02`
- 제출자: 이택규 (`@LEE-TAEK-GYU`)
- 제출 시각: 2026-08-23T12:30:04.956Z
- 관련 Issue: [#8](https://github.com/jujushmaterial/VCAT-1T1C-DRAM-TCAD-Research/issues/8)
- 제출 방식: code

## 1. 3D VCAT Nominal 대표구조 (SDE)

- 코드 종류: Sentaurus SDevice
- 원본 파일: [`3D-VCAT-Nominal-SDE.cmd`](./source/3D-VCAT-Nominal-SDE.cmd)

```tcl
;======================================================================
; P05-T04. Multi-Metal(L-H-L) 3D VCAT Nominal 대표구조 (SDE)
;======================================================================
(sde:clear)
(sdegeo:set-default-boolean "ABA")

; 1. SWB parameters
(define Dpillar_nm      @Dpillar_nm@)
(define Tox_nm          @Tox_nm@)
(define Lg_nm           @Lg_nm@)
(define Lsn_nm          @Lsn_nm@)
(define Lbl_nm          @Lbl_nm@)
(define Nbody           @Nbody@)
(define NSD              @NSD@)
(define JDepthSN_nm     @JDepthSN_nm@)
(define JDepthBL_nm     @JDepthBL_nm@)
(define GaussFactor     @GaussFactor@)
(define MeshScale       @MeshScale@)
(define Xbnd1_nm        @Xbnd1_nm@)
(define Xbnd2_nm        @Xbnd2_nm@)

; Convert nm to um
(define Dpillar  (* Dpillar_nm  1.0e-3))
(define Rsi      (/ Dpillar 2.0))
(define Tox      (* Tox_nm      1.0e-3))
(define Lg       (* Lg_nm       1.0e-3))
(define Lsn      (* Lsn_nm      1.0e-3))
(define Lbl      (* Lbl_nm      1.0e-3))
(define JDepthSN (* JDepthSN_nm 1.0e-3))
(define JDepthBL (* JDepthBL_nm 1.0e-3))
(define Rox      (+ Rsi Tox))
(define Xbnd1    (* Xbnd1_nm    1.0e-3))
(define Xbnd2    (* Xbnd2_nm    1.0e-3))

; 2. Derived coordinates
(define Xtop       0.000)
(define XsnEnd     (+ Xtop Lsn))
(define XgateEnd   (+ XsnEnd Lg))
(define Xbottom    (+ XgateEnd Lbl))
(define XmidM1 (/ (+ XsnEnd Xbnd1) 2.0))
(define XmidM2 (/ (+ Xbnd1 Xbnd2) 2.0))
(define XmidM3 (/ (+ Xbnd2 XgateEnd) 2.0))

; 3. Device geometry (GateOxide 3구간 먼저, Channel 나중에)
(sdegeo:create-cylinder (position Xtop 0.0 0.0) (position XsnEnd 0.0 0.0) Rsi "Silicon" "R.SN")
(sdegeo:create-cylinder (position XsnEnd 0.0 0.0) (position Xbnd1 0.0 0.0) Rox "SiO2" "R.GateOxide.M1")
(sdegeo:create-cylinder (position Xbnd1 0.0 0.0) (position Xbnd2 0.0 0.0) Rox "SiO2" "R.GateOxide.M2")
(sdegeo:create-cylinder (position Xbnd2 0.0 0.0) (position XgateEnd 0.0 0.0) Rox "SiO2" "R.GateOxide.M3")
(sdegeo:create-cylinder (position XsnEnd 0.0 0.0) (position XgateEnd 0.0 0.0) Rsi "Silicon" "R.Channel")
(sdegeo:create-cylinder (position XgateEnd 0.0 0.0) (position Xbottom 0.0 0.0) Rsi "Silicon" "R.BL")

; 4. Contact definitions
(sdegeo:define-contact-set "storage" 4.0 (color:rgb 0.0 0.0 1.0) "##")
(sdegeo:define-contact-set "bitline" 4.0 (color:rgb 1.0 0.0 0.0) "##")
(sdegeo:define-contact-set "gate_m1" 4.0 (color:rgb 1.0 0.0 1.0) "##")
(sdegeo:define-contact-set "gate_m2" 4.0 (color:rgb 0.0 1.0 0.0) "##")
(sdegeo:define-contact-set "gate_m3" 4.0 (color:rgb 0.0 1.0 1.0) "##")

; 5. Attach contacts
(sdegeo:set-contact (find-face-id (position Xtop 0.0 0.0)) "storage")
(sdegeo:set-contact (find-face-id (position Xbottom 0.0 0.0)) "bitline")
(sdegeo:set-contact (find-face-id (position XmidM1 Rox 0.0)) "gate_m1")
(sdegeo:set-contact (find-face-id (position XmidM2 Rox 0.0)) "gate_m2")
(sdegeo:set-contact (find-face-id (position XmidM3 Rox 0.0)) "gate_m3")

; 6. Doping
(sdedr:define-constant-profile "Const.Body" "BoronActiveConcentration" Nbody)
(sdedr:define-constant-profile-region "Place.Body.SN" "Const.Body" "R.SN")
(sdedr:define-constant-profile-region "Place.Body.Channel" "Const.Body" "R.Channel")
(sdedr:define-constant-profile-region "Place.Body.BL" "Const.Body" "R.BL")

(sdedr:define-refeval-window "BaseLine.SN" "Rectangle"
  (position Xtop (- Rsi) (- Rsi)) (position Xtop Rsi Rsi))
(sdedr:define-gaussian-profile "Gauss.SN" "ArsenicActiveConcentration"
  "PeakPos" 0.0 "PeakVal" NSD "ValueAtDepth" Nbody "Depth" JDepthSN "Gauss" "Factor" GaussFactor)
(sdedr:define-analytical-profile-placement "Place.Gauss.SN" "Gauss.SN" "BaseLine.SN" "Both" "NoReplace" "Eval")

(sdedr:define-refeval-window "BaseLine.BL" "Rectangle"
  (position Xbottom (- Rsi) (- Rsi)) (position Xbottom Rsi Rsi))
(sdedr:define-gaussian-profile "Gauss.BL" "ArsenicActiveConcentration"
  "PeakPos" 0.0 "PeakVal" NSD "ValueAtDepth" Nbody "Depth" JDepthBL "Gauss" "Factor" GaussFactor)
(sdedr:define-analytical-profile-placement "Place.Gauss.BL" "Gauss.BL" "BaseLine.BL" "Both" "NoReplace" "Eval")

; 7. Mesh
(sdedr:define-refeval-window "RefWin.Global" "Cuboid"
  (position Xtop (- Rox) (- Rox)) (position Xbottom Rox Rox))
(sdedr:define-refinement-size "RefDef.Global"
  (* 0.0050 MeshScale) (* 0.0010 MeshScale) (* 0.0010 MeshScale)
  (* 0.0005 MeshScale) (* 0.0001 MeshScale) (* 0.0001 MeshScale))
(sdedr:define-refinement-function "RefDef.Global" "DopingConcentration" "MaxTransDiff" 1)
(sdedr:define-refinement-function "RefDef.Global" "MaxLenInt" "Silicon" "SiO2"
  (* 0.0002 MeshScale) 1.5 "DoubleSide")
(sdedr:define-refinement-placement "Place.Global" "RefDef.Global" "RefWin.Global")

(define JunctionRange 0.004)
(sdedr:define-refinement-size "RefDef.Junction"
  (* 0.0010 MeshScale) (* 0.0005 MeshScale) (* 0.0002 MeshScale)
  (* 0.0001 MeshScale) (* 0.0001 MeshScale) (* 0.0001 MeshScale))
(sdedr:define-refeval-window "RefWin.SN_Junction" "Cuboid"
  (position (- XsnEnd JunctionRange) (- Rox) (- Rox)) (position (+ XsnEnd JunctionRange) Rox Rox))
(sdedr:define-refinement-placement "Place.SN_Junction" "RefDef.Junction" "RefWin.SN_Junction")
(sdedr:define-refeval-window "RefWin.BL_Junction" "Cuboid"
  (position (- XgateEnd JunctionRange) (- Rox) (- Rox)) (position (+ XgateEnd JunctionRange) Rox Rox))
(sdedr:define-refinement-placement "Place.BL_Junction" "RefDef.Junction" "RefWin.BL_Junction")

(define MetalBndRange 0.004)
(sdedr:define-refeval-window "RefWin.MetalBnd1" "Cuboid"
  (position (- Xbnd1 MetalBndRange) (- Rox) (- Rox)) (position (+ Xbnd1 MetalBndRange) Rox Rox))
(sdedr:define-refinement-placement "Place.MetalBnd1" "RefDef.Junction" "RefWin.MetalBnd1")
(sdedr:define-refeval-window "RefWin.MetalBnd2" "Cuboid"
  (position (- Xbnd2 MetalBndRange) (- Rox) (- Rox)) (position (+ Xbnd2 MetalBndRange) Rox Rox))
(sdedr:define-refinement-placement "Place.MetalBnd2" "RefDef.Junction" "RefWin.MetalBnd2")

; 8. Save and build mesh
(sde:save-model "n@node@_geo")
(sde:build-mesh "snmesh" "" "n@node@_msh")
```

