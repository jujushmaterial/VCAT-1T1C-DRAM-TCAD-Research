File {
  Grid      = "@tdr@"
  Plot      = "@tdrdat@"
  Current   = "@plot@"
  Output    = "@log@"

  # High-K v1:
  # Workbench standard parameter-file usage.
  # Register the included High-K sdevice.par in the SDevice node.
  # This parameter file defines Oxide and HfO2 tunneling masses.
  # native HfO2 is used as the high-k layer.
  Parameter = "@parameter@"
}

Electrode {
  { Name="source"    Voltage=0.0 }
  { Name="drain"     Voltage=0.0 }
  { Name="substrate" Voltage=0.0 }
  { Name="gateS"     Voltage=0.0 Workfunction=@Wf_S@ }
  { Name="gateD"     Voltage=0.0 Workfunction=@Wf_D@ }
}

Physics {
  EffectiveIntrinsicDensity( OldSlotboom )

  # v5 fix:
  # Use electrode-based nonlocal meshes so the tunneling path is explicitly
  # connected to each split gate electrode.
  eBarrierTunneling "NLM_gateS"
  hBarrierTunneling "NLM_gateS"
  eBarrierTunneling "NLM_gateD"
  hBarrierTunneling "NLM_gateD"
}

Physics( Material="Silicon" ) {
  Mobility(
    PhuMob
    HighFieldSaturation
    Enormal
  )
  Recombination(
    SRH( DopingDependence )
  )
}

Plot {
  # v6 debug output:
  # These variables are written to the TDR plot file.
  # Terminal Ig is still extracted from gateS/gateD TotalCurrent in SVisual.
  eBarrierTunneling
  hBarrierTunneling

  # Phase 1 interface-analysis additions:
  # Preserve the original tunneling outputs and add only the spatial
  # quantities required for Si/dielectric-interface analysis.
  Potential
  ConductionBandEnergy
  ValenceBandEnergy
  ElectricField/Vector
  eDensity
  hDensity
  eCurrent/Vector
  hCurrent/Vector
  DopingConcentration
  DonorConcentration
  AcceptorConcentration
}

#-----------------------------------------------------------------------
# Gate dielectric tunneling model for High-K Ig extraction
#
# SProcess structure:
#   Si / Oxide(SiO2 IL 0.5 nm) / HfO2 5.64 nm / gate
#
# Target current:
#   Ig_total = |I(gateS)| + |I(gateD)|
#
# Note:
#   The tunneling model and electrode-based NonLocal meshes are inherited
#   from the verified SiO2 Ig run. The main High-K change is in SProcess
#   and in sdevice.par, where HfO2 tunneling mass is defined in sdevice.par.
#-----------------------------------------------------------------------

Math {
  Extrapolate
  Iterations=20
  ExitOnFailure

  # v5 fix:
  # Electrode-based nonlocal tunneling meshes.
  # 1e-6 cm = 10 nm, larger than High-K physical stack ~6.14 nm.
  NonLocal "NLM_gateS" (
    Electrode="gateS"
    Length=1e-6
    Digits=4
    EnergyResolution=1e-3
  )

  NonLocal "NLM_gateD" (
    Electrode="gateD"
    Length=1e-6
    Digits=4
    EnergyResolution=1e-3
  )
}

Solve {
  Coupled( Iterations=100 ) { Poisson }
  Coupled { Poisson Electron Hole }

  #------------------------------------------------------------
  # 1) Low Vd Id-Vg / Ig-Vg sweep
  #------------------------------------------------------------
  Quasistationary(
    InitialStep=0.1
    Increment=1.5
    MinStep=1e-5
    MaxStep=1
    Goal { Name="drain" Voltage=@Vd_Low@ }
  ) {
    Coupled { Poisson Electron Hole }
  }

  NewCurrentPrefix="IdVg_Low_"
  Quasistationary(
    DoZero
    InitialStep=0.01
    Increment=1.5
    MinStep=1e-5
    MaxStep=0.05
    Goal { Name="gateS" Voltage=2.5 }
    Goal { Name="gateD" Voltage=2.5 }
  ) {
    Coupled { Poisson Electron Hole }

    # Phase 1 interface-analysis addition:
    # t = Vg/2.5 for this linear 0 V -> 2.5 V gate sweep.
    # Saved Vg points: 0, 0.5, 0.75, 1.0, 1.25, and 2.5 V.
    Plot(
      -Loadable
      FilePrefix="n@node@_Profile_LowVd"
      NoOverWrite
      Time=(0.00;0.20;0.30;0.40;0.50;1.00)
    )
  }

  #------------------------------------------------------------
  # 2) Return gate voltage to 0 V before high Vd sweep
  #------------------------------------------------------------
  Quasistationary(
    InitialStep=0.05
    Increment=1.5
    MinStep=1e-5
    MaxStep=0.1
    Goal { Name="gateS" Voltage=0.0 }
    Goal { Name="gateD" Voltage=0.0 }
  ) {
    Coupled { Poisson Electron Hole }
  }

  #------------------------------------------------------------
  # 3) High Vd Id-Vg / Ig-Vg sweep
  #------------------------------------------------------------
  Quasistationary(
    InitialStep=0.1
    Increment=1.5
    MinStep=1e-5
    MaxStep=1
    Goal { Name="drain" Voltage=@Vd_High@ }
  ) {
    Coupled { Poisson Electron Hole }
  }

  NewCurrentPrefix="IdVg_High_"
  Quasistationary(
    DoZero
    InitialStep=0.01
    Increment=1.5
    MinStep=1e-5
    MaxStep=0.05
    Goal { Name="gateS" Voltage=2.5 }
    Goal { Name="gateD" Voltage=2.5 }
  ) {
    Coupled { Poisson Electron Hole }

    # Phase 1 interface-analysis addition:
    # t = Vg/2.5 for this linear 0 V -> 2.5 V gate sweep.
    # Saved Vg points: 0, 0.5, 0.75, 1.0, 1.25, and 2.5 V.
    Plot(
      -Loadable
      FilePrefix="n@node@_Profile_HighVd"
      NoOverWrite
      Time=(0.00;0.20;0.30;0.40;0.50;1.00)
    )
  }
}

#-----------------------------------------------------------------------
# If this file fails:
#   1) Check whether SProcess accepted material=HfO2.
#   2) Check whether Workbench actually registered the included sdevice.par.
#   3) If the log says no valid BarrierTunneling mass for HfO2,
#      the parameter file was not read or the material name in the TDR differs.
#   4) If the log reports an unknown parameter block, send the final 30 log lines.
#-----------------------------------------------------------------------
