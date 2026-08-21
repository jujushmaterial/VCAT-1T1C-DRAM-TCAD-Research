;======================================================================
; P05-T04. Multi-Metal(L-H-L) 3D VCAT Nominal 대표구조 (SDE, DRAFT v01 — 미검증, 실행 전)
;
; Phase / Issue : Phase 5 / P05-T04 (최종 구조 3D 검증 및 Single-Multi 비교)
; Tool          : Sentaurus Structure Editor (SDE, Scheme 문법) T-2022.03
;
; 기준 코드:
;   [A] Geometry/Contact/Doping/Mesh 뼈대 = P02-T11-O02_3D-VCAT-structure_sde_v01.cmd
;       (v04, SVisual로 Geometry/Region/Contact/Doping/Mesh 5단계 전부 검증 완료)
;   [A] 3-zone(M1/M2/M3) 게이트 분할 로직 = P05_GIDL_boundary_sde.cmd (2D, 실제 파일)
;   [A] Nominal 값 = 대시보드 P05-T03-O01 "Nominal 대표구조 조건표" (송민호 제출,
;       2026-08-19, 검토 필요 상태 — 승인 전이므로 값 바뀌면 파라미터만 교체 예정)
;       Xbnd1=35nm, Xbnd2=67nm, WF_LOW=4.33eV, WF_HIGH=4.70eV, Temp=300K
;
; [C] 이번에 새로 합친 부분 (검증 필요):
;   - GateOxide를 M1/M2/M3 3개 구간으로 쪼갬. 각 구간 반지름은 전부 Rsi~Rox로
;     동일하고, X축 구간만 다름 (XsnEnd~Xbnd1 / Xbnd1~Xbnd2 / Xbnd2~XgateEnd).
;   - P02-T11 3D 코드에서 검증된 boolean 순서 원칙을 그대로 적용: GateOxide
;     (반지름 큰 것) 3개를 먼저 만들고, Channel(반지름 Rsi, 게이트 전체 길이
;     커버하는 하나의 원기둥)을 마지막에 만들어서 안쪽 코어를 Silicon이
;     차지하도록 함. 이게 P02-T11에서 실제로 SVisual로 확인된 방식이라
;     신뢰도가 높지만, 3구간으로 나눈 건 이번이 처음이라 재확인 필요.
;   - Contact도 gate 하나 대신 gate_m1/gate_m2/gate_m3 3개로 분리 (2D 코드와
;     동일한 이름 규칙).
;   - Mesh: 기존 SN/BL junction refinement에 더해서, 2D 코드에 있던
;     Xbnd1/Xbnd2 경계(metal boundary) 근처 refinement도 3D Cuboid로 추가함.
;
; !!! 실행 후 반드시 SVisual로 확인 !!!
;   - GateOxide 3구간이 다 살아있는지, Channel이 안쪽에 끊김없이 존재하는지
;   - gate_m1/m2/m3 3개 contact가 각각 올바른 X구간 옆면에 붙었는지
;======================================================================

;----------------------------------------------------------------------
; 0. Initialize
;----------------------------------------------------------------------
(sde:clear)
(sdegeo:set-default-boolean "ABA")

;----------------------------------------------------------------------
; 1. SWB parameters
;----------------------------------------------------------------------
; Geometry [nm]
(define Dpillar_nm      @Dpillar_nm@)
(define Tox_nm          @Tox_nm@)
(define Lg_nm           @Lg_nm@)
(define Lsn_nm          @Lsn_nm@)
(define Lbl_nm          @Lbl_nm@)
; Doping [cm^-3]
(define Nbody           @Nbody@)
(define NSD              @NSD@)
; Gaussian junction settings [nm, dimensionless]
(define JDepthSN_nm     @JDepthSN_nm@)
(define JDepthBL_nm     @JDepthBL_nm@)
(define GaussFactor     @GaussFactor@)
; Mesh scaling
(define MeshScale       @MeshScale@)
; Multi-Metal L-H-L boundary (Nominal 대표구조, P05-T03-O01 기준)
(define Xbnd1_nm        @Xbnd1_nm@)
(define Xbnd2_nm        @Xbnd2_nm@)

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
(define Rox      (+ Rsi Tox))
(define Xbnd1    (* Xbnd1_nm    1.0e-3))
(define Xbnd2    (* Xbnd2_nm    1.0e-3))

