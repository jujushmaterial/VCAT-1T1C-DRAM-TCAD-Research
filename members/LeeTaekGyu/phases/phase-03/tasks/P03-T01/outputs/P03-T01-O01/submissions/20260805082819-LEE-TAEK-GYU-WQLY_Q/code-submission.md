# Phase 3 산출물 — Dual-Metal 양방향 구조 코드

- 과제 ID: `P03-T01`
- 산출물 ID: `P03-T01-O01`
- 제출자: 이택규 (`@LEE-TAEK-GYU`)
- 제출 시각: 2026-08-05T08:28:19.187Z
- 관련 Issue: [#3](https://github.com/jujushmaterial/VCAT-1T1C-DRAM-TCAD-Research/issues/3)
- 제출 방식: code

## 1. Dual-Metal 양방향 구조 코드 2

- 코드 종류: Sentaurus SDevice
- 원본 파일: [`semi302-p3.cmd`](./source/semi302-p3.cmd)

```tcl
*----------------------------------------------------------------------
* P03-T05: Dual-Metal (2-zone WF) VCAT  Forward Id-Vg   v0.3
*
* Base: P02-T07-O04 Forward-pp26_des.cmd (Song Min-ho)
*
* Changes vs. baseline:
*   1. gate -> gate_sn / gate_bl, each with its own WorkFunction
*   2. Gate sweep drives both gates together (two Goals, one block)
*   3. Math: ExcludeTouchingContactParts (electrodes meet at Xbnd)
*   4. Convergence settings from P02-T09 (P2T09_SDEVICE.cmd):
*        Extrapolate removed, Iterations 80->100, NotDamped 5->30,
*        MinStep 1e-10 -> 1e-12, Decrement 2 -> 4,
*        drain ramp MaxStep 0.005 -> 0.002
*      Reason: n129 aborted at storage=0.0401 V with
*      "Step-size less than MinStep", right after
*      "Extrapolating values for t = ..." produced |Rhs| ~ 1e+132.
*
* Physics, bias and extraction conditions are unchanged. All conditions
* including delta-WF = 0 must be run with this file.
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


  NewCurrentPrefix = "ForwardDrainRamp_"

  Quasistationary(

    InitialStep = 1.0e-4
    Increment   = 1.12
    Decrement   = 4.0

    MaxStep = 0.002
    MinStep = 1.0e-12

    Goal {
      Name    = "storage"
      Voltage = @VdBias@
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


  NewCurrentPrefix = "ForwardIdVg_"

  Quasistationary(

    InitialStep = 1.0e-5
    Increment   = 1.12
    Decrement   = 4.0

    MaxStep = 0.002
    MinStep = 1.0e-12

    Goal {
      Name    = "gate_sn"
      Voltage = @VgStop@
    }

    Goal {
      Name    = "gate_bl"
      Voltage = @VgStop@
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

