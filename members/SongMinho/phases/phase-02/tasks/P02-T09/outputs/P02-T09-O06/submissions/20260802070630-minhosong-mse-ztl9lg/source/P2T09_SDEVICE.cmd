*----------------------------------------------------------------------
* P02-T09: Single-WF VCAT Id-Vg
* Balanced convergence/runtime code for all mesh conditions
*
* Mesh branches:
*   MeshScale = 2.0  (Coarse)
*   MeshScale = 1.0  (Medium)
*   MeshScale = 0.5  (Fine)
*
* Required SWB parameters:
*   WF      = 4.70
*   Temp    = 300
*   VdBias  = 0.05 or 1.00
*   VgStop  = 1.00
*
* Notes:
*   - Same geometry, doping, physical models, and bias conditions.
*   - Extrapolate is omitted to reduce overshoot near threshold.
*   - Gate sweep is split, but only the difficult threshold interval
*     uses conservative continuation settings.
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
  Temperature=@Temp@

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
      Model=NonlocalPath
    )
  )
}

Plot {
  eDensity hDensity

  TotalCurrent/Vector
  eCurrent/Vector
  hCurrent/Vector

  Potential
  ElectricField/Vector
  SpaceCharge

  DopingConcentration
  DonorConcentration
  AcceptorConcentration

  eMobility hMobility
  eVelocity hVelocity

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
  Cylindrical(yAxis=0.0)

  Derivatives
  RelErrControl

  Digits=5

  ErrRef(Electron)=1.0e8
  ErrRef(Hole)=1.0e8

  Iterations=100
  NotDamped=30

  Method=ILS
  ExtendedPrecision
}

Solve {

  Coupled(
    Iterations=120
  ){
    Poisson
  }

  Coupled(
    Iterations=180
    LineSearchDamping=1.0e-2
  ){
    Poisson Electron Hole
  }

  NewCurrentPrefix="DrainRamp_"

  Quasistationary(
    InitialStep=1.0e-3
    Increment=1.20
    Decrement=2.0
    MaxStep=0.01
    MinStep=1.0e-10

    Goal {
      Name="storage"
      Voltage=@VdBias@
    }
  ){
    Coupled(
      Iterations=180
      LineSearchDamping=1.0e-3
    ){
      Poisson Electron Hole
    }
  }

  NewCurrentPrefix="IdVg_Stage1_"

  Quasistationary(
    InitialStep=1.0e-3
    Increment=1.20
    Decrement=2.0
    MaxStep=0.02
    MinStep=1.0e-10

    Goal {
      Name="gate"
      Voltage=0.35
    }
  ){
    Coupled(
      Iterations=180
      LineSearchDamping=1.0e-3
    ){
      Poisson Electron Hole
    }
  }

  NewCurrentPrefix="IdVg_Stage2_"

  Quasistationary(
    InitialStep=1.0e-4
    Increment=1.10
    Decrement=1.5
    MaxStep=0.005
    MinStep=1.0e-12

    Goal {
      Name="gate"
      Voltage=0.50
    }
  ){
    Coupled(
      Iterations=240
      LineSearchDamping=1.0e-4
    ){
      Poisson Electron Hole
    }
  }

  NewCurrentPrefix="IdVg_Stage3_"

  Quasistationary(
    InitialStep=1.0e-3
    Increment=1.20
    Decrement=2.0
    MaxStep=0.01
    MinStep=1.0e-10

    Goal {
      Name="gate"
      Voltage=@VgStop@
    }
  ){
    Coupled(
      Iterations=180
      LineSearchDamping=1.0e-3
    ){
      Poisson Electron Hole
    }
  }

}
