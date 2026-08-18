*----------------------------------------------------------------------
* P03-T05: Three-Zone Low/High/Low VCAT - Forward Id-Vg WF Sweep v0.1
*
* Geometry input:
*   P03-T02 three-zone SDE
*
* Gate mapping:
*   gate_m1 = LOW WF (SN-side)
*   gate_m2 = HIGH WF (center)
*   gate_m3 = LOW WF (BL-side)
*
* This is NOT a Tri-Metal sweep:
*   WF_M1 = WF_M3 = WF_LOW
*   WF_M2 = WF_HIGH
*
* Suggested initial geometry:
*   M1Ratio = M2Ratio = M3Ratio = 1
*
* Suggested electrical sweep:
*   Temp    = 300 K
*   VgStop  = 1.0 V
*   VdBias  = 0.05, 1.0 V
*
* Physics / convergence settings follow the existing P03-T05
* 2-zone Forward Id-Vg setup as closely as possible.
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

  Coupled( Iterations = 100 ){
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
      Name    = "gate_m1"
      Voltage = @VgStop@
    }
    Goal {
      Name    = "gate_m2"
      Voltage = @VgStop@
    }
    Goal {
      Name    = "gate_m3"
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
