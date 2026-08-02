# Phase 2 산출물 — 사용 코드

- 과제 ID: `P02-T09`
- 산출물 ID: `P02-T09-O06`
- 제출자: 송민호 (`@minhosong-mse`)
- 제출 시각: 2026-08-02T07:06:30.152Z
- 관련 Issue: [#2](https://github.com/jujushmaterial/VCAT-1T1C-DRAM-TCAD-Research/issues/2)
- 제출 방식: code

## 1. P2 T09전용 D디바이스코드

- 코드 종류: Sentaurus SDevice
- 원본 파일: [`P2T09_SDEVICE.cmd`](./source/P2T09_SDEVICE.cmd)

```tcl
*----------------------------------------------------------------------
* P02-T09: Single-WF VCAT Id-Vg
* Balanced convergence/runtime code for all mesh conditions
*
* Mesh branches:
*   MeshScale = 2.0  (Coarse)
*   MeshScale = 1.0  (Medium)
*   MeshScale = 0.5  (Fine)
*
* Required SWB parameters:
*   WF      = 4.70
*   Temp    = 300
*   VdBias  = 0.05 or 1.00
*   VgStop  = 1.00
*
* Notes:
*   - Same geometry, doping, physical models, and bias conditions.
*   - Extrapolate is omitted to reduce overshoot near threshold.
*   - Gate sweep is split, but only the difficult threshold interval
*     uses conservative continuation settings.
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
  { Name="gate" Voltage=0.0 WorkFunction=@WF@ }
}

Physics {
  Temperature=@Temp@

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
      Model=NonlocalPath
    )
  )
}

Plot {
  eDensity hDensity

  TotalCurrent/Vector
  eCurrent/Vector
  hCurrent/Vector

  Potential
  ElectricField/Vector
  SpaceCharge

  DopingConcentration
  DonorConcentration
  AcceptorConcentration

  eMobility hMobility
  eVelocity hVelocity

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
  Cylindrical(yAxis=0.0)

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

  Coupled(
    Iterations=120
  ){
    Poisson
  }

  Coupled(
    Iterations=180
    LineSearchDamping=1.0e-2
  ){
    Poisson Electron Hole
  }

  NewCurrentPrefix="DrainRamp_"

  Quasistationary(
    InitialStep=1.0e-3
    Increment=1.20
    Decrement=2.0
    MaxStep=0.01
    MinStep=1.0e-10

    Goal {
      Name="storage"
      Voltage=@VdBias@
    }
  ){
    Coupled(
      Iterations=180
      LineSearchDamping=1.0e-3
    ){
      Poisson Electron Hole
    }
  }

  NewCurrentPrefix="IdVg_Stage1_"

  Quasistationary(
    InitialStep=1.0e-3
    Increment=1.20
    Decrement=2.0
    MaxStep=0.02
    MinStep=1.0e-10

    Goal {
      Name="gate"
      Voltage=0.35
    }
  ){
    Coupled(
      Iterations=180
      LineSearchDamping=1.0e-3
    ){
      Poisson Electron Hole
    }
  }

  NewCurrentPrefix="IdVg_Stage2_"

  Quasistationary(
    InitialStep=1.0e-4
    Increment=1.10
    Decrement=1.5
    MaxStep=0.005
    MinStep=1.0e-12

    Goal {
      Name="gate"
      Voltage=0.50
    }
  ){
    Coupled(
      Iterations=240
      LineSearchDamping=1.0e-4
    ){
      Poisson Electron Hole
    }
  }

  NewCurrentPrefix="IdVg_Stage3_"

  Quasistationary(
    InitialStep=1.0e-3
    Increment=1.20
    Decrement=2.0
    MaxStep=0.01
    MinStep=1.0e-10

    Goal {
      Name="gate"
      Voltage=@VgStop@
    }
  ){
    Coupled(
      Iterations=180
      LineSearchDamping=1.0e-3
    ){
      Poisson Electron Hole
    }
  }

}

```

## 실행 조건 및 설명

SDE는 위와 동일, 메시 검증용 S디바이스 코드 다시 설정한 코드입니다. 너무 오래걸려서 살짝 수정함

