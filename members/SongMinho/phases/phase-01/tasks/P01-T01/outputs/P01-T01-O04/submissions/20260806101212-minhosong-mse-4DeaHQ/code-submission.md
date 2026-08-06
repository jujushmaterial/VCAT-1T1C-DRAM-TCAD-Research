# Phase 1 산출물 — 로그파일

- 과제 ID: `P01-T01`
- 산출물 ID: `P01-T01-O04`
- 제출자: 송민호 (`@minhosong-mse`)
- 제출 시각: 2026-08-06T10:12:12.185Z
- 관련 Issue: [#1](https://github.com/jujushmaterial/VCAT-1T1C-DRAM-TCAD-Research/issues/1)
- 제출 방식: code

## 1. P01-T01-O02_LH_n19_sdevice

- 코드 종류: 기타
- 원본 파일: [`P01-T01-O02_LH_n19_sdevice.txt`](./source/P01-T01-O02_LH_n19_sdevice.txt)

```text
****************************************************************************
***                           Sentaurus Device                           ***
***                          Version T-2022.03                           ***
***                      (0.7486838, x86_64, Linux)                      ***
***                                                                      ***
***                       Copyright (C) 1994-2022                        ***
***                            Synopsys, Inc.                            ***
***                                                                      ***
***  This software and the associated documentation are confidential     ***
***  and proprietary to Synopsys, Inc.  Your use or disclosure of this   ***
***  software is subject to the terms and conditions of a written        ***
***  license agreement between you, or your company, and Synopsys, Inc.  ***
****************************************************************************

	Running on machine with the following configuration:
	Host Name: ssudisu1
	Operating System: Linux rel. 3.10.0-1160.119.1.el7.x86_64 ver. #1 SMP Tue Jun 4 14:43:51 UTC 2024
	Machine Type: x86_64
	Process ID: 94304
	Number of processors: 128
	Domain Name: (none)
	Date: Tue Aug  4 22:25:48 2026  (KST)

Tue Aug  4 22:25:48 2026: checked out 1 sdevice license(s)
Parsing circuit file /user/tools/synopsys/sentaurus/T-2022.03/bin/../tcad/current/linux64/lib/sdevice/sd_SRL1.ccf
Parsing circuit file /user/tools/synopsys/sentaurus/T-2022.03/bin/../tcad/current/linux64/lib/sdevice/sd_hb_vsource2.ccf
Parsing circuit file /user/tools/synopsys/sentaurus/T-2022.03/bin/../tcad/current/linux64/lib/sdevice/sd_hb_sRL.ccf
Parsing circuit file /user/tools/synopsys/sentaurus/T-2022.03/bin/../tcad/current/linux64/lib/sdevice/sd_hb_isource.ccf
Parsing circuit file /user/tools/synopsys/sentaurus/T-2022.03/bin/../tcad/current/linux64/lib/sdevice/sd_hb_isource2.ccf
Parsing circuit file /user/tools/synopsys/sentaurus/T-2022.03/bin/../tcad/current/linux64/lib/sdevice/sd_hb_pGC.ccf
Parsing circuit file /user/tools/synopsys/sentaurus/T-2022.03/bin/../tcad/current/linux64/lib/sdevice/bs_psource.ccf
Parsing circuit file /user/tools/synopsys/sentaurus/T-2022.03/bin/../tcad/current/linux64/lib/sdevice/sd_hb_vsource.ccf
Parsing circuit file /user/tools/synopsys/sentaurus/T-2022.03/bin/../tcad/current/linux64/lib/scm/satinductor.ccf
Parsing circuit file /user/tools/synopsys/sentaurus/T-2022.03/bin/../tcad/current/linux64/lib/scm/ferroelectric.ccf
Parsing circuit file /user/tools/synopsys/sentaurus/T-2022.03/bin/../tcad/current/linux64/lib/scm/MOS_harness.ccf
Loading shared object file /user/tools/synopsys/sentaurus/T-2022.03/bin/../tcad/current/linux64/lib/scm/MOS_harness.so.linux64
Loading shared object file /user/tools/synopsys/sentaurus/T-2022.03/bin/../tcad/current/linux64/lib/scm/ferroelectric.so.linux64
Loading shared object file /user/tools/synopsys/sentaurus/T-2022.03/bin/../tcad/current/linux64/lib/scm/satinductor.so.linux64
Loading shared object file /user/tools/synopsys/sentaurus/T-2022.03/bin/../tcad/current/linux64/lib/sdevice/sd_hb_vsource.so.linux64
Loading shared object file /user/tools/synopsys/sentaurus/T-2022.03/bin/../tcad/current/linux64/lib/sdevice/bs_psource.so.linux64
Loading shared object file /user/tools/synopsys/sentaurus/T-2022.03/bin/../tcad/current/linux64/lib/sdevice/sd_hb_pGC.so.linux64
Loading shared object file /user/tools/synopsys/sentaurus/T-2022.03/bin/../tcad/current/linux64/lib/sdevice/sd_hb_isource2.so.linux64
Loading shared object file /user/tools/synopsys/sentaurus/T-2022.03/bin/../tcad/current/linux64/lib/sdevice/sd_hb_isource.so.linux64
Loading shared object file /user/tools/synopsys/sentaurus/T-2022.03/bin/../tcad/current/linux64/lib/sdevice/sd_hb_sRL.so.linux64
Loading shared object file /user/tools/synopsys/sentaurus/T-2022.03/bin/../tcad/current/linux64/lib/sdevice/sd_hb_vsource2.so.linux64
Loading shared object file /user/tools/synopsys/sentaurus/T-2022.03/bin/../tcad/current/linux64/lib/sdevice/sd_SRL1.so.linux64

Input source: pp19_des.cmd

===============================

Output file: n19_des.log


GlobalParameter {
}
no ACExtract file

PMIPath file: /user/tools/synopsys/sentaurus/T-2022.03/bin/../tcad/current/linux64/lib/sdevice-33.0.7486838 /user/tools/synopsys/sentaurus/T-2022.03/bin/../tcad/current/linux64/lib/sdevice

CMIPath file: /user/tools/synopsys/sentaurus/T-2022.03/bin/../tcad/current/linux64/lib/sdevice /user/tools/synopsys/sentaurus/T-2022.03/bin/../tcad/current/linux64/lib/scm

SPICEPath file: /user/tools/synopsys/sentaurus/T-2022.03/bin/../tcad/current/lib/sdevice-33.0.7486838/spice

no DevicePath file

no CIRCUITSAVENAME file

no CIRCUITLOADNAME file

Numerical parameters:
  Absolute error : 
    Poisson : 1.0000e-03
    eqPoisson : 1.0000e-03
    Electron : 1.0000e-05
    Hole : 1.0000e-05
    Photon-Rate-Equation : 1.0000e-07
    Photon-Phase-Equation : 1.0000e-05
    Rate-Stabilize-Equation : 1.0000e-07
    QW-Scattering-Equations : 1.0000e-05
    QW-eScattering-Equation : 1.0000e-05
    QW-hScattering-Equation : 1.0000e-05
    Optical Problem : 1.0000e-03
    Wavelength : 1.0000e-03
    Bandstructure : 1.0000e-03
    EmissionTable : 1.0000e-03
    DephasingRates : 1.0000e-03
    Photon Recycling : 1.0000e-03
    Electron-Temperature : 1.0000e-04
    Hole-Temperature : 1.0000e-04
    Lattice-Hole-Electron-Temperature : 1.0000e-03
    Circuit : 1.0000e-03
    TCircuit : 1.0000e-03
    Contact : 1.0000e-03
    TContact : 1.0000e-03
    Continuation : 1.0000e-03
    eLaplace : 1.0000e-03
    hLaplace : 1.0000e-03
    tLaplace : 1.0000e-03
    electron quasi-fermi-potential : 1.0000e-03
    hole quasi-fermi-potential : 1.0000e-03
    MonteCarlo : 1.0000e-03
    MCPoissonPDE : 1.0000e-03
    eQuantumPotential : 1.0000e-03
    hQuantumPotential : 1.0000e-03
    quasi-fermi-potential : 1.0000e-03
    ConductiveInsulator : 1.0000e-03
    ContactAndConductiveInsulator : 1.0000e-03
    SingletExciton : 1.0000e-05
    FEPolarization : 1.0000e-05
    FEPolarizationX : 1.0000e-05
    FEPolarizationY : 1.0000e-05
    FEPolarizationZ : 1.0000e-05
    FEPolDivFree : 1.0000e-03
    eHopping : 1.0000e-03
    hHopping : 1.0000e-03
    HydrogenAtom : 1.0000e-03
    HydrogenMolecule : 1.0000e-03
    HydrogenIon : 1.0000e-03
    HydrogenSpeciesA : 1.0000e-03
    HydrogenSpeciesB : 1.0000e-03
    HydrogenSpeciesC : 1.0000e-03
    HydrogenSiliconBondOccupation : 1.0000e-03
    TrapPDE : 1.0000e-03
    eSHEDistribution : 1.0000e-03
    hSHEDistribution : 1.0000e-03
    Landau-Lifshitz-Gilbert[theta] : 1.0000e-03
    Landau-Lifshitz-Gilbert[phi] : 1.0000e-03
    Landau-Lifshitz-Gilbert[x] : 1.0000e-03
    Landau-Lifshitz-Gilbert[y] : 1.0000e-03
    Landau-Lifshitz-Gilbert[z] : 1.0000e-03
    Mechanics : 1.0000e-03
    ExternalTransportSolver : 1.0000e-03
    ReactionDiffusionPDE : 1.0000e-03
  RelErrControl (Reference error): 
    Poisson : 0.025852
    eqPoisson : 1
    Electron : 1.0000e+10
    Hole : 1.0000e+10
    Photon-Rate-Equation : 1.0000e-07
    Photon-Phase-Equation : 1
    Rate-Stabilize-Equation : 1.0000e-07
    QW-Scattering-Equations : 1.0000e+10
    QW-eScattering-Equation : 1.0000e+10
    QW-hScattering-Equation : 1.0000e+10
    Optical Problem : 1
    Wavelength : 1
    Bandstructure : 1
    EmissionTable : 1
    DephasingRates : 1
    Photon Recycling : 1
    Electron-Temperature : 3.0000e+02
    Hole-Temperature : 3.0000e+02
    Lattice-Hole-Electron-Temperature : 3.0000e+02
    Circuit : 1
    TCircuit : 1
    Contact : 0.025852
    TContact : 1
    Continuation : 1
    eLaplace : 1
    hLaplace : 1
    tLaplace : 1
    electron quasi-fermi-potential : 0.025852
    hole quasi-fermi-potential : 0.025852
    MonteCarlo : 1
    MCPoissonPDE : 1
    eQuantumPotential : 0.025852
    hQuantumPotential : 0.025852
    quasi-fermi-potential : 0.025852
    ConductiveInsulator : 1
    ContactAndConductiveInsulator : 1
    SingletExciton : 1.0000e+10
    FEPolarization : 0.025852
    FEPolarizationX : 0.025852
    FEPolarizationY : 0.025852
    FEPolarizationZ : 0.025852
    FEPolDivFree : 1
    eHopping : 0.025852
    hHopping : 0.025852
    HydrogenAtom : 1.0000e+10
    HydrogenMolecule : 1.0000e+10
    HydrogenIon : 1.0000e+10
    HydrogenSpeciesA : 1.0000e+10
    HydrogenSpeciesB : 1.0000e+10
    HydrogenSpeciesC : 1.0000e+10
    HydrogenSiliconBondOccupation : 1
    TrapPDE : 1.0000e-05
    eSHEDistribution : 0.025852
    hSHEDistribution : 0.025852
    Landau-Lifshitz-Gilbert[theta] : 1
    Landau-Lifshitz-Gilbert[phi] : 1
    Landau-Lifshitz-Gilbert[x] : 1
    Landau-Lifshitz-Gilbert[y] : 1
    Landau-Lifshitz-Gilbert[z] : 1
    Mechanics : 1
    ExternalTransportSolver : 1
    ReactionDiffusionPDE : 1
  Relative error : 5 digits
  Without checked transient error
  Max. #iterations : 20
  LineSearchDamping=1
  #undamped iterations : 1000
  No incomplete Newton
  transient method : TR-BDF
  Linear solver : blocked decomposition
  Linear solver for AC analysis : blocked decomposition
  Linear solver for SHEDistribution Model : Super
  use linear extrapolation in transient/quasistationary computations
  use complex supernodal in ac-analysis (if possible)
  do not use smoothed PDE's in transient/quasistationary computations
  use automatic coupling of contact/circuit stuff
  Spice temperature: 3.0015e+02
  Spice nominal temperature of parameter measurements: 3.0015e+02
  Spice minimum conductance gmin: 1.0000e-12
  Terminate simulation immediately if a solve command fails.
  Use 64 bit (double) normal precision floating point arithmetic.
  Mininum |rhs| : 1.0000e-05
  Maximum |rhs| (transient): 1.0000e+15
  Maximum |rhs| (non-transient): 1.0000e+100
  Maximum |rhs| factor : 1.0000e+10
  Maximum |rhs| factor1 : 1.0000e+10
  Lattice Temperature Range : (50,5.0000e+03)
  Carrier Temperature Range : (10,8.0000e+04)
  Simplified first order SHE of BTE will be solved
  SHERefinementCutoff : 20
  No user dependencies.
  Number of assembly threads: 1 (command line max_threads)
  Number of solver threads: 1 (command line max_threads)
  Thread stacksize: 1000000 bytes (default)
  Go serial if not enough parallel licenses are available.
  Model: Math  Switched on

Default device parameters:
  Electrodes:
    "source" : 0.0000e+00 V (Ohmic), area factor : 1
    "drain" : 0.0000e+00 V (Ohmic), area factor : 1
    "substrate" : 0.0000e+00 V (Ohmic), area factor : 1
    "gateS" : 0.0000e+00 V (Ohmic, WorkFunction = 4.2 eV), area factor : 1
    "gateD" : 0.0000e+00 V (Ohmic, WorkFunction = 4.8 eV), area factor : 1
  RayTrace Boundaries:
  Files:
    no Boundary file
    Grid file: n1_fps.tdr
    no Doping file
    no MobilityDoping file
    MIMCurrent file: pp19_des_mimcur_des.plt
    no MIMDefects file
    no InitialDefects file
    no CyclicNorm file
    no MIMBand file
    MIMSensitivity file: pp19_des_mimsa_des.tdr
    no Load file
    no Save file
    Plot file: n19_des.tdr
    no DevFieldsName file
    AutoNewtonPlot file: n19_des_%ld_des.tdr
    no Path file
    no Lifetime file
    no Temperature file
    Current file: n19_des.plt
    no PMIUserFields file
    no Extraction file
    ModelParameters file: pp19_des.par
    ParameterPath directories: 
    no Piezo file
    no mcDOS file
    no ModeGain file
    no Optical emission table for stimulated emission file
    no Optical emission table for spontaneous emission file
    no Optical emission table for photon phase change coefficient file
    no EmissionTable file
    no DephasingRates file
    no OpticalFarField file
    no OpticalIntensityPattern file
    no SaveOpticalIntensityPattern file
    no IlluminationSpectrum file
    no SpectralPlot file
    no OpticalSolverInput file
    no OpticalGenerationInput file
    no OpticalGenerationOutuput file
    no OptGenTransientScaling file
    no MonteCarloInput file
    no MonteCarloOutput file
    no ACPlot file
-----------------------------------------------
  Numerical parameters:
    With avalanche derivatives
    Using New Plot Names
    Using old wavelength search algorithm
    Do not reinitialize quasi Fermi potentials in quasi-stationary simulations
    Ignore ionization integral constraints
    Without diagonal preconditioning
    With Scharfetter-Gummel Discretization
    Relative error : 5 digits
    Delta for numerical tunnelling derivatives : 1.0000e-03
    Do not compute breakdown paths and ionization integrals
    QuasiFermiPotential is used for Contact Equation
    With usage of best vertex in element (maximum element-vertex volume angle) for impact ionization models
-----------------------------------------------
-----------------------------------------------
  Physical models:
    Without incomplete ionization
    Use Si parameters
    TATNonlocalPathNC = 0.0000e+00
    Without SRH-Recombination
    Without CDL-Recombination
    With optical generation computation 
    With electron non local Barrier Tunneling
    With hole non local Barrier Tunneling
    Without Band-to-Band-Tunneling
    Without Auger-Recombination
    Without Radiative Recombination
    Without Surface-Recombination
    Without Trap-Assisted-Auger-Recombination
    PMI recombination models: none
    Without thermal resistance interfaces
    Without distributed resistance interfaces for electrons
    Without distributed resistance interfaces for holes
    Without Piezo
    Without Anisotropic Material Properties
    Without Avalanche-Generation 
    Without Alpha Particle
    Without Heavy Ion
    Without polarization
    Volume charge density: 0.0000e+00 cm^-3
    Device Temperature = 3.0000e+02 K
    Electron Quasi Fermi Potential: 0.0000e+00 V
    Hole Quasi Fermi Potential: 0.0000e+00 V
    Without MagneticField
    With SingletExciton Barrier Type
    Intrinsic density models:
      default bandgap model
      Bandgap narrowing model: OldSlotboom with bandgap narrowing (no Fermi)
    default affinity model
    default effective mass model
    Electron mobility:
      no Doping dependence (using constant mobility)
      no Carrier-Carrier scattering
      no bulk trap Coulomb scattering 
      no E_normal dependence
      Without ThinLayer mobility model
      no high-field saturation
      Einstein relation for diffusivity-mobility ratio
      no band tail high-field mobility
    Hole mobility:
      no Doping dependence (using constant mobility)
      no Carrier-Carrier scattering
      no bulk trap Coulomb scattering 
      no E_normal dependence
      Without ThinLayer mobility model
      no high-field saturation
      Einstein relation for diffusivity-mobility ratio
      no band tail high-field mobility
    Energy relaxation time model: according to formula in parameter file
    Schottky resistance model: default bult-in model
    Lattice thermal conductivity model: according to formula in parameter file
    Metal Resistivity model: according to formula in parameter file
    Thermo Electric Power model: extraploted Si data
    Metal Thermo Electric Power model: MetalThermoElectricPower model not defined
    Lattice heat capacity model: temperature dependent
    no piezoelectric polarization model
    Without default parameters from file (use built-in default parameters)
-----------------------------------------------
- - - - - - - - - - - - - - - - - - - - - - - - 
  The following Physical models were changed
              for Material = 'Silicon'
    With SRH-Recombination
      Without field dependent lifetimes
      With doping dependent lifetimes
      Without temperature dependent lifetimes
    Without thermal resistance interfaces
    Without distributed resistance interfaces for electrons
    Without distributed resistance interfaces for holes
    Electron mobility:
      Philips unified mobility
      E_normal dependence:
        Lombardi
      High-field mobility: Caughey-Thomas saturation model, using gradient quasi-Fermi potential
    Hole mobility:
      Philips unified mobility
      E_normal dependence:
        Lombardi
      High-field mobility: Caughey-Thomas saturation model, using gradient quasi-Fermi potential
- - - - - - - - - - - - - - - - - - - - - - - -
  Process information for extraction purposes:
    none
  Plot variables:
    eNLLTunnelingGeneration
    ! WARNING eNLLTunnelingGeneration is an alias for eBarrierTunneling and will not be supported in Plot section in future releases
    hNLLTunnelingGeneration
    ! WARNING hNLLTunnelingGeneration is an alias for hBarrierTunneling and will not be supported in Plot section in future releases
    ElectrostaticPotential
    ConductionBandEnergy
    ValenceBandEnergy
    ElectricField/Vector
    eDensity
    hDensity
    eCurrentDensity/Vector
    hCurrentDensity/Vector
    DopingConcentration
    DonorConcentration
    AcceptorConcentration

------------------------------------------------
  NoisePlot variables:
    none
  Plot groups:
    none

------------------------------------------------
  CurrentPlot variables:
    none
Devices:
Systems:
Solve :
 Poisson
Coupled ( Digits : 5, Max. #iterations : 20, 
    Solver : blocked decomposition,
    #undamped iterations : 1000 
    )
    { Poisson Electron Hole } 
Quasistationary ( Digits : 5, Max. #iterations : 20, 
      Initial step in t : 0.1, 
      Minimum step in t : 1.0000e-05, Maximum step in t : 1, 
      Increment : 1.5, Decrement : 2, 
      Goal values :
        Contact drain : 0.08V
    )
  {
    Coupled ( Digits : 5, Max. #iterations : 20, 
        Solver : blocked decomposition,
        #undamped iterations : 1000 
        )
        { Poisson Electron Hole } 
  }
Quasistationary ( Digits : 5, Max. #iterations : 20, 
      Initial step in t : 0.01, 
      Minimum step in t : 1.0000e-05, Maximum step in t : 0.05, 
      Increment : 1.5, Decrement : 2, 
      DoZero      Goal values :
        Contact gateD : 2.5V,
        Contact gateS : 2.5V
    )
  {
    Coupled ( Digits : 5, Max. #iterations : 20, 
        Solver : blocked decomposition,
        #undamped iterations : 1000 
        )
        { Poisson Electron Hole } 
    Plot( FilePrefix = "n19_Profile_LowVd" nooverwrite -loadable
         Time (fixed times:
             0.0000e+00 0.2 0.3 0.4 0.5
             1) )
      { }
  }
Quasistationary ( Digits : 5, Max. #iterations : 20, 
      Initial step in t : 0.05, 
      Minimum step in t : 1.0000e-05, Maximum step in t : 0.1, 
      Increment : 1.5, Decrement : 2, 
      Goal values :
        Contact gateD : 0.0000e+00V,
        Contact gateS : 0.0000e+00V
    )
  {
    Coupled ( Digits : 5, Max. #iterations : 20, 
        Solver : blocked decomposition,
        #undamped iterations : 1000 
        )
        { Poisson Electron Hole } 
  }
Quasistationary ( Digits : 5, Max. #iterations : 20, 
      Initial step in t : 0.1, 
      Minimum step in t : 1.0000e-05, Maximum step in t : 1, 
      Increment : 1.5, Decrement : 2, 
      Goal values :
        Contact drain : 0.7V
    )
  {
    Coupled ( Digits : 5, Max. #iterations : 20, 
        Solver : blocked decomposition,
        #undamped iterations : 1000 
        )
        { Poisson Electron Hole } 
  }
Quasistationary ( Digits : 5, Max. #iterations : 20, 
      Initial step in t : 0.01, 
      Minimum step in t : 1.0000e-05, Maximum step in t : 0.05, 
      Increment : 1.5, Decrement : 2, 
      DoZero      Goal values :
        Contact gateD : 2.5V,
        Contact gateS : 2.5V
    )
  {
    Coupled ( Digits : 5, Max. #iterations : 20, 
        Solver : blocked decomposition,
        #undamped iterations : 1000 
        )
        { Poisson Electron Hole } 
    Plot( FilePrefix = "n19_Profile_HighVd" nooverwrite -loadable
         Time (fixed times:
             0.0000e+00 0.2 0.3 0.4 0.5
             1) )
      { }
  }

===============================

Reading grid 'n1_fps.tdr' ... 
  coordinate system: UCS, 3d_sprocess (x is device down direction)
  use coordinate system as is (no transformation)
  TDR format
  Number of grid points is 4303.
done.

Adding interfaces and contacts .... done.

Computing edges ...
  Number of edges: 18939
done.
Computing boxes ...

  CVPL_AverageBoxMethod = TRUE 
   
  Boxmethod Parallel Computing: nbThreads = 1 

  Computing Delaunay coefficients ...   done.
  Delaunay coefficients time: (wallclock = 0.0000e+00 s, tcpu = 0.0000e+00 s)

  Parallel Computing Voronoi faces, coefficients, and measures ... 
  CVPL_Algorithm = TRUE 

    Computing Obtuse Elements ... 
     Obtuse Elements time:  tcpu = 0.0000e+00 s
      New Parameters time: (wallclock = 0.0000e+00 s, tcpu = 0.0000e+00 s)

Info for all regions (NumberOfRegions = 6):
        ElementWithMinVolume(  7376) Vertex0( 3731)(-7.443749e-02, 1.400807e-02) Volume = 2.785575e-09 um3 (3.07e-08 from TotalVolume)
          ElementWithMinEdge(  7376) Vertex0( 3731)(-7.443749e-02, 1.400807e-02) Length = 1.197818e-05 um
              MaxFlatElement(  7147) Vertex0( 3761)(-7.145255e-02,-1.913866e-02)  Angle = 3.631133e+01 degrees
         ElementWithMinAngle(  1653) Vertex0(  899)( 4.000000e-01,-2.837484e-04)  Angle = 3.440222e-01 degrees
   ElementWithMaxQualityEdge(  1649) Vertex0(  899)( 4.000000e-01, 0.000000e+00)    R/L = 8.327386e+01 
 ElementWithMaxQualityHeight(  1649) Vertex0(  899)( 4.000000e-01, 0.000000e+00)    R/H = 8.327537e+01 

Info for semiconductor regions (NumberOfRegions = 1):
        ElementWithMinVolume(   175) Vertex0(   94)( 0.000000e+00,-2.837484e-04) Volume = 7.181707e-08 um3 (7.91e-07 from TotalVolume)
          ElementWithMinEdge(   175) Vertex0(   94)( 0.000000e+00,-2.837484e-04) Length = 2.837484e-04 um
              MaxFlatElement(   284) Vertex0(  167)( 1.012405e-03, 2.211762e-02)  Angle = 7.163809e+01 degrees
         ElementWithMinAngle(  1653) Vertex0(  899)( 4.000000e-01,-2.837484e-04)  Angle = 3.440222e-01 degrees
   ElementWithMaxQualityEdge(  1649) Vertex0(  899)( 4.000000e-01, 0.000000e+00)    R/L = 8.327386e+01 
 ElementWithMaxQualityHeight(  1649) Vertex0(  899)( 4.000000e-01, 0.000000e+00)    R/H = 8.327537e+01 

   NumberOfEdges              =  18939 
   NumberOfGeometricalEdges   =  12546 
   NumberOfDoubleEdges        =      0 
   MaxNumberOfEdgesPerVertex  =     10; vertex(3846) = (-6.861708e-02, -1.913866e-02) [um]
   MaxNumberOfElementsPerEdge =      2; edge(1) = (1, 994) 
                                        vertex(1) = ( 3.527432e-01, -1.120000e-01) [um]
                                        vertex(994) = ( 3.527432e-01, -8.883628e-02) [um]

                        NumberOfVertices =   4482 
                        NumberOfElements =   8244 
                       NumberOfTriangles =   8244  (100.00 %)
                      NumberOfRectangles =      0  ( 0.00 %)
                  NumberOfObtuseElements =     42  ( 0.51 %)
             NumberOfNonDelaunayElements =      0  ( 0.00 %)

  VertexWithMaxMeasure(  341)( 3.527432e-01, 8.883628e-02)
  MaxVertMeasure(8.576643e-04)/VertVolume(4.801700e-04) = 1.79e+00


/-------- Region non-Delaunay elements ---------------------------------------------------------------------
 Region          Volume      BoxMethodVolume  DeltaVolume  Elements  non-Delaunay      non-DelaunayVolume 
  name            [um2]          [um2]           [%]                   Elements              [um2]   [%]   
 -----------------------------------------------------------------------------------------------------------
 Silicon_1    8.9600000e-02  8.9600000e-02     5.6e-13      7124       0 ( 0.00 %)   0.0000000e+00 ( 0.0000) 
 Nitride_1.1  5.0413045e-04  5.0413045e-04     6.0e-14       204       0 ( 0.00 %)   0.0000000e+00 ( 0.0000) 
 Nitride_1.2  5.0450501e-04  5.0450501e-04     7.2e-14       236       0 ( 0.00 %)   0.0000000e+00 ( 0.0000) 
 Oxide_1      1.4000007e-05  1.4000007e-05     1.5e-13       214       0 ( 0.00 %)   0.0000000e+00 ( 0.0000) 
 HfO2_1       1.5792007e-04  1.5792007e-04     3.8e-14       434       0 ( 0.00 %)   0.0000000e+00 ( 0.0000) 
 Nitride_1.3  4.6472809e-05  4.6472809e-05     3.3e-14        32       0 ( 0.00 %)   0.0000000e+00 ( 0.0000) 
 ...........................................................................................................
 Total        9.0827028e-02  9.0827028e-02     1.0e-12      8244       0 ( 0.00 %)   0.0000000e+00 ( 0.0000) 
\-----------------------------------------------------------------------------------------------------------
    done.
  done.
  (times: wallclock = 0.01 s, tcpu = 0.01 s)
done.
Reading doping 'n1_fps.tdr' (TDR format) ...
done.
done.
Reading parameter file 'pp19_des.par' ...
---------------------------------------------------
 Reading parameters for default parameter set
---------------------------------------------------

	Differences compared with default parameters:
	BarrierTunneling_NLM_gateS: mt_e = 1, instead of: 0.0000e+00 [1]
	BarrierTunneling_NLM_gateS: mt_h = 1, instead of: 0.0000e+00 [1]
	BarrierTunneling_NLM_gateS: g_e = 1, instead of: 2.1 [1]
	BarrierTunneling_NLM_gateS: g_h = 1, instead of: 0.66 [1]
	BarrierTunneling_NLM_gateD: mt_e = 1, instead of: 0.0000e+00 [1]
	BarrierTunneling_NLM_gateD: mt_h = 1, instead of: 0.0000e+00 [1]
	BarrierTunneling_NLM_gateD: g_e = 1, instead of: 2.1 [1]
	BarrierTunneling_NLM_gateD: g_h = 1, instead of: 0.66 [1]

---------------------------------------------------
 Reading parameters for material "HfO2"
---------------------------------------------------
	BarrierTunneling_NLM_gateS: mt_e = 0.11, instead of: 1 [1]
	BarrierTunneling_NLM_gateD: mt_e = 0.11, instead of: 1 [1]

---------------------------------------------------
 Reading parameters for material "Oxide"
---------------------------------------------------
	BarrierTunneling_NLM_gateS: mt_e = 0.42, instead of: 1 [1]
	BarrierTunneling_NLM_gateD: mt_e = 0.42, instead of: 1 [1]

---------------------------------------------------
 Reading parameters for material "Silicon"
---------------------------------------------------


=======
Region: "HfO2_1"
  (material is "HfO2")
=======
  Model: "BarrierTunneling_NLM_gateD"
    Parameter "alphae" is new with value equal to 0
    Parameter "alphah" is new with value equal to 0
    Parameter "eA" is new with value equal to 1
    Parameter "eBL_max" is new with value equal to 0.3
    Parameter "eQuantumPotentialFactor" is new with value equal to 0
    Parameter "eQuantumPotentialPosFac" is new with value equal to 0
    Parameter "g_e" is new with value equal to 1
    Parameter "g_h" is new with value equal to 1
    Parameter "hA" is new with value equal to 1
    Parameter "hBL_max" is new with value equal to 0.3
    Parameter "hQuantumPotentialFactor" is new with value equal to 0
    Parameter "hQuantumPotentialPosFac" is new with value equal to 0
    Parameter "mt_e" is new with value equal to 0.11
    Parameter "mt_h" is new with value equal to 1
  Model: "BarrierTunneling_NLM_gateS"
    Parameter "alphae" is new with value equal to 0
    Parameter "alphah" is new with value equal to 0
    Parameter "eA" is new with value equal to 1
    Parameter "eBL_max" is new with value equal to 0.3
    Parameter "eQuantumPotentialFactor" is new with value equal to 0
    Parameter "eQuantumPotentialPosFac" is new with value equal to 0
    Parameter "g_e" is new with value equal to 1
    Parameter "g_h" is new with value equal to 1
    Parameter "hA" is new with value equal to 1
    Parameter "hBL_max" is new with value equal to 0.3
    Parameter "hQuantumPotentialFactor" is new with value equal to 0
    Parameter "hQuantumPotentialPosFac" is new with value equal to 0
    Parameter "mt_e" is new with value equal to 0.11
    Parameter "mt_h" is new with value equal to 1
  Using default lattice crystal coordinate system:
    effective LatticeParameters:
      X = (1, 0.0000e+00, 0.0000e+00)
      Y = (0.0000e+00, 1, 0.0000e+00)
      Z = (0.0000e+00, 0.0000e+00, 1)

=======
Region: "Nitride_1.1"
  (material is "Nitride")
=======
  Model: "BarrierTunneling_NLM_gateD"
    Parameter "alphae" is new with value equal to 0
    Parameter "alphah" is new with value equal to 0
    Parameter "eA" is new with value equal to 1
    Parameter "eBL_max" is new with value equal to 0.3
    Parameter "eQuantumPotentialFactor" is new with value equal to 0
    Parameter "eQuantumPotentialPosFac" is new with value equal to 0
    Parameter "g_e" is new with value equal to 1
    Parameter "g_h" is new with value equal to 1
    Parameter "hA" is new with value equal to 1
    Parameter "hBL_max" is new with value equal to 0.3
    Parameter "hQuantumPotentialFactor" is new with value equal to 0
    Parameter "hQuantumPotentialPosFac" is new with value equal to 0
    Parameter "mt_e" is new with value equal to 1
    Parameter "mt_h" is new with value equal to 1
  Model: "BarrierTunneling_NLM_gateS"
    Parameter "alphae" is new with value equal to 0
    Parameter "alphah" is new with value equal to 0
    Parameter "eA" is new with value equal to 1
    Parameter "eBL_max" is new with value equal to 0.3
    Parameter "eQuantumPotentialFactor" is new with value equal to 0
    Parameter "eQuantumPotentialPosFac" is new with value equal to 0
    Parameter "g_e" is new with value equal to 1
    Parameter "g_h" is new with value equal to 1
    Parameter "hA" is new with value equal to 1
    Parameter "hBL_max" is new with value equal to 0.3
    Parameter "hQuantumPotentialFactor" is new with value equal to 0
    Parameter "hQuantumPotentialPosFac" is new with value equal to 0
    Parameter "mt_e" is new with value equal to 1
    Parameter "mt_h" is new with value equal to 1
  Using default lattice crystal coordinate system:
    effective LatticeParameters:
      X = (1, 0.0000e+00, 0.0000e+00)
      Y = (0.0000e+00, 1, 0.0000e+00)
      Z = (0.0000e+00, 0.0000e+00, 1)

=======
Region: "Nitride_1.2"
  (material is "Nitride")
=======
  Model: "BarrierTunneling_NLM_gateD"
    Parameter "alphae" is new with value equal to 0
    Parameter "alphah" is new with value equal to 0
    Parameter "eA" is new with value equal to 1
    Parameter "eBL_max" is new with value equal to 0.3
    Parameter "eQuantumPotentialFactor" is new with value equal to 0
    Parameter "eQuantumPotentialPosFac" is new with value equal to 0
    Parameter "g_e" is new with value equal to 1
    Parameter "g_h" is new with value equal to 1
    Parameter "hA" is new with value equal to 1
    Parameter "hBL_max" is new with value equal to 0.3
    Parameter "hQuantumPotentialFactor" is new with value equal to 0
    Parameter "hQuantumPotentialPosFac" is new with value equal to 0
    Parameter "mt_e" is new with value equal to 1
    Parameter "mt_h" is new with value equal to 1
  Model: "BarrierTunneling_NLM_gateS"
    Parameter "alphae" is new with value equal to 0
    Parameter "alphah" is new with value equal to 0
    Parameter "eA" is new with value equal to 1
    Parameter "eBL_max" is new with value equal to 0.3
    Parameter "eQuantumPotentialFactor" is new with value equal to 0
    Parameter "eQuantumPotentialPosFac" is new with value equal to 0
    Parameter "g_e" is new with value equal to 1
    Parameter "g_h" is new with value equal to 1
    Parameter "hA" is new with value equal to 1
    Parameter "hBL_max" is new with value equal to 0.3
    Parameter "hQuantumPotentialFactor" is new with value equal to 0
    Parameter "hQuantumPotentialPosFac" is new with value equal to 0
    Parameter "mt_e" is new with value equal to 1
    Parameter "mt_h" is new with value equal to 1
  Using default lattice crystal coordinate system:
    effective LatticeParameters:
      X = (1, 0.0000e+00, 0.0000e+00)
      Y = (0.0000e+00, 1, 0.0000e+00)
      Z = (0.0000e+00, 0.0000e+00, 1)

=======
Region: "Nitride_1.3"
  (material is "Nitride")
=======
  Model: "BarrierTunneling_NLM_gateD"
    Parameter "alphae" is new with value equal to 0
    Parameter "alphah" is new with value equal to 0
    Parameter "eA" is new with value equal to 1
    Parameter "eBL_max" is new with value equal to 0.3
    Parameter "eQuantumPotentialFactor" is new with value equal to 0
    Parameter "eQuantumPotentialPosFac" is new with value equal to 0
    Parameter "g_e" is new with value equal to 1
    Parameter "g_h" is new with value equal to 1
    Parameter "hA" is new with value equal to 1
    Parameter "hBL_max" is new with value equal to 0.3
    Parameter "hQuantumPotentialFactor" is new with value equal to 0
    Parameter "hQuantumPotentialPosFac" is new with value equal to 0
    Parameter "mt_e" is new with value equal to 1
    Parameter "mt_h" is new with value equal to 1
  Model: "BarrierTunneling_NLM_gateS"
    Parameter "alphae" is new with value equal to 0
    Parameter "alphah" is new with value equal to 0
    Parameter "eA" is new with value equal to 1
    Parameter "eBL_max" is new with value equal to 0.3
    Parameter "eQuantumPotentialFactor" is new with value equal to 0
    Parameter "eQuantumPotentialPosFac" is new with value equal to 0
    Parameter "g_e" is new with value equal to 1
    Parameter "g_h" is new with value equal to 1
    Parameter "hA" is new with value equal to 1
    Parameter "hBL_max" is new with value equal to 0.3
    Parameter "hQuantumPotentialFactor" is new with value equal to 0
    Parameter "hQuantumPotentialPosFac" is new with value equal to 0
    Parameter "mt_e" is new with value equal to 1
    Parameter "mt_h" is new with value equal to 1
  Using default lattice crystal coordinate system:
    effective LatticeParameters:
      X = (1, 0.0000e+00, 0.0000e+00)
      Y = (0.0000e+00, 1, 0.0000e+00)
      Z = (0.0000e+00, 0.0000e+00, 1)

=======
Region: "Oxide_1"
  (material is "Oxide")
=======
  Model: "BarrierTunneling_NLM_gateD"
    Parameter "alphae" is new with value equal to 0
    Parameter "alphah" is new with value equal to 0
    Parameter "eA" is new with value equal to 1
    Parameter "eBL_max" is new with value equal to 0.3
    Parameter "eQuantumPotentialFactor" is new with value equal to 0
    Parameter "eQuantumPotentialPosFac" is new with value equal to 0
    Parameter "g_e" is new with value equal to 1
    Parameter "g_h" is new with value equal to 1
    Parameter "hA" is new with value equal to 1
    Parameter "hBL_max" is new with value equal to 0.3
    Parameter "hQuantumPotentialFactor" is new with value equal to 0
    Parameter "hQuantumPotentialPosFac" is new with value equal to 0
    Parameter "mt_e" is new with value equal to 0.42
    Parameter "mt_h" is new with value equal to 1
  Model: "BarrierTunneling_NLM_gateS"
    Parameter "alphae" is new with value equal to 0
    Parameter "alphah" is new with value equal to 0
    Parameter "eA" is new with value equal to 1
    Parameter "eBL_max" is new with value equal to 0.3
    Parameter "eQuantumPotentialFactor" is new with value equal to 0
    Parameter "eQuantumPotentialPosFac" is new with value equal to 0
    Parameter "g_e" is new with value equal to 1
    Parameter "g_h" is new with value equal to 1
    Parameter "hA" is new with value equal to 1
    Parameter "hBL_max" is new with value equal to 0.3
    Parameter "hQuantumPotentialFactor" is new with value equal to 0
    Parameter "hQuantumPotentialPosFac" is new with value equal to 0
    Parameter "mt_e" is new with value equal to 0.42
    Parameter "mt_h" is new with value equal to 1
  Using default lattice crystal coordinate system:
    effective LatticeParameters:
      X = (1, 0.0000e+00, 0.0000e+00)
      Y = (0.0000e+00, 1, 0.0000e+00)
      Z = (0.0000e+00, 0.0000e+00, 1)

=======
Region: "Silicon_1"
  (material is "Silicon")
=======
  Model: "BarrierTunneling_NLM_gateD"
    Parameter "alphae" is new with value equal to 0
    Parameter "alphah" is new with value equal to 0
    Parameter "eA" is new with value equal to 1
    Parameter "eBL_max" is new with value equal to 0.3
    Parameter "eQuantumPotentialFactor" is new with value equal to 0
    Parameter "eQuantumPotentialPosFac" is new with value equal to 0
    Parameter "g_e" is new with value equal to 1
    Parameter "g_h" is new with value equal to 1
    Parameter "hA" is new with value equal to 1
    Parameter "hBL_max" is new with value equal to 0.3
    Parameter "hQuantumPotentialFactor" is new with value equal to 0
    Parameter "hQuantumPotentialPosFac" is new with value equal to 0
    Parameter "mt_e" is new with value equal to 1
    Parameter "mt_h" is new with value equal to 1
  Model: "BarrierTunneling_NLM_gateS"
    Parameter "alphae" is new with value equal to 0
    Parameter "alphah" is new with value equal to 0
    Parameter "eA" is new with value equal to 1
    Parameter "eBL_max" is new with value equal to 0.3
    Parameter "eQuantumPotentialFactor" is new with value equal to 0
    Parameter "eQuantumPotentialPosFac" is new with value equal to 0
    Parameter "g_e" is new with value equal to 1
    Parameter "g_h" is new with value equal to 1
    Parameter "hA" is new with value equal to 1
    Parameter "hBL_max" is new with value equal to 0.3
    Parameter "hQuantumPotentialFactor" is new with value equal to 0
    Parameter "hQuantumPotentialPosFac" is new with value equal to 0
    Parameter "mt_e" is new with value equal to 1
    Parameter "mt_h" is new with value equal to 1
  Using lattice crystal coordinate system from TDR file:
    slice.angle                   : 1.8000e+02 [deg]
    wafer.orient, vertical.orient : (0, 0, 1)
    flat.orient, horizontal.orient: [1, 1, 0]
    miscut.tilt                   : 0.0000e+00 [deg]
    miscut.toward                 : [1, 1, 0]
    lattice.system                : cubic
    polytype                      : Zincblende
    lattice.const                 : 5.4310e-08 [cm]
    lattice.const.b               : 5.4310e-08 [cm]
    lattice.const.c               : 5.4310e-08 [cm]
    unit cell angles: alpha = 90, beta = 90, gamma = 90 [deg]
    effective LatticeParameters:
      X = (0.0000e+00, 0.0000e+00, -1.0000e+00)
      Y = (0.707107, 0.707107, 0.0000e+00)
      Z = (0.707107, -7.0711e-01, 0.0000e+00)

================
RegionInterface: "Nitride_1.1/HfO2_1"
  (material interface is "Nitride/HfO2")
================
  Model: "BarrierTunneling_NLM_gateD"
    Parameter "alphae" is new with value equal to 0
    Parameter "alphah" is new with value equal to 0
    Parameter "eA" is new with value equal to 1
    Parameter "eBL_max" is new with value equal to 0.3
    Parameter "eQuantumPotentialFactor" is new with value equal to 0
    Parameter "eQuantumPotentialPosFac" is new with value equal to 0
    Parameter "g_e" is new with value equal to 1
    Parameter "g_h" is new with value equal to 1
    Parameter "hA" is new with value equal to 1
    Parameter "hBL_max" is new with value equal to 0.3
    Parameter "hQuantumPotentialFactor" is new with value equal to 0
    Parameter "hQuantumPotentialPosFac" is new with value equal to 0
    Parameter "mt_e" is new with value equal to 1
    Parameter "mt_h" is new with value equal to 1
  Model: "BarrierTunneling_NLM_gateS"
    Parameter "alphae" is new with value equal to 0
    Parameter "alphah" is new with value equal to 0
    Parameter "eA" is new with value equal to 1
    Parameter "eBL_max" is new with value equal to 0.3
    Parameter "eQuantumPotentialFactor" is new with value equal to 0
    Parameter "eQuantumPotentialPosFac" is new with value equal to 0
    Parameter "g_e" is new with value equal to 1
    Parameter "g_h" is new with value equal to 1
    Parameter "hA" is new with value equal to 1
    Parameter "hBL_max" is new with value equal to 0.3
    Parameter "hQuantumPotentialFactor" is new with value equal to 0
    Parameter "hQuantumPotentialPosFac" is new with value equal to 0
    Parameter "mt_e" is new with value equal to 1
    Parameter "mt_h" is new with value equal to 1

================
RegionInterface: "Nitride_1.2/HfO2_1"
  (material interface is "Nitride/HfO2")
================
  Model: "BarrierTunneling_NLM_gateD"
    Parameter "alphae" is new with value equal to 0
    Parameter "alphah" is new with value equal to 0
    Parameter "eA" is new with value equal to 1
    Parameter "eBL_max" is new with value equal to 0.3
    Parameter "eQuantumPotentialFactor" is new with value equal to 0
    Parameter "eQuantumPotentialPosFac" is new with value equal to 0
    Parameter "g_e" is new with value equal to 1
    Parameter "g_h" is new with value equal to 1
    Parameter "hA" is new with value equal to 1
    Parameter "hBL_max" is new with value equal to 0.3
    Parameter "hQuantumPotentialFactor" is new with value equal to 0
    Parameter "hQuantumPotentialPosFac" is new with value equal to 0
    Parameter "mt_e" is new with value equal to 1
    Parameter "mt_h" is new with value equal to 1
  Model: "BarrierTunneling_NLM_gateS"
    Parameter "alphae" is new with value equal to 0
    Parameter "alphah" is new with value equal to 0
    Parameter "eA" is new with value equal to 1
    Parameter "eBL_max" is new with value equal to 0.3
    Parameter "eQuantumPotentialFactor" is new with value equal to 0
    Parameter "eQuantumPotentialPosFac" is new with value equal to 0
    Parameter "g_e" is new with value equal to 1
    Parameter "g_h" is new with value equal to 1
    Parameter "hA" is new with value equal to 1
    Parameter "hBL_max" is new with value equal to 0.3
    Parameter "hQuantumPotentialFactor" is new with value equal to 0
    Parameter "hQuantumPotentialPosFac" is new with value equal to 0
    Parameter "mt_e" is new with value equal to 1
    Parameter "mt_h" is new with value equal to 1

================
RegionInterface: "HfO2_1/Nitride_1.3"
  (material interface is "HfO2/Nitride")
================
  Model: "BarrierTunneling_NLM_gateD"
    Parameter "alphae" is new with value equal to 0
    Parameter "alphah" is new with value equal to 0
    Parameter "eA" is new with value equal to 1
    Parameter "eBL_max" is new with value equal to 0.3
    Parameter "eQuantumPotentialFactor" is new with value equal to 0
    Parameter "eQuantumPotentialPosFac" is new with value equal to 0
    Parameter "g_e" is new with value equal to 1
    Parameter "g_h" is new with value equal to 1
    Parameter "hA" is new with value equal to 1
    Parameter "hBL_max" is new with value equal to 0.3
    Parameter "hQuantumPotentialFactor" is new with value equal to 0
    Parameter "hQuantumPotentialPosFac" is new with value equal to 0
    Parameter "mt_e" is new with value equal to 1
    Parameter "mt_h" is new with value equal to 1
  Model: "BarrierTunneling_NLM_gateS"
    Parameter "alphae" is new with value equal to 0
    Parameter "alphah" is new with value equal to 0
    Parameter "eA" is new with value equal to 1
    Parameter "eBL_max" is new with value equal to 0.3
    Parameter "eQuantumPotentialFactor" is new with value equal to 0
    Parameter "eQuantumPotentialPosFac" is new with value equal to 0
    Parameter "g_e" is new with value equal to 1
    Parameter "g_h" is new with value equal to 1
    Parameter "hA" is new with value equal to 1
    Parameter "hBL_max" is new with value equal to 0.3
    Parameter "hQuantumPotentialFactor" is new with value equal to 0
    Parameter "hQuantumPotentialPosFac" is new with value equal to 0
    Parameter "mt_e" is new with value equal to 1
    Parameter "mt_h" is new with value equal to 1

================
RegionInterface: "Oxide_1/HfO2_1"
  (material interface is "Oxide/HfO2")
================
  Model: "BarrierTunneling_NLM_gateD"
    Parameter "alphae" is new with value equal to 0
    Parameter "alphah" is new with value equal to 0
    Parameter "eA" is new with value equal to 1
    Parameter "eBL_max" is new with value equal to 0.3
    Parameter "eQuantumPotentialFactor" is new with value equal to 0
    Parameter "eQuantumPotentialPosFac" is new with value equal to 0
    Parameter "g_e" is new with value equal to 1
    Parameter "g_h" is new with value equal to 1
    Parameter "hA" is new with value equal to 1
    Parameter "hBL_max" is new with value equal to 0.3
    Parameter "hQuantumPotentialFactor" is new with value equal to 0
    Parameter "hQuantumPotentialPosFac" is new with value equal to 0
    Parameter "mt_e" is new with value equal to 1
    Parameter "mt_h" is new with value equal to 1
  Model: "BarrierTunneling_NLM_gateS"
    Parameter "alphae" is new with value equal to 0
    Parameter "alphah" is new with value equal to 0
    Parameter "eA" is new with value equal to 1
    Parameter "eBL_max" is new with value equal to 0.3
    Parameter "eQuantumPotentialFactor" is new with value equal to 0
    Parameter "eQuantumPotentialPosFac" is new with value equal to 0
    Parameter "g_e" is new with value equal to 1
    Parameter "g_h" is new with value equal to 1
    Parameter "hA" is new with value equal to 1
    Parameter "hBL_max" is new with value equal to 0.3
    Parameter "hQuantumPotentialFactor" is new with value equal to 0
    Parameter "hQuantumPotentialPosFac" is new with value equal to 0
    Parameter "mt_e" is new with value equal to 1
    Parameter "mt_h" is new with value equal to 1

================
RegionInterface: "Nitride_1.1/Oxide_1"
  (material interface is "Nitride/Oxide")
================
  Model: "BarrierTunneling_NLM_gateD"
    Parameter "alphae" is new with value equal to 0
    Parameter "alphah" is new with value equal to 0
    Parameter "eA" is new with value equal to 1
    Parameter "eBL_max" is new with value equal to 0.3
    Parameter "eQuantumPotentialFactor" is new with value equal to 0
    Parameter "eQuantumPotentialPosFac" is new with value equal to 0
    Parameter "g_e" is new with value equal to 1
    Parameter "g_h" is new with value equal to 1
    Parameter "hA" is new with value equal to 1
    Parameter "hBL_max" is new with value equal to 0.3
    Parameter "hQuantumPotentialFactor" is new with value equal to 0
    Parameter "hQuantumPotentialPosFac" is new with value equal to 0
    Parameter "mt_e" is new with value equal to 1
    Parameter "mt_h" is new with value equal to 1
  Model: "BarrierTunneling_NLM_gateS"
    Parameter "alphae" is new with value equal to 0
    Parameter "alphah" is new with value equal to 0
    Parameter "eA" is new with value equal to 1
    Parameter "eBL_max" is new with value equal to 0.3
    Parameter "eQuantumPotentialFactor" is new with value equal to 0
    Parameter "eQuantumPotentialPosFac" is new with value equal to 0
    Parameter "g_e" is new with value equal to 1
    Parameter "g_h" is new with value equal to 1
    Parameter "hA" is new with value equal to 1
    Parameter "hBL_max" is new with value equal to 0.3
    Parameter "hQuantumPotentialFactor" is new with value equal to 0
    Parameter "hQuantumPotentialPosFac" is new with value equal to 0
    Parameter "mt_e" is new with value equal to 1
    Parameter "mt_h" is new with value equal to 1

================
RegionInterface: "Silicon_1/Nitride_1.1"
  (material interface is "Silicon/Nitride")
================
  Model: "BarrierTunneling_NLM_gateD"
    Parameter "alphae" is new with value equal to 0
    Parameter "alphah" is new with value equal to 0
    Parameter "eA" is new with value equal to 1
    Parameter "eBL_max" is new with value equal to 0.3
    Parameter "eQuantumPotentialFactor" is new with value equal to 0
    Parameter "eQuantumPotentialPosFac" is new with value equal to 0
    Parameter "g_e" is new with value equal to 1
    Parameter "g_h" is new with value equal to 1
    Parameter "hA" is new with value equal to 1
    Parameter "hBL_max" is new with value equal to 0.3
    Parameter "hQuantumPotentialFactor" is new with value equal to 0
    Parameter "hQuantumPotentialPosFac" is new with value equal to 0
    Parameter "mt_e" is new with value equal to 1
    Parameter "mt_h" is new with value equal to 1
  Model: "BarrierTunneling_NLM_gateS"
    Parameter "alphae" is new with value equal to 0
    Parameter "alphah" is new with value equal to 0
    Parameter "eA" is new with value equal to 1
    Parameter "eBL_max" is new with value equal to 0.3
    Parameter "eQuantumPotentialFactor" is new with value equal to 0
    Parameter "eQuantumPotentialPosFac" is new with value equal to 0
    Parameter "g_e" is new with value equal to 1
    Parameter "g_h" is new with value equal to 1
    Parameter "hA" is new with value equal to 1
    Parameter "hBL_max" is new with value equal to 0.3
    Parameter "hQuantumPotentialFactor" is new with value equal to 0
    Parameter "hQuantumPotentialPosFac" is new with value equal to 0
    Parameter "mt_e" is new with value equal to 1
    Parameter "mt_h" is new with value equal to 1

================
RegionInterface: "Nitride_1.2/Oxide_1"
  (material interface is "Nitride/Oxide")
================
  Model: "BarrierTunneling_NLM_gateD"
    Parameter "alphae" is new with value equal to 0
    Parameter "alphah" is new with value equal to 0
    Parameter "eA" is new with value equal to 1
    Parameter "eBL_max" is new with value equal to 0.3
    Parameter "eQuantumPotentialFactor" is new with value equal to 0
    Parameter "eQuantumPotentialPosFac" is new with value equal to 0
    Parameter "g_e" is new with value equal to 1
    Parameter "g_h" is new with value equal to 1
    Parameter "hA" is new with value equal to 1
    Parameter "hBL_max" is new with value equal to 0.3
    Parameter "hQuantumPotentialFactor" is new with value equal to 0
    Parameter "hQuantumPotentialPosFac" is new with value equal to 0
    Parameter "mt_e" is new with value equal to 1
    Parameter "mt_h" is new with value equal to 1
  Model: "BarrierTunneling_NLM_gateS"
    Parameter "alphae" is new with value equal to 0
    Parameter "alphah" is new with value equal to 0
    Parameter "eA" is new with value equal to 1
    Parameter "eBL_max" is new with value equal to 0.3
    Parameter "eQuantumPotentialFactor" is new with value equal to 0
    Parameter "eQuantumPotentialPosFac" is new with value equal to 0
    Parameter "g_e" is new with value equal to 1
    Parameter "g_h" is new with value equal to 1
    Parameter "hA" is new with value equal to 1
    Parameter "hBL_max" is new with value equal to 0.3
    Parameter "hQuantumPotentialFactor" is new with value equal to 0
    Parameter "hQuantumPotentialPosFac" is new with value equal to 0
    Parameter "mt_e" is new with value equal to 1
    Parameter "mt_h" is new with value equal to 1

================
RegionInterface: "Silicon_1/Nitride_1.2"
  (material interface is "Silicon/Nitride")
================
  Model: "BarrierTunneling_NLM_gateD"
    Parameter "alphae" is new with value equal to 0
    Parameter "alphah" is new with value equal to 0
    Parameter "eA" is new with value equal to 1
    Parameter "eBL_max" is new with value equal to 0.3
    Parameter "eQuantumPotentialFactor" is new with value equal to 0
    Parameter "eQuantumPotentialPosFac" is new with value equal to 0
    Parameter "g_e" is new with value equal to 1
    Parameter "g_h" is new with value equal to 1
    Parameter "hA" is new with value equal to 1
    Parameter "hBL_max" is new with value equal to 0.3
    Parameter "hQuantumPotentialFactor" is new with value equal to 0
    Parameter "hQuantumPotentialPosFac" is new with value equal to 0
    Parameter "mt_e" is new with value equal to 1
    Parameter "mt_h" is new with value equal to 1
  Model: "BarrierTunneling_NLM_gateS"
    Parameter "alphae" is new with value equal to 0
    Parameter "alphah" is new with value equal to 0
    Parameter "eA" is new with value equal to 1
    Parameter "eBL_max" is new with value equal to 0.3
    Parameter "eQuantumPotentialFactor" is new with value equal to 0
    Parameter "eQuantumPotentialPosFac" is new with value equal to 0
    Parameter "g_e" is new with value equal to 1
    Parameter "g_h" is new with value equal to 1
    Parameter "hA" is new with value equal to 1
    Parameter "hBL_max" is new with value equal to 0.3
    Parameter "hQuantumPotentialFactor" is new with value equal to 0
    Parameter "hQuantumPotentialPosFac" is new with value equal to 0
    Parameter "mt_e" is new with value equal to 1
    Parameter "mt_h" is new with value equal to 1

================
RegionInterface: "Silicon_1/Oxide_1"
  (material interface is "Silicon/Oxide")
================
  Model: "BarrierTunneling_NLM_gateD"
    Parameter "alphae" is new with value equal to 0
    Parameter "alphah" is new with value equal to 0
    Parameter "eA" is new with value equal to 1
    Parameter "eBL_max" is new with value equal to 0.3
    Parameter "eQuantumPotentialFactor" is new with value equal to 0
    Parameter "eQuantumPotentialPosFac" is new with value equal to 0
    Parameter "g_e" is new with value equal to 1
    Parameter "g_h" is new with value equal to 1
    Parameter "hA" is new with value equal to 1
    Parameter "hBL_max" is new with value equal to 0.3
    Parameter "hQuantumPotentialFactor" is new with value equal to 0
    Parameter "hQuantumPotentialPosFac" is new with value equal to 0
    Parameter "mt_e" is new with value equal to 1
    Parameter "mt_h" is new with value equal to 1
  Model: "BarrierTunneling_NLM_gateS"
    Parameter "alphae" is new with value equal to 0
    Parameter "alphah" is new with value equal to 0
    Parameter "eA" is new with value equal to 1
    Parameter "eBL_max" is new with value equal to 0.3
    Parameter "eQuantumPotentialFactor" is new with value equal to 0
    Parameter "eQuantumPotentialPosFac" is new with value equal to 0
    Parameter "g_e" is new with value equal to 1
    Parameter "g_h" is new with value equal to 1
    Parameter "hA" is new with value equal to 1
    Parameter "hBL_max" is new with value equal to 0.3
    Parameter "hQuantumPotentialFactor" is new with value equal to 0
    Parameter "hQuantumPotentialPosFac" is new with value equal to 0
    Parameter "mt_e" is new with value equal to 1
    Parameter "mt_h" is new with value equal to 1

==========
Electrode: "drain"
==========
  Model: "BarrierTunneling_NLM_gateD"
    Parameter "alphae" is new with value equal to 0
    Parameter "alphah" is new with value equal to 0
    Parameter "eA" is new with value equal to 1
    Parameter "eBL_max" is new with value equal to 0.3
    Parameter "eQuantumPotentialFactor" is new with value equal to 0
    Parameter "eQuantumPotentialPosFac" is new with value equal to 0
    Parameter "g_e" is new with value equal to 1
    Parameter "g_h" is new with value equal to 1
    Parameter "hA" is new with value equal to 1
    Parameter "hBL_max" is new with value equal to 0.3
    Parameter "hQuantumPotentialFactor" is new with value equal to 0
    Parameter "hQuantumPotentialPosFac" is new with value equal to 0
    Parameter "mt_e" is new with value equal to 1
    Parameter "mt_h" is new with value equal to 1
  Model: "BarrierTunneling_NLM_gateS"
    Parameter "alphae" is new with value equal to 0
    Parameter "alphah" is new with value equal to 0
    Parameter "eA" is new with value equal to 1
    Parameter "eBL_max" is new with value equal to 0.3
    Parameter "eQuantumPotentialFactor" is new with value equal to 0
    Parameter "eQuantumPotentialPosFac" is new with value equal to 0
    Parameter "g_e" is new with value equal to 1
    Parameter "g_h" is new with value equal to 1
    Parameter "hA" is new with value equal to 1
    Parameter "hBL_max" is new with value equal to 0.3
    Parameter "hQuantumPotentialFactor" is new with value equal to 0
    Parameter "hQuantumPotentialPosFac" is new with value equal to 0
    Parameter "mt_e" is new with value equal to 1
    Parameter "mt_h" is new with value equal to 1

==========
Electrode: "gateD"
==========
  Model: "BarrierTunneling_NLM_gateD"
    Parameter "alphae" is new with value equal to 0
    Parameter "alphah" is new with value equal to 0
    Parameter "eA" is new with value equal to 1
    Parameter "eBL_max" is new with value equal to 0.3
    Parameter "eQuantumPotentialFactor" is new with value equal to 0
    Parameter "eQuantumPotentialPosFac" is new with value equal to 0
    Parameter "g_e" is new with value equal to 1
    Parameter "g_h" is new with value equal to 1
    Parameter "hA" is new with value equal to 1
    Parameter "hBL_max" is new with value equal to 0.3
    Parameter "hQuantumPotentialFactor" is new with value equal to 0
    Parameter "hQuantumPotentialPosFac" is new with value equal to 0
    Parameter "mt_e" is new with value equal to 1
    Parameter "mt_h" is new with value equal to 1
  Model: "BarrierTunneling_NLM_gateS"
    Parameter "alphae" is new with value equal to 0
    Parameter "alphah" is new with value equal to 0
    Parameter "eA" is new with value equal to 1
    Parameter "eBL_max" is new with value equal to 0.3
    Parameter "eQuantumPotentialFactor" is new with value equal to 0
    Parameter "eQuantumPotentialPosFac" is new with value equal to 0
    Parameter "g_e" is new with value equal to 1
    Parameter "g_h" is new with value equal to 1
    Parameter "hA" is new with value equal to 1
    Parameter "hBL_max" is new with value equal to 0.3
    Parameter "hQuantumPotentialFactor" is new with value equal to 0
    Parameter "hQuantumPotentialPosFac" is new with value equal to 0
    Parameter "mt_e" is new with value equal to 1
    Parameter "mt_h" is new with value equal to 1

==========
Electrode: "gateS"
==========
  Model: "BarrierTunneling_NLM_gateD"
    Parameter "alphae" is new with value equal to 0
    Parameter "alphah" is new with value equal to 0
    Parameter "eA" is new with value equal to 1
    Parameter "eBL_max" is new with value equal to 0.3
    Parameter "eQuantumPotentialFactor" is new with value equal to 0
    Parameter "eQuantumPotentialPosFac" is new with value equal to 0
    Parameter "g_e" is new with value equal to 1
    Parameter "g_h" is new with value equal to 1
    Parameter "hA" is new with value equal to 1
    Parameter "hBL_max" is new with value equal to 0.3
    Parameter "hQuantumPotentialFactor" is new with value equal to 0
    Parameter "hQuantumPotentialPosFac" is new with value equal to 0
    Parameter "mt_e" is new with value equal to 1
    Parameter "mt_h" is new with value equal to 1
  Model: "BarrierTunneling_NLM_gateS"
    Parameter "alphae" is new with value equal to 0
    Parameter "alphah" is new with value equal to 0
    Parameter "eA" is new with value equal to 1
    Parameter "eBL_max" is new with value equal to 0.3
    Parameter "eQuantumPotentialFactor" is new with value equal to 0
    Parameter "eQuantumPotentialPosFac" is new with value equal to 0
    Parameter "g_e" is new with value equal to 1
    Parameter "g_h" is new with value equal to 1
    Parameter "hA" is new with value equal to 1
    Parameter "hBL_max" is new with value equal to 0.3
    Parameter "hQuantumPotentialFactor" is new with value equal to 0
    Parameter "hQuantumPotentialPosFac" is new with value equal to 0
    Parameter "mt_e" is new with value equal to 1
    Parameter "mt_h" is new with value equal to 1

==========
Electrode: "source"
==========
  Model: "BarrierTunneling_NLM_gateD"
    Parameter "alphae" is new with value equal to 0
    Parameter "alphah" is new with value equal to 0
    Parameter "eA" is new with value equal to 1
    Parameter "eBL_max" is new with value equal to 0.3
    Parameter "eQuantumPotentialFactor" is new with value equal to 0
    Parameter "eQuantumPotentialPosFac" is new with value equal to 0
    Parameter "g_e" is new with value equal to 1
    Parameter "g_h" is new with value equal to 1
    Parameter "hA" is new with value equal to 1
    Parameter "hBL_max" is new with value equal to 0.3
    Parameter "hQuantumPotentialFactor" is new with value equal to 0
    Parameter "hQuantumPotentialPosFac" is new with value equal to 0
    Parameter "mt_e" is new with value equal to 1
    Parameter "mt_h" is new with value equal to 1
  Model: "BarrierTunneling_NLM_gateS"
    Parameter "alphae" is new with value equal to 0
    Parameter "alphah" is new with value equal to 0
    Parameter "eA" is new with value equal to 1
    Parameter "eBL_max" is new with value equal to 0.3
    Parameter "eQuantumPotentialFactor" is new with value equal to 0
    Parameter "eQuantumPotentialPosFac" is new with value equal to 0
    Parameter "g_e" is new with value equal to 1
    Parameter "g_h" is new with value equal to 1
    Parameter "hA" is new with value equal to 1
    Parameter "hBL_max" is new with value equal to 0.3
    Parameter "hQuantumPotentialFactor" is new with value equal to 0
    Parameter "hQuantumPotentialPosFac" is new with value equal to 0
    Parameter "mt_e" is new with value equal to 1
    Parameter "mt_h" is new with value equal to 1

==========
Electrode: "substrate"
==========
  Model: "BarrierTunneling_NLM_gateD"
    Parameter "alphae" is new with value equal to 0
    Parameter "alphah" is new with value equal to 0
    Parameter "eA" is new with value equal to 1
    Parameter "eBL_max" is new with value equal to 0.3
    Parameter "eQuantumPotentialFactor" is new with value equal to 0
    Parameter "eQuantumPotentialPosFac" is new with value equal to 0
    Parameter "g_e" is new with value equal to 1
    Parameter "g_h" is new with value equal to 1
    Parameter "hA" is new with value equal to 1
    Parameter "hBL_max" is new with value equal to 0.3
    Parameter "hQuantumPotentialFactor" is new with value equal to 0
    Parameter "hQuantumPotentialPosFac" is new with value equal to 0
    Parameter "mt_e" is new with value equal to 1
    Parameter "mt_h" is new with value equal to 1
  Model: "BarrierTunneling_NLM_gateS"
    Parameter "alphae" is new with value equal to 0
    Parameter "alphah" is new with value equal to 0
    Parameter "eA" is new with value equal to 1
    Parameter "eBL_max" is new with value equal to 0.3
    Parameter "eQuantumPotentialFactor" is new with value equal to 0
    Parameter "eQuantumPotentialPosFac" is new with value equal to 0
    Parameter "g_e" is new with value equal to 1
    Parameter "g_h" is new with value equal to 1
    Parameter "hA" is new with value equal to 1
    Parameter "hBL_max" is new with value equal to 0.3
    Parameter "hQuantumPotentialFactor" is new with value equal to 0
    Parameter "hQuantumPotentialPosFac" is new with value equal to 0
    Parameter "mt_e" is new with value equal to 1
    Parameter "mt_h" is new with value equal to 1


Acceptor and donor concentrations (AcceptorConcentration, DonorConcentration):
    computed based on the following species from the doping file:
        ArsenicActiveConcentration (donor)
        PhosphorusActiveConcentration (donor)
        BoronActiveConcentration (acceptor)
Net doping concentration (DopingConcentration):
    obtained from doping file
Total doping concentration (TotalConcentration):
    recomputed from acceptor and donor concentrations



With Constant Reference Potential:
  Parameters of Reference Semiconductor:
    The Electron Affinity: 4.07274
    The Band Gap: 1.10821
    The Electron DOS: 2.8583e+19
    The Hole DOS: 3.1046e+19
  The Constant Reference Potential: 4.62578

===============================
Starting solve of next problem:
 Poisson
===============================

Computing poisson-equation 
using Bank/Rose nonlinear solver.

Iteration   |Rhs|      factor     |step|     error   #inner  #iterative  time
------------------------------------------------------------------------------
    0      9.26e+02                                                      0.00
    1      3.68e+01   1.00e+00   4.37e+00   9.12e+04    0         1      0.01
    2      5.17e+00   1.00e+00   2.30e+00   6.34e+04    0         1      0.02
    3      8.40e-01   1.00e+00   6.93e-01   1.50e+04    0         1      0.02
    4      1.74e-02   1.00e+00   1.45e-01   2.33e+03    0         1      0.03
    5      1.26e-04   1.00e+00   1.15e-02   1.60e+02    0         1      0.03
    6      1.72e-08   1.00e+00   1.12e-04   1.45e+00    0         1      0.04
Finished, because...
|RHS| less than 1.0000E-05.

Accumulated times:
Assembly time:        0.03 s
Solve time:      0.01 s
Total time:      0.04 s

contact        voltage     electron current    hole current  conduction current
 drain        0.000E+00      -2.872E-27         3.220E-24        3.217E-24
 gateD        0.000E+00      -2.113E-42        -1.514E-66       -2.113E-42
 gateS        0.000E+00       4.281E-36        -7.854E-71        4.281E-36
 source       0.000E+00      -2.443E-23        -1.788E-25       -2.461E-23
 substrate    0.000E+00       2.443E-23        -3.041E-24        2.139E-23


===============================
Starting solve of next problem:
Coupled ( Digits : 5, Max. #iterations : 20, 
    Solver : blocked decomposition,
    #undamped iterations : 1000 
    )
    { Poisson Electron Hole } 
===============================

Computing Coupled( 1 poisson-equation(s) , 1 electron-equation(s) , 
                   1 hole-equation(s) ) 
using Bank/Rose nonlinear solver.

Iteration   |Rhs|      factor     |step|     error   #inner  #iterative  time
------------------------------------------------------------------------------
    0      3.25e-03                                                      0.07
    1      5.59e-04   1.00e+00   1.49e-08   8.67e-04    0         1      0.25
Finished, because...
Error smaller than 1 ( 8.6726E-04 ).

Accumulated times:
Assembly time:        0.19 s
Solve time:      0.06 s
Total time:      0.25 s

contact        voltage     electron current    hole current  conduction current
 drain        0.000E+00      -6.242E-27         7.913E-26        7.289E-26
 gateD        0.000E+00      -2.423E-42        -8.114E-54       -2.423E-42
 gateS        0.000E+00       5.849E-36        -1.360E-60        5.849E-36
 source       0.000E+00      -4.490E-23         1.350E-26       -4.489E-23
 substrate    0.000E+00       4.491E-23        -9.263E-26        4.482E-23


===============================
Starting solve of next problem:
Quasistationary ( Digits : 5, Max. #iterations : 20, 
      Initial step in t : 0.1, 
      Minimum step in t : 1.0000e-05, Maximum step in t : 1, 
      Increment : 1.5, Decrement : 2, 
      Goal values :
        Contact drain : 0.08V
    )
  {
    Coupled ( Digits : 5, Max. #iterations : 20, 
        Solver : blocked decomposition,
        #undamped iterations : 1000 
        )
        { Poisson Electron Hole } 
  }
===============================

Computing step from t=0.0000e+00 to t=0.1 (Stepsize: 0.1) :
Computing Coupled( 1 poisson-equation(s) , 1 electron-equation(s) , 
                   1 hole-equation(s) ) 
using Bank/Rose nonlinear solver.

Iteration   |Rhs|      factor     |step|     error   #inner  #iterative  time
------------------------------------------------------------------------------
    0      2.50e+10                                                      0.12
    1      2.21e+10   1.00e+00   1.57e-01   3.44e+03    0         1      0.32
    2      4.96e+09   1.00e+00   7.74e-02   1.38e+03    0         1      0.51
    3      2.42e+08   1.00e+00   8.55e-03   2.25e+02    0         1      0.70
    4      2.55e+05   1.00e+00   5.23e-04   9.81e+00    0         1      0.90
    5      3.99e-01   1.00e+00   9.13e-07   1.25e-02    0         1      1.09
Finished, because...
Error smaller than 1 ( 1.2470E-02 ).

Accumulated times:
Assembly time:        0.81 s
Solve time:      0.28 s
Total time:      1.09 s

contact        voltage     electron current    hole current  conduction current
 drain        8.000E-03       1.355E-16         2.122E-20        1.355E-16
 gateD        0.000E+00      -8.167E-29        -3.276E-46       -8.167E-29
 gateS        0.000E+00      -2.380E-29        -8.320E-59       -2.380E-29
 source       0.000E+00      -1.092E-16         1.105E-26       -1.092E-16
 substrate    0.000E+00      -5.354E-21        -2.629E-17       -2.630E-17

Computing step from t=0.1 to t=0.236667 (Stepsize: 0.136667) :
Extrapolating values for t = 0.236667 ... done.
Computing Coupled( 1 poisson-equation(s) , 1 electron-equation(s) , 
                   1 hole-equation(s) ) 
using Bank/Rose nonlinear solver.

Iteration   |Rhs|      factor     |step|     error   #inner  #iterative  time
------------------------------------------------------------------------------
    0      9.45e-01                                                      0.13
    1      4.71e+02   1.00e+00   1.44e-02   1.03e+01    0         1      0.33
    2      5.02e-04   1.00e+00   7.98e-05   1.04e-02    0         1      0.52
Finished, because...
Error smaller than 1 ( 1.0424E-02 ).

Accumulated times:
Assembly time:        0.40 s
Solve time:      0.11 s
Total time:      0.52 s

contact        voltage     electron current    hole current  conduction current
 drain        1.893E-02       2.374E-16         4.017E-20        2.374E-16
 gateD        0.000E+00      -1.757E-28        -7.976E-46       -1.757E-28
 gateS        0.000E+00      -3.818E-29        -1.762E-58       -3.818E-29
 source       0.000E+00      -1.798E-16        -1.338E-26       -1.798E-16
 substrate    0.000E+00      -1.050E-20        -5.768E-17       -5.769E-17

Computing step from t=0.236667 to t=0.437111 (Stepsize: 0.200444) :
Extrapolating values for t = 0.437111 ... done.
Computing Coupled( 1 poisson-equation(s) , 1 electron-equation(s) , 
                   1 hole-equation(s) ) 
using Bank/Rose nonlinear solver.

Iteration   |Rhs|      factor     |step|     error   #inner  #iterative  time
------------------------------------------------------------------------------
    0      5.88e-01                                                      0.13
    1      2.04e+03   1.00e+00   2.91e-02   2.11e+01    0         1      0.33
    2      5.85e-04   1.00e+00   3.76e-04   3.30e-02    0         1      0.52
Finished, because...
Error smaller than 1 ( 3.2955E-02 ).

Accumulated times:
Assembly time:        0.40 s
Solve time:      0.12 s
Total time:      0.52 s

contact        voltage     electron current    hole current  conduction current
 drain        3.497E-02       3.107E-16         5.486E-20        3.108E-16
 gateD        0.000E+00      -2.896E-28        -1.559E-45       -2.896E-28
 gateS        0.000E+00      -4.414E-29        -2.886E-58       -4.414E-29
 source       0.000E+00      -2.142E-16        -2.341E-26       -2.142E-16
 substrate    0.000E+00      -1.452E-20        -9.655E-17       -9.657E-17

Computing step from t=0.437111 to t=0.731096 (Stepsize: 0.293985) :
Extrapolating values for t = 0.731096 ... done.
Computing Coupled( 1 poisson-equation(s) , 1 electron-equation(s) , 
                   1 hole-equation(s) ) 
using Bank/Rose nonlinear solver.

Iteration   |Rhs|      factor     |step|     error   #inner  #iterative  time
------------------------------------------------------------------------------
    0      1.70e-02                                                      0.14
    1      9.22e+03   1.00e+00   5.29e-02   4.44e+01    0         1      0.33
    2      3.46e-02   1.00e+00   2.29e-03   1.22e-01    0         1      0.52
Finished, because...
Error smaller than 1 ( 1.2161E-01 ).

Accumulated times:
Assembly time:        0.40 s
Solve time:      0.11 s
Total time:      0.52 s

contact        voltage     electron current    hole current  conduction current
 drain        5.849E-02       3.767E-16         6.275E-20        3.768E-16
 gateD        0.000E+00      -4.316E-28        -2.921E-45       -4.316E-28
 gateS        0.000E+00      -4.807E-29        -4.200E-58       -4.807E-29
 source       0.000E+00      -2.335E-16         7.500E-27       -2.335E-16
 substrate    0.000E+00      -1.638E-20        -1.432E-16       -1.432E-16

Computing step from t=0.731096 to t=1 (Stepsize: 0.268904) :
Extrapolating values for t = 1 ... done.
Computing Coupled( 1 poisson-equation(s) , 1 electron-equation(s) , 
                   1 hole-equation(s) ) 
using Bank/Rose nonlinear solver.

Iteration   |Rhs|      factor     |step|     error   #inner  #iterative  time
------------------------------------------------------------------------------
    0      6.14e-02                                                      0.13
    1      9.83e+03   1.00e+00   4.05e-02   4.50e+01    0         1      0.32
    2      4.42e-02   1.00e+00   3.24e-03   1.48e-01    0         1      0.51
Finished, because...
Error smaller than 1 ( 1.4755E-01 ).

Accumulated times:
Assembly time:        0.41 s
Solve time:      0.10 s
Total time:      0.51 s

contact        voltage     electron current    hole current  conduction current
 drain        8.000E-02       4.291E-16         6.472E-20        4.292E-16
 gateD        0.000E+00      -5.567E-28        -4.561E-45       -5.567E-28
 gateS        0.000E+00      -5.139E-29        -5.270E-58       -5.139E-29
 source       0.000E+00      -2.499E-16        -1.371E-26       -2.499E-16
 substrate    0.000E+00      -1.655E-20        -1.793E-16       -1.793E-16


Finished, because...
Curve trace finished.


===============================
Starting solve of next problem:
Quasistationary ( Digits : 5, Max. #iterations : 20, 
      Initial step in t : 0.01, 
      Minimum step in t : 1.0000e-05, Maximum step in t : 0.05, 
      Increment : 1.5, Decrement : 2, 
      DoZero      Goal values :
        Contact gateD : 2.5V,
        Contact gateS : 2.5V
    )
  {
    Coupled ( Digits : 5, Max. #iterations : 20, 
        Solver : blocked decomposition,
        #undamped iterations : 1000 
        )
        { Poisson Electron Hole } 
    Plot( FilePrefix = "n19_Profile_LowVd" nooverwrite -loadable
         Time (fixed times:
             0.0000e+00 0.2 0.3 0.4 0.5
             1) )
      { }
  }
===============================

Computing solution for t=0 :
Computing Coupled( 1 poisson-equation(s) , 1 electron-equation(s) , 
                   1 hole-equation(s) ) 
using Bank/Rose nonlinear solver.

Iteration   |Rhs|      factor     |step|     error   #inner  #iterative  time
------------------------------------------------------------------------------
    0      4.42e-02                                                      0.01
    1      5.06e-04   1.00e+00   2.11e-04   9.03e-03    0         1      0.20
Finished, because...
Error smaller than 1 ( 9.0279E-03 ).

Accumulated times:
Assembly time:        0.14 s
Solve time:      0.06 s
Total time:      0.20 s

contact        voltage     electron current    hole current  conduction current
 drain        8.000E-02       4.291E-16         6.482E-20        4.292E-16
 gateD        0.000E+00      -5.567E-28        -4.561E-45       -5.567E-28
 gateS        0.000E+00      -5.138E-29        -5.321E-58       -5.138E-29
 source       0.000E+00      -2.499E-16        -3.245E-27       -2.499E-16
 substrate    0.000E+00      -1.790E-20        -1.793E-16       -1.793E-16


Plot started:
Saving device '':
    Writing plot 'n19_Profile_LowVd_0000_des.tdr' (TDR format) ... done.
Plot finished.

Computing step from t=0.0000e+00 to t=0.01 (Stepsize: 0.01) :
Computing Coupled( 1 poisson-equation(s) , 1 electron-equation(s) , 
                   1 hole-equation(s) ) 
using Bank/Rose nonlinear solver.

Iteration   |Rhs|      factor     |step|     error   #inner  #iterative  time
------------------------------------------------------------------------------
    0      5.44e+01                                                      0.13
    1      6.24e+06   1.00e+00   2.73e-01   2.41e+04    0         1      0.33
    2      5.95e+04   1.00e+00   6.25e-02   4.33e+03    0         1      0.52
    3      2.10e+00   1.00e+00   2.29e-03   2.02e+02    0         1      0.72
    4      6.27e-04   1.00e+00   4.32e-06   3.99e-01    0         1      0.91
Finished, because...
Error smaller than 1 ( 3.9871E-01 ).

Accumulated times:
Assembly time:        0.69 s
Solve time:      0.22 s
Total time:      0.91 s

contact        voltage     electron current    hole current  conduction current
 drain        8.000E-02       6.572E-16         6.483E-20        6.572E-16
 gateD        2.500E-02      -1.722E-28         1.751E-42       -1.722E-28
 gateS        2.500E-02       2.687E-22         1.543E-48        2.687E-22
 source       0.000E+00      -4.784E-16        -1.050E-27       -4.784E-16
 substrate    0.000E+00      -1.795E-20        -1.788E-16       -1.788E-16

Computing step from t=0.01 to t=0.024 (Stepsize: 0.014) :
Extrapolating values for t = 0.024 ... done.
Computing Coupled( 1 poisson-equation(s) , 1 electron-equation(s) , 
                   1 hole-equation(s) ) 
using Bank/Rose nonlinear solver.

Iteration   |Rhs|      factor     |step|     error   #inner  #iterative  time
------------------------------------------------------------------------------
    0      1.07e-02                                                      0.13
    1      5.64e+04   1.00e+00   2.98e-03   1.71e+02    0         1      0.32
    2      3.77e+00   1.00e+00   1.57e-05   7.19e-01    0         1      0.52
Finished, because...
Error smaller than 1 ( 7.1930E-01 ).

Accumulated times:
Assembly time:        0.41 s
Solve time:      0.11 s
Total time:      0.52 s

contact        voltage     electron current    hole current  conduction current
 drain        8.000E-02       1.376E-15         6.488E-20        1.376E-15
 gateD        6.000E-02       6.309E-28         4.136E-42        6.309E-28
 gateS        6.000E-02       8.961E-22         2.576E-48        8.961E-22
 source       0.000E+00      -1.865E-15        -2.948E-23       -1.865E-15
 substrate    0.000E+00       6.668E-16        -1.782E-16        4.887E-16

Computing step from t=0.024 to t=0.0445333 (Stepsize: 0.0205333) :
Extrapolating values for t = 0.0445333 ... done.
Computing Coupled( 1 poisson-equation(s) , 1 electron-equation(s) , 
                   1 hole-equation(s) ) 
using Bank/Rose nonlinear solver.

Iteration   |Rhs|      factor     |step|     error   #inner  #iterative  time
------------------------------------------------------------------------------
    0      1.30e+01                                                      0.13
    1      2.72e+05   1.00e+00   5.89e-03   3.39e+02    0         1      0.33
    2      9.56e+01   1.00e+00   6.43e-05   2.91e+00    0         1      0.52
    3      5.81e-04   1.00e+00   6.67e-09   4.01e-04    0         1      0.72
Finished, because...
Error smaller than 1 ( 4.0095E-04 ).

Accumulated times:
Assembly time:        0.55 s
Solve time:      0.16 s
Total time:      0.72 s

contact        voltage     electron current    hole current  conduction current
 drain        8.000E-02       4.842E-15         6.482E-20        4.842E-15
 gateD        1.113E-01       4.139E-27         9.439E-42        4.139E-27
 gateS        1.113E-01       3.273E-21         1.070E-48        3.273E-21
 source       0.000E+00      -4.665E-15        -2.190E-27       -4.665E-15
 substrate    0.000E+00      -1.774E-20        -1.774E-16       -1.774E-16

Computing step from t=0.0445333 to t=0.0739644 (Stepsize: 0.0294311) :
Extrapolating values for t = 0.0739644 ... done.
Computing Coupled( 1 poisson-equation(s) , 1 electron-equation(s) , 
                   1 hole-equation(s) ) 
using Bank/Rose nonlinear solver.

Iteration   |Rhs|      factor     |step|     error   #inner  #iterative  time
------------------------------------------------------------------------------
    0      1.12e+01                                                      0.14
    1      1.87e+06   1.00e+00   1.15e-02   6.72e+02    0         1      0.34
    2      4.91e+03   1.00e+00   2.81e-04   1.20e+01    0         1      0.53
    3      2.75e-03   1.00e+00   2.13e-07   1.53e-02    0         1      0.73
Finished, because...
Error smaller than 1 ( 1.5302E-02 ).

Accumulated times:
Assembly time:        0.56 s
Solve time:      0.16 s
Total time:      0.73 s

contact        voltage     electron current    hole current  conduction current
 drain        8.000E-02       3.363E-14         6.482E-20        3.363E-14
 gateD        1.849E-01       3.782E-26         2.927E-41        3.782E-26
 gateS        1.849E-01       1.813E-20         1.057E-48        1.813E-20
 source       0.000E+00      -3.346E-14        -1.894E-26       -3.346E-14
 substrate    0.000E+00       5.486E-20        -1.766E-16       -1.765E-16

Computing step from t=0.0739644 to t=0.116149 (Stepsize: 0.0421846) :
Extrapolating values for t = 0.116149 ... done.
Computing Coupled( 1 poisson-equation(s) , 1 electron-equation(s) , 
                   1 hole-equation(s) ) 
using Bank/Rose nonlinear solver.

Iteration   |Rhs|      factor     |step|     error   #inner  #iterative  time
------------------------------------------------------------------------------
    0      1.25e-01                                                      0.13
    1      1.26e+07   1.00e+00   2.38e-02   1.48e+03    0         1      0.33
    2      2.49e+05   1.00e+00   1.54e-03   6.12e+01    0         1      0.53
    3      9.40e+00   1.00e+00   1.75e-05   1.22e+00    0         1      0.73
    4      4.07e-04   1.00e+00   3.40e-09   2.23e-04    0         1      0.93
Finished, because...
Error smaller than 1 ( 2.2292E-04 ).

Accumulated times:
Assembly time:        0.72 s
Solve time:      0.20 s
Total time:      0.93 s

contact        voltage     electron current    hole current  conduction current
 drain        8.000E-02       5.791E-13         6.482E-20        5.791E-13
 gateD        2.904E-01       8.748E-25         1.640E-40        8.748E-25
 gateS        2.904E-01       1.873E-19         1.530E-48        1.873E-19
 source       0.000E+00      -5.789E-13        -8.576E-27       -5.789E-13
 substrate    0.000E+00      -3.533E-19        -1.759E-16       -1.763E-16

Computing step from t=0.116149 to t=0.166149 (Stepsize: 0.05) :
Extrapolating values for t = 0.166149 ... done.
Computing Coupled( 1 poisson-equation(s) , 1 electron-equation(s) , 
                   1 hole-equation(s) ) 
using Bank/Rose nonlinear solver.

Iteration   |Rhs|      factor     |step|     error   #inner  #iterative  time
------------------------------------------------------------------------------
    0      7.05e+00                                                      0.14
    1      5.39e+07   1.00e+00   4.52e-02   3.39e+03    0         1      0.35
    2      7.61e+06   1.00e+00   7.08e-03   2.79e+02    0         1      0.55
    3      5.54e+04   1.00e+00   8.26e-04   5.96e+01    0         1      0.75
    4      8.39e+00   1.00e+00   1.75e-05   1.25e+00    0         1      0.96
    5      4.78e-04   1.00e+00   2.19e-09   1.57e-04    0         1      1.16
Finished, because...
Error smaller than 1 ( 1.5707E-04 ).

Accumulated times:
Assembly time:        0.89 s
Solve time:      0.27 s
Total time:      1.16 s

contact        voltage     electron current    hole current  conduction current
 drain        8.000E-02       1.721E-11         6.482E-20        1.721E-11
 gateD        4.154E-01       3.605E-23         1.423E-39        3.605E-23
 gateS        4.154E-01       2.207E-18         2.534E-48        2.207E-18
 source       0.000E+00      -1.721E-11        -2.866E-26       -1.721E-11
 substrate    0.000E+00      -1.684E-18        -1.732E-16       -1.749E-16

Computing step from t=0.166149 to t=0.2 (Stepsize: 0.033851) :
Extrapolating values for t = 0.2 ... done.
Computing Coupled( 1 poisson-equation(s) , 1 electron-equation(s) , 
                   1 hole-equation(s) ) 
using Bank/Rose nonlinear solver.

Iteration   |Rhs|      factor     |step|     error   #inner  #iterative  time
------------------------------------------------------------------------------
    0      6.29e+01                                                      0.14
    1      8.65e+07   1.00e+00   4.40e-02   3.22e+03    0         1      0.35
    2      1.36e+07   1.00e+00   6.43e-03   2.32e+02    0         1      0.56
    3      1.39e+05   1.00e+00   3.10e-04   1.99e+01    0         1      0.76
    4      1.72e+01   1.00e+00   2.57e-06   1.44e-01    0         1      0.97
Finished, because...
Error smaller than 1 ( 1.4385E-01 ).

Accumulated times:
Assembly time:        0.75 s
Solve time:      0.21 s
Total time:      0.97 s

contact        voltage     electron current    hole current  conduction current
 drain        8.000E-02       1.690E-10         6.482E-20        1.690E-10
 gateD        5.000E-01       4.297E-22         6.608E-39        4.297E-22
 gateS        5.000E-01       8.836E-18         3.786E-48        8.836E-18
 source       0.000E+00      -1.671E-10        -1.089E-25       -1.671E-10
 substrate    0.000E+00      -1.898E-12        -1.710E-16       -1.898E-12


Plot started:
Saving device '':
    Writing plot 'n19_Profile_LowVd_0001_des.tdr' (TDR format) ... done.
Plot finished.

Computing step from t=0.2 to t=0.25 (Stepsize: 0.05) :
Extrapolating values for t = 0.25 ... done.
Computing Coupled( 1 poisson-equation(s) , 1 electron-equation(s) , 
                   1 hole-equation(s) ) 
using Bank/Rose nonlinear solver.

Iteration   |Rhs|      factor     |step|     error   #inner  #iterative  time
------------------------------------------------------------------------------
    0      2.24e+03                                                      0.15
    1      3.71e+08   1.00e+00   9.04e-02   8.86e+03    0         1      0.36
    2      3.58e+08   1.00e+00   3.28e-02   1.07e+03    0         1      0.57
    3      1.57e+08   1.00e+00   1.34e-02   6.92e+02    0         1      0.78
    4      3.63e+07   1.00e+00   6.64e-03   4.15e+02    0         1      0.99
    5      1.24e+06   1.00e+00   9.55e-04   6.53e+01    0         1      1.20
    6      1.43e+03   1.00e+00   2.90e-05   2.10e+00    0         1      1.41
    7      5.21e-04   1.00e+00   1.71e-08   1.48e-03    0         1      1.62
Finished, because...
Error smaller than 1 ( 1.4833E-03 ).

Accumulated times:
Assembly time:        1.24 s
Solve time:      0.38 s
Total time:      1.62 s

contact        voltage     electron current    hole current  conduction current
 drain        8.000E-02       4.624E-09         6.482E-20        4.624E-09
 gateD        6.250E-01       1.416E-20         1.518E-38        1.416E-20
 gateS        6.250E-01       4.501E-17         7.598E-48        4.501E-17
 source       0.000E+00      -4.624E-09        -1.386E-26       -4.624E-09
 substrate    0.000E+00      -4.903E-18        -1.686E-16       -1.735E-16

Computing step from t=0.25 to t=0.3 (Stepsize: 0.05) :
Extrapolating values for t = 0.3 ... done.
Computing Coupled( 1 poisson-equation(s) , 1 electron-equation(s) , 
                   1 hole-equation(s) ) 
using Bank/Rose nonlinear solver.

Iteration   |Rhs|      factor     |step|     error   #inner  #iterative  time
------------------------------------------------------------------------------
    0      5.06e+04                                                      0.16
    1      5.08e+08   1.00e+00   1.22e-01   1.38e+04    0         1      0.37
    2      6.76e+08   1.00e+00   6.12e-02   2.05e+03    0         1      0.59
    3      3.92e+08   1.00e+00   3.08e-02   1.56e+03    0         1      0.80
    4      2.60e+08   1.00e+00   2.05e-02   1.39e+03    0         1      1.02
    5      1.47e+08   1.00e+00   1.75e-02   1.26e+03    0         1      1.23
    6      8.46e+07   1.00e+00   1.76e-02   1.63e+03    0         1      1.45
    7      1.59e+08   1.00e+00   2.85e-02   1.86e+03    0         1      1.67
    8      1.08e+08   1.00e+00   1.31e-01   2.65e+05    0         1      1.88
    9      9.82e+06   1.00e+00   1.13e-01   3.49e+03    0         1      2.10
   10      5.94e+05   1.00e+00   1.10e-03   2.95e+01    0         1      2.31
   11      1.37e+03   1.00e+00   1.01e-05   6.69e-01    0         1      2.53
Finished, because...
Error smaller than 1 ( 6.6942E-01 ).

Accumulated times:
Assembly time:        1.91 s
Solve time:      0.60 s
Total time:      2.53 s

contact        voltage     electron current    hole current  conduction current
 drain        8.000E-02       1.098E-07         6.482E-20        1.098E-07
 gateD        7.500E-01       3.107E-19         2.820E-38        3.107E-19
 gateS        7.500E-01       1.587E-16         1.751E-47        1.587E-16
 source       0.000E+00      -1.098E-07         2.431E-26       -1.098E-07
 substrate    0.000E+00       3.921E-17        -1.668E-16       -1.276E-16


Plot started:
Saving device '':
    Writing plot 'n19_Profile_LowVd_0002_des.tdr' (TDR format) ... done.
Plot finished.

Computing step from t=0.3 to t=0.35 (Stepsize: 0.05) :
Extrapolating values for t = 0.35 ... done.
Computing Coupled( 1 poisson-equation(s) , 1 electron-equation(s) , 
                   1 hole-equation(s) ) 
using Bank/Rose nonlinear solver.

Iteration   |Rhs|      factor     |step|     error   #inner  #iterative  time
------------------------------------------------------------------------------
    0      9.32e+05                                                      0.16
    1      4.57e+08   1.00e+00   1.29e-01   1.40e+04    0         1      0.38
    2      5.75e+08   1.00e+00   5.48e-02   1.74e+03    0         1      0.60
    3      3.10e+08   1.00e+00   2.18e-02   1.18e+03    0         1      0.82
    4      1.54e+08   1.00e+00   1.19e-02   8.43e+02    0         1      1.04
    5      3.89e+07   1.00e+00   5.73e-03   4.36e+02    0         1      1.26
    6      2.62e+06   1.00e+00   1.60e-03   1.22e+02    0         1      1.48
    7      4.07e+04   1.00e+00   1.31e-04   1.03e+01    0         1      1.70
    8      5.76e+00   1.00e+00   1.69e-06   1.39e-01    0         1      1.92
Finished, because...
Error smaller than 1 ( 1.3891E-01 ).

Accumulated times:
Assembly time:        1.48 s
Solve time:      0.44 s
Total time:      1.92 s

contact        voltage     electron current    hole current  conduction current
 drain        8.000E-02       2.030E-06         6.484E-20        2.030E-06
 gateD        8.750E-01       3.510E-18         1.207E-38        3.510E-18
 gateS        8.750E-01       4.485E-16         5.593E-47        4.485E-16
 source       0.000E+00      -2.030E-06        -2.673E-26       -2.030E-06
 substrate    0.000E+00      -2.883E-17        -1.658E-16       -1.946E-16

Computing step from t=0.35 to t=0.4 (Stepsize: 0.05) :
Extrapolating values for t = 0.4 ... done.
Computing Coupled( 1 poisson-equation(s) , 1 electron-equation(s) , 
                   1 hole-equation(s) ) 
using Bank/Rose nonlinear solver.

Iteration   |Rhs|      factor     |step|     error   #inner  #iterative  time
------------------------------------------------------------------------------
    0      1.06e+07                                                      0.16
    1      2.45e+08   1.00e+00   1.52e-01   1.79e+04    0         1      0.39
    2      3.15e+08   1.00e+00   5.52e-02   2.27e+03    0         1      0.62
    3      1.92e+08   1.00e+00   2.56e-02   1.55e+03    0         1      0.85
    4      6.80e+07   1.00e+00   1.01e-02   5.63e+02    0         1      1.08
    5      4.41e+06   1.00e+00   1.32e-03   8.04e+01    0         1      1.30
    6      2.17e+03   1.00e+00   9.84e-06   7.74e-01    0         1      1.53
Finished, because...
Error smaller than 1 ( 7.7406E-01 ).

Accumulated times:
Assembly time:        1.21 s
Solve time:      0.32 s
Total time:      1.53 s

contact        voltage     electron current    hole current  conduction current
 drain        8.000E-02       2.025E-05         6.503E-20        2.025E-05
 gateD        1.000E+00       1.938E-17         2.037E-38        1.938E-17
 gateS        1.000E+00       1.088E-15         4.219E-46        1.088E-15
 source       0.000E+00      -2.025E-05        -1.449E-23       -2.025E-05
 substrate    0.000E+00       6.558E-16        -1.676E-16        4.881E-16


Plot started:
Saving device '':
    Writing plot 'n19_Profile_LowVd_0003_des.tdr' (TDR format) ... done.
Plot finished.

Computing step from t=0.4 to t=0.45 (Stepsize: 0.05) :
Extrapolating values for t = 0.45 ... done.
Computing Coupled( 1 poisson-equation(s) , 1 electron-equation(s) , 
                   1 hole-equation(s) ) 
using Bank/Rose nonlinear solver.

Iteration   |Rhs|      factor     |step|     error   #inner  #iterative  time
------------------------------------------------------------------------------
    0      8.35e+07                                                      0.16
    1      1.31e+08   1.00e+00   1.46e-01   1.69e+04    0         1      0.40
    2      8.91e+07   1.00e+00   5.74e-02   1.55e+03    0         1      0.63
    3      8.12e+06   1.00e+00   9.04e-03   2.70e+02    0         1      0.86
    4      1.48e+05   1.00e+00   8.10e-04   3.12e+01    0         1      1.09
    5      4.88e+01   1.00e+00   8.53e-06   3.52e-01    0         1      1.32
Finished, because...
Error smaller than 1 ( 3.5219E-01 ).

Accumulated times:
Assembly time:        1.05 s
Solve time:      0.26 s
Total time:      1.32 s

contact        voltage     electron current    hole current  conduction current
 drain        8.000E-02       6.976E-05         6.551E-20        6.976E-05
 gateD        1.125E+00       6.467E-17         3.960E-38        6.467E-17
 gateS        1.125E+00       2.371E-15         3.076E-45        2.371E-15
 source       0.000E+00      -6.976E-05        -1.981E-22       -6.976E-05
 substrate    0.000E+00      -1.108E-14        -1.734E-16       -1.125E-14

Computing step from t=0.45 to t=0.5 (Stepsize: 0.05) :
Extrapolating values for t = 0.5 ... done.
Computing Coupled( 1 poisson-equation(s) , 1 electron-equation(s) , 
                   1 hole-equation(s) ) 
using Bank/Rose nonlinear solver.

Iteration   |Rhs|      factor     |step|     error   #inner  #iterative  time
------------------------------------------------------------------------------
    0      5.92e+08                                                      0.18
    1      6.67e+08   1.00e+00   9.59e-02   7.00e+03    0         1      0.42
    2      2.08e+08   1.00e+00   2.83e-02   6.58e+02    0         1      0.65
    3      2.68e+07   1.00e+00   2.07e-03   7.01e+01    0         1      0.89
    4      3.12e+05   1.00e+00   4.06e-04   1.22e+01    0         1      1.13
    5      4.74e+01   1.00e+00   3.21e-06   9.81e-02    0         1      1.37
Finished, because...
Error smaller than 1 ( 9.8071E-02 ).

Accumulated times:
Assembly time:        1.09 s
Solve time:      0.28 s
Total time:      1.37 s

contact        voltage     electron current    hole current  conduction current
 drain        8.000E-02       1.116E-04         6.603E-20        1.116E-04
 gateD        1.250E+00       1.775E-16         8.623E-38        1.775E-16
 gateS        1.250E+00       5.148E-15         1.253E-44        5.148E-15
 source       0.000E+00      -1.116E-04        -2.767E-23       -1.116E-04
 substrate    0.000E+00       1.042E-13        -1.772E-16        1.040E-13


Plot started:
Saving device '':
    Writing plot 'n19_Profile_LowVd_0004_des.tdr' (TDR format) ... done.
Plot finished.

Computing step from t=0.5 to t=0.55 (Stepsize: 0.05) :
Extrapolating values for t = 0.55 ... done.
Computing Coupled( 1 poisson-equation(s) , 1 electron-equation(s) , 
                   1 hole-equation(s) ) 
using Bank/Rose nonlinear solver.

Iteration   |Rhs|      factor     |step|     error   #inner  #iterative  time
------------------------------------------------------------------------------
    0      1.98e+08                                                      0.18
    1      3.29e+08   1.00e+00   6.81e-02   3.35e+03    0         1      0.43
    2      2.70e+07   1.00e+00   1.69e-02   3.62e+02    0         1      0.67
    3      5.91e+05   1.00e+00   1.62e-03   3.83e+01    0         1      0.92
    4      2.18e+02   1.00e+00   1.63e-05   4.10e-01    0         1      1.16
Finished, because...
Error smaller than 1 ( 4.0994E-01 ).

Accumulated times:
Assembly time:        0.95 s
Solve time:      0.21 s
Total time:      1.16 s

contact        voltage     electron current    hole current  conduction current
 drain        8.000E-02       1.335E-04         6.609E-20        1.335E-04
 gateD        1.375E+00       4.402E-16         2.035E-37        4.402E-16
 gateS        1.375E+00       1.155E-14         4.674E-44        1.155E-14
 source       0.000E+00      -1.335E-04        -6.788E-22       -1.335E-04
 substrate    0.000E+00       5.514E-13        -1.789E-16        5.512E-13

Computing step from t=0.55 to t=0.6 (Stepsize: 0.05) :
Extrapolating values for t = 0.6 ... done.
Computing Coupled( 1 poisson-equation(s) , 1 electron-equation(s) , 
                   1 hole-equation(s) ) 
using Bank/Rose nonlinear solver.

Iteration   |Rhs|      factor     |step|     error   #inner  #iterative  time
------------------------------------------------------------------------------
    0      2.94e+07                                                      0.19
    1      1.09e+08   1.00e+00   3.47e-02   1.61e+03    0         1      0.45
    2      1.85e+06   1.00e+00   4.95e-03   1.05e+02    0         1      0.70
    3      1.19e+03   1.00e+00   1.19e-04   2.71e+00    0         1      0.96
    4      7.38e-04   1.00e+00   5.49e-08   1.24e-03    0         1      1.21
Finished, because...
Error smaller than 1 ( 1.2434E-03 ).

Accumulated times:
Assembly time:        0.99 s
Solve time:      0.22 s
Total time:      1.21 s

contact        voltage     electron current    hole current  conduction current
 drain        8.000E-02       1.467E-04         6.643E-20        1.467E-04
 gateD        1.500E+00       1.032E-15         5.224E-37        1.032E-15
 gateS        1.500E+00       2.660E-14         2.033E-43        2.660E-14
 source       0.000E+00      -1.467E-04        -2.007E-24       -1.467E-04
 substrate    0.000E+00      -6.611E-17        -1.797E-16       -2.458E-16

Computing step from t=0.6 to t=0.65 (Stepsize: 0.05) :
Extrapolating values for t = 0.65 ... done.
Computing Coupled( 1 poisson-equation(s) , 1 electron-equation(s) , 
                   1 hole-equation(s) ) 
using Bank/Rose nonlinear solver.

Iteration   |Rhs|      factor     |step|     error   #inner  #iterative  time
------------------------------------------------------------------------------
    0      7.51e+06                                                      0.19
    1      6.29e+07   1.00e+00   1.92e-02   8.90e+02    0         1      0.46
    2      2.91e+05   1.00e+00   1.25e-03   2.56e+01    0         1      0.72
    3      9.20e+00   1.00e+00   8.61e-06   1.94e-01    0         1      0.98
Finished, because...
Error smaller than 1 ( 1.9352E-01 ).

Accumulated times:
Assembly time:        0.80 s
Solve time:      0.18 s
Total time:      0.98 s

contact        voltage     electron current    hole current  conduction current
 drain        8.000E-02       1.558E-04         6.645E-20        1.558E-04
 gateD        1.625E+00       2.365E-15         1.463E-36        2.365E-15
 gateS        1.625E+00       6.310E-14         8.352E-43        6.310E-14
 source       0.000E+00      -1.558E-04        -2.350E-22       -1.558E-04
 substrate    0.000E+00      -1.170E-12        -1.803E-16       -1.170E-12

Computing step from t=0.65 to t=0.7 (Stepsize: 0.05) :
Extrapolating values for t = 0.7 ... done.
Computing Coupled( 1 poisson-equation(s) , 1 electron-equation(s) , 
                   1 hole-equation(s) ) 
using Bank/Rose nonlinear solver.

Iteration   |Rhs|      factor     |step|     error   #inner  #iterative  time
------------------------------------------------------------------------------
    0      4.65e+06                                                      0.21
    1      3.99e+07   1.00e+00   1.19e-02   5.53e+02    0         1      0.47
    2      7.26e+04   1.00e+00   4.40e-04   8.98e+00    0         1      0.74
    3      4.09e-01   1.00e+00   1.25e-06   2.80e-02    0         1      1.01
Finished, because...
Error smaller than 1 ( 2.8040E-02 ).

Accumulated times:
Assembly time:        0.84 s
Solve time:      0.17 s
Total time:      1.01 s

contact        voltage     electron current    hole current  conduction current
 drain        8.000E-02       1.626E-04         6.661E-20        1.626E-04
 gateD        1.750E+00       5.393E-15         4.469E-36        5.393E-15
 gateS        1.750E+00       1.555E-13         2.814E-42        1.555E-13
 source       0.000E+00      -1.626E-04        -7.422E-24       -1.626E-04
 substrate    0.000E+00      -5.507E-14        -1.806E-16       -5.526E-14

Computing step from t=0.7 to t=0.75 (Stepsize: 0.05) :
Extrapolating values for t = 0.75 ... done.
Computing Coupled( 1 poisson-equation(s) , 1 electron-equation(s) , 
                   1 hole-equation(s) ) 
using Bank/Rose nonlinear solver.

Iteration   |Rhs|      factor     |step|     error   #inner  #iterative  time
------------------------------------------------------------------------------
    0      2.80e+06                                                      0.21
    1      2.62e+07   1.00e+00   8.01e-03   3.74e+02    0         1      0.48
    2      2.07e+04   1.00e+00   1.92e-04   3.92e+00    0         1      0.75
    3      2.72e-02   1.00e+00   2.72e-07   6.06e-03    0         1      1.02
Finished, because...
Error smaller than 1 ( 6.0647E-03 ).

Accumulated times:
Assembly time:        0.87 s
Solve time:      0.15 s
Total time:      1.02 s

contact        voltage     electron current    hole current  conduction current
 drain        8.000E-02       1.680E-04         6.667E-20        1.680E-04
 gateD        1.875E+00       1.241E-14         1.491E-35        1.241E-14
 gateS        1.875E+00       4.036E-13         1.115E-41        4.036E-13
 source       0.000E+00      -1.680E-04        -2.539E-24       -1.680E-04
 substrate    0.000E+00      -3.811E-15        -1.809E-16       -3.992E-15

Computing step from t=0.75 to t=0.8 (Stepsize: 0.05) :
Extrapolating values for t = 0.8 ... done.
Computing Coupled( 1 poisson-equation(s) , 1 electron-equation(s) , 
                   1 hole-equation(s) ) 
using Bank/Rose nonlinear solver.

Iteration   |Rhs|      factor     |step|     error   #inner  #iterative  time
------------------------------------------------------------------------------
    0      2.47e+06                                                      0.22
    1      1.76e+07   1.00e+00   5.73e-03   2.69e+02    0         1      0.49
    2      6.59e+03   1.00e+00   9.61e-05   1.98e+00    0         1      0.77
    3      2.55e-03   1.00e+00   7.61e-08   1.69e-03    0         1      1.05
Finished, because...
Error smaller than 1 ( 1.6910E-03 ).

Accumulated times:
Assembly time:        0.89 s
Solve time:      0.16 s
Total time:      1.05 s

contact        voltage     electron current    hole current  conduction current
 drain        8.000E-02       1.724E-04         6.672E-20        1.724E-04
 gateD        2.000E+00       2.911E-14         5.437E-35        2.911E-14
 gateS        2.000E+00       1.128E-12         5.406E-41        1.128E-12
 source       0.000E+00      -1.724E-04        -2.384E-24       -1.724E-04
 substrate    0.000E+00      -4.258E-16        -1.811E-16       -6.070E-16

Computing step from t=0.8 to t=0.85 (Stepsize: 0.05) :
Extrapolating values for t = 0.85 ... done.
Computing Coupled( 1 poisson-equation(s) , 1 electron-equation(s) , 
                   1 hole-equation(s) ) 
using Bank/Rose nonlinear solver.

Iteration   |Rhs|      factor     |step|     error   #inner  #iterative  time
------------------------------------------------------------------------------
    0      2.14e+06                                                      0.23
    1      1.21e+07   1.00e+00   4.29e-03   2.02e+02    0         1      0.51
    2      2.29e+03   1.00e+00   5.32e-05   1.10e+00    0         1      0.79
    3      7.40e-04   1.00e+00   2.54e-08   5.62e-04    0         1      1.08
Finished, because...
Error smaller than 1 ( 5.6202E-04 ).

Accumulated times:
Assembly time:        0.92 s
Solve time:      0.16 s
Total time:      1.08 s

contact        voltage     electron current    hole current  conduction current
 drain        8.000E-02       1.760E-04         6.676E-20        1.760E-04
 gateD        2.125E+00       7.029E-14         2.172E-34        7.029E-14
 gateS        2.125E+00       3.576E-12         3.249E-40        3.576E-12
 source       0.000E+00      -1.760E-04        -2.412E-24       -1.760E-04
 substrate    0.000E+00       4.146E-17        -1.813E-16       -1.398E-16

Computing step from t=0.85 to t=0.9 (Stepsize: 0.05) :
Extrapolating values for t = 0.9 ... done.
Computing Coupled( 1 poisson-equation(s) , 1 electron-equation(s) , 
                   1 hole-equation(s) ) 
using Bank/Rose nonlinear solver.

Iteration   |Rhs|      factor     |step|     error   #inner  #iterative  time
------------------------------------------------------------------------------
    0      1.87e+06                                                      0.23
    1      8.55e+06   1.00e+00   3.33e-03   1.57e+02    0         1      0.51
    2      8.60e+02   1.00e+00   3.18e-05   6.63e-01    0         1      0.80
Finished, because...
Error smaller than 1 ( 6.6282E-01 ).

Accumulated times:
Assembly time:        0.69 s
Solve time:      0.11 s
Total time:      0.80 s

contact        voltage     electron current    hole current  conduction current
 drain        8.000E-02       1.792E-04         6.661E-20        1.792E-04
 gateD        2.250E+00       1.767E-13         9.526E-34        1.767E-13
 gateS        2.250E+00       1.429E-11         2.235E-39        1.429E-11
 source       0.000E+00      -1.792E-04        -7.794E-22       -1.792E-04
 substrate    0.000E+00      -1.050E-10        -1.814E-16       -1.050E-10

Computing step from t=0.9 to t=0.95 (Stepsize: 0.05) :
Extrapolating values for t = 0.95 ... done.
Computing Coupled( 1 poisson-equation(s) , 1 electron-equation(s) , 
                   1 hole-equation(s) ) 
using Bank/Rose nonlinear solver.

Iteration   |Rhs|      factor     |step|     error   #inner  #iterative  time
------------------------------------------------------------------------------
    0      1.73e+06                                                      0.23
    1      6.15e+06   1.00e+00   2.65e-03   1.25e+02    0         1      0.52
    2      3.45e+02   1.00e+00   2.01e-05   4.21e-01    0         1      0.81
Finished, because...
Error smaller than 1 ( 4.2071E-01 ).

Accumulated times:
Assembly time:        0.69 s
Solve time:      0.12 s
Total time:      0.81 s

contact        voltage     electron current    hole current  conduction current
 drain        8.000E-02       1.818E-04         6.675E-20        1.818E-04
 gateD        2.375E+00       4.701E-13         4.742E-33        4.701E-13
 gateS        2.375E+00       5.969E-11         2.839E-38        5.969E-11
 source       0.000E+00      -1.818E-04        -2.990E-22       -1.818E-04
 substrate    0.000E+00      -3.888E-11        -1.816E-16       -3.888E-11

Computing step from t=0.95 to t=1 (Stepsize: 0.05) :
Extrapolating values for t = 1 ... done.
Computing Coupled( 1 poisson-equation(s) , 1 electron-equation(s) , 
                   1 hole-equation(s) ) 
using Bank/Rose nonlinear solver.

Iteration   |Rhs|      factor     |step|     error   #inner  #iterative  time
------------------------------------------------------------------------------
    0      1.57e+06                                                      0.24
    1      4.52e+06   1.00e+00   2.16e-03   1.02e+02    0         1      0.54
    2      1.47e+02   1.00e+00   1.33e-05   2.79e-01    0         1      0.83
Finished, because...
Error smaller than 1 ( 2.7907E-01 ).

Accumulated times:
Assembly time:        0.72 s
Solve time:      0.11 s
Total time:      0.83 s

contact        voltage     electron current    hole current  conduction current
 drain        8.000E-02       1.842E-04         6.682E-20        1.842E-04
 gateD        2.500E+00       1.365E-12         2.485E-32        1.365E-12
 gateS        2.500E+00       2.156E-10         1.418E-37        2.156E-10
 source       0.000E+00      -1.842E-04        -1.278E-22       -1.842E-04
 substrate    0.000E+00      -1.479E-11        -1.817E-16       -1.479E-11


Plot started:
Saving device '':
    Writing plot 'n19_Profile_LowVd_0005_des.tdr' (TDR format) ... done.
Plot finished.


Finished, because...
Curve trace finished.


===============================
Starting solve of next problem:
Quasistationary ( Digits : 5, Max. #iterations : 20, 
      Initial step in t : 0.05, 
      Minimum step in t : 1.0000e-05, Maximum step in t : 0.1, 
      Increment : 1.5, Decrement : 2, 
      Goal values :
        Contact gateD : 0.0000e+00V,
        Contact gateS : 0.0000e+00V
    )
  {
    Coupled ( Digits : 5, Max. #iterations : 20, 
        Solver : blocked decomposition,
        #undamped iterations : 1000 
        )
        { Poisson Electron Hole } 
  }
===============================

Reusing extrapolation from a previous quasistationary

Computing step from t=0.0000e+00 to t=0.05 (Stepsize: 0.05) :
Extrapolating values for t = 0.05 ... done.
Computing Coupled( 1 poisson-equation(s) , 1 electron-equation(s) , 
                   1 hole-equation(s) ) 
using Bank/Rose nonlinear solver.

Iteration   |Rhs|      factor     |step|     error   #inner  #iterative  time
------------------------------------------------------------------------------
    0      3.45e+02                                                      0.23
    1      9.18e-04   1.00e+00   4.06e-09   8.92e-05    0         1      0.53
Finished, because...
Error smaller than 1 ( 8.9236E-05 ).

Accumulated times:
Assembly time:        0.47 s
Solve time:      0.06 s
Total time:      0.53 s

contact        voltage     electron current    hole current  conduction current
 drain        8.000E-02       1.818E-04         6.682E-20        1.818E-04
 gateD        2.375E+00       4.701E-13         4.742E-33        4.701E-13
 gateS        2.375E+00       5.969E-11         2.839E-38        5.969E-11
 source       0.000E+00      -1.818E-04        -2.491E-24       -1.818E-04
 substrate    0.000E+00       3.447E-17        -1.816E-16       -1.471E-16

Computing step from t=0.05 to t=0.125 (Stepsize: 0.075) :
Extrapolating values for t = 0.125 ... done.
Computing Coupled( 1 poisson-equation(s) , 1 electron-equation(s) , 
                   1 hole-equation(s) ) 
using Bank/Rose nonlinear solver.

Iteration   |Rhs|      factor     |step|     error   #inner  #iterative  time
------------------------------------------------------------------------------
    0      1.82e+06                                                      0.22
    1      1.45e+07   1.00e+00   4.17e-03   1.99e+02    0         1      0.51
    2      1.91e+03   1.00e+00   4.95e-05   1.06e+00    0         1      0.79
    3      8.98e-04   1.00e+00   2.87e-08   6.33e-04    0         1      1.08
Finished, because...
Error smaller than 1 ( 6.3304E-04 ).

Accumulated times:
Assembly time:        0.92 s
Solve time:      0.16 s
Total time:      1.08 s

contact        voltage     electron current    hole current  conduction current
 drain        8.000E-02       1.777E-04         6.678E-20        1.777E-04
 gateD        2.188E+00       1.108E-13         4.493E-34        1.108E-13
 gateS        2.188E+00       6.921E-12         8.955E-40        6.921E-12
 source       0.000E+00      -1.777E-04        -2.433E-24       -1.777E-04
 substrate    0.000E+00      -6.772E-17        -1.814E-16       -2.491E-16

Computing step from t=0.125 to t=0.225 (Stepsize: 0.1) :
Extrapolating values for t = 0.225 ... done.
Computing Coupled( 1 poisson-equation(s) , 1 electron-equation(s) , 
                   1 hole-equation(s) ) 
using Bank/Rose nonlinear solver.

Iteration   |Rhs|      factor     |step|     error   #inner  #iterative  time
------------------------------------------------------------------------------
    0      3.38e+06                                                      0.21
    1      7.54e+07   1.00e+00   1.07e-02   5.18e+02    0         1      0.49
    2      6.10e+04   1.00e+00   3.29e-04   7.10e+00    0         1      0.76
    3      3.66e-01   1.00e+00   1.24e-06   2.78e-02    0         1      1.03
Finished, because...
Error smaller than 1 ( 2.7811E-02 ).

Accumulated times:
Assembly time:        0.87 s
Solve time:      0.16 s
Total time:      1.03 s

contact        voltage     electron current    hole current  conduction current
 drain        8.000E-02       1.703E-04         6.669E-20        1.703E-04
 gateD        1.938E+00       1.895E-14         2.815E-35        1.895E-14
 gateS        1.938E+00       6.671E-13         2.401E-41        6.671E-13
 source       0.000E+00      -1.703E-04        -8.226E-24       -1.703E-04
 substrate    0.000E+00      -3.850E-14        -1.810E-16       -3.868E-14

Computing step from t=0.225 to t=0.325 (Stepsize: 0.1) :
Extrapolating values for t = 0.325 ... done.
Computing Coupled( 1 poisson-equation(s) , 1 electron-equation(s) , 
                   1 hole-equation(s) ) 
using Bank/Rose nonlinear solver.

Iteration   |Rhs|      factor     |step|     error   #inner  #iterative  time
------------------------------------------------------------------------------
    0      4.43e+06                                                      0.20
    1      1.69e+08   1.00e+00   1.96e-02   9.68e+02    0         1      0.46
    2      4.09e+05   1.00e+00   1.12e-03   2.41e+01    0         1      0.73
    3      2.72e+01   1.00e+00   1.31e-05   2.99e-01    0         1      0.99
Finished, because...
Error smaller than 1 ( 2.9883E-01 ).

Accumulated times:
Assembly time:        0.83 s
Solve time:      0.15 s
Total time:      0.99 s

contact        voltage     electron current    hole current  conduction current
 drain        8.000E-02       1.594E-04         6.634E-20        1.594E-04
 gateD        1.688E+00       3.570E-15         2.529E-36        3.570E-15
 gateS        1.688E+00       9.852E-14         1.428E-42        9.852E-14
 source       0.000E+00      -1.594E-04        -6.254E-22       -1.594E-04
 substrate    0.000E+00      -2.078E-12        -1.805E-16       -2.079E-12

Computing step from t=0.325 to t=0.425 (Stepsize: 0.1) :
Extrapolating values for t = 0.425 ... done.
Computing Coupled( 1 poisson-equation(s) , 1 electron-equation(s) , 
                   1 hole-equation(s) ) 
using Bank/Rose nonlinear solver.

Iteration   |Rhs|      factor     |step|     error   #inner  #iterative  time
------------------------------------------------------------------------------
    0      4.34e+06                                                      0.19
    1      3.08e+08   1.00e+00   3.83e-02   1.97e+03    0         1      0.44
    2      2.25e+06   1.00e+00   4.36e-03   9.37e+01    0         1      0.69
    3      1.72e+03   1.00e+00   1.59e-04   3.76e+00    0         1      0.94
    4      8.80e-04   1.00e+00   7.85e-08   1.74e-03    0         1      1.19
Finished, because...
Error smaller than 1 ( 1.7369E-03 ).

Accumulated times:
Assembly time:        0.98 s
Solve time:      0.21 s
Total time:      1.19 s

contact        voltage     electron current    hole current  conduction current
 drain        8.000E-02       1.408E-04         6.636E-20        1.408E-04
 gateD        1.438E+00       6.773E-16         3.226E-37        6.773E-16
 gateS        1.438E+00       1.747E-14         9.523E-44        1.747E-14
 source       0.000E+00      -1.408E-04        -1.946E-24       -1.408E-04
 substrate    0.000E+00      -7.437E-18        -1.794E-16       -1.868E-16

Computing step from t=0.425 to t=0.525 (Stepsize: 0.1) :
Extrapolating values for t = 0.525 ... done.
Computing Coupled( 1 poisson-equation(s) , 1 electron-equation(s) , 
                   1 hole-equation(s) ) 
using Bank/Rose nonlinear solver.

Iteration   |Rhs|      factor     |step|     error   #inner  #iterative  time
------------------------------------------------------------------------------
    0      6.83e+06                                                      0.17
    1      5.05e+08   1.00e+00   1.00e-01   6.37e+03    0         1      0.41
    2      2.97e+07   1.00e+00   2.91e-02   7.10e+02    0         1      0.64
    3      3.91e+05   1.00e+00   4.68e-03   1.27e+02    0         1      0.88
    4      1.69e+02   1.00e+00   6.85e-05   1.63e+00    0         1      1.12
    5      4.64e-04   1.00e+00   1.61e-08   4.52e-04    0         1      1.35
Finished, because...
Error smaller than 1 ( 4.5208E-04 ).

Accumulated times:
Assembly time:        1.08 s
Solve time:      0.27 s
Total time:      1.35 s

contact        voltage     electron current    hole current  conduction current
 drain        8.000E-02       9.390E-05         6.584E-20        9.390E-05
 gateD        1.188E+00       1.088E-16         5.783E-38        1.088E-16
 gateS        1.188E+00       3.478E-15         6.427E-45        3.478E-15
 source       0.000E+00      -9.390E-05        -1.281E-24       -9.390E-05
 substrate    0.000E+00      -6.704E-18        -1.757E-16       -1.824E-16

Computing step from t=0.525 to t=0.625 (Stepsize: 0.1) :
Extrapolating values for t = 0.625 ... done.
Computing Coupled( 1 poisson-equation(s) , 1 electron-equation(s) , 
                   1 hole-equation(s) ) 
using Bank/Rose nonlinear solver.

Iteration   |Rhs|      factor     |step|     error   #inner  #iterative  time
------------------------------------------------------------------------------
    0      9.59e+06                                                      0.16
    1      1.38e+08   1.00e+00   4.76e-01   1.05e+06    0         1      0.38
    2      4.50e+07   1.00e+00   2.59e-01   8.52e+03    0         1      0.61
    3      1.24e+08   1.00e+00   5.16e-02   3.37e+03    0         1      0.83
    4      9.18e+07   1.00e+00   9.82e-02   1.43e+04    0         1      1.06
    5      4.21e+09   1.00e+00   1.53e+00   4.30e+06    0         1      1.28
    6      1.21e+09   1.00e+00   1.47e+00   4.93e+07    0         1      1.51
    7      7.56e+08   1.00e+00   1.95e+00   3.87e+06    0         1      1.74
    8      5.33e+07   1.00e+00   7.68e-01   2.21e+04    0         1      1.96
    9      2.99e+07   1.00e+00   4.61e-01   3.17e+03    0         1      2.19
   10      9.65e+07   1.00e+00   6.48e-02   3.52e+03    0         1      2.41
   11      7.46e+07   1.00e+00   3.42e-01   9.92e+04    0         1      2.64
   12      3.63e+07   1.00e+00   2.75e-01   6.53e+03    0         1      2.86
   13      1.40e+08   1.00e+00   1.84e-01   1.04e+04    0         1      3.09
   14      8.61e+07   1.00e+00   1.81e-01   7.18e+05    0         1      3.31
   15      4.69e+07   1.00e+00   2.38e-01   3.42e+04    0         1      3.54
   16      6.52e+07   1.00e+00   1.59e-01   5.14e+05    0         1      3.76
   17      5.62e+07   1.00e+00   1.41e-01   1.61e+04    0         1      3.99
   18      5.30e+07   1.00e+00   1.66e-01   4.41e+05    0         1      4.21
   19      5.23e+07   1.00e+00   1.67e-01   2.66e+04    0         1      4.44
   20      7.08e+07   1.00e+00   1.68e-01   5.37e+05    0         1      4.66
Finished, because...
#iterations larger than 20.

Accumulated times:
Assembly time:        3.58 s
Solve time:      1.07 s
Total time:      4.66 s

Newton didn't converge, trying again with smaller step...

Computing step from t=0.525 to t=0.575 (Stepsize: 0.05) :
Extrapolating values for t = 0.575 ... done.
Computing Coupled( 1 poisson-equation(s) , 1 electron-equation(s) , 
                   1 hole-equation(s) ) 
using Bank/Rose nonlinear solver.

Iteration   |Rhs|      factor     |step|     error   #inner  #iterative  time
------------------------------------------------------------------------------
    0      5.90e+06                                                      0.16
    1      1.32e+08   1.00e+00   1.22e-01   8.01e+03    0         1      0.39
    2      1.75e+07   1.00e+00   2.43e-02   1.05e+03    0         1      0.62
    3      8.70e+05   1.00e+00   2.85e-03   1.26e+02    0         1      0.85
    4      1.41e+03   1.00e+00   5.60e-05   3.30e+00    0         1      1.08
    5      3.12e-03   1.00e+00   5.57e-08   4.03e-03    0         1      1.31
Finished, because...
Error smaller than 1 ( 4.0303E-03 ).

Accumulated times:
Assembly time:        1.04 s
Solve time:      0.26 s
Total time:      1.31 s

contact        voltage     electron current    hole current  conduction current
 drain        8.000E-02       4.261E-05         6.528E-20        4.261E-05
 gateD        1.062E+00       3.684E-17         2.789E-38        3.684E-17
 gateS        1.062E+00       1.619E-15         1.260E-45        1.619E-15
 source       0.000E+00      -4.261E-05        -5.834E-25       -4.261E-05
 substrate    0.000E+00       4.614E-17        -1.704E-16       -1.242E-16

Computing step from t=0.575 to t=0.643333 (Stepsize: 0.0683333) :
Extrapolating values for t = 0.643333 ... done.
Computing Coupled( 1 poisson-equation(s) , 1 electron-equation(s) , 
                   1 hole-equation(s) ) 
using Bank/Rose nonlinear solver.

Iteration   |Rhs|      factor     |step|     error   #inner  #iterative  time
------------------------------------------------------------------------------
    0      9.85e+06                                                      0.16
    1      6.69e+07   1.00e+00   4.13e-01   1.05e+06    0         1      0.38
    2      2.60e+07   1.00e+00   2.56e-01   8.17e+03    0         1      0.60
    3      6.16e+07   1.00e+00   5.13e-02   3.36e+03    0         1      0.82
    4      3.81e+07   1.00e+00   1.01e-01   1.51e+04    0         1      1.05
    5      2.62e+07   1.00e+00   4.52e-01   3.05e+06    0         1      1.27
    6      3.44e+07   1.00e+00   5.05e-01   8.70e+03    0         1      1.49
    7      4.65e+08   1.00e+00   9.59e-01   6.10e+07    0         1      1.72
    8      2.03e+08   1.00e+00   1.14e+00   7.16e+08    0         1      1.94
    9      7.94e+07   1.00e+00   1.40e+00   1.24e+04    0         1      2.16
   10      2.27e+07   1.00e+00   7.72e-01   3.23e+03    0         1      2.38
   11      4.30e+07   1.00e+00   4.43e-02   2.36e+03    0         1      2.61
   12      2.95e+07   1.00e+00   7.90e-02   3.31e+03    0         1      2.83
   13      6.85e+07   1.00e+00   1.34e-01   4.19e+03    0         1      3.05
   14      1.91e+07   1.00e+00   9.59e-02   5.24e+03    0         1      3.27
   15      2.26e+07   1.00e+00   2.00e-02   6.57e+02    0         1      3.50
   16      6.23e+06   1.00e+00   6.60e-03   4.98e+02    0         1      3.72
   17      1.04e+06   1.00e+00   1.72e-03   1.38e+02    0         1      3.94
   18      1.96e+04   1.00e+00   2.61e-04   1.68e+01    0         1      4.17
   19      7.16e+00   1.00e+00   1.23e-05   3.21e-01    0         1      4.39
Finished, because...
Error smaller than 1 ( 3.2089E-01 ).

Accumulated times:
Assembly time:        3.35 s
Solve time:      1.04 s
Total time:      4.39 s

contact        voltage     electron current    hole current  conduction current
 drain        8.000E-02       2.899E-06         6.485E-20        2.899E-06
 gateD        8.917E-01       4.585E-18         1.286E-38        4.585E-18
 gateS        8.917E-01       5.089E-16         6.916E-47        5.089E-16
 source       0.000E+00      -2.899E-06        -4.194E-25       -2.899E-06
 substrate    0.000E+00       4.167E-16        -1.658E-16        2.509E-16

Computing step from t=0.643333 to t=0.711667 (Stepsize: 0.0683333) :
Extrapolating values for t = 0.711667 ... done.
Computing Coupled( 1 poisson-equation(s) , 1 electron-equation(s) , 
                   1 hole-equation(s) ) 
using Bank/Rose nonlinear solver.

Iteration   |Rhs|      factor     |step|     error   #inner  #iterative  time
------------------------------------------------------------------------------
    0      1.00e+07                                                      0.16
    1      1.55e+08   1.00e+00   6.15e-01   1.45e+06    0         1      0.37
    2      2.10e+07   1.00e+00   3.90e-01   1.20e+04    0         1      0.59
    3      1.50e+06   1.00e+00   2.69e-02   2.86e+03    0         1      0.80
    4      1.93e+05   1.00e+00   1.31e-02   9.71e+02    0         1      1.01
    5      1.67e+05   1.00e+00   1.42e-02   2.02e+03    0         1      1.23
    6      2.75e+05   1.00e+00   1.73e-02   1.20e+03    0         1      1.44
    7      1.75e+05   1.00e+00   2.38e-02   4.34e+03    0         1      1.65
    8      2.57e+05   1.00e+00   7.53e-02   1.18e+06    0         1      1.87
    9      1.91e+05   1.00e+00   1.09e-01   2.89e+03    0         1      2.08
   10      1.74e+05   1.00e+00   8.90e-02   1.10e+04    0         1      2.30
   11      8.23e+04   1.00e+00   1.06e-01   1.81e+03    0         1      2.51
   12      1.18e+05   1.00e+00   1.78e-02   2.36e+03    0         1      2.73
   13      1.17e+04   1.00e+00   4.94e-03   4.57e+02    0         1      2.94
   14      4.21e+02   1.00e+00   3.42e-04   3.37e+01    0         1      3.16
   15      1.30e+00   1.00e+00   2.20e-05   2.19e+00    0         1      3.37
   16      4.39e-04   1.00e+00   4.25e-08   4.24e-03    0         1      3.59
Finished, because...
Error smaller than 1 ( 4.2435E-03 ).

Accumulated times:
Assembly time:        2.71 s
Solve time:      0.87 s
Total time:      3.59 s

contact        voltage     electron current    hole current  conduction current
 drain        8.000E-02       5.332E-08         6.482E-20        5.332E-08
 gateD        7.208E-01       1.591E-19         3.339E-38        1.591E-19
 gateS        7.208E-01       1.212E-16         1.419E-47        1.212E-16
 source       0.000E+00      -5.332E-08         2.348E-26       -5.332E-08
 substrate    0.000E+00      -6.859E-19        -1.671E-16       -1.678E-16

Computing step from t=0.711667 to t=0.78 (Stepsize: 0.0683333) :
Extrapolating values for t = 0.78 ... done.
Computing Coupled( 1 poisson-equation(s) , 1 electron-equation(s) , 
                   1 hole-equation(s) ) 
using Bank/Rose nonlinear solver.

Iteration   |Rhs|      factor     |step|     error   #inner  #iterative  time
------------------------------------------------------------------------------
    0      1.06e+06                                                      0.15
    1      1.49e+08   1.00e+00   4.54e-01   1.06e+06    0         1      0.35
    2      2.24e+07   1.00e+00   2.67e-01   8.81e+03    0         1      0.56
    3      2.66e+06   1.00e+00   3.23e-02   2.16e+03    0         1      0.77
    4      2.68e+04   1.00e+00   4.43e-03   3.28e+02    0         1      0.98
    5      1.32e+00   1.00e+00   8.69e-05   6.65e+00    0         1      1.19
    6      4.78e-04   1.00e+00   2.32e-07   1.79e-02    0         1      1.40
Finished, because...
Error smaller than 1 ( 1.7949E-02 ).

Accumulated times:
Assembly time:        1.06 s
Solve time:      0.33 s
Total time:      1.40 s

contact        voltage     electron current    hole current  conduction current
 drain        8.000E-02       6.428E-10         6.482E-20        6.428E-10
 gateD        5.500E-01       1.796E-21         1.078E-38        1.796E-21
 gateS        5.500E-01       1.790E-17         4.928E-48        1.790E-17
 source       0.000E+00      -6.428E-10        -1.580E-26       -6.428E-10
 substrate    0.000E+00      -2.994E-18        -1.700E-16       -1.730E-16

Computing step from t=0.78 to t=0.871111 (Stepsize: 0.0911111) :
Extrapolating values for t = 0.871111 ... done.
Computing Coupled( 1 poisson-equation(s) , 1 electron-equation(s) , 
                   1 hole-equation(s) ) 
using Bank/Rose nonlinear solver.

Iteration   |Rhs|      factor     |step|     error   #inner  #iterative  time
------------------------------------------------------------------------------
    0      3.34e+04                                                      0.14
    1      8.54e+07   1.00e+00   5.27e-01   1.53e+06    0         1      0.34
    2      1.28e+07   1.00e+00   2.89e-01   9.41e+03    0         1      0.54
    3      1.35e+06   1.00e+00   3.14e-02   1.87e+03    0         1      0.75
    4      1.20e+04   1.00e+00   3.55e-03   2.31e+02    0         1      0.95
    5      1.21e+00   1.00e+00   5.73e-05   3.84e+00    0         1      1.15
    6      4.86e-04   1.00e+00   1.38e-08   9.11e-04    0         1      1.35
Finished, because...
Error smaller than 1 ( 9.1051E-04 ).

Accumulated times:
Assembly time:        1.02 s
Solve time:      0.32 s
Total time:      1.35 s

contact        voltage     electron current    hole current  conduction current
 drain        8.000E-02       1.374E-12         6.482E-20        1.374E-12
 gateD        3.222E-01       2.262E-24         2.812E-40        2.262E-24
 gateS        3.222E-01       3.654E-19         1.725E-48        3.654E-19
 source       0.000E+00      -1.374E-12         8.242E-27       -1.374E-12
 substrate    0.000E+00      -2.752E-19        -1.755E-16       -1.758E-16

Computing step from t=0.871111 to t=0.971111 (Stepsize: 0.1) :
Extrapolating values for t = 0.971111 ... done.
Computing Coupled( 1 poisson-equation(s) , 1 electron-equation(s) , 
                   1 hole-equation(s) ) 
using Bank/Rose nonlinear solver.

Iteration   |Rhs|      factor     |step|     error   #inner  #iterative  time
------------------------------------------------------------------------------
    0      4.06e+02                                                      0.13
    1      6.39e+07   1.00e+00   3.47e-01   9.18e+05    0         1      0.32
    2      3.93e+06   1.00e+00   1.99e-01   6.65e+03    0         1      0.52
    3      5.83e+04   1.00e+00   1.99e-02   8.89e+02    0         1      0.71
    4      1.29e+01   1.00e+00   8.14e-04   3.60e+01    0         1      0.91
    5      4.86e-04   1.00e+00   6.48e-06   4.12e-02    0         1      1.10
Finished, because...
Error smaller than 1 ( 4.1237E-02 ).

Accumulated times:
Assembly time:        0.83 s
Solve time:      0.27 s
Total time:      1.10 s

contact        voltage     electron current    hole current  conduction current
 drain        8.000E-02       1.831E-15         6.482E-20        1.831E-15
 gateD        7.222E-02       1.090E-27         5.118E-42        1.090E-27
 gateS        7.222E-02       1.245E-21         2.323E-48        1.245E-21
 source       0.000E+00      -1.653E-15         6.138E-27       -1.653E-15
 substrate    0.000E+00      -2.556E-20        -1.780E-16       -1.780E-16

Computing step from t=0.971111 to t=1 (Stepsize: 0.0288889) :
Extrapolating values for t = 1 ... done.
Computing Coupled( 1 poisson-equation(s) , 1 electron-equation(s) , 
                   1 hole-equation(s) ) 
using Bank/Rose nonlinear solver.

Iteration   |Rhs|      factor     |step|     error   #inner  #iterative  time
------------------------------------------------------------------------------
    0      2.16e-01                                                      0.13
    1      3.91e+06   1.00e+00   2.90e-02   1.84e+03    0         1      0.33
    2      3.21e+04   1.00e+00   1.73e-03   1.02e+02    0         1      0.52
    3      1.88e+00   1.00e+00   1.85e-05   1.02e+00    0         1      0.71
    4      5.06e-04   1.00e+00   2.28e-09   9.48e-05    0         1      0.91
Finished, because...
Error smaller than 1 ( 9.4809E-05 ).

Accumulated times:
Assembly time:        0.70 s
Solve time:      0.21 s
Total time:      0.91 s

contact        voltage     electron current    hole current  conduction current
 drain        8.000E-02       4.291E-16         6.482E-20        4.292E-16
 gateD        0.000E+00      -5.567E-28        -4.561E-45       -5.567E-28
 gateS        0.000E+00      -5.138E-29        -5.321E-58       -5.138E-29
 source       0.000E+00      -2.499E-16         1.766E-26       -2.499E-16
 substrate    0.000E+00      -1.724E-20        -1.793E-16       -1.793E-16


Finished, because...
Curve trace finished.


===============================
Starting solve of next problem:
Quasistationary ( Digits : 5, Max. #iterations : 20, 
      Initial step in t : 0.1, 
      Minimum step in t : 1.0000e-05, Maximum step in t : 1, 
      Increment : 1.5, Decrement : 2, 
      Goal values :
        Contact drain : 0.7V
    )
  {
    Coupled ( Digits : 5, Max. #iterations : 20, 
        Solver : blocked decomposition,
        #undamped iterations : 1000 
        )
        { Poisson Electron Hole } 
  }
===============================

Computing step from t=0.0000e+00 to t=0.1 (Stepsize: 0.1) :
Computing Coupled( 1 poisson-equation(s) , 1 electron-equation(s) , 
                   1 hole-equation(s) ) 
using Bank/Rose nonlinear solver.

Iteration   |Rhs|      factor     |step|     error   #inner  #iterative  time
------------------------------------------------------------------------------
    0      4.66e+10                                                      0.13
    1      7.12e+10   1.00e+00   1.17e+00   1.40e+06    0         1      0.33
    2      2.10e+10   1.00e+00   8.31e-01   1.34e+04    0         1      0.52
    3      3.37e+09   1.00e+00   7.80e-01   2.92e+03    0         1      0.71
    4      1.42e+07   1.00e+00   3.26e-01   3.26e+02    0         1      0.91
    5      1.36e+03   1.00e+00   6.20e-02   2.21e+00    0         1      1.10
    6      4.86e-04   1.00e+00   6.82e-02   3.52e-01    0         1      1.29
Finished, because...
Error smaller than 1 ( 3.5161E-01 ).

Accumulated times:
Assembly time:        0.96 s
Solve time:      0.33 s
Total time:      1.29 s

contact        voltage     electron current    hole current  conduction current
 drain        1.420E-01       5.680E-16         4.718E-20        5.680E-16
 gateD        0.000E+00      -9.996E-28        -1.245E-44       -9.996E-28
 gateS        0.000E+00      -6.004E-29        -8.014E-58       -6.004E-29
 source       0.000E+00      -3.029E-16        -3.892E-26       -3.029E-16
 substrate    0.000E+00      -1.701E-20        -2.651E-16       -2.651E-16

Computing step from t=0.1 to t=0.233333 (Stepsize: 0.133333) :
Extrapolating values for t = 0.233333 ... done.
Computing Coupled( 1 poisson-equation(s) , 1 electron-equation(s) , 
                   1 hole-equation(s) ) 
using Bank/Rose nonlinear solver.

Iteration   |Rhs|      factor     |step|     error   #inner  #iterative  time
------------------------------------------------------------------------------
    0      2.40e-01                                                      0.13
    1      1.14e+06   1.00e+00   4.92e-01   5.14e+02    0         1      0.32
    2      2.10e+02   1.00e+00   5.76e-01   9.51e+00    0         1      0.52
    3      3.91e-04   1.00e+00   1.28e-01   1.80e+00    0         1      0.71
    4      4.91e-04   1.00e+00   3.30e-01   4.20e-01    0         1      0.91
Finished, because...
Error smaller than 1 ( 4.1991E-01 ).

Accumulated times:
Assembly time:        0.70 s
Solve time:      0.21 s
Total time:      0.91 s

contact        voltage     electron current    hole current  conduction current
 drain        2.247E-01       7.521E-16         4.275E-20        7.521E-16
 gateD        0.000E+00      -2.037E-27        -3.968E-45       -2.037E-27
 gateS        0.000E+00      -7.653E-29        -1.141E-57       -7.653E-29
 source       0.000E+00      -3.877E-16        -2.469E-26       -3.877E-16
 substrate    0.000E+00      -1.791E-20        -3.644E-16       -3.645E-16

Computing step from t=0.233333 to t=0.42 (Stepsize: 0.186667) :
Extrapolating values for t = 0.42 ... done.
Computing Coupled( 1 poisson-equation(s) , 1 electron-equation(s) , 
                   1 hole-equation(s) ) 
using Bank/Rose nonlinear solver.

Iteration   |Rhs|      factor     |step|     error   #inner  #iterative  time
------------------------------------------------------------------------------
    0      4.80e-01                                                      0.13
    1      2.74e+06   1.00e+00   4.33e-01   9.41e+02    0         1      0.33
    2      1.41e+03   1.00e+00   7.41e-01   3.38e+01    0         1      0.52
    3      8.59e-04   1.00e+00   1.22e-01   4.83e+00    0         1      0.72
    4      8.59e-04   1.00e+00   2.68e-02   7.10e-01    0         1      0.91
Finished, because...
Error smaller than 1 ( 7.1022E-01 ).

Accumulated times:
Assembly time:        0.69 s
Solve time:      0.22 s
Total time:      0.91 s

contact        voltage     electron current    hole current  conduction current
 drain        3.404E-01       1.031E-15         6.749E-20        1.031E-15
 gateD        0.000E+00      -5.332E-27        -7.385E-45       -5.332E-27
 gateS        0.000E+00      -1.019E-28        -1.644E-57       -1.019E-28
 source       0.000E+00      -5.397E-16         1.468E-26       -5.397E-16
 substrate    0.000E+00       1.840E-19        -4.915E-16       -4.913E-16

Computing step from t=0.42 to t=0.681333 (Stepsize: 0.261333) :
Extrapolating values for t = 0.681333 ... done.
Computing Coupled( 1 poisson-equation(s) , 1 electron-equation(s) , 
                   1 hole-equation(s) ) 
using Bank/Rose nonlinear solver.

Iteration   |Rhs|      factor     |step|     error   #inner  #iterative  time
------------------------------------------------------------------------------
    0      9.23e-01                                                      0.13
    1      9.00e+06   1.00e+00   7.90e-01   1.74e+03    0         1      0.33
    2      1.29e+04   1.00e+00   7.57e-01   1.12e+02    0         1      0.52
    3      6.07e-03   1.00e+00   4.42e-01   7.81e+00    0         1      0.72
    4      8.63e-04   1.00e+00   4.51e-02   1.83e+00    0         1      0.91
    5      8.63e-04   1.00e+00   7.55e-03   3.83e-01    0         1      1.11
Finished, because...
Error smaller than 1 ( 3.8332E-01 ).

Accumulated times:
Assembly time:        0.84 s
Solve time:      0.27 s
Total time:      1.11 s

contact        voltage     electron current    hole current  conduction current
 drain        5.024E-01       1.470E-15         6.746E-20        1.470E-15
 gateD        0.000E+00      -1.951E-26        -8.314E-45       -1.951E-26
 gateS        0.000E+00      -1.567E-28        -2.429E-57       -1.567E-28
 source       0.000E+00      -8.365E-16         3.625E-27       -8.365E-16
 substrate    0.000E+00      -2.724E-21        -6.334E-16       -6.334E-16

Computing step from t=0.681333 to t=1 (Stepsize: 0.318667) :
Extrapolating values for t = 1 ... done.
Computing Coupled( 1 poisson-equation(s) , 1 electron-equation(s) , 
                   1 hole-equation(s) ) 
using Bank/Rose nonlinear solver.

Iteration   |Rhs|      factor     |step|     error   #inner  #iterative  time
------------------------------------------------------------------------------
    0      1.26e+00                                                      0.13
    1      1.90e+07   1.00e+00   3.81e-01   2.51e+03    0         1      0.33
    2      5.49e+04   1.00e+00   2.86e-01   2.05e+02    0         1      0.52
    3      6.80e-01   1.00e+00   6.63e-02   1.05e+01    0         1      0.72
    4      9.93e-04   1.00e+00   1.41e-02   1.56e+00    0         1      0.91
    5      9.93e-04   1.00e+00   1.11e-03   1.40e-01    0         1      1.11
Finished, because...
Error smaller than 1 ( 1.3994E-01 ).

Accumulated times:
Assembly time:        0.84 s
Solve time:      0.27 s
Total time:      1.11 s

contact        voltage     electron current    hole current  conduction current
 drain        7.000E-01       2.233E-15         6.846E-20        2.233E-15
 gateD        0.000E+00      -8.918E-26        -4.919E-44       -8.918E-26
 gateS        0.000E+00      -2.456E-28        -3.846E-57       -2.456E-28
 source       0.000E+00      -1.383E-15         5.578E-27       -1.383E-15
 substrate    0.000E+00      -1.012E-20        -8.496E-16       -8.497E-16


Finished, because...
Curve trace finished.


===============================
Starting solve of next problem:
Quasistationary ( Digits : 5, Max. #iterations : 20, 
      Initial step in t : 0.01, 
      Minimum step in t : 1.0000e-05, Maximum step in t : 0.05, 
      Increment : 1.5, Decrement : 2, 
      DoZero      Goal values :
        Contact gateD : 2.5V,
        Contact gateS : 2.5V
    )
  {
    Coupled ( Digits : 5, Max. #iterations : 20, 
        Solver : blocked decomposition,
        #undamped iterations : 1000 
        )
        { Poisson Electron Hole } 
    Plot( FilePrefix = "n19_Profile_HighVd" nooverwrite -loadable
         Time (fixed times:
             0.0000e+00 0.2 0.3 0.4 0.5
             1) )
      { }
  }
===============================

Computing solution for t=0 :
Computing Coupled( 1 poisson-equation(s) , 1 electron-equation(s) , 
                   1 hole-equation(s) ) 
using Bank/Rose nonlinear solver.

Iteration   |Rhs|      factor     |step|     error   #inner  #iterative  time
------------------------------------------------------------------------------
    0      9.93e-04                                                      0.00
    1      9.93e-04   1.00e+00   6.41e-06   6.96e-04    0         1      0.20
Finished, because...
Error smaller than 1 ( 6.9566E-04 ).

Accumulated times:
Assembly time:        0.14 s
Solve time:      0.06 s
Total time:      0.20 s

contact        voltage     electron current    hole current  conduction current
 drain        7.000E-01       2.233E-15         6.846E-20        2.233E-15
 gateD        0.000E+00      -8.918E-26        -4.919E-44       -8.918E-26
 gateS        0.000E+00      -2.456E-28        -3.846E-57       -2.456E-28
 source       0.000E+00      -1.383E-15         3.577E-27       -1.383E-15
 substrate    0.000E+00      -1.788E-20        -8.496E-16       -8.497E-16


Plot started:
Saving device '':
    Writing plot 'n19_Profile_HighVd_0000_des.tdr' (TDR format) ... done.
Plot finished.

Computing step from t=0.0000e+00 to t=0.01 (Stepsize: 0.01) :
Computing Coupled( 1 poisson-equation(s) , 1 electron-equation(s) , 
                   1 hole-equation(s) ) 
using Bank/Rose nonlinear solver.

Iteration   |Rhs|      factor     |step|     error   #inner  #iterative  time
------------------------------------------------------------------------------
    0      5.44e+01                                                      0.14
    1      6.39e+06   1.00e+00   2.84e-01   2.58e+04    0         1      0.33
    2      6.13e+04   1.00e+00   6.94e-02   4.58e+03    0         1      0.53
    3      2.26e+00   1.00e+00   2.64e-03   2.24e+02    0         1      0.72
    4      5.83e-04   1.00e+00   5.56e-06   4.91e-01    0         1      0.92
Finished, because...
Error smaller than 1 ( 4.9064E-01 ).

Accumulated times:
Assembly time:        0.70 s
Solve time:      0.22 s
Total time:      0.92 s

contact        voltage     electron current    hole current  conduction current
 drain        7.000E-01       3.569E-15         6.846E-20        3.569E-15
 gateD        2.500E-02      -6.358E-26        -2.686E-44       -6.358E-26
 gateS        2.500E-02       2.985E-22         1.534E-48        2.985E-22
 source       0.000E+00      -2.721E-15         1.336E-27       -2.721E-15
 substrate    0.000E+00      -1.676E-20        -8.484E-16       -8.484E-16

Computing step from t=0.01 to t=0.024 (Stepsize: 0.014) :
Extrapolating values for t = 0.024 ... done.
Computing Coupled( 1 poisson-equation(s) , 1 electron-equation(s) , 
                   1 hole-equation(s) ) 
using Bank/Rose nonlinear solver.

Iteration   |Rhs|      factor     |step|     error   #inner  #iterative  time
------------------------------------------------------------------------------
    0      1.08e-02                                                      0.13
    1      5.83e+04   1.00e+00   4.36e-03   1.50e+02    0         1      0.33
    2      4.06e+00   1.00e+00   2.08e-04   5.83e-01    0         1      0.53
Finished, because...
Error smaller than 1 ( 5.8309E-01 ).

Accumulated times:
Assembly time:        0.43 s
Solve time:      0.10 s
Total time:      0.53 s

contact        voltage     electron current    hole current  conduction current
 drain        7.000E-01       7.907E-15         6.671E-20        7.907E-15
 gateD        6.000E-02      -3.870E-26        -5.754E-45       -3.870E-26
 gateS        6.000E-02       1.000E-21         2.563E-48        1.000E-21
 source       0.000E+00      -7.957E-15        -4.085E-23       -7.957E-15
 substrate    0.000E+00       8.969E-16        -8.468E-16        5.017E-17

Computing step from t=0.024 to t=0.0445333 (Stepsize: 0.0205333) :
Extrapolating values for t = 0.0445333 ... done.
Computing Coupled( 1 poisson-equation(s) , 1 electron-equation(s) , 
                   1 hole-equation(s) ) 
using Bank/Rose nonlinear solver.

Iteration   |Rhs|      factor     |step|     error   #inner  #iterative  time
------------------------------------------------------------------------------
    0      1.39e+01                                                      0.14
    1      2.77e+05   1.00e+00   1.10e-02   3.04e+02    0         1      0.34
    2      9.74e+01   1.00e+00   1.21e-03   2.51e+00    0         1      0.53
    3      8.07e-04   1.00e+00   2.67e-05   7.26e-04    0         1      0.73
Finished, because...
Error smaller than 1 ( 7.2601E-04 ).

Accumulated times:
Assembly time:        0.56 s
Solve time:      0.17 s
Total time:      0.73 s

contact        voltage     electron current    hole current  conduction current
 drain        7.000E-01       2.975E-14         6.844E-20        2.975E-14
 gateD        1.113E-01      -1.279E-26         2.738E-44       -1.279E-26
 gateS        1.113E-01       3.679E-21         1.039E-48        3.679E-21
 source       0.000E+00      -2.891E-14         4.546E-27       -2.891E-14
 substrate    0.000E+00      -1.391E-20        -8.444E-16       -8.444E-16

Computing step from t=0.0445333 to t=0.0739644 (Stepsize: 0.0294311) :
Extrapolating values for t = 0.0739644 ... done.
Computing Coupled( 1 poisson-equation(s) , 1 electron-equation(s) , 
                   1 hole-equation(s) ) 
using Bank/Rose nonlinear solver.

Iteration   |Rhs|      factor     |step|     error   #inner  #iterative  time
------------------------------------------------------------------------------
    0      1.19e+01                                                      0.13
    1      1.98e+06   1.00e+00   2.22e-02   6.25e+02    0         1      0.33
    2      5.57e+03   1.00e+00   3.07e-03   1.25e+01    0         1      0.53
    3      3.84e-03   1.00e+00   9.47e-05   4.79e-02    0         1      0.73
Finished, because...
Error smaller than 1 ( 4.7859E-02 ).

Accumulated times:
Assembly time:        0.56 s
Solve time:      0.17 s
Total time:      0.73 s

contact        voltage     electron current    hole current  conduction current
 drain        7.000E-01       2.228E-13         6.810E-20        2.228E-13
 gateD        1.849E-01       6.412E-26         1.065E-43        6.412E-26
 gateS        1.849E-01       2.054E-20         1.041E-48        2.054E-20
 source       0.000E+00      -2.220E-13        -3.148E-26       -2.220E-13
 substrate    0.000E+00       5.760E-19        -8.408E-16       -8.402E-16

Computing step from t=0.0739644 to t=0.116149 (Stepsize: 0.0421846) :
Extrapolating values for t = 0.116149 ... done.
Computing Coupled( 1 poisson-equation(s) , 1 electron-equation(s) , 
                   1 hole-equation(s) ) 
using Bank/Rose nonlinear solver.

Iteration   |Rhs|      factor     |step|     error   #inner  #iterative  time
------------------------------------------------------------------------------
    0      3.54e+00                                                      0.14
    1      1.36e+07   1.00e+00   5.81e-02   1.55e+03    0         1      0.34
    2      2.98e+05   1.00e+00   2.47e-02   8.86e+01    0         1      0.54
    3      1.27e+01   1.00e+00   7.13e-03   1.87e+00    0         1      0.74
    4      9.56e-04   1.00e+00   2.86e-04   3.33e-03    0         1      0.94
Finished, because...
Error smaller than 1 ( 3.3269E-03 ).

Accumulated times:
Assembly time:        0.73 s
Solve time:      0.21 s
Total time:      0.94 s

contact        voltage     electron current    hole current  conduction current
 drain        7.000E-01       4.230E-12         6.840E-20        4.230E-12
 gateD        2.904E-01       1.784E-24         3.993E-43        1.784E-24
 gateS        2.904E-01       2.135E-19         1.506E-48        2.135E-19
 source       0.000E+00      -4.229E-12         3.611E-27       -4.229E-12
 substrate    0.000E+00       1.097E-19        -8.299E-16       -8.298E-16

Computing step from t=0.116149 to t=0.166149 (Stepsize: 0.05) :
Extrapolating values for t = 0.166149 ... done.
Computing Coupled( 1 poisson-equation(s) , 1 electron-equation(s) , 
                   1 hole-equation(s) ) 
using Bank/Rose nonlinear solver.

Iteration   |Rhs|      factor     |step|     error   #inner  #iterative  time
------------------------------------------------------------------------------
    0      1.26e+02                                                      0.14
    1      6.11e+07   1.00e+00   1.13e-01   3.70e+03    0         1      0.34
    2      1.50e+06   1.00e+00   5.48e-02   3.26e+02    0         1      0.54
    3      1.64e+03   1.00e+00   2.19e-02   7.04e+01    0         1      0.75
    4      5.89e-04   1.00e+00   5.11e-03   7.08e-01    0         1      0.95
Finished, because...
Error smaller than 1 ( 7.0836E-01 ).

Accumulated times:
Assembly time:        0.73 s
Solve time:      0.22 s
Total time:      0.95 s

contact        voltage     electron current    hole current  conduction current
 drain        7.000E-01       1.410E-10         5.414E-20        1.410E-10
 gateD        4.154E-01       7.842E-23         1.754E-42        7.842E-23
 gateS        4.154E-01       2.498E-18         2.500E-48        2.498E-18
 source       0.000E+00      -1.410E-10         1.748E-26       -1.410E-10
 substrate    0.000E+00       1.814E-17        -7.927E-16       -7.746E-16

Computing step from t=0.166149 to t=0.2 (Stepsize: 0.033851) :
Extrapolating values for t = 0.2 ... done.
Computing Coupled( 1 poisson-equation(s) , 1 electron-equation(s) , 
                   1 hole-equation(s) ) 
using Bank/Rose nonlinear solver.

Iteration   |Rhs|      factor     |step|     error   #inner  #iterative  time
------------------------------------------------------------------------------
    0      1.59e+03                                                      0.14
    1      8.92e+07   1.00e+00   8.06e-02   3.65e+03    0         1      0.35
    2      1.89e+07   1.00e+00   1.46e-02   2.95e+02    0         1      0.55
    3      2.59e+05   1.00e+00   4.89e-04   2.28e+01    0         1      0.76
    4      5.07e+01   1.00e+00   6.68e-06   3.77e-01    0         1      0.97
Finished, because...
Error smaller than 1 ( 3.7718E-01 ).

Accumulated times:
Assembly time:        0.75 s
Solve time:      0.21 s
Total time:      0.97 s

contact        voltage     electron current    hole current  conduction current
 drain        7.000E-01       1.494E-09         6.846E-20        1.494E-09
 gateD        5.000E-01       9.647E-22         5.039E-42        9.647E-22
 gateS        5.000E-01       9.888E-18         3.745E-48        9.888E-18
 source       0.000E+00      -1.485E-09         9.620E-26       -1.485E-09
 substrate    0.000E+00      -9.689E-12        -7.736E-16       -9.689E-12


Plot started:
Saving device '':
    Writing plot 'n19_Profile_HighVd_0001_des.tdr' (TDR format) ... done.
Plot finished.

Computing step from t=0.2 to t=0.25 (Stepsize: 0.05) :
Extrapolating values for t = 0.25 ... done.
Computing Coupled( 1 poisson-equation(s) , 1 electron-equation(s) , 
                   1 hole-equation(s) ) 
using Bank/Rose nonlinear solver.

Iteration   |Rhs|      factor     |step|     error   #inner  #iterative  time
------------------------------------------------------------------------------
    0      5.84e+04                                                      0.14
    1      3.58e+08   1.00e+00   1.10e-01   1.01e+04    0         1      0.35
    2      3.79e+08   1.00e+00   4.72e-02   1.26e+03    0         1      0.56
    3      2.06e+08   1.00e+00   2.32e-02   9.65e+02    0         1      0.77
    4      6.81e+07   1.00e+00   1.12e-02   6.77e+02    0         1      0.98
    5      3.74e+06   1.00e+00   2.00e-03   1.38e+02    0         1      1.19
    6      1.91e+04   1.00e+00   1.09e-04   8.03e+00    0         1      1.40
    7      5.25e-01   1.00e+00   2.68e-07   2.35e-02    0         1      1.61
Finished, because...
Error smaller than 1 ( 2.3474E-02 ).

Accumulated times:
Assembly time:        1.19 s
Solve time:      0.42 s
Total time:      1.61 s

contact        voltage     electron current    hole current  conduction current
 drain        7.000E-01       4.505E-08         6.846E-20        4.505E-08
 gateD        6.250E-01       3.218E-20         2.798E-41        3.218E-20
 gateS        6.250E-01       4.936E-17         7.547E-48        4.936E-17
 source       0.000E+00      -4.505E-08         4.522E-27       -4.505E-08
 substrate    0.000E+00      -6.366E-18        -7.570E-16       -7.634E-16

Computing step from t=0.25 to t=0.3 (Stepsize: 0.05) :
Extrapolating values for t = 0.3 ... done.
Computing Coupled( 1 poisson-equation(s) , 1 electron-equation(s) , 
                   1 hole-equation(s) ) 
using Bank/Rose nonlinear solver.

Iteration   |Rhs|      factor     |step|     error   #inner  #iterative  time
------------------------------------------------------------------------------
    0      1.44e+06                                                      0.15
    1      4.81e+08   1.00e+00   1.46e-01   1.59e+04    0         1      0.37
    2      8.78e+07   1.00e+00   6.44e-02   1.60e+03    0         1      0.58
    3      4.95e+06   1.00e+00   1.10e-02   3.25e+02    0         1      0.80
    4      1.46e+04   1.00e+00   1.44e-03   2.85e+01    0         1      1.01
    5      1.79e-01   1.00e+00   2.12e-05   3.81e-02    0         1      1.23
Finished, because...
Error smaller than 1 ( 3.8107E-02 ).

Accumulated times:
Assembly time:        0.96 s
Solve time:      0.26 s
Total time:      1.23 s

contact        voltage     electron current    hole current  conduction current
 drain        7.000E-01       1.103E-06         6.847E-20        1.103E-06
 gateD        7.500E-01       6.482E-19         1.940E-40        6.482E-19
 gateS        7.500E-01       1.699E-16         1.741E-47        1.699E-16
 source       0.000E+00      -1.103E-06        -2.206E-26       -1.103E-06
 substrate    0.000E+00      -6.869E-18        -7.455E-16       -7.523E-16


Plot started:
Saving device '':
    Writing plot 'n19_Profile_HighVd_0002_des.tdr' (TDR format) ... done.
Plot finished.

Computing step from t=0.3 to t=0.35 (Stepsize: 0.05) :
Extrapolating values for t = 0.35 ... done.
Computing Coupled( 1 poisson-equation(s) , 1 electron-equation(s) , 
                   1 hole-equation(s) ) 
using Bank/Rose nonlinear solver.

Iteration   |Rhs|      factor     |step|     error   #inner  #iterative  time
------------------------------------------------------------------------------
    0      3.52e+07                                                      0.15
    1      3.23e+08   1.00e+00   1.73e-01   2.11e+04    0         1      0.37
    2      5.01e+08   1.00e+00   6.67e-02   2.49e+03    0         1      0.59
    3      3.18e+08   1.00e+00   3.50e-02   1.88e+03    0         1      0.81
    4      2.08e+08   1.00e+00   1.98e-02   1.10e+03    0         1      1.03
    5      5.82e+07   1.00e+00   6.16e-03   4.16e+02    0         1      1.25
    6      2.87e+06   1.00e+00   1.09e-03   8.85e+01    0         1      1.47
    7      6.03e+04   1.00e+00   1.24e-04   1.08e+01    0         1      1.69
    8      1.29e+01   1.00e+00   2.80e-06   2.11e-01    0         1      1.91
Finished, because...
Error smaller than 1 ( 2.1111E-01 ).

Accumulated times:
Assembly time:        1.50 s
Solve time:      0.41 s
Total time:      1.91 s

contact        voltage     electron current    hole current  conduction current
 drain        7.000E-01       1.564E-05         6.862E-20        1.564E-05
 gateD        8.750E-01       5.680E-18         1.874E-39        5.680E-18
 gateS        8.750E-01       4.572E-16         5.378E-47        4.572E-16
 source       0.000E+00      -1.564E-05        -6.700E-25       -1.564E-05
 substrate    0.000E+00      -4.504E-17        -7.412E-16       -7.863E-16

Computing step from t=0.35 to t=0.4 (Stepsize: 0.05) :
Extrapolating values for t = 0.4 ... done.
Computing Coupled( 1 poisson-equation(s) , 1 electron-equation(s) , 
                   1 hole-equation(s) ) 
using Bank/Rose nonlinear solver.

Iteration   |Rhs|      factor     |step|     error   #inner  #iterative  time
------------------------------------------------------------------------------
    0      2.03e+08                                                      0.17
    1      1.52e+08   1.00e+00   2.16e-01   3.15e+04    0         1      0.39
    2      1.68e+08   1.00e+00   7.07e-02   2.58e+03    0         1      0.62
    3      4.73e+07   1.00e+00   1.89e-02   9.24e+02    0         1      0.84
    4      1.42e+06   1.00e+00   4.74e-04   1.82e+01    0         1      1.06
    5      2.21e+03   1.00e+00   4.82e-05   2.47e+00    0         1      1.29
    6      6.08e-03   1.00e+00   4.30e-08   2.21e-03    0         1      1.51
Finished, because...
Error smaller than 1 ( 2.2114E-03 ).

Accumulated times:
Assembly time:        1.18 s
Solve time:      0.33 s
Total time:      1.51 s

contact        voltage     electron current    hole current  conduction current
 drain        7.000E-01       7.396E-05         6.922E-20        7.396E-05
 gateD        1.000E+00       2.192E-17         7.469E-39        2.192E-17
 gateS        1.000E+00       1.017E-15         3.355E-46        1.017E-15
 source       0.000E+00      -7.396E-05        -9.876E-25       -7.396E-05
 substrate    0.000E+00       1.071E-17        -7.475E-16       -7.368E-16


Plot started:
Saving device '':
    Writing plot 'n19_Profile_HighVd_0003_des.tdr' (TDR format) ... done.
Plot finished.

Computing step from t=0.4 to t=0.45 (Stepsize: 0.05) :
Extrapolating values for t = 0.45 ... done.
Computing Coupled( 1 poisson-equation(s) , 1 electron-equation(s) , 
                   1 hole-equation(s) ) 
using Bank/Rose nonlinear solver.

Iteration   |Rhs|      factor     |step|     error   #inner  #iterative  time
------------------------------------------------------------------------------
    0      2.33e+08                                                      0.17
    1      6.12e+07   1.00e+00   1.29e-01   1.29e+04    0         1      0.40
    2      9.18e+06   1.00e+00   2.57e-02   6.98e+02    0         1      0.63
    3      1.41e+05   1.00e+00   2.04e-03   6.71e+01    0         1      0.85
    4      3.52e+01   1.00e+00   1.99e-05   6.65e-01    0         1      1.08
Finished, because...
Error smaller than 1 ( 6.6489E-01 ).

Accumulated times:
Assembly time:        0.86 s
Solve time:      0.22 s
Total time:      1.08 s

contact        voltage     electron current    hole current  conduction current
 drain        7.000E-01       1.664E-04         7.021E-20        1.664E-04
 gateD        1.125E+00       5.580E-17         1.570E-38        5.580E-17
 gateS        1.125E+00       2.046E-15         2.252E-45        2.046E-15
 source       0.000E+00      -1.664E-04        -7.987E-22       -1.664E-04
 substrate    0.000E+00      -8.491E-14        -7.596E-16       -8.567E-14

Computing step from t=0.45 to t=0.5 (Stepsize: 0.05) :
Extrapolating values for t = 0.5 ... done.
Computing Coupled( 1 poisson-equation(s) , 1 electron-equation(s) , 
                   1 hole-equation(s) ) 
using Bank/Rose nonlinear solver.

Iteration   |Rhs|      factor     |step|     error   #inner  #iterative  time
------------------------------------------------------------------------------
    0      9.04e+07                                                      0.17
    1      2.09e+07   1.00e+00   5.95e-02   4.26e+03    0         1      0.40
    2      4.32e+05   1.00e+00   5.42e-03   1.44e+02    0         1      0.64
    3      1.76e+02   1.00e+00   8.83e-05   2.41e+00    0         1      0.87
    4      6.84e-04   1.00e+00   2.29e-08   6.14e-04    0         1      1.10
Finished, because...
Error smaller than 1 ( 6.1447E-04 ).

Accumulated times:
Assembly time:        0.89 s
Solve time:      0.21 s
Total time:      1.10 s

contact        voltage     electron current    hole current  conduction current
 drain        7.000E-01       2.735E-04         7.138E-20        2.735E-04
 gateD        1.250E+00       1.193E-16         3.519E-38        1.193E-16
 gateS        1.250E+00       3.945E-15         8.309E-45        3.945E-15
 source       0.000E+00      -2.735E-04        -3.795E-24       -2.735E-04
 substrate    0.000E+00       1.241E-17        -7.726E-16       -7.602E-16


Plot started:
Saving device '':
    Writing plot 'n19_Profile_HighVd_0004_des.tdr' (TDR format) ... done.
Plot finished.

Computing step from t=0.5 to t=0.55 (Stepsize: 0.05) :
Extrapolating values for t = 0.55 ... done.
Computing Coupled( 1 poisson-equation(s) , 1 electron-equation(s) , 
                   1 hole-equation(s) ) 
using Bank/Rose nonlinear solver.

Iteration   |Rhs|      factor     |step|     error   #inner  #iterative  time
------------------------------------------------------------------------------
    0      6.26e+07                                                      0.18
    1      9.39e+06   1.00e+00   3.55e-02   1.92e+03    0         1      0.42
    2      4.07e+04   1.00e+00   2.00e-03   4.21e+01    0         1      0.66
    3      8.85e-01   1.00e+00   2.20e-05   1.93e-01    0         1      0.89
Finished, because...
Error smaller than 1 ( 1.9281E-01 ).

Accumulated times:
Assembly time:        0.73 s
Solve time:      0.16 s
Total time:      0.89 s

contact        voltage     electron current    hole current  conduction current
 drain        7.000E-01       3.860E-04         7.265E-20        3.860E-04
 gateD        1.375E+00       2.346E-16         2.759E-38        2.346E-16
 gateS        1.375E+00       7.465E-15         2.446E-44        7.465E-15
 source       0.000E+00      -3.860E-04        -9.723E-23       -3.860E-04
 substrate    0.000E+00      -7.506E-15        -7.846E-16       -8.291E-15

Computing step from t=0.55 to t=0.6 (Stepsize: 0.05) :
Extrapolating values for t = 0.6 ... done.
Computing Coupled( 1 poisson-equation(s) , 1 electron-equation(s) , 
                   1 hole-equation(s) ) 
using Bank/Rose nonlinear solver.

Iteration   |Rhs|      factor     |step|     error   #inner  #iterative  time
------------------------------------------------------------------------------
    0      4.49e+07                                                      0.18
    1      5.65e+06   1.00e+00   2.88e-02   1.08e+03    0         1      0.43
    2      6.50e+03   1.00e+00   1.26e-03   1.65e+01    0         1      0.67
    3      1.43e-02   1.00e+00   1.67e-05   2.99e-02    0         1      0.91
Finished, because...
Error smaller than 1 ( 2.9934E-02 ).

Accumulated times:
Assembly time:        0.75 s
Solve time:      0.16 s
Total time:      0.91 s

contact        voltage     electron current    hole current  conduction current
 drain        7.000E-01       4.991E-04         7.395E-20        4.991E-04
 gateD        1.500E+00       4.409E-16         5.296E-38        4.409E-16
 gateS        1.500E+00       1.401E-14         7.211E-44        1.401E-14
 source       0.000E+00      -4.991E-04        -9.392E-24       -4.991E-04
 substrate    0.000E+00      -1.374E-16        -7.951E-16       -9.325E-16

Computing step from t=0.6 to t=0.65 (Stepsize: 0.05) :
Extrapolating values for t = 0.65 ... done.
Computing Coupled( 1 poisson-equation(s) , 1 electron-equation(s) , 
                   1 hole-equation(s) ) 
using Bank/Rose nonlinear solver.

Iteration   |Rhs|      factor     |step|     error   #inner  #iterative  time
------------------------------------------------------------------------------
    0      3.04e+07                                                      0.19
    1      4.69e+06   1.00e+00   2.79e-02   7.28e+02    0         1      0.44
    2      1.95e+03   1.00e+00   9.52e-04   1.04e+01    0         1      0.70
    3      1.30e-03   1.00e+00   1.16e-05   1.69e-02    0         1      0.95
Finished, because...
Error smaller than 1 ( 1.6946E-02 ).

Accumulated times:
Assembly time:        0.79 s
Solve time:      0.16 s
Total time:      0.95 s

contact        voltage     electron current    hole current  conduction current
 drain        7.000E-01       6.098E-04         7.526E-20        6.098E-04
 gateD        1.625E+00       8.087E-16         1.122E-37        8.087E-16
 gateS        1.625E+00       2.631E-14         2.271E-43        2.631E-14
 source       0.000E+00      -6.098E-04        -8.946E-24       -6.098E-04
 substrate    0.000E+00       9.504E-17        -8.038E-16       -7.087E-16

Computing step from t=0.65 to t=0.7 (Stepsize: 0.05) :
Extrapolating values for t = 0.7 ... done.
Computing Coupled( 1 poisson-equation(s) , 1 electron-equation(s) , 
                   1 hole-equation(s) ) 
using Bank/Rose nonlinear solver.

Iteration   |Rhs|      factor     |step|     error   #inner  #iterative  time
------------------------------------------------------------------------------
    0      4.49e+07                                                      0.20
    1      4.87e+06   1.00e+00   2.97e-02   6.55e+02    0         1      0.46
    2      2.96e+03   1.00e+00   9.11e-04   2.05e+01    0         1      0.71
    3      2.04e-03   1.00e+00   6.26e-06   2.62e-02    0         1      0.97
Finished, because...
Error smaller than 1 ( 2.6241E-02 ).

Accumulated times:
Assembly time:        0.80 s
Solve time:      0.17 s
Total time:      0.97 s

contact        voltage     electron current    hole current  conduction current
 drain        7.000E-01       7.149E-04         7.651E-20        7.149E-04
 gateD        1.750E+00       1.471E-15         2.597E-37        1.471E-15
 gateS        1.750E+00       4.986E-14         6.197E-43        4.986E-14
 source       0.000E+00      -7.149E-04        -1.048E-23       -7.149E-04
 substrate    0.000E+00       3.100E-17        -8.108E-16       -7.798E-16

Computing step from t=0.7 to t=0.75 (Stepsize: 0.05) :
Extrapolating values for t = 0.75 ... done.
Computing Coupled( 1 poisson-equation(s) , 1 electron-equation(s) , 
                   1 hole-equation(s) ) 
using Bank/Rose nonlinear solver.

Iteration   |Rhs|      factor     |step|     error   #inner  #iterative  time
------------------------------------------------------------------------------
    0      1.26e+08                                                      0.20
    1      2.48e+07   1.00e+00   3.95e-02   8.37e+02    0         1      0.46
    2      2.17e+05   1.00e+00   2.21e-03   7.66e+01    0         1      0.72
    3      4.59e+01   1.00e+00   1.59e-05   5.76e-01    0         1      0.99
Finished, because...
Error smaller than 1 ( 5.7646E-01 ).

Accumulated times:
Assembly time:        0.83 s
Solve time:      0.16 s
Total time:      0.99 s

contact        voltage     electron current    hole current  conduction current
 drain        7.000E-01       8.101E-04         7.766E-20        8.101E-04
 gateD        1.875E+00       2.715E-15         6.719E-37        2.715E-15
 gateS        1.875E+00       9.686E-14         1.632E-42        9.686E-14
 source       0.000E+00      -8.101E-04        -4.226E-23       -8.101E-04
 substrate    0.000E+00       9.855E-12        -8.162E-16        9.854E-12

Computing step from t=0.75 to t=0.8 (Stepsize: 0.05) :
Extrapolating values for t = 0.8 ... done.
Computing Coupled( 1 poisson-equation(s) , 1 electron-equation(s) , 
                   1 hole-equation(s) ) 
using Bank/Rose nonlinear solver.

Iteration   |Rhs|      factor     |step|     error   #inner  #iterative  time
------------------------------------------------------------------------------
    0      3.38e+08                                                      0.21
    1      1.16e+08   1.00e+00   6.01e-02   1.19e+03    0         1      0.48
    2      7.68e+06   1.00e+00   7.91e-03   2.06e+02    0         1      0.75
    3      2.59e+04   1.00e+00   2.93e-04   8.38e+00    0         1      1.01
    4      6.07e-01   1.00e+00   9.66e-07   2.80e-02    0         1      1.28
Finished, because...
Error smaller than 1 ( 2.7979E-02 ).

Accumulated times:
Assembly time:        1.06 s
Solve time:      0.22 s
Total time:      1.28 s

contact        voltage     electron current    hole current  conduction current
 drain        7.000E-01       8.886E-04         7.861E-20        8.886E-04
 gateD        2.000E+00       5.247E-15         1.954E-36        5.247E-15
 gateS        2.000E+00       1.992E-13         4.703E-42        1.992E-13
 source       0.000E+00      -8.886E-04        -1.337E-23       -8.886E-04
 substrate    0.000E+00       1.643E-13        -8.200E-16        1.635E-13

Computing step from t=0.8 to t=0.85 (Stepsize: 0.05) :
Extrapolating values for t = 0.85 ... done.
Computing Coupled( 1 poisson-equation(s) , 1 electron-equation(s) , 
                   1 hole-equation(s) ) 
using Bank/Rose nonlinear solver.

Iteration   |Rhs|      factor     |step|     error   #inner  #iterative  time
------------------------------------------------------------------------------
    0      2.30e+08                                                      0.20
    1      5.63e+07   1.00e+00   6.87e-02   1.33e+03    0         1      0.48
    2      4.41e+06   1.00e+00   1.02e-02   2.25e+02    0         1      0.75
    3      1.20e+04   1.00e+00   2.78e-04   6.76e+00    0         1      1.02
    4      9.26e-02   1.00e+00   4.67e-07   1.21e-02    0         1      1.29
Finished, because...
Error smaller than 1 ( 1.2090E-02 ).

Accumulated times:
Assembly time:        1.07 s
Solve time:      0.22 s
Total time:      1.29 s

contact        voltage     electron current    hole current  conduction current
 drain        7.000E-01       9.480E-04         7.933E-20        9.480E-04
 gateD        2.125E+00       1.079E-14         6.259E-36        1.079E-14
 gateS        2.125E+00       4.467E-13         1.594E-41        4.467E-13
 source       0.000E+00      -9.480E-04        -1.416E-23       -9.480E-04
 substrate    0.000E+00       2.278E-14        -8.225E-16        2.196E-14

Computing step from t=0.85 to t=0.9 (Stepsize: 0.05) :
Extrapolating values for t = 0.9 ... done.
Computing Coupled( 1 poisson-equation(s) , 1 electron-equation(s) , 
                   1 hole-equation(s) ) 
using Bank/Rose nonlinear solver.

Iteration   |Rhs|      factor     |step|     error   #inner  #iterative  time
------------------------------------------------------------------------------
    0      9.14e+07                                                      0.21
    1      1.58e+07   1.00e+00   5.52e-02   1.06e+03    0         1      0.49
    2      3.24e+05   1.00e+00   5.72e-03   1.17e+02    0         1      0.77
    3      1.56e+02   1.00e+00   5.45e-05   1.14e+00    0         1      1.04
    4      2.17e-03   1.00e+00   7.39e-09   1.72e-04    0         1      1.32
Finished, because...
Error smaller than 1 ( 1.7225E-04 ).

Accumulated times:
Assembly time:        1.11 s
Solve time:      0.21 s
Total time:      1.32 s

contact        voltage     electron current    hole current  conduction current
 drain        7.000E-01       9.924E-04         7.987E-20        9.924E-04
 gateD        2.250E+00       2.339E-14         2.183E-35        2.339E-14
 gateS        2.250E+00       1.110E-12         6.584E-41        1.110E-12
 source       0.000E+00      -9.924E-04        -1.480E-23       -9.924E-04
 substrate    0.000E+00      -4.666E-17        -8.243E-16       -8.709E-16

Computing step from t=0.9 to t=0.95 (Stepsize: 0.05) :
Extrapolating values for t = 0.95 ... done.
Computing Coupled( 1 poisson-equation(s) , 1 electron-equation(s) , 
                   1 hole-equation(s) ) 
using Bank/Rose nonlinear solver.

Iteration   |Rhs|      factor     |step|     error   #inner  #iterative  time
------------------------------------------------------------------------------
    0      4.01e+07                                                      0.23
    1      8.87e+06   1.00e+00   3.84e-02   7.35e+02    0         1      0.51
    2      3.46e+04   1.00e+00   2.54e-03   5.03e+01    0         1      0.79
    3      9.58e-01   1.00e+00   8.36e-06   1.56e-01    0         1      1.08
Finished, because...
Error smaller than 1 ( 1.5637E-01 ).

Accumulated times:
Assembly time:        0.91 s
Solve time:      0.17 s
Total time:      1.08 s

contact        voltage     electron current    hole current  conduction current
 drain        7.000E-01       1.026E-03         8.029E-20        1.026E-03
 gateD        2.375E+00       5.321E-14         8.308E-35        5.321E-14
 gateS        2.375E+00       3.160E-12         3.408E-40        3.160E-12
 source       0.000E+00      -1.026E-03        -2.316E-23       -1.026E-03
 substrate    0.000E+00       9.056E-14        -8.255E-16        8.973E-14

Computing step from t=0.95 to t=1 (Stepsize: 0.05) :
Extrapolating values for t = 1 ... done.
Computing Coupled( 1 poisson-equation(s) , 1 electron-equation(s) , 
                   1 hole-equation(s) ) 
using Bank/Rose nonlinear solver.

Iteration   |Rhs|      factor     |step|     error   #inner  #iterative  time
------------------------------------------------------------------------------
    0      1.99e+07                                                      0.23
    1      5.82e+06   1.00e+00   2.63e-02   5.08e+02    0         1      0.52
    2      7.25e+03   1.00e+00   1.16e-03   2.31e+01    0         1      0.80
    3      2.12e-02   1.00e+00   1.57e-06   2.76e-02    0         1      1.09
Finished, because...
Error smaller than 1 ( 2.7565E-02 ).

Accumulated times:
Assembly time:        0.93 s
Solve time:      0.16 s
Total time:      1.09 s

contact        voltage     electron current    hole current  conduction current
 drain        7.000E-01       1.053E-03         8.061E-20        1.053E-03
 gateD        2.500E+00       1.272E-13         3.458E-34        1.272E-13
 gateS        2.500E+00       1.122E-11         2.096E-39        1.122E-11
 source       0.000E+00      -1.053E-03        -1.599E-23       -1.053E-03
 substrate    0.000E+00       7.729E-16        -8.264E-16       -5.347E-17


Plot started:
Saving device '':
    Writing plot 'n19_Profile_HighVd_0005_des.tdr' (TDR format) ... done.
Plot finished.


Finished, because...
Curve trace finished.

Writing plot 'n19_des.tdr' (TDR format) ... done.

Tue Aug  4 22:27:15 2026: checked in 1 sdevice license(s)

******************************************************************************
Sentaurus Device peak memory usage: 230 megabytes
Sentaurus Device simulation times:
  wallclock: 87.37 s (0 h:01 m:27 s)
  total cpu: 87.26 s (0 h:01 m:27 s)
Sentaurus Device simulation finished (Date: Tue Aug  4 22:27:15 2026  (KST)).
********************************* Good Bye ! *********************************
```

## 2. P01-T01-O02_HL_n15_sdevice

- 코드 종류: 기타
- 원본 파일: [`P01-T01-O02_HL_n15_sdevice.txt`](./source/P01-T01-O02_HL_n15_sdevice.txt)

```text
****************************************************************************
***                           Sentaurus Device                           ***
***                          Version T-2022.03                           ***
***                      (0.7486838, x86_64, Linux)                      ***
***                                                                      ***
***                       Copyright (C) 1994-2022                        ***
***                            Synopsys, Inc.                            ***
***                                                                      ***
***  This software and the associated documentation are confidential     ***
***  and proprietary to Synopsys, Inc.  Your use or disclosure of this   ***
***  software is subject to the terms and conditions of a written        ***
***  license agreement between you, or your company, and Synopsys, Inc.  ***
****************************************************************************

	Running on machine with the following configuration:
	Host Name: ssudisu1
	Operating System: Linux rel. 3.10.0-1160.119.1.el7.x86_64 ver. #1 SMP Tue Jun 4 14:43:51 UTC 2024
	Machine Type: x86_64
	Process ID: 95014
	Number of processors: 128
	Domain Name: (none)
	Date: Tue Aug  4 22:27:18 2026  (KST)

Tue Aug  4 22:27:18 2026: checked out 1 sdevice license(s)
Parsing circuit file /user/tools/synopsys/sentaurus/T-2022.03/bin/../tcad/current/linux64/lib/sdevice/sd_SRL1.ccf
Parsing circuit file /user/tools/synopsys/sentaurus/T-2022.03/bin/../tcad/current/linux64/lib/sdevice/sd_hb_vsource2.ccf
Parsing circuit file /user/tools/synopsys/sentaurus/T-2022.03/bin/../tcad/current/linux64/lib/sdevice/sd_hb_sRL.ccf
Parsing circuit file /user/tools/synopsys/sentaurus/T-2022.03/bin/../tcad/current/linux64/lib/sdevice/sd_hb_isource.ccf
Parsing circuit file /user/tools/synopsys/sentaurus/T-2022.03/bin/../tcad/current/linux64/lib/sdevice/sd_hb_isource2.ccf
Parsing circuit file /user/tools/synopsys/sentaurus/T-2022.03/bin/../tcad/current/linux64/lib/sdevice/sd_hb_pGC.ccf
Parsing circuit file /user/tools/synopsys/sentaurus/T-2022.03/bin/../tcad/current/linux64/lib/sdevice/bs_psource.ccf
Parsing circuit file /user/tools/synopsys/sentaurus/T-2022.03/bin/../tcad/current/linux64/lib/sdevice/sd_hb_vsource.ccf
Parsing circuit file /user/tools/synopsys/sentaurus/T-2022.03/bin/../tcad/current/linux64/lib/scm/satinductor.ccf
Parsing circuit file /user/tools/synopsys/sentaurus/T-2022.03/bin/../tcad/current/linux64/lib/scm/ferroelectric.ccf
Parsing circuit file /user/tools/synopsys/sentaurus/T-2022.03/bin/../tcad/current/linux64/lib/scm/MOS_harness.ccf
Loading shared object file /user/tools/synopsys/sentaurus/T-2022.03/bin/../tcad/current/linux64/lib/scm/MOS_harness.so.linux64
Loading shared object file /user/tools/synopsys/sentaurus/T-2022.03/bin/../tcad/current/linux64/lib/scm/ferroelectric.so.linux64
Loading shared object file /user/tools/synopsys/sentaurus/T-2022.03/bin/../tcad/current/linux64/lib/scm/satinductor.so.linux64
Loading shared object file /user/tools/synopsys/sentaurus/T-2022.03/bin/../tcad/current/linux64/lib/sdevice/sd_hb_vsource.so.linux64
Loading shared object file /user/tools/synopsys/sentaurus/T-2022.03/bin/../tcad/current/linux64/lib/sdevice/bs_psource.so.linux64
Loading shared object file /user/tools/synopsys/sentaurus/T-2022.03/bin/../tcad/current/linux64/lib/sdevice/sd_hb_pGC.so.linux64
Loading shared object file /user/tools/synopsys/sentaurus/T-2022.03/bin/../tcad/current/linux64/lib/sdevice/sd_hb_isource2.so.linux64
Loading shared object file /user/tools/synopsys/sentaurus/T-2022.03/bin/../tcad/current/linux64/lib/sdevice/sd_hb_isource.so.linux64
Loading shared object file /user/tools/synopsys/sentaurus/T-2022.03/bin/../tcad/current/linux64/lib/sdevice/sd_hb_sRL.so.linux64
Loading shared object file /user/tools/synopsys/sentaurus/T-2022.03/bin/../tcad/current/linux64/lib/sdevice/sd_hb_vsource2.so.linux64
Loading shared object file /user/tools/synopsys/sentaurus/T-2022.03/bin/../tcad/current/linux64/lib/sdevice/sd_SRL1.so.linux64

Input source: pp15_des.cmd

===============================

Output file: n15_des.log


GlobalParameter {
}
no ACExtract file

PMIPath file: /user/tools/synopsys/sentaurus/T-2022.03/bin/../tcad/current/linux64/lib/sdevice-33.0.7486838 /user/tools/synopsys/sentaurus/T-2022.03/bin/../tcad/current/linux64/lib/sdevice

CMIPath file: /user/tools/synopsys/sentaurus/T-2022.03/bin/../tcad/current/linux64/lib/sdevice /user/tools/synopsys/sentaurus/T-2022.03/bin/../tcad/current/linux64/lib/scm

SPICEPath file: /user/tools/synopsys/sentaurus/T-2022.03/bin/../tcad/current/lib/sdevice-33.0.7486838/spice

no DevicePath file

no CIRCUITSAVENAME file

no CIRCUITLOADNAME file

Numerical parameters:
  Absolute error : 
    Poisson : 1.0000e-03
    eqPoisson : 1.0000e-03
    Electron : 1.0000e-05
    Hole : 1.0000e-05
    Photon-Rate-Equation : 1.0000e-07
    Photon-Phase-Equation : 1.0000e-05
    Rate-Stabilize-Equation : 1.0000e-07
    QW-Scattering-Equations : 1.0000e-05
    QW-eScattering-Equation : 1.0000e-05
    QW-hScattering-Equation : 1.0000e-05
    Optical Problem : 1.0000e-03
    Wavelength : 1.0000e-03
    Bandstructure : 1.0000e-03
    EmissionTable : 1.0000e-03
    DephasingRates : 1.0000e-03
    Photon Recycling : 1.0000e-03
    Electron-Temperature : 1.0000e-04
    Hole-Temperature : 1.0000e-04
    Lattice-Hole-Electron-Temperature : 1.0000e-03
    Circuit : 1.0000e-03
    TCircuit : 1.0000e-03
    Contact : 1.0000e-03
    TContact : 1.0000e-03
    Continuation : 1.0000e-03
    eLaplace : 1.0000e-03
    hLaplace : 1.0000e-03
    tLaplace : 1.0000e-03
    electron quasi-fermi-potential : 1.0000e-03
    hole quasi-fermi-potential : 1.0000e-03
    MonteCarlo : 1.0000e-03
    MCPoissonPDE : 1.0000e-03
    eQuantumPotential : 1.0000e-03
    hQuantumPotential : 1.0000e-03
    quasi-fermi-potential : 1.0000e-03
    ConductiveInsulator : 1.0000e-03
    ContactAndConductiveInsulator : 1.0000e-03
    SingletExciton : 1.0000e-05
    FEPolarization : 1.0000e-05
    FEPolarizationX : 1.0000e-05
    FEPolarizationY : 1.0000e-05
    FEPolarizationZ : 1.0000e-05
    FEPolDivFree : 1.0000e-03
    eHopping : 1.0000e-03
    hHopping : 1.0000e-03
    HydrogenAtom : 1.0000e-03
    HydrogenMolecule : 1.0000e-03
    HydrogenIon : 1.0000e-03
    HydrogenSpeciesA : 1.0000e-03
    HydrogenSpeciesB : 1.0000e-03
    HydrogenSpeciesC : 1.0000e-03
    HydrogenSiliconBondOccupation : 1.0000e-03
    TrapPDE : 1.0000e-03
    eSHEDistribution : 1.0000e-03
    hSHEDistribution : 1.0000e-03
    Landau-Lifshitz-Gilbert[theta] : 1.0000e-03
    Landau-Lifshitz-Gilbert[phi] : 1.0000e-03
    Landau-Lifshitz-Gilbert[x] : 1.0000e-03
    Landau-Lifshitz-Gilbert[y] : 1.0000e-03
    Landau-Lifshitz-Gilbert[z] : 1.0000e-03
    Mechanics : 1.0000e-03
    ExternalTransportSolver : 1.0000e-03
    ReactionDiffusionPDE : 1.0000e-03
  RelErrControl (Reference error): 
    Poisson : 0.025852
    eqPoisson : 1
    Electron : 1.0000e+10
    Hole : 1.0000e+10
    Photon-Rate-Equation : 1.0000e-07
    Photon-Phase-Equation : 1
    Rate-Stabilize-Equation : 1.0000e-07
    QW-Scattering-Equations : 1.0000e+10
    QW-eScattering-Equation : 1.0000e+10
    QW-hScattering-Equation : 1.0000e+10
    Optical Problem : 1
    Wavelength : 1
    Bandstructure : 1
    EmissionTable : 1
    DephasingRates : 1
    Photon Recycling : 1
    Electron-Temperature : 3.0000e+02
    Hole-Temperature : 3.0000e+02
    Lattice-Hole-Electron-Temperature : 3.0000e+02
    Circuit : 1
    TCircuit : 1
    Contact : 0.025852
    TContact : 1
    Continuation : 1
    eLaplace : 1
    hLaplace : 1
    tLaplace : 1
    electron quasi-fermi-potential : 0.025852
    hole quasi-fermi-potential : 0.025852
    MonteCarlo : 1
    MCPoissonPDE : 1
    eQuantumPotential : 0.025852
    hQuantumPotential : 0.025852
    quasi-fermi-potential : 0.025852
    ConductiveInsulator : 1
    ContactAndConductiveInsulator : 1
    SingletExciton : 1.0000e+10
    FEPolarization : 0.025852
    FEPolarizationX : 0.025852
    FEPolarizationY : 0.025852
    FEPolarizationZ : 0.025852
    FEPolDivFree : 1
    eHopping : 0.025852
    hHopping : 0.025852
    HydrogenAtom : 1.0000e+10
    HydrogenMolecule : 1.0000e+10
    HydrogenIon : 1.0000e+10
    HydrogenSpeciesA : 1.0000e+10
    HydrogenSpeciesB : 1.0000e+10
    HydrogenSpeciesC : 1.0000e+10
    HydrogenSiliconBondOccupation : 1
    TrapPDE : 1.0000e-05
    eSHEDistribution : 0.025852
    hSHEDistribution : 0.025852
    Landau-Lifshitz-Gilbert[theta] : 1
    Landau-Lifshitz-Gilbert[phi] : 1
    Landau-Lifshitz-Gilbert[x] : 1
    Landau-Lifshitz-Gilbert[y] : 1
    Landau-Lifshitz-Gilbert[z] : 1
    Mechanics : 1
    ExternalTransportSolver : 1
    ReactionDiffusionPDE : 1
  Relative error : 5 digits
  Without checked transient error
  Max. #iterations : 20
  LineSearchDamping=1
  #undamped iterations : 1000
  No incomplete Newton
  transient method : TR-BDF
  Linear solver : blocked decomposition
  Linear solver for AC analysis : blocked decomposition
  Linear solver for SHEDistribution Model : Super
  use linear extrapolation in transient/quasistationary computations
  use complex supernodal in ac-analysis (if possible)
  do not use smoothed PDE's in transient/quasistationary computations
  use automatic coupling of contact/circuit stuff
  Spice temperature: 3.0015e+02
  Spice nominal temperature of parameter measurements: 3.0015e+02
  Spice minimum conductance gmin: 1.0000e-12
  Terminate simulation immediately if a solve command fails.
  Use 64 bit (double) normal precision floating point arithmetic.
  Mininum |rhs| : 1.0000e-05
  Maximum |rhs| (transient): 1.0000e+15
  Maximum |rhs| (non-transient): 1.0000e+100
  Maximum |rhs| factor : 1.0000e+10
  Maximum |rhs| factor1 : 1.0000e+10
  Lattice Temperature Range : (50,5.0000e+03)
  Carrier Temperature Range : (10,8.0000e+04)
  Simplified first order SHE of BTE will be solved
  SHERefinementCutoff : 20
  No user dependencies.
  Number of assembly threads: 1 (command line max_threads)
  Number of solver threads: 1 (command line max_threads)
  Thread stacksize: 1000000 bytes (default)
  Go serial if not enough parallel licenses are available.
  Model: Math  Switched on

Default device parameters:
  Electrodes:
    "source" : 0.0000e+00 V (Ohmic), area factor : 1
    "drain" : 0.0000e+00 V (Ohmic), area factor : 1
    "substrate" : 0.0000e+00 V (Ohmic), area factor : 1
    "gateS" : 0.0000e+00 V (Ohmic, WorkFunction = 4.8 eV), area factor : 1
    "gateD" : 0.0000e+00 V (Ohmic, WorkFunction = 4.2 eV), area factor : 1
  RayTrace Boundaries:
  Files:
    no Boundary file
    Grid file: n1_fps.tdr
    no Doping file
    no MobilityDoping file
    MIMCurrent file: pp15_des_mimcur_des.plt
    no MIMDefects file
    no InitialDefects file
    no CyclicNorm file
    no MIMBand file
    MIMSensitivity file: pp15_des_mimsa_des.tdr
    no Load file
    no Save file
    Plot file: n15_des.tdr
    no DevFieldsName file
    AutoNewtonPlot file: n15_des_%ld_des.tdr
    no Path file
    no Lifetime file
    no Temperature file
    Current file: n15_des.plt
    no PMIUserFields file
    no Extraction file
    ModelParameters file: pp15_des.par
    ParameterPath directories: 
    no Piezo file
    no mcDOS file
    no ModeGain file
    no Optical emission table for stimulated emission file
    no Optical emission table for spontaneous emission file
    no Optical emission table for photon phase change coefficient file
    no EmissionTable file
    no DephasingRates file
    no OpticalFarField file
    no OpticalIntensityPattern file
    no SaveOpticalIntensityPattern file
    no IlluminationSpectrum file
    no SpectralPlot file
    no OpticalSolverInput file
    no OpticalGenerationInput file
    no OpticalGenerationOutuput file
    no OptGenTransientScaling file
    no MonteCarloInput file
    no MonteCarloOutput file
    no ACPlot file
-----------------------------------------------
  Numerical parameters:
    With avalanche derivatives
    Using New Plot Names
    Using old wavelength search algorithm
    Do not reinitialize quasi Fermi potentials in quasi-stationary simulations
    Ignore ionization integral constraints
    Without diagonal preconditioning
    With Scharfetter-Gummel Discretization
    Relative error : 5 digits
    Delta for numerical tunnelling derivatives : 1.0000e-03
    Do not compute breakdown paths and ionization integrals
    QuasiFermiPotential is used for Contact Equation
    With usage of best vertex in element (maximum element-vertex volume angle) for impact ionization models
-----------------------------------------------
-----------------------------------------------
  Physical models:
    Without incomplete ionization
    Use Si parameters
    TATNonlocalPathNC = 0.0000e+00
    Without SRH-Recombination
    Without CDL-Recombination
    With optical generation computation 
    With electron non local Barrier Tunneling
    With hole non local Barrier Tunneling
    Without Band-to-Band-Tunneling
    Without Auger-Recombination
    Without Radiative Recombination
    Without Surface-Recombination
    Without Trap-Assisted-Auger-Recombination
    PMI recombination models: none
    Without thermal resistance interfaces
    Without distributed resistance interfaces for electrons
    Without distributed resistance interfaces for holes
    Without Piezo
    Without Anisotropic Material Properties
    Without Avalanche-Generation 
    Without Alpha Particle
    Without Heavy Ion
    Without polarization
    Volume charge density: 0.0000e+00 cm^-3
    Device Temperature = 3.0000e+02 K
    Electron Quasi Fermi Potential: 0.0000e+00 V
    Hole Quasi Fermi Potential: 0.0000e+00 V
    Without MagneticField
    With SingletExciton Barrier Type
    Intrinsic density models:
      default bandgap model
      Bandgap narrowing model: OldSlotboom with bandgap narrowing (no Fermi)
    default affinity model
    default effective mass model
    Electron mobility:
      no Doping dependence (using constant mobility)
      no Carrier-Carrier scattering
      no bulk trap Coulomb scattering 
      no E_normal dependence
      Without ThinLayer mobility model
      no high-field saturation
      Einstein relation for diffusivity-mobility ratio
      no band tail high-field mobility
    Hole mobility:
      no Doping dependence (using constant mobility)
      no Carrier-Carrier scattering
      no bulk trap Coulomb scattering 
      no E_normal dependence
      Without ThinLayer mobility model
      no high-field saturation
      Einstein relation for diffusivity-mobility ratio
      no band tail high-field mobility
    Energy relaxation time model: according to formula in parameter file
    Schottky resistance model: default bult-in model
    Lattice thermal conductivity model: according to formula in parameter file
    Metal Resistivity model: according to formula in parameter file
    Thermo Electric Power model: extraploted Si data
    Metal Thermo Electric Power model: MetalThermoElectricPower model not defined
    Lattice heat capacity model: temperature dependent
    no piezoelectric polarization model
    Without default parameters from file (use built-in default parameters)
-----------------------------------------------
- - - - - - - - - - - - - - - - - - - - - - - - 
  The following Physical models were changed
              for Material = 'Silicon'
    With SRH-Recombination
      Without field dependent lifetimes
      With doping dependent lifetimes
      Without temperature dependent lifetimes
    Without thermal resistance interfaces
    Without distributed resistance interfaces for electrons
    Without distributed resistance interfaces for holes
    Electron mobility:
      Philips unified mobility
      E_normal dependence:
        Lombardi
      High-field mobility: Caughey-Thomas saturation model, using gradient quasi-Fermi potential
    Hole mobility:
      Philips unified mobility
      E_normal dependence:
        Lombardi
      High-field mobility: Caughey-Thomas saturation model, using gradient quasi-Fermi potential
- - - - - - - - - - - - - - - - - - - - - - - -
  Process information for extraction purposes:
    none
  Plot variables:
    eNLLTunnelingGeneration
    ! WARNING eNLLTunnelingGeneration is an alias for eBarrierTunneling and will not be supported in Plot section in future releases
    hNLLTunnelingGeneration
    ! WARNING hNLLTunnelingGeneration is an alias for hBarrierTunneling and will not be supported in Plot section in future releases
    ElectrostaticPotential
    ConductionBandEnergy
    ValenceBandEnergy
    ElectricField/Vector
    eDensity
    hDensity
    eCurrentDensity/Vector
    hCurrentDensity/Vector
    DopingConcentration
    DonorConcentration
    AcceptorConcentration

------------------------------------------------
  NoisePlot variables:
    none
  Plot groups:
    none

------------------------------------------------
  CurrentPlot variables:
    none
Devices:
Systems:
Solve :
 Poisson
Coupled ( Digits : 5, Max. #iterations : 20, 
    Solver : blocked decomposition,
    #undamped iterations : 1000 
    )
    { Poisson Electron Hole } 
Quasistationary ( Digits : 5, Max. #iterations : 20, 
      Initial step in t : 0.1, 
      Minimum step in t : 1.0000e-05, Maximum step in t : 1, 
      Increment : 1.5, Decrement : 2, 
      Goal values :
        Contact drain : 0.08V
    )
  {
    Coupled ( Digits : 5, Max. #iterations : 20, 
        Solver : blocked decomposition,
        #undamped iterations : 1000 
        )
        { Poisson Electron Hole } 
  }
Quasistationary ( Digits : 5, Max. #iterations : 20, 
      Initial step in t : 0.01, 
      Minimum step in t : 1.0000e-05, Maximum step in t : 0.05, 
      Increment : 1.5, Decrement : 2, 
      DoZero      Goal values :
        Contact gateD : 2.5V,
        Contact gateS : 2.5V
    )
  {
    Coupled ( Digits : 5, Max. #iterations : 20, 
        Solver : blocked decomposition,
        #undamped iterations : 1000 
        )
        { Poisson Electron Hole } 
    Plot( FilePrefix = "n15_Profile_LowVd" nooverwrite -loadable
         Time (fixed times:
             0.0000e+00 0.2 0.3 0.4 0.5
             1) )
      { }
  }
Quasistationary ( Digits : 5, Max. #iterations : 20, 
      Initial step in t : 0.05, 
      Minimum step in t : 1.0000e-05, Maximum step in t : 0.1, 
      Increment : 1.5, Decrement : 2, 
      Goal values :
        Contact gateD : 0.0000e+00V,
        Contact gateS : 0.0000e+00V
    )
  {
    Coupled ( Digits : 5, Max. #iterations : 20, 
        Solver : blocked decomposition,
        #undamped iterations : 1000 
        )
        { Poisson Electron Hole } 
  }
Quasistationary ( Digits : 5, Max. #iterations : 20, 
      Initial step in t : 0.1, 
      Minimum step in t : 1.0000e-05, Maximum step in t : 1, 
      Increment : 1.5, Decrement : 2, 
      Goal values :
        Contact drain : 0.7V
    )
  {
    Coupled ( Digits : 5, Max. #iterations : 20, 
        Solver : blocked decomposition,
        #undamped iterations : 1000 
        )
        { Poisson Electron Hole } 
  }
Quasistationary ( Digits : 5, Max. #iterations : 20, 
      Initial step in t : 0.01, 
      Minimum step in t : 1.0000e-05, Maximum step in t : 0.05, 
      Increment : 1.5, Decrement : 2, 
      DoZero      Goal values :
        Contact gateD : 2.5V,
        Contact gateS : 2.5V
    )
  {
    Coupled ( Digits : 5, Max. #iterations : 20, 
        Solver : blocked decomposition,
        #undamped iterations : 1000 
        )
        { Poisson Electron Hole } 
    Plot( FilePrefix = "n15_Profile_HighVd" nooverwrite -loadable
         Time (fixed times:
             0.0000e+00 0.2 0.3 0.4 0.5
             1) )
      { }
  }

===============================

Reading grid 'n1_fps.tdr' ... 
  coordinate system: UCS, 3d_sprocess (x is device down direction)
  use coordinate system as is (no transformation)
  TDR format
  Number of grid points is 4303.
done.

Adding interfaces and contacts .... done.

Computing edges ...
  Number of edges: 18939
done.
Computing boxes ...

  CVPL_AverageBoxMethod = TRUE 
   
  Boxmethod Parallel Computing: nbThreads = 1 

  Computing Delaunay coefficients ...   done.
  Delaunay coefficients time: (wallclock = 0.0000e+00 s, tcpu = 0.0000e+00 s)

  Parallel Computing Voronoi faces, coefficients, and measures ... 
  CVPL_Algorithm = TRUE 

    Computing Obtuse Elements ... 
     Obtuse Elements time:  tcpu = 0.0000e+00 s
      New Parameters time: (wallclock = 0.0000e+00 s, tcpu = 0.0000e+00 s)

Info for all regions (NumberOfRegions = 6):
        ElementWithMinVolume(  7376) Vertex0( 3731)(-7.443749e-02, 1.400807e-02) Volume = 2.785575e-09 um3 (3.07e-08 from TotalVolume)
          ElementWithMinEdge(  7376) Vertex0( 3731)(-7.443749e-02, 1.400807e-02) Length = 1.197818e-05 um
              MaxFlatElement(  7147) Vertex0( 3761)(-7.145255e-02,-1.913866e-02)  Angle = 3.631133e+01 degrees
         ElementWithMinAngle(  1653) Vertex0(  899)( 4.000000e-01,-2.837484e-04)  Angle = 3.440222e-01 degrees
   ElementWithMaxQualityEdge(  1649) Vertex0(  899)( 4.000000e-01, 0.000000e+00)    R/L = 8.327386e+01 
 ElementWithMaxQualityHeight(  1649) Vertex0(  899)( 4.000000e-01, 0.000000e+00)    R/H = 8.327537e+01 

Info for semiconductor regions (NumberOfRegions = 1):
        ElementWithMinVolume(   175) Vertex0(   94)( 0.000000e+00,-2.837484e-04) Volume = 7.181707e-08 um3 (7.91e-07 from TotalVolume)
          ElementWithMinEdge(   175) Vertex0(   94)( 0.000000e+00,-2.837484e-04) Length = 2.837484e-04 um
              MaxFlatElement(   284) Vertex0(  167)( 1.012405e-03, 2.211762e-02)  Angle = 7.163809e+01 degrees
         ElementWithMinAngle(  1653) Vertex0(  899)( 4.000000e-01,-2.837484e-04)  Angle = 3.440222e-01 degrees
   ElementWithMaxQualityEdge(  1649) Vertex0(  899)( 4.000000e-01, 0.000000e+00)    R/L = 8.327386e+01 
 ElementWithMaxQualityHeight(  1649) Vertex0(  899)( 4.000000e-01, 0.000000e+00)    R/H = 8.327537e+01 

   NumberOfEdges              =  18939 
   NumberOfGeometricalEdges   =  12546 
   NumberOfDoubleEdges        =      0 
   MaxNumberOfEdgesPerVertex  =     10; vertex(3846) = (-6.861708e-02, -1.913866e-02) [um]
   MaxNumberOfElementsPerEdge =      2; edge(1) = (1, 994) 
                                        vertex(1) = ( 3.527432e-01, -1.120000e-01) [um]
                                        vertex(994) = ( 3.527432e-01, -8.883628e-02) [um]

                        NumberOfVertices =   4482 
                        NumberOfElements =   8244 
                       NumberOfTriangles =   8244  (100.00 %)
                      NumberOfRectangles =      0  ( 0.00 %)
                  NumberOfObtuseElements =     42  ( 0.51 %)
             NumberOfNonDelaunayElements =      0  ( 0.00 %)

  VertexWithMaxMeasure(  341)( 3.527432e-01, 8.883628e-02)
  MaxVertMeasure(8.576643e-04)/VertVolume(4.801700e-04) = 1.79e+00


/-------- Region non-Delaunay elements ---------------------------------------------------------------------
 Region          Volume      BoxMethodVolume  DeltaVolume  Elements  non-Delaunay      non-DelaunayVolume 
  name            [um2]          [um2]           [%]                   Elements              [um2]   [%]   
 -----------------------------------------------------------------------------------------------------------
 Silicon_1    8.9600000e-02  8.9600000e-02     5.6e-13      7124       0 ( 0.00 %)   0.0000000e+00 ( 0.0000) 
 Nitride_1.1  5.0413045e-04  5.0413045e-04     6.0e-14       204       0 ( 0.00 %)   0.0000000e+00 ( 0.0000) 
 Nitride_1.2  5.0450501e-04  5.0450501e-04     7.2e-14       236       0 ( 0.00 %)   0.0000000e+00 ( 0.0000) 
 Oxide_1      1.4000007e-05  1.4000007e-05     1.5e-13       214       0 ( 0.00 %)   0.0000000e+00 ( 0.0000) 
 HfO2_1       1.5792007e-04  1.5792007e-04     3.8e-14       434       0 ( 0.00 %)   0.0000000e+00 ( 0.0000) 
 Nitride_1.3  4.6472809e-05  4.6472809e-05     3.3e-14        32       0 ( 0.00 %)   0.0000000e+00 ( 0.0000) 
 ...........................................................................................................
 Total        9.0827028e-02  9.0827028e-02     1.0e-12      8244       0 ( 0.00 %)   0.0000000e+00 ( 0.0000) 
\-----------------------------------------------------------------------------------------------------------
    done.
  done.
  (times: wallclock = 0.0000e+00 s, tcpu = 0.01 s)
done.
Reading doping 'n1_fps.tdr' (TDR format) ...
done.
done.
Reading parameter file 'pp15_des.par' ...
---------------------------------------------------
 Reading parameters for default parameter set
---------------------------------------------------

	Differences compared with default parameters:
	BarrierTunneling_NLM_gateS: mt_e = 1, instead of: 0.0000e+00 [1]
	BarrierTunneling_NLM_gateS: mt_h = 1, instead of: 0.0000e+00 [1]
	BarrierTunneling_NLM_gateS: g_e = 1, instead of: 2.1 [1]
	BarrierTunneling_NLM_gateS: g_h = 1, instead of: 0.66 [1]
	BarrierTunneling_NLM_gateD: mt_e = 1, instead of: 0.0000e+00 [1]
	BarrierTunneling_NLM_gateD: mt_h = 1, instead of: 0.0000e+00 [1]
	BarrierTunneling_NLM_gateD: g_e = 1, instead of: 2.1 [1]
	BarrierTunneling_NLM_gateD: g_h = 1, instead of: 0.66 [1]

---------------------------------------------------
 Reading parameters for material "HfO2"
---------------------------------------------------
	BarrierTunneling_NLM_gateS: mt_e = 0.11, instead of: 1 [1]
	BarrierTunneling_NLM_gateD: mt_e = 0.11, instead of: 1 [1]

---------------------------------------------------
 Reading parameters for material "Oxide"
---------------------------------------------------
	BarrierTunneling_NLM_gateS: mt_e = 0.42, instead of: 1 [1]
	BarrierTunneling_NLM_gateD: mt_e = 0.42, instead of: 1 [1]

---------------------------------------------------
 Reading parameters for material "Silicon"
---------------------------------------------------


=======
Region: "HfO2_1"
  (material is "HfO2")
=======
  Model: "BarrierTunneling_NLM_gateD"
    Parameter "alphae" is new with value equal to 0
    Parameter "alphah" is new with value equal to 0
    Parameter "eA" is new with value equal to 1
    Parameter "eBL_max" is new with value equal to 0.3
    Parameter "eQuantumPotentialFactor" is new with value equal to 0
    Parameter "eQuantumPotentialPosFac" is new with value equal to 0
    Parameter "g_e" is new with value equal to 1
    Parameter "g_h" is new with value equal to 1
    Parameter "hA" is new with value equal to 1
    Parameter "hBL_max" is new with value equal to 0.3
    Parameter "hQuantumPotentialFactor" is new with value equal to 0
    Parameter "hQuantumPotentialPosFac" is new with value equal to 0
    Parameter "mt_e" is new with value equal to 0.11
    Parameter "mt_h" is new with value equal to 1
  Model: "BarrierTunneling_NLM_gateS"
    Parameter "alphae" is new with value equal to 0
    Parameter "alphah" is new with value equal to 0
    Parameter "eA" is new with value equal to 1
    Parameter "eBL_max" is new with value equal to 0.3
    Parameter "eQuantumPotentialFactor" is new with value equal to 0
    Parameter "eQuantumPotentialPosFac" is new with value equal to 0
    Parameter "g_e" is new with value equal to 1
    Parameter "g_h" is new with value equal to 1
    Parameter "hA" is new with value equal to 1
    Parameter "hBL_max" is new with value equal to 0.3
    Parameter "hQuantumPotentialFactor" is new with value equal to 0
    Parameter "hQuantumPotentialPosFac" is new with value equal to 0
    Parameter "mt_e" is new with value equal to 0.11
    Parameter "mt_h" is new with value equal to 1
  Using default lattice crystal coordinate system:
    effective LatticeParameters:
      X = (1, 0.0000e+00, 0.0000e+00)
      Y = (0.0000e+00, 1, 0.0000e+00)
      Z = (0.0000e+00, 0.0000e+00, 1)

=======
Region: "Nitride_1.1"
  (material is "Nitride")
=======
  Model: "BarrierTunneling_NLM_gateD"
    Parameter "alphae" is new with value equal to 0
    Parameter "alphah" is new with value equal to 0
    Parameter "eA" is new with value equal to 1
    Parameter "eBL_max" is new with value equal to 0.3
    Parameter "eQuantumPotentialFactor" is new with value equal to 0
    Parameter "eQuantumPotentialPosFac" is new with value equal to 0
    Parameter "g_e" is new with value equal to 1
    Parameter "g_h" is new with value equal to 1
    Parameter "hA" is new with value equal to 1
    Parameter "hBL_max" is new with value equal to 0.3
    Parameter "hQuantumPotentialFactor" is new with value equal to 0
    Parameter "hQuantumPotentialPosFac" is new with value equal to 0
    Parameter "mt_e" is new with value equal to 1
    Parameter "mt_h" is new with value equal to 1
  Model: "BarrierTunneling_NLM_gateS"
    Parameter "alphae" is new with value equal to 0
    Parameter "alphah" is new with value equal to 0
    Parameter "eA" is new with value equal to 1
    Parameter "eBL_max" is new with value equal to 0.3
    Parameter "eQuantumPotentialFactor" is new with value equal to 0
    Parameter "eQuantumPotentialPosFac" is new with value equal to 0
    Parameter "g_e" is new with value equal to 1
    Parameter "g_h" is new with value equal to 1
    Parameter "hA" is new with value equal to 1
    Parameter "hBL_max" is new with value equal to 0.3
    Parameter "hQuantumPotentialFactor" is new with value equal to 0
    Parameter "hQuantumPotentialPosFac" is new with value equal to 0
    Parameter "mt_e" is new with value equal to 1
    Parameter "mt_h" is new with value equal to 1
  Using default lattice crystal coordinate system:
    effective LatticeParameters:
      X = (1, 0.0000e+00, 0.0000e+00)
      Y = (0.0000e+00, 1, 0.0000e+00)
      Z = (0.0000e+00, 0.0000e+00, 1)

=======
Region: "Nitride_1.2"
  (material is "Nitride")
=======
  Model: "BarrierTunneling_NLM_gateD"
    Parameter "alphae" is new with value equal to 0
    Parameter "alphah" is new with value equal to 0
    Parameter "eA" is new with value equal to 1
    Parameter "eBL_max" is new with value equal to 0.3
    Parameter "eQuantumPotentialFactor" is new with value equal to 0
    Parameter "eQuantumPotentialPosFac" is new with value equal to 0
    Parameter "g_e" is new with value equal to 1
    Parameter "g_h" is new with value equal to 1
    Parameter "hA" is new with value equal to 1
    Parameter "hBL_max" is new with value equal to 0.3
    Parameter "hQuantumPotentialFactor" is new with value equal to 0
    Parameter "hQuantumPotentialPosFac" is new with value equal to 0
    Parameter "mt_e" is new with value equal to 1
    Parameter "mt_h" is new with value equal to 1
  Model: "BarrierTunneling_NLM_gateS"
    Parameter "alphae" is new with value equal to 0
    Parameter "alphah" is new with value equal to 0
    Parameter "eA" is new with value equal to 1
    Parameter "eBL_max" is new with value equal to 0.3
    Parameter "eQuantumPotentialFactor" is new with value equal to 0
    Parameter "eQuantumPotentialPosFac" is new with value equal to 0
    Parameter "g_e" is new with value equal to 1
    Parameter "g_h" is new with value equal to 1
    Parameter "hA" is new with value equal to 1
    Parameter "hBL_max" is new with value equal to 0.3
    Parameter "hQuantumPotentialFactor" is new with value equal to 0
    Parameter "hQuantumPotentialPosFac" is new with value equal to 0
    Parameter "mt_e" is new with value equal to 1
    Parameter "mt_h" is new with value equal to 1
  Using default lattice crystal coordinate system:
    effective LatticeParameters:
      X = (1, 0.0000e+00, 0.0000e+00)
      Y = (0.0000e+00, 1, 0.0000e+00)
      Z = (0.0000e+00, 0.0000e+00, 1)

=======
Region: "Nitride_1.3"
  (material is "Nitride")
=======
  Model: "BarrierTunneling_NLM_gateD"
    Parameter "alphae" is new with value equal to 0
    Parameter "alphah" is new with value equal to 0
    Parameter "eA" is new with value equal to 1
    Parameter "eBL_max" is new with value equal to 0.3
    Parameter "eQuantumPotentialFactor" is new with value equal to 0
    Parameter "eQuantumPotentialPosFac" is new with value equal to 0
    Parameter "g_e" is new with value equal to 1
    Parameter "g_h" is new with value equal to 1
    Parameter "hA" is new with value equal to 1
    Parameter "hBL_max" is new with value equal to 0.3
    Parameter "hQuantumPotentialFactor" is new with value equal to 0
    Parameter "hQuantumPotentialPosFac" is new with value equal to 0
    Parameter "mt_e" is new with value equal to 1
    Parameter "mt_h" is new with value equal to 1
  Model: "BarrierTunneling_NLM_gateS"
    Parameter "alphae" is new with value equal to 0
    Parameter "alphah" is new with value equal to 0
    Parameter "eA" is new with value equal to 1
    Parameter "eBL_max" is new with value equal to 0.3
    Parameter "eQuantumPotentialFactor" is new with value equal to 0
    Parameter "eQuantumPotentialPosFac" is new with value equal to 0
    Parameter "g_e" is new with value equal to 1
    Parameter "g_h" is new with value equal to 1
    Parameter "hA" is new with value equal to 1
    Parameter "hBL_max" is new with value equal to 0.3
    Parameter "hQuantumPotentialFactor" is new with value equal to 0
    Parameter "hQuantumPotentialPosFac" is new with value equal to 0
    Parameter "mt_e" is new with value equal to 1
    Parameter "mt_h" is new with value equal to 1
  Using default lattice crystal coordinate system:
    effective LatticeParameters:
      X = (1, 0.0000e+00, 0.0000e+00)
      Y = (0.0000e+00, 1, 0.0000e+00)
      Z = (0.0000e+00, 0.0000e+00, 1)

=======
Region: "Oxide_1"
  (material is "Oxide")
=======
  Model: "BarrierTunneling_NLM_gateD"
    Parameter "alphae" is new with value equal to 0
    Parameter "alphah" is new with value equal to 0
    Parameter "eA" is new with value equal to 1
    Parameter "eBL_max" is new with value equal to 0.3
    Parameter "eQuantumPotentialFactor" is new with value equal to 0
    Parameter "eQuantumPotentialPosFac" is new with value equal to 0
    Parameter "g_e" is new with value equal to 1
    Parameter "g_h" is new with value equal to 1
    Parameter "hA" is new with value equal to 1
    Parameter "hBL_max" is new with value equal to 0.3
    Parameter "hQuantumPotentialFactor" is new with value equal to 0
    Parameter "hQuantumPotentialPosFac" is new with value equal to 0
    Parameter "mt_e" is new with value equal to 0.42
    Parameter "mt_h" is new with value equal to 1
  Model: "BarrierTunneling_NLM_gateS"
    Parameter "alphae" is new with value equal to 0
    Parameter "alphah" is new with value equal to 0
    Parameter "eA" is new with value equal to 1
    Parameter "eBL_max" is new with value equal to 0.3
    Parameter "eQuantumPotentialFactor" is new with value equal to 0
    Parameter "eQuantumPotentialPosFac" is new with value equal to 0
    Parameter "g_e" is new with value equal to 1
    Parameter "g_h" is new with value equal to 1
    Parameter "hA" is new with value equal to 1
    Parameter "hBL_max" is new with value equal to 0.3
    Parameter "hQuantumPotentialFactor" is new with value equal to 0
    Parameter "hQuantumPotentialPosFac" is new with value equal to 0
    Parameter "mt_e" is new with value equal to 0.42
    Parameter "mt_h" is new with value equal to 1
  Using default lattice crystal coordinate system:
    effective LatticeParameters:
      X = (1, 0.0000e+00, 0.0000e+00)
      Y = (0.0000e+00, 1, 0.0000e+00)
      Z = (0.0000e+00, 0.0000e+00, 1)

=======
Region: "Silicon_1"
  (material is "Silicon")
=======
  Model: "BarrierTunneling_NLM_gateD"
    Parameter "alphae" is new with value equal to 0
    Parameter "alphah" is new with value equal to 0
    Parameter "eA" is new with value equal to 1
    Parameter "eBL_max" is new with value equal to 0.3
    Parameter "eQuantumPotentialFactor" is new with value equal to 0
    Parameter "eQuantumPotentialPosFac" is new with value equal to 0
    Parameter "g_e" is new with value equal to 1
    Parameter "g_h" is new with value equal to 1
    Parameter "hA" is new with value equal to 1
    Parameter "hBL_max" is new with value equal to 0.3
    Parameter "hQuantumPotentialFactor" is new with value equal to 0
    Parameter "hQuantumPotentialPosFac" is new with value equal to 0
    Parameter "mt_e" is new with value equal to 1
    Parameter "mt_h" is new with value equal to 1
  Model: "BarrierTunneling_NLM_gateS"
    Parameter "alphae" is new with value equal to 0
    Parameter "alphah" is new with value equal to 0
    Parameter "eA" is new with value equal to 1
    Parameter "eBL_max" is new with value equal to 0.3
    Parameter "eQuantumPotentialFactor" is new with value equal to 0
    Parameter "eQuantumPotentialPosFac" is new with value equal to 0
    Parameter "g_e" is new with value equal to 1
    Parameter "g_h" is new with value equal to 1
    Parameter "hA" is new with value equal to 1
    Parameter "hBL_max" is new with value equal to 0.3
    Parameter "hQuantumPotentialFactor" is new with value equal to 0
    Parameter "hQuantumPotentialPosFac" is new with value equal to 0
    Parameter "mt_e" is new with value equal to 1
    Parameter "mt_h" is new with value equal to 1
  Using lattice crystal coordinate system from TDR file:
    slice.angle                   : 1.8000e+02 [deg]
    wafer.orient, vertical.orient : (0, 0, 1)
    flat.orient, horizontal.orient: [1, 1, 0]
    miscut.tilt                   : 0.0000e+00 [deg]
    miscut.toward                 : [1, 1, 0]
    lattice.system                : cubic
    polytype                      : Zincblende
    lattice.const                 : 5.4310e-08 [cm]
    lattice.const.b               : 5.4310e-08 [cm]
    lattice.const.c               : 5.4310e-08 [cm]
    unit cell angles: alpha = 90, beta = 90, gamma = 90 [deg]
    effective LatticeParameters:
      X = (0.0000e+00, 0.0000e+00, -1.0000e+00)
      Y = (0.707107, 0.707107, 0.0000e+00)
      Z = (0.707107, -7.0711e-01, 0.0000e+00)

================
RegionInterface: "Nitride_1.1/HfO2_1"
  (material interface is "Nitride/HfO2")
================
  Model: "BarrierTunneling_NLM_gateD"
    Parameter "alphae" is new with value equal to 0
    Parameter "alphah" is new with value equal to 0
    Parameter "eA" is new with value equal to 1
    Parameter "eBL_max" is new with value equal to 0.3
    Parameter "eQuantumPotentialFactor" is new with value equal to 0
    Parameter "eQuantumPotentialPosFac" is new with value equal to 0
    Parameter "g_e" is new with value equal to 1
    Parameter "g_h" is new with value equal to 1
    Parameter "hA" is new with value equal to 1
    Parameter "hBL_max" is new with value equal to 0.3
    Parameter "hQuantumPotentialFactor" is new with value equal to 0
    Parameter "hQuantumPotentialPosFac" is new with value equal to 0
    Parameter "mt_e" is new with value equal to 1
    Parameter "mt_h" is new with value equal to 1
  Model: "BarrierTunneling_NLM_gateS"
    Parameter "alphae" is new with value equal to 0
    Parameter "alphah" is new with value equal to 0
    Parameter "eA" is new with value equal to 1
    Parameter "eBL_max" is new with value equal to 0.3
    Parameter "eQuantumPotentialFactor" is new with value equal to 0
    Parameter "eQuantumPotentialPosFac" is new with value equal to 0
    Parameter "g_e" is new with value equal to 1
    Parameter "g_h" is new with value equal to 1
    Parameter "hA" is new with value equal to 1
    Parameter "hBL_max" is new with value equal to 0.3
    Parameter "hQuantumPotentialFactor" is new with value equal to 0
    Parameter "hQuantumPotentialPosFac" is new with value equal to 0
    Parameter "mt_e" is new with value equal to 1
    Parameter "mt_h" is new with value equal to 1

================
RegionInterface: "Nitride_1.2/HfO2_1"
  (material interface is "Nitride/HfO2")
================
  Model: "BarrierTunneling_NLM_gateD"
    Parameter "alphae" is new with value equal to 0
    Parameter "alphah" is new with value equal to 0
    Parameter "eA" is new with value equal to 1
    Parameter "eBL_max" is new with value equal to 0.3
    Parameter "eQuantumPotentialFactor" is new with value equal to 0
    Parameter "eQuantumPotentialPosFac" is new with value equal to 0
    Parameter "g_e" is new with value equal to 1
    Parameter "g_h" is new with value equal to 1
    Parameter "hA" is new with value equal to 1
    Parameter "hBL_max" is new with value equal to 0.3
    Parameter "hQuantumPotentialFactor" is new with value equal to 0
    Parameter "hQuantumPotentialPosFac" is new with value equal to 0
    Parameter "mt_e" is new with value equal to 1
    Parameter "mt_h" is new with value equal to 1
  Model: "BarrierTunneling_NLM_gateS"
    Parameter "alphae" is new with value equal to 0
    Parameter "alphah" is new with value equal to 0
    Parameter "eA" is new with value equal to 1
    Parameter "eBL_max" is new with value equal to 0.3
    Parameter "eQuantumPotentialFactor" is new with value equal to 0
    Parameter "eQuantumPotentialPosFac" is new with value equal to 0
    Parameter "g_e" is new with value equal to 1
    Parameter "g_h" is new with value equal to 1
    Parameter "hA" is new with value equal to 1
    Parameter "hBL_max" is new with value equal to 0.3
    Parameter "hQuantumPotentialFactor" is new with value equal to 0
    Parameter "hQuantumPotentialPosFac" is new with value equal to 0
    Parameter "mt_e" is new with value equal to 1
    Parameter "mt_h" is new with value equal to 1

================
RegionInterface: "HfO2_1/Nitride_1.3"
  (material interface is "HfO2/Nitride")
================
  Model: "BarrierTunneling_NLM_gateD"
    Parameter "alphae" is new with value equal to 0
    Parameter "alphah" is new with value equal to 0
    Parameter "eA" is new with value equal to 1
    Parameter "eBL_max" is new with value equal to 0.3
    Parameter "eQuantumPotentialFactor" is new with value equal to 0
    Parameter "eQuantumPotentialPosFac" is new with value equal to 0
    Parameter "g_e" is new with value equal to 1
    Parameter "g_h" is new with value equal to 1
    Parameter "hA" is new with value equal to 1
    Parameter "hBL_max" is new with value equal to 0.3
    Parameter "hQuantumPotentialFactor" is new with value equal to 0
    Parameter "hQuantumPotentialPosFac" is new with value equal to 0
    Parameter "mt_e" is new with value equal to 1
    Parameter "mt_h" is new with value equal to 1
  Model: "BarrierTunneling_NLM_gateS"
    Parameter "alphae" is new with value equal to 0
    Parameter "alphah" is new with value equal to 0
    Parameter "eA" is new with value equal to 1
    Parameter "eBL_max" is new with value equal to 0.3
    Parameter "eQuantumPotentialFactor" is new with value equal to 0
    Parameter "eQuantumPotentialPosFac" is new with value equal to 0
    Parameter "g_e" is new with value equal to 1
    Parameter "g_h" is new with value equal to 1
    Parameter "hA" is new with value equal to 1
    Parameter "hBL_max" is new with value equal to 0.3
    Parameter "hQuantumPotentialFactor" is new with value equal to 0
    Parameter "hQuantumPotentialPosFac" is new with value equal to 0
    Parameter "mt_e" is new with value equal to 1
    Parameter "mt_h" is new with value equal to 1

================
RegionInterface: "Oxide_1/HfO2_1"
  (material interface is "Oxide/HfO2")
================
  Model: "BarrierTunneling_NLM_gateD"
    Parameter "alphae" is new with value equal to 0
    Parameter "alphah" is new with value equal to 0
    Parameter "eA" is new with value equal to 1
    Parameter "eBL_max" is new with value equal to 0.3
    Parameter "eQuantumPotentialFactor" is new with value equal to 0
    Parameter "eQuantumPotentialPosFac" is new with value equal to 0
    Parameter "g_e" is new with value equal to 1
    Parameter "g_h" is new with value equal to 1
    Parameter "hA" is new with value equal to 1
    Parameter "hBL_max" is new with value equal to 0.3
    Parameter "hQuantumPotentialFactor" is new with value equal to 0
    Parameter "hQuantumPotentialPosFac" is new with value equal to 0
    Parameter "mt_e" is new with value equal to 1
    Parameter "mt_h" is new with value equal to 1
  Model: "BarrierTunneling_NLM_gateS"
    Parameter "alphae" is new with value equal to 0
    Parameter "alphah" is new with value equal to 0
    Parameter "eA" is new with value equal to 1
    Parameter "eBL_max" is new with value equal to 0.3
    Parameter "eQuantumPotentialFactor" is new with value equal to 0
    Parameter "eQuantumPotentialPosFac" is new with value equal to 0
    Parameter "g_e" is new with value equal to 1
    Parameter "g_h" is new with value equal to 1
    Parameter "hA" is new with value equal to 1
    Parameter "hBL_max" is new with value equal to 0.3
    Parameter "hQuantumPotentialFactor" is new with value equal to 0
    Parameter "hQuantumPotentialPosFac" is new with value equal to 0
    Parameter "mt_e" is new with value equal to 1
    Parameter "mt_h" is new with value equal to 1

================
RegionInterface: "Nitride_1.1/Oxide_1"
  (material interface is "Nitride/Oxide")
================
  Model: "BarrierTunneling_NLM_gateD"
    Parameter "alphae" is new with value equal to 0
    Parameter "alphah" is new with value equal to 0
    Parameter "eA" is new with value equal to 1
    Parameter "eBL_max" is new with value equal to 0.3
    Parameter "eQuantumPotentialFactor" is new with value equal to 0
    Parameter "eQuantumPotentialPosFac" is new with value equal to 0
    Parameter "g_e" is new with value equal to 1
    Parameter "g_h" is new with value equal to 1
    Parameter "hA" is new with value equal to 1
    Parameter "hBL_max" is new with value equal to 0.3
    Parameter "hQuantumPotentialFactor" is new with value equal to 0
    Parameter "hQuantumPotentialPosFac" is new with value equal to 0
    Parameter "mt_e" is new with value equal to 1
    Parameter "mt_h" is new with value equal to 1
  Model: "BarrierTunneling_NLM_gateS"
    Parameter "alphae" is new with value equal to 0
    Parameter "alphah" is new with value equal to 0
    Parameter "eA" is new with value equal to 1
    Parameter "eBL_max" is new with value equal to 0.3
    Parameter "eQuantumPotentialFactor" is new with value equal to 0
    Parameter "eQuantumPotentialPosFac" is new with value equal to 0
    Parameter "g_e" is new with value equal to 1
    Parameter "g_h" is new with value equal to 1
    Parameter "hA" is new with value equal to 1
    Parameter "hBL_max" is new with value equal to 0.3
    Parameter "hQuantumPotentialFactor" is new with value equal to 0
    Parameter "hQuantumPotentialPosFac" is new with value equal to 0
    Parameter "mt_e" is new with value equal to 1
    Parameter "mt_h" is new with value equal to 1

================
RegionInterface: "Silicon_1/Nitride_1.1"
  (material interface is "Silicon/Nitride")
================
  Model: "BarrierTunneling_NLM_gateD"
    Parameter "alphae" is new with value equal to 0
    Parameter "alphah" is new with value equal to 0
    Parameter "eA" is new with value equal to 1
    Parameter "eBL_max" is new with value equal to 0.3
    Parameter "eQuantumPotentialFactor" is new with value equal to 0
    Parameter "eQuantumPotentialPosFac" is new with value equal to 0
    Parameter "g_e" is new with value equal to 1
    Parameter "g_h" is new with value equal to 1
    Parameter "hA" is new with value equal to 1
    Parameter "hBL_max" is new with value equal to 0.3
    Parameter "hQuantumPotentialFactor" is new with value equal to 0
    Parameter "hQuantumPotentialPosFac" is new with value equal to 0
    Parameter "mt_e" is new with value equal to 1
    Parameter "mt_h" is new with value equal to 1
  Model: "BarrierTunneling_NLM_gateS"
    Parameter "alphae" is new with value equal to 0
    Parameter "alphah" is new with value equal to 0
    Parameter "eA" is new with value equal to 1
    Parameter "eBL_max" is new with value equal to 0.3
    Parameter "eQuantumPotentialFactor" is new with value equal to 0
    Parameter "eQuantumPotentialPosFac" is new with value equal to 0
    Parameter "g_e" is new with value equal to 1
    Parameter "g_h" is new with value equal to 1
    Parameter "hA" is new with value equal to 1
    Parameter "hBL_max" is new with value equal to 0.3
    Parameter "hQuantumPotentialFactor" is new with value equal to 0
    Parameter "hQuantumPotentialPosFac" is new with value equal to 0
    Parameter "mt_e" is new with value equal to 1
    Parameter "mt_h" is new with value equal to 1

================
RegionInterface: "Nitride_1.2/Oxide_1"
  (material interface is "Nitride/Oxide")
================
  Model: "BarrierTunneling_NLM_gateD"
    Parameter "alphae" is new with value equal to 0
    Parameter "alphah" is new with value equal to 0
    Parameter "eA" is new with value equal to 1
    Parameter "eBL_max" is new with value equal to 0.3
    Parameter "eQuantumPotentialFactor" is new with value equal to 0
    Parameter "eQuantumPotentialPosFac" is new with value equal to 0
    Parameter "g_e" is new with value equal to 1
    Parameter "g_h" is new with value equal to 1
    Parameter "hA" is new with value equal to 1
    Parameter "hBL_max" is new with value equal to 0.3
    Parameter "hQuantumPotentialFactor" is new with value equal to 0
    Parameter "hQuantumPotentialPosFac" is new with value equal to 0
    Parameter "mt_e" is new with value equal to 1
    Parameter "mt_h" is new with value equal to 1
  Model: "BarrierTunneling_NLM_gateS"
    Parameter "alphae" is new with value equal to 0
    Parameter "alphah" is new with value equal to 0
    Parameter "eA" is new with value equal to 1
    Parameter "eBL_max" is new with value equal to 0.3
    Parameter "eQuantumPotentialFactor" is new with value equal to 0
    Parameter "eQuantumPotentialPosFac" is new with value equal to 0
    Parameter "g_e" is new with value equal to 1
    Parameter "g_h" is new with value equal to 1
    Parameter "hA" is new with value equal to 1
    Parameter "hBL_max" is new with value equal to 0.3
    Parameter "hQuantumPotentialFactor" is new with value equal to 0
    Parameter "hQuantumPotentialPosFac" is new with value equal to 0
    Parameter "mt_e" is new with value equal to 1
    Parameter "mt_h" is new with value equal to 1

================
RegionInterface: "Silicon_1/Nitride_1.2"
  (material interface is "Silicon/Nitride")
================
  Model: "BarrierTunneling_NLM_gateD"
    Parameter "alphae" is new with value equal to 0
    Parameter "alphah" is new with value equal to 0
    Parameter "eA" is new with value equal to 1
    Parameter "eBL_max" is new with value equal to 0.3
    Parameter "eQuantumPotentialFactor" is new with value equal to 0
    Parameter "eQuantumPotentialPosFac" is new with value equal to 0
    Parameter "g_e" is new with value equal to 1
    Parameter "g_h" is new with value equal to 1
    Parameter "hA" is new with value equal to 1
    Parameter "hBL_max" is new with value equal to 0.3
    Parameter "hQuantumPotentialFactor" is new with value equal to 0
    Parameter "hQuantumPotentialPosFac" is new with value equal to 0
    Parameter "mt_e" is new with value equal to 1
    Parameter "mt_h" is new with value equal to 1
  Model: "BarrierTunneling_NLM_gateS"
    Parameter "alphae" is new with value equal to 0
    Parameter "alphah" is new with value equal to 0
    Parameter "eA" is new with value equal to 1
    Parameter "eBL_max" is new with value equal to 0.3
    Parameter "eQuantumPotentialFactor" is new with value equal to 0
    Parameter "eQuantumPotentialPosFac" is new with value equal to 0
    Parameter "g_e" is new with value equal to 1
    Parameter "g_h" is new with value equal to 1
    Parameter "hA" is new with value equal to 1
    Parameter "hBL_max" is new with value equal to 0.3
    Parameter "hQuantumPotentialFactor" is new with value equal to 0
    Parameter "hQuantumPotentialPosFac" is new with value equal to 0
    Parameter "mt_e" is new with value equal to 1
    Parameter "mt_h" is new with value equal to 1

================
RegionInterface: "Silicon_1/Oxide_1"
  (material interface is "Silicon/Oxide")
================
  Model: "BarrierTunneling_NLM_gateD"
    Parameter "alphae" is new with value equal to 0
    Parameter "alphah" is new with value equal to 0
    Parameter "eA" is new with value equal to 1
    Parameter "eBL_max" is new with value equal to 0.3
    Parameter "eQuantumPotentialFactor" is new with value equal to 0
    Parameter "eQuantumPotentialPosFac" is new with value equal to 0
    Parameter "g_e" is new with value equal to 1
    Parameter "g_h" is new with value equal to 1
    Parameter "hA" is new with value equal to 1
    Parameter "hBL_max" is new with value equal to 0.3
    Parameter "hQuantumPotentialFactor" is new with value equal to 0
    Parameter "hQuantumPotentialPosFac" is new with value equal to 0
    Parameter "mt_e" is new with value equal to 1
    Parameter "mt_h" is new with value equal to 1
  Model: "BarrierTunneling_NLM_gateS"
    Parameter "alphae" is new with value equal to 0
    Parameter "alphah" is new with value equal to 0
    Parameter "eA" is new with value equal to 1
    Parameter "eBL_max" is new with value equal to 0.3
    Parameter "eQuantumPotentialFactor" is new with value equal to 0
    Parameter "eQuantumPotentialPosFac" is new with value equal to 0
    Parameter "g_e" is new with value equal to 1
    Parameter "g_h" is new with value equal to 1
    Parameter "hA" is new with value equal to 1
    Parameter "hBL_max" is new with value equal to 0.3
    Parameter "hQuantumPotentialFactor" is new with value equal to 0
    Parameter "hQuantumPotentialPosFac" is new with value equal to 0
    Parameter "mt_e" is new with value equal to 1
    Parameter "mt_h" is new with value equal to 1

==========
Electrode: "drain"
==========
  Model: "BarrierTunneling_NLM_gateD"
    Parameter "alphae" is new with value equal to 0
    Parameter "alphah" is new with value equal to 0
    Parameter "eA" is new with value equal to 1
    Parameter "eBL_max" is new with value equal to 0.3
    Parameter "eQuantumPotentialFactor" is new with value equal to 0
    Parameter "eQuantumPotentialPosFac" is new with value equal to 0
    Parameter "g_e" is new with value equal to 1
    Parameter "g_h" is new with value equal to 1
    Parameter "hA" is new with value equal to 1
    Parameter "hBL_max" is new with value equal to 0.3
    Parameter "hQuantumPotentialFactor" is new with value equal to 0
    Parameter "hQuantumPotentialPosFac" is new with value equal to 0
    Parameter "mt_e" is new with value equal to 1
    Parameter "mt_h" is new with value equal to 1
  Model: "BarrierTunneling_NLM_gateS"
    Parameter "alphae" is new with value equal to 0
    Parameter "alphah" is new with value equal to 0
    Parameter "eA" is new with value equal to 1
    Parameter "eBL_max" is new with value equal to 0.3
    Parameter "eQuantumPotentialFactor" is new with value equal to 0
    Parameter "eQuantumPotentialPosFac" is new with value equal to 0
    Parameter "g_e" is new with value equal to 1
    Parameter "g_h" is new with value equal to 1
    Parameter "hA" is new with value equal to 1
    Parameter "hBL_max" is new with value equal to 0.3
    Parameter "hQuantumPotentialFactor" is new with value equal to 0
    Parameter "hQuantumPotentialPosFac" is new with value equal to 0
    Parameter "mt_e" is new with value equal to 1
    Parameter "mt_h" is new with value equal to 1

==========
Electrode: "gateD"
==========
  Model: "BarrierTunneling_NLM_gateD"
    Parameter "alphae" is new with value equal to 0
    Parameter "alphah" is new with value equal to 0
    Parameter "eA" is new with value equal to 1
    Parameter "eBL_max" is new with value equal to 0.3
    Parameter "eQuantumPotentialFactor" is new with value equal to 0
    Parameter "eQuantumPotentialPosFac" is new with value equal to 0
    Parameter "g_e" is new with value equal to 1
    Parameter "g_h" is new with value equal to 1
    Parameter "hA" is new with value equal to 1
    Parameter "hBL_max" is new with value equal to 0.3
    Parameter "hQuantumPotentialFactor" is new with value equal to 0
    Parameter "hQuantumPotentialPosFac" is new with value equal to 0
    Parameter "mt_e" is new with value equal to 1
    Parameter "mt_h" is new with value equal to 1
  Model: "BarrierTunneling_NLM_gateS"
    Parameter "alphae" is new with value equal to 0
    Parameter "alphah" is new with value equal to 0
    Parameter "eA" is new with value equal to 1
    Parameter "eBL_max" is new with value equal to 0.3
    Parameter "eQuantumPotentialFactor" is new with value equal to 0
    Parameter "eQuantumPotentialPosFac" is new with value equal to 0
    Parameter "g_e" is new with value equal to 1
    Parameter "g_h" is new with value equal to 1
    Parameter "hA" is new with value equal to 1
    Parameter "hBL_max" is new with value equal to 0.3
    Parameter "hQuantumPotentialFactor" is new with value equal to 0
    Parameter "hQuantumPotentialPosFac" is new with value equal to 0
    Parameter "mt_e" is new with value equal to 1
    Parameter "mt_h" is new with value equal to 1

==========
Electrode: "gateS"
==========
  Model: "BarrierTunneling_NLM_gateD"
    Parameter "alphae" is new with value equal to 0
    Parameter "alphah" is new with value equal to 0
    Parameter "eA" is new with value equal to 1
    Parameter "eBL_max" is new with value equal to 0.3
    Parameter "eQuantumPotentialFactor" is new with value equal to 0
    Parameter "eQuantumPotentialPosFac" is new with value equal to 0
    Parameter "g_e" is new with value equal to 1
    Parameter "g_h" is new with value equal to 1
    Parameter "hA" is new with value equal to 1
    Parameter "hBL_max" is new with value equal to 0.3
    Parameter "hQuantumPotentialFactor" is new with value equal to 0
    Parameter "hQuantumPotentialPosFac" is new with value equal to 0
    Parameter "mt_e" is new with value equal to 1
    Parameter "mt_h" is new with value equal to 1
  Model: "BarrierTunneling_NLM_gateS"
    Parameter "alphae" is new with value equal to 0
    Parameter "alphah" is new with value equal to 0
    Parameter "eA" is new with value equal to 1
    Parameter "eBL_max" is new with value equal to 0.3
    Parameter "eQuantumPotentialFactor" is new with value equal to 0
    Parameter "eQuantumPotentialPosFac" is new with value equal to 0
    Parameter "g_e" is new with value equal to 1
    Parameter "g_h" is new with value equal to 1
    Parameter "hA" is new with value equal to 1
    Parameter "hBL_max" is new with value equal to 0.3
    Parameter "hQuantumPotentialFactor" is new with value equal to 0
    Parameter "hQuantumPotentialPosFac" is new with value equal to 0
    Parameter "mt_e" is new with value equal to 1
    Parameter "mt_h" is new with value equal to 1

==========
Electrode: "source"
==========
  Model: "BarrierTunneling_NLM_gateD"
    Parameter "alphae" is new with value equal to 0
    Parameter "alphah" is new with value equal to 0
    Parameter "eA" is new with value equal to 1
    Parameter "eBL_max" is new with value equal to 0.3
    Parameter "eQuantumPotentialFactor" is new with value equal to 0
    Parameter "eQuantumPotentialPosFac" is new with value equal to 0
    Parameter "g_e" is new with value equal to 1
    Parameter "g_h" is new with value equal to 1
    Parameter "hA" is new with value equal to 1
    Parameter "hBL_max" is new with value equal to 0.3
    Parameter "hQuantumPotentialFactor" is new with value equal to 0
    Parameter "hQuantumPotentialPosFac" is new with value equal to 0
    Parameter "mt_e" is new with value equal to 1
    Parameter "mt_h" is new with value equal to 1
  Model: "BarrierTunneling_NLM_gateS"
    Parameter "alphae" is new with value equal to 0
    Parameter "alphah" is new with value equal to 0
    Parameter "eA" is new with value equal to 1
    Parameter "eBL_max" is new with value equal to 0.3
    Parameter "eQuantumPotentialFactor" is new with value equal to 0
    Parameter "eQuantumPotentialPosFac" is new with value equal to 0
    Parameter "g_e" is new with value equal to 1
    Parameter "g_h" is new with value equal to 1
    Parameter "hA" is new with value equal to 1
    Parameter "hBL_max" is new with value equal to 0.3
    Parameter "hQuantumPotentialFactor" is new with value equal to 0
    Parameter "hQuantumPotentialPosFac" is new with value equal to 0
    Parameter "mt_e" is new with value equal to 1
    Parameter "mt_h" is new with value equal to 1

==========
Electrode: "substrate"
==========
  Model: "BarrierTunneling_NLM_gateD"
    Parameter "alphae" is new with value equal to 0
    Parameter "alphah" is new with value equal to 0
    Parameter "eA" is new with value equal to 1
    Parameter "eBL_max" is new with value equal to 0.3
    Parameter "eQuantumPotentialFactor" is new with value equal to 0
    Parameter "eQuantumPotentialPosFac" is new with value equal to 0
    Parameter "g_e" is new with value equal to 1
    Parameter "g_h" is new with value equal to 1
    Parameter "hA" is new with value equal to 1
    Parameter "hBL_max" is new with value equal to 0.3
    Parameter "hQuantumPotentialFactor" is new with value equal to 0
    Parameter "hQuantumPotentialPosFac" is new with value equal to 0
    Parameter "mt_e" is new with value equal to 1
    Parameter "mt_h" is new with value equal to 1
  Model: "BarrierTunneling_NLM_gateS"
    Parameter "alphae" is new with value equal to 0
    Parameter "alphah" is new with value equal to 0
    Parameter "eA" is new with value equal to 1
    Parameter "eBL_max" is new with value equal to 0.3
    Parameter "eQuantumPotentialFactor" is new with value equal to 0
    Parameter "eQuantumPotentialPosFac" is new with value equal to 0
    Parameter "g_e" is new with value equal to 1
    Parameter "g_h" is new with value equal to 1
    Parameter "hA" is new with value equal to 1
    Parameter "hBL_max" is new with value equal to 0.3
    Parameter "hQuantumPotentialFactor" is new with value equal to 0
    Parameter "hQuantumPotentialPosFac" is new with value equal to 0
    Parameter "mt_e" is new with value equal to 1
    Parameter "mt_h" is new with value equal to 1


Acceptor and donor concentrations (AcceptorConcentration, DonorConcentration):
    computed based on the following species from the doping file:
        ArsenicActiveConcentration (donor)
        PhosphorusActiveConcentration (donor)
        BoronActiveConcentration (acceptor)
Net doping concentration (DopingConcentration):
    obtained from doping file
Total doping concentration (TotalConcentration):
    recomputed from acceptor and donor concentrations



With Constant Reference Potential:
  Parameters of Reference Semiconductor:
    The Electron Affinity: 4.07274
    The Band Gap: 1.10821
    The Electron DOS: 2.8583e+19
    The Hole DOS: 3.1046e+19
  The Constant Reference Potential: 4.62578

===============================
Starting solve of next problem:
 Poisson
===============================

Computing poisson-equation 
using Bank/Rose nonlinear solver.

Iteration   |Rhs|      factor     |step|     error   #inner  #iterative  time
------------------------------------------------------------------------------
    0      9.26e+02                                                      0.00
    1      3.68e+01   1.00e+00   4.48e+00   9.16e+04    0         1      0.00
    2      5.17e+00   1.00e+00   2.30e+00   6.35e+04    0         1      0.01
    3      8.40e-01   1.00e+00   6.93e-01   1.50e+04    0         1      0.01
    4      1.74e-02   1.00e+00   1.46e-01   2.34e+03    0         1      0.02
    5      1.26e-04   1.00e+00   1.16e-02   1.60e+02    0         1      0.02
    6      1.72e-08   1.00e+00   1.12e-04   1.45e+00    0         1      0.03
Finished, because...
|RHS| less than 1.0000E-05.

Accumulated times:
Assembly time:        0.00 s
Solve time:      0.03 s
Total time:      0.03 s

contact        voltage     electron current    hole current  conduction current
 drain        0.000E+00       4.958E-23         9.659E-25        5.054E-23
 gateD        0.000E+00      -4.378E-37        -7.018E-71       -4.378E-37
 gateS        0.000E+00      -2.999E-42        -1.509E-66       -2.999E-42
 source       0.000E+00       1.367E-26         1.894E-24        1.907E-24
 substrate    0.000E+00      -4.959E-23        -2.860E-24       -5.245E-23


===============================
Starting solve of next problem:
Coupled ( Digits : 5, Max. #iterations : 20, 
    Solver : blocked decomposition,
    #undamped iterations : 1000 
    )
    { Poisson Electron Hole } 
===============================

Computing Coupled( 1 poisson-equation(s) , 1 electron-equation(s) , 
                   1 hole-equation(s) ) 
using Bank/Rose nonlinear solver.

Iteration   |Rhs|      factor     |step|     error   #inner  #iterative  time
------------------------------------------------------------------------------
    0      3.25e-03                                                      0.06
    1      6.89e-04   1.00e+00   1.49e-08   8.69e-04    0         1      0.25
Finished, because...
Error smaller than 1 ( 8.6881E-04 ).

Accumulated times:
Assembly time:        0.20 s
Solve time:      0.05 s
Total time:      0.25 s

contact        voltage     electron current    hole current  conduction current
 drain        0.000E+00      -2.714E-22         4.444E-27       -2.714E-22
 gateD        0.000E+00       1.300E-36        -3.477E-60        1.300E-36
 gateS        0.000E+00      -1.026E-42         3.865E-55       -1.026E-42
 source       0.000E+00       4.004E-27         3.272E-26        3.672E-26
 substrate    0.000E+00       2.714E-22        -3.716E-26        2.714E-22


===============================
Starting solve of next problem:
Quasistationary ( Digits : 5, Max. #iterations : 20, 
      Initial step in t : 0.1, 
      Minimum step in t : 1.0000e-05, Maximum step in t : 1, 
      Increment : 1.5, Decrement : 2, 
      Goal values :
        Contact drain : 0.08V
    )
  {
    Coupled ( Digits : 5, Max. #iterations : 20, 
        Solver : blocked decomposition,
        #undamped iterations : 1000 
        )
        { Poisson Electron Hole } 
  }
===============================

Computing step from t=0.0000e+00 to t=0.1 (Stepsize: 0.1) :
Computing Coupled( 1 poisson-equation(s) , 1 electron-equation(s) , 
                   1 hole-equation(s) ) 
using Bank/Rose nonlinear solver.

Iteration   |Rhs|      factor     |step|     error   #inner  #iterative  time
------------------------------------------------------------------------------
    0      2.50e+10                                                      0.12
    1      2.21e+10   1.00e+00   1.76e-01   5.44e+03    0         1      0.32
    2      4.96e+09   1.00e+00   8.75e-02   2.05e+03    0         1      0.52
    3      2.42e+08   1.00e+00   9.30e-03   2.75e+02    0         1      0.72
    4      2.55e+05   1.00e+00   5.78e-04   1.44e+01    0         1      0.92
    5      3.99e-01   1.00e+00   9.74e-07   1.90e-02    0         1      1.11
Finished, because...
Error smaller than 1 ( 1.9021E-02 ).

Accumulated times:
Assembly time:        0.83 s
Solve time:      0.28 s
Total time:      1.11 s

contact        voltage     electron current    hole current  conduction current
 drain        8.000E-03       1.331E-16         2.123E-20        1.332E-16
 gateD        0.000E+00      -3.521E-23        -3.422E-50       -3.521E-23
 gateS        0.000E+00      -3.666E-29        -8.542E-52       -3.666E-29
 source       0.000E+00      -1.076E-16        -8.075E-27       -1.076E-16
 substrate    0.000E+00       3.282E-20        -2.554E-17       -2.551E-17

Computing step from t=0.1 to t=0.236667 (Stepsize: 0.136667) :
Extrapolating values for t = 0.236667 ... done.
Computing Coupled( 1 poisson-equation(s) , 1 electron-equation(s) , 
                   1 hole-equation(s) ) 
using Bank/Rose nonlinear solver.

Iteration   |Rhs|      factor     |step|     error   #inner  #iterative  time
------------------------------------------------------------------------------
    0      9.44e-01                                                      0.14
    1      9.07e+02   1.00e+00   1.44e-02   1.59e+01    0         1      0.33
    2      5.72e-04   1.00e+00   8.30e-05   1.43e-02    0         1      0.53
Finished, because...
Error smaller than 1 ( 1.4331E-02 ).

Accumulated times:
Assembly time:        0.42 s
Solve time:      0.11 s
Total time:      0.53 s

contact        voltage     electron current    hole current  conduction current
 drain        1.893E-02       2.289E-16         4.017E-20        2.290E-16
 gateD        0.000E+00      -7.650E-23        -3.929E-50       -7.650E-23
 gateS        0.000E+00      -7.286E-29        -1.489E-51       -7.286E-29
 source       0.000E+00      -1.730E-16         2.085E-26       -1.730E-16
 substrate    0.000E+00       1.178E-20        -5.602E-17       -5.601E-17

Computing step from t=0.236667 to t=0.437111 (Stepsize: 0.200444) :
Extrapolating values for t = 0.437111 ... done.
Computing Coupled( 1 poisson-equation(s) , 1 electron-equation(s) , 
                   1 hole-equation(s) ) 
using Bank/Rose nonlinear solver.

Iteration   |Rhs|      factor     |step|     error   #inner  #iterative  time
------------------------------------------------------------------------------
    0      5.85e-01                                                      0.13
    1      3.96e+03   1.00e+00   2.97e-02   3.26e+01    0         1      0.33
    2      2.55e-02   1.00e+00   3.89e-04   5.38e-02    0         1      0.53
Finished, because...
Error smaller than 1 ( 5.3787E-02 ).

Accumulated times:
Assembly time:        0.43 s
Solve time:      0.10 s
Total time:      0.53 s

contact        voltage     electron current    hole current  conduction current
 drain        3.497E-02       2.926E-16         5.487E-20        2.927E-16
 gateD        0.000E+00      -1.278E-22        -3.597E-50       -1.278E-22
 gateS        0.000E+00      -1.068E-28        -1.939E-51       -1.068E-28
 source       0.000E+00      -1.992E-16         5.683E-26       -1.992E-16
 substrate    0.000E+00       2.301E-19        -9.373E-17       -9.350E-17

Computing step from t=0.437111 to t=0.731096 (Stepsize: 0.293985) :
Extrapolating values for t = 0.731096 ... done.
Computing Coupled( 1 poisson-equation(s) , 1 electron-equation(s) , 
                   1 hole-equation(s) ) 
using Bank/Rose nonlinear solver.

Iteration   |Rhs|      factor     |step|     error   #inner  #iterative  time
------------------------------------------------------------------------------
    0      5.47e-02                                                      0.14
    1      1.75e+04   1.00e+00   5.64e-02   6.84e+01    0         1      0.33
    2      4.55e-01   1.00e+00   2.31e-03   2.43e-01    0         1      0.53
Finished, because...
Error smaller than 1 ( 2.4304E-01 ).

Accumulated times:
Assembly time:        0.41 s
Solve time:      0.12 s
Total time:      0.53 s

contact        voltage     electron current    hole current  conduction current
 drain        5.849E-02       3.367E-16         6.283E-20        3.367E-16
 gateD        0.000E+00      -1.936E-22        -6.386E-50       -1.936E-22
 gateS        0.000E+00      -1.340E-28        -2.300E-51       -1.340E-28
 source       0.000E+00      -2.059E-16         2.082E-25       -2.059E-16
 substrate    0.000E+00       8.064E-18        -1.389E-16       -1.308E-16

Computing step from t=0.731096 to t=1 (Stepsize: 0.268904) :
Extrapolating values for t = 1 ... done.
Computing Coupled( 1 poisson-equation(s) , 1 electron-equation(s) , 
                   1 hole-equation(s) ) 
using Bank/Rose nonlinear solver.

Iteration   |Rhs|      factor     |step|     error   #inner  #iterative  time
------------------------------------------------------------------------------
    0      7.41e-01                                                      0.13
    1      1.97e+04   1.00e+00   4.52e-02   6.89e+01    0         1      0.33
    2      4.10e-01   1.00e+00   3.48e-03   3.08e-01    0         1      0.53
Finished, because...
Error smaller than 1 ( 3.0787E-01 ).

Accumulated times:
Assembly time:        0.42 s
Solve time:      0.11 s
Total time:      0.53 s

contact        voltage     electron current    hole current  conduction current
 drain        8.000E-02       3.788E-16         6.478E-20        3.789E-16
 gateD        0.000E+00      -2.531E-22        -5.451E-50       -2.531E-22
 gateS        0.000E+00      -1.476E-28        -2.582E-51       -1.476E-28
 source       0.000E+00      -2.096E-16         2.036E-25       -2.096E-16
 substrate    0.000E+00       4.348E-18        -1.736E-16       -1.693E-16


Finished, because...
Curve trace finished.


===============================
Starting solve of next problem:
Quasistationary ( Digits : 5, Max. #iterations : 20, 
      Initial step in t : 0.01, 
      Minimum step in t : 1.0000e-05, Maximum step in t : 0.05, 
      Increment : 1.5, Decrement : 2, 
      DoZero      Goal values :
        Contact gateD : 2.5V,
        Contact gateS : 2.5V
    )
  {
    Coupled ( Digits : 5, Max. #iterations : 20, 
        Solver : blocked decomposition,
        #undamped iterations : 1000 
        )
        { Poisson Electron Hole } 
    Plot( FilePrefix = "n15_Profile_LowVd" nooverwrite -loadable
         Time (fixed times:
             0.0000e+00 0.2 0.3 0.4 0.5
             1) )
      { }
  }
===============================

Computing solution for t=0 :
Computing Coupled( 1 poisson-equation(s) , 1 electron-equation(s) , 
                   1 hole-equation(s) ) 
using Bank/Rose nonlinear solver.

Iteration   |Rhs|      factor     |step|     error   #inner  #iterative  time
------------------------------------------------------------------------------
    0      4.10e-01                                                      0.00
    1      5.04e-04   1.00e+00   1.45e-04   1.65e-02    0         1      0.20
Finished, because...
Error smaller than 1 ( 1.6494E-02 ).

Accumulated times:
Assembly time:        0.14 s
Solve time:      0.06 s
Total time:      0.20 s

contact        voltage     electron current    hole current  conduction current
 drain        8.000E-02       3.831E-16         6.482E-20        3.832E-16
 gateD        0.000E+00      -2.531E-22        -5.451E-50       -2.531E-22
 gateS        0.000E+00      -1.476E-28        -2.610E-51       -1.476E-28
 source       0.000E+00      -2.096E-16        -6.181E-26       -2.096E-16
 substrate    0.000E+00      -1.727E-20        -1.736E-16       -1.736E-16


Plot started:
Saving device '':
    Writing plot 'n15_Profile_LowVd_0000_des.tdr' (TDR format) ... done.
Plot finished.

Computing step from t=0.0000e+00 to t=0.01 (Stepsize: 0.01) :
Computing Coupled( 1 poisson-equation(s) , 1 electron-equation(s) , 
                   1 hole-equation(s) ) 
using Bank/Rose nonlinear solver.

Iteration   |Rhs|      factor     |step|     error   #inner  #iterative  time
------------------------------------------------------------------------------
    0      5.44e+01                                                      0.13
    1      5.10e+06   1.00e+00   2.73e-01   2.39e+04    0         1      0.33
    2      4.41e+04   1.00e+00   6.25e-02   4.27e+03    0         1      0.52
    3      1.48e+00   1.00e+00   2.29e-03   2.01e+02    0         1      0.72
    4      5.42e-04   1.00e+00   4.37e-06   3.96e-01    0         1      0.91
Finished, because...
Error smaller than 1 ( 3.9614E-01 ).

Accumulated times:
Assembly time:        0.69 s
Solve time:      0.21 s
Total time:      0.91 s

contact        voltage     electron current    hole current  conduction current
 drain        8.000E-02       5.733E-16         6.482E-20        5.733E-16
 gateD        2.500E-02      -1.657E-22         1.019E-48       -1.657E-22
 gateS        2.500E-02       7.658E-28         3.635E-42        7.658E-28
 source       0.000E+00      -3.998E-16         3.548E-24       -3.998E-16
 substrate    0.000E+00      -1.710E-20        -1.735E-16       -1.736E-16

Computing step from t=0.01 to t=0.024 (Stepsize: 0.014) :
Extrapolating values for t = 0.024 ... done.
Computing Coupled( 1 poisson-equation(s) , 1 electron-equation(s) , 
                   1 hole-equation(s) ) 
using Bank/Rose nonlinear solver.

Iteration   |Rhs|      factor     |step|     error   #inner  #iterative  time
------------------------------------------------------------------------------
    0      1.17e-02                                                      0.13
    1      3.45e+04   1.00e+00   3.00e-03   1.70e+02    0         1      0.33
    2      1.84e+00   1.00e+00   1.59e-05   7.04e-01    0         1      0.52
Finished, because...
Error smaller than 1 ( 7.0440E-01 ).

Accumulated times:
Assembly time:        0.41 s
Solve time:      0.11 s
Total time:      0.52 s

contact        voltage     electron current    hole current  conduction current
 drain        8.000E-02       1.145E-15         6.482E-20        1.145E-15
 gateD        6.000E-02      -6.251E-23         1.786E-48       -6.251E-23
 gateS        6.000E-02       2.839E-27         8.948E-42        2.839E-27
 source       0.000E+00      -9.958E-16         2.054E-22       -9.958E-16
 substrate    0.000E+00       2.394E-17        -1.735E-16       -1.495E-16

Computing step from t=0.024 to t=0.0445333 (Stepsize: 0.0205333) :
Extrapolating values for t = 0.0445333 ... done.
Computing Coupled( 1 poisson-equation(s) , 1 electron-equation(s) , 
                   1 hole-equation(s) ) 
using Bank/Rose nonlinear solver.

Iteration   |Rhs|      factor     |step|     error   #inner  #iterative  time
------------------------------------------------------------------------------
    0      6.36e+00                                                      0.13
    1      2.06e+05   1.00e+00   5.84e-03   3.33e+02    0         1      0.33
    2      6.53e+01   1.00e+00   6.14e-05   2.75e+00    0         1      0.52
    3      5.42e-04   1.00e+00   9.31e-09   2.42e-04    0         1      0.72
Finished, because...
Error smaller than 1 ( 2.4161E-04 ).

Accumulated times:
Assembly time:        0.56 s
Solve time:      0.16 s
Total time:      0.72 s

contact        voltage     electron current    hole current  conduction current
 drain        8.000E-02       4.025E-15         6.482E-20        4.025E-15
 gateD        1.113E-01       1.342E-22         2.944E-48        1.342E-22
 gateS        1.113E-01       1.061E-26         2.184E-41        1.061E-26
 source       0.000E+00      -3.851E-15         1.497E-26       -3.851E-15
 substrate    0.000E+00      -1.757E-20        -1.734E-16       -1.734E-16

Computing step from t=0.0445333 to t=0.0739644 (Stepsize: 0.0294311) :
Extrapolating values for t = 0.0739644 ... done.
Computing Coupled( 1 poisson-equation(s) , 1 electron-equation(s) , 
                   1 hole-equation(s) ) 
using Bank/Rose nonlinear solver.

Iteration   |Rhs|      factor     |step|     error   #inner  #iterative  time
------------------------------------------------------------------------------
    0      5.57e+00                                                      0.14
    1      1.38e+06   1.00e+00   1.11e-02   6.44e+02    0         1      0.33
    2      2.46e+03   1.00e+00   2.39e-04   1.04e+01    0         1      0.53
    3      1.84e-03   1.00e+00   1.44e-07   6.56e-03    0         1      0.73
Finished, because...
Error smaller than 1 ( 6.5583E-03 ).

Accumulated times:
Assembly time:        0.56 s
Solve time:      0.16 s
Total time:      0.73 s

contact        voltage     electron current    hole current  conduction current
 drain        8.000E-02       2.752E-14         6.482E-20        2.752E-14
 gateD        1.849E-01       1.145E-21         1.563E-48        1.145E-21
 gateS        1.849E-01       6.054E-26         7.379E-41        6.054E-26
 source       0.000E+00      -2.734E-14         8.105E-27       -2.734E-14
 substrate    0.000E+00       1.032E-20        -1.734E-16       -1.734E-16

Computing step from t=0.0739644 to t=0.116149 (Stepsize: 0.0421846) :
Extrapolating values for t = 0.116149 ... done.
Computing Coupled( 1 poisson-equation(s) , 1 electron-equation(s) , 
                   1 hole-equation(s) ) 
using Bank/Rose nonlinear solver.

Iteration   |Rhs|      factor     |step|     error   #inner  #iterative  time
------------------------------------------------------------------------------
    0      1.17e-01                                                      0.14
    1      8.88e+06   1.00e+00   2.16e-02   1.31e+03    0         1      0.34
    2      1.07e+05   1.00e+00   1.10e-03   4.40e+01    0         1      0.54
    3      3.31e+00   1.00e+00   3.79e-06   2.52e-01    0         1      0.74
Finished, because...
Error smaller than 1 ( 2.5221E-01 ).

Accumulated times:
Assembly time:        0.59 s
Solve time:      0.15 s
Total time:      0.74 s

contact        voltage     electron current    hole current  conduction current
 drain        8.000E-02       4.712E-13         6.482E-20        4.712E-13
 gateD        2.904E-01       1.483E-20         1.339E-48        1.483E-20
 gateS        2.904E-01       7.379E-25         4.520E-40        7.379E-25
 source       0.000E+00      -4.663E-13        -7.924E-26       -4.663E-13
 substrate    0.000E+00      -4.694E-15        -1.740E-16       -4.868E-15

Computing step from t=0.116149 to t=0.166149 (Stepsize: 0.05) :
Extrapolating values for t = 0.166149 ... done.
Computing Coupled( 1 poisson-equation(s) , 1 electron-equation(s) , 
                   1 hole-equation(s) ) 
using Bank/Rose nonlinear solver.

Iteration   |Rhs|      factor     |step|     error   #inner  #iterative  time
------------------------------------------------------------------------------
    0      2.00e+01                                                      0.14
    1      3.57e+07   1.00e+00   3.57e-02   2.41e+03    0         1      0.34
    2      2.18e+06   1.00e+00   3.86e-03   1.46e+02    0         1      0.55
    3      1.18e+03   1.00e+00   9.79e-05   7.63e+00    0         1      0.75
    4      6.39e-04   1.00e+00   1.73e-07   1.43e-02    0         1      0.95
Finished, because...
Error smaller than 1 ( 1.4293E-02 ).

Accumulated times:
Assembly time:        0.73 s
Solve time:      0.22 s
Total time:      0.95 s

contact        voltage     electron current    hole current  conduction current
 drain        8.000E-02       1.366E-11         6.482E-20        1.366E-11
 gateD        4.154E-01       2.621E-19         2.123E-48        2.621E-19
 gateS        4.154E-01       1.640E-23         4.348E-39        1.640E-23
 source       0.000E+00      -1.366E-11         1.066E-27       -1.366E-11
 substrate    0.000E+00       1.026E-17        -1.734E-16       -1.631E-16

Computing step from t=0.166149 to t=0.2 (Stepsize: 0.033851) :
Extrapolating values for t = 0.2 ... done.
Computing Coupled( 1 poisson-equation(s) , 1 electron-equation(s) , 
                   1 hole-equation(s) ) 
using Bank/Rose nonlinear solver.

Iteration   |Rhs|      factor     |step|     error   #inner  #iterative  time
------------------------------------------------------------------------------
    0      4.19e+01                                                      0.15
    1      1.84e+07   1.00e+00   3.07e-02   2.03e+03    0         1      0.35
    2      9.62e+05   1.00e+00   3.00e-03   1.12e+02    0         1      0.56
    3      6.81e+02   1.00e+00   7.37e-05   5.98e+00    0         1      0.77
    4      6.23e-04   1.00e+00   1.60e-07   1.36e-02    0         1      0.97
Finished, because...
Error smaller than 1 ( 1.3574E-02 ).

Accumulated times:
Assembly time:        0.75 s
Solve time:      0.22 s
Total time:      0.97 s

contact        voltage     electron current    hole current  conduction current
 drain        8.000E-02       1.334E-10         6.482E-20        1.334E-10
 gateD        5.000E-01       1.517E-18         3.038E-48        1.517E-18
 gateS        5.000E-01       1.412E-22         8.682E-39        1.412E-22
 source       0.000E+00      -1.334E-10         3.610E-26       -1.334E-10
 substrate    0.000E+00       2.704E-17        -1.724E-16       -1.454E-16


Plot started:
Saving device '':
    Writing plot 'n15_Profile_LowVd_0001_des.tdr' (TDR format) ... done.
Plot finished.

Computing step from t=0.2 to t=0.25 (Stepsize: 0.05) :
Extrapolating values for t = 0.25 ... done.
Computing Coupled( 1 poisson-equation(s) , 1 electron-equation(s) , 
                   1 hole-equation(s) ) 
using Bank/Rose nonlinear solver.

Iteration   |Rhs|      factor     |step|     error   #inner  #iterative  time
------------------------------------------------------------------------------
    0      1.65e+03                                                      0.14
    1      2.24e+08   1.00e+00   6.87e-02   5.91e+03    0         1      0.35
    2      1.62e+08   1.00e+00   1.70e-02   5.90e+02    0         1      0.56
    3      2.59e+07   1.00e+00   2.71e-03   1.41e+02    0         1      0.77
    4      5.16e+05   1.00e+00   4.43e-04   3.06e+01    0         1      0.99
    5      1.04e+02   1.00e+00   9.27e-06   7.26e-01    0         1      1.20
Finished, because...
Error smaller than 1 ( 7.2628E-01 ).

Accumulated times:
Assembly time:        0.91 s
Solve time:      0.29 s
Total time:      1.20 s

contact        voltage     electron current    hole current  conduction current
 drain        8.000E-02       3.681E-09         6.482E-20        3.681E-09
 gateD        6.250E-01       1.272E-17         5.706E-48        1.272E-17
 gateS        6.250E-01       3.368E-21         2.776E-38        3.368E-21
 source       0.000E+00      -3.696E-09         2.751E-25       -3.696E-09
 substrate    0.000E+00       1.484E-11        -1.720E-16        1.484E-11

Computing step from t=0.25 to t=0.3 (Stepsize: 0.05) :
Extrapolating values for t = 0.3 ... done.
Computing Coupled( 1 poisson-equation(s) , 1 electron-equation(s) , 
                   1 hole-equation(s) ) 
using Bank/Rose nonlinear solver.

Iteration   |Rhs|      factor     |step|     error   #inner  #iterative  time
------------------------------------------------------------------------------
    0      4.63e+04                                                      0.15
    1      4.60e+08   1.00e+00   1.10e-01   1.18e+04    0         1      0.37
    2      6.45e+08   1.00e+00   5.09e-02   1.54e+03    0         1      0.59
    3      4.58e+08   1.00e+00   2.89e-02   1.36e+03    0         1      0.80
    4      4.45e+08   1.00e+00   2.20e-02   1.28e+03    0         1      1.02
    5      2.44e+08   1.00e+00   1.13e-02   8.57e+02    0         1      1.23
    6      8.65e+07   1.00e+00   5.85e-03   5.18e+02    0         1      1.45
    7      6.45e+07   1.00e+00   3.27e-03   2.90e+02    0         1      1.66
    8      3.21e+07   1.00e+00   1.73e-03   1.62e+02    0         1      1.88
    9      6.12e+06   1.00e+00   5.45e-04   4.96e+01    0         1      2.09
   10      1.37e+05   1.00e+00   7.16e-05   6.62e+00    0         1      2.31
   11      3.92e+01   1.00e+00   1.43e-06   1.33e-01    0         1      2.52
Finished, because...
Error smaller than 1 ( 1.3304E-01 ).

Accumulated times:
Assembly time:        1.91 s
Solve time:      0.61 s
Total time:      2.52 s

contact        voltage     electron current    hole current  conduction current
 drain        8.000E-02       9.091E-08         6.482E-20        9.091E-08
 gateD        7.500E-01       6.181E-17         1.227E-47        6.181E-17
 gateS        7.500E-01       7.427E-20         9.051E-39        7.427E-20
 source       0.000E+00      -9.091E-08        -1.047E-26       -9.091E-08
 substrate    0.000E+00       1.618E-17        -1.710E-16       -1.548E-16


Plot started:
Saving device '':
    Writing plot 'n15_Profile_LowVd_0002_des.tdr' (TDR format) ... done.
Plot finished.

Computing step from t=0.3 to t=0.35 (Stepsize: 0.05) :
Extrapolating values for t = 0.35 ... done.
Computing Coupled( 1 poisson-equation(s) , 1 electron-equation(s) , 
                   1 hole-equation(s) ) 
using Bank/Rose nonlinear solver.

Iteration   |Rhs|      factor     |step|     error   #inner  #iterative  time
------------------------------------------------------------------------------
    0      8.78e+05                                                      0.16
    1      4.94e+08   1.00e+00   1.31e-01   1.39e+04    0         1      0.38
    2      6.46e+08   1.00e+00   5.90e-02   1.78e+03    0         1      0.60
    3      3.83e+08   1.00e+00   2.47e-02   1.17e+03    0         1      0.82
    4      2.18e+08   1.00e+00   1.22e-02   7.94e+02    0         1      1.04
    5      4.29e+07   1.00e+00   6.40e-03   5.28e+02    0         1      1.26
    6      2.31e+07   1.00e+00   3.63e-03   3.24e+02    0         1      1.48
    7      7.23e+06   1.00e+00   1.38e-03   1.20e+02    0         1      1.70
    8      4.72e+05   1.00e+00   2.71e-04   2.44e+01    0         1      1.92
    9      1.10e+03   1.00e+00   1.39e-05   1.25e+00    0         1      2.15
   10      3.63e-03   1.00e+00   2.35e-08   2.16e-03    0         1      2.37
Finished, because...
Error smaller than 1 ( 2.1593E-03 ).

Accumulated times:
Assembly time:        1.84 s
Solve time:      0.52 s
Total time:      2.37 s

contact        voltage     electron current    hole current  conduction current
 drain        8.000E-02       1.751E-06         6.484E-20        1.751E-06
 gateD        8.750E-01       2.108E-16         3.122E-47        2.108E-16
 gateS        8.750E-01       1.235E-18         1.430E-38        1.235E-18
 source       0.000E+00      -1.751E-06        -4.446E-26       -1.751E-06
 substrate    0.000E+00      -1.311E-17        -1.712E-16       -1.843E-16

Computing step from t=0.35 to t=0.4 (Stepsize: 0.05) :
Extrapolating values for t = 0.4 ... done.
Computing Coupled( 1 poisson-equation(s) , 1 electron-equation(s) , 
                   1 hole-equation(s) ) 
using Bank/Rose nonlinear solver.

Iteration   |Rhs|      factor     |step|     error   #inner  #iterative  time
------------------------------------------------------------------------------
    0      1.49e+07                                                      0.17
    1      4.53e+08   1.00e+00   1.66e-01   1.67e+04    0         1      0.40
    2      5.25e+08   1.00e+00   6.25e-02   1.93e+03    0         1      0.63
    3      3.17e+08   1.00e+00   1.68e-02   6.24e+02    0         1      0.85
    4      9.87e+07   1.00e+00   5.66e-03   2.18e+02    0         1      1.08
    5      7.41e+06   1.00e+00   9.59e-04   6.79e+01    0         1      1.31
    6      3.67e+04   1.00e+00   1.28e-04   1.12e+01    0         1      1.54
    7      6.75e+00   1.00e+00   2.02e-06   1.70e-01    0         1      1.76
Finished, because...
Error smaller than 1 ( 1.6999E-01 ).

Accumulated times:
Assembly time:        1.38 s
Solve time:      0.38 s
Total time:      1.76 s

contact        voltage     electron current    hole current  conduction current
 drain        8.000E-02       1.843E-05         6.502E-20        1.843E-05
 gateD        1.000E+00       6.050E-16         1.343E-46        6.050E-16
 gateS        1.000E+00       1.134E-17         2.412E-38        1.134E-17
 source       0.000E+00      -1.843E-05        -2.394E-25       -1.843E-05
 substrate    0.000E+00      -3.331E-17        -1.732E-16       -2.065E-16


Plot started:
Saving device '':
    Writing plot 'n15_Profile_LowVd_0003_des.tdr' (TDR format) ... done.
Plot finished.

Computing step from t=0.4 to t=0.45 (Stepsize: 0.05) :
Extrapolating values for t = 0.45 ... done.
Computing Coupled( 1 poisson-equation(s) , 1 electron-equation(s) , 
                   1 hole-equation(s) ) 
using Bank/Rose nonlinear solver.

Iteration   |Rhs|      factor     |step|     error   #inner  #iterative  time
------------------------------------------------------------------------------
    0      8.86e+07                                                      0.17
    1      3.39e+08   1.00e+00   1.73e-01   1.83e+04    0         1      0.40
    2      3.49e+08   1.00e+00   8.30e-02   2.24e+03    0         1      0.63
    3      2.54e+08   1.00e+00   1.74e-02   6.94e+02    0         1      0.87
    4      4.80e+07   1.00e+00   5.44e-03   2.47e+02    0         1      1.10
    5      5.33e+05   1.00e+00   2.70e-04   2.25e+01    0         1      1.34
    6      1.52e+02   1.00e+00   5.77e-06   3.44e-01    0         1      1.57
Finished, because...
Error smaller than 1 ( 3.4361E-01 ).

Accumulated times:
Assembly time:        1.24 s
Solve time:      0.33 s
Total time:      1.57 s

contact        voltage     electron current    hole current  conduction current
 drain        8.000E-02       6.765E-05         6.555E-20        6.765E-05
 gateD        1.125E+00       1.630E-15         1.526E-45        1.630E-15
 gateS        1.125E+00       5.317E-17         4.320E-38        5.317E-17
 source       0.000E+00      -6.765E-05        -1.635E-23       -6.765E-05
 substrate    0.000E+00      -3.093E-15        -1.772E-16       -3.270E-15

Computing step from t=0.45 to t=0.5 (Stepsize: 0.05) :
Extrapolating values for t = 0.5 ... done.
Computing Coupled( 1 poisson-equation(s) , 1 electron-equation(s) , 
                   1 hole-equation(s) ) 
using Bank/Rose nonlinear solver.

Iteration   |Rhs|      factor     |step|     error   #inner  #iterative  time
------------------------------------------------------------------------------
    0      6.39e+08                                                      0.17
    1      6.60e+08   1.00e+00   1.15e-01   9.44e+03    0         1      0.41
    2      7.90e+08   1.00e+00   3.83e-02   9.53e+02    0         1      0.65
    3      2.80e+08   1.00e+00   7.85e-03   3.44e+02    0         1      0.89
    4      2.13e+08   1.00e+00   3.63e-03   1.46e+02    0         1      1.13
    5      3.05e+07   1.00e+00   1.37e-03   4.85e+01    0         1      1.37
    6      7.97e+05   1.00e+00   2.09e-04   7.40e+00    0         1      1.61
    7      5.81e+02   1.00e+00   5.64e-06   1.99e-01    0         1      1.85
Finished, because...
Error smaller than 1 ( 1.9906E-01 ).

Accumulated times:
Assembly time:        1.43 s
Solve time:      0.39 s
Total time:      1.85 s

contact        voltage     electron current    hole current  conduction current
 drain        8.000E-02       1.109E-04         6.600E-20        1.109E-04
 gateD        1.250E+00       4.088E-15         9.352E-45        4.088E-15
 gateS        1.250E+00       1.680E-16         8.518E-38        1.680E-16
 source       0.000E+00      -1.109E-04        -9.551E-23       -1.109E-04
 substrate    0.000E+00      -2.180E-14        -1.796E-16       -2.198E-14


Plot started:
Saving device '':
    Writing plot 'n15_Profile_LowVd_0004_des.tdr' (TDR format) ... done.
Plot finished.

Computing step from t=0.5 to t=0.55 (Stepsize: 0.05) :
Extrapolating values for t = 0.55 ... done.
Computing Coupled( 1 poisson-equation(s) , 1 electron-equation(s) , 
                   1 hole-equation(s) ) 
using Bank/Rose nonlinear solver.

Iteration   |Rhs|      factor     |step|     error   #inner  #iterative  time
------------------------------------------------------------------------------
    0      2.47e+08                                                      0.18
    1      2.25e+08   1.00e+00   6.82e-02   4.29e+03    0         1      0.43
    2      2.42e+07   1.00e+00   1.41e-02   2.52e+02    0         1      0.68
    3      6.27e+05   1.00e+00   1.59e-03   3.96e+01    0         1      0.93
    4      3.19e+02   1.00e+00   1.90e-05   5.26e-01    0         1      1.17
Finished, because...
Error smaller than 1 ( 5.2645E-01 ).

Accumulated times:
Assembly time:        0.95 s
Solve time:      0.22 s
Total time:      1.17 s

contact        voltage     electron current    hole current  conduction current
 drain        8.000E-02       1.332E-04         6.587E-20        1.332E-04
 gateD        1.375E+00       9.776E-15         3.884E-44        9.776E-15
 gateS        1.375E+00       4.355E-16         1.885E-37        4.355E-16
 source       0.000E+00      -1.332E-04        -1.157E-21       -1.332E-04
 substrate    0.000E+00      -1.801E-13        -1.805E-16       -1.802E-13

Computing step from t=0.55 to t=0.6 (Stepsize: 0.05) :
Extrapolating values for t = 0.6 ... done.
Computing Coupled( 1 poisson-equation(s) , 1 electron-equation(s) , 
                   1 hole-equation(s) ) 
using Bank/Rose nonlinear solver.

Iteration   |Rhs|      factor     |step|     error   #inner  #iterative  time
------------------------------------------------------------------------------
    0      3.47e+07                                                      0.20
    1      8.59e+07   1.00e+00   3.11e-02   1.82e+03    0         1      0.45
    2      1.36e+06   1.00e+00   4.49e-03   8.89e+01    0         1      0.71
    3      1.01e+03   1.00e+00   1.14e-04   2.60e+00    0         1      0.97
    4      6.76e-04   1.00e+00   5.22e-08   1.22e-03    0         1      1.23
Finished, because...
Error smaller than 1 ( 1.2233E-03 ).

Accumulated times:
Assembly time:        1.01 s
Solve time:      0.21 s
Total time:      1.23 s

contact        voltage     electron current    hole current  conduction current
 drain        8.000E-02       1.465E-04         6.643E-20        1.465E-04
 gateD        1.500E+00       2.327E-14         1.779E-43        2.327E-14
 gateS        1.500E+00       1.039E-15         4.614E-37        1.039E-15
 source       0.000E+00      -1.465E-04        -1.996E-24       -1.465E-04
 substrate    0.000E+00       1.462E-17        -1.809E-16       -1.663E-16

Computing step from t=0.6 to t=0.65 (Stepsize: 0.05) :
Extrapolating values for t = 0.65 ... done.
Computing Coupled( 1 poisson-equation(s) , 1 electron-equation(s) , 
                   1 hole-equation(s) ) 
using Bank/Rose nonlinear solver.

Iteration   |Rhs|      factor     |step|     error   #inner  #iterative  time
------------------------------------------------------------------------------
    0      9.66e+06                                                      0.20
    1      5.11e+07   1.00e+00   1.67e-02   9.50e+02    0         1      0.46
    2      1.44e+05   1.00e+00   1.03e-03   1.92e+01    0         1      0.73
    3      3.76e+00   1.00e+00   7.43e-06   1.70e-01    0         1      0.99
Finished, because...
Error smaller than 1 ( 1.6950E-01 ).

Accumulated times:
Assembly time:        0.83 s
Solve time:      0.16 s
Total time:      0.99 s

contact        voltage     electron current    hole current  conduction current
 drain        8.000E-02       1.556E-04         6.644E-20        1.556E-04
 gateD        1.625E+00       5.630E-14         7.955E-43        5.630E-14
 gateS        1.625E+00       2.401E-15         1.244E-36        2.401E-15
 source       0.000E+00      -1.556E-04        -2.062E-22       -1.556E-04
 substrate    0.000E+00       9.844E-14        -1.812E-16        9.826E-14

Computing step from t=0.65 to t=0.7 (Stepsize: 0.05) :
Extrapolating values for t = 0.7 ... done.
Computing Coupled( 1 poisson-equation(s) , 1 electron-equation(s) , 
                   1 hole-equation(s) ) 
using Bank/Rose nonlinear solver.

Iteration   |Rhs|      factor     |step|     error   #inner  #iterative  time
------------------------------------------------------------------------------
    0      5.34e+06                                                      0.21
    1      3.54e+07   1.00e+00   1.02e-02   5.76e+02    0         1      0.48
    2      3.15e+04   1.00e+00   3.46e-04   6.57e+00    0         1      0.75
    3      9.59e-02   1.00e+00   1.05e-06   2.43e-02    0         1      1.02
Finished, because...
Error smaller than 1 ( 2.4305E-02 ).

Accumulated times:
Assembly time:        0.87 s
Solve time:      0.15 s
Total time:      1.02 s

contact        voltage     electron current    hole current  conduction current
 drain        8.000E-02       1.625E-04         6.660E-20        1.625E-04
 gateD        1.750E+00       1.406E-13         2.716E-42        1.406E-13
 gateS        1.750E+00       5.503E-15         3.688E-36        5.503E-15
 source       0.000E+00      -1.625E-04        -6.352E-24       -1.625E-04
 substrate    0.000E+00       4.840E-15        -1.814E-16        4.658E-15

Computing step from t=0.7 to t=0.75 (Stepsize: 0.05) :
Extrapolating values for t = 0.75 ... done.
Computing Coupled( 1 poisson-equation(s) , 1 electron-equation(s) , 
                   1 hole-equation(s) ) 
using Bank/Rose nonlinear solver.

Iteration   |Rhs|      factor     |step|     error   #inner  #iterative  time
------------------------------------------------------------------------------
    0      3.69e+06                                                      0.21
    1      2.40e+07   1.00e+00   6.87e-03   3.85e+02    0         1      0.49
    2      9.83e+03   1.00e+00   1.47e-04   2.91e+00    0         1      0.76
    3      7.81e-03   1.00e+00   2.30e-07   5.32e-03    0         1      1.04
Finished, because...
Error smaller than 1 ( 5.3190E-03 ).

Accumulated times:
Assembly time:        0.88 s
Solve time:      0.16 s
Total time:      1.04 s

contact        voltage     electron current    hole current  conduction current
 drain        8.000E-02       1.679E-04         6.667E-20        1.679E-04
 gateD        1.875E+00       3.680E-13         1.089E-41        3.680E-13
 gateS        1.875E+00       1.270E-14         1.202E-35        1.270E-14
 source       0.000E+00      -1.679E-04        -2.505E-24       -1.679E-04
 substrate    0.000E+00       2.505E-16        -1.816E-16        6.895E-17

Computing step from t=0.75 to t=0.8 (Stepsize: 0.05) :
Extrapolating values for t = 0.8 ... done.
Computing Coupled( 1 poisson-equation(s) , 1 electron-equation(s) , 
                   1 hole-equation(s) ) 
using Bank/Rose nonlinear solver.

Iteration   |Rhs|      factor     |step|     error   #inner  #iterative  time
------------------------------------------------------------------------------
    0      2.92e+06                                                      0.21
    1      1.65e+07   1.00e+00   4.93e-03   2.74e+02    0         1      0.49
    2      3.70e+03   1.00e+00   7.27e-05   1.50e+00    0         1      0.77
    3      8.88e-04   1.00e+00   6.51e-08   1.50e-03    0         1      1.05
Finished, because...
Error smaller than 1 ( 1.5049E-03 ).

Accumulated times:
Assembly time:        0.90 s
Solve time:      0.15 s
Total time:      1.05 s

contact        voltage     electron current    hole current  conduction current
 drain        8.000E-02       1.723E-04         6.672E-20        1.723E-04
 gateD        2.000E+00       1.034E-12         5.360E-41        1.034E-12
 gateS        2.000E+00       2.988E-14         4.316E-35        2.988E-14
 source       0.000E+00      -1.723E-04        -2.370E-24       -1.723E-04
 substrate    0.000E+00      -4.483E-17        -1.817E-16       -2.265E-16

Computing step from t=0.8 to t=0.85 (Stepsize: 0.05) :
Extrapolating values for t = 0.85 ... done.
Computing Coupled( 1 poisson-equation(s) , 1 electron-equation(s) , 
                   1 hole-equation(s) ) 
using Bank/Rose nonlinear solver.

Iteration   |Rhs|      factor     |step|     error   #inner  #iterative  time
------------------------------------------------------------------------------
    0      2.25e+06                                                      0.22
    1      1.15e+07   1.00e+00   3.71e-03   2.05e+02    0         1      0.51
    2      1.49e+03   1.00e+00   4.01e-05   8.55e-01    0         1      0.80
Finished, because...
Error smaller than 1 ( 8.5544E-01 ).

Accumulated times:
Assembly time:        0.69 s
Solve time:      0.11 s
Total time:      0.80 s

contact        voltage     electron current    hole current  conduction current
 drain        8.000E-02       1.760E-04         6.587E-20        1.760E-04
 gateD        2.125E+00       3.277E-12         3.156E-40        3.277E-12
 gateS        2.125E+00       7.233E-14         1.707E-34        7.233E-14
 source       0.000E+00      -1.760E-04        -2.417E-21       -1.760E-04
 substrate    0.000E+00      -5.274E-11        -1.818E-16       -5.274E-11

Computing step from t=0.85 to t=0.9 (Stepsize: 0.05) :
Extrapolating values for t = 0.9 ... done.
Computing Coupled( 1 poisson-equation(s) , 1 electron-equation(s) , 
                   1 hole-equation(s) ) 
using Bank/Rose nonlinear solver.

Iteration   |Rhs|      factor     |step|     error   #inner  #iterative  time
------------------------------------------------------------------------------
    0      1.93e+06                                                      0.22
    1      8.13e+06   1.00e+00   2.90e-03   1.59e+02    0         1      0.51
    2      6.42e+02   1.00e+00   2.39e-05   5.24e-01    0         1      0.80
Finished, because...
Error smaller than 1 ( 5.2419E-01 ).

Accumulated times:
Assembly time:        0.68 s
Solve time:      0.12 s
Total time:      0.80 s

contact        voltage     electron current    hole current  conduction current
 drain        8.000E-02       1.791E-04         6.650E-20        1.791E-04
 gateD        2.250E+00       1.305E-11         2.378E-39        1.305E-11
 gateS        2.250E+00       1.824E-13         7.453E-34        1.824E-13
 source       0.000E+00      -1.791E-04        -8.063E-22       -1.791E-04
 substrate    0.000E+00      -3.375E-11        -1.818E-16       -3.375E-11

Computing step from t=0.9 to t=0.95 (Stepsize: 0.05) :
Extrapolating values for t = 0.95 ... done.
Computing Coupled( 1 poisson-equation(s) , 1 electron-equation(s) , 
                   1 hole-equation(s) ) 
using Bank/Rose nonlinear solver.

Iteration   |Rhs|      factor     |step|     error   #inner  #iterative  time
------------------------------------------------------------------------------
    0      1.68e+06                                                      0.23
    1      5.88e+06   1.00e+00   2.32e-03   1.26e+02    0         1      0.53
    2      2.92e+02   1.00e+00   1.51e-05   3.39e-01    0         1      0.82
Finished, because...
Error smaller than 1 ( 3.3897E-01 ).

Accumulated times:
Assembly time:        0.71 s
Solve time:      0.11 s
Total time:      0.82 s

contact        voltage     electron current    hole current  conduction current
 drain        8.000E-02       1.818E-04         6.671E-20        1.818E-04
 gateD        2.375E+00       5.533E-11         1.813E-38        5.533E-11
 gateS        2.375E+00       4.872E-13         3.722E-33        4.872E-13
 source       0.000E+00      -1.818E-04        -3.076E-22       -1.818E-04
 substrate    0.000E+00      -1.893E-11        -1.819E-16       -1.893E-11

Computing step from t=0.95 to t=1 (Stepsize: 0.05) :
Extrapolating values for t = 1 ... done.
Computing Coupled( 1 poisson-equation(s) , 1 electron-equation(s) , 
                   1 hole-equation(s) ) 
using Bank/Rose nonlinear solver.

Iteration   |Rhs|      factor     |step|     error   #inner  #iterative  time
------------------------------------------------------------------------------
    0      1.57e+06                                                      0.23
    1      4.33e+06   1.00e+00   1.90e-03   1.03e+02    0         1      0.53
    2      1.40e+02   1.00e+00   1.01e-05   2.29e-01    0         1      0.83
Finished, because...
Error smaller than 1 ( 2.2874E-01 ).

Accumulated times:
Assembly time:        0.71 s
Solve time:      0.12 s
Total time:      0.83 s

contact        voltage     electron current    hole current  conduction current
 drain        8.000E-02       1.841E-04         6.680E-20        1.841E-04
 gateD        2.500E+00       2.025E-10         1.592E-37        2.025E-10
 gateS        2.500E+00       1.426E-12         1.948E-32        1.426E-12
 source       0.000E+00      -1.841E-04        -1.307E-22       -1.841E-04
 substrate    0.000E+00      -1.025E-11        -1.820E-16       -1.025E-11


Plot started:
Saving device '':
    Writing plot 'n15_Profile_LowVd_0005_des.tdr' (TDR format) ... done.
Plot finished.


Finished, because...
Curve trace finished.


===============================
Starting solve of next problem:
Quasistationary ( Digits : 5, Max. #iterations : 20, 
      Initial step in t : 0.05, 
      Minimum step in t : 1.0000e-05, Maximum step in t : 0.1, 
      Increment : 1.5, Decrement : 2, 
      Goal values :
        Contact gateD : 0.0000e+00V,
        Contact gateS : 0.0000e+00V
    )
  {
    Coupled ( Digits : 5, Max. #iterations : 20, 
        Solver : blocked decomposition,
        #undamped iterations : 1000 
        )
        { Poisson Electron Hole } 
  }
===============================

Reusing extrapolation from a previous quasistationary

Computing step from t=0.0000e+00 to t=0.05 (Stepsize: 0.05) :
Extrapolating values for t = 0.05 ... done.
Computing Coupled( 1 poisson-equation(s) , 1 electron-equation(s) , 
                   1 hole-equation(s) ) 
using Bank/Rose nonlinear solver.

Iteration   |Rhs|      factor     |step|     error   #inner  #iterative  time
------------------------------------------------------------------------------
    0      2.92e+02                                                      0.23
    1      7.42e-04   1.00e+00   3.58e-09   8.18e-05    0         1      0.53
Finished, because...
Error smaller than 1 ( 8.1780E-05 ).

Accumulated times:
Assembly time:        0.47 s
Solve time:      0.06 s
Total time:      0.53 s

contact        voltage     electron current    hole current  conduction current
 drain        8.000E-02       1.818E-04         6.682E-20        1.818E-04
 gateD        2.375E+00       5.533E-11         1.813E-38        5.533E-11
 gateS        2.375E+00       4.872E-13         3.722E-33        4.872E-13
 source       0.000E+00      -1.818E-04        -2.483E-24       -1.818E-04
 substrate    0.000E+00       2.368E-17        -1.819E-16       -1.582E-16

Computing step from t=0.05 to t=0.125 (Stepsize: 0.075) :
Extrapolating values for t = 0.125 ... done.
Computing Coupled( 1 poisson-equation(s) , 1 electron-equation(s) , 
                   1 hole-equation(s) ) 
using Bank/Rose nonlinear solver.

Iteration   |Rhs|      factor     |step|     error   #inner  #iterative  time
------------------------------------------------------------------------------
    0      1.86e+06                                                      0.23
    1      1.38e+07   1.00e+00   3.68e-03   2.00e+02    0         1      0.51
    2      1.85e+03   1.00e+00   3.77e-05   8.78e-01    0         1      0.80
Finished, because...
Error smaller than 1 ( 8.7845E-01 ).

Accumulated times:
Assembly time:        0.68 s
Solve time:      0.11 s
Total time:      0.80 s

contact        voltage     electron current    hole current  conduction current
 drain        8.000E-02       1.776E-04         6.615E-20        1.776E-04
 gateD        2.188E+00       6.324E-12         9.215E-40        6.324E-12
 gateS        2.188E+00       1.142E-13         3.521E-34        1.142E-13
 source       0.000E+00      -1.776E-04        -1.763E-21       -1.776E-04
 substrate    0.000E+00      -1.268E-10        -1.818E-16       -1.268E-10

Computing step from t=0.125 to t=0.225 (Stepsize: 0.1) :
Extrapolating values for t = 0.225 ... done.
Computing Coupled( 1 poisson-equation(s) , 1 electron-equation(s) , 
                   1 hole-equation(s) ) 
using Bank/Rose nonlinear solver.

Iteration   |Rhs|      factor     |step|     error   #inner  #iterative  time
------------------------------------------------------------------------------
    0      3.49e+06                                                      0.21
    1      7.15e+07   1.00e+00   9.37e-03   5.24e+02    0         1      0.49
    2      7.25e+04   1.00e+00   2.50e-04   5.76e+00    0         1      0.77
    3      2.60e-01   1.00e+00   1.12e-06   2.58e-02    0         1      1.04
Finished, because...
Error smaller than 1 ( 2.5757E-02 ).

Accumulated times:
Assembly time:        0.88 s
Solve time:      0.16 s
Total time:      1.04 s

contact        voltage     electron current    hole current  conduction current
 drain        8.000E-02       1.702E-04         6.669E-20        1.702E-04
 gateD        1.938E+00       6.100E-13         2.362E-41        6.100E-13
 gateS        1.938E+00       1.943E-14         2.250E-35        1.943E-14
 source       0.000E+00      -1.702E-04        -6.975E-24       -1.702E-04
 substrate    0.000E+00       2.373E-15        -1.816E-16        2.191E-15

Computing step from t=0.225 to t=0.325 (Stepsize: 0.1) :
Extrapolating values for t = 0.325 ... done.
Computing Coupled( 1 poisson-equation(s) , 1 electron-equation(s) , 
                   1 hole-equation(s) ) 
using Bank/Rose nonlinear solver.

Iteration   |Rhs|      factor     |step|     error   #inner  #iterative  time
------------------------------------------------------------------------------
    0      4.57e+06                                                      0.21
    1      1.58e+08   1.00e+00   1.70e-02   9.88e+02    0         1      0.47
    2      6.12e+05   1.00e+00   8.57e-04   1.89e+01    0         1      0.74
    3      2.67e+01   1.00e+00   1.17e-05   2.74e-01    0         1      1.01
Finished, because...
Error smaller than 1 ( 2.7430E-01 ).

Accumulated times:
Assembly time:        0.84 s
Solve time:      0.17 s
Total time:      1.01 s

contact        voltage     electron current    hole current  conduction current
 drain        8.000E-02       1.593E-04         6.632E-20        1.593E-04
 gateD        1.688E+00       8.853E-14         1.407E-42        8.853E-14
 gateS        1.688E+00       3.634E-15         2.117E-36        3.634E-15
 source       0.000E+00      -1.593E-04        -5.075E-22       -1.593E-04
 substrate    0.000E+00       2.000E-12        -1.813E-16        2.000E-12

Computing step from t=0.325 to t=0.425 (Stepsize: 0.1) :
Extrapolating values for t = 0.425 ... done.
Computing Coupled( 1 poisson-equation(s) , 1 electron-equation(s) , 
                   1 hole-equation(s) ) 
using Bank/Rose nonlinear solver.

Iteration   |Rhs|      factor     |step|     error   #inner  #iterative  time
------------------------------------------------------------------------------
    0      5.68e+06                                                      0.19
    1      2.72e+08   1.00e+00   3.33e-02   2.06e+03    0         1      0.44
    2      6.14e+06   1.00e+00   3.45e-03   7.14e+01    0         1      0.69
    3      2.45e+03   1.00e+00   1.45e-04   3.50e+00    0         1      0.95
    4      1.11e-03   1.00e+00   7.49e-08   1.75e-03    0         1      1.20
Finished, because...
Error smaller than 1 ( 1.7535E-03 ).

Accumulated times:
Assembly time:        0.97 s
Solve time:      0.23 s
Total time:      1.20 s

contact        voltage     electron current    hole current  conduction current
 drain        8.000E-02       1.405E-04         6.636E-20        1.405E-04
 gateD        1.438E+00       1.507E-14         8.189E-44        1.507E-14
 gateS        1.438E+00       6.772E-16         2.913E-37        6.772E-16
 source       0.000E+00      -1.405E-04        -1.934E-24       -1.405E-04
 substrate    0.000E+00       7.957E-17        -1.808E-16       -1.012E-16

Computing step from t=0.425 to t=0.525 (Stepsize: 0.1) :
Extrapolating values for t = 0.525 ... done.
Computing Coupled( 1 poisson-equation(s) , 1 electron-equation(s) , 
                   1 hole-equation(s) ) 
using Bank/Rose nonlinear solver.

Iteration   |Rhs|      factor     |step|     error   #inner  #iterative  time
------------------------------------------------------------------------------
    0      7.63e+06                                                      0.17
    1      3.42e+08   1.00e+00   9.16e-02   7.28e+03    0         1      0.41
    2      8.55e+07   1.00e+00   2.50e-02   5.95e+02    0         1      0.65
    3      6.51e+05   1.00e+00   5.18e-03   1.51e+02    0         1      0.88
    4      9.89e+02   1.00e+00   1.20e-04   3.06e+00    0         1      1.12
    5      2.37e-03   1.00e+00   7.34e-08   2.40e-03    0         1      1.36
Finished, because...
Error smaller than 1 ( 2.3969E-03 ).

Accumulated times:
Assembly time:        1.09 s
Solve time:      0.27 s
Total time:      1.36 s

contact        voltage     electron current    hole current  conduction current
 drain        8.000E-02       9.268E-05         6.583E-20        9.268E-05
 gateD        1.188E+00       2.607E-15         4.185E-45        2.607E-15
 gateS        1.188E+00       9.790E-17         5.974E-38        9.790E-17
 source       0.000E+00      -9.268E-05        -1.272E-24       -9.268E-05
 substrate    0.000E+00       3.610E-17        -1.787E-16       -1.426E-16

Computing step from t=0.525 to t=0.625 (Stepsize: 0.1) :
Extrapolating values for t = 0.625 ... done.
Computing Coupled( 1 poisson-equation(s) , 1 electron-equation(s) , 
                   1 hole-equation(s) ) 
using Bank/Rose nonlinear solver.

Iteration   |Rhs|      factor     |step|     error   #inner  #iterative  time
------------------------------------------------------------------------------
    0      8.97e+06                                                      0.16
    1      4.34e+08   1.00e+00   5.67e-01   1.41e+06    0         1      0.39
    2      1.21e+08   1.00e+00   3.35e-01   1.04e+04    0         1      0.61
    3      2.36e+08   1.00e+00   5.02e-02   4.37e+03    0         1      0.84
    4      4.97e+08   1.00e+00   8.21e-02   6.23e+03    0         1      1.06
    5      1.06e+08   1.00e+00   4.40e-01   1.46e+06    0         1      1.29
    6      3.28e+08   1.00e+00   3.78e-01   8.54e+03    0         1      1.51
    7      3.02e+08   1.00e+00   5.68e-02   5.36e+03    0         1      1.73
    8      7.49e+07   1.00e+00   3.09e-01   1.90e+06    0         1      1.96
    9      3.79e+08   1.00e+00   3.48e-01   7.54e+03    0         1      2.18
   10      2.23e+08   1.00e+00   1.24e-01   3.12e+04    0         1      2.41
   11      6.16e+08   1.00e+00   1.98e-01   2.73e+06    0         1      2.63
   12      2.60e+08   1.00e+00   1.58e-01   1.13e+04    0         1      2.86
   13      9.92e+07   1.00e+00   7.05e-02   6.56e+03    0         1      3.08
   14      1.25e+08   1.00e+00   1.50e-02   1.39e+03    0         1      3.31
   15      8.83e+07   1.00e+00   5.46e-03   5.08e+02    0         1      3.53
   16      6.27e+07   1.00e+00   2.54e-03   2.46e+02    0         1      3.75
   17      1.05e+07   1.00e+00   9.33e-04   8.82e+01    0         1      3.98
   18      3.88e+05   1.00e+00   1.22e-04   1.16e+01    0         1      4.20
   19      5.02e+02   1.00e+00   4.76e-06   4.53e-01    0         1      4.43
Finished, because...
Error smaller than 1 ( 4.5323E-01 ).

Accumulated times:
Assembly time:        3.39 s
Solve time:      1.04 s
Total time:      4.43 s

contact        voltage     electron current    hole current  conduction current
 drain        8.000E-02       6.375E-06         6.489E-20        6.375E-06
 gateD        9.375E-01       3.614E-16         5.745E-47        3.614E-16
 gateS        9.375E-01       4.102E-18         1.842E-38        4.102E-18
 source       0.000E+00      -6.375E-06        -8.605E-26       -6.375E-06
 substrate    0.000E+00      -3.148E-17        -1.719E-16       -2.034E-16

Computing step from t=0.625 to t=0.725 (Stepsize: 0.1) :
Extrapolating values for t = 0.725 ... done.
Computing Coupled( 1 poisson-equation(s) , 1 electron-equation(s) , 
                   1 hole-equation(s) ) 
using Bank/Rose nonlinear solver.

Iteration   |Rhs|      factor     |step|     error   #inner  #iterative  time
------------------------------------------------------------------------------
    0      1.56e+07                                                      0.14
    1      3.36e+08   1.00e+00   9.82e-01   3.55e+06    0         1      0.36
    2      4.03e+07   1.00e+00   5.28e-01   1.39e+04    0         1      0.57
    3      2.44e+07   1.00e+00   3.28e-02   1.82e+03    0         1      0.78
    4      8.03e+06   1.00e+00   5.27e-03   4.18e+02    0         1      1.00
    5      3.65e+05   1.00e+00   1.41e-03   7.36e+01    0         1      1.21
    6      3.69e+02   1.00e+00   8.87e-05   3.03e+00    0         1      1.42
    7      5.89e-04   1.00e+00   2.24e-06   1.84e-03    0         1      1.63
Finished, because...
Error smaller than 1 ( 1.8372E-03 ).

Accumulated times:
Assembly time:        1.24 s
Solve time:      0.37 s
Total time:      1.63 s

contact        voltage     electron current    hole current  conduction current
 drain        8.000E-02       1.871E-08         6.482E-20        1.871E-08
 gateD        6.875E-01       2.969E-17         8.226E-48        2.969E-17
 gateS        6.875E-01       1.612E-20         1.348E-38        1.612E-20
 source       0.000E+00      -1.871E-08         1.525E-26       -1.871E-08
 substrate    0.000E+00      -1.059E-17        -1.715E-16       -1.821E-16

Computing step from t=0.725 to t=0.825 (Stepsize: 0.1) :
Extrapolating values for t = 0.825 ... done.
Computing Coupled( 1 poisson-equation(s) , 1 electron-equation(s) , 
                   1 hole-equation(s) ) 
using Bank/Rose nonlinear solver.

Iteration   |Rhs|      factor     |step|     error   #inner  #iterative  time
------------------------------------------------------------------------------
    0      2.18e+06                                                      0.14
    1      1.29e+08   1.00e+00   7.52e-01   2.29e+06    0         1      0.35
    2      1.55e+07   1.00e+00   4.10e-01   1.24e+04    0         1      0.56
    3      5.50e+06   1.00e+00   4.56e-02   5.95e+03    0         1      0.76
    4      5.23e+05   1.00e+00   2.78e-01   1.39e+06    0         1      0.97
    5      1.88e+02   1.00e+00   3.13e-01   5.91e+04    0         1      1.17
    6      1.62e+02   1.00e+00   7.38e-02   1.14e+04    0         1      1.38
    7      1.39e+02   1.00e+00   1.80e-01   1.91e+05    0         1      1.58
    8      1.28e+02   1.00e+00   1.71e-01   1.42e+03    0         1      1.79
    9      1.61e+02   1.00e+00   3.61e-02   4.74e+03    0         1      1.99
   10      4.42e+02   1.00e+00   1.54e-01   1.46e+06    0         1      2.20
   11      1.53e+02   1.00e+00   1.99e-01   5.02e+03    0         1      2.40
   12      1.49e+02   1.00e+00   9.46e-02   8.39e+04    0         1      2.61
   13      5.92e+01   1.00e+00   6.51e-02   2.64e+03    0         1      2.81
   14      1.36e+02   1.00e+00   3.33e-02   4.01e+03    0         1      3.02
   15      6.84e+01   1.00e+00   8.79e-02   6.42e+05    0         1      3.22
   16      1.81e+02   1.00e+00   1.22e-01   3.32e+03    0         1      3.43
   17      1.01e+02   1.00e+00   9.66e-02   1.36e+05    0         1      3.63
   18      1.44e+02   1.00e+00   8.86e-02   3.17e+03    0         1      3.83
   19      9.11e+01   1.00e+00   8.67e-02   1.19e+05    0         1      4.04
   20      1.25e+02   1.00e+00   8.79e-02   3.28e+03    0         1      4.24
Finished, because...
#iterations larger than 20.

Accumulated times:
Assembly time:        3.15 s
Solve time:      1.09 s
Total time:      4.24 s

Newton didn't converge, trying again with smaller step...

Computing step from t=0.725 to t=0.775 (Stepsize: 0.05) :
Extrapolating values for t = 0.775 ... done.
Computing Coupled( 1 poisson-equation(s) , 1 electron-equation(s) , 
                   1 hole-equation(s) ) 
using Bank/Rose nonlinear solver.

Iteration   |Rhs|      factor     |step|     error   #inner  #iterative  time
------------------------------------------------------------------------------
    0      9.93e+05                                                      0.14
    1      8.46e+07   1.00e+00   3.70e-01   1.10e+06    0         1      0.35
    2      8.13e+06   1.00e+00   2.27e-01   7.29e+03    0         1      0.56
    3      2.31e+05   1.00e+00   7.08e-03   5.23e+02    0         1      0.77
    4      4.48e+02   1.00e+00   5.85e-04   3.27e+01    0         1      0.98
    5      3.57e-01   1.00e+00   2.53e-05   7.28e-01    0         1      1.19
Finished, because...
Error smaller than 1 ( 7.2763E-01 ).

Accumulated times:
Assembly time:        0.92 s
Solve time:      0.27 s
Total time:      1.19 s

contact        voltage     electron current    hole current  conduction current
 drain        8.000E-02       7.091E-10         6.482E-20        7.091E-10
 gateD        5.625E-01       4.739E-18         4.096E-48        4.739E-18
 gateS        5.625E-01       6.916E-22         1.432E-38        6.916E-22
 source       0.000E+00      -7.091E-10        -1.549E-26       -7.091E-10
 substrate    0.000E+00       2.548E-18        -1.722E-16       -1.696E-16

Computing step from t=0.775 to t=0.843333 (Stepsize: 0.0683333) :
Extrapolating values for t = 0.843333 ... done.
Computing Coupled( 1 poisson-equation(s) , 1 electron-equation(s) , 
                   1 hole-equation(s) ) 
using Bank/Rose nonlinear solver.

Iteration   |Rhs|      factor     |step|     error   #inner  #iterative  time
------------------------------------------------------------------------------
    0      1.02e+04                                                      0.15
    1      3.81e+07   1.00e+00   2.74e-01   5.39e+05    0         1      0.35
    2      2.61e+06   1.00e+00   1.67e-01   5.55e+03    0         1      0.55
    3      4.41e+04   1.00e+00   8.06e-03   6.33e+02    0         1      0.76
    4      4.27e+01   1.00e+00   2.95e-04   2.48e+01    0         1      0.96
    5      5.04e-04   1.00e+00   4.39e-07   3.35e-02    0         1      1.16
Finished, because...
Error smaller than 1 ( 3.3541E-02 ).

Accumulated times:
Assembly time:        0.88 s
Solve time:      0.27 s
Total time:      1.16 s

contact        voltage     electron current    hole current  conduction current
 drain        8.000E-02       7.199E-12         6.482E-20        7.199E-12
 gateD        3.917E-01       1.550E-19         1.935E-48        1.550E-19
 gateS        3.917E-01       8.973E-24         2.800E-39        8.973E-24
 source       0.000E+00      -7.198E-12        -2.334E-26       -7.198E-12
 substrate    0.000E+00       8.745E-20        -1.737E-16       -1.736E-16

Computing step from t=0.843333 to t=0.936722 (Stepsize: 0.0933889) :
Extrapolating values for t = 0.936722 ... done.
Computing Coupled( 1 poisson-equation(s) , 1 electron-equation(s) , 
                   1 hole-equation(s) ) 
using Bank/Rose nonlinear solver.

Iteration   |Rhs|      factor     |step|     error   #inner  #iterative  time
------------------------------------------------------------------------------
    0      4.53e+02                                                      0.13
    1      4.68e+07   1.00e+00   2.59e-01   5.79e+05    0         1      0.33
    2      2.21e+06   1.00e+00   1.60e-01   5.02e+03    0         1      0.53
    3      1.72e+04   1.00e+00   1.38e-02   5.52e+02    0         1      0.73
    4      1.73e+00   1.00e+00   1.10e-03   1.37e+01    0         1      0.92
    5      5.56e-04   1.00e+00   3.01e-05   5.56e-03    0         1      1.12
Finished, because...
Error smaller than 1 ( 5.5628E-03 ).

Accumulated times:
Assembly time:        0.85 s
Solve time:      0.27 s
Total time:      1.12 s

contact        voltage     electron current    hole current  conduction current
 drain        8.000E-02       1.356E-14         6.482E-20        1.356E-14
 gateD        1.582E-01       5.765E-22         2.666E-48        5.765E-22
 gateS        1.582E-01       3.229E-26         4.725E-41        3.229E-26
 source       0.000E+00      -1.339E-14        -1.518E-26       -1.339E-14
 substrate    0.000E+00      -1.669E-20        -1.734E-16       -1.734E-16

Computing step from t=0.936722 to t=1 (Stepsize: 0.0632778) :
Extrapolating values for t = 1 ... done.
Computing Coupled( 1 poisson-equation(s) , 1 electron-equation(s) , 
                   1 hole-equation(s) ) 
using Bank/Rose nonlinear solver.

Iteration   |Rhs|      factor     |step|     error   #inner  #iterative  time
------------------------------------------------------------------------------
    0      2.73e+00                                                      0.14
    1      1.93e+07   1.00e+00   7.21e-02   6.01e+03    0         1      0.34
    2      1.84e+06   1.00e+00   1.17e-02   8.16e+02    0         1      0.54
    3      2.11e+04   1.00e+00   8.96e-04   7.52e+01    0         1      0.73
    4      2.41e+00   1.00e+00   9.73e-06   7.22e-01    0         1      0.93
Finished, because...
Error smaller than 1 ( 7.2164E-01 ).

Accumulated times:
Assembly time:        0.71 s
Solve time:      0.22 s
Total time:      0.93 s

contact        voltage     electron current    hole current  conduction current
 drain        8.000E-02       1.833E-16         6.482E-20        1.834E-16
 gateD        0.000E+00      -2.531E-22        -5.451E-50       -2.531E-22
 gateS        0.000E+00      -1.476E-28        -2.612E-51       -1.476E-28
 source       0.000E+00      -2.096E-16        -2.869E-26       -2.096E-16
 substrate    0.000E+00       1.998E-16        -1.736E-16        2.619E-17


Finished, because...
Curve trace finished.


===============================
Starting solve of next problem:
Quasistationary ( Digits : 5, Max. #iterations : 20, 
      Initial step in t : 0.1, 
      Minimum step in t : 1.0000e-05, Maximum step in t : 1, 
      Increment : 1.5, Decrement : 2, 
      Goal values :
        Contact drain : 0.7V
    )
  {
    Coupled ( Digits : 5, Max. #iterations : 20, 
        Solver : blocked decomposition,
        #undamped iterations : 1000 
        )
        { Poisson Electron Hole } 
  }
===============================

Computing step from t=0.0000e+00 to t=0.1 (Stepsize: 0.1) :
Computing Coupled( 1 poisson-equation(s) , 1 electron-equation(s) , 
                   1 hole-equation(s) ) 
using Bank/Rose nonlinear solver.

Iteration   |Rhs|      factor     |step|     error   #inner  #iterative  time
------------------------------------------------------------------------------
    0      4.66e+10                                                      0.14
    1      7.12e+10   1.00e+00   1.31e+00   1.91e+06    0         1      0.34
    2      2.10e+10   1.00e+00   8.89e-01   1.38e+04    0         1      0.53
    3      3.37e+09   1.00e+00   8.19e-01   4.18e+03    0         1      0.73
    4      1.42e+07   1.00e+00   3.25e-01   7.91e+02    0         1      0.93
    5      1.36e+03   1.00e+00   6.49e-02   6.58e+00    0         1      1.12
    6      5.05e-04   1.00e+00   6.97e-02   6.37e-01    0         1      1.32
Finished, because...
Error smaller than 1 ( 6.3717E-01 ).

Accumulated times:
Assembly time:        0.98 s
Solve time:      0.34 s
Total time:      1.32 s

contact        voltage     electron current    hole current  conduction current
 drain        1.420E-01       4.766E-16         4.717E-20        4.767E-16
 gateD        0.000E+00      -4.685E-22        -3.921E-51       -4.685E-22
 gateS        0.000E+00      -1.694E-28        -3.311E-51       -1.694E-28
 source       0.000E+00      -2.207E-16        -3.816E-26       -2.207E-16
 substrate    0.000E+00      -1.747E-20        -2.560E-16       -2.560E-16

Computing step from t=0.1 to t=0.233333 (Stepsize: 0.133333) :
Extrapolating values for t = 0.233333 ... done.
Computing Coupled( 1 poisson-equation(s) , 1 electron-equation(s) , 
                   1 hole-equation(s) ) 
using Bank/Rose nonlinear solver.

Iteration   |Rhs|      factor     |step|     error   #inner  #iterative  time
------------------------------------------------------------------------------
    0      4.56e-01                                                      0.13
    1      2.28e+06   1.00e+00   5.29e-01   7.83e+02    0         1      0.33
    2      9.61e+02   1.00e+00   6.09e-01   2.60e+01    0         1      0.53
    3      6.01e-04   1.00e+00   1.33e-01   2.28e+00    0         1      0.73
    4      5.59e-04   1.00e+00   3.39e-01   2.20e-01    0         1      0.92
Finished, because...
Error smaller than 1 ( 2.1981E-01 ).

Accumulated times:
Assembly time:        0.70 s
Solve time:      0.22 s
Total time:      0.92 s

contact        voltage     electron current    hole current  conduction current
 drain        2.247E-01       5.865E-16         4.259E-20        5.865E-16
 gateD        0.000E+00      -9.800E-22        -2.646E-50       -9.800E-22
 gateS        0.000E+00      -1.933E-28        -4.173E-51       -1.933E-28
 source       0.000E+00      -2.357E-16         1.391E-26       -2.357E-16
 substrate    0.000E+00      -1.759E-20        -3.508E-16       -3.508E-16

Computing step from t=0.233333 to t=0.42 (Stepsize: 0.186667) :
Extrapolating values for t = 0.42 ... done.
Computing Coupled( 1 poisson-equation(s) , 1 electron-equation(s) , 
                   1 hole-equation(s) ) 
using Bank/Rose nonlinear solver.

Iteration   |Rhs|      factor     |step|     error   #inner  #iterative  time
------------------------------------------------------------------------------
    0      4.80e-01                                                      0.13
    1      5.89e+06   1.00e+00   4.84e-01   1.40e+03    0         1      0.33
    2      7.51e+03   1.00e+00   7.50e-01   8.12e+01    0         1      0.53
    3      2.33e-02   1.00e+00   1.17e-01   3.24e+00    0         1      0.72
    4      7.47e-04   1.00e+00   2.33e-02   2.96e-01    0         1      0.92
Finished, because...
Error smaller than 1 ( 2.9599E-01 ).

Accumulated times:
Assembly time:        0.69 s
Solve time:      0.23 s
Total time:      0.92 s

contact        voltage     electron current    hole current  conduction current
 drain        3.404E-01       7.298E-16         6.729E-20        7.299E-16
 gateD        0.000E+00      -2.605E-21        -9.975E-49       -2.605E-21
 gateS        0.000E+00      -2.308E-28        -5.410E-51       -2.308E-28
 source       0.000E+00      -2.582E-16         2.198E-26       -2.582E-16
 substrate    0.000E+00      -1.778E-20        -4.716E-16       -4.717E-16

Computing step from t=0.42 to t=0.681333 (Stepsize: 0.261333) :
Extrapolating values for t = 0.681333 ... done.
Computing Coupled( 1 poisson-equation(s) , 1 electron-equation(s) , 
                   1 hole-equation(s) ) 
using Bank/Rose nonlinear solver.

Iteration   |Rhs|      factor     |step|     error   #inner  #iterative  time
------------------------------------------------------------------------------
    0      9.24e-01                                                      0.13
    1      1.51e+07   1.00e+00   6.88e-01   2.59e+03    0         1      0.33
    2      3.23e+04   1.00e+00   4.72e-01   2.45e+02    0         1      0.53
    3      1.71e-01   1.00e+00   9.78e-02   4.03e+00    0         1      0.72
    4      1.07e-03   1.00e+00   1.49e-02   6.07e-01    0         1      0.92
Finished, because...
Error smaller than 1 ( 6.0746E-01 ).

Accumulated times:
Assembly time:        0.70 s
Solve time:      0.22 s
Total time:      0.92 s

contact        voltage     electron current    hole current  conduction current
 drain        5.024E-01       8.993E-16         6.768E-20        8.994E-16
 gateD        0.000E+00      -9.567E-21        -3.392E-47       -9.567E-21
 gateS        0.000E+00      -2.932E-28        -7.334E-51       -2.932E-28
 source       0.000E+00      -2.925E-16        -1.339E-26       -2.925E-16
 substrate    0.000E+00      -1.800E-20        -6.069E-16       -6.069E-16

Computing step from t=0.681333 to t=1 (Stepsize: 0.318667) :
Extrapolating values for t = 1 ... done.
Computing Coupled( 1 poisson-equation(s) , 1 electron-equation(s) , 
                   1 hole-equation(s) ) 
using Bank/Rose nonlinear solver.

Iteration   |Rhs|      factor     |step|     error   #inner  #iterative  time
------------------------------------------------------------------------------
    0      1.26e+00                                                      0.13
    1      2.55e+07   1.00e+00   4.14e-01   3.80e+03    0         1      0.33
    2      1.46e+05   1.00e+00   3.27e-01   4.50e+02    0         1      0.53
    3      1.49e+01   1.00e+00   7.91e-02   2.02e+01    0         1      0.72
    4      7.77e-04   1.00e+00   1.03e-02   1.33e+00    0         1      0.92
    5      7.77e-04   1.00e+00   2.72e-03   4.56e-01    0         1      1.12
Finished, because...
Error smaller than 1 ( 4.5554E-01 ).

Accumulated times:
Assembly time:        0.86 s
Solve time:      0.26 s
Total time:      1.12 s

contact        voltage     electron current    hole current  conduction current
 drain        7.000E-01       1.160E-15         6.846E-20        1.160E-15
 gateD        0.000E+00      -4.413E-20        -3.902E-46       -4.413E-20
 gateS        0.000E+00      -3.886E-28        -1.094E-50       -3.886E-28
 source       0.000E+00      -3.396E-16         1.006E-26       -3.396E-16
 substrate    0.000E+00      -1.803E-20        -8.200E-16       -8.200E-16


Finished, because...
Curve trace finished.


===============================
Starting solve of next problem:
Quasistationary ( Digits : 5, Max. #iterations : 20, 
      Initial step in t : 0.01, 
      Minimum step in t : 1.0000e-05, Maximum step in t : 0.05, 
      Increment : 1.5, Decrement : 2, 
      DoZero      Goal values :
        Contact gateD : 2.5V,
        Contact gateS : 2.5V
    )
  {
    Coupled ( Digits : 5, Max. #iterations : 20, 
        Solver : blocked decomposition,
        #undamped iterations : 1000 
        )
        { Poisson Electron Hole } 
    Plot( FilePrefix = "n15_Profile_HighVd" nooverwrite -loadable
         Time (fixed times:
             0.0000e+00 0.2 0.3 0.4 0.5
             1) )
      { }
  }
===============================

Computing solution for t=0 :
Computing Coupled( 1 poisson-equation(s) , 1 electron-equation(s) , 
                   1 hole-equation(s) ) 
using Bank/Rose nonlinear solver.

Iteration   |Rhs|      factor     |step|     error   #inner  #iterative  time
------------------------------------------------------------------------------
    0      7.77e-04                                                      0.00
    1      1.01e-03   1.00e+00   1.94e-04   3.07e-02    0         1      0.20
Finished, because...
Error smaller than 1 ( 3.0738E-02 ).

Accumulated times:
Assembly time:        0.14 s
Solve time:      0.06 s
Total time:      0.20 s

contact        voltage     electron current    hole current  conduction current
 drain        7.000E-01       1.160E-15         6.846E-20        1.160E-15
 gateD        0.000E+00      -4.413E-20        -3.902E-46       -4.413E-20
 gateS        0.000E+00      -3.886E-28        -1.094E-50       -3.886E-28
 source       0.000E+00      -3.396E-16         9.419E-27       -3.396E-16
 substrate    0.000E+00      -1.804E-20        -8.200E-16       -8.200E-16


Plot started:
Saving device '':
    Writing plot 'n15_Profile_HighVd_0000_des.tdr' (TDR format) ... done.
Plot finished.

Computing step from t=0.0000e+00 to t=0.01 (Stepsize: 0.01) :
Computing Coupled( 1 poisson-equation(s) , 1 electron-equation(s) , 
                   1 hole-equation(s) ) 
using Bank/Rose nonlinear solver.

Iteration   |Rhs|      factor     |step|     error   #inner  #iterative  time
------------------------------------------------------------------------------
    0      5.44e+01                                                      0.13
    1      1.88e+06   1.00e+00   2.82e-01   2.50e+04    0         1      0.32
    2      1.43e+04   1.00e+00   6.80e-02   4.36e+03    0         1      0.52
    3      1.79e-01   1.00e+00   2.63e-03   2.15e+02    0         1      0.71
    4      1.04e-03   1.00e+00   6.39e-06   4.63e-01    0         1      0.91
Finished, because...
Error smaller than 1 ( 4.6294E-01 ).

Accumulated times:
Assembly time:        0.69 s
Solve time:      0.21 s
Total time:      0.91 s

contact        voltage     electron current    hole current  conduction current
 drain        7.000E-01       1.473E-15         6.846E-20        1.473E-15
 gateD        2.500E-02      -3.240E-20        -3.053E-46       -3.240E-20
 gateS        2.500E-02       6.912E-28         3.266E-42        6.912E-28
 source       0.000E+00      -6.544E-16         3.837E-24       -6.544E-16
 substrate    0.000E+00      -1.805E-20        -8.188E-16       -8.188E-16

Computing step from t=0.01 to t=0.024 (Stepsize: 0.014) :
Extrapolating values for t = 0.024 ... done.
Computing Coupled( 1 poisson-equation(s) , 1 electron-equation(s) , 
                   1 hole-equation(s) ) 
using Bank/Rose nonlinear solver.

Iteration   |Rhs|      factor     |step|     error   #inner  #iterative  time
------------------------------------------------------------------------------
    0      8.15e-03                                                      0.14
    1      1.11e+04   1.00e+00   6.32e-03   1.53e+02    0         1      0.33
    2      5.70e-02   1.00e+00   2.54e-04   5.81e-01    0         1      0.52
Finished, because...
Error smaller than 1 ( 5.8098E-01 ).

Accumulated times:
Assembly time:        0.41 s
Solve time:      0.11 s
Total time:      0.52 s

contact        voltage     electron current    hole current  conduction current
 drain        7.000E-01       2.470E-15         6.844E-20        2.470E-15
 gateD        6.000E-02      -2.100E-20        -2.141E-46       -2.100E-20
 gateS        6.000E-02       3.119E-27         7.972E-42        3.119E-27
 source       0.000E+00      -1.653E-15         1.508E-22       -1.653E-15
 substrate    0.000E+00      -1.772E-20        -8.171E-16       -8.171E-16

Computing step from t=0.024 to t=0.0445333 (Stepsize: 0.0205333) :
Extrapolating values for t = 0.0445333 ... done.
Computing Coupled( 1 poisson-equation(s) , 1 electron-equation(s) , 
                   1 hole-equation(s) ) 
using Bank/Rose nonlinear solver.

Iteration   |Rhs|      factor     |step|     error   #inner  #iterative  time
------------------------------------------------------------------------------
    0      1.88e-01                                                      0.13
    1      5.80e+04   1.00e+00   1.23e-02   2.94e+02    0         1      0.33
    2      2.68e+00   1.00e+00   9.86e-04   2.16e+00    0         1      0.52
    3      5.11e-04   1.00e+00   8.98e-06   9.32e-05    0         1      0.72
Finished, because...
Error smaller than 1 ( 9.3212E-05 ).

Accumulated times:
Assembly time:        0.57 s
Solve time:      0.15 s
Total time:      0.72 s

contact        voltage     electron current    hole current  conduction current
 drain        7.000E-01       7.326E-15         6.846E-20        7.326E-15
 gateD        1.113E-01      -1.109E-20        -1.245E-46       -1.109E-20
 gateS        1.113E-01       1.219E-26         1.923E-41        1.219E-26
 source       0.000E+00      -6.512E-15        -1.337E-26       -6.512E-15
 substrate    0.000E+00      -1.805E-20        -8.147E-16       -8.148E-16

Computing step from t=0.0445333 to t=0.0739644 (Stepsize: 0.0294311) :
Extrapolating values for t = 0.0739644 ... done.
Computing Coupled( 1 poisson-equation(s) , 1 electron-equation(s) , 
                   1 hole-equation(s) ) 
using Bank/Rose nonlinear solver.

Iteration   |Rhs|      factor     |step|     error   #inner  #iterative  time
------------------------------------------------------------------------------
    0      1.52e-01                                                      0.14
    1      4.20e+05   1.00e+00   2.46e-02   5.45e+02    0         1      0.33
    2      1.30e+02   1.00e+00   3.30e-03   7.35e+00    0         1      0.53
    3      5.92e-04   1.00e+00   9.65e-05   1.04e-03    0         1      0.73
Finished, because...
Error smaller than 1 ( 1.0381E-03 ).

Accumulated times:
Assembly time:        0.56 s
Solve time:      0.16 s
Total time:      0.73 s

contact        voltage     electron current    hole current  conduction current
 drain        7.000E-01       4.820E-14         6.846E-20        4.820E-14
 gateD        1.849E-01      -4.535E-21        -5.746E-47       -4.535E-21
 gateS        1.849E-01       7.051E-26         6.400E-41        7.051E-26
 source       0.000E+00      -4.738E-14         1.846E-27       -4.738E-14
 substrate    0.000E+00      -1.798E-20        -8.120E-16       -8.120E-16

Computing step from t=0.0739644 to t=0.116149 (Stepsize: 0.0421846) :
Extrapolating values for t = 0.116149 ... done.
Computing Coupled( 1 poisson-equation(s) , 1 electron-equation(s) , 
                   1 hole-equation(s) ) 
using Bank/Rose nonlinear solver.

Iteration   |Rhs|      factor     |step|     error   #inner  #iterative  time
------------------------------------------------------------------------------
    0      1.79e-01                                                      0.14
    1      2.71e+06   1.00e+00   4.81e-02   9.95e+02    0         1      0.34
    2      5.59e+03   1.00e+00   8.75e-03   2.47e+01    0         1      0.53
    3      5.67e-03   1.00e+00   6.49e-04   5.65e-02    0         1      0.73
Finished, because...
Error smaller than 1 ( 5.6500E-02 ).

Accumulated times:
Assembly time:        0.56 s
Solve time:      0.17 s
Total time:      0.73 s

contact        voltage     electron current    hole current  conduction current
 drain        7.000E-01       8.357E-13         6.845E-20        8.357E-13
 gateD        2.904E-01      -1.281E-21        -1.446E-47       -1.281E-21
 gateS        2.904E-01       8.568E-25         3.857E-40        8.568E-25
 source       0.000E+00      -8.349E-13        -8.473E-26       -8.349E-13
 substrate    0.000E+00       1.266E-21        -8.082E-16       -8.082E-16

Computing step from t=0.116149 to t=0.166149 (Stepsize: 0.05) :
Extrapolating values for t = 0.166149 ... done.
Computing Coupled( 1 poisson-equation(s) , 1 electron-equation(s) , 
                   1 hole-equation(s) ) 
using Bank/Rose nonlinear solver.

Iteration   |Rhs|      factor     |step|     error   #inner  #iterative  time
------------------------------------------------------------------------------
    0      8.85e+00                                                      0.14
    1      7.93e+06   1.00e+00   7.05e-02   1.42e+03    0         1      0.34
    2      5.14e+04   1.00e+00   1.75e-02   6.43e+01    0         1      0.54
    3      6.31e-01   1.00e+00   3.62e-03   7.71e-01    0         1      0.74
Finished, because...
Error smaller than 1 ( 7.7068E-01 ).

Accumulated times:
Assembly time:        0.56 s
Solve time:      0.18 s
Total time:      0.74 s

contact        voltage     electron current    hole current  conduction current
 drain        7.000E-01       2.540E-11         6.845E-20        2.540E-11
 gateD        4.154E-01      -2.794E-22         4.252E-49       -2.794E-22
 gateS        4.154E-01       1.829E-23         3.663E-39        1.829E-23
 source       0.000E+00      -2.540E-11        -8.632E-24       -2.540E-11
 substrate    0.000E+00       4.778E-18        -7.982E-16       -7.934E-16

Computing step from t=0.166149 to t=0.2 (Stepsize: 0.033851) :
Extrapolating values for t = 0.2 ... done.
Computing Coupled( 1 poisson-equation(s) , 1 electron-equation(s) , 
                   1 hole-equation(s) ) 
using Bank/Rose nonlinear solver.

Iteration   |Rhs|      factor     |step|     error   #inner  #iterative  time
------------------------------------------------------------------------------
    0      5.41e+01                                                      0.14
    1      3.05e+06   1.00e+00   5.15e-02   9.01e+02    0         1      0.35
    2      1.24e+04   1.00e+00   6.51e-03   2.80e+01    0         1      0.55
    3      4.57e-02   1.00e+00   1.39e-04   1.84e-01    0         1      0.75
Finished, because...
Error smaller than 1 ( 1.8435E-01 ).

Accumulated times:
Assembly time:        0.58 s
Solve time:      0.16 s
Total time:      0.75 s

contact        voltage     electron current    hole current  conduction current
 drain        7.000E-01       2.555E-10         6.845E-20        2.555E-10
 gateD        5.000E-01      -5.235E-23         9.682E-49       -5.235E-23
 gateS        5.000E-01       1.526E-22         9.613E-39        1.526E-22
 source       0.000E+00      -2.555E-10        -3.226E-25       -2.555E-10
 substrate    0.000E+00       9.617E-19        -7.905E-16       -7.895E-16


Plot started:
Saving device '':
    Writing plot 'n15_Profile_HighVd_0001_des.tdr' (TDR format) ... done.
Plot finished.

Computing step from t=0.2 to t=0.25 (Stepsize: 0.05) :
Extrapolating values for t = 0.25 ... done.
Computing Coupled( 1 poisson-equation(s) , 1 electron-equation(s) , 
                   1 hole-equation(s) ) 
using Bank/Rose nonlinear solver.

Iteration   |Rhs|      factor     |step|     error   #inner  #iterative  time
------------------------------------------------------------------------------
    0      2.53e+03                                                      0.14
    1      1.14e+07   1.00e+00   5.47e-02   1.55e+03    0         1      0.35
    2      1.65e+05   1.00e+00   1.19e-02   7.19e+01    0         1      0.55
    3      1.09e+01   1.00e+00   4.63e-04   9.48e-01    0         1      0.75
Finished, because...
Error smaller than 1 ( 9.4848E-01 ).

Accumulated times:
Assembly time:        0.59 s
Solve time:      0.16 s
Total time:      0.75 s

contact        voltage     electron current    hole current  conduction current
 drain        7.000E-01       7.526E-09         6.845E-20        7.526E-09
 gateD        6.250E-01       1.768E-21         1.765E-48        1.768E-21
 gateS        6.250E-01       3.384E-21         2.775E-38        3.384E-21
 source       0.000E+00      -7.526E-09        -2.514E-23       -7.526E-09
 substrate    0.000E+00      -1.640E-15        -7.818E-16       -2.421E-15

Computing step from t=0.25 to t=0.3 (Stepsize: 0.05) :
Extrapolating values for t = 0.3 ... done.
Computing Coupled( 1 poisson-equation(s) , 1 electron-equation(s) , 
                   1 hole-equation(s) ) 
using Bank/Rose nonlinear solver.

Iteration   |Rhs|      factor     |step|     error   #inner  #iterative  time
------------------------------------------------------------------------------
    0      1.07e+05                                                      0.14
    1      2.66e+07   1.00e+00   5.38e-02   2.65e+03    0         1      0.35
    2      1.09e+06   1.00e+00   7.86e-03   1.65e+02    0         1      0.56
    3      3.31e+02   1.00e+00   1.89e-04   5.72e+00    0         1      0.77
    4      7.80e-04   1.00e+00   4.53e-07   3.85e-03    0         1      0.97
Finished, because...
Error smaller than 1 ( 3.8504E-03 ).

Accumulated times:
Assembly time:        0.75 s
Solve time:      0.21 s
Total time:      0.97 s

contact        voltage     electron current    hole current  conduction current
 drain        7.000E-01       2.050E-07         6.846E-20        2.050E-07
 gateD        7.500E-01       6.046E-20         3.462E-48        6.046E-20
 gateS        7.500E-01       6.961E-20         8.745E-39        6.961E-20
 source       0.000E+00      -2.050E-07        -1.912E-27       -2.050E-07
 substrate    0.000E+00      -1.113E-18        -7.744E-16       -7.755E-16


Plot started:
Saving device '':
    Writing plot 'n15_Profile_HighVd_0002_des.tdr' (TDR format) ... done.
Plot finished.

Computing step from t=0.3 to t=0.35 (Stepsize: 0.05) :
Extrapolating values for t = 0.35 ... done.
Computing Coupled( 1 poisson-equation(s) , 1 electron-equation(s) , 
                   1 hole-equation(s) ) 
using Bank/Rose nonlinear solver.

Iteration   |Rhs|      factor     |step|     error   #inner  #iterative  time
------------------------------------------------------------------------------
    0      1.94e+06                                                      0.15
    1      4.62e+07   1.00e+00   7.90e-02   6.11e+03    0         1      0.36
    2      4.56e+06   1.00e+00   1.03e-02   3.36e+02    0         1      0.58
    3      1.85e+04   1.00e+00   1.28e-03   9.67e+01    0         1      0.79
    4      3.41e-01   1.00e+00   5.97e-06   3.74e-01    0         1      1.00
Finished, because...
Error smaller than 1 ( 3.7438E-01 ).

Accumulated times:
Assembly time:        0.77 s
Solve time:      0.23 s
Total time:      1.00 s

contact        voltage     electron current    hole current  conduction current
 drain        7.000E-01       4.343E-06         6.850E-20        4.343E-06
 gateD        8.750E-01       1.585E-18         1.607E-48        1.585E-18
 gateS        8.750E-01       1.126E-18         1.377E-38        1.126E-18
 source       0.000E+00      -4.343E-06         2.562E-26       -4.343E-06
 substrate    0.000E+00      -6.157E-15        -7.683E-16       -6.925E-15

Computing step from t=0.35 to t=0.4 (Stepsize: 0.05) :
Extrapolating values for t = 0.4 ... done.
Computing Coupled( 1 poisson-equation(s) , 1 electron-equation(s) , 
                   1 hole-equation(s) ) 
using Bank/Rose nonlinear solver.

Iteration   |Rhs|      factor     |step|     error   #inner  #iterative  time
------------------------------------------------------------------------------
    0      4.94e+07                                                      0.16
    1      5.42e+07   1.00e+00   2.14e-01   2.95e+04    0         1      0.37
    2      2.78e+07   1.00e+00   5.56e-02   3.06e+03    0         1      0.59
    3      2.43e+06   1.00e+00   8.80e-03   5.27e+02    0         1      0.81
    4      1.81e+04   1.00e+00   5.65e-04   3.65e+01    0         1      1.02
    5      8.02e-01   1.00e+00   2.29e-06   1.46e-01    0         1      1.24
Finished, because...
Error smaller than 1 ( 1.4564E-01 ).

Accumulated times:
Assembly time:        0.95 s
Solve time:      0.28 s
Total time:      1.24 s

contact        voltage     electron current    hole current  conduction current
 drain        7.000E-01       3.916E-05         6.886E-20        3.916E-05
 gateD        1.000E+00       1.762E-17         2.581E-48        1.762E-17
 gateS        1.000E+00       8.782E-18         2.282E-38        8.782E-18
 source       0.000E+00      -3.916E-05        -2.653E-24       -3.916E-05
 substrate    0.000E+00      -1.569E-13        -7.704E-16       -1.577E-13


Plot started:
Saving device '':
    Writing plot 'n15_Profile_HighVd_0003_des.tdr' (TDR format) ... done.
Plot finished.

Computing step from t=0.4 to t=0.45 (Stepsize: 0.05) :
Extrapolating values for t = 0.45 ... done.
Computing Coupled( 1 poisson-equation(s) , 1 electron-equation(s) , 
                   1 hole-equation(s) ) 
using Bank/Rose nonlinear solver.

Iteration   |Rhs|      factor     |step|     error   #inner  #iterative  time
------------------------------------------------------------------------------
    0      1.44e+08                                                      0.16
    1      1.38e+08   1.00e+00   2.26e-01   3.01e+04    0         1      0.38
    2      3.06e+07   1.00e+00   6.75e-02   1.75e+03    0         1      0.60
    3      9.70e+05   1.00e+00   5.57e-03   2.15e+02    0         1      0.83
    4      1.07e+03   1.00e+00   1.46e-04   5.98e+00    0         1      1.05
    5      1.13e-03   1.00e+00   1.20e-07   5.10e-03    0         1      1.27
Finished, because...
Error smaller than 1 ( 5.1043E-03 ).

Accumulated times:
Assembly time:        1.00 s
Solve time:      0.27 s
Total time:      1.27 s

contact        voltage     electron current    hole current  conduction current
 drain        7.000E-01       1.222E-04         6.973E-20        1.222E-04
 gateD        1.125E+00       7.123E-17         4.905E-48        7.123E-17
 gateS        1.125E+00       3.042E-17         3.888E-38        3.042E-17
 source       0.000E+00      -1.222E-04        -1.680E-24       -1.222E-04
 substrate    0.000E+00      -4.935E-18        -7.799E-16       -7.848E-16

Computing step from t=0.45 to t=0.5 (Stepsize: 0.05) :
Extrapolating values for t = 0.5 ... done.
Computing Coupled( 1 poisson-equation(s) , 1 electron-equation(s) , 
                   1 hole-equation(s) ) 
using Bank/Rose nonlinear solver.

Iteration   |Rhs|      factor     |step|     error   #inner  #iterative  time
------------------------------------------------------------------------------
    0      1.43e+08                                                      0.16
    1      7.30e+07   1.00e+00   1.23e-01   9.28e+03    0         1      0.39
    2      2.37e+06   1.00e+00   1.91e-02   3.37e+02    0         1      0.62
    3      2.25e+03   1.00e+00   2.82e-04   9.11e+00    0         1      0.84
    4      5.29e-03   1.00e+00   2.32e-07   9.22e-03    0         1      1.07
Finished, because...
Error smaller than 1 ( 9.2173E-03 ).

Accumulated times:
Assembly time:        0.85 s
Solve time:      0.22 s
Total time:      1.07 s

contact        voltage     electron current    hole current  conduction current
 drain        7.000E-01       2.300E-04         7.090E-20        2.300E-04
 gateD        1.250E+00       1.859E-16         1.088E-47        1.859E-16
 gateS        1.250E+00       7.242E-17         6.805E-38        7.242E-17
 source       0.000E+00      -2.300E-04        -3.236E-24       -2.300E-04
 substrate    0.000E+00       1.086E-15        -7.903E-16        2.959E-16


Plot started:
Saving device '':
    Writing plot 'n15_Profile_HighVd_0004_des.tdr' (TDR format) ... done.
Plot finished.

Computing step from t=0.5 to t=0.55 (Stepsize: 0.05) :
Extrapolating values for t = 0.55 ... done.
Computing Coupled( 1 poisson-equation(s) , 1 electron-equation(s) , 
                   1 hole-equation(s) ) 
using Bank/Rose nonlinear solver.

Iteration   |Rhs|      factor     |step|     error   #inner  #iterative  time
------------------------------------------------------------------------------
    0      1.34e+09                                                      0.17
    1      3.96e+08   1.00e+00   8.02e-02   3.62e+03    0         1      0.41
    2      7.13e+07   1.00e+00   1.32e-02   4.08e+02    0         1      0.64
    3      3.99e+06   1.00e+00   2.40e-03   1.01e+02    0         1      0.87
    4      9.19e+03   1.00e+00   9.44e-05   4.19e+00    0         1      1.10
    5      6.48e-02   1.00e+00   2.06e-07   8.83e-03    0         1      1.34
Finished, because...
Error smaller than 1 ( 8.8341E-03 ).

Accumulated times:
Assembly time:        1.07 s
Solve time:      0.27 s
Total time:      1.34 s

contact        voltage     electron current    hole current  conduction current
 drain        7.000E-01       3.466E-04         7.220E-20        3.466E-04
 gateD        1.375E+00       4.242E-16         3.014E-47        4.242E-16
 gateS        1.375E+00       1.467E-16         1.231E-37        1.467E-16
 source       0.000E+00      -3.466E-04        -4.870E-24       -3.466E-04
 substrate    0.000E+00       6.993E-16        -7.995E-16       -1.002E-16

Computing step from t=0.55 to t=0.6 (Stepsize: 0.05) :
Extrapolating values for t = 0.6 ... done.
Computing Coupled( 1 poisson-equation(s) , 1 electron-equation(s) , 
                   1 hole-equation(s) ) 
using Bank/Rose nonlinear solver.

Iteration   |Rhs|      factor     |step|     error   #inner  #iterative  time
------------------------------------------------------------------------------
    0      1.56e+09                                                      0.18
    1      6.15e+08   1.00e+00   8.83e-02   2.52e+03    0         1      0.42
    2      2.14e+08   1.00e+00   9.38e-03   3.04e+02    0         1      0.66
    3      2.54e+07   1.00e+00   3.41e-03   1.21e+02    0         1      0.90
    4      3.97e+05   1.00e+00   3.07e-04   1.16e+01    0         1      1.13
    5      9.98e+01   1.00e+00   3.97e-06   1.51e-01    0         1      1.37
Finished, because...
Error smaller than 1 ( 1.5134E-01 ).

Accumulated times:
Assembly time:        1.09 s
Solve time:      0.27 s
Total time:      1.37 s

contact        voltage     electron current    hole current  conduction current
 drain        7.000E-01       4.643E-04         7.355E-20        4.643E-04
 gateD        1.500E+00       9.853E-16         1.722E-46        9.853E-16
 gateS        1.500E+00       2.747E-16         2.314E-37        2.747E-16
 source       0.000E+00      -4.643E-04        -6.745E-24       -4.643E-04
 substrate    0.000E+00       1.681E-13        -8.074E-16        1.673E-13

Computing step from t=0.6 to t=0.65 (Stepsize: 0.05) :
Extrapolating values for t = 0.65 ... done.
Computing Coupled( 1 poisson-equation(s) , 1 electron-equation(s) , 
                   1 hole-equation(s) ) 
using Bank/Rose nonlinear solver.

Iteration   |Rhs|      factor     |step|     error   #inner  #iterative  time
------------------------------------------------------------------------------
    0      9.32e+08                                                      0.18
    1      3.42e+08   1.00e+00   8.23e-02   1.93e+03    0         1      0.43
    2      8.54e+07   1.00e+00   2.41e-02   6.39e+02    0         1      0.68
    3      4.46e+06   1.00e+00   5.65e-03   1.22e+02    0         1      0.92
    4      1.47e+04   1.00e+00   1.58e-03   4.26e+00    0         1      1.17
    5      1.01e-01   1.00e+00   8.47e-05   1.13e-02    0         1      1.42
Finished, because...
Error smaller than 1 ( 1.1282E-02 ).

Accumulated times:
Assembly time:        1.15 s
Solve time:      0.27 s
Total time:      1.42 s

contact        voltage     electron current    hole current  conduction current
 drain        7.000E-01       5.785E-04         7.489E-20        5.785E-04
 gateD        1.625E+00       2.464E-15         2.577E-45        2.464E-15
 gateS        1.625E+00       4.965E-16         4.535E-37        4.965E-16
 source       0.000E+00      -5.785E-04        -8.365E-24       -5.785E-04
 substrate    0.000E+00       2.484E-17        -8.139E-16       -7.890E-16

Computing step from t=0.65 to t=0.7 (Stepsize: 0.05) :
Extrapolating values for t = 0.7 ... done.
Computing Coupled( 1 poisson-equation(s) , 1 electron-equation(s) , 
                   1 hole-equation(s) ) 
using Bank/Rose nonlinear solver.

Iteration   |Rhs|      factor     |step|     error   #inner  #iterative  time
------------------------------------------------------------------------------
    0      6.84e+08                                                      0.19
    1      2.79e+08   1.00e+00   1.10e-01   1.66e+03    0         1      0.45
    2      1.18e+08   1.00e+00   9.35e-02   5.42e+02    0         1      0.70
    3      1.21e+07   1.00e+00   2.12e-02   4.11e+02    0         1      0.96
    4      1.13e+05   1.00e+00   2.70e-03   4.05e+01    0         1      1.21
    5      2.04e+01   1.00e+00   7.78e-04   2.74e-01    0         1      1.46
Finished, because...
Error smaller than 1 ( 2.7429E-01 ).

Accumulated times:
Assembly time:        1.19 s
Solve time:      0.27 s
Total time:      1.46 s

contact        voltage     electron current    hole current  conduction current
 drain        7.000E-01       6.861E-04         7.617E-20        6.861E-04
 gateD        1.750E+00       6.581E-15         1.673E-44        6.581E-15
 gateS        1.750E+00       8.950E-16         9.329E-37        8.950E-16
 source       0.000E+00      -6.861E-04        -1.086E-23       -6.861E-04
 substrate    0.000E+00       2.454E-16        -8.190E-16       -5.736E-16

Computing step from t=0.7 to t=0.75 (Stepsize: 0.05) :
Extrapolating values for t = 0.75 ... done.
Computing Coupled( 1 poisson-equation(s) , 1 electron-equation(s) , 
                   1 hole-equation(s) ) 
using Bank/Rose nonlinear solver.

Iteration   |Rhs|      factor     |step|     error   #inner  #iterative  time
------------------------------------------------------------------------------
    0      1.06e+09                                                      0.20
    1      3.67e+08   1.00e+00   1.24e-01   1.74e+03    0         1      0.46
    2      1.80e+08   1.00e+00   1.12e-01   5.39e+02    0         1      0.72
    3      1.74e+07   1.00e+00   2.43e-02   3.76e+02    0         1      0.98
    4      2.93e+05   1.00e+00   3.64e-03   3.58e+01    0         1      1.25
    5      4.38e+01   1.00e+00   1.84e-03   3.56e-01    0         1      1.51
Finished, because...
Error smaller than 1 ( 3.5605E-01 ).

Accumulated times:
Assembly time:        1.24 s
Solve time:      0.27 s
Total time:      1.51 s

contact        voltage     electron current    hole current  conduction current
 drain        7.000E-01       7.844E-04         7.735E-20        7.844E-04
 gateD        1.875E+00       1.827E-14         9.264E-44        1.827E-14
 gateS        1.875E+00       1.687E-15         2.034E-36        1.687E-15
 source       0.000E+00      -7.844E-04        -1.300E-23       -7.844E-04
 substrate    0.000E+00      -1.391E-15        -8.228E-16       -2.214E-15

Computing step from t=0.75 to t=0.8 (Stepsize: 0.05) :
Extrapolating values for t = 0.8 ... done.
Computing Coupled( 1 poisson-equation(s) , 1 electron-equation(s) , 
                   1 hole-equation(s) ) 
using Bank/Rose nonlinear solver.

Iteration   |Rhs|      factor     |step|     error   #inner  #iterative  time
------------------------------------------------------------------------------
    0      1.09e+09                                                      0.21
    1      3.66e+08   1.00e+00   7.79e-02   1.75e+03    0         1      0.48
    2      9.89e+07   1.00e+00   6.05e-02   5.77e+02    0         1      0.75
    3      8.36e+06   1.00e+00   5.07e-02   1.29e+02    0         1      1.02
    4      4.56e+06   1.00e+00   6.40e-02   1.48e+01    0         1      1.29
    5      1.12e+04   1.00e+00   1.16e-02   2.20e+01    0         1      1.56
    6      5.16e-02   1.00e+00   1.22e-03   3.47e+00    0         1      1.83
    7      1.45e-03   1.00e+00   8.25e-05   2.15e-01    0         1      2.09
Finished, because...
Error smaller than 1 ( 2.1507E-01 ).

Accumulated times:
Assembly time:        1.71 s
Solve time:      0.37 s
Total time:      2.09 s

contact        voltage     electron current    hole current  conduction current
 drain        7.000E-01       8.686E-04         7.837E-20        8.686E-04
 gateD        2.000E+00       5.141E-14         5.153E-43        5.141E-14
 gateS        2.000E+00       3.473E-15         4.842E-36        3.473E-15
 source       0.000E+00      -8.686E-04        -1.289E-23       -8.686E-04
 substrate    0.000E+00      -1.049E-16        -8.253E-16       -9.302E-16

Computing step from t=0.8 to t=0.85 (Stepsize: 0.05) :
Extrapolating values for t = 0.85 ... done.
Computing Coupled( 1 poisson-equation(s) , 1 electron-equation(s) , 
                   1 hole-equation(s) ) 
using Bank/Rose nonlinear solver.

Iteration   |Rhs|      factor     |step|     error   #inner  #iterative  time
------------------------------------------------------------------------------
    0      4.78e+08                                                      0.21
    1      1.92e+08   1.00e+00   6.20e-02   1.45e+03    0         1      0.48
    2      4.67e+07   1.00e+00   1.75e-02   5.13e+02    0         1      0.76
    3      2.95e+06   1.00e+00   2.73e-03   9.14e+01    0         1      1.03
    4      6.28e+03   1.00e+00   8.73e-05   3.10e+00    0         1      1.31
    5      4.45e-02   1.00e+00   1.30e-07   4.61e-03    0         1      1.58
Finished, because...
Error smaller than 1 ( 4.6110E-03 ).

Accumulated times:
Assembly time:        1.31 s
Solve time:      0.27 s
Total time:      1.58 s

contact        voltage     electron current    hole current  conduction current
 drain        7.000E-01       9.338E-04         7.916E-20        9.338E-04
 gateD        2.125E+00       1.450E-13         2.420E-42        1.450E-13
 gateS        2.125E+00       7.754E-15         1.313E-35        7.754E-15
 source       0.000E+00      -9.338E-04        -1.392E-23       -9.338E-04
 substrate    0.000E+00      -8.024E-17        -8.269E-16       -9.071E-16

Computing step from t=0.85 to t=0.9 (Stepsize: 0.05) :
Extrapolating values for t = 0.9 ... done.
Computing Coupled( 1 poisson-equation(s) , 1 electron-equation(s) , 
                   1 hole-equation(s) ) 
using Bank/Rose nonlinear solver.

Iteration   |Rhs|      factor     |step|     error   #inner  #iterative  time
------------------------------------------------------------------------------
    0      1.04e+08                                                      0.21
    1      3.60e+07   1.00e+00   4.93e-02   1.12e+03    0         1      0.49
    2      2.91e+06   1.00e+00   8.82e-03   2.10e+02    0         1      0.77
    3      1.36e+04   1.00e+00   3.55e-04   9.65e+00    0         1      1.05
    4      2.36e-01   1.00e+00   8.65e-07   2.34e-02    0         1      1.32
Finished, because...
Error smaller than 1 ( 2.3376E-02 ).

Accumulated times:
Assembly time:        1.11 s
Solve time:      0.21 s
Total time:      1.32 s

contact        voltage     electron current    hole current  conduction current
 drain        7.000E-01       9.822E-04         7.975E-20        9.822E-04
 gateD        2.250E+00       4.176E-13         1.089E-41        4.176E-13
 gateS        2.250E+00       1.809E-14         4.102E-35        1.809E-14
 source       0.000E+00      -9.822E-04        -1.479E-23       -9.822E-04
 substrate    0.000E+00      -1.214E-16        -8.278E-16       -9.492E-16

Computing step from t=0.9 to t=0.95 (Stepsize: 0.05) :
Extrapolating values for t = 0.95 ... done.
Computing Coupled( 1 poisson-equation(s) , 1 electron-equation(s) , 
                   1 hole-equation(s) ) 
using Bank/Rose nonlinear solver.

Iteration   |Rhs|      factor     |step|     error   #inner  #iterative  time
------------------------------------------------------------------------------
    0      6.00e+07                                                      0.22
    1      8.73e+06   1.00e+00   3.27e-02   7.40e+02    0         1      0.51
    2      1.48e+05   1.00e+00   3.16e-03   6.00e+01    0         1      0.79
    3      3.39e+01   1.00e+00   3.57e-05   6.11e-01    0         1      1.08
Finished, because...
Error smaller than 1 ( 6.1125E-01 ).

Accumulated times:
Assembly time:        0.91 s
Solve time:      0.15 s
Total time:      1.08 s

contact        voltage     electron current    hole current  conduction current
 drain        7.000E-01       1.019E-03         8.020E-20        1.019E-03
 gateD        2.375E+00       1.277E-12         6.052E-41        1.277E-12
 gateS        2.375E+00       4.348E-14         1.454E-34        4.348E-14
 source       0.000E+00      -1.019E-03        -1.713E-22       -1.019E-03
 substrate    0.000E+00      -1.546E-13        -8.284E-16       -1.554E-13

Computing step from t=0.95 to t=1 (Stepsize: 0.05) :
Extrapolating values for t = 1 ... done.
Computing Coupled( 1 poisson-equation(s) , 1 electron-equation(s) , 
                   1 hole-equation(s) ) 
using Bank/Rose nonlinear solver.

Iteration   |Rhs|      factor     |step|     error   #inner  #iterative  time
------------------------------------------------------------------------------
    0      7.84e+07                                                      0.23
    1      6.40e+06   1.00e+00   2.15e-02   5.06e+02    0         1      0.52
    2      1.46e+04   1.00e+00   1.23e-03   2.16e+01    0         1      0.81
    3      2.29e-01   1.00e+00   4.94e-06   5.79e-02    0         1      1.10
Finished, because...
Error smaller than 1 ( 5.7878E-02 ).

Accumulated times:
Assembly time:        0.95 s
Solve time:      0.15 s
Total time:      1.10 s

contact        voltage     electron current    hole current  conduction current
 drain        7.000E-01       1.048E-03         8.055E-20        1.048E-03
 gateD        2.500E+00       4.468E-12         4.129E-40        4.468E-12
 gateS        2.500E+00       1.081E-13         5.796E-34        1.081E-13
 source       0.000E+00      -1.048E-03        -1.762E-23       -1.048E-03
 substrate    0.000E+00      -7.729E-16        -8.288E-16       -1.602E-15


Plot started:
Saving device '':
    Writing plot 'n15_Profile_HighVd_0005_des.tdr' (TDR format) ... done.
Plot finished.


Finished, because...
Curve trace finished.

Writing plot 'n15_des.tdr' (TDR format) ... done.

Tue Aug  4 22:28:42 2026: checked in 1 sdevice license(s)

******************************************************************************
Sentaurus Device peak memory usage: 231 megabytes
Sentaurus Device simulation times:
  wallclock: 84.19 s (0 h:01 m:24 s)
  total cpu: 84.08 s (0 h:01 m:24 s)
Sentaurus Device simulation finished (Date: Tue Aug  4 22:28:42 2026  (KST)).
********************************* Good Bye ! *********************************
```

## 3. P01-T01-O02_HH_n21_sdevice

- 코드 종류: Sentaurus SDevice
- 원본 파일: [`P01-T01-O02_HH_n21_sdevice.cmd`](./source/P01-T01-O02_HH_n21_sdevice.cmd)

```tcl
****************************************************************************
***                           Sentaurus Device                           ***
***                          Version T-2022.03                           ***
***                      (0.7486838, x86_64, Linux)                      ***
***                                                                      ***
***                       Copyright (C) 1994-2022                        ***
***                            Synopsys, Inc.                            ***
***                                                                      ***
***  This software and the associated documentation are confidential     ***
***  and proprietary to Synopsys, Inc.  Your use or disclosure of this   ***
***  software is subject to the terms and conditions of a written        ***
***  license agreement between you, or your company, and Synopsys, Inc.  ***
****************************************************************************

	Running on machine with the following configuration:
	Host Name: ssudisu1
	Operating System: Linux rel. 3.10.0-1160.119.1.el7.x86_64 ver. #1 SMP Tue Jun 4 14:43:51 UTC 2024
	Machine Type: x86_64
	Process ID: 95620
	Number of processors: 128
	Domain Name: (none)
	Date: Tue Aug  4 22:28:45 2026  (KST)

Tue Aug  4 22:28:45 2026: checked out 1 sdevice license(s)
Parsing circuit file /user/tools/synopsys/sentaurus/T-2022.03/bin/../tcad/current/linux64/lib/sdevice/sd_SRL1.ccf
Parsing circuit file /user/tools/synopsys/sentaurus/T-2022.03/bin/../tcad/current/linux64/lib/sdevice/sd_hb_vsource2.ccf
Parsing circuit file /user/tools/synopsys/sentaurus/T-2022.03/bin/../tcad/current/linux64/lib/sdevice/sd_hb_sRL.ccf
Parsing circuit file /user/tools/synopsys/sentaurus/T-2022.03/bin/../tcad/current/linux64/lib/sdevice/sd_hb_isource.ccf
Parsing circuit file /user/tools/synopsys/sentaurus/T-2022.03/bin/../tcad/current/linux64/lib/sdevice/sd_hb_isource2.ccf
Parsing circuit file /user/tools/synopsys/sentaurus/T-2022.03/bin/../tcad/current/linux64/lib/sdevice/sd_hb_pGC.ccf
Parsing circuit file /user/tools/synopsys/sentaurus/T-2022.03/bin/../tcad/current/linux64/lib/sdevice/bs_psource.ccf
Parsing circuit file /user/tools/synopsys/sentaurus/T-2022.03/bin/../tcad/current/linux64/lib/sdevice/sd_hb_vsource.ccf
Parsing circuit file /user/tools/synopsys/sentaurus/T-2022.03/bin/../tcad/current/linux64/lib/scm/satinductor.ccf
Parsing circuit file /user/tools/synopsys/sentaurus/T-2022.03/bin/../tcad/current/linux64/lib/scm/ferroelectric.ccf
Parsing circuit file /user/tools/synopsys/sentaurus/T-2022.03/bin/../tcad/current/linux64/lib/scm/MOS_harness.ccf
Loading shared object file /user/tools/synopsys/sentaurus/T-2022.03/bin/../tcad/current/linux64/lib/scm/MOS_harness.so.linux64
Loading shared object file /user/tools/synopsys/sentaurus/T-2022.03/bin/../tcad/current/linux64/lib/scm/ferroelectric.so.linux64
Loading shared object file /user/tools/synopsys/sentaurus/T-2022.03/bin/../tcad/current/linux64/lib/scm/satinductor.so.linux64
Loading shared object file /user/tools/synopsys/sentaurus/T-2022.03/bin/../tcad/current/linux64/lib/sdevice/sd_hb_vsource.so.linux64
Loading shared object file /user/tools/synopsys/sentaurus/T-2022.03/bin/../tcad/current/linux64/lib/sdevice/bs_psource.so.linux64
Loading shared object file /user/tools/synopsys/sentaurus/T-2022.03/bin/../tcad/current/linux64/lib/sdevice/sd_hb_pGC.so.linux64
Loading shared object file /user/tools/synopsys/sentaurus/T-2022.03/bin/../tcad/current/linux64/lib/sdevice/sd_hb_isource2.so.linux64
Loading shared object file /user/tools/synopsys/sentaurus/T-2022.03/bin/../tcad/current/linux64/lib/sdevice/sd_hb_isource.so.linux64
Loading shared object file /user/tools/synopsys/sentaurus/T-2022.03/bin/../tcad/current/linux64/lib/sdevice/sd_hb_sRL.so.linux64
Loading shared object file /user/tools/synopsys/sentaurus/T-2022.03/bin/../tcad/current/linux64/lib/sdevice/sd_hb_vsource2.so.linux64
Loading shared object file /user/tools/synopsys/sentaurus/T-2022.03/bin/../tcad/current/linux64/lib/sdevice/sd_SRL1.so.linux64

Input source: pp21_des.cmd

===============================

Output file: n21_des.log


GlobalParameter {
}
no ACExtract file

PMIPath file: /user/tools/synopsys/sentaurus/T-2022.03/bin/../tcad/current/linux64/lib/sdevice-33.0.7486838 /user/tools/synopsys/sentaurus/T-2022.03/bin/../tcad/current/linux64/lib/sdevice

CMIPath file: /user/tools/synopsys/sentaurus/T-2022.03/bin/../tcad/current/linux64/lib/sdevice /user/tools/synopsys/sentaurus/T-2022.03/bin/../tcad/current/linux64/lib/scm

SPICEPath file: /user/tools/synopsys/sentaurus/T-2022.03/bin/../tcad/current/lib/sdevice-33.0.7486838/spice

no DevicePath file

no CIRCUITSAVENAME file

no CIRCUITLOADNAME file

Numerical parameters:
  Absolute error : 
    Poisson : 1.0000e-03
    eqPoisson : 1.0000e-03
    Electron : 1.0000e-05
    Hole : 1.0000e-05
    Photon-Rate-Equation : 1.0000e-07
    Photon-Phase-Equation : 1.0000e-05
    Rate-Stabilize-Equation : 1.0000e-07
    QW-Scattering-Equations : 1.0000e-05
    QW-eScattering-Equation : 1.0000e-05
    QW-hScattering-Equation : 1.0000e-05
    Optical Problem : 1.0000e-03
    Wavelength : 1.0000e-03
    Bandstructure : 1.0000e-03
    EmissionTable : 1.0000e-03
    DephasingRates : 1.0000e-03
    Photon Recycling : 1.0000e-03
    Electron-Temperature : 1.0000e-04
    Hole-Temperature : 1.0000e-04
    Lattice-Hole-Electron-Temperature : 1.0000e-03
    Circuit : 1.0000e-03
    TCircuit : 1.0000e-03
    Contact : 1.0000e-03
    TContact : 1.0000e-03
    Continuation : 1.0000e-03
    eLaplace : 1.0000e-03
    hLaplace : 1.0000e-03
    tLaplace : 1.0000e-03
    electron quasi-fermi-potential : 1.0000e-03
    hole quasi-fermi-potential : 1.0000e-03
    MonteCarlo : 1.0000e-03
    MCPoissonPDE : 1.0000e-03
    eQuantumPotential : 1.0000e-03
    hQuantumPotential : 1.0000e-03
    quasi-fermi-potential : 1.0000e-03
    ConductiveInsulator : 1.0000e-03
    ContactAndConductiveInsulator : 1.0000e-03
    SingletExciton : 1.0000e-05
    FEPolarization : 1.0000e-05
    FEPolarizationX : 1.0000e-05
    FEPolarizationY : 1.0000e-05
    FEPolarizationZ : 1.0000e-05
    FEPolDivFree : 1.0000e-03
    eHopping : 1.0000e-03
    hHopping : 1.0000e-03
    HydrogenAtom : 1.0000e-03
    HydrogenMolecule : 1.0000e-03
    HydrogenIon : 1.0000e-03
    HydrogenSpeciesA : 1.0000e-03
    HydrogenSpeciesB : 1.0000e-03
    HydrogenSpeciesC : 1.0000e-03
    HydrogenSiliconBondOccupation : 1.0000e-03
    TrapPDE : 1.0000e-03
    eSHEDistribution : 1.0000e-03
    hSHEDistribution : 1.0000e-03
    Landau-Lifshitz-Gilbert[theta] : 1.0000e-03
    Landau-Lifshitz-Gilbert[phi] : 1.0000e-03
    Landau-Lifshitz-Gilbert[x] : 1.0000e-03
    Landau-Lifshitz-Gilbert[y] : 1.0000e-03
    Landau-Lifshitz-Gilbert[z] : 1.0000e-03
    Mechanics : 1.0000e-03
    ExternalTransportSolver : 1.0000e-03
    ReactionDiffusionPDE : 1.0000e-03
  RelErrControl (Reference error): 
    Poisson : 0.025852
    eqPoisson : 1
    Electron : 1.0000e+10
    Hole : 1.0000e+10
    Photon-Rate-Equation : 1.0000e-07
    Photon-Phase-Equation : 1
    Rate-Stabilize-Equation : 1.0000e-07
    QW-Scattering-Equations : 1.0000e+10
    QW-eScattering-Equation : 1.0000e+10
    QW-hScattering-Equation : 1.0000e+10
    Optical Problem : 1
    Wavelength : 1
    Bandstructure : 1
    EmissionTable : 1
    DephasingRates : 1
    Photon Recycling : 1
    Electron-Temperature : 3.0000e+02
    Hole-Temperature : 3.0000e+02
    Lattice-Hole-Electron-Temperature : 3.0000e+02
    Circuit : 1
    TCircuit : 1
    Contact : 0.025852
    TContact : 1
    Continuation : 1
    eLaplace : 1
    hLaplace : 1
    tLaplace : 1
    electron quasi-fermi-potential : 0.025852
    hole quasi-fermi-potential : 0.025852
    MonteCarlo : 1
    MCPoissonPDE : 1
    eQuantumPotential : 0.025852
    hQuantumPotential : 0.025852
    quasi-fermi-potential : 0.025852
    ConductiveInsulator : 1
    ContactAndConductiveInsulator : 1
    SingletExciton : 1.0000e+10
    FEPolarization : 0.025852
    FEPolarizationX : 0.025852
    FEPolarizationY : 0.025852
    FEPolarizationZ : 0.025852
    FEPolDivFree : 1
    eHopping : 0.025852
    hHopping : 0.025852
    HydrogenAtom : 1.0000e+10
    HydrogenMolecule : 1.0000e+10
    HydrogenIon : 1.0000e+10
    HydrogenSpeciesA : 1.0000e+10
    HydrogenSpeciesB : 1.0000e+10
    HydrogenSpeciesC : 1.0000e+10
    HydrogenSiliconBondOccupation : 1
    TrapPDE : 1.0000e-05
    eSHEDistribution : 0.025852
    hSHEDistribution : 0.025852
    Landau-Lifshitz-Gilbert[theta] : 1
    Landau-Lifshitz-Gilbert[phi] : 1
    Landau-Lifshitz-Gilbert[x] : 1
    Landau-Lifshitz-Gilbert[y] : 1
    Landau-Lifshitz-Gilbert[z] : 1
    Mechanics : 1
    ExternalTransportSolver : 1
    ReactionDiffusionPDE : 1
  Relative error : 5 digits
  Without checked transient error
  Max. #iterations : 20
  LineSearchDamping=1
  #undamped iterations : 1000
  No incomplete Newton
  transient method : TR-BDF
  Linear solver : blocked decomposition
  Linear solver for AC analysis : blocked decomposition
  Linear solver for SHEDistribution Model : Super
  use linear extrapolation in transient/quasistationary computations
  use complex supernodal in ac-analysis (if possible)
  do not use smoothed PDE's in transient/quasistationary computations
  use automatic coupling of contact/circuit stuff
  Spice temperature: 3.0015e+02
  Spice nominal temperature of parameter measurements: 3.0015e+02
  Spice minimum conductance gmin: 1.0000e-12
  Terminate simulation immediately if a solve command fails.
  Use 64 bit (double) normal precision floating point arithmetic.
  Mininum |rhs| : 1.0000e-05
  Maximum |rhs| (transient): 1.0000e+15
  Maximum |rhs| (non-transient): 1.0000e+100
  Maximum |rhs| factor : 1.0000e+10
  Maximum |rhs| factor1 : 1.0000e+10
  Lattice Temperature Range : (50,5.0000e+03)
  Carrier Temperature Range : (10,8.0000e+04)
  Simplified first order SHE of BTE will be solved
  SHERefinementCutoff : 20
  No user dependencies.
  Number of assembly threads: 1 (command line max_threads)
  Number of solver threads: 1 (command line max_threads)
  Thread stacksize: 1000000 bytes (default)
  Go serial if not enough parallel licenses are available.
  Model: Math  Switched on

Default device parameters:
  Electrodes:
    "source" : 0.0000e+00 V (Ohmic), area factor : 1
    "drain" : 0.0000e+00 V (Ohmic), area factor : 1
    "substrate" : 0.0000e+00 V (Ohmic), area factor : 1
    "gateS" : 0.0000e+00 V (Ohmic, WorkFunction = 4.8 eV), area factor : 1
    "gateD" : 0.0000e+00 V (Ohmic, WorkFunction = 4.8 eV), area factor : 1
  RayTrace Boundaries:
  Files:
    no Boundary file
    Grid file: n1_fps.tdr
    no Doping file
    no MobilityDoping file
    MIMCurrent file: pp21_des_mimcur_des.plt
    no MIMDefects file
    no InitialDefects file
    no CyclicNorm file
    no MIMBand file
    MIMSensitivity file: pp21_des_mimsa_des.tdr
    no Load file
    no Save file
    Plot file: n21_des.tdr
    no DevFieldsName file
    AutoNewtonPlot file: n21_des_%ld_des.tdr
    no Path file
    no Lifetime file
    no Temperature file
    Current file: n21_des.plt
    no PMIUserFields file
    no Extraction file
    ModelParameters file: pp21_des.par
    ParameterPath directories: 
    no Piezo file
    no mcDOS file
    no ModeGain file
    no Optical emission table for stimulated emission file
    no Optical emission table for spontaneous emission file
    no Optical emission table for photon phase change coefficient file
    no EmissionTable file
    no DephasingRates file
    no OpticalFarField file
    no OpticalIntensityPattern file
    no SaveOpticalIntensityPattern file
    no IlluminationSpectrum file
    no SpectralPlot file
    no OpticalSolverInput file
    no OpticalGenerationInput file
    no OpticalGenerationOutuput file
    no OptGenTransientScaling file
    no MonteCarloInput file
    no MonteCarloOutput file
    no ACPlot file
-----------------------------------------------
  Numerical parameters:
    With avalanche derivatives
    Using New Plot Names
    Using old wavelength search algorithm
    Do not reinitialize quasi Fermi potentials in quasi-stationary simulations
    Ignore ionization integral constraints
    Without diagonal preconditioning
    With Scharfetter-Gummel Discretization
    Relative error : 5 digits
    Delta for numerical tunnelling derivatives : 1.0000e-03
    Do not compute breakdown paths and ionization integrals
    QuasiFermiPotential is used for Contact Equation
    With usage of best vertex in element (maximum element-vertex volume angle) for impact ionization models
-----------------------------------------------
-----------------------------------------------
  Physical models:
    Without incomplete ionization
    Use Si parameters
    TATNonlocalPathNC = 0.0000e+00
    Without SRH-Recombination
    Without CDL-Recombination
    With optical generation computation 
    With electron non local Barrier Tunneling
    With hole non local Barrier Tunneling
    Without Band-to-Band-Tunneling
    Without Auger-Recombination
    Without Radiative Recombination
    Without Surface-Recombination
    Without Trap-Assisted-Auger-Recombination
    PMI recombination models: none
    Without thermal resistance interfaces
    Without distributed resistance interfaces for electrons
    Without distributed resistance interfaces for holes
    Without Piezo
    Without Anisotropic Material Properties
    Without Avalanche-Generation 
    Without Alpha Particle
    Without Heavy Ion
    Without polarization
    Volume charge density: 0.0000e+00 cm^-3
    Device Temperature = 3.0000e+02 K
    Electron Quasi Fermi Potential: 0.0000e+00 V
    Hole Quasi Fermi Potential: 0.0000e+00 V
    Without MagneticField
    With SingletExciton Barrier Type
    Intrinsic density models:
      default bandgap model
      Bandgap narrowing model: OldSlotboom with bandgap narrowing (no Fermi)
    default affinity model
    default effective mass model
    Electron mobility:
      no Doping dependence (using constant mobility)
      no Carrier-Carrier scattering
      no bulk trap Coulomb scattering 
      no E_normal dependence
      Without ThinLayer mobility model
      no high-field saturation
      Einstein relation for diffusivity-mobility ratio
      no band tail high-field mobility
    Hole mobility:
      no Doping dependence (using constant mobility)
      no Carrier-Carrier scattering
      no bulk trap Coulomb scattering 
      no E_normal dependence
      Without ThinLayer mobility model
      no high-field saturation
      Einstein relation for diffusivity-mobility ratio
      no band tail high-field mobility
    Energy relaxation time model: according to formula in parameter file
    Schottky resistance model: default bult-in model
    Lattice thermal conductivity model: according to formula in parameter file
    Metal Resistivity model: according to formula in parameter file
    Thermo Electric Power model: extraploted Si data
    Metal Thermo Electric Power model: MetalThermoElectricPower model not defined
    Lattice heat capacity model: temperature dependent
    no piezoelectric polarization model
    Without default parameters from file (use built-in default parameters)
-----------------------------------------------
- - - - - - - - - - - - - - - - - - - - - - - - 
  The following Physical models were changed
              for Material = 'Silicon'
    With SRH-Recombination
      Without field dependent lifetimes
      With doping dependent lifetimes
      Without temperature dependent lifetimes
    Without thermal resistance interfaces
    Without distributed resistance interfaces for electrons
    Without distributed resistance interfaces for holes
    Electron mobility:
      Philips unified mobility
      E_normal dependence:
        Lombardi
      High-field mobility: Caughey-Thomas saturation model, using gradient quasi-Fermi potential
    Hole mobility:
      Philips unified mobility
      E_normal dependence:
        Lombardi
      High-field mobility: Caughey-Thomas saturation model, using gradient quasi-Fermi potential
- - - - - - - - - - - - - - - - - - - - - - - -
  Process information for extraction purposes:
    none
  Plot variables:
    eNLLTunnelingGeneration
    ! WARNING eNLLTunnelingGeneration is an alias for eBarrierTunneling and will not be supported in Plot section in future releases
    hNLLTunnelingGeneration
    ! WARNING hNLLTunnelingGeneration is an alias for hBarrierTunneling and will not be supported in Plot section in future releases
    ElectrostaticPotential
    ConductionBandEnergy
    ValenceBandEnergy
    ElectricField/Vector
    eDensity
    hDensity
    eCurrentDensity/Vector
    hCurrentDensity/Vector
    DopingConcentration
    DonorConcentration
    AcceptorConcentration

------------------------------------------------
  NoisePlot variables:
    none
  Plot groups:
    none

------------------------------------------------
  CurrentPlot variables:
    none
Devices:
Systems:
Solve :
 Poisson
Coupled ( Digits : 5, Max. #iterations : 20, 
    Solver : blocked decomposition,
    #undamped iterations : 1000 
    )
    { Poisson Electron Hole } 
Quasistationary ( Digits : 5, Max. #iterations : 20, 
      Initial step in t : 0.1, 
      Minimum step in t : 1.0000e-05, Maximum step in t : 1, 
      Increment : 1.5, Decrement : 2, 
      Goal values :
        Contact drain : 0.08V
    )
  {
    Coupled ( Digits : 5, Max. #iterations : 20, 
        Solver : blocked decomposition,
        #undamped iterations : 1000 
        )
        { Poisson Electron Hole } 
  }
Quasistationary ( Digits : 5, Max. #iterations : 20, 
      Initial step in t : 0.01, 
      Minimum step in t : 1.0000e-05, Maximum step in t : 0.05, 
      Increment : 1.5, Decrement : 2, 
      DoZero      Goal values :
        Contact gateD : 2.5V,
        Contact gateS : 2.5V
    )
  {
    Coupled ( Digits : 5, Max. #iterations : 20, 
        Solver : blocked decomposition,
        #undamped iterations : 1000 
        )
        { Poisson Electron Hole } 
    Plot( FilePrefix = "n21_Profile_LowVd" nooverwrite -loadable
         Time (fixed times:
             0.0000e+00 0.2 0.3 0.4 0.5
             1) )
      { }
  }
Quasistationary ( Digits : 5, Max. #iterations : 20, 
      Initial step in t : 0.05, 
      Minimum step in t : 1.0000e-05, Maximum step in t : 0.1, 
      Increment : 1.5, Decrement : 2, 
      Goal values :
        Contact gateD : 0.0000e+00V,
        Contact gateS : 0.0000e+00V
    )
  {
    Coupled ( Digits : 5, Max. #iterations : 20, 
        Solver : blocked decomposition,
        #undamped iterations : 1000 
        )
        { Poisson Electron Hole } 
  }
Quasistationary ( Digits : 5, Max. #iterations : 20, 
      Initial step in t : 0.1, 
      Minimum step in t : 1.0000e-05, Maximum step in t : 1, 
      Increment : 1.5, Decrement : 2, 
      Goal values :
        Contact drain : 0.7V
    )
  {
    Coupled ( Digits : 5, Max. #iterations : 20, 
        Solver : blocked decomposition,
        #undamped iterations : 1000 
        )
        { Poisson Electron Hole } 
  }
Quasistationary ( Digits : 5, Max. #iterations : 20, 
      Initial step in t : 0.01, 
      Minimum step in t : 1.0000e-05, Maximum step in t : 0.05, 
      Increment : 1.5, Decrement : 2, 
      DoZero      Goal values :
        Contact gateD : 2.5V,
        Contact gateS : 2.5V
    )
  {
    Coupled ( Digits : 5, Max. #iterations : 20, 
        Solver : blocked decomposition,
        #undamped iterations : 1000 
        )
        { Poisson Electron Hole } 
    Plot( FilePrefix = "n21_Profile_HighVd" nooverwrite -loadable
         Time (fixed times:
             0.0000e+00 0.2 0.3 0.4 0.5
             1) )
      { }
  }

===============================

Reading grid 'n1_fps.tdr' ... 
  coordinate system: UCS, 3d_sprocess (x is device down direction)
  use coordinate system as is (no transformation)
  TDR format
  Number of grid points is 4303.
done.

Adding interfaces and contacts .... done.

Computing edges ...
  Number of edges: 18939
done.
Computing boxes ...

  CVPL_AverageBoxMethod = TRUE 
   
  Boxmethod Parallel Computing: nbThreads = 1 

  Computing Delaunay coefficients ...   done.
  Delaunay coefficients time: (wallclock = 0.0000e+00 s, tcpu = 0.0000e+00 s)

  Parallel Computing Voronoi faces, coefficients, and measures ... 
  CVPL_Algorithm = TRUE 

    Computing Obtuse Elements ... 
     Obtuse Elements time:  tcpu = 0.0000e+00 s
      New Parameters time: (wallclock = 0.0000e+00 s, tcpu = 0.0000e+00 s)

Info for all regions (NumberOfRegions = 6):
        ElementWithMinVolume(  7376) Vertex0( 3731)(-7.443749e-02, 1.400807e-02) Volume = 2.785575e-09 um3 (3.07e-08 from TotalVolume)
          ElementWithMinEdge(  7376) Vertex0( 3731)(-7.443749e-02, 1.400807e-02) Length = 1.197818e-05 um
              MaxFlatElement(  7147) Vertex0( 3761)(-7.145255e-02,-1.913866e-02)  Angle = 3.631133e+01 degrees
         ElementWithMinAngle(  1653) Vertex0(  899)( 4.000000e-01,-2.837484e-04)  Angle = 3.440222e-01 degrees
   ElementWithMaxQualityEdge(  1649) Vertex0(  899)( 4.000000e-01, 0.000000e+00)    R/L = 8.327386e+01 
 ElementWithMaxQualityHeight(  1649) Vertex0(  899)( 4.000000e-01, 0.000000e+00)    R/H = 8.327537e+01 

Info for semiconductor regions (NumberOfRegions = 1):
        ElementWithMinVolume(   175) Vertex0(   94)( 0.000000e+00,-2.837484e-04) Volume = 7.181707e-08 um3 (7.91e-07 from TotalVolume)
          ElementWithMinEdge(   175) Vertex0(   94)( 0.000000e+00,-2.837484e-04) Length = 2.837484e-04 um
              MaxFlatElement(   284) Vertex0(  167)( 1.012405e-03, 2.211762e-02)  Angle = 7.163809e+01 degrees
         ElementWithMinAngle(  1653) Vertex0(  899)( 4.000000e-01,-2.837484e-04)  Angle = 3.440222e-01 degrees
   ElementWithMaxQualityEdge(  1649) Vertex0(  899)( 4.000000e-01, 0.000000e+00)    R/L = 8.327386e+01 
 ElementWithMaxQualityHeight(  1649) Vertex0(  899)( 4.000000e-01, 0.000000e+00)    R/H = 8.327537e+01 

   NumberOfEdges              =  18939 
   NumberOfGeometricalEdges   =  12546 
   NumberOfDoubleEdges        =      0 
   MaxNumberOfEdgesPerVertex  =     10; vertex(3846) = (-6.861708e-02, -1.913866e-02) [um]
   MaxNumberOfElementsPerEdge =      2; edge(1) = (1, 994) 
                                        vertex(1) = ( 3.527432e-01, -1.120000e-01) [um]
                                        vertex(994) = ( 3.527432e-01, -8.883628e-02) [um]

                        NumberOfVertices =   4482 
                        NumberOfElements =   8244 
                       NumberOfTriangles =   8244  (100.00 %)
                      NumberOfRectangles =      0  ( 0.00 %)
                  NumberOfObtuseElements =     42  ( 0.51 %)
             NumberOfNonDelaunayElements =      0  ( 0.00 %)

  VertexWithMaxMeasure(  341)( 3.527432e-01, 8.883628e-02)
  MaxVertMeasure(8.576643e-04)/VertVolume(4.801700e-04) = 1.79e+00


/-------- Region non-Delaunay elements ---------------------------------------------------------------------
 Region          Volume      BoxMethodVolume  DeltaVolume  Elements  non-Delaunay      non-DelaunayVolume 
  name            [um2]          [um2]           [%]                   Elements              [um2]   [%]   
 -----------------------------------------------------------------------------------------------------------
 Silicon_1    8.9600000e-02  8.9600000e-02     5.6e-13      7124       0 ( 0.00 %)   0.0000000e+00 ( 0.0000) 
 Nitride_1.1  5.0413045e-04  5.0413045e-04     6.0e-14       204       0 ( 0.00 %)   0.0000000e+00 ( 0.0000) 
 Nitride_1.2  5.0450501e-04  5.0450501e-04     7.2e-14       236       0 ( 0.00 %)   0.0000000e+00 ( 0.0000) 
 Oxide_1      1.4000007e-05  1.4000007e-05     1.5e-13       214       0 ( 0.00 %)   0.0000000e+00 ( 0.0000) 
 HfO2_1       1.5792007e-04  1.5792007e-04     3.8e-14       434       0 ( 0.00 %)   0.0000000e+00 ( 0.0000) 
 Nitride_1.3  4.6472809e-05  4.6472809e-05     3.3e-14        32       0 ( 0.00 %)   0.0000000e+00 ( 0.0000) 
 ...........................................................................................................
 Total        9.0827028e-02  9.0827028e-02     1.0e-12      8244       0 ( 0.00 %)   0.0000000e+00 ( 0.0000) 
\-----------------------------------------------------------------------------------------------------------
    done.
  done.
  (times: wallclock = 0.01 s, tcpu = 0.01 s)
done.
Reading doping 'n1_fps.tdr' (TDR format) ...
done.
done.
Reading parameter file 'pp21_des.par' ...
---------------------------------------------------
 Reading parameters for default parameter set
---------------------------------------------------

	Differences compared with default parameters:
	BarrierTunneling_NLM_gateS: mt_e = 1, instead of: 0.0000e+00 [1]
	BarrierTunneling_NLM_gateS: mt_h = 1, instead of: 0.0000e+00 [1]
	BarrierTunneling_NLM_gateS: g_e = 1, instead of: 2.1 [1]
	BarrierTunneling_NLM_gateS: g_h = 1, instead of: 0.66 [1]
	BarrierTunneling_NLM_gateD: mt_e = 1, instead of: 0.0000e+00 [1]
	BarrierTunneling_NLM_gateD: mt_h = 1, instead of: 0.0000e+00 [1]
	BarrierTunneling_NLM_gateD: g_e = 1, instead of: 2.1 [1]
	BarrierTunneling_NLM_gateD: g_h = 1, instead of: 0.66 [1]

---------------------------------------------------
 Reading parameters for material "HfO2"
---------------------------------------------------
	BarrierTunneling_NLM_gateS: mt_e = 0.11, instead of: 1 [1]
	BarrierTunneling_NLM_gateD: mt_e = 0.11, instead of: 1 [1]

---------------------------------------------------
 Reading parameters for material "Oxide"
---------------------------------------------------
	BarrierTunneling_NLM_gateS: mt_e = 0.42, instead of: 1 [1]
	BarrierTunneling_NLM_gateD: mt_e = 0.42, instead of: 1 [1]

---------------------------------------------------
 Reading parameters for material "Silicon"
---------------------------------------------------


=======
Region: "HfO2_1"
  (material is "HfO2")
=======
  Model: "BarrierTunneling_NLM_gateD"
    Parameter "alphae" is new with value equal to 0
    Parameter "alphah" is new with value equal to 0
    Parameter "eA" is new with value equal to 1
    Parameter "eBL_max" is new with value equal to 0.3
    Parameter "eQuantumPotentialFactor" is new with value equal to 0
    Parameter "eQuantumPotentialPosFac" is new with value equal to 0
    Parameter "g_e" is new with value equal to 1
    Parameter "g_h" is new with value equal to 1
    Parameter "hA" is new with value equal to 1
    Parameter "hBL_max" is new with value equal to 0.3
    Parameter "hQuantumPotentialFactor" is new with value equal to 0
    Parameter "hQuantumPotentialPosFac" is new with value equal to 0
    Parameter "mt_e" is new with value equal to 0.11
    Parameter "mt_h" is new with value equal to 1
  Model: "BarrierTunneling_NLM_gateS"
    Parameter "alphae" is new with value equal to 0
    Parameter "alphah" is new with value equal to 0
    Parameter "eA" is new with value equal to 1
    Parameter "eBL_max" is new with value equal to 0.3
    Parameter "eQuantumPotentialFactor" is new with value equal to 0
    Parameter "eQuantumPotentialPosFac" is new with value equal to 0
    Parameter "g_e" is new with value equal to 1
    Parameter "g_h" is new with value equal to 1
    Parameter "hA" is new with value equal to 1
    Parameter "hBL_max" is new with value equal to 0.3
    Parameter "hQuantumPotentialFactor" is new with value equal to 0
    Parameter "hQuantumPotentialPosFac" is new with value equal to 0
    Parameter "mt_e" is new with value equal to 0.11
    Parameter "mt_h" is new with value equal to 1
  Using default lattice crystal coordinate system:
    effective LatticeParameters:
      X = (1, 0.0000e+00, 0.0000e+00)
      Y = (0.0000e+00, 1, 0.0000e+00)
      Z = (0.0000e+00, 0.0000e+00, 1)

=======
Region: "Nitride_1.1"
  (material is "Nitride")
=======
  Model: "BarrierTunneling_NLM_gateD"
    Parameter "alphae" is new with value equal to 0
    Parameter "alphah" is new with value equal to 0
    Parameter "eA" is new with value equal to 1
    Parameter "eBL_max" is new with value equal to 0.3
    Parameter "eQuantumPotentialFactor" is new with value equal to 0
    Parameter "eQuantumPotentialPosFac" is new with value equal to 0
    Parameter "g_e" is new with value equal to 1
    Parameter "g_h" is new with value equal to 1
    Parameter "hA" is new with value equal to 1
    Parameter "hBL_max" is new with value equal to 0.3
    Parameter "hQuantumPotentialFactor" is new with value equal to 0
    Parameter "hQuantumPotentialPosFac" is new with value equal to 0
    Parameter "mt_e" is new with value equal to 1
    Parameter "mt_h" is new with value equal to 1
  Model: "BarrierTunneling_NLM_gateS"
    Parameter "alphae" is new with value equal to 0
    Parameter "alphah" is new with value equal to 0
    Parameter "eA" is new with value equal to 1
    Parameter "eBL_max" is new with value equal to 0.3
    Parameter "eQuantumPotentialFactor" is new with value equal to 0
    Parameter "eQuantumPotentialPosFac" is new with value equal to 0
    Parameter "g_e" is new with value equal to 1
    Parameter "g_h" is new with value equal to 1
    Parameter "hA" is new with value equal to 1
    Parameter "hBL_max" is new with value equal to 0.3
    Parameter "hQuantumPotentialFactor" is new with value equal to 0
    Parameter "hQuantumPotentialPosFac" is new with value equal to 0
    Parameter "mt_e" is new with value equal to 1
    Parameter "mt_h" is new with value equal to 1
  Using default lattice crystal coordinate system:
    effective LatticeParameters:
      X = (1, 0.0000e+00, 0.0000e+00)
      Y = (0.0000e+00, 1, 0.0000e+00)
      Z = (0.0000e+00, 0.0000e+00, 1)

=======
Region: "Nitride_1.2"
  (material is "Nitride")
=======
  Model: "BarrierTunneling_NLM_gateD"
    Parameter "alphae" is new with value equal to 0
    Parameter "alphah" is new with value equal to 0
    Parameter "eA" is new with value equal to 1
    Parameter "eBL_max" is new with value equal to 0.3
    Parameter "eQuantumPotentialFactor" is new with value equal to 0
    Parameter "eQuantumPotentialPosFac" is new with value equal to 0
    Parameter "g_e" is new with value equal to 1
    Parameter "g_h" is new with value equal to 1
    Parameter "hA" is new with value equal to 1
    Parameter "hBL_max" is new with value equal to 0.3
    Parameter "hQuantumPotentialFactor" is new with value equal to 0
    Parameter "hQuantumPotentialPosFac" is new with value equal to 0
    Parameter "mt_e" is new with value equal to 1
    Parameter "mt_h" is new with value equal to 1
  Model: "BarrierTunneling_NLM_gateS"
    Parameter "alphae" is new with value equal to 0
    Parameter "alphah" is new with value equal to 0
    Parameter "eA" is new with value equal to 1
    Parameter "eBL_max" is new with value equal to 0.3
    Parameter "eQuantumPotentialFactor" is new with value equal to 0
    Parameter "eQuantumPotentialPosFac" is new with value equal to 0
    Parameter "g_e" is new with value equal to 1
    Parameter "g_h" is new with value equal to 1
    Parameter "hA" is new with value equal to 1
    Parameter "hBL_max" is new with value equal to 0.3
    Parameter "hQuantumPotentialFactor" is new with value equal to 0
    Parameter "hQuantumPotentialPosFac" is new with value equal to 0
    Parameter "mt_e" is new with value equal to 1
    Parameter "mt_h" is new with value equal to 1
  Using default lattice crystal coordinate system:
    effective LatticeParameters:
      X = (1, 0.0000e+00, 0.0000e+00)
      Y = (0.0000e+00, 1, 0.0000e+00)
      Z = (0.0000e+00, 0.0000e+00, 1)

=======
Region: "Nitride_1.3"
  (material is "Nitride")
=======
  Model: "BarrierTunneling_NLM_gateD"
    Parameter "alphae" is new with value equal to 0
    Parameter "alphah" is new with value equal to 0
    Parameter "eA" is new with value equal to 1
    Parameter "eBL_max" is new with value equal to 0.3
    Parameter "eQuantumPotentialFactor" is new with value equal to 0
    Parameter "eQuantumPotentialPosFac" is new with value equal to 0
    Parameter "g_e" is new with value equal to 1
    Parameter "g_h" is new with value equal to 1
    Parameter "hA" is new with value equal to 1
    Parameter "hBL_max" is new with value equal to 0.3
    Parameter "hQuantumPotentialFactor" is new with value equal to 0
    Parameter "hQuantumPotentialPosFac" is new with value equal to 0
    Parameter "mt_e" is new with value equal to 1
    Parameter "mt_h" is new with value equal to 1
  Model: "BarrierTunneling_NLM_gateS"
    Parameter "alphae" is new with value equal to 0
    Parameter "alphah" is new with value equal to 0
    Parameter "eA" is new with value equal to 1
    Parameter "eBL_max" is new with value equal to 0.3
    Parameter "eQuantumPotentialFactor" is new with value equal to 0
    Parameter "eQuantumPotentialPosFac" is new with value equal to 0
    Parameter "g_e" is new with value equal to 1
    Parameter "g_h" is new with value equal to 1
    Parameter "hA" is new with value equal to 1
    Parameter "hBL_max" is new with value equal to 0.3
    Parameter "hQuantumPotentialFactor" is new with value equal to 0
    Parameter "hQuantumPotentialPosFac" is new with value equal to 0
    Parameter "mt_e" is new with value equal to 1
    Parameter "mt_h" is new with value equal to 1
  Using default lattice crystal coordinate system:
    effective LatticeParameters:
      X = (1, 0.0000e+00, 0.0000e+00)
      Y = (0.0000e+00, 1, 0.0000e+00)
      Z = (0.0000e+00, 0.0000e+00, 1)

=======
Region: "Oxide_1"
  (material is "Oxide")
=======
  Model: "BarrierTunneling_NLM_gateD"
    Parameter "alphae" is new with value equal to 0
    Parameter "alphah" is new with value equal to 0
    Parameter "eA" is new with value equal to 1
    Parameter "eBL_max" is new with value equal to 0.3
    Parameter "eQuantumPotentialFactor" is new with value equal to 0
    Parameter "eQuantumPotentialPosFac" is new with value equal to 0
    Parameter "g_e" is new with value equal to 1
    Parameter "g_h" is new with value equal to 1
    Parameter "hA" is new with value equal to 1
    Parameter "hBL_max" is new with value equal to 0.3
    Parameter "hQuantumPotentialFactor" is new with value equal to 0
    Parameter "hQuantumPotentialPosFac" is new with value equal to 0
    Parameter "mt_e" is new with value equal to 0.42
    Parameter "mt_h" is new with value equal to 1
  Model: "BarrierTunneling_NLM_gateS"
    Parameter "alphae" is new with value equal to 0
    Parameter "alphah" is new with value equal to 0
    Parameter "eA" is new with value equal to 1
    Parameter "eBL_max" is new with value equal to 0.3
    Parameter "eQuantumPotentialFactor" is new with value equal to 0
    Parameter "eQuantumPotentialPosFac" is new with value equal to 0
    Parameter "g_e" is new with value equal to 1
    Parameter "g_h" is new with value equal to 1
    Parameter "hA" is new with value equal to 1
    Parameter "hBL_max" is new with value equal to 0.3
    Parameter "hQuantumPotentialFactor" is new with value equal to 0
    Parameter "hQuantumPotentialPosFac" is new with value equal to 0
    Parameter "mt_e" is new with value equal to 0.42
    Parameter "mt_h" is new with value equal to 1
  Using default lattice crystal coordinate system:
    effective LatticeParameters:
      X = (1, 0.0000e+00, 0.0000e+00)
      Y = (0.0000e+00, 1, 0.0000e+00)
      Z = (0.0000e+00, 0.0000e+00, 1)

=======
Region: "Silicon_1"
  (material is "Silicon")
=======
  Model: "BarrierTunneling_NLM_gateD"
    Parameter "alphae" is new with value equal to 0
    Parameter "alphah" is new with value equal to 0
    Parameter "eA" is new with value equal to 1
    Parameter "eBL_max" is new with value equal to 0.3
    Parameter "eQuantumPotentialFactor" is new with value equal to 0
    Parameter "eQuantumPotentialPosFac" is new with value equal to 0
    Parameter "g_e" is new with value equal to 1
    Parameter "g_h" is new with value equal to 1
    Parameter "hA" is new with value equal to 1
    Parameter "hBL_max" is new with value equal to 0.3
    Parameter "hQuantumPotentialFactor" is new with value equal to 0
    Parameter "hQuantumPotentialPosFac" is new with value equal to 0
    Parameter "mt_e" is new with value equal to 1
    Parameter "mt_h" is new with value equal to 1
  Model: "BarrierTunneling_NLM_gateS"
    Parameter "alphae" is new with value equal to 0
    Parameter "alphah" is new with value equal to 0
    Parameter "eA" is new with value equal to 1
    Parameter "eBL_max" is new with value equal to 0.3
    Parameter "eQuantumPotentialFactor" is new with value equal to 0
    Parameter "eQuantumPotentialPosFac" is new with value equal to 0
    Parameter "g_e" is new with value equal to 1
    Parameter "g_h" is new with value equal to 1
    Parameter "hA" is new with value equal to 1
    Parameter "hBL_max" is new with value equal to 0.3
    Parameter "hQuantumPotentialFactor" is new with value equal to 0
    Parameter "hQuantumPotentialPosFac" is new with value equal to 0
    Parameter "mt_e" is new with value equal to 1
    Parameter "mt_h" is new with value equal to 1
  Using lattice crystal coordinate system from TDR file:
    slice.angle                   : 1.8000e+02 [deg]
    wafer.orient, vertical.orient : (0, 0, 1)
    flat.orient, horizontal.orient: [1, 1, 0]
    miscut.tilt                   : 0.0000e+00 [deg]
    miscut.toward                 : [1, 1, 0]
    lattice.system                : cubic
    polytype                      : Zincblende
    lattice.const                 : 5.4310e-08 [cm]
    lattice.const.b               : 5.4310e-08 [cm]
    lattice.const.c               : 5.4310e-08 [cm]
    unit cell angles: alpha = 90, beta = 90, gamma = 90 [deg]
    effective LatticeParameters:
      X = (0.0000e+00, 0.0000e+00, -1.0000e+00)
      Y = (0.707107, 0.707107, 0.0000e+00)
      Z = (0.707107, -7.0711e-01, 0.0000e+00)

================
RegionInterface: "Nitride_1.1/HfO2_1"
  (material interface is "Nitride/HfO2")
================
  Model: "BarrierTunneling_NLM_gateD"
    Parameter "alphae" is new with value equal to 0
    Parameter "alphah" is new with value equal to 0
    Parameter "eA" is new with value equal to 1
    Parameter "eBL_max" is new with value equal to 0.3
    Parameter "eQuantumPotentialFactor" is new with value equal to 0
    Parameter "eQuantumPotentialPosFac" is new with value equal to 0
    Parameter "g_e" is new with value equal to 1
    Parameter "g_h" is new with value equal to 1
    Parameter "hA" is new with value equal to 1
    Parameter "hBL_max" is new with value equal to 0.3
    Parameter "hQuantumPotentialFactor" is new with value equal to 0
    Parameter "hQuantumPotentialPosFac" is new with value equal to 0
    Parameter "mt_e" is new with value equal to 1
    Parameter "mt_h" is new with value equal to 1
  Model: "BarrierTunneling_NLM_gateS"
    Parameter "alphae" is new with value equal to 0
    Parameter "alphah" is new with value equal to 0
    Parameter "eA" is new with value equal to 1
    Parameter "eBL_max" is new with value equal to 0.3
    Parameter "eQuantumPotentialFactor" is new with value equal to 0
    Parameter "eQuantumPotentialPosFac" is new with value equal to 0
    Parameter "g_e" is new with value equal to 1
    Parameter "g_h" is new with value equal to 1
    Parameter "hA" is new with value equal to 1
    Parameter "hBL_max" is new with value equal to 0.3
    Parameter "hQuantumPotentialFactor" is new with value equal to 0
    Parameter "hQuantumPotentialPosFac" is new with value equal to 0
    Parameter "mt_e" is new with value equal to 1
    Parameter "mt_h" is new with value equal to 1

================
RegionInterface: "Nitride_1.2/HfO2_1"
  (material interface is "Nitride/HfO2")
================
  Model: "BarrierTunneling_NLM_gateD"
    Parameter "alphae" is new with value equal to 0
    Parameter "alphah" is new with value equal to 0
    Parameter "eA" is new with value equal to 1
    Parameter "eBL_max" is new with value equal to 0.3
    Parameter "eQuantumPotentialFactor" is new with value equal to 0
    Parameter "eQuantumPotentialPosFac" is new with value equal to 0
    Parameter "g_e" is new with value equal to 1
    Parameter "g_h" is new with value equal to 1
    Parameter "hA" is new with value equal to 1
    Parameter "hBL_max" is new with value equal to 0.3
    Parameter "hQuantumPotentialFactor" is new with value equal to 0
    Parameter "hQuantumPotentialPosFac" is new with value equal to 0
    Parameter "mt_e" is new with value equal to 1
    Parameter "mt_h" is new with value equal to 1
  Model: "BarrierTunneling_NLM_gateS"
    Parameter "alphae" is new with value equal to 0
    Parameter "alphah" is new with value equal to 0
    Parameter "eA" is new with value equal to 1
    Parameter "eBL_max" is new with value equal to 0.3
    Parameter "eQuantumPotentialFactor" is new with value equal to 0
    Parameter "eQuantumPotentialPosFac" is new with value equal to 0
    Parameter "g_e" is new with value equal to 1
    Parameter "g_h" is new with value equal to 1
    Parameter "hA" is new with value equal to 1
    Parameter "hBL_max" is new with value equal to 0.3
    Parameter "hQuantumPotentialFactor" is new with value equal to 0
    Parameter "hQuantumPotentialPosFac" is new with value equal to 0
    Parameter "mt_e" is new with value equal to 1
    Parameter "mt_h" is new with value equal to 1

================
RegionInterface: "HfO2_1/Nitride_1.3"
  (material interface is "HfO2/Nitride")
================
  Model: "BarrierTunneling_NLM_gateD"
    Parameter "alphae" is new with value equal to 0
    Parameter "alphah" is new with value equal to 0
    Parameter "eA" is new with value equal to 1
    Parameter "eBL_max" is new with value equal to 0.3
    Parameter "eQuantumPotentialFactor" is new with value equal to 0
    Parameter "eQuantumPotentialPosFac" is new with value equal to 0
    Parameter "g_e" is new with value equal to 1
    Parameter "g_h" is new with value equal to 1
    Parameter "hA" is new with value equal to 1
    Parameter "hBL_max" is new with value equal to 0.3
    Parameter "hQuantumPotentialFactor" is new with value equal to 0
    Parameter "hQuantumPotentialPosFac" is new with value equal to 0
    Parameter "mt_e" is new with value equal to 1
    Parameter "mt_h" is new with value equal to 1
  Model: "BarrierTunneling_NLM_gateS"
    Parameter "alphae" is new with value equal to 0
    Parameter "alphah" is new with value equal to 0
    Parameter "eA" is new with value equal to 1
    Parameter "eBL_max" is new with value equal to 0.3
    Parameter "eQuantumPotentialFactor" is new with value equal to 0
    Parameter "eQuantumPotentialPosFac" is new with value equal to 0
    Parameter "g_e" is new with value equal to 1
    Parameter "g_h" is new with value equal to 1
    Parameter "hA" is new with value equal to 1
    Parameter "hBL_max" is new with value equal to 0.3
    Parameter "hQuantumPotentialFactor" is new with value equal to 0
    Parameter "hQuantumPotentialPosFac" is new with value equal to 0
    Parameter "mt_e" is new with value equal to 1
    Parameter "mt_h" is new with value equal to 1

================
RegionInterface: "Oxide_1/HfO2_1"
  (material interface is "Oxide/HfO2")
================
  Model: "BarrierTunneling_NLM_gateD"
    Parameter "alphae" is new with value equal to 0
    Parameter "alphah" is new with value equal to 0
    Parameter "eA" is new with value equal to 1
    Parameter "eBL_max" is new with value equal to 0.3
    Parameter "eQuantumPotentialFactor" is new with value equal to 0
    Parameter "eQuantumPotentialPosFac" is new with value equal to 0
    Parameter "g_e" is new with value equal to 1
    Parameter "g_h" is new with value equal to 1
    Parameter "hA" is new with value equal to 1
    Parameter "hBL_max" is new with value equal to 0.3
    Parameter "hQuantumPotentialFactor" is new with value equal to 0
    Parameter "hQuantumPotentialPosFac" is new with value equal to 0
    Parameter "mt_e" is new with value equal to 1
    Parameter "mt_h" is new with value equal to 1
  Model: "BarrierTunneling_NLM_gateS"
    Parameter "alphae" is new with value equal to 0
    Parameter "alphah" is new with value equal to 0
    Parameter "eA" is new with value equal to 1
    Parameter "eBL_max" is new with value equal to 0.3
    Parameter "eQuantumPotentialFactor" is new with value equal to 0
    Parameter "eQuantumPotentialPosFac" is new with value equal to 0
    Parameter "g_e" is new with value equal to 1
    Parameter "g_h" is new with value equal to 1
    Parameter "hA" is new with value equal to 1
    Parameter "hBL_max" is new with value equal to 0.3
    Parameter "hQuantumPotentialFactor" is new with value equal to 0
    Parameter "hQuantumPotentialPosFac" is new with value equal to 0
    Parameter "mt_e" is new with value equal to 1
    Parameter "mt_h" is new with value equal to 1

================
RegionInterface: "Nitride_1.1/Oxide_1"
  (material interface is "Nitride/Oxide")
================
  Model: "BarrierTunneling_NLM_gateD"
    Parameter "alphae" is new with value equal to 0
    Parameter "alphah" is new with value equal to 0
    Parameter "eA" is new with value equal to 1
    Parameter "eBL_max" is new with value equal to 0.3
    Parameter "eQuantumPotentialFactor" is new with value equal to 0
    Parameter "eQuantumPotentialPosFac" is new with value equal to 0
    Parameter "g_e" is new with value equal to 1
    Parameter "g_h" is new with value equal to 1
    Parameter "hA" is new with value equal to 1
    Parameter "hBL_max" is new with value equal to 0.3
    Parameter "hQuantumPotentialFactor" is new with value equal to 0
    Parameter "hQuantumPotentialPosFac" is new with value equal to 0
    Parameter "mt_e" is new with value equal to 1
    Parameter "mt_h" is new with value equal to 1
  Model: "BarrierTunneling_NLM_gateS"
    Parameter "alphae" is new with value equal to 0
    Parameter "alphah" is new with value equal to 0
    Parameter "eA" is new with value equal to 1
    Parameter "eBL_max" is new with value equal to 0.3
    Parameter "eQuantumPotentialFactor" is new with value equal to 0
    Parameter "eQuantumPotentialPosFac" is new with value equal to 0
    Parameter "g_e" is new with value equal to 1
    Parameter "g_h" is new with value equal to 1
    Parameter "hA" is new with value equal to 1
    Parameter "hBL_max" is new with value equal to 0.3
    Parameter "hQuantumPotentialFactor" is new with value equal to 0
    Parameter "hQuantumPotentialPosFac" is new with value equal to 0
    Parameter "mt_e" is new with value equal to 1
    Parameter "mt_h" is new with value equal to 1

================
RegionInterface: "Silicon_1/Nitride_1.1"
  (material interface is "Silicon/Nitride")
================
  Model: "BarrierTunneling_NLM_gateD"
    Parameter "alphae" is new with value equal to 0
    Parameter "alphah" is new with value equal to 0
    Parameter "eA" is new with value equal to 1
    Parameter "eBL_max" is new with value equal to 0.3
    Parameter "eQuantumPotentialFactor" is new with value equal to 0
    Parameter "eQuantumPotentialPosFac" is new with value equal to 0
    Parameter "g_e" is new with value equal to 1
    Parameter "g_h" is new with value equal to 1
    Parameter "hA" is new with value equal to 1
    Parameter "hBL_max" is new with value equal to 0.3
    Parameter "hQuantumPotentialFactor" is new with value equal to 0
    Parameter "hQuantumPotentialPosFac" is new with value equal to 0
    Parameter "mt_e" is new with value equal to 1
    Parameter "mt_h" is new with value equal to 1
  Model: "BarrierTunneling_NLM_gateS"
    Parameter "alphae" is new with value equal to 0
    Parameter "alphah" is new with value equal to 0
    Parameter "eA" is new with value equal to 1
    Parameter "eBL_max" is new with value equal to 0.3
    Parameter "eQuantumPotentialFactor" is new with value equal to 0
    Parameter "eQuantumPotentialPosFac" is new with value equal to 0
    Parameter "g_e" is new with value equal to 1
    Parameter "g_h" is new with value equal to 1
    Parameter "hA" is new with value equal to 1
    Parameter "hBL_max" is new with value equal to 0.3
    Parameter "hQuantumPotentialFactor" is new with value equal to 0
    Parameter "hQuantumPotentialPosFac" is new with value equal to 0
    Parameter "mt_e" is new with value equal to 1
    Parameter "mt_h" is new with value equal to 1

================
RegionInterface: "Nitride_1.2/Oxide_1"
  (material interface is "Nitride/Oxide")
================
  Model: "BarrierTunneling_NLM_gateD"
    Parameter "alphae" is new with value equal to 0
    Parameter "alphah" is new with value equal to 0
    Parameter "eA" is new with value equal to 1
    Parameter "eBL_max" is new with value equal to 0.3
    Parameter "eQuantumPotentialFactor" is new with value equal to 0
    Parameter "eQuantumPotentialPosFac" is new with value equal to 0
    Parameter "g_e" is new with value equal to 1
    Parameter "g_h" is new with value equal to 1
    Parameter "hA" is new with value equal to 1
    Parameter "hBL_max" is new with value equal to 0.3
    Parameter "hQuantumPotentialFactor" is new with value equal to 0
    Parameter "hQuantumPotentialPosFac" is new with value equal to 0
    Parameter "mt_e" is new with value equal to 1
    Parameter "mt_h" is new with value equal to 1
  Model: "BarrierTunneling_NLM_gateS"
    Parameter "alphae" is new with value equal to 0
    Parameter "alphah" is new with value equal to 0
    Parameter "eA" is new with value equal to 1
    Parameter "eBL_max" is new with value equal to 0.3
    Parameter "eQuantumPotentialFactor" is new with value equal to 0
    Parameter "eQuantumPotentialPosFac" is new with value equal to 0
    Parameter "g_e" is new with value equal to 1
    Parameter "g_h" is new with value equal to 1
    Parameter "hA" is new with value equal to 1
    Parameter "hBL_max" is new with value equal to 0.3
    Parameter "hQuantumPotentialFactor" is new with value equal to 0
    Parameter "hQuantumPotentialPosFac" is new with value equal to 0
    Parameter "mt_e" is new with value equal to 1
    Parameter "mt_h" is new with value equal to 1

================
RegionInterface: "Silicon_1/Nitride_1.2"
  (material interface is "Silicon/Nitride")
================
  Model: "BarrierTunneling_NLM_gateD"
    Parameter "alphae" is new with value equal to 0
    Parameter "alphah" is new with value equal to 0
    Parameter "eA" is new with value equal to 1
    Parameter "eBL_max" is new with value equal to 0.3
    Parameter "eQuantumPotentialFactor" is new with value equal to 0
    Parameter "eQuantumPotentialPosFac" is new with value equal to 0
    Parameter "g_e" is new with value equal to 1
    Parameter "g_h" is new with value equal to 1
    Parameter "hA" is new with value equal to 1
    Parameter "hBL_max" is new with value equal to 0.3
    Parameter "hQuantumPotentialFactor" is new with value equal to 0
    Parameter "hQuantumPotentialPosFac" is new with value equal to 0
    Parameter "mt_e" is new with value equal to 1
    Parameter "mt_h" is new with value equal to 1
  Model: "BarrierTunneling_NLM_gateS"
    Parameter "alphae" is new with value equal to 0
    Parameter "alphah" is new with value equal to 0
    Parameter "eA" is new with value equal to 1
    Parameter "eBL_max" is new with value equal to 0.3
    Parameter "eQuantumPotentialFactor" is new with value equal to 0
    Parameter "eQuantumPotentialPosFac" is new with value equal to 0
    Parameter "g_e" is new with value equal to 1
    Parameter "g_h" is new with value equal to 1
    Parameter "hA" is new with value equal to 1
    Parameter "hBL_max" is new with value equal to 0.3
    Parameter "hQuantumPotentialFactor" is new with value equal to 0
    Parameter "hQuantumPotentialPosFac" is new with value equal to 0
    Parameter "mt_e" is new with value equal to 1
    Parameter "mt_h" is new with value equal to 1

================
RegionInterface: "Silicon_1/Oxide_1"
  (material interface is "Silicon/Oxide")
================
  Model: "BarrierTunneling_NLM_gateD"
    Parameter "alphae" is new with value equal to 0
    Parameter "alphah" is new with value equal to 0
    Parameter "eA" is new with value equal to 1
    Parameter "eBL_max" is new with value equal to 0.3
    Parameter "eQuantumPotentialFactor" is new with value equal to 0
    Parameter "eQuantumPotentialPosFac" is new with value equal to 0
    Parameter "g_e" is new with value equal to 1
    Parameter "g_h" is new with value equal to 1
    Parameter "hA" is new with value equal to 1
    Parameter "hBL_max" is new with value equal to 0.3
    Parameter "hQuantumPotentialFactor" is new with value equal to 0
    Parameter "hQuantumPotentialPosFac" is new with value equal to 0
    Parameter "mt_e" is new with value equal to 1
    Parameter "mt_h" is new with value equal to 1
  Model: "BarrierTunneling_NLM_gateS"
    Parameter "alphae" is new with value equal to 0
    Parameter "alphah" is new with value equal to 0
    Parameter "eA" is new with value equal to 1
    Parameter "eBL_max" is new with value equal to 0.3
    Parameter "eQuantumPotentialFactor" is new with value equal to 0
    Parameter "eQuantumPotentialPosFac" is new with value equal to 0
    Parameter "g_e" is new with value equal to 1
    Parameter "g_h" is new with value equal to 1
    Parameter "hA" is new with value equal to 1
    Parameter "hBL_max" is new with value equal to 0.3
    Parameter "hQuantumPotentialFactor" is new with value equal to 0
    Parameter "hQuantumPotentialPosFac" is new with value equal to 0
    Parameter "mt_e" is new with value equal to 1
    Parameter "mt_h" is new with value equal to 1

==========
Electrode: "drain"
==========
  Model: "BarrierTunneling_NLM_gateD"
    Parameter "alphae" is new with value equal to 0
    Parameter "alphah" is new with value equal to 0
    Parameter "eA" is new with value equal to 1
    Parameter "eBL_max" is new with value equal to 0.3
    Parameter "eQuantumPotentialFactor" is new with value equal to 0
    Parameter "eQuantumPotentialPosFac" is new with value equal to 0
    Parameter "g_e" is new with value equal to 1
    Parameter "g_h" is new with value equal to 1
    Parameter "hA" is new with value equal to 1
    Parameter "hBL_max" is new with value equal to 0.3
    Parameter "hQuantumPotentialFactor" is new with value equal to 0
    Parameter "hQuantumPotentialPosFac" is new with value equal to 0
    Parameter "mt_e" is new with value equal to 1
    Parameter "mt_h" is new with value equal to 1
  Model: "BarrierTunneling_NLM_gateS"
    Parameter "alphae" is new with value equal to 0
    Parameter "alphah" is new with value equal to 0
    Parameter "eA" is new with value equal to 1
    Parameter "eBL_max" is new with value equal to 0.3
    Parameter "eQuantumPotentialFactor" is new with value equal to 0
    Parameter "eQuantumPotentialPosFac" is new with value equal to 0
    Parameter "g_e" is new with value equal to 1
    Parameter "g_h" is new with value equal to 1
    Parameter "hA" is new with value equal to 1
    Parameter "hBL_max" is new with value equal to 0.3
    Parameter "hQuantumPotentialFactor" is new with value equal to 0
    Parameter "hQuantumPotentialPosFac" is new with value equal to 0
    Parameter "mt_e" is new with value equal to 1
    Parameter "mt_h" is new with value equal to 1

==========
Electrode: "gateD"
==========
  Model: "BarrierTunneling_NLM_gateD"
    Parameter "alphae" is new with value equal to 0
    Parameter "alphah" is new with value equal to 0
    Parameter "eA" is new with value equal to 1
    Parameter "eBL_max" is new with value equal to 0.3
    Parameter "eQuantumPotentialFactor" is new with value equal to 0
    Parameter "eQuantumPotentialPosFac" is new with value equal to 0
    Parameter "g_e" is new with value equal to 1
    Parameter "g_h" is new with value equal to 1
    Parameter "hA" is new with value equal to 1
    Parameter "hBL_max" is new with value equal to 0.3
    Parameter "hQuantumPotentialFactor" is new with value equal to 0
    Parameter "hQuantumPotentialPosFac" is new with value equal to 0
    Parameter "mt_e" is new with value equal to 1
    Parameter "mt_h" is new with value equal to 1
  Model: "BarrierTunneling_NLM_gateS"
    Parameter "alphae" is new with value equal to 0
    Parameter "alphah" is new with value equal to 0
    Parameter "eA" is new with value equal to 1
    Parameter "eBL_max" is new with value equal to 0.3
    Parameter "eQuantumPotentialFactor" is new with value equal to 0
    Parameter "eQuantumPotentialPosFac" is new with value equal to 0
    Parameter "g_e" is new with value equal to 1
    Parameter "g_h" is new with value equal to 1
    Parameter "hA" is new with value equal to 1
    Parameter "hBL_max" is new with value equal to 0.3
    Parameter "hQuantumPotentialFactor" is new with value equal to 0
    Parameter "hQuantumPotentialPosFac" is new with value equal to 0
    Parameter "mt_e" is new with value equal to 1
    Parameter "mt_h" is new with value equal to 1

==========
Electrode: "gateS"
==========
  Model: "BarrierTunneling_NLM_gateD"
    Parameter "alphae" is new with value equal to 0
    Parameter "alphah" is new with value equal to 0
    Parameter "eA" is new with value equal to 1
    Parameter "eBL_max" is new with value equal to 0.3
    Parameter "eQuantumPotentialFactor" is new with value equal to 0
    Parameter "eQuantumPotentialPosFac" is new with value equal to 0
    Parameter "g_e" is new with value equal to 1
    Parameter "g_h" is new with value equal to 1
    Parameter "hA" is new with value equal to 1
    Parameter "hBL_max" is new with value equal to 0.3
    Parameter "hQuantumPotentialFactor" is new with value equal to 0
    Parameter "hQuantumPotentialPosFac" is new with value equal to 0
    Parameter "mt_e" is new with value equal to 1
    Parameter "mt_h" is new with value equal to 1
  Model: "BarrierTunneling_NLM_gateS"
    Parameter "alphae" is new with value equal to 0
    Parameter "alphah" is new with value equal to 0
    Parameter "eA" is new with value equal to 1
    Parameter "eBL_max" is new with value equal to 0.3
    Parameter "eQuantumPotentialFactor" is new with value equal to 0
    Parameter "eQuantumPotentialPosFac" is new with value equal to 0
    Parameter "g_e" is new with value equal to 1
    Parameter "g_h" is new with value equal to 1
    Parameter "hA" is new with value equal to 1
    Parameter "hBL_max" is new with value equal to 0.3
    Parameter "hQuantumPotentialFactor" is new with value equal to 0
    Parameter "hQuantumPotentialPosFac" is new with value equal to 0
    Parameter "mt_e" is new with value equal to 1
    Parameter "mt_h" is new with value equal to 1

==========
Electrode: "source"
==========
  Model: "BarrierTunneling_NLM_gateD"
    Parameter "alphae" is new with value equal to 0
    Parameter "alphah" is new with value equal to 0
    Parameter "eA" is new with value equal to 1
    Parameter "eBL_max" is new with value equal to 0.3
    Parameter "eQuantumPotentialFactor" is new with value equal to 0
    Parameter "eQuantumPotentialPosFac" is new with value equal to 0
    Parameter "g_e" is new with value equal to 1
    Parameter "g_h" is new with value equal to 1
    Parameter "hA" is new with value equal to 1
    Parameter "hBL_max" is new with value equal to 0.3
    Parameter "hQuantumPotentialFactor" is new with value equal to 0
    Parameter "hQuantumPotentialPosFac" is new with value equal to 0
    Parameter "mt_e" is new with value equal to 1
    Parameter "mt_h" is new with value equal to 1
  Model: "BarrierTunneling_NLM_gateS"
    Parameter "alphae" is new with value equal to 0
    Parameter "alphah" is new with value equal to 0
    Parameter "eA" is new with value equal to 1
    Parameter "eBL_max" is new with value equal to 0.3
    Parameter "eQuantumPotentialFactor" is new with value equal to 0
    Parameter "eQuantumPotentialPosFac" is new with value equal to 0
    Parameter "g_e" is new with value equal to 1
    Parameter "g_h" is new with value equal to 1
    Parameter "hA" is new with value equal to 1
    Parameter "hBL_max" is new with value equal to 0.3
    Parameter "hQuantumPotentialFactor" is new with value equal to 0
    Parameter "hQuantumPotentialPosFac" is new with value equal to 0
    Parameter "mt_e" is new with value equal to 1
    Parameter "mt_h" is new with value equal to 1

==========
Electrode: "substrate"
==========
  Model: "BarrierTunneling_NLM_gateD"
    Parameter "alphae" is new with value equal to 0
    Parameter "alphah" is new with value equal to 0
    Parameter "eA" is new with value equal to 1
    Parameter "eBL_max" is new with value equal to 0.3
    Parameter "eQuantumPotentialFactor" is new with value equal to 0
    Parameter "eQuantumPotentialPosFac" is new with value equal to 0
    Parameter "g_e" is new with value equal to 1
    Parameter "g_h" is new with value equal to 1
    Parameter "hA" is new with value equal to 1
    Parameter "hBL_max" is new with value equal to 0.3
    Parameter "hQuantumPotentialFactor" is new with value equal to 0
    Parameter "hQuantumPotentialPosFac" is new with value equal to 0
    Parameter "mt_e" is new with value equal to 1
    Parameter "mt_h" is new with value equal to 1
  Model: "BarrierTunneling_NLM_gateS"
    Parameter "alphae" is new with value equal to 0
    Parameter "alphah" is new with value equal to 0
    Parameter "eA" is new with value equal to 1
    Parameter "eBL_max" is new with value equal to 0.3
    Parameter "eQuantumPotentialFactor" is new with value equal to 0
    Parameter "eQuantumPotentialPosFac" is new with value equal to 0
    Parameter "g_e" is new with value equal to 1
    Parameter "g_h" is new with value equal to 1
    Parameter "hA" is new with value equal to 1
    Parameter "hBL_max" is new with value equal to 0.3
    Parameter "hQuantumPotentialFactor" is new with value equal to 0
    Parameter "hQuantumPotentialPosFac" is new with value equal to 0
    Parameter "mt_e" is new with value equal to 1
    Parameter "mt_h" is new with value equal to 1


Acceptor and donor concentrations (AcceptorConcentration, DonorConcentration):
    computed based on the following species from the doping file:
        ArsenicActiveConcentration (donor)
        PhosphorusActiveConcentration (donor)
        BoronActiveConcentration (acceptor)
Net doping concentration (DopingConcentration):
    obtained from doping file
Total doping concentration (TotalConcentration):
    recomputed from acceptor and donor concentrations



With Constant Reference Potential:
  Parameters of Reference Semiconductor:
    The Electron Affinity: 4.07274
    The Band Gap: 1.10821
    The Electron DOS: 2.8583e+19
    The Hole DOS: 3.1046e+19
  The Constant Reference Potential: 4.62578

===============================
Starting solve of next problem:
 Poisson
===============================

Computing poisson-equation 
using Bank/Rose nonlinear solver.

Iteration   |Rhs|      factor     |step|     error   #inner  #iterative  time
------------------------------------------------------------------------------
    0      3.79e+02                                                      0.00
    1      3.68e+01   1.00e+00   4.02e+00   8.92e+04    0         1      0.01
    2      5.17e+00   1.00e+00   1.42e+00   2.32e+04    0         1      0.01
    3      8.40e-01   1.00e+00   3.56e-01   5.37e+03    0         1      0.02
    4      1.74e-02   1.00e+00   4.62e-02   7.83e+02    0         1      0.02
    5      3.34e-05   1.00e+00   1.41e-03   2.67e+01    0         1      0.03
    6      1.64e-10   1.00e+00   2.33e-06   4.64e-02    0         1      0.03
Finished, because...
Error smaller than 1 ( 4.6425E-02 ).

Accumulated times:
Assembly time:        0.01 s
Solve time:      0.02 s
Total time:      0.03 s

contact        voltage     electron current    hole current  conduction current
 drain        0.000E+00      -3.048E-27         4.661E-24        4.658E-24
 gateD        0.000E+00       1.524E-42        -3.505E-65        1.524E-42
 gateS        0.000E+00      -9.312E-43        -3.501E-65       -9.312E-43
 source       0.000E+00       7.425E-26         2.856E-24        2.930E-24
 substrate    0.000E+00      -7.120E-26        -7.517E-24       -7.588E-24


===============================
Starting solve of next problem:
Coupled ( Digits : 5, Max. #iterations : 20, 
    Solver : blocked decomposition,
    #undamped iterations : 1000 
    )
    { Poisson Electron Hole } 
===============================

Computing Coupled( 1 poisson-equation(s) , 1 electron-equation(s) , 
                   1 hole-equation(s) ) 
using Bank/Rose nonlinear solver.

Iteration   |Rhs|      factor     |step|     error   #inner  #iterative  time
------------------------------------------------------------------------------
    0      3.25e-03                                                      0.06
    1      5.59e-04   1.00e+00   9.23e-12   5.46e-07    0         1      0.23
Finished, because...
Error smaller than 1 ( 5.4581E-07 ).

Accumulated times:
Assembly time:        0.16 s
Solve time:      0.07 s
Total time:      0.23 s

contact        voltage     electron current    hole current  conduction current
 drain        0.000E+00       3.421E-26         3.321E-26        6.741E-26
 gateD        0.000E+00      -6.024E-43        -1.429E-53       -6.024E-43
 gateS        0.000E+00       2.279E-43         2.286E-54        2.279E-43
 source       0.000E+00      -1.388E-26         2.478E-26        1.090E-26
 substrate    0.000E+00      -2.033E-26        -5.799E-26       -7.832E-26


===============================
Starting solve of next problem:
Quasistationary ( Digits : 5, Max. #iterations : 20, 
      Initial step in t : 0.1, 
      Minimum step in t : 1.0000e-05, Maximum step in t : 1, 
      Increment : 1.5, Decrement : 2, 
      Goal values :
        Contact drain : 0.08V
    )
  {
    Coupled ( Digits : 5, Max. #iterations : 20, 
        Solver : blocked decomposition,
        #undamped iterations : 1000 
        )
        { Poisson Electron Hole } 
  }
===============================

Computing step from t=0.0000e+00 to t=0.1 (Stepsize: 0.1) :
Computing Coupled( 1 poisson-equation(s) , 1 electron-equation(s) , 
                   1 hole-equation(s) ) 
using Bank/Rose nonlinear solver.

Iteration   |Rhs|      factor     |step|     error   #inner  #iterative  time
------------------------------------------------------------------------------
    0      2.50e+10                                                      0.09
    1      2.21e+10   1.00e+00   1.65e-01   3.36e+03    0         1      0.27
    2      4.96e+09   1.00e+00   8.17e-02   1.35e+03    0         1      0.45
    3      2.42e+08   1.00e+00   8.74e-03   2.21e+02    0         1      0.62
    4      2.55e+05   1.00e+00   5.46e-04   9.61e+00    0         1      0.80
    5      3.99e-01   1.00e+00   9.40e-07   1.22e-02    0         1      0.97
Finished, because...
Error smaller than 1 ( 1.2200E-02 ).

Accumulated times:
Assembly time:        0.69 s
Solve time:      0.28 s
Total time:      0.97 s

contact        voltage     electron current    hole current  conduction current
 drain        8.000E-03       2.724E-17         2.122E-20        2.726E-17
 gateD        0.000E+00      -3.804E-29        -6.539E-46       -3.804E-29
 gateS        0.000E+00      -6.160E-33        -3.574E-52       -6.160E-33
 source       0.000E+00      -8.805E-19        -1.342E-26       -8.805E-19
 substrate    0.000E+00      -5.185E-21        -2.638E-17       -2.638E-17

Computing step from t=0.1 to t=0.236667 (Stepsize: 0.136667) :
Extrapolating values for t = 0.236667 ... done.
Computing Coupled( 1 poisson-equation(s) , 1 electron-equation(s) , 
                   1 hole-equation(s) ) 
using Bank/Rose nonlinear solver.

Iteration   |Rhs|      factor     |step|     error   #inner  #iterative  time
------------------------------------------------------------------------------
    0      9.44e-01                                                      0.11
    1      4.84e+02   1.00e+00   1.47e-02   1.01e+01    0         1      0.29
    2      4.86e-04   1.00e+00   6.10e-05   3.39e-03    0         1      0.46
Finished, because...
Error smaller than 1 ( 3.3919E-03 ).

Accumulated times:
Assembly time:        0.34 s
Solve time:      0.12 s
Total time:      0.46 s

contact        voltage     electron current    hole current  conduction current
 drain        1.893E-02       5.935E-17         4.017E-20        5.939E-17
 gateD        0.000E+00      -8.179E-29        -1.671E-45       -8.179E-29
 gateS        0.000E+00      -1.113E-32        -7.842E-52       -1.113E-32
 source       0.000E+00      -1.516E-18        -1.401E-25       -1.516E-18
 substrate    0.000E+00      -1.007E-20        -5.787E-17       -5.788E-17

Computing step from t=0.236667 to t=0.437111 (Stepsize: 0.200444) :
Extrapolating values for t = 0.437111 ... done.
Computing Coupled( 1 poisson-equation(s) , 1 electron-equation(s) , 
                   1 hole-equation(s) ) 
using Bank/Rose nonlinear solver.

Iteration   |Rhs|      factor     |step|     error   #inner  #iterative  time
------------------------------------------------------------------------------
    0      5.88e-01                                                      0.11
    1      2.08e+03   1.00e+00   3.00e-02   2.07e+01    0         1      0.28
    2      6.43e-04   1.00e+00   3.18e-04   1.44e-02    0         1      0.45
Finished, because...
Error smaller than 1 ( 1.4374E-02 ).

Accumulated times:
Assembly time:        0.34 s
Solve time:      0.11 s
Total time:      0.45 s

contact        voltage     electron current    hole current  conduction current
 drain        3.497E-02       9.867E-17         5.486E-20        9.872E-17
 gateD        0.000E+00      -1.346E-28        -1.519E-45       -1.346E-28
 gateS        0.000E+00      -1.433E-32        -1.311E-51       -1.433E-32
 source       0.000E+00      -1.860E-18        -1.364E-25       -1.860E-18
 substrate    0.000E+00      -1.416E-20        -9.685E-17       -9.686E-17

Computing step from t=0.437111 to t=0.731096 (Stepsize: 0.293985) :
Extrapolating values for t = 0.731096 ... done.
Computing Coupled( 1 poisson-equation(s) , 1 electron-equation(s) , 
                   1 hole-equation(s) ) 
using Bank/Rose nonlinear solver.

Iteration   |Rhs|      factor     |step|     error   #inner  #iterative  time
------------------------------------------------------------------------------
    0      1.70e-02                                                      0.11
    1      9.29e+03   1.00e+00   5.59e-02   4.36e+01    0         1      0.28
    2      3.96e-02   1.00e+00   1.92e-03   6.40e-02    0         1      0.46
Finished, because...
Error smaller than 1 ( 6.3957E-02 ).

Accumulated times:
Assembly time:        0.35 s
Solve time:      0.11 s
Total time:      0.46 s

contact        voltage     electron current    hole current  conduction current
 drain        5.849E-02       1.456E-16         6.268E-20        1.456E-16
 gateD        0.000E+00      -1.999E-28        -2.687E-45       -1.999E-28
 gateS        0.000E+00      -1.550E-32        -1.921E-51       -1.550E-32
 source       0.000E+00      -1.977E-18        -7.901E-26       -1.977E-18
 substrate    0.000E+00      -1.663E-20        -1.437E-16       -1.437E-16

Computing step from t=0.731096 to t=1 (Stepsize: 0.268904) :
Extrapolating values for t = 1 ... done.
Computing Coupled( 1 poisson-equation(s) , 1 electron-equation(s) , 
                   1 hole-equation(s) ) 
using Bank/Rose nonlinear solver.

Iteration   |Rhs|      factor     |step|     error   #inner  #iterative  time
------------------------------------------------------------------------------
    0      7.10e-02                                                      0.11
    1      9.77e+03   1.00e+00   4.33e-02   4.42e+01    0         1      0.29
    2      5.01e-02   1.00e+00   3.02e-03   6.60e-02    0         1      0.46
Finished, because...
Error smaller than 1 ( 6.6042E-02 ).

Accumulated times:
Assembly time:        0.34 s
Solve time:      0.12 s
Total time:      0.46 s

contact        voltage     electron current    hole current  conduction current
 drain        8.000E-02       1.817E-16         6.465E-20        1.818E-16
 gateD        0.000E+00      -2.569E-28        -3.984E-45       -2.569E-28
 gateS        0.000E+00      -1.594E-32        -2.410E-51       -1.594E-32
 source       0.000E+00      -2.023E-18         9.760E-26       -2.023E-18
 substrate    0.000E+00      -1.727E-20        -1.798E-16       -1.798E-16


Finished, because...
Curve trace finished.


===============================
Starting solve of next problem:
Quasistationary ( Digits : 5, Max. #iterations : 20, 
      Initial step in t : 0.01, 
      Minimum step in t : 1.0000e-05, Maximum step in t : 0.05, 
      Increment : 1.5, Decrement : 2, 
      DoZero      Goal values :
        Contact gateD : 2.5V,
        Contact gateS : 2.5V
    )
  {
    Coupled ( Digits : 5, Max. #iterations : 20, 
        Solver : blocked decomposition,
        #undamped iterations : 1000 
        )
        { Poisson Electron Hole } 
    Plot( FilePrefix = "n21_Profile_LowVd" nooverwrite -loadable
         Time (fixed times:
             0.0000e+00 0.2 0.3 0.4 0.5
             1) )
      { }
  }
===============================

Computing solution for t=0 :
Computing Coupled( 1 poisson-equation(s) , 1 electron-equation(s) , 
                   1 hole-equation(s) ) 
using Bank/Rose nonlinear solver.

Iteration   |Rhs|      factor     |step|     error   #inner  #iterative  time
------------------------------------------------------------------------------
    0      5.01e-02                                                      0.00
    1      6.01e-04   1.00e+00   1.22e-04   5.21e-05    0         1      0.18
Finished, because...
Error smaller than 1 ( 5.2090E-05 ).

Accumulated times:
Assembly time:        0.12 s
Solve time:      0.06 s
Total time:      0.18 s

contact        voltage     electron current    hole current  conduction current
 drain        8.000E-02       1.817E-16         6.482E-20        1.818E-16
 gateD        0.000E+00      -2.569E-28        -3.984E-45       -2.569E-28
 gateS        0.000E+00      -1.594E-32        -2.434E-51       -1.594E-32
 source       0.000E+00      -2.023E-18        -1.680E-26       -2.023E-18
 substrate    0.000E+00      -1.727E-20        -1.798E-16       -1.798E-16


Plot started:
Saving device '':
    Writing plot 'n21_Profile_LowVd_0000_des.tdr' (TDR format) ... done.
Plot finished.

Computing step from t=0.0000e+00 to t=0.01 (Stepsize: 0.01) :
Computing Coupled( 1 poisson-equation(s) , 1 electron-equation(s) , 
                   1 hole-equation(s) ) 
using Bank/Rose nonlinear solver.

Iteration   |Rhs|      factor     |step|     error   #inner  #iterative  time
------------------------------------------------------------------------------
    0      5.44e+01                                                      0.12
    1      1.64e+06   1.00e+00   2.52e-01   2.09e+04    0         1      0.29
    2      1.05e+04   1.00e+00   4.83e-02   3.72e+03    0         1      0.47
    3      8.42e+00   1.00e+00   1.88e-03   1.74e+02    0         1      0.64
    4      5.39e-04   1.00e+00   3.81e-06   3.29e-01    0         1      0.82
Finished, because...
Error smaller than 1 ( 3.2938E-01 ).

Accumulated times:
Assembly time:        0.60 s
Solve time:      0.22 s
Total time:      0.82 s

contact        voltage     electron current    hole current  conduction current
 drain        8.000E-02       1.827E-16         6.483E-20        1.828E-16
 gateD        2.500E-02      -1.612E-28         3.189E-42       -1.612E-28
 gateS        2.500E-02       4.173E-28         6.612E-42        4.173E-28
 source       0.000E+00      -3.501E-18         3.441E-24       -3.501E-18
 substrate    0.000E+00      -1.727E-20        -1.793E-16       -1.793E-16

Computing step from t=0.01 to t=0.024 (Stepsize: 0.014) :
Extrapolating values for t = 0.024 ... done.
Computing Coupled( 1 poisson-equation(s) , 1 electron-equation(s) , 
                   1 hole-equation(s) ) 
using Bank/Rose nonlinear solver.

Iteration   |Rhs|      factor     |step|     error   #inner  #iterative  time
------------------------------------------------------------------------------
    0      7.43e-03                                                      0.11
    1      7.90e+03   1.00e+00   6.51e-03   3.75e+02    0         1      0.28
    2      8.58e-01   1.00e+00   7.35e-05   3.42e+00    0         1      0.46
    3      4.70e-04   1.00e+00   7.62e-09   2.20e-04    0         1      0.64
Finished, because...
Error smaller than 1 ( 2.1985E-04 ).

Accumulated times:
Assembly time:        0.48 s
Solve time:      0.16 s
Total time:      0.64 s

contact        voltage     electron current    hole current  conduction current
 drain        8.000E-02       1.865E-16         6.482E-20        1.866E-16
 gateD        6.000E-02      -5.752E-29         7.703E-42       -5.752E-29
 gateS        6.000E-02       1.343E-27         1.669E-41        1.343E-27
 source       0.000E+00      -7.922E-18        -3.946E-26       -7.922E-18
 substrate    0.000E+00      -1.727E-20        -1.786E-16       -1.786E-16

Computing step from t=0.024 to t=0.0440667 (Stepsize: 0.0200667) :
Extrapolating values for t = 0.0440667 ... done.
Computing Coupled( 1 poisson-equation(s) , 1 electron-equation(s) , 
                   1 hole-equation(s) ) 
using Bank/Rose nonlinear solver.

Iteration   |Rhs|      factor     |step|     error   #inner  #iterative  time
------------------------------------------------------------------------------
    0      1.54e-02                                                      0.12
    1      3.59e+04   1.00e+00   1.17e-02   6.91e+02    0         1      0.30
    2      6.57e+00   1.00e+00   2.37e-04   1.17e+01    0         1      0.47
    3      4.86e-04   1.00e+00   7.03e-08   2.38e-03    0         1      0.65
Finished, because...
Error smaller than 1 ( 2.3846E-03 ).

Accumulated times:
Assembly time:        0.48 s
Solve time:      0.17 s
Total time:      0.65 s

contact        voltage     electron current    hole current  conduction current
 drain        8.000E-02       2.050E-16         6.482E-20        2.051E-16
 gateD        1.102E-01       1.108E-28         1.775E-41        1.108E-28
 gateS        1.102E-01       4.588E-27         4.117E-41        4.588E-27
 source       0.000E+00      -2.730E-17        -3.808E-26       -2.730E-17
 substrate    0.000E+00      -1.727E-20        -1.777E-16       -1.778E-16

Computing step from t=0.0440667 to t=0.0728289 (Stepsize: 0.0287622) :
Extrapolating values for t = 0.0728289 ... done.
Computing Coupled( 1 poisson-equation(s) , 1 electron-equation(s) , 
                   1 hole-equation(s) ) 
using Bank/Rose nonlinear solver.

Iteration   |Rhs|      factor     |step|     error   #inner  #iterative  time
------------------------------------------------------------------------------
    0      3.89e-02                                                      0.12
    1      2.12e+05   1.00e+00   2.03e-02   1.25e+03    0         1      0.29
    2      9.78e+01   1.00e+00   7.09e-04   3.79e+01    0         1      0.47
    3      6.01e-04   1.00e+00   5.72e-07   2.47e-02    0         1      0.65
Finished, because...
Error smaller than 1 ( 2.4733E-02 ).

Accumulated times:
Assembly time:        0.47 s
Solve time:      0.18 s
Total time:      0.65 s

contact        voltage     electron current    hole current  conduction current
 drain        8.000E-02       3.515E-16         6.482E-20        3.515E-16
 gateD        1.821E-01       8.571E-28         5.585E-41        8.571E-28
 gateS        1.821E-01       2.383E-26         1.396E-40        2.383E-26
 source       0.000E+00      -1.748E-16         1.162E-25       -1.748E-16
 substrate    0.000E+00      -1.727E-20        -1.767E-16       -1.767E-16

Computing step from t=0.0728289 to t=0.114055 (Stepsize: 0.0412259) :
Extrapolating values for t = 0.114055 ... done.
Computing Coupled( 1 poisson-equation(s) , 1 electron-equation(s) , 
                   1 hole-equation(s) ) 
using Bank/Rose nonlinear solver.

Iteration   |Rhs|      factor     |step|     error   #inner  #iterative  time
------------------------------------------------------------------------------
    0      1.01e-01                                                      0.12
    1      1.74e+06   1.00e+00   3.33e-02   2.17e+03    0         1      0.30
    2      2.21e+03   1.00e+00   1.89e-03   1.11e+02    0         1      0.48
    3      6.66e-04   1.00e+00   4.00e-06   2.21e-01    0         1      0.66
Finished, because...
Error smaller than 1 ( 2.2111E-01 ).

Accumulated times:
Assembly time:        0.51 s
Solve time:      0.15 s
Total time:      0.66 s

contact        voltage     electron current    hole current  conduction current
 drain        8.000E-02       2.939E-15         6.482E-20        2.939E-15
 gateD        2.851E-01       1.046E-26         3.088E-40        1.046E-26
 gateS        2.851E-01       2.558E-25         8.329E-40        2.558E-25
 source       0.000E+00      -2.763E-15         3.263E-24       -2.763E-15
 substrate    0.000E+00      -1.699E-20        -1.757E-16       -1.757E-16

Computing step from t=0.114055 to t=0.164055 (Stepsize: 0.05) :
Extrapolating values for t = 0.164055 ... done.
Computing Coupled( 1 poisson-equation(s) , 1 electron-equation(s) , 
                   1 hole-equation(s) ) 
using Bank/Rose nonlinear solver.

Iteration   |Rhs|      factor     |step|     error   #inner  #iterative  time
------------------------------------------------------------------------------
    0      1.84e-01                                                      0.12
    1      5.83e+06   1.00e+00   4.05e-02   2.71e+03    0         1      0.31
    2      3.43e+04   1.00e+00   2.72e-03   1.67e+02    0         1      0.49
    3      2.84e-01   1.00e+00   9.16e-06   5.50e-01    0         1      0.67
Finished, because...
Error smaller than 1 ( 5.4961E-01 ).

Accumulated times:
Assembly time:        0.51 s
Solve time:      0.16 s
Total time:      0.67 s

contact        voltage     electron current    hole current  conduction current
 drain        8.000E-02       8.599E-14         6.482E-20        8.599E-14
 gateD        4.101E-01       2.428E-25         2.666E-39        2.428E-25
 gateS        4.101E-01       5.324E-24         7.882E-39        5.324E-24
 source       0.000E+00      -8.582E-14        -3.102E-25       -8.582E-14
 substrate    0.000E+00       1.688E-19        -1.756E-16       -1.754E-16

Computing step from t=0.164055 to t=0.2 (Stepsize: 0.0359453) :
Extrapolating values for t = 0.2 ... done.
Computing Coupled( 1 poisson-equation(s) , 1 electron-equation(s) , 
                   1 hole-equation(s) ) 
using Bank/Rose nonlinear solver.

Iteration   |Rhs|      factor     |step|     error   #inner  #iterative  time
------------------------------------------------------------------------------
    0      6.64e-01                                                      0.12
    1      3.32e+06   1.00e+00   2.23e-02   1.37e+03    0         1      0.31
    2      7.70e+03   1.00e+00   8.30e-04   4.35e+01    0         1      0.49
    3      1.89e-02   1.00e+00   1.07e-06   5.61e-02    0         1      0.68
Finished, because...
Error smaller than 1 ( 5.6121E-02 ).

Accumulated times:
Assembly time:        0.51 s
Solve time:      0.16 s
Total time:      0.68 s

contact        voltage     electron current    hole current  conduction current
 drain        8.000E-02       1.050E-12         6.482E-20        1.050E-12
 gateD        5.000E-01       2.431E-24         1.238E-38        2.431E-24
 gateS        5.000E-01       4.836E-23         1.327E-38        4.836E-23
 source       0.000E+00      -1.050E-12        -4.389E-25       -1.050E-12
 substrate    0.000E+00       5.783E-20        -1.757E-16       -1.756E-16


Plot started:
Saving device '':
    Writing plot 'n21_Profile_LowVd_0001_des.tdr' (TDR format) ... done.
Plot finished.

Computing step from t=0.2 to t=0.25 (Stepsize: 0.05) :
Extrapolating values for t = 0.25 ... done.
Computing Coupled( 1 poisson-equation(s) , 1 electron-equation(s) , 
                   1 hole-equation(s) ) 
using Bank/Rose nonlinear solver.

Iteration   |Rhs|      factor     |step|     error   #inner  #iterative  time
------------------------------------------------------------------------------
    0      4.43e+00                                                      0.12
    1      9.50e+06   1.00e+00   2.81e-02   1.73e+03    0         1      0.31
    2      1.37e+05   1.00e+00   1.58e-03   6.84e+01    0         1      0.50
    3      5.40e+00   1.00e+00   7.47e-06   4.93e-01    0         1      0.69
Finished, because...
Error smaller than 1 ( 4.9300E-01 ).

Accumulated times:
Assembly time:        0.53 s
Solve time:      0.16 s
Total time:      0.69 s

contact        voltage     electron current    hole current  conduction current
 drain        8.000E-02       3.499E-11         6.482E-20        3.499E-11
 gateD        6.250E-01       5.932E-23         1.605E-38        5.932E-23
 gateS        6.250E-01       1.001E-21         2.846E-38        1.001E-21
 source       0.000E+00      -3.499E-11        -3.084E-23       -3.499E-11
 substrate    0.000E+00       8.265E-19        -1.736E-16       -1.727E-16

Computing step from t=0.25 to t=0.3 (Stepsize: 0.05) :
Extrapolating values for t = 0.3 ... done.
Computing Coupled( 1 poisson-equation(s) , 1 electron-equation(s) , 
                   1 hole-equation(s) ) 
using Bank/Rose nonlinear solver.

Iteration   |Rhs|      factor     |step|     error   #inner  #iterative  time
------------------------------------------------------------------------------
    0      1.48e+02                                                      0.13
    1      1.93e+07   1.00e+00   3.42e-02   2.20e+03    0         1      0.33
    2      5.56e+05   1.00e+00   3.01e-03   1.13e+02    0         1      0.52
    3      9.11e+01   1.00e+00   2.64e-05   1.72e+00    0         1      0.71
    4      5.59e-04   1.00e+00   1.20e-08   8.46e-04    0         1      0.91
Finished, because...
Error smaller than 1 ( 8.4561E-04 ).

Accumulated times:
Assembly time:        0.68 s
Solve time:      0.23 s
Total time:      0.91 s

contact        voltage     electron current    hole current  conduction current
 drain        8.000E-02       1.173E-09         6.482E-20        1.173E-09
 gateD        7.500E-01       1.424E-21         3.163E-38        1.424E-21
 gateS        7.500E-01       1.926E-20         1.009E-38        1.926E-20
 source       0.000E+00      -1.173E-09         2.403E-26       -1.173E-09
 substrate    0.000E+00      -4.384E-20        -1.712E-16       -1.712E-16


Plot started:
Saving device '':
    Writing plot 'n21_Profile_LowVd_0002_des.tdr' (TDR format) ... done.
Plot finished.

Computing step from t=0.3 to t=0.35 (Stepsize: 0.05) :
Extrapolating values for t = 0.35 ... done.
Computing Coupled( 1 poisson-equation(s) , 1 electron-equation(s) , 
                   1 hole-equation(s) ) 
using Bank/Rose nonlinear solver.

Iteration   |Rhs|      factor     |step|     error   #inner  #iterative  time
------------------------------------------------------------------------------
    0      5.90e+03                                                      0.14
    1      3.83e+07   1.00e+00   4.32e-02   2.99e+03    0         1      0.33
    2      2.41e+06   1.00e+00   5.23e-03   1.96e+02    0         1      0.53
    3      1.14e+03   1.00e+00   1.44e-04   1.09e+01    0         1      0.73
    4      2.29e-03   1.00e+00   3.87e-07   2.98e-02    0         1      0.93
Finished, because...
Error smaller than 1 ( 2.9776E-02 ).

Accumulated times:
Assembly time:        0.70 s
Solve time:      0.22 s
Total time:      0.93 s

contact        voltage     electron current    hole current  conduction current
 drain        8.000E-02       3.834E-08         6.482E-20        3.834E-08
 gateD        8.750E-01       3.347E-20         1.332E-38        3.347E-20
 gateS        8.750E-01       3.215E-19         1.561E-38        3.215E-19
 source       0.000E+00      -3.834E-08        -1.744E-26       -3.834E-08
 substrate    0.000E+00      -4.032E-16        -1.701E-16       -5.733E-16

Computing step from t=0.35 to t=0.4 (Stepsize: 0.05) :
Extrapolating values for t = 0.4 ... done.
Computing Coupled( 1 poisson-equation(s) , 1 electron-equation(s) , 
                   1 hole-equation(s) ) 
using Bank/Rose nonlinear solver.

Iteration   |Rhs|      factor     |step|     error   #inner  #iterative  time
------------------------------------------------------------------------------
    0      4.89e+05                                                      0.14
    1      8.23e+07   1.00e+00   7.40e-02   5.91e+03    0         1      0.34
    2      1.96e+07   1.00e+00   1.30e-02   4.99e+02    0         1      0.54
    3      3.34e+05   1.00e+00   9.64e-04   7.23e+01    0         1      0.75
    4      2.63e+02   1.00e+00   6.59e-05   5.06e+00    0         1      0.95
    5      5.89e-04   1.00e+00   8.90e-08   6.81e-03    0         1      1.16
Finished, because...
Error smaller than 1 ( 6.8136E-03 ).

Accumulated times:
Assembly time:        0.90 s
Solve time:      0.26 s
Total time:      1.16 s

contact        voltage     electron current    hole current  conduction current
 drain        8.000E-02       1.116E-06         6.483E-20        1.116E-06
 gateD        1.000E+00       7.394E-19         2.125E-38        7.394E-19
 gateS        1.000E+00       3.922E-18         2.604E-38        3.922E-18
 source       0.000E+00      -1.116E-06        -2.591E-26       -1.116E-06
 substrate    0.000E+00       2.875E-19        -1.684E-16       -1.681E-16


Plot started:
Saving device '':
    Writing plot 'n21_Profile_LowVd_0003_des.tdr' (TDR format) ... done.
Plot finished.

Computing step from t=0.4 to t=0.45 (Stepsize: 0.05) :
Extrapolating values for t = 0.45 ... done.
Computing Coupled( 1 poisson-equation(s) , 1 electron-equation(s) , 
                   1 hole-equation(s) ) 
using Bank/Rose nonlinear solver.

Iteration   |Rhs|      factor     |step|     error   #inner  #iterative  time
------------------------------------------------------------------------------
    0      1.33e+07                                                      0.14
    1      1.87e+08   1.00e+00   1.86e-01   2.23e+04    0         1      0.35
    2      1.98e+08   1.00e+00   6.69e-02   3.16e+03    0         1      0.57
    3      9.46e+07   1.00e+00   3.09e-02   2.05e+03    0         1      0.78
    4      2.20e+07   1.00e+00   9.51e-03   5.58e+02    0         1      0.99
    5      5.82e+05   1.00e+00   9.24e-04   5.98e+01    0         1      1.20
    6      3.44e+02   1.00e+00   2.61e-05   1.67e+00    0         1      1.41
    7      5.04e-04   1.00e+00   1.42e-08   9.13e-04    0         1      1.62
Finished, because...
Error smaller than 1 ( 9.1296E-04 ).

Accumulated times:
Assembly time:        1.24 s
Solve time:      0.38 s
Total time:      1.62 s

contact        voltage     electron current    hole current  conduction current
 drain        8.000E-02       1.723E-05         6.501E-20        1.723E-05
 gateD        1.125E+00       1.080E-17         3.816E-38        1.080E-17
 gateS        1.125E+00       2.631E-17         4.773E-38        2.631E-17
 source       0.000E+00      -1.723E-05        -2.364E-25       -1.723E-05
 substrate    0.000E+00      -1.740E-17        -1.705E-16       -1.879E-16

Computing step from t=0.45 to t=0.5 (Stepsize: 0.05) :
Extrapolating values for t = 0.5 ... done.
Computing Coupled( 1 poisson-equation(s) , 1 electron-equation(s) , 
                   1 hole-equation(s) ) 
using Bank/Rose nonlinear solver.

Iteration   |Rhs|      factor     |step|     error   #inner  #iterative  time
------------------------------------------------------------------------------
    0      7.82e+07                                                      0.15
    1      2.47e+08   1.00e+00   2.39e-01   3.54e+04    0         1      0.36
    2      2.90e+08   1.00e+00   1.31e-01   3.82e+03    0         1      0.58
    3      3.16e+08   1.00e+00   3.69e-02   1.40e+03    0         1      0.79
    4      8.55e+07   1.00e+00   1.39e-02   5.70e+02    0         1      1.01
    5      3.46e+07   1.00e+00   1.96e-03   1.64e+02    0         1      1.22
    6      2.89e+06   1.00e+00   5.61e-04   4.68e+01    0         1      1.44
    7      1.42e+04   1.00e+00   7.46e-05   4.59e+00    0         1      1.65
    8      2.80e-01   1.00e+00   4.39e-07   2.03e-02    0         1      1.87
Finished, because...
Error smaller than 1 ( 2.0345E-02 ).

Accumulated times:
Assembly time:        1.43 s
Solve time:      0.44 s
Total time:      1.87 s

contact        voltage     electron current    hole current  conduction current
 drain        8.000E-02       6.487E-05         6.552E-20        6.487E-05
 gateD        1.250E+00       6.368E-17         8.210E-38        6.368E-17
 gateS        1.250E+00       9.161E-17         9.315E-38        9.161E-17
 source       0.000E+00      -6.487E-05        -9.957E-25       -6.487E-05
 substrate    0.000E+00       4.887E-17        -1.754E-16       -1.265E-16


Plot started:
Saving device '':
    Writing plot 'n21_Profile_LowVd_0004_des.tdr' (TDR format) ... done.
Plot finished.

Computing step from t=0.5 to t=0.55 (Stepsize: 0.05) :
Extrapolating values for t = 0.55 ... done.
Computing Coupled( 1 poisson-equation(s) , 1 electron-equation(s) , 
                   1 hole-equation(s) ) 
using Bank/Rose nonlinear solver.

Iteration   |Rhs|      factor     |step|     error   #inner  #iterative  time
------------------------------------------------------------------------------
    0      3.48e+08                                                      0.16
    1      3.94e+08   1.00e+00   1.50e-01   1.29e+04    0         1      0.38
    2      1.87e+08   1.00e+00   6.72e-02   1.61e+03    0         1      0.60
    3      1.81e+07   1.00e+00   5.34e-03   1.59e+02    0         1      0.83
    4      1.45e+05   1.00e+00   6.13e-04   1.86e+01    0         1      1.05
    5      1.43e+01   1.00e+00   4.77e-06   1.45e-01    0         1      1.27
Finished, because...
Error smaller than 1 ( 1.4451E-01 ).

Accumulated times:
Assembly time:        0.99 s
Solve time:      0.28 s
Total time:      1.27 s

contact        voltage     electron current    hole current  conduction current
 drain        8.000E-02       1.030E-04         6.593E-20        1.030E-04
 gateD        1.375E+00       2.113E-16         1.972E-37        2.113E-16
 gateS        1.375E+00       2.515E-16         2.013E-37        2.515E-16
 source       0.000E+00      -1.030E-04        -4.198E-23       -1.030E-04
 substrate    0.000E+00      -4.019E-15        -1.781E-16       -4.197E-15

Computing step from t=0.55 to t=0.6 (Stepsize: 0.05) :
Extrapolating values for t = 0.6 ... done.
Computing Coupled( 1 poisson-equation(s) , 1 electron-equation(s) , 
                   1 hole-equation(s) ) 
using Bank/Rose nonlinear solver.

Iteration   |Rhs|      factor     |step|     error   #inner  #iterative  time
------------------------------------------------------------------------------
    0      5.58e+07                                                      0.17
    1      1.55e+08   1.00e+00   7.75e-02   4.81e+03    0         1      0.40
    2      4.01e+06   1.00e+00   1.92e-02   4.06e+02    0         1      0.63
    3      1.63e+04   1.00e+00   1.02e-03   2.21e+01    0         1      0.86
    4      2.62e-01   1.00e+00   2.51e-06   5.61e-02    0         1      1.10
Finished, because...
Error smaller than 1 ( 5.6097E-02 ).

Accumulated times:
Assembly time:        0.88 s
Solve time:      0.22 s
Total time:      1.10 s

contact        voltage     electron current    hole current  conduction current
 drain        8.000E-02       1.250E-04         6.618E-20        1.250E-04
 gateD        1.500E+00       5.540E-16         5.121E-37        5.540E-16
 gateS        1.500E+00       6.205E-16         4.866E-37        6.205E-16
 source       0.000E+00      -1.250E-04        -1.417E-23       -1.250E-04
 substrate    0.000E+00      -1.081E-15        -1.794E-16       -1.261E-15

Computing step from t=0.6 to t=0.65 (Stepsize: 0.05) :
Extrapolating values for t = 0.65 ... done.
Computing Coupled( 1 poisson-equation(s) , 1 electron-equation(s) , 
                   1 hole-equation(s) ) 
using Bank/Rose nonlinear solver.

Iteration   |Rhs|      factor     |step|     error   #inner  #iterative  time
------------------------------------------------------------------------------
    0      9.43e+06                                                      0.18
    1      7.68e+07   1.00e+00   3.84e-02   2.12e+03    0         1      0.42
    2      3.60e+05   1.00e+00   4.03e-03   8.01e+01    0         1      0.67
    3      3.03e+01   1.00e+00   3.88e-05   7.55e-01    0         1      0.91
Finished, because...
Error smaller than 1 ( 7.5484E-01 ).

Accumulated times:
Assembly time:        0.74 s
Solve time:      0.17 s
Total time:      0.91 s

contact        voltage     electron current    hole current  conduction current
 drain        8.000E-02       1.393E-04         6.476E-20        1.393E-04
 gateD        1.625E+00       1.329E-15         1.445E-36        1.329E-15
 gateS        1.625E+00       1.451E-15         1.303E-36        1.451E-15
 source       0.000E+00      -1.393E-04        -4.661E-21       -1.393E-04
 substrate    0.000E+00      -1.839E-12        -1.801E-16       -1.839E-12

Computing step from t=0.65 to t=0.7 (Stepsize: 0.05) :
Extrapolating values for t = 0.7 ... done.
Computing Coupled( 1 poisson-equation(s) , 1 electron-equation(s) , 
                   1 hole-equation(s) ) 
using Bank/Rose nonlinear solver.

Iteration   |Rhs|      factor     |step|     error   #inner  #iterative  time
------------------------------------------------------------------------------
    0      3.47e+06                                                      0.18
    1      4.50e+07   1.00e+00   2.13e-02   1.13e+03    0         1      0.43
    2      8.29e+04   1.00e+00   1.15e-03   2.30e+01    0         1      0.68
    3      5.05e-01   1.00e+00   3.38e-06   6.57e-02    0         1      0.93
Finished, because...
Error smaller than 1 ( 6.5662E-02 ).

Accumulated times:
Assembly time:        0.78 s
Solve time:      0.15 s
Total time:      0.93 s

contact        voltage     electron current    hole current  conduction current
 drain        8.000E-02       1.495E-04         6.644E-20        1.495E-04
 gateD        1.750E+00       3.082E-15         4.434E-36        3.082E-15
 gateS        1.750E+00       3.318E-15         3.845E-36        3.318E-15
 source       0.000E+00      -1.495E-04        -4.690E-23       -1.495E-04
 substrate    0.000E+00      -6.536E-14        -1.805E-16       -6.554E-14

Computing step from t=0.7 to t=0.75 (Stepsize: 0.05) :
Extrapolating values for t = 0.75 ... done.
Computing Coupled( 1 poisson-equation(s) , 1 electron-equation(s) , 
                   1 hole-equation(s) ) 
using Bank/Rose nonlinear solver.

Iteration   |Rhs|      factor     |step|     error   #inner  #iterative  time
------------------------------------------------------------------------------
    0      2.74e+06                                                      0.19
    1      2.83e+07   1.00e+00   1.32e-02   6.93e+02    0         1      0.44
    2      2.27e+04   1.00e+00   4.32e-04   8.82e+00    0         1      0.70
    3      3.17e-02   1.00e+00   5.58e-07   1.10e-02    0         1      0.95
Finished, because...
Error smaller than 1 ( 1.1010E-02 ).

Accumulated times:
Assembly time:        0.79 s
Solve time:      0.16 s
Total time:      0.95 s

contact        voltage     electron current    hole current  conduction current
 drain        8.000E-02       1.572E-04         6.655E-20        1.572E-04
 gateD        1.875E+00       7.093E-15         1.484E-35        7.093E-15
 gateS        1.875E+00       7.566E-15         1.250E-35        7.566E-15
 source       0.000E+00      -1.572E-04        -3.636E-24       -1.572E-04
 substrate    0.000E+00      -4.093E-15        -1.808E-16       -4.273E-15

Computing step from t=0.75 to t=0.8 (Stepsize: 0.05) :
Extrapolating values for t = 0.8 ... done.
Computing Coupled( 1 poisson-equation(s) , 1 electron-equation(s) , 
                   1 hole-equation(s) ) 
using Bank/Rose nonlinear solver.

Iteration   |Rhs|      factor     |step|     error   #inner  #iterative  time
------------------------------------------------------------------------------
    0      2.36e+06                                                      0.20
    1      1.86e+07   1.00e+00   8.88e-03   4.62e+02    0         1      0.46
    2      7.04e+03   1.00e+00   1.94e-04   4.05e+00    0         1      0.72
    3      2.65e-03   1.00e+00   1.36e-07   2.71e-03    0         1      0.98
Finished, because...
Error smaller than 1 ( 2.7056E-03 ).

Accumulated times:
Assembly time:        0.82 s
Solve time:      0.16 s
Total time:      0.98 s

contact        voltage     electron current    hole current  conduction current
 drain        8.000E-02       1.634E-04         6.662E-20        1.634E-04
 gateD        2.000E+00       1.644E-14         5.430E-35        1.644E-14
 gateS        2.000E+00       1.742E-14         4.478E-35        1.742E-14
 source       0.000E+00      -1.634E-04        -2.335E-24       -1.634E-04
 substrate    0.000E+00      -2.920E-16        -1.811E-16       -4.731E-16

Computing step from t=0.8 to t=0.85 (Stepsize: 0.05) :
Extrapolating values for t = 0.85 ... done.
Computing Coupled( 1 poisson-equation(s) , 1 electron-equation(s) , 
                   1 hole-equation(s) ) 
using Bank/Rose nonlinear solver.

Iteration   |Rhs|      factor     |step|     error   #inner  #iterative  time
------------------------------------------------------------------------------
    0      1.90e+06                                                      0.21
    1      1.27e+07   1.00e+00   6.34e-03   3.28e+02    0         1      0.48
    2      2.41e+03   1.00e+00   9.86e-05   2.10e+00    0         1      0.75
    3      5.66e-04   1.00e+00   4.19e-08   8.41e-04    0         1      1.02
Finished, because...
Error smaller than 1 ( 8.4096E-04 ).

Accumulated times:
Assembly time:        0.85 s
Solve time:      0.17 s
Total time:      1.02 s

contact        voltage     electron current    hole current  conduction current
 drain        8.000E-02       1.684E-04         6.667E-20        1.684E-04
 gateD        2.125E+00       3.880E-14         2.173E-34        3.880E-14
 gateS        2.125E+00       4.091E-14         1.768E-34        4.091E-14
 source       0.000E+00      -1.684E-04        -2.315E-24       -1.684E-04
 substrate    0.000E+00      -5.415E-17        -1.813E-16       -2.354E-16

Computing step from t=0.85 to t=0.9 (Stepsize: 0.05) :
Extrapolating values for t = 0.9 ... done.
Computing Coupled( 1 poisson-equation(s) , 1 electron-equation(s) , 
                   1 hole-equation(s) ) 
using Bank/Rose nonlinear solver.

Iteration   |Rhs|      factor     |step|     error   #inner  #iterative  time
------------------------------------------------------------------------------
    0      1.66e+06                                                      0.21
    1      8.84e+06   1.00e+00   4.73e-03   2.44e+02    0         1      0.49
    2      8.95e+02   1.00e+00   5.51e-05   1.19e+00    0         1      0.76
    3      8.96e-04   1.00e+00   1.52e-08   3.06e-04    0         1      1.04
Finished, because...
Error smaller than 1 ( 3.0608E-04 ).

Accumulated times:
Assembly time:        0.88 s
Solve time:      0.16 s
Total time:      1.04 s

contact        voltage     electron current    hole current  conduction current
 drain        8.000E-02       1.725E-04         6.672E-20        1.725E-04
 gateD        2.250E+00       9.422E-14         9.552E-34        9.422E-14
 gateS        2.250E+00       9.897E-14         7.713E-34        9.897E-14
 source       0.000E+00      -1.725E-04        -2.360E-24       -1.725E-04
 substrate    0.000E+00       1.765E-19        -1.814E-16       -1.812E-16

Computing step from t=0.9 to t=0.95 (Stepsize: 0.05) :
Extrapolating values for t = 0.95 ... done.
Computing Coupled( 1 poisson-equation(s) , 1 electron-equation(s) , 
                   1 hole-equation(s) ) 
using Bank/Rose nonlinear solver.

Iteration   |Rhs|      factor     |step|     error   #inner  #iterative  time
------------------------------------------------------------------------------
    0      1.52e+06                                                      0.22
    1      6.32e+06   1.00e+00   3.66e-03   1.88e+02    0         1      0.50
    2      3.57e+02   1.00e+00   3.30e-05   7.25e-01    0         1      0.78
Finished, because...
Error smaller than 1 ( 7.2503E-01 ).

Accumulated times:
Assembly time:        0.68 s
Solve time:      0.10 s
Total time:      0.78 s

contact        voltage     electron current    hole current  conduction current
 drain        8.000E-02       1.760E-04         6.646E-20        1.760E-04
 gateD        2.375E+00       2.382E-13         4.763E-33        2.382E-13
 gateS        2.375E+00       2.494E-13         3.847E-33        2.494E-13
 source       0.000E+00      -1.760E-04        -1.035E-21       -1.760E-04
 substrate    0.000E+00      -5.343E-11        -1.815E-16       -5.343E-11

Computing step from t=0.95 to t=1 (Stepsize: 0.05) :
Extrapolating values for t = 1 ... done.
Computing Coupled( 1 poisson-equation(s) , 1 electron-equation(s) , 
                   1 hole-equation(s) ) 
using Bank/Rose nonlinear solver.

Iteration   |Rhs|      factor     |step|     error   #inner  #iterative  time
------------------------------------------------------------------------------
    0      1.41e+06                                                      0.22
    1      4.62e+06   1.00e+00   2.90e-03   1.48e+02    0         1      0.51
    2      1.51e+02   1.00e+00   2.09e-05   4.64e-01    0         1      0.79
Finished, because...
Error smaller than 1 ( 4.6402E-01 ).

Accumulated times:
Assembly time:        0.69 s
Solve time:      0.10 s
Total time:      0.79 s

contact        voltage     electron current    hole current  conduction current
 drain        8.000E-02       1.791E-04         6.668E-20        1.791E-04
 gateD        2.500E+00       6.368E-13         2.498E-32        6.368E-13
 gateS        2.500E+00       6.653E-13         2.013E-32        6.653E-13
 source       0.000E+00      -1.791E-04        -4.076E-22       -1.791E-04
 substrate    0.000E+00      -2.313E-11        -1.817E-16       -2.313E-11


Plot started:
Saving device '':
    Writing plot 'n21_Profile_LowVd_0005_des.tdr' (TDR format) ... done.
Plot finished.


Finished, because...
Curve trace finished.


===============================
Starting solve of next problem:
Quasistationary ( Digits : 5, Max. #iterations : 20, 
      Initial step in t : 0.05, 
      Minimum step in t : 1.0000e-05, Maximum step in t : 0.1, 
      Increment : 1.5, Decrement : 2, 
      Goal values :
        Contact gateD : 0.0000e+00V,
        Contact gateS : 0.0000e+00V
    )
  {
    Coupled ( Digits : 5, Max. #iterations : 20, 
        Solver : blocked decomposition,
        #undamped iterations : 1000 
        )
        { Poisson Electron Hole } 
  }
===============================

Reusing extrapolation from a previous quasistationary

Computing step from t=0.0000e+00 to t=0.05 (Stepsize: 0.05) :
Extrapolating values for t = 0.05 ... done.
Computing Coupled( 1 poisson-equation(s) , 1 electron-equation(s) , 
                   1 hole-equation(s) ) 
using Bank/Rose nonlinear solver.

Iteration   |Rhs|      factor     |step|     error   #inner  #iterative  time
------------------------------------------------------------------------------
    0      3.57e+02                                                      0.22
    1      6.93e-04   1.00e+00   6.19e-09   1.25e-04    0         1      0.50
Finished, because...
Error smaller than 1 ( 1.2499E-04 ).

Accumulated times:
Assembly time:        0.44 s
Solve time:      0.06 s
Total time:      0.50 s

contact        voltage     electron current    hole current  conduction current
 drain        8.000E-02       1.760E-04         6.676E-20        1.760E-04
 gateD        2.375E+00       2.382E-13         4.763E-33        2.382E-13
 gateS        2.375E+00       2.494E-13         3.847E-33        2.494E-13
 source       0.000E+00      -1.760E-04        -2.396E-24       -1.760E-04
 substrate    0.000E+00       6.766E-18        -1.815E-16       -1.748E-16

Computing step from t=0.05 to t=0.125 (Stepsize: 0.075) :
Extrapolating values for t = 0.125 ... done.
Computing Coupled( 1 poisson-equation(s) , 1 electron-equation(s) , 
                   1 hole-equation(s) ) 
using Bank/Rose nonlinear solver.

Iteration   |Rhs|      factor     |step|     error   #inner  #iterative  time
------------------------------------------------------------------------------
    0      1.69e+06                                                      0.22
    1      1.48e+07   1.00e+00   5.63e-03   2.90e+02    0         1      0.49
    2      1.95e+03   1.00e+00   7.89e-05   1.79e+00    0         1      0.76
    3      1.04e-03   1.00e+00   4.30e-08   8.70e-04    0         1      1.04
Finished, because...
Error smaller than 1 ( 8.7049E-04 ).

Accumulated times:
Assembly time:        0.87 s
Solve time:      0.17 s
Total time:      1.04 s

contact        voltage     electron current    hole current  conduction current
 drain        8.000E-02       1.705E-04         6.670E-20        1.705E-04
 gateD        2.188E+00       6.021E-14         4.502E-34        6.021E-14
 gateS        2.188E+00       6.335E-14         3.646E-34        6.335E-14
 source       0.000E+00      -1.705E-04        -2.349E-24       -1.705E-04
 substrate    0.000E+00      -1.743E-17        -1.813E-16       -1.988E-16

Computing step from t=0.125 to t=0.225 (Stepsize: 0.1) :
Extrapolating values for t = 0.225 ... done.
Computing Coupled( 1 poisson-equation(s) , 1 electron-equation(s) , 
                   1 hole-equation(s) ) 
using Bank/Rose nonlinear solver.

Iteration   |Rhs|      factor     |step|     error   #inner  #iterative  time
------------------------------------------------------------------------------
    0      3.16e+06                                                      0.19
    1      7.78e+07   1.00e+00   1.51e-02   8.01e+02    0         1      0.45
    2      7.56e+04   1.00e+00   5.63e-04   1.27e+01    0         1      0.71
    3      3.63e-01   1.00e+00   1.94e-06   3.93e-02    0         1      0.97
Finished, because...
Error smaller than 1 ( 3.9335E-02 ).

Accumulated times:
Assembly time:        0.82 s
Solve time:      0.15 s
Total time:      0.97 s

contact        voltage     electron current    hole current  conduction current
 drain        8.000E-02       1.605E-04         6.657E-20        1.605E-04
 gateD        1.938E+00       1.078E-14         2.807E-35        1.078E-14
 gateS        1.938E+00       1.146E-14         2.337E-35        1.146E-14
 source       0.000E+00      -1.605E-04        -2.645E-23       -1.605E-04
 substrate    0.000E+00      -2.742E-14        -1.810E-16       -2.760E-14

Computing step from t=0.225 to t=0.325 (Stepsize: 0.1) :
Extrapolating values for t = 0.325 ... done.
Computing Coupled( 1 poisson-equation(s) , 1 electron-equation(s) , 
                   1 hole-equation(s) ) 
using Bank/Rose nonlinear solver.

Iteration   |Rhs|      factor     |step|     error   #inner  #iterative  time
------------------------------------------------------------------------------
    0      4.02e+06                                                      0.18
    1      1.78e+08   1.00e+00   2.98e-02   1.65e+03    0         1      0.43
    2      6.86e+05   1.00e+00   2.17e-03   4.82e+01    0         1      0.67
    3      2.76e+01   1.00e+00   2.20e-05   4.50e-01    0         1      0.92
Finished, because...
Error smaller than 1 ( 4.5002E-01 ).

Accumulated times:
Assembly time:        0.76 s
Solve time:      0.16 s
Total time:      0.92 s

contact        voltage     electron current    hole current  conduction current
 drain        8.000E-02       1.448E-04         6.528E-20        1.448E-04
 gateD        1.688E+00       2.028E-15         2.503E-36        2.028E-15
 gateS        1.688E+00       2.197E-15         2.211E-36        2.197E-15
 source       0.000E+00      -1.448E-04        -2.843E-21       -1.448E-04
 substrate    0.000E+00       1.303E-12        -1.803E-16        1.303E-12

Computing step from t=0.325 to t=0.425 (Stepsize: 0.1) :
Extrapolating values for t = 0.425 ... done.
Computing Coupled( 1 poisson-equation(s) , 1 electron-equation(s) , 
                   1 hole-equation(s) ) 
using Bank/Rose nonlinear solver.

Iteration   |Rhs|      factor     |step|     error   #inner  #iterative  time
------------------------------------------------------------------------------
    0      4.65e+06                                                      0.17
    1      3.41e+08   1.00e+00   6.61e-02   4.09e+03    0         1      0.40
    2      7.21e+06   1.00e+00   1.06e-02   2.29e+02    0         1      0.63
    3      2.57e+03   1.00e+00   3.26e-04   7.06e+00    0         1      0.85
    4      1.23e-03   1.00e+00   2.01e-07   3.50e-03    0         1      1.08
Finished, because...
Error smaller than 1 ( 3.4977E-03 ).

Accumulated times:
Assembly time:        0.85 s
Solve time:      0.23 s
Total time:      1.08 s

contact        voltage     electron current    hole current  conduction current
 drain        8.000E-02       1.154E-04         6.608E-20        1.154E-04
 gateD        1.438E+00       3.478E-16         3.146E-37        3.478E-16
 gateS        1.438E+00       3.988E-16         3.088E-37        3.988E-16
 source       0.000E+00      -1.154E-04        -1.747E-24       -1.154E-04
 substrate    0.000E+00       5.754E-17        -1.789E-16       -1.213E-16

Computing step from t=0.425 to t=0.525 (Stepsize: 0.1) :
Extrapolating values for t = 0.525 ... done.
Computing Coupled( 1 poisson-equation(s) , 1 electron-equation(s) , 
                   1 hole-equation(s) ) 
using Bank/Rose nonlinear solver.

Iteration   |Rhs|      factor     |step|     error   #inner  #iterative  time
------------------------------------------------------------------------------
    0      5.03e+06                                                      0.15
    1      5.78e+08   1.00e+00   2.43e-01   3.84e+04    0         1      0.36
    2      3.01e+08   1.00e+00   1.21e-01   4.64e+03    0         1      0.57
    3      2.26e+08   1.00e+00   4.08e-02   2.70e+03    0         1      0.79
    4      3.54e+07   1.00e+00   4.03e-02   4.32e+03    0         1      1.00
    5      6.11e+07   1.00e+00   8.09e-02   4.07e+03    0         1      1.21
    6      2.09e+07   1.00e+00   3.51e-01   6.87e+05    0         1      1.43
    7      1.26e+07   1.00e+00   3.02e-01   5.91e+03    0         1      1.64
    8      1.26e+07   1.00e+00   2.33e-02   1.05e+03    0         1      1.85
    9      1.37e+06   1.00e+00   1.14e-02   4.76e+02    0         1      2.06
   10      2.88e+04   1.00e+00   1.24e-02   1.07e+03    0         1      2.27
   11      5.01e+02   1.00e+00   4.60e-02   6.11e+03    0         1      2.49
   12      2.82e+02   1.00e+00   5.10e-02   7.36e+02    0         1      2.70
   13      4.00e+01   1.00e+00   6.48e-03   2.41e+02    0         1      2.91
   14      7.26e-01   1.00e+00   1.72e-03   3.90e+01    0         1      3.13
   15      1.21e-02   1.00e+00   4.65e-04   4.25e+00    0         1      3.34
   16      5.22e-04   1.00e+00   1.47e-04   3.80e-01    0         1      3.55
Finished, because...
Error smaller than 1 ( 3.7966E-01 ).

Accumulated times:
Assembly time:        2.68 s
Solve time:      0.85 s
Total time:      3.55 s

contact        voltage     electron current    hole current  conduction current
 drain        8.000E-02       3.932E-05         6.525E-20        3.932E-05
 gateD        1.188E+00       2.895E-17         5.487E-38        2.895E-17
 gateS        1.188E+00       5.169E-17         6.608E-38        5.169E-17
 source       0.000E+00      -3.932E-05        -5.165E-25       -3.932E-05
 substrate    0.000E+00       1.034E-17        -1.730E-16       -1.627E-16

Computing step from t=0.525 to t=0.625 (Stepsize: 0.1) :
Extrapolating values for t = 0.625 ... done.
Computing Coupled( 1 poisson-equation(s) , 1 electron-equation(s) , 
                   1 hole-equation(s) ) 
using Bank/Rose nonlinear solver.

Iteration   |Rhs|      factor     |step|     error   #inner  #iterative  time
------------------------------------------------------------------------------
    0      1.47e+07                                                      0.13
    1      1.52e+08   1.00e+00   1.02e+00   3.88e+06    0         1      0.33
    2      1.82e+07   1.00e+00   5.22e-01   1.47e+04    0         1      0.53
    3      3.16e+06   1.00e+00   4.94e-02   3.73e+03    0         1      0.73
    4      4.47e+05   1.00e+00   8.39e-03   6.83e+02    0         1      0.93
    5      1.49e+03   1.00e+00   4.41e-04   3.49e+01    0         1      1.13
    6      2.66e-02   1.00e+00   1.44e-06   1.02e-01    0         1      1.33
Finished, because...
Error smaller than 1 ( 1.0197E-01 ).

Accumulated times:
Assembly time:        1.03 s
Solve time:      0.30 s
Total time:      1.33 s

contact        voltage     electron current    hole current  conduction current
 drain        8.000E-02       2.126E-07         6.482E-20        2.126E-07
 gateD        9.375E-01       1.598E-19         1.666E-38        1.598E-19
 gateS        9.375E-01       1.185E-18         1.992E-38        1.185E-18
 source       0.000E+00      -2.126E-07        -1.028E-26       -2.126E-07
 substrate    0.000E+00       9.237E-18        -1.689E-16       -1.596E-16

Computing step from t=0.625 to t=0.725 (Stepsize: 0.1) :
Extrapolating values for t = 0.725 ... done.
Computing Coupled( 1 poisson-equation(s) , 1 electron-equation(s) , 
                   1 hole-equation(s) ) 
using Bank/Rose nonlinear solver.

Iteration   |Rhs|      factor     |step|     error   #inner  #iterative  time
------------------------------------------------------------------------------
    0      9.74e+06                                                      0.12
    1      7.44e+07   1.00e+00   9.30e-01   2.49e+06    0         1      0.31
    2      7.59e+06   1.00e+00   5.18e-01   1.49e+04    0         1      0.50
    3      1.73e+05   1.00e+00   2.92e-02   1.86e+03    0         1      0.69
    4      8.04e+01   1.00e+00   1.68e-03   1.08e+02    0         1      0.88
    5      7.05e-04   1.00e+00   3.09e-04   2.30e-01    0         1      1.07
Finished, because...
Error smaller than 1 ( 2.3042E-01 ).

Accumulated times:
Assembly time:        0.77 s
Solve time:      0.30 s
Total time:      1.07 s

contact        voltage     electron current    hole current  conduction current
 drain        8.000E-02       2.027E-10         6.482E-20        2.027E-10
 gateD        6.875E-01       2.913E-22         2.712E-38        2.913E-22
 gateS        6.875E-01       4.443E-21         1.707E-38        4.443E-21
 source       0.000E+00      -2.027E-10        -9.937E-27       -2.027E-10
 substrate    0.000E+00      -3.974E-17        -1.721E-16       -2.118E-16

Computing step from t=0.725 to t=0.825 (Stepsize: 0.1) :
Extrapolating values for t = 0.825 ... done.
Computing Coupled( 1 poisson-equation(s) , 1 electron-equation(s) , 
                   1 hole-equation(s) ) 
using Bank/Rose nonlinear solver.

Iteration   |Rhs|      factor     |step|     error   #inner  #iterative  time
------------------------------------------------------------------------------
    0      9.30e+04                                                      0.12
    1      6.06e+07   1.00e+00   2.57e-01   4.77e+05    0         1      0.31
    2      1.75e+06   1.00e+00   1.57e-01   5.27e+03    0         1      0.49
    3      4.99e+03   1.00e+00   1.07e-02   4.48e+02    0         1      0.67
    4      2.25e-01   1.00e+00   4.66e-04   6.09e+00    0         1      0.86
    5      4.87e-04   1.00e+00   1.76e-06   6.03e-04    0         1      1.04
Finished, because...
Error smaller than 1 ( 6.0343E-04 ).

Accumulated times:
Assembly time:        0.76 s
Solve time:      0.27 s
Total time:      1.04 s

contact        voltage     electron current    hole current  conduction current
 drain        8.000E-02       1.837E-13         6.482E-20        1.837E-13
 gateD        4.375E-01       4.899E-25         4.323E-39        4.899E-25
 gateS        4.375E-01       1.044E-23         1.257E-38        1.044E-23
 source       0.000E+00      -1.835E-13        -6.915E-27       -1.835E-13
 substrate    0.000E+00      -1.732E-20        -1.757E-16       -1.757E-16

Computing step from t=0.825 to t=0.925 (Stepsize: 0.1) :
Extrapolating values for t = 0.925 ... done.
Computing Coupled( 1 poisson-equation(s) , 1 electron-equation(s) , 
                   1 hole-equation(s) ) 
using Bank/Rose nonlinear solver.

Iteration   |Rhs|      factor     |step|     error   #inner  #iterative  time
------------------------------------------------------------------------------
    0      1.11e+02                                                      0.12
    1      4.68e+07   1.00e+00   1.36e-01   1.62e+04    0         1      0.29
    2      1.25e+07   1.00e+00   4.32e-02   2.41e+03    0         1      0.47
    3      1.56e+06   1.00e+00   9.59e-03   8.90e+02    0         1      0.65
    4      1.72e+04   1.00e+00   1.22e-03   7.87e+01    0         1      0.83
    5      1.99e+00   1.00e+00   1.39e-05   9.37e-01    0         1      1.01
Finished, because...
Error smaller than 1 ( 9.3722E-01 ).

Accumulated times:
Assembly time:        0.75 s
Solve time:      0.26 s
Total time:      1.01 s

contact        voltage     electron current    hole current  conduction current
 drain        8.000E-02       3.783E-16         6.482E-20        3.783E-16
 gateD        1.875E-01       9.787E-28         6.100E-41        9.787E-28
 gateS        1.875E-01       2.697E-26         1.531E-40        2.697E-26
 source       0.000E+00      -2.017E-16        -4.262E-24       -2.017E-16
 substrate    0.000E+00      -4.978E-21        -1.766E-16       -1.766E-16

Computing step from t=0.925 to t=1 (Stepsize: 0.075) :
Extrapolating values for t = 1 ... done.
Computing Coupled( 1 poisson-equation(s) , 1 electron-equation(s) , 
                   1 hole-equation(s) ) 
using Bank/Rose nonlinear solver.

Iteration   |Rhs|      factor     |step|     error   #inner  #iterative  time
------------------------------------------------------------------------------
    0      7.29e-01                                                      0.11
    1      1.14e+07   1.00e+00   1.30e-01   1.33e+04    0         1      0.28
    2      2.54e+06   1.00e+00   3.69e-02   1.25e+03    0         1      0.46
    3      1.60e+04   1.00e+00   1.96e-03   1.22e+02    0         1      0.63
    4      1.03e+00   1.00e+00   3.32e-05   2.47e+00    0         1      0.80
    5      5.99e-04   1.00e+00   1.52e-09   6.84e-05    0         1      0.98
Finished, because...
Error smaller than 1 ( 6.8376E-05 ).

Accumulated times:
Assembly time:        0.71 s
Solve time:      0.27 s
Total time:      0.98 s

contact        voltage     electron current    hole current  conduction current
 drain        8.000E-02       1.817E-16         6.482E-20        1.818E-16
 gateD        0.000E+00      -2.569E-28        -3.984E-45       -2.569E-28
 gateS        0.000E+00      -1.594E-32        -2.435E-51       -1.594E-32
 source       0.000E+00      -2.023E-18        -4.087E-27       -2.023E-18
 substrate    0.000E+00      -1.727E-20        -1.798E-16       -1.798E-16


Finished, because...
Curve trace finished.


===============================
Starting solve of next problem:
Quasistationary ( Digits : 5, Max. #iterations : 20, 
      Initial step in t : 0.1, 
      Minimum step in t : 1.0000e-05, Maximum step in t : 1, 
      Increment : 1.5, Decrement : 2, 
      Goal values :
        Contact drain : 0.7V
    )
  {
    Coupled ( Digits : 5, Max. #iterations : 20, 
        Solver : blocked decomposition,
        #undamped iterations : 1000 
        )
        { Poisson Electron Hole } 
  }
===============================

Computing step from t=0.0000e+00 to t=0.1 (Stepsize: 0.1) :
Computing Coupled( 1 poisson-equation(s) , 1 electron-equation(s) , 
                   1 hole-equation(s) ) 
using Bank/Rose nonlinear solver.

Iteration   |Rhs|      factor     |step|     error   #inner  #iterative  time
------------------------------------------------------------------------------
    0      4.66e+10                                                      0.11
    1      7.12e+10   1.00e+00   1.20e+00   1.37e+06    0         1      0.29
    2      2.10e+10   1.00e+00   8.37e-01   1.31e+04    0         1      0.47
    3      3.37e+09   1.00e+00   7.67e-01   2.84e+03    0         1      0.64
    4      1.42e+07   1.00e+00   3.19e-01   3.11e+02    0         1      0.81
    5      1.36e+03   1.00e+00   6.40e-02   1.59e+00    0         1      0.99
    6      6.13e-04   1.00e+00   6.85e-02   4.74e-03    0         1      1.16
Finished, because...
Error smaller than 1 ( 4.7364E-03 ).

Accumulated times:
Assembly time:        0.82 s
Solve time:      0.33 s
Total time:      1.16 s

contact        voltage     electron current    hole current  conduction current
 drain        1.420E-01       2.680E-16         4.717E-20        2.680E-16
 gateD        0.000E+00      -4.563E-28        -9.793E-45       -4.563E-28
 gateS        0.000E+00      -1.722E-32        -3.633E-51       -1.722E-32
 source       0.000E+00      -2.149E-18        -3.225E-26       -2.149E-18
 substrate    0.000E+00      -1.741E-20        -2.658E-16       -2.658E-16

Computing step from t=0.1 to t=0.233333 (Stepsize: 0.133333) :
Extrapolating values for t = 0.233333 ... done.
Computing Coupled( 1 poisson-equation(s) , 1 electron-equation(s) , 
                   1 hole-equation(s) ) 
using Bank/Rose nonlinear solver.

Iteration   |Rhs|      factor     |step|     error   #inner  #iterative  time
------------------------------------------------------------------------------
    0      2.40e-01                                                      0.11
    1      1.11e+06   1.00e+00   4.94e-01   5.08e+02    0         1      0.29
    2      2.06e+02   1.00e+00   5.75e-01   9.38e+00    0         1      0.46
    3      7.15e-04   1.00e+00   1.28e-01   8.91e-03    0         1      0.63
Finished, because...
Error smaller than 1 ( 8.9142E-03 ).

Accumulated times:
Assembly time:        0.46 s
Solve time:      0.16 s
Total time:      0.63 s

contact        voltage     electron current    hole current  conduction current
 drain        2.247E-01       3.677E-16         9.409E-20        3.678E-16
 gateD        0.000E+00      -9.162E-28        -2.636E-44       -9.162E-28
 gateS        0.000E+00      -1.900E-32        -5.074E-51       -1.900E-32
 source       0.000E+00      -2.323E-18        -2.753E-26       -2.323E-18
 substrate    0.000E+00      -1.768E-20        -3.654E-16       -3.654E-16

Computing step from t=0.233333 to t=0.424444 (Stepsize: 0.191111) :
Extrapolating values for t = 0.424444 ... done.
Computing Coupled( 1 poisson-equation(s) , 1 electron-equation(s) , 
                   1 hole-equation(s) ) 
using Bank/Rose nonlinear solver.

Iteration   |Rhs|      factor     |step|     error   #inner  #iterative  time
------------------------------------------------------------------------------
    0      4.97e-01                                                      0.11
    1      2.86e+06   1.00e+00   4.44e-01   9.67e+02    0         1      0.29
    2      1.25e+03   1.00e+00   3.46e-01   3.60e+01    0         1      0.46
    3      7.15e-04   1.00e+00   1.60e-01   7.30e-02    0         1      0.64
Finished, because...
Error smaller than 1 ( 7.2955E-02 ).

Accumulated times:
Assembly time:        0.48 s
Solve time:      0.16 s
Total time:      0.64 s

contact        voltage     electron current    hole current  conduction current
 drain        3.432E-01       4.979E-16         9.214E-20        4.980E-16
 gateD        0.000E+00      -2.401E-27        -7.608E-45       -2.401E-27
 gateS        0.000E+00      -2.162E-32        -7.057E-51       -2.162E-32
 source       0.000E+00      -2.594E-18        -8.457E-26       -2.594E-18
 substrate    0.000E+00      -1.732E-20        -4.954E-16       -4.954E-16

Computing step from t=0.424444 to t=0.69837 (Stepsize: 0.273926) :
Extrapolating values for t = 0.69837 ... done.
Computing Coupled( 1 poisson-equation(s) , 1 electron-equation(s) , 
                   1 hole-equation(s) ) 
using Bank/Rose nonlinear solver.

Iteration   |Rhs|      factor     |step|     error   #inner  #iterative  time
------------------------------------------------------------------------------
    0      9.96e-01                                                      0.12
    1      1.08e+07   1.00e+00   5.74e-01   1.87e+03    0         1      0.29
    2      1.79e+04   1.00e+00   5.05e-01   1.28e+02    0         1      0.47
    3      5.25e-02   1.00e+00   1.17e-01   2.92e-01    0         1      0.64
Finished, because...
Error smaller than 1 ( 2.9209E-01 ).

Accumulated times:
Assembly time:        0.47 s
Solve time:      0.17 s
Total time:      0.64 s

contact        voltage     electron current    hole current  conduction current
 drain        5.130E-01       6.469E-16         4.458E-20        6.470E-16
 gateD        0.000E+00      -9.066E-27        -9.627E-45       -9.066E-27
 gateS        0.000E+00      -2.617E-32        -9.662E-51       -2.617E-32
 source       0.000E+00      -3.015E-18         8.432E-27       -3.015E-18
 substrate    0.000E+00       5.624E-19        -6.445E-16       -6.440E-16

Computing step from t=0.69837 to t=1 (Stepsize: 0.30163) :
Extrapolating values for t = 1 ... done.
Computing Coupled( 1 poisson-equation(s) , 1 electron-equation(s) , 
                   1 hole-equation(s) ) 
using Bank/Rose nonlinear solver.

Iteration   |Rhs|      factor     |step|     error   #inner  #iterative  time
------------------------------------------------------------------------------
    0      1.18e+00                                                      0.11
    1      1.67e+07   1.00e+00   3.94e-01   2.29e+03    0         1      0.29
    2      4.50e+04   1.00e+00   3.23e-01   1.74e+02    0         1      0.46
    3      4.63e-01   1.00e+00   7.70e-02   5.96e-01    0         1      0.64
Finished, because...
Error smaller than 1 ( 5.9567E-01 ).

Accumulated times:
Assembly time:        0.48 s
Solve time:      0.16 s
Total time:      0.64 s

contact        voltage     electron current    hole current  conduction current
 drain        7.000E-01       8.539E-16         9.091E-20        8.540E-16
 gateD        0.000E+00      -3.700E-26        -5.011E-44       -3.700E-26
 gateS        0.000E+00      -3.215E-32        -1.303E-50       -3.215E-32
 source       0.000E+00      -3.549E-18        -3.805E-26       -3.549E-18
 substrate    0.000E+00       4.817E-19        -8.509E-16       -8.504E-16


Finished, because...
Curve trace finished.


===============================
Starting solve of next problem:
Quasistationary ( Digits : 5, Max. #iterations : 20, 
      Initial step in t : 0.01, 
      Minimum step in t : 1.0000e-05, Maximum step in t : 0.05, 
      Increment : 1.5, Decrement : 2, 
      DoZero      Goal values :
        Contact gateD : 2.5V,
        Contact gateS : 2.5V
    )
  {
    Coupled ( Digits : 5, Max. #iterations : 20, 
        Solver : blocked decomposition,
        #undamped iterations : 1000 
        )
        { Poisson Electron Hole } 
    Plot( FilePrefix = "n21_Profile_HighVd" nooverwrite -loadable
         Time (fixed times:
             0.0000e+00 0.2 0.3 0.4 0.5
             1) )
      { }
  }
===============================

Computing solution for t=0 :
Computing Coupled( 1 poisson-equation(s) , 1 electron-equation(s) , 
                   1 hole-equation(s) ) 
using Bank/Rose nonlinear solver.

Iteration   |Rhs|      factor     |step|     error   #inner  #iterative  time
------------------------------------------------------------------------------
    0      4.63e-01                                                      0.00
    1      5.36e-04   1.00e+00   1.35e-02   4.43e-02    0         1      0.18
Finished, because...
Error smaller than 1 ( 4.4321E-02 ).

Accumulated times:
Assembly time:        0.12 s
Solve time:      0.06 s
Total time:      0.18 s

contact        voltage     electron current    hole current  conduction current
 drain        7.000E-01       8.544E-16         6.858E-20        8.544E-16
 gateD        0.000E+00      -3.700E-26        -5.458E-44       -3.700E-26
 gateS        0.000E+00      -3.213E-32        -1.303E-50       -3.213E-32
 source       0.000E+00      -3.547E-18         3.265E-26       -3.547E-18
 substrate    0.000E+00      -1.066E-20        -8.509E-16       -8.509E-16


Plot started:
Saving device '':
    Writing plot 'n21_Profile_HighVd_0000_des.tdr' (TDR format) ... done.
Plot finished.

Computing step from t=0.0000e+00 to t=0.01 (Stepsize: 0.01) :
Computing Coupled( 1 poisson-equation(s) , 1 electron-equation(s) , 
                   1 hole-equation(s) ) 
using Bank/Rose nonlinear solver.

Iteration   |Rhs|      factor     |step|     error   #inner  #iterative  time
------------------------------------------------------------------------------
    0      5.44e+01                                                      0.12
    1      1.64e+06   1.00e+00   2.63e-01   2.33e+04    0         1      0.30
    2      1.11e+04   1.00e+00   5.53e-02   4.13e+03    0         1      0.47
    3      6.61e+00   1.00e+00   2.27e-03   2.07e+02    0         1      0.65
    4      9.79e-04   1.00e+00   5.06e-06   4.45e-01    0         1      0.83
Finished, because...
Error smaller than 1 ( 4.4455E-01 ).

Accumulated times:
Assembly time:        0.61 s
Solve time:      0.22 s
Total time:      0.83 s

contact        voltage     electron current    hole current  conduction current
 drain        7.000E-01       8.559E-16         6.846E-20        8.559E-16
 gateD        2.500E-02      -2.606E-26        -2.628E-44       -2.606E-26
 gateS        2.500E-02       4.429E-28         6.306E-42        4.429E-28
 source       0.000E+00      -6.386E-18         4.098E-24       -6.386E-18
 substrate    0.000E+00      -1.798E-20        -8.495E-16       -8.496E-16

Computing step from t=0.01 to t=0.024 (Stepsize: 0.014) :
Extrapolating values for t = 0.024 ... done.
Computing Coupled( 1 poisson-equation(s) , 1 electron-equation(s) , 
                   1 hole-equation(s) ) 
using Bank/Rose nonlinear solver.

Iteration   |Rhs|      factor     |step|     error   #inner  #iterative  time
------------------------------------------------------------------------------
    0      6.68e-03                                                      0.12
    1      8.21e+03   1.00e+00   9.66e-03   3.65e+02    0         1      0.30
    2      6.87e-01   1.00e+00   4.54e-04   3.24e+00    0         1      0.48
    3      6.05e-04   1.00e+00   6.97e-06   2.03e-04    0         1      0.66
Finished, because...
Error smaller than 1 ( 2.0269E-04 ).

Accumulated times:
Assembly time:        0.49 s
Solve time:      0.17 s
Total time:      0.66 s

contact        voltage     electron current    hole current  conduction current
 drain        7.000E-01       8.628E-16         6.846E-20        8.629E-16
 gateD        6.000E-02      -1.601E-26         2.060E-44       -1.601E-26
 gateS        6.000E-02       1.438E-27         1.580E-41        1.438E-27
 source       0.000E+00      -1.514E-17        -1.613E-26       -1.514E-17
 substrate    0.000E+00      -1.799E-20        -8.477E-16       -8.477E-16

Computing step from t=0.024 to t=0.0440667 (Stepsize: 0.0200667) :
Extrapolating values for t = 0.0440667 ... done.
Computing Coupled( 1 poisson-equation(s) , 1 electron-equation(s) , 
                   1 hole-equation(s) ) 
using Bank/Rose nonlinear solver.

Iteration   |Rhs|      factor     |step|     error   #inner  #iterative  time
------------------------------------------------------------------------------
    0      1.60e-02                                                      0.12
    1      3.77e+04   1.00e+00   1.77e-02   6.62e+02    0         1      0.30
    2      7.40e+00   1.00e+00   1.23e-03   1.07e+01    0         1      0.48
    3      8.04e-04   1.00e+00   4.63e-05   2.08e-03    0         1      0.66
Finished, because...
Error smaller than 1 ( 2.0790E-03 ).

Accumulated times:
Assembly time:        0.51 s
Solve time:      0.15 s
Total time:      0.66 s

contact        voltage     electron current    hole current  conduction current
 drain        7.000E-01       9.002E-16         6.845E-20        9.002E-16
 gateD        1.102E-01      -8.011E-27         8.058E-44       -8.011E-27
 gateS        1.102E-01       4.976E-27         3.854E-41        4.976E-27
 source       0.000E+00      -5.508E-17         7.574E-27       -5.508E-17
 substrate    0.000E+00      -1.799E-20        -8.451E-16       -8.451E-16

Computing step from t=0.0440667 to t=0.0728289 (Stepsize: 0.0287622) :
Extrapolating values for t = 0.0728289 ... done.
Computing Coupled( 1 poisson-equation(s) , 1 electron-equation(s) , 
                   1 hole-equation(s) ) 
using Bank/Rose nonlinear solver.

Iteration   |Rhs|      factor     |step|     error   #inner  #iterative  time
------------------------------------------------------------------------------
    0      4.03e-02                                                      0.12
    1      2.32e+05   1.00e+00   3.12e-02   1.17e+03    0         1      0.30
    2      4.98e+01   1.00e+00   3.57e-03   3.34e+01    0         1      0.48
    3      8.25e-04   1.00e+00   9.67e-05   1.79e-02    0         1      0.66
Finished, because...
Error smaller than 1 ( 1.7908E-02 ).

Accumulated times:
Assembly time:        0.51 s
Solve time:      0.15 s
Total time:      0.66 s

contact        voltage     electron current    hole current  conduction current
 drain        7.000E-01       1.217E-15         6.840E-20        1.217E-15
 gateD        1.821E-01      -2.990E-27         2.351E-43       -2.990E-27
 gateS        1.821E-01       2.629E-26         1.287E-40        2.629E-26
 source       0.000E+00      -3.755E-16         1.261E-25       -3.755E-16
 substrate    0.000E+00      -1.799E-20        -8.415E-16       -8.415E-16

Computing step from t=0.0728289 to t=0.114055 (Stepsize: 0.0412259) :
Extrapolating values for t = 0.114055 ... done.
Computing Coupled( 1 poisson-equation(s) , 1 electron-equation(s) , 
                   1 hole-equation(s) ) 
using Bank/Rose nonlinear solver.

Iteration   |Rhs|      factor     |step|     error   #inner  #iterative  time
------------------------------------------------------------------------------
    0      1.04e-01                                                      0.11
    1      1.88e+06   1.00e+00   4.52e-02   1.98e+03    0         1      0.30
    2      2.57e+03   1.00e+00   8.39e-03   9.30e+01    0         1      0.48
    3      8.48e-04   1.00e+00   6.43e-04   1.42e-01    0         1      0.66
Finished, because...
Error smaller than 1 ( 1.4196E-01 ).

Accumulated times:
Assembly time:        0.49 s
Solve time:      0.17 s
Total time:      0.66 s

contact        voltage     electron current    hole current  conduction current
 drain        7.000E-01       7.218E-15         6.651E-20        7.218E-15
 gateD        2.851E-01      -5.125E-28         8.223E-43       -5.125E-28
 gateS        2.851E-01       2.880E-25         7.546E-40        2.880E-25
 source       0.000E+00      -6.382E-15         2.120E-24       -6.382E-15
 substrate    0.000E+00      -1.774E-20        -8.361E-16       -8.362E-16

Computing step from t=0.114055 to t=0.164055 (Stepsize: 0.05) :
Extrapolating values for t = 0.164055 ... done.
Computing Coupled( 1 poisson-equation(s) , 1 electron-equation(s) , 
                   1 hole-equation(s) ) 
using Bank/Rose nonlinear solver.

Iteration   |Rhs|      factor     |step|     error   #inner  #iterative  time
------------------------------------------------------------------------------
    0      1.89e-01                                                      0.12
    1      6.26e+06   1.00e+00   6.49e-02   2.43e+03    0         1      0.30
    2      3.86e+04   1.00e+00   1.97e-02   1.39e+02    0         1      0.49
    3      3.55e-01   1.00e+00   5.01e-03   7.57e-01    0         1      0.67
Finished, because...
Error smaller than 1 ( 7.5674E-01 ).

Accumulated times:
Assembly time:        0.51 s
Solve time:      0.16 s
Total time:      0.67 s

contact        voltage     electron current    hole current  conduction current
 drain        7.000E-01       2.139E-13         3.524E-20        2.139E-13
 gateD        4.101E-01       1.020E-26         3.646E-42        1.020E-26
 gateS        4.101E-01       6.087E-24         7.029E-39        6.087E-24
 source       0.000E+00      -2.131E-13        -1.503E-24       -2.131E-13
 substrate    0.000E+00       1.878E-19        -8.303E-16       -8.301E-16

Computing step from t=0.164055 to t=0.2 (Stepsize: 0.0359453) :
Extrapolating values for t = 0.2 ... done.
Computing Coupled( 1 poisson-equation(s) , 1 electron-equation(s) , 
                   1 hole-equation(s) ) 
using Bank/Rose nonlinear solver.

Iteration   |Rhs|      factor     |step|     error   #inner  #iterative  time
------------------------------------------------------------------------------
    0      1.41e+00                                                      0.12
    1      3.48e+06   1.00e+00   3.96e-02   1.26e+03    0         1      0.31
    2      8.24e+03   1.00e+00   6.81e-03   4.73e+01    0         1      0.49
    3      2.28e-02   1.00e+00   3.24e-04   6.39e-01    0         1      0.68
Finished, because...
Error smaller than 1 ( 6.3876E-01 ).

Accumulated times:
Assembly time:        0.52 s
Solve time:      0.15 s
Total time:      0.68 s

contact        voltage     electron current    hole current  conduction current
 drain        7.000E-01       2.728E-12         6.834E-20        2.728E-12
 gateD        5.000E-01       1.611E-25         1.133E-41        1.611E-25
 gateS        5.000E-01       5.611E-23         1.209E-38        5.611E-23
 source       0.000E+00      -2.727E-12        -5.083E-25       -2.727E-12
 substrate    0.000E+00       9.141E-20        -8.235E-16       -8.235E-16


Plot started:
Saving device '':
    Writing plot 'n21_Profile_HighVd_0001_des.tdr' (TDR format) ... done.
Plot finished.

Computing step from t=0.2 to t=0.25 (Stepsize: 0.05) :
Extrapolating values for t = 0.25 ... done.
Computing Coupled( 1 poisson-equation(s) , 1 electron-equation(s) , 
                   1 hole-equation(s) ) 
using Bank/Rose nonlinear solver.

Iteration   |Rhs|      factor     |step|     error   #inner  #iterative  time
------------------------------------------------------------------------------
    0      9.11e+01                                                      0.12
    1      9.98e+06   1.00e+00   7.43e-02   1.81e+03    0         1      0.31
    2      1.53e+05   1.00e+00   1.74e-02   1.98e+02    0         1      0.50
    3      6.89e+00   1.00e+00   5.66e-03   4.87e+00    0         1      0.68
    4      6.87e-04   1.00e+00   7.64e-04   7.57e-03    0         1      0.87
Finished, because...
Error smaller than 1 ( 7.5712E-03 ).

Accumulated times:
Assembly time:        0.65 s
Solve time:      0.21 s
Total time:      0.87 s

contact        voltage     electron current    hole current  conduction current
 drain        7.000E-01       9.634E-11         6.845E-20        9.634E-11
 gateD        6.250E-01       7.365E-24         6.333E-41        7.365E-24
 gateS        6.250E-01       1.184E-21         2.840E-38        1.184E-21
 source       0.000E+00      -9.634E-11        -1.273E-26       -9.634E-11
 substrate    0.000E+00      -1.813E-20        -7.974E-16       -7.975E-16

Computing step from t=0.25 to t=0.3 (Stepsize: 0.05) :
Extrapolating values for t = 0.3 ... done.
Computing Coupled( 1 poisson-equation(s) , 1 electron-equation(s) , 
                   1 hole-equation(s) ) 
using Bank/Rose nonlinear solver.

Iteration   |Rhs|      factor     |step|     error   #inner  #iterative  time
------------------------------------------------------------------------------
    0      3.48e+03                                                      0.12
    1      2.13e+07   1.00e+00   1.16e-01   2.43e+03    0         1      0.31
    2      6.65e+05   1.00e+00   2.72e-02   3.04e+02    0         1      0.50
    3      1.34e+02   1.00e+00   1.82e-03   8.03e+00    0         1      0.69
    4      5.81e-04   1.00e+00   6.72e-05   1.47e-02    0         1      0.88
Finished, because...
Error smaller than 1 ( 1.4744E-02 ).

Accumulated times:
Assembly time:        0.66 s
Solve time:      0.20 s
Total time:      0.88 s

contact        voltage     electron current    hole current  conduction current
 drain        7.000E-01       3.405E-09         6.846E-20        3.405E-09
 gateD        7.500E-01       3.326E-22         4.038E-40        3.326E-22
 gateS        7.500E-01       2.321E-20         9.876E-39        2.321E-20
 source       0.000E+00      -3.405E-09         4.136E-27       -3.405E-09
 substrate    0.000E+00       1.694E-20        -7.780E-16       -7.780E-16


Plot started:
Saving device '':
    Writing plot 'n21_Profile_HighVd_0002_des.tdr' (TDR format) ... done.
Plot finished.

Computing step from t=0.3 to t=0.35 (Stepsize: 0.05) :
Extrapolating values for t = 0.35 ... done.
Computing Coupled( 1 poisson-equation(s) , 1 electron-equation(s) , 
                   1 hole-equation(s) ) 
using Bank/Rose nonlinear solver.

Iteration   |Rhs|      factor     |step|     error   #inner  #iterative  time
------------------------------------------------------------------------------
    0      8.20e+04                                                      0.14
    1      4.12e+07   1.00e+00   7.64e-02   3.08e+03    0         1      0.33
    2      5.90e+05   1.00e+00   3.58e-02   3.23e+02    0         1      0.53
    3      9.74e+01   1.00e+00   9.88e-03   1.23e+02    0         1      0.72
    4      3.26e-03   1.00e+00   1.69e-03   1.91e+00    0         1      0.92
    5      1.15e-03   1.00e+00   4.21e-05   5.97e-04    0         1      1.12
Finished, because...
Error smaller than 1 ( 5.9657E-04 ).

Accumulated times:
Assembly time:        0.84 s
Solve time:      0.26 s
Total time:      1.12 s

contact        voltage     electron current    hole current  conduction current
 drain        7.000E-01       1.162E-07         6.846E-20        1.162E-07
 gateD        8.750E-01       1.437E-20         2.758E-39        1.437E-20
 gateS        8.750E-01       3.928E-19         1.530E-38        3.928E-19
 source       0.000E+00      -1.162E-07         3.903E-27       -1.162E-07
 substrate    0.000E+00       4.620E-19        -7.640E-16       -7.636E-16

Computing step from t=0.35 to t=0.4 (Stepsize: 0.05) :
Extrapolating values for t = 0.4 ... done.
Computing Coupled( 1 poisson-equation(s) , 1 electron-equation(s) , 
                   1 hole-equation(s) ) 
using Bank/Rose nonlinear solver.

Iteration   |Rhs|      factor     |step|     error   #inner  #iterative  time
------------------------------------------------------------------------------
    0      3.97e+06                                                      0.14
    1      9.59e+07   1.00e+00   8.99e-02   7.35e+03    0         1      0.34
    2      2.69e+07   1.00e+00   2.91e-02   7.34e+02    0         1      0.54
    3      6.27e+05   1.00e+00   6.79e-03   7.73e+01    0         1      0.74
    4      5.67e+02   1.00e+00   1.85e-04   7.49e+00    0         1      0.94
    5      1.85e-03   1.00e+00   6.05e-07   1.82e-02    0         1      1.14
Finished, because...
Error smaller than 1 ( 1.8214E-02 ).

Accumulated times:
Assembly time:        0.87 s
Solve time:      0.27 s
Total time:      1.14 s

contact        voltage     electron current    hole current  conduction current
 drain        7.000E-01       3.291E-06         6.849E-20        3.291E-06
 gateD        1.000E+00       5.077E-19         7.388E-39        5.077E-19
 gateS        1.000E+00       4.710E-18         2.558E-38        4.710E-18
 source       0.000E+00      -3.291E-06        -4.903E-26       -3.291E-06
 substrate    0.000E+00      -8.428E-18        -7.546E-16       -7.630E-16


Plot started:
Saving device '':
    Writing plot 'n21_Profile_HighVd_0003_des.tdr' (TDR format) ... done.
Plot finished.

Computing step from t=0.4 to t=0.45 (Stepsize: 0.05) :
Extrapolating values for t = 0.45 ... done.
Computing Coupled( 1 poisson-equation(s) , 1 electron-equation(s) , 
                   1 hole-equation(s) ) 
using Bank/Rose nonlinear solver.

Iteration   |Rhs|      factor     |step|     error   #inner  #iterative  time
------------------------------------------------------------------------------
    0      6.92e+07                                                      0.14
    1      1.95e+08   1.00e+00   2.54e-01   3.86e+04    0         1      0.34
    2      1.93e+08   1.00e+00   8.53e-02   4.41e+03    0         1      0.54
    3      8.50e+07   1.00e+00   3.51e-02   2.27e+03    0         1      0.75
    4      1.21e+07   1.00e+00   6.83e-03   3.88e+02    0         1      0.95
    5      1.99e+05   1.00e+00   8.04e-04   5.02e+01    0         1      1.16
    6      5.63e+01   1.00e+00   2.02e-05   1.25e+00    0         1      1.36
    7      5.41e-04   1.00e+00   4.46e-09   2.79e-04    0         1      1.56
Finished, because...
Error smaller than 1 ( 2.7941E-04 ).

Accumulated times:
Assembly time:        1.18 s
Solve time:      0.38 s
Total time:      1.56 s

contact        voltage     electron current    hole current  conduction current
 drain        7.000E-01       3.616E-05         6.883E-20        3.616E-05
 gateD        1.125E+00       6.744E-18         1.223E-38        6.744E-18
 gateS        1.125E+00       2.733E-17         4.612E-38        2.733E-17
 source       0.000E+00      -3.616E-05        -4.917E-25       -3.616E-05
 substrate    0.000E+00       1.481E-18        -7.542E-16       -7.528E-16

Computing step from t=0.45 to t=0.5 (Stepsize: 0.05) :
Extrapolating values for t = 0.5 ... done.
Computing Coupled( 1 poisson-equation(s) , 1 electron-equation(s) , 
                   1 hole-equation(s) ) 
using Bank/Rose nonlinear solver.

Iteration   |Rhs|      factor     |step|     error   #inner  #iterative  time
------------------------------------------------------------------------------
    0      2.91e+08                                                      0.15
    1      1.89e+08   1.00e+00   2.48e-01   3.79e+04    0         1      0.36
    2      5.91e+07   1.00e+00   7.19e-02   2.22e+03    0         1      0.56
    3      2.69e+06   1.00e+00   9.20e-03   3.67e+02    0         1      0.77
    4      7.60e+03   1.00e+00   4.07e-04   1.65e+01    0         1      0.98
    5      7.30e-02   1.00e+00   8.60e-07   3.61e-02    0         1      1.19
Finished, because...
Error smaller than 1 ( 3.6148E-02 ).

Accumulated times:
Assembly time:        0.91 s
Solve time:      0.28 s
Total time:      1.19 s

contact        voltage     electron current    hole current  conduction current
 drain        7.000E-01       1.159E-04         6.967E-20        1.159E-04
 gateD        1.250E+00       2.760E-17         2.794E-38        2.760E-17
 gateS        1.250E+00       8.112E-17         8.560E-38        8.112E-17
 source       0.000E+00      -1.159E-04        -2.490E-24       -1.159E-04
 substrate    0.000E+00      -2.482E-16        -7.644E-16       -1.013E-15


Plot started:
Saving device '':
    Writing plot 'n21_Profile_HighVd_0004_des.tdr' (TDR format) ... done.
Plot finished.

Computing step from t=0.5 to t=0.55 (Stepsize: 0.05) :
Extrapolating values for t = 0.55 ... done.
Computing Coupled( 1 poisson-equation(s) , 1 electron-equation(s) , 
                   1 hole-equation(s) ) 
using Bank/Rose nonlinear solver.

Iteration   |Rhs|      factor     |step|     error   #inner  #iterative  time
------------------------------------------------------------------------------
    0      1.36e+08                                                      0.15
    1      6.91e+07   1.00e+00   1.10e-01   9.66e+03    0         1      0.37
    2      1.96e+06   1.00e+00   1.41e-02   3.76e+02    0         1      0.58
    3      1.45e+03   1.00e+00   2.83e-04   8.38e+00    0         1      0.79
    4      1.05e-03   1.00e+00   1.72e-07   4.97e-03    0         1      1.01
Finished, because...
Error smaller than 1 ( 4.9696E-03 ).

Accumulated times:
Assembly time:        0.79 s
Solve time:      0.22 s
Total time:      1.01 s

contact        voltage     electron current    hole current  conduction current
 drain        7.000E-01       2.188E-04         7.078E-20        2.188E-04
 gateD        1.375E+00       7.085E-17         2.478E-38        7.085E-17
 gateS        1.375E+00       1.825E-16         1.638E-37        1.825E-16
 source       0.000E+00      -2.188E-04        -3.072E-24       -2.188E-04
 substrate    0.000E+00      -1.344E-17        -7.771E-16       -7.906E-16

Computing step from t=0.55 to t=0.6 (Stepsize: 0.05) :
Extrapolating values for t = 0.6 ... done.
Computing Coupled( 1 poisson-equation(s) , 1 electron-equation(s) , 
                   1 hole-equation(s) ) 
using Bank/Rose nonlinear solver.

Iteration   |Rhs|      factor     |step|     error   #inner  #iterative  time
------------------------------------------------------------------------------
    0      5.61e+07                                                      0.15
    1      2.97e+07   1.00e+00   5.28e-02   3.45e+03    0         1      0.38
    2      1.31e+05   1.00e+00   3.28e-03   7.92e+01    0         1      0.60
    3      3.11e+00   1.00e+00   2.08e-05   3.47e-01    0         1      0.82
Finished, because...
Error smaller than 1 ( 3.4678E-01 ).

Accumulated times:
Assembly time:        0.64 s
Solve time:      0.18 s
Total time:      0.82 s

contact        voltage     electron current    hole current  conduction current
 drain        7.000E-01       3.308E-04         7.202E-20        3.308E-04
 gateD        1.500E+00       1.516E-16         3.742E-38        1.516E-16
 gateS        1.500E+00       3.647E-16         3.254E-37        3.647E-16
 source       0.000E+00      -3.308E-04        -3.119E-22       -3.308E-04
 substrate    0.000E+00      -6.047E-14        -7.891E-16       -6.125E-14

Computing step from t=0.6 to t=0.65 (Stepsize: 0.05) :
Extrapolating values for t = 0.65 ... done.
Computing Coupled( 1 poisson-equation(s) , 1 electron-equation(s) , 
                   1 hole-equation(s) ) 
using Bank/Rose nonlinear solver.

Iteration   |Rhs|      factor     |step|     error   #inner  #iterative  time
------------------------------------------------------------------------------
    0      4.14e+07                                                      0.16
    1      1.59e+07   1.00e+00   3.65e-02   1.70e+03    0         1      0.39
    2      1.73e+04   1.00e+00   1.56e-03   2.70e+01    0         1      0.62
    3      3.87e-02   1.00e+00   1.66e-05   4.02e-02    0         1      0.84
Finished, because...
Error smaller than 1 ( 4.0243E-02 ).

Accumulated times:
Assembly time:        0.68 s
Solve time:      0.16 s
Total time:      0.84 s

contact        voltage     electron current    hole current  conduction current
 drain        7.000E-01       4.455E-04         7.333E-20        4.455E-04
 gateD        1.625E+00       2.980E-16         7.662E-38        2.980E-16
 gateS        1.625E+00       6.861E-16         6.749E-37        6.861E-16
 source       0.000E+00      -4.455E-04        -1.071E-23       -4.455E-04
 substrate    0.000E+00       2.460E-16        -7.992E-16       -5.532E-16

Computing step from t=0.65 to t=0.7 (Stepsize: 0.05) :
Extrapolating values for t = 0.7 ... done.
Computing Coupled( 1 poisson-equation(s) , 1 electron-equation(s) , 
                   1 hole-equation(s) ) 
using Bank/Rose nonlinear solver.

Iteration   |Rhs|      factor     |step|     error   #inner  #iterative  time
------------------------------------------------------------------------------
    0      3.37e+07                                                      0.17
    1      9.30e+06   1.00e+00   3.61e-02   1.08e+03    0         1      0.41
    2      7.19e+03   1.00e+00   1.48e-03   3.10e+01    0         1      0.64
    3      1.16e-02   1.00e+00   1.39e-05   1.57e-01    0         1      0.88
Finished, because...
Error smaller than 1 ( 1.5701E-01 ).

Accumulated times:
Assembly time:        0.72 s
Solve time:      0.16 s
Total time:      0.88 s

contact        voltage     electron current    hole current  conduction current
 drain        7.000E-01       5.590E-04         7.466E-20        5.590E-04
 gateD        1.750E+00       5.629E-16         1.722E-37        5.629E-16
 gateS        1.750E+00       1.248E-15         1.445E-36        1.248E-15
 source       0.000E+00      -5.590E-04        -8.237E-24       -5.590E-04
 substrate    0.000E+00       3.622E-16        -8.074E-16       -4.452E-16

Computing step from t=0.7 to t=0.75 (Stepsize: 0.05) :
Extrapolating values for t = 0.75 ... done.
Computing Coupled( 1 poisson-equation(s) , 1 electron-equation(s) , 
                   1 hole-equation(s) ) 
using Bank/Rose nonlinear solver.

Iteration   |Rhs|      factor     |step|     error   #inner  #iterative  time
------------------------------------------------------------------------------
    0      1.12e+08                                                      0.18
    1      2.21e+07   1.00e+00   4.60e-02   1.01e+03    0         1      0.43
    2      9.74e+04   1.00e+00   2.67e-03   9.53e+01    0         1      0.67
    3      8.07e+00   1.00e+00   2.23e-05   6.38e-01    0         1      0.91
Finished, because...
Error smaller than 1 ( 6.3819E-01 ).

Accumulated times:
Assembly time:        0.74 s
Solve time:      0.17 s
Total time:      0.91 s

contact        voltage     electron current    hole current  conduction current
 drain        7.000E-01       6.678E-04         7.595E-20        6.678E-04
 gateD        1.875E+00       1.058E-15         4.375E-37        1.058E-15
 gateS        1.875E+00       2.239E-15         3.242E-36        2.239E-15
 source       0.000E+00      -6.678E-04        -1.440E-23       -6.678E-04
 substrate    0.000E+00       3.815E-12        -8.139E-16        3.814E-12

Computing step from t=0.75 to t=0.8 (Stepsize: 0.05) :
Extrapolating values for t = 0.8 ... done.
Computing Coupled( 1 poisson-equation(s) , 1 electron-equation(s) , 
                   1 hole-equation(s) ) 
using Bank/Rose nonlinear solver.

Iteration   |Rhs|      factor     |step|     error   #inner  #iterative  time
------------------------------------------------------------------------------
    0      4.87e+08                                                      0.19
    1      1.75e+08   1.00e+00   6.54e-02   1.27e+03    0         1      0.44
    2      1.27e+07   1.00e+00   9.45e-03   2.98e+02    0         1      0.69
    3      8.01e+04   1.00e+00   5.61e-04   1.88e+01    0         1      0.94
    4      5.15e+00   1.00e+00   3.48e-06   1.18e-01    0         1      1.19
Finished, because...
Error smaller than 1 ( 1.1812E-01 ).

Accumulated times:
Assembly time:        0.99 s
Solve time:      0.20 s
Total time:      1.19 s

contact        voltage     electron current    hole current  conduction current
 drain        7.000E-01       7.667E-04         7.714E-20        7.667E-04
 gateD        2.000E+00       2.087E-15         1.293E-36        2.087E-15
 gateS        2.000E+00       4.066E-15         7.735E-36        4.066E-15
 source       0.000E+00      -7.667E-04        -1.210E-23       -7.667E-04
 substrate    0.000E+00       1.744E-12        -8.187E-16        1.743E-12

Computing step from t=0.8 to t=0.85 (Stepsize: 0.05) :
Extrapolating values for t = 0.85 ... done.
Computing Coupled( 1 poisson-equation(s) , 1 electron-equation(s) , 
                   1 hole-equation(s) ) 
using Bank/Rose nonlinear solver.

Iteration   |Rhs|      factor     |step|     error   #inner  #iterative  time
------------------------------------------------------------------------------
    0      3.72e+08                                                      0.19
    1      1.06e+08   1.00e+00   8.15e-02   1.58e+03    0         1      0.45
    2      1.63e+07   1.00e+00   1.56e-02   4.10e+02    0         1      0.70
    3      2.03e+05   1.00e+00   9.32e-04   2.67e+01    0         1      0.96
    4      1.79e+01   1.00e+00   6.33e-06   1.85e-01    0         1      1.21
Finished, because...
Error smaller than 1 ( 1.8535E-01 ).

Accumulated times:
Assembly time:        1.00 s
Solve time:      0.21 s
Total time:      1.21 s

contact        voltage     electron current    hole current  conduction current
 drain        7.000E-01       8.486E-04         7.813E-20        8.486E-04
 gateD        2.125E+00       4.459E-15         4.337E-36        4.459E-15
 gateS        2.125E+00       7.762E-15         2.037E-35        7.762E-15
 source       0.000E+00      -8.486E-04        -1.703E-23       -8.486E-04
 substrate    0.000E+00       3.794E-12        -8.220E-16        3.793E-12

Computing step from t=0.85 to t=0.9 (Stepsize: 0.05) :
Extrapolating values for t = 0.9 ... done.
Computing Coupled( 1 poisson-equation(s) , 1 electron-equation(s) , 
                   1 hole-equation(s) ) 
using Bank/Rose nonlinear solver.

Iteration   |Rhs|      factor     |step|     error   #inner  #iterative  time
------------------------------------------------------------------------------
    0      1.11e+08                                                      0.20
    1      2.76e+07   1.00e+00   7.36e-02   1.46e+03    0         1      0.46
    2      7.00e+05   1.00e+00   1.05e-02   2.42e+02    0         1      0.72
    3      1.01e+03   1.00e+00   2.18e-04   5.31e+00    0         1      0.98
    4      1.20e-03   1.00e+00   1.21e-07   3.17e-03    0         1      1.24
Finished, because...
Error smaller than 1 ( 3.1662E-03 ).

Accumulated times:
Assembly time:        1.03 s
Solve time:      0.21 s
Total time:      1.24 s

contact        voltage     electron current    hole current  conduction current
 drain        7.000E-01       9.123E-04         7.890E-20        9.123E-04
 gateD        2.250E+00       1.005E-14         1.593E-35        1.005E-14
 gateS        2.250E+00       1.584E-14         6.086E-35        1.584E-14
 source       0.000E+00      -9.123E-04        -1.356E-23       -9.123E-04
 substrate    0.000E+00       1.794E-16        -8.241E-16       -6.446E-16

Computing step from t=0.9 to t=0.95 (Stepsize: 0.05) :
Extrapolating values for t = 0.95 ... done.
Computing Coupled( 1 poisson-equation(s) , 1 electron-equation(s) , 
                   1 hole-equation(s) ) 
using Bank/Rose nonlinear solver.

Iteration   |Rhs|      factor     |step|     error   #inner  #iterative  time
------------------------------------------------------------------------------
    0      4.08e+07                                                      0.21
    1      1.51e+07   1.00e+00   5.09e-02   1.01e+03    0         1      0.48
    2      7.11e+04   1.00e+00   4.70e-03   9.65e+01    0         1      0.75
    3      6.95e+00   1.00e+00   3.16e-05   6.35e-01    0         1      1.02
Finished, because...
Error smaller than 1 ( 6.3478E-01 ).

Accumulated times:
Assembly time:        0.84 s
Solve time:      0.18 s
Total time:      1.02 s

contact        voltage     electron current    hole current  conduction current
 drain        7.000E-01       9.612E-04         7.949E-20        9.612E-04
 gateD        2.375E+00       2.338E-14         6.337E-35        2.338E-14
 gateS        2.375E+00       3.430E-14         2.066E-34        3.430E-14
 source       0.000E+00      -9.612E-04        -1.245E-22       -9.612E-04
 substrate    0.000E+00       1.627E-13        -8.255E-16        1.618E-13

Computing step from t=0.95 to t=1 (Stepsize: 0.05) :
Extrapolating values for t = 1 ... done.
Computing Coupled( 1 poisson-equation(s) , 1 electron-equation(s) , 
                   1 hole-equation(s) ) 
using Bank/Rose nonlinear solver.

Iteration   |Rhs|      factor     |step|     error   #inner  #iterative  time
------------------------------------------------------------------------------
    0      1.90e+07                                                      0.21
    1      9.17e+06   1.00e+00   3.31e-02   6.57e+02    0         1      0.48
    2      1.27e+04   1.00e+00   1.94e-03   3.70e+01    0         1      0.76
    3      9.18e-02   1.00e+00   4.79e-06   8.40e-02    0         1      1.03
Finished, because...
Error smaller than 1 ( 8.3981E-02 ).

Accumulated times:
Assembly time:        0.87 s
Solve time:      0.16 s
Total time:      1.03 s

contact        voltage     electron current    hole current  conduction current
 drain        7.000E-01       9.996E-04         7.996E-20        9.996E-04
 gateD        2.500E+00       5.594E-14         2.735E-34        5.594E-14
 gateS        2.500E+00       7.810E-14         7.933E-34        7.810E-14
 source       0.000E+00      -9.996E-04        -1.734E-23       -9.996E-04
 substrate    0.000E+00      -7.617E-16        -8.265E-16       -1.588E-15


Plot started:
Saving device '':
    Writing plot 'n21_Profile_HighVd_0005_des.tdr' (TDR format) ... done.
Plot finished.


Finished, because...
Curve trace finished.

Writing plot 'n21_des.tdr' (TDR format) ... done.

Tue Aug  4 22:29:52 2026: checked in 1 sdevice license(s)

******************************************************************************
Sentaurus Device peak memory usage: 231 megabytes
Sentaurus Device simulation times:
  wallclock: 66.23 s (0 h:01 m:06 s)
  total cpu: 66.14 s (0 h:01 m:06 s)
Sentaurus Device simulation finished (Date: Tue Aug  4 22:29:52 2026  (KST)).
********************************* Good Bye ! *********************************
```

