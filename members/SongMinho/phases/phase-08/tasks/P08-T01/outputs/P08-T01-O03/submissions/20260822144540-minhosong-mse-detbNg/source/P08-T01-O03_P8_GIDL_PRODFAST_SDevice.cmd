*----------------------------------------------------------------------
* P05 GIDL PRODUCTION-FAST CANDIDATE TEST
*
* Purpose:
*   Numerical-only acceleration test against the validated 35/65 baseline.
*   Keep geometry, mesh, contacts, work functions, temperature, biases,
*   and physical models unchanged.
*
* Reference structure:
*   Xbnd1 = 35 nm
*   Xbnd2 = 65 nm
*   Segment = 15 / 30 / 15 nm
*
* Reference GIDL:
*   |storage TotalCurrent| @ Vd=1.0 V, Vg=-0.4 V
*   = 3.59752063366802e-15 A
*
* Strategy:
*   - Keep ExtendedPrecision and Digits=5
*   - Keep all GIDL physics
*   - Use Extrapolate
*   - Relax Quasistationary stepping strongly versus baseline,
*     but more conservatively than the TURBO stress test
*   - Allow adaptive step reduction without letting MinStep fall to 1e-12
*
* IMPORTANT:
*   Validate this deck on 35/65 before using it for other nodes or 3D.
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

  { Name = "gate_m1" Voltage = 0.0 WorkFunction = @WF_LOW@  }
  { Name = "gate_m2" Voltage = 0.0 WorkFunction = @WF_HIGH@ }
  { Name = "gate_m3" Voltage = 0.0 WorkFunction = @WF_LOW@  }
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

* Keep the diagnostics needed for GIDL interpretation.
* This does not change the physical solution.
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
  Cylindrical( yAxis = 0.0 )
  ExcludeTouchingContactParts

  Derivatives
  RelErrControl

  * Keep the validated precision level.
  Digits = 5
  ErrRef(Electron) = 1.0e8
  ErrRef(Hole)     = 1.0e8

  * Faster continuation than the baseline while retaining
  * enough Newton headroom for difficult GIDL points.
  Iterations = 40
  NotDamped  = 30

  Method = ILS

  * Keep for the 1e-15 A GIDL regime.
  ExtendedPrecision

  * Use the previous converged points as the predictor.
  Extrapolate
}

Solve {

  *------------------------------------------------------------
  * 0) Equilibrium initialization
  *------------------------------------------------------------

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

  *------------------------------------------------------------
  * 1) Drain ramp: storage 0 -> +1.0 V
  *------------------------------------------------------------

  NewCurrentPrefix = "PRODFAST_GIDL_DrainRamp_"

  Quasistationary(
    InitialStep = 0.01
    Increment   = 1.40
    Decrement   = 4.0
    MaxStep     = 0.05
    MinStep     = 1.0e-6

    Goal {
      Name    = "storage"
      Voltage = @GIDLDrain@
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

  *------------------------------------------------------------
  * 2) GIDL gate sweep:
  *    gate_m1 / gate_m2 / gate_m3 = 0 -> -0.4 V
  *------------------------------------------------------------

  NewCurrentPrefix = "PRODFAST_GIDL_"

  Quasistationary(
    InitialStep = 0.01
    Increment   = 1.40
    Decrement   = 4.0
    MaxStep     = 0.05
    MinStep     = 1.0e-6

    Goal {
      Name    = "gate_m1"
      Voltage = @GIDLGateStop@
    }

    Goal {
      Name    = "gate_m2"
      Voltage = @GIDLGateStop@
    }

    Goal {
      Name    = "gate_m3"
      Voltage = @GIDLGateStop@
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