;----------------------------------------------------------------------
; 2. Derived coordinates
;----------------------------------------------------------------------
(define Xtop       0.000)
(define XsnEnd     (+ Xtop Lsn))
(define XgateEnd   (+ XsnEnd Lg))
(define Xbottom    (+ XgateEnd Lbl))

(define XmidM1 (/ (+ XsnEnd Xbnd1) 2.0))
(define XmidM2 (/ (+ Xbnd1 Xbnd2) 2.0))
(define XmidM3 (/ (+ Xbnd2 XgateEnd) 2.0))

;----------------------------------------------------------------------
; 3. Device geometry
;    P02-T11에서 검증된 순서: 반지름 큰 GateOxide를 먼저, 반지름 작은
;    Channel을 나중에 만들어서 "ABA" boolean이 안쪽을 Silicon으로 남기도록 함.
;----------------------------------------------------------------------
; Storage Node-side silicon
(sdegeo:create-cylinder
  (position Xtop   0.0 0.0)
  (position XsnEnd 0.0 0.0)
  Rsi
  "Silicon"
  "R.SN"
)

; Gate oxide zone M1 (Low WF, XsnEnd~Xbnd1)
(sdegeo:create-cylinder
  (position XsnEnd 0.0 0.0)
  (position Xbnd1  0.0 0.0)
  Rox
  "SiO2"
  "R.GateOxide.M1"
)

; Gate oxide zone M2 (High WF, Xbnd1~Xbnd2)
(sdegeo:create-cylinder
  (position Xbnd1 0.0 0.0)
  (position Xbnd2 0.0 0.0)
  Rox
  "SiO2"
  "R.GateOxide.M2"
)

; Gate oxide zone M3 (Low WF, Xbnd2~XgateEnd)
(sdegeo:create-cylinder
  (position Xbnd2     0.0 0.0)
  (position XgateEnd  0.0 0.0)
  Rox
  "SiO2"
  "R.GateOxide.M3"
)

; Floating-body channel — 3개 GateOxide 구간보다 나중에 생성해서, 겹치는
; 안쪽(반지름 0~Rsi)을 Silicon이 전 구간에 걸쳐 연속으로 차지하도록 함
(sdegeo:create-cylinder
  (position XsnEnd   0.0 0.0)
  (position XgateEnd 0.0 0.0)
  Rsi
  "Silicon"
  "R.Channel"
)

; Bit-Line-side silicon
(sdegeo:create-cylinder
  (position XgateEnd 0.0 0.0)
  (position Xbottom  0.0 0.0)
  Rsi
  "Silicon"
  "R.BL"
)

;----------------------------------------------------------------------
; 4. Contact definitions
;----------------------------------------------------------------------
(sdegeo:define-contact-set "storage" 4.0 (color:rgb 0.0 0.0 1.0) "##")
(sdegeo:define-contact-set "bitline" 4.0 (color:rgb 1.0 0.0 0.0) "##")
(sdegeo:define-contact-set "gate_m1" 4.0 (color:rgb 1.0 0.0 1.0) "##")
(sdegeo:define-contact-set "gate_m2" 4.0 (color:rgb 0.0 1.0 0.0) "##")
(sdegeo:define-contact-set "gate_m3" 4.0 (color:rgb 0.0 1.0 1.0) "##")

;----------------------------------------------------------------------
; 5. Attach contacts (3D face, P02-T11과 동일한 find-face-id 방식)
;----------------------------------------------------------------------
(sdegeo:set-contact
  (find-face-id (position Xtop 0.0 0.0))
  "storage"
)
(sdegeo:set-contact
  (find-face-id (position Xbottom 0.0 0.0))
  "bitline"
)
(sdegeo:set-contact
  (find-face-id (position XmidM1 Rox 0.0))
  "gate_m1"
)
(sdegeo:set-contact
  (find-face-id (position XmidM2 Rox 0.0))
  "gate_m2"
)
(sdegeo:set-contact
  (find-face-id (position XmidM3 Rox 0.0))
  "gate_m3"
)

;----------------------------------------------------------------------
; 6. Doping (P02-T11과 완전히 동일한 수식/배치)
;----------------------------------------------------------------------
; 6-1. Uniform p-type background
(sdedr:define-constant-profile
  "Const.Body"
  "BoronActiveConcentration"
  Nbody
)
(sdedr:define-constant-profile-region "Place.Body.SN" "Const.Body" "R.SN")
(sdedr:define-constant-profile-region "Place.Body.Channel" "Const.Body" "R.Channel")
(sdedr:define-constant-profile-region "Place.Body.BL" "Const.Body" "R.BL")

