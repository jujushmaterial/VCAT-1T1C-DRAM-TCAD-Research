*----------------------------------------------------------------------
* P02: Single-Work-Function VCAT Id-Vd
*
* Sequence:
*   1. Equilibrium
*   2. Ramp gate from 0 V to VgBias
*   3. Sweep storage terminal from 0 V to VdStop
*
* SWB parameters:
*   WF, Temp, VgBias, VdStop
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

  NewCurrentPrefix = "GateRamp_"

  Quasistationary(
    InitialStep = 1.0e-4
    Increment   = 1.12
    Decrement   = 2.0
    MaxStep     = 0.005
    MinStep     = 1.0e-10

    Goal {
      Name    = "gate"
      Voltage = @VgBias@
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

  NewCurrentPrefix = "IdVd_"

  Quasistationary(
    InitialStep = 1.0e-5
    Increment   = 1.12
    Decrement   = 2.0
    MaxStep     = 0.005
    MinStep     = 1.0e-10

    Goal {
      Name    = "storage"
      Voltage = @VdStop@
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
