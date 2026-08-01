# Phase 2 산출물 — 양방향 비교 시 사용한 SDEVICE코드

- 과제 ID: `P02-T07`
- 산출물 ID: `P02-T07-O04`
- 제출자: 송민호 (`@minhosong-mse`)
- 제출 시각: 2026-08-01T08:19:10.587Z
- 관련 Issue: [#2](https://github.com/jujushmaterial/VCAT-1T1C-DRAM-TCAD-Research/issues/2)
- 제출 방식: code

## 1. Reverse: pp28_des.cmd

- 코드 종류: Sentaurus SDevice
- 원본 파일: [`Reverse-pp28_des.cmd`](./source/Reverse-pp28_des.cmd)

```tcl
*----------------------------------------------------------------------
* P02-T08: Single-WF VCAT GIDL and Electric-Field Analysis
*
* Bias condition:
*   storage = +1.0 V
*   bitline =  0.0 V
*   gate    =  0.0 V -> -0.4 V
*
* Sequence:
*   1. Equilibrium at all terminals = 0 V
*   2. Ramp storage from 0 V to GIDLDrain
*   3. Sweep gate from 0 V to GIDLGateStop
*
* SWB parameters:
*   GIDLDrain    = 1.0
*   GIDLGateStop = -0.4
*   GIDLWF       = 4.70
*   GIDLTemp     = 300
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
    WorkFunction = @GIDLWF@
  }
}


Physics {

  Temperature = @GIDLTemp@

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
  * 2. Initial electron-hole solution
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
  * 3. Ramp storage terminal to +1.0 V
  *--------------------------------------------------------------

  NewCurrentPrefix = "GIDLDrainRamp_"

  Quasistationary(

    InitialStep = 1.0e-4
    Increment   = 1.12
    Decrement   = 2.0

    MaxStep = 0.005
    MinStep = 1.0e-10

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


  *--------------------------------------------------------------
  * 4. Negative gate sweep for GIDL
  *
  * Fixed:
  *   storage = +1.0 V
  *   bitline =  0.0 V
  *
  * Sweep:
  *   gate = 0 V -> -0.4 V
  *--------------------------------------------------------------

  NewCurrentPrefix = "GIDL_"

  Quasistationary(

    InitialStep = 1.0e-5
    Increment   = 1.10
    Decrement   = 2.0

    MaxStep = 0.002
    MinStep = 1.0e-12

    Goal {
      Name    = "gate"
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

