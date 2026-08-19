*----------------------------------------------------------------------
*
* P05: L-H-L Three-Zone VCAT
* Forward Id-Vg Boundary Optimization
*
* WF mapping:
*   gate_m1 = LOW
*   gate_m2 = HIGH
*   gate_m3 = LOW
*
* Current project values:
*   WF_LOW  = 4.33 eV
*   WF_HIGH = 4.70 eV
*   Temp    = 300 K
*   VgStop  = 1.0 V
*
* Forward Id-Vg:
*   VdBias = 0.05 V and 1.0 V
*
* Direction:
*   storage (+VdBias) -> bitline (0 V)
*
* Recommended P5 flow:
*   1) Run all Xbnd1/Xbnd2 cases with Forward Id-Vg
*   2) Extract Ion/Ioff/Vth/SS/DIBL
*   3) Keep a small shortlist (recommended: 3)
*   4) Run GIDL only for the shortlist
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
