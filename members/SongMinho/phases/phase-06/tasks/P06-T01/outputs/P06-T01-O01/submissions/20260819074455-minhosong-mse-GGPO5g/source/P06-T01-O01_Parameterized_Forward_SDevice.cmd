*----------------------------------------------------------------------
*
* P06: L-H-L VCAT Common Forward Id-Vg Base Deck
*
* Source: P05-T03-O05 Final Forward SDevice
* Executable body below is inherited from the P5 98-run verified deck.
*
* P6 default/provisional geometry is supplied by the SDE/SWB:
*   Xbnd1_nm = 35
*   Xbnd2_nm = 67
*
* Fixed WF:
*   gate_m1 / gate_m2 / gate_m3 = 4.33 / 4.70 / 4.33 eV
*
* P6 role:
*   1) Reproduce the P5 Nominal at 35/67.
*   2) Freeze the common P7/P8 forward solver only after reproducibility PASS.
*   3) Do not introduce an unvalidated fast-forward deck as official baseline.
*
*----------------------------------------------------------------------
File {

  Grid    = "@tdr@"
  Plot    = "@tdrdat@"
  Current = "@plot@"
  Output  = "@log@"

}

Electrode {

  {
    Name         = "bitline"
    Voltage      = 0.0
  }

  {
    Name         = "storage"
    Voltage      = 0.0
  }

  {
    Name         = "gate_m1"
    Voltage      = 0.0
    WorkFunction = @WF_LOW@
  }

  {
    Name         = "gate_m2"
    Voltage      = 0.0
    WorkFunction = @WF_HIGH@
  }

  {
    Name         = "gate_m3"
    Voltage      = 0.0
    WorkFunction = @WF_LOW@
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

* Keep the P03 output set for comparability.
* If disk I/O becomes a problem, this Plot block can be reduced later.
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

*----------------------------------------------------------------------
* 1. Initial Poisson
*----------------------------------------------------------------------

  Coupled(
    Iterations = 100
  ){
    Poisson
  }

*----------------------------------------------------------------------
* 2. Initial carrier solution
*----------------------------------------------------------------------

  Coupled(
    Iterations        = 150
    LineSearchDamping = 1.0e-2
  ){
    Poisson
    Electron
    Hole
  }

*----------------------------------------------------------------------
* 3. Forward drain ramp
*----------------------------------------------------------------------

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

*----------------------------------------------------------------------
* 4. Forward Id-Vg sweep
*----------------------------------------------------------------------

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

*----------------------------------------------------------------------
* End
*----------------------------------------------------------------------
