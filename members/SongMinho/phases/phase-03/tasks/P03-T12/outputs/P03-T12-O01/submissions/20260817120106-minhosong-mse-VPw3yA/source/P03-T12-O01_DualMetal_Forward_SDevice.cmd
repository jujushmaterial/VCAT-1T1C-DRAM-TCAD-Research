*----------------------------------------------------------------------
* P03-T05 / P03-T12 reuse: Dual-Metal (2-zone WF) VCAT Forward Id-Vg v0.3
* Source: user-provided actual run code; same physics/bias as P2 baseline.
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
  { Name="gate_sn" Voltage=0.0 WorkFunction=@WF_SN@ }
  { Name="gate_bl" Voltage=0.0 WorkFunction=@WF_BL@ }
}
Physics {
  Temperature=@Temp@
  Fermi
  EffectiveIntrinsicDensity(OldSlotboom)
  Mobility(PhuMob HighFieldSaturation)
  Recombination(SRH Band2Band(Model=NonlocalPath))
}
Plot {
  eDensity hDensity
  TotalCurrent/Vector eCurrent/Vector hCurrent/Vector
  Potential ElectricField/Vector SpaceCharge
  DopingConcentration DonorConcentration AcceptorConcentration
  eMobility hMobility eVelocity hVelocity
  ConductionBand ValenceBand eQuasiFermi hQuasiFermi
  srhRecombination
  eBand2BandGeneration hBand2BandGeneration Band2BandGeneration
}
Math {
  CoordinateSystem { AsIs }
  Cylindrical(yAxis=0.0)
  ExcludeTouchingContactParts
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
  Coupled(Iterations=100){ Poisson }
  Coupled(Iterations=150 LineSearchDamping=1.0e-2){ Poisson Electron Hole }
  NewCurrentPrefix="ForwardDrainRamp_"
  Quasistationary(
    InitialStep=1.0e-4 Increment=1.12 Decrement=4.0 MaxStep=0.002 MinStep=1.0e-12
    Goal { Name="storage" Voltage=@VdBias@ }
  ){
    Coupled(Iterations=150 LineSearchDamping=1.0e-3){ Poisson Electron Hole }
  }
  NewCurrentPrefix="ForwardIdVg_"
  Quasistationary(
    InitialStep=1.0e-5 Increment=1.12 Decrement=4.0 MaxStep=0.002 MinStep=1.0e-12
    Goal { Name="gate_sn" Voltage=@VgStop@ }
    Goal { Name="gate_bl" Voltage=@VgStop@ }
  ){
    Coupled(Iterations=150 LineSearchDamping=1.0e-3){ Poisson Electron Hole }
  }
}
