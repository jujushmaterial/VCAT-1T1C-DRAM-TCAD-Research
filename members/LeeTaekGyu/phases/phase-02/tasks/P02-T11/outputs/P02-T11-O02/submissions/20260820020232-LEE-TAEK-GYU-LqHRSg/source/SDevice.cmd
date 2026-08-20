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