; 6-2. Storage-Node-side Gaussian arsenic profile
(sdedr:define-refeval-window
  "BaseLine.SN"
  "Rectangle"
  (position Xtop (- Rsi) (- Rsi))
  (position Xtop Rsi     Rsi)
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
  "Place.Gauss.SN" "Gauss.SN" "BaseLine.SN"
  "Both" "NoReplace" "Eval"
)

; 6-3. Bit-Line-side Gaussian arsenic profile
(sdedr:define-refeval-window
  "BaseLine.BL"
  "Rectangle"
  (position Xbottom (- Rsi) (- Rsi))
  (position Xbottom Rsi     Rsi)
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
  "Place.Gauss.BL" "Gauss.BL" "BaseLine.BL"
  "Both" "NoReplace" "Eval"
)

;----------------------------------------------------------------------
; 7. Mesh
;----------------------------------------------------------------------
; 7-1. Global refinement (P02-T11과 동일)
(sdedr:define-refeval-window
  "RefWin.Global"
  "Cuboid"
  (position Xtop    (- Rox) (- Rox))
  (position Xbottom Rox     Rox)
)
(sdedr:define-refinement-size
  "RefDef.Global"
  (* 0.0050 MeshScale) (* 0.0010 MeshScale) (* 0.0010 MeshScale)
  (* 0.0005 MeshScale) (* 0.0001 MeshScale) (* 0.0001 MeshScale)
)
(sdedr:define-refinement-function
  "RefDef.Global" "DopingConcentration" "MaxTransDiff" 1
)
(sdedr:define-refinement-function
  "RefDef.Global" "MaxLenInt" "Silicon" "SiO2"
  (* 0.0002 MeshScale) 1.5 "DoubleSide"
)
(sdedr:define-refinement-placement
  "Place.Global" "RefDef.Global" "RefWin.Global"
)

; 7-2. Junction refinement (SN/BL, P02-T11과 동일한 반경)
(define JunctionRange 0.004)
(sdedr:define-refinement-size
  "RefDef.Junction"
  (* 0.0010 MeshScale) (* 0.0005 MeshScale) (* 0.0002 MeshScale)
  (* 0.0001 MeshScale) (* 0.0001 MeshScale) (* 0.0001 MeshScale)
)
(sdedr:define-refeval-window
  "RefWin.SN_Junction"
  "Cuboid"
  (position (- XsnEnd JunctionRange) (- Rox) (- Rox))
  (position (+ XsnEnd JunctionRange) Rox     Rox)
)
(sdedr:define-refinement-placement
  "Place.SN_Junction" "RefDef.Junction" "RefWin.SN_Junction"
)
(sdedr:define-refeval-window
  "RefWin.BL_Junction"
  "Cuboid"
  (position (- XgateEnd JunctionRange) (- Rox) (- Rox))
  (position (+ XgateEnd JunctionRange) Rox     Rox)
)
(sdedr:define-refinement-placement
  "Place.BL_Junction" "RefDef.Junction" "RefWin.BL_Junction"
)

; 7-3. [C] 신규: Metal boundary(Xbnd1/Xbnd2) refinement — 2D 코드의
;      MetalBnd1/MetalBnd2 refeval-window(Rectangle)를 3D Cuboid로 변환
(define MetalBndRange 0.004)
(sdedr:define-refeval-window
  "RefWin.MetalBnd1"
  "Cuboid"
  (position (- Xbnd1 MetalBndRange) (- Rox) (- Rox))
  (position (+ Xbnd1 MetalBndRange) Rox     Rox)
)
(sdedr:define-refinement-placement
  "Place.MetalBnd1" "RefDef.Junction" "RefWin.MetalBnd1"
)
(sdedr:define-refeval-window
  "RefWin.MetalBnd2"
  "Cuboid"
  (position (- Xbnd2 MetalBndRange) (- Rox) (- Rox))
  (position (+ Xbnd2 MetalBndRange) Rox     Rox)
)
(sdedr:define-refinement-placement
  "Place.MetalBnd2" "RefDef.Junction" "RefWin.MetalBnd2"
)

;----------------------------------------------------------------------
; 8. Save and build mesh
;----------------------------------------------------------------------
(sde:save-model "n@node@_geo")
(sde:build-mesh
  "snmesh"
  ""
  "n@node@_msh"
)
;======================================================================
; End
;======================================================================
