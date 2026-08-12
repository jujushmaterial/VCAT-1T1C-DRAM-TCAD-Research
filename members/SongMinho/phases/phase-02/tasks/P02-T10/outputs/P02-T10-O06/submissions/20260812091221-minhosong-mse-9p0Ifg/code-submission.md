# Phase 2 산출물 — Local Mesh 후보 코드와 Mesh 이미지_SDE코드

- 과제 ID: `P02-T10`
- 산출물 ID: `P02-T10-O06`
- 제출자: 송민호 (`@minhosong-mse`)
- 제출 시각: 2026-08-12T09:12:21.754Z
- 관련 Issue: [#2](https://github.com/jujushmaterial/VCAT-1T1C-DRAM-TCAD-Research/issues/2)
- 제출 방식: code

## 1. Local Mesh

- 코드 종류: Sentaurus SDE
- 원본 파일: [`P02-T10-O03_LocalMesh_Contour_v1.cmd`](./source/P02-T10-O03_LocalMesh_Contour_v1.cmd)

```tcl
;======================================================================
; P02-T10 Local Mesh Baseline Candidate
; Contour-like stepped refinement v1
;
; Purpose
;   Reuse the already completed P02 uniform-mesh study.
;   Keep the P02 baseline geometry and doping unchanged.
;   Use a spatially nonuniform mesh:
;
;     1) Outer / quiet region        : coarse-like
;     2) Gate electrostatic region   : medium-like
;     3) Junction support region     : medium junction mesh
;     4) Gate-edge / interface core  : fine-like
;
; The fine core is NOT a simple rectangular full-radius block.
; It is constructed from overlapping rectangles whose x width
; decreases as the mesh extends inward from the Si/SiO2 interface.
; The union approximates a curved / teardrop contour while using
; robust Rectangle RefEval windows.
;
; IMPORTANT
;   - Geometry/doping values follow the current P02 baseline.
;   - The contour window coordinates below are a conservative
;     engineering candidate for first validation.
;   - Do not describe these contour coordinates as measured P02
;     hotspot boundaries until they are replaced by the exact
;     coordinates extracted from the existing Fine/GIDL datasets.
;   - Existing Coarse/Medium/Fine uniform runs must not be rerun.
;======================================================================


;======================================================================
; 0. Initialize
;======================================================================

(sde:clear)
(sdegeo:set-default-boolean "ABA")


;======================================================================
; 1. Baseline parameters
;
; Geometry unit: um
; Doping unit : cm^-3
;======================================================================

; Geometry
(define Xtop       0.000)
(define XsnEnd     0.020)
(define XgateEnd   0.080)
(define Xbottom    0.100)

(define Yaxis      0.000)
(define YsiOuter   0.006)
(define YoxOuter   0.007)

(define YsiMid     0.003)
(define XgateMid   0.050)

; Doping
(define Nbody      1.0e17)
(define NSD        1.0e20)

; Gaussian junction working values
(define JDepthSN   0.020)
(define JDepthBL   0.020)
(define GaussFactor 0.8)


;======================================================================
; 2. Local-mesh control parameters
;======================================================================

;----------------------------------------------------------------------
; 2-1. Medium electrostatic window
;
; Full gate = 0.020 to 0.080 um.
; Add 8 nm buffer on each side.
;----------------------------------------------------------------------

(define XmiddleLeft   0.012)
(define XmiddleRight  0.088)


;----------------------------------------------------------------------
; 2-2. Junction-support window
;
; Preserve medium-quality resolution across the entire silicon radius
; around each metallurgical junction.
;----------------------------------------------------------------------

(define JunctionHalfWidth 0.004)


;----------------------------------------------------------------------
; 2-3. Fine contour geometry
;
; Each gate edge gets four overlapping fine windows.
;
; Near interface:
;   wide in x, shallow in silicon.
;
; Deeper into silicon:
;   narrow in x.
;
; This creates a stepped approximation of a curved high-field envelope.
;
; Step 1 : +/- 6.0 nm, y >= 5.4 nm
; Step 2 : +/- 4.5 nm, y >= 4.6 nm
; Step 3 : +/- 3.0 nm, y >= 3.6 nm
; Step 4 : +/- 1.5 nm, y >= 2.6 nm
;
; All steps extend through the oxide to y = 7 nm so the interface
; treatment remains continuous.
;----------------------------------------------------------------------

(define CoreDX1  0.0060)
(define CoreY1   0.0054)

(define CoreDX2  0.0045)
(define CoreY2   0.0046)

(define CoreDX3  0.0030)
(define CoreY3   0.0036)

(define CoreDX4  0.0015)
(define CoreY4   0.0026)


;======================================================================
; 3. Device geometry
;======================================================================

; Storage-node silicon
(sdegeo:create-rectangle
  (position Xtop Yaxis 0.0)
  (position XsnEnd YsiOuter 0.0)
  "Silicon"
  "R.SN"
)

; Channel silicon
(sdegeo:create-rectangle
  (position XsnEnd Yaxis 0.0)
  (position XgateEnd YsiOuter 0.0)
  "Silicon"
  "R.Channel"
)

; Bit-line silicon
(sdegeo:create-rectangle
  (position XgateEnd Yaxis 0.0)
  (position Xbottom YsiOuter 0.0)
  "Silicon"
  "R.BL"
)

; Gate oxide
(sdegeo:create-rectangle
  (position XsnEnd YsiOuter 0.0)
  (position XgateEnd YoxOuter 0.0)
  "SiO2"
  "R.GateOxide"
)


;======================================================================
; 4. Contacts
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
    (position XgateMid YoxOuter 0.0)
  )
  "gate"
)


;======================================================================
; 5. Doping
;======================================================================

;----------------------------------------------------------------------
; 5-1. Uniform boron background
;----------------------------------------------------------------------

(sdedr:define-constant-profile
  "Body"
  "BoronActiveConcentration"
  Nbody
)

(sdedr:define-constant-profile-region
  "BodySN"
  "Body"
  "R.SN"
)

(sdedr:define-constant-profile-region
  "BodyChannel"
  "Body"
  "R.Channel"
)

(sdedr:define-constant-profile-region
  "BodyBL"
  "Body"
  "R.BL"
)


;----------------------------------------------------------------------
; 5-2. Storage-side Gaussian arsenic
;----------------------------------------------------------------------

(sdedr:define-refeval-window
  "BaseSN"
  "Line"
  (position Xtop Yaxis 0.0)
  (position Xtop YsiOuter 0.0)
)

(sdedr:define-gaussian-profile
  "GaussSN"
  "ArsenicActiveConcentration"
  "PeakPos"       0.0
  "PeakVal"       NSD
  "ValueAtDepth"  Nbody
  "Depth"         JDepthSN
  "Gauss"
  "Factor"        GaussFactor
)

(sdedr:define-analytical-profile-placement
  "PlaceGaussSN"
  "GaussSN"
  "BaseSN"
  "Both"
  "NoReplace"
  "Eval"
)


;----------------------------------------------------------------------
; 5-3. Bit-line-side Gaussian arsenic
;----------------------------------------------------------------------

(sdedr:define-refeval-window
  "BaseBL"
  "Line"
  (position Xbottom Yaxis 0.0)
  (position Xbottom YsiOuter 0.0)
)

(sdedr:define-gaussian-profile
  "GaussBL"
  "ArsenicActiveConcentration"
  "PeakPos"       0.0
  "PeakVal"       NSD
  "ValueAtDepth"  Nbody
  "Depth"         JDepthBL
  "Gauss"
  "Factor"        GaussFactor
)

(sdedr:define-analytical-profile-placement
  "PlaceGaussBL"
  "GaussBL"
  "BaseBL"
  "Both"
  "NoReplace"
  "Eval"
)


;======================================================================
; 6. Mesh level A: global coarse-like background
;
; Equivalent actual sizes:
;   max x = 10 nm
;   max y = 2 nm
;   min x = 1 nm
;   min y = 0.2 nm
;
; No global doping-gradient function is used here.
; Junction gradients are handled locally in Section 8.
;======================================================================

(sdedr:define-refeval-window
  "GlobalWin"
  "Rectangle"
  (position Xtop Yaxis 0.0)
  (position Xbottom YoxOuter 0.0)
)

(sdedr:define-refinement-size
  "GlobalMesh"
  0.0100
  0.0020
  0.0010
  0.0002
)

(sdedr:define-refinement-placement
  "GlobalPlace"
  "GlobalMesh"
  "GlobalWin"
)


;======================================================================
; 7. Mesh level B: gate / electrostatic medium region
;
; Equivalent actual sizes:
;   max x = 5 nm
;   max y = 1 nm
;   min x = 0.5 nm
;   min y = 0.1 nm
;
; Keep the whole Si/SiO2 interface at Medium-like resolution.
;======================================================================

(sdedr:define-refeval-window
  "MiddleWin"
  "Rectangle"
  (position XmiddleLeft Yaxis 0.0)
  (position XmiddleRight YoxOuter 0.0)
)

(sdedr:define-refinement-size
  "MiddleMesh"
  0.0050
  0.0010
  0.0005
  0.0001
)

(sdedr:define-refinement-function
  "MiddleMesh"
  "MaxLenInt"
  "Silicon"
  "SiO2"
  0.0002
  1.5
  "DoubleSide"
)

(sdedr:define-refinement-placement
  "MiddlePlace"
  "MiddleMesh"
  "MiddleWin"
)


;======================================================================
; 8. Mesh level C: junction-support medium mesh
;
; Purpose:
;   Preserve the Gaussian metallurgical junction profile through the
;   full silicon radius without forcing the entire junction block Fine.
;
; Original Medium-like junction sizes:
;   max x = 1.0 nm
;   max y = 0.5 nm
;   min x = 0.2 nm
;   min y = 0.1 nm
;======================================================================

(sdedr:define-refinement-size
  "JunctionMesh"
  0.0010
  0.0005
  0.0002
  0.0001
)

(sdedr:define-refinement-function
  "JunctionMesh"
  "DopingConcentration"
  "MaxTransDiff"
  1
)

; SN / channel junction
(sdedr:define-refeval-window
  "SNJunctionWin"
  "Rectangle"
  (position
    (- XsnEnd JunctionHalfWidth)
    Yaxis
    0.0
  )
  (position
    (+ XsnEnd JunctionHalfWidth)
    YsiOuter
    0.0
  )
)

(sdedr:define-refinement-placement
  "SNJunctionPlace"
  "JunctionMesh"
  "SNJunctionWin"
)

; Channel / BL junction
(sdedr:define-refeval-window
  "BLJunctionWin"
  "Rectangle"
  (position
    (- XgateEnd JunctionHalfWidth)
    Yaxis
    0.0
  )
  (position
    (+ XgateEnd JunctionHalfWidth)
    YsiOuter
    0.0
  )
)

(sdedr:define-refinement-placement
  "BLJunctionPlace"
  "JunctionMesh"
  "BLJunctionWin"
)


;======================================================================
; 9. Mesh level E: fine contour-like gate-edge core
;
; Fine actual sizes:
;   max x = 0.5 nm
;   max y = 0.25 nm
;   min x = 0.10 nm
;   min y = 0.05 nm
;
; Fine Si/SiO2 interface target:
;   0.10 nm, growth ratio 1.5
;
; The same contour is applied symmetrically to both gate edges.
; This avoids introducing mesh-induced top/bottom asymmetry in the
; first reusable baseline.
;======================================================================

(sdedr:define-refinement-size
  "FineCoreMesh"
  0.0005
  0.00025
  0.0001
  0.00005
)

(sdedr:define-refinement-function
  "FineCoreMesh"
  "MaxLenInt"
  "Silicon"
  "SiO2"
  0.0001
  1.5
  "DoubleSide"
)


;----------------------------------------------------------------------
; 9-1. SN-side contour step 1
;----------------------------------------------------------------------

(sdedr:define-refeval-window
  "SNFine1"
  "Rectangle"
  (position (- XsnEnd CoreDX1) CoreY1 0.0)
  (position (+ XsnEnd CoreDX1) YoxOuter 0.0)
)

(sdedr:define-refinement-placement
  "SNFinePlace1"
  "FineCoreMesh"
  "SNFine1"
)


;----------------------------------------------------------------------
; 9-2. SN-side contour step 2
;----------------------------------------------------------------------

(sdedr:define-refeval-window
  "SNFine2"
  "Rectangle"
  (position (- XsnEnd CoreDX2) CoreY2 0.0)
  (position (+ XsnEnd CoreDX2) YoxOuter 0.0)
)

(sdedr:define-refinement-placement
  "SNFinePlace2"
  "FineCoreMesh"
  "SNFine2"
)


;----------------------------------------------------------------------
; 9-3. SN-side contour step 3
;----------------------------------------------------------------------

(sdedr:define-refeval-window
  "SNFine3"
  "Rectangle"
  (position (- XsnEnd CoreDX3) CoreY3 0.0)
  (position (+ XsnEnd CoreDX3) YoxOuter 0.0)
)

(sdedr:define-refinement-placement
  "SNFinePlace3"
  "FineCoreMesh"
  "SNFine3"
)


;----------------------------------------------------------------------
; 9-4. SN-side contour step 4
;----------------------------------------------------------------------

(sdedr:define-refeval-window
  "SNFine4"
  "Rectangle"
  (position (- XsnEnd CoreDX4) CoreY4 0.0)
  (position (+ XsnEnd CoreDX4) YoxOuter 0.0)
)

(sdedr:define-refinement-placement
  "SNFinePlace4"
  "FineCoreMesh"
  "SNFine4"
)


;----------------------------------------------------------------------
; 9-5. BL-side contour step 1
;----------------------------------------------------------------------

(sdedr:define-refeval-window
  "BLFine1"
  "Rectangle"
  (position (- XgateEnd CoreDX1) CoreY1 0.0)
  (position (+ XgateEnd CoreDX1) YoxOuter 0.0)
)

(sdedr:define-refinement-placement
  "BLFinePlace1"
  "FineCoreMesh"
  "BLFine1"
)


;----------------------------------------------------------------------
; 9-6. BL-side contour step 2
;----------------------------------------------------------------------

(sdedr:define-refeval-window
  "BLFine2"
  "Rectangle"
  (position (- XgateEnd CoreDX2) CoreY2 0.0)
  (position (+ XgateEnd CoreDX2) YoxOuter 0.0)
)

(sdedr:define-refinement-placement
  "BLFinePlace2"
  "FineCoreMesh"
  "BLFine2"
)


;----------------------------------------------------------------------
; 9-7. BL-side contour step 3
;----------------------------------------------------------------------

(sdedr:define-refeval-window
  "BLFine3"
  "Rectangle"
  (position (- XgateEnd CoreDX3) CoreY3 0.0)
  (position (+ XgateEnd CoreDX3) YoxOuter 0.0)
)

(sdedr:define-refinement-placement
  "BLFinePlace3"
  "FineCoreMesh"
  "BLFine3"
)


;----------------------------------------------------------------------
; 9-8. BL-side contour step 4
;----------------------------------------------------------------------

(sdedr:define-refeval-window
  "BLFine4"
  "Rectangle"
  (position (- XgateEnd CoreDX4) CoreY4 0.0)
  (position (+ XgateEnd CoreDX4) YoxOuter 0.0)
)

(sdedr:define-refinement-placement
  "BLFinePlace4"
  "FineCoreMesh"
  "BLFine4"
)


;======================================================================
; 10. Save and build
;
; SWB-recognized names are used so the mesh TDR should be easy to open
; from the SDE node.
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

## 실행 조건 및 설명

P02-T10-O03 Local Mesh 후보 코드와 Mesh 이미지
포함 파일
`P02-T10-O03\_LocalMesh\_Contour\_v1.cmd` — 2D axisymmetric VCAT Local Mesh SDE 코드
`P02-T10-O03\_LocalMesh\_Overall.png` — 전체 mesh 구조
`P02-T10-O03\_LocalMesh\_SN\_Zoom.png` — Storage-side gate edge / junction 확대
`P02-T10-O03\_LocalMesh\_BL\_Zoom.png` — Bitline-side gate edge / junction 확대
코드 설명
전체 영역을 Uniform Fine으로 설정하지 않고 공간별 민감도에 따라 mesh를 나눈다.
A: outer/quiet region — coarse-like
B: gate electrostatic/channel region — medium-like
C: SN/BL junction support — medium junction mesh
E: gate-edge / Si-SiO2 / high-field core — fine contour
Fine contour는 SN/BL 양쪽에 대칭적으로 적용되며 4개의 overlapping rectangle을 이용해 interface에서 넓고 silicon 내부로 갈수록 좁아지는 stepped contour를 만든다.
중요 주의사항
코드의 fine contour 좌표는 P02 Fine/GIDL hotspot에서 직접 계측한 경계가 아니라, 첫 reusable baseline을 위한 보수적인 engineering candidate이다. 따라서 제출 설명에서 '측정된 hotspot contour'라고 표현하지 않는다.
Workbench의 `MeshScale` 파라미터는 이 Local CMD 내부에서 사용되지 않는다. 실제 mesh는 `GlobalMesh`, `MiddleMesh`, `JunctionMesh`, `FineCoreMesh` 정의로 결정된다.

