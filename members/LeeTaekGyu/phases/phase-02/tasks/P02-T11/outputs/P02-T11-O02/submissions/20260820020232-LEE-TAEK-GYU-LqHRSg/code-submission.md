# Phase 2 산출물 — 3D SDE·SDevice와 Mesh 코드

- 과제 ID: `P02-T11`
- 산출물 ID: `P02-T11-O02`
- 제출자: 이택규 (`@LEE-TAEK-GYU`)
- 제출 시각: 2026-08-20T02:02:32.988Z
- 관련 Issue: [#2](https://github.com/jujushmaterial/VCAT-1T1C-DRAM-TCAD-Research/issues/2)
- 제출 방식: code

## 1. 3D SDE

- 코드 종류: Sentaurus SDevice
- 원본 파일: [`3D-SDE.cmd`](./source/3D-SDE.cmd)

```tcl
;======================================================================
; P02-T11-O02. Single-Metal VCAT 3D 구조 (SDE 버전, DRAFT v03 — 미검증, 실행 전)
;
; Phase / Issue : Phase 2 / #2 (P02-T11)
; Tool          : Sentaurus Structure Editor (SDE, Scheme 문법) T-2022.03
; 기준 코드     : members/SongMinho/phases/phase-02/tasks/ 아래 실제 2D SDE
;                 구조 코드 (P02 Single-Work-Function VCAT baseline, GPT로 조회,
;                 header/SWB 파라미터/도핑 값이 기존에 확인한 정보와 전부 일치함)
; Author        : Claude (AI 초안) / 이택규 검토 예정
; Date          : 2026-08-17
;
; [ERROR history]
; v01 -> v02: SWB 전처리 단계에서 에러 발생 (project P2_test_Copy):
;   ERROR: @GaussFactor@: undefined variable 'GaussFactor' at node n1
;   WARNING: Undefined value for reference GaussFactor
;   [CAUSE] 이 프로젝트 SWB 파라미터 테이블에 GaussFactor 컬럼이 없음.
;   [FIX] GaussFactor를 SWB 파라미터(@GaussFactor@)로 두지 않고 확정값
;   0.8로 코드에 직접 고정함. (실제로는 SWB에 GaussFactor 파라미터를
;   추가하는 방식으로 우회함 — 파일은 @GaussFactor@ 유지된 채 실행 성공)
;
; v02 -> v03: 실행/생성은 성공, SVisual로 확인하니 실제 형상 오류 발견.
;   R.GateOxide를 숨기면 채널 구간 전체가 사라짐 (R.Channel이 R.GateOxide에
;   완전히 흡수됨). [CAUSE] "ABA" boolean은 겹치는 두 형상 중 나중에 만든
;   쪽이 이긴 것으로 보임 — Channel을 먼저, GateOxide를 나중에 만들어서
;   GateOxide가 전체를 차지해버림. [FIX] 생성 순서를 뒤집음: GateOxide(큰
;   반지름)를 먼저, Channel(작은 반지름)을 나중에 만들어서 Channel이
;   겹치는 안쪽을 차지하도록 함. 재확인 필요.
;
; [배경] P02-T11-O02는 원래 SPROCESS(공정 에뮬레이션)로 시도했으나,
;   (1) 우리 목적은 "실제 공정 재현"이 아니라 "2D와 같은 값의 3D 버전"이고,
;   (2) SPROCESS의 deposit/etch로 형상을 쌓다 보니 3D mesh solver가
;       "SolveLinearEquation3D: Can not solve 3D Equations"로 계속 실패했음
;   → 이택규 판단으로 SDE(형상을 직접 정의) 방식으로 전환. 2D SDE 원본이
;   있어서 도핑 Gaussian 수식을 근사 없이 그대로 재사용 가능하다는 장점도 있음.
;
; !!! 반드시 실행 전 확인 !!!
; [A] SDE 표준 문법 (신뢰도 높음 — Sentaurus SDE의 잘 알려진 기본 문법):
;     - sde:clear, sdegeo:set-default-boolean, define-contact-set,
;       sdedr:define-constant-profile(-region), sde:save-model, sde:build-mesh
; [B] 실제 2D SDE 원본에서 100% 그대로 가져온 부분 (신뢰도 높음):
;     - 모든 SWB 파라미터 이름/단위 변환(nm->um)
;     - 좌표 유도 공식 (Xtop/XsnEnd/XgateEnd/Xbottom/XgateMid)
;     - Boron 배경 도핑 (Const.Body, Nbody, 3개 리전 전부)
;     - Arsenic Gaussian 도핑 수식 자체 (PeakPos/PeakVal/ValueAtDepth/Depth/
;       Factor=GaussFactor) — 근사 아니고 2D와 동일한 공식
;     - Contact 이름(storage/bitline/gate), region 이름(R.SN/R.Channel/R.BL/
;       R.GateOxide) 명명 규칙
; [C] 이번에 2D->3D로 새로 바꾼 부분 (신뢰도 낮음, 이 저장소에 검증된 3D SDE
;     예제가 없어서 Sentaurus 일반 표준 문법 기준으로 작성함 — 실행 후 SVisual
;     로 반드시 확인 필요):
;     - sdegeo:create-rectangle(2D) -> sdegeo:create-cylinder(3D) 로 교체.
;     - find-edge-id(2D, 선) -> find-face-id(3D, 면)로 교체 (contact 지정)
;     - 도핑 기준 window를 "Line"(2D) -> "Rectangle"(3D, y-z 평면, x 고정)로
;       교체. 실제 원형 단면보다 넉넉하게 잡았지만, 도핑은 실제 Silicon이
;       있는 곳에만 적용되므로 문제없을 것으로 예상 — 확정은 아님.
;     - Mesh 문법을 "Rectangle"(2D) -> "Cuboid"(3D)로, refinement-size를
;       4개 인자(max-x/y, min-x/y) -> 6개 인자(max-x/y/z, min-x/y/z)로 확장.
;     - v01에서는 구조/도핑 검증을 먼저 하기 위해 2D 원본에 있던 접합부
;       (junction) 국소 mesh refinement는 아직 빼고 Global refinement만
;       넣음. 구조가 정상 확인되면 v02에서 추가 예정.
;
; 서버에서 돌리기 전에, 이 파일이 실제로 원하는 구조를 만드는지 SVisual로
; 반드시 확인.
;======================================================================

;----------------------------------------------------------------------
; 0. Initialize
;----------------------------------------------------------------------
(sde:clear)
(sdegeo:set-default-boolean "ABA")

;----------------------------------------------------------------------
; 1. SWB parameters (2D 원본과 완전히 동일)
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
; GaussFactor는 SWB 파라미터로 추가하셨으니 그대로 둡니다
(define GaussFactor     @GaussFactor@)
; Mesh scaling
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
(define Rox      (+ Rsi Tox))

;----------------------------------------------------------------------
; 2. Derived coordinates (x=축방향, 2D 원본과 동일한 정의)
;----------------------------------------------------------------------
(define Xtop       0.000)
(define XsnEnd     (+ Xtop Lsn))
(define XgateEnd   (+ XsnEnd Lg))
(define Xbottom    (+ XgateEnd Lbl))
(define XgateMid   (+ XsnEnd (/ Lg 2.0)))

;----------------------------------------------------------------------
; 3. Device geometry — [C] 3D 원기둥으로 교체
;    (y,z=0,0을 축으로 하는 원기둥. 반지름 Rsi=Silicon, Rox=Silicon+SiO2)
;
;    [v03] SVisual로 확인한 결과, R.GateOxide를 숨기니 채널 구간 전체가
;    사라짐 -> R.Channel(Silicon)이 R.GateOxide(SiO2)에 통째로 흡수된 것을
;    확인함. "ABA" boolean은 겹치는 두 형상 중 "나중에 만든 쪽"이 겹치는
;    부분을 차지하는 방식으로 동작한 것으로 보임(실제 결과 기준 역추정).
;    기존 순서(Channel 먼저 -> GateOxide 나중)에서는 나중에 만든 큰
;    GateOxide가 전체를 차지해버렸으므로, 순서를 뒤집음: GateOxide(큰
;    반지름)를 먼저 만들고 Channel(작은 반지름)을 나중에 만들어서, 나중에
;    만든 Channel이 겹치는 안쪽을 차지하고 바깥 환형만 GateOxide로 남도록
;    함. 이것도 재확인 필요 — SVisual에서 다시 GateOxide를 껐을 때 이번엔
;    안쪽 Silicon 코어가 남아있는지 확인할 것.
;----------------------------------------------------------------------
; Storage Node-side silicon
(sdegeo:create-cylinder
  (position Xtop   0.0 0.0)
  (position XsnEnd 0.0 0.0)
  Rsi
  "Silicon"
  "R.SN"
)
; Continuous gate oxide — [v03] Channel보다 먼저 생성 (큰 반지름 Rox)
(sdegeo:create-cylinder
  (position XsnEnd   0.0 0.0)
  (position XgateEnd 0.0 0.0)
  Rox
  "SiO2"
  "R.GateOxide"
)
; Floating-body channel — [v03] GateOxide보다 나중에 생성해서, 겹치는
; 안쪽(반지름 0~Rsi)을 Silicon이 차지하도록 함
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
; 4. Contact definitions (2D 원본과 동일)
;----------------------------------------------------------------------
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

;----------------------------------------------------------------------
; 5. Attach contacts — [C] 3D에서는 edge가 아니라 face에 붙임
;----------------------------------------------------------------------
; Top contact: Storage Node (원기둥 윗면, 중심점은 그 면 위의 한 점)
(sdegeo:set-contact
  (find-face-id
    (position Xtop 0.0 0.0)
  )
  "storage"
)
; Bottom contact: Bit Line (원기둥 아랫면)
(sdegeo:set-contact
  (find-face-id
    (position Xbottom 0.0 0.0)
  )
  "bitline"
)
; Gate contact: gate oxide 바깥쪽 원통 옆면 위의 한 점 (y=Rox, z=0)
(sdegeo:set-contact
  (find-face-id
    (position XgateMid Rox 0.0)
  )
  "gate"
)

;----------------------------------------------------------------------
; 6. Doping (수식은 2D 원본과 완전히 동일, 기준 window만 3D로 확장)
;----------------------------------------------------------------------
; 6-1. Uniform p-type background — 2D 원본과 동일
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

; 6-2. Storage-Node-side Gaussian arsenic profile
;    [C] 기준 window를 2D "Line"(y=0~YsiOuter) 대신 3D "Rectangle"
;    (y,z = -Rsi~+Rsi, x=Xtop 고정 평면)로 확장. 실제 원형 단면보다
;    넉넉하게 잡았으나, 도핑은 실제 Silicon 영역에만 적용되어야 함.
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
  "Place.Gauss.SN"
  "Gauss.SN"
  "BaseLine.SN"
  "Both"
  "NoReplace"
  "Eval"
)

; 6-3. Bit-Line-side Gaussian arsenic profile — 6-2와 동일 패턴
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
  "Place.Gauss.BL"
  "Gauss.BL"
  "BaseLine.BL"
  "Both"
  "NoReplace"
  "Eval"
)

;----------------------------------------------------------------------
; 7. Mesh — [C] v01은 Global refinement만 (junction 국소 refinement는
;    구조/도핑 확인 후 v02에서 추가 예정)
;----------------------------------------------------------------------
(sdedr:define-refeval-window
  "RefWin.Global"
  "Cuboid"
  (position Xtop    (- Rox) (- Rox))
  (position Xbottom Rox     Rox)
)
; Arguments (3D): max-x, max-y, max-z, min-x, min-y, min-z [um]
(sdedr:define-refinement-size
  "RefDef.Global"
  (* 0.0050 MeshScale) (* 0.0010 MeshScale) (* 0.0010 MeshScale)
  (* 0.0005 MeshScale) (* 0.0001 MeshScale) (* 0.0001 MeshScale)
)
(sdedr:define-refinement-function
  "RefDef.Global"
  "DopingConcentration"
  "MaxTransDiff"
  1
)
; Si / SiO2 interface refinement — 2D 원본과 동일 함수, 인자는 동일
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
; 8. Save and build mesh (2D 원본과 동일)
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
```

## 2. SDevice

- 코드 종류: Sentaurus SDevice
- 원본 파일: [`SDevice.cmd`](./source/SDevice.cmd)

```tcl
*----------------------------------------------------------------------
* P02-T11-O02. Single-Metal 3D VCAT Forward — FAST QUICK-CHECK
*
* P5_3D_FORWARD_FAST_REFERENCE_des.cmd + P2_SINGLE_3D_ADAPTATION.md 지침으로
* Single-Metal 3D용 변환. 아직 A/B 검증 전 (README_3D_HANDOFF_KR.md 참고).
* gate 이름은 우리 3D SDE 구조의 실제 contact 이름("gate")과 일치시킴.
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
  { Name = "gate" Voltage = 0.0 WorkFunction = @WF@ }
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

  * Full 3D: no Cylindrical(yAxis=0).

  ExcludeTouchingContactParts

  Derivatives
  RelErrControl

  Digits = 5
  ErrRef(Electron) = 1.0e8
  ErrRef(Hole)     = 1.0e8

  Iterations = 40
  NotDamped  = 30

  Method = ILS
  ExtendedPrecision

  Extrapolate
}

Solve {

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

  NewCurrentPrefix = "FAST3D_FORWARD_DrainRamp_"

  Quasistationary(
    InitialStep = 0.01
    Increment   = 1.40
    Decrement   = 4.0
    MaxStep     = 0.05
    MinStep     = 1.0e-6

    Goal {
      Name    = "storage"
      Voltage = @VdBias@
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

  NewCurrentPrefix = "FAST3D_ForwardIdVg_"

  Quasistationary(
    InitialStep = 0.005
    Increment   = 1.30
    Decrement   = 4.0
    MaxStep     = 0.01
    MinStep     = 1.0e-6

    Goal {
      Name    = "gate"
      Voltage = @VgStop@
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

