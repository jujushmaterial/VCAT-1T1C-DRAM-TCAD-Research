*----------------------------------------------------------------------
* P03-T16: Low-High-Low 3-zone VCAT - GIDL / P4 handoff
*
* gate_m1 = WF_LOW, gate_m2 = WF_HIGH, gate_m3 = WF_LOW
* storage = 0 -> +GIDLDrain, bitline = 0 V
* gate_m1/m2/m3 = 0 -> GIDLGateStop
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
  { Name = "gate_m1" Voltage = 0.0 WorkFunction = @WF_LOW@ }
  { Name = "gate_m2" Voltage = 0.0 WorkFunction = @WF_HIGH@ }
  { Name = "gate_m3" Voltage = 0.0 WorkFunction = @WF_LOW@ }
}

Physics {
  Temperature = @Temp@
  Fermi
  EffectiveIntrinsicDensity( OldSlotboom )
  Mobility( PhuMob HighFieldSaturation )
  Recombination(
    SRH
    Band2Band( Model = NonlocalPath )
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
  CoordinateSystem { AsIs }
  Cylindrical( yAxis = 0.0 )
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
  Coupled( Iterations = 100 ){ Poisson }

  Coupled(
    Iterations        = 150
    LineSearchDamping = 1.0e-2
  ){
    Poisson Electron Hole
  }

  NewCurrentPrefix = "GIDLDrainRamp_"

  Quasistationary(
    InitialStep = 1.0e-4
    Increment   = 1.12
    Decrement   = 4.0
    MaxStep = 0.002
    MinStep = 1.0e-12
    Goal { Name = "storage" Voltage = @GIDLDrain@ }
  ){
    Coupled(
      Iterations        = 150
      LineSearchDamping = 1.0e-3
    ){
      Poisson Electron Hole
    }
  }

  NewCurrentPrefix = "GIDL_"

  Quasistationary(
    InitialStep = 1.0e-5
    Increment   = 1.10
    Decrement   = 4.0
    MaxStep = 0.002
    MinStep = 1.0e-12
    Goal { Name = "gate_m1" Voltage = @GIDLGateStop@ }
    Goal { Name = "gate_m2" Voltage = @GIDLGateStop@ }
    Goal { Name = "gate_m3" Voltage = @GIDLGateStop@ }
  ){
    Coupled(
      Iterations        = 150
      LineSearchDamping = 1.0e-3
    ){
      Poisson Electron Hole
    }
  }
}
