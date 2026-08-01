# Phase 2 산출물 — 양방향 비교 시 사용한 SDEVICE코드

- 과제 ID: `P02-T07`
- 산출물 ID: `P02-T07-O04`
- 제출자: 송민호 (`@minhosong-mse`)
- 제출 시각: 2026-08-01T08:18:40.555Z
- 관련 Issue: [#2](https://github.com/jujushmaterial/VCAT-1T1C-DRAM-TCAD-Research/issues/2)
- 제출 방식: code

## 1. Forward: pp26_des.cmd

- 코드 종류: Sentaurus SDevice
- 원본 파일: [`Forward-pp26_des.cmd`](./source/Forward-pp26_des.cmd)

```tcl
*----------------------------------------------------------------------
* P02-T07: Single-WF VCAT Reverse Id-Vg
*
* Direction:
*   bitline (+1.0 V) -> storage (0 V)
*
* Sequence:
*   1. Equilibrium at all terminals = 0 V
*   2. Ramp bitline from 0 V to VdBias
*   3. Sweep gate from 0 V to VgStop
*
* SWB parameters:
*   VdBias = 1.0
*   WF     = 4.70
*   Temp   = 300
*   VgStop = 1.0
*----------------------------------------------------------------------


File {

  Grid    = "@tdr@"
  Plot    = "@tdrdat@"
  Current = "@plot@"
  Output  = "@log@"
}


Electrode {

  {
    Name    = "bitline"
    Voltage = 0.0
  }

  {
    Name    = "storage"
    Voltage = 0.0
  }

  {
    Name         = "gate"
    Voltage      = 0.0
    WorkFunction = @WF1@
  }
}


Physics {

  Temperature = @Temp1@

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

  Extrapolate
  Derivatives
  RelErrControl

  Digits = 5

  ErrRef(Electron) = 1.0e8
  ErrRef(Hole)     = 1.0e8

  Iterations = 80
  NotDamped  = 5

  Method = ILS
  ExtendedPrecision
}


Solve {

  *--------------------------------------------------------------
  * 1. Initial Poisson solution
  *--------------------------------------------------------------

  Coupled(
    Iterations = 100
  ){
    Poisson
  }


  *--------------------------------------------------------------
  * 2. Initial carrier solution
  *--------------------------------------------------------------

  Coupled(
    Iterations        = 150
    LineSearchDamping = 1.0e-2
  ){
    Poisson
    Electron
    Hole
  }


  *--------------------------------------------------------------
  * 3. Reverse terminal ramp
  *
  * Initial:
  *   storage = 0 V
  *   bitline = 0 V
  *   gate    = 0 V
  *
  * Final:
  *   bitline = VdBias
  *--------------------------------------------------------------

  NewCurrentPrefix = "ReverseDrainRamp_"

  Quasistationary(

    InitialStep = 1.0e-4
    Increment   = 1.12
    Decrement   = 2.0

    MaxStep = 0.005
    MinStep = 1.0e-10

    Goal {
      Name    = "bitline"
      Voltage = @VdBias1@
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


  *--------------------------------------------------------------
  * 4. Reverse Id-Vg sweep
  *
  * Fixed:
  *   storage = 0 V
  *   bitline = VdBias
  *
  * Sweep:
  *   gate = 0 V -> VgStop
  *--------------------------------------------------------------

  NewCurrentPrefix = "ReverseIdVg_"

  Quasistationary(

    InitialStep = 1.0e-5
    Increment   = 1.12
    Decrement   = 2.0

    MaxStep = 0.002
    MinStep = 1.0e-10

    Goal {
      Name    = "gate"
      Voltage = @VgStop1@
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

