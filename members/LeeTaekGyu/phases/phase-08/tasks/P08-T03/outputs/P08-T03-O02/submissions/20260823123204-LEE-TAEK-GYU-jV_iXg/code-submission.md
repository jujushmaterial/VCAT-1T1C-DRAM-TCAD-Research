# Phase 8 산출물 — 대표조건 3D SDE·SDevice 코드

- 과제 ID: `P08-T03`
- 산출물 ID: `P08-T03-O02`
- 제출자: 이택규 (`@LEE-TAEK-GYU`)
- 제출 시각: 2026-08-23T12:32:04.687Z
- 관련 Issue: [#8](https://github.com/jujushmaterial/VCAT-1T1C-DRAM-TCAD-Research/issues/8)
- 제출 방식: code

## 1. SDevice (Forward Id-Vg)

- 코드 종류: Sentaurus SDevice
- 원본 파일: [`SDevice-Forward-Id-Vg.cmd`](./source/SDevice-Forward-Id-Vg.cmd)

```tcl
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
  EffectiveIntrinsicDensity( OldSlotboom )
  Mobility( PhuMob HighFieldSaturation )
  Recombination( SRH Band2Band( Model = NonlocalPath ) )
}

Plot {
  eDensity hDensity
  TotalCurrent/Vector eCurrent/Vector hCurrent/Vector
  Potential ElectricField/Vector SpaceCharge
  DopingConcentration DonorConcentration AcceptorConcentration
  ConductionBand ValenceBand eQuasiFermi hQuasiFermi
  srhRecombination eBand2BandGeneration hBand2BandGeneration Band2BandGeneration
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
  Coupled( Iterations = 50 ){ Poisson }
  Coupled( Iterations = 75 LineSearchDamping = 1.0e-2 ){ Poisson Electron Hole }

  NewCurrentPrefix = "FAST3D_FORWARD_DrainRamp_"
  Quasistationary(
    InitialStep = 0.01 Increment = 1.40 Decrement = 4.0
    MaxStep = 0.05 MinStep = 1.0e-6
    Goal { Name = "storage" Voltage = @VdBias@ }
  ){ Coupled( Iterations = 40 ){ Poisson Electron Hole } }

  NewCurrentPrefix = "FAST3D_ForwardIdVg_"
  Quasistationary(
    InitialStep = 0.005 Increment = 1.30 Decrement = 4.0
    MaxStep = 0.01 MinStep = 1.0e-6
    Goal { Name = "gate_m1" Voltage = @VgStop@ }
    Goal { Name = "gate_m2" Voltage = @VgStop@ }
    Goal { Name = "gate_m3" Voltage = @VgStop@ }
  ){ Coupled( Iterations = 40 ){ Poisson Electron Hole } }
}
```

