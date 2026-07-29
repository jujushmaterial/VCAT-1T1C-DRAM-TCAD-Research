# Phase 1 산출물 — Dual-Metal Gap 구조 전체 코드

- 과제 ID: `P01-T05`
- 산출물 ID: `P01-T05-O01`
- 제출자: 이선재 (`@seanthe17`)
- 제출 시각: 2026-07-29T04:57:29.365Z
- 관련 Issue: [#1](https://github.com/jujushmaterial/VCAT-1T1C-DRAM-TCAD-Research/issues/1)
- 제출 방식: code

## 1. Dual-Metal Gap

- 코드 종류: Sentaurus SProcess
- 원본 파일: [`dual_metal_gap_sprocess.cmd`](./source/dual_metal_gap_sprocess.cmd)

```tcl
#-----------------------------------------------------------------------
# SProcess: 28nm High-K EOT=1.6nm Dual-Metal Gate MOSFET v4_TDR
# Purpose: High-K DMG MOSFET with 28nm-scaled geometry.
#          Geometry is matched to the user's 28nm SiO2 Ig baseline code.
#
# High-K stack:
#   Si / SiO2 IL 0.5 nm / HfO2 5.64 nm / Dual-Metal Gate
#
# EOT:
#   EOT = T_IL + T_HK * k_SiO2 / k_HfO2
#       = 0.5 nm + 5.64 nm * 3.9 / 20
#       ≈ 1.6 nm
#-----------------------------------------------------------------------

#header

#endheader

#-----------------------------------------------------------------------
# Full MOSFET with Dual-Metal Gate
# y < 0 : source side
# y > 0 : drain side
# gateS : source-side low workfunction metal
# gateD : drain-side high workfunction metal
#-----------------------------------------------------------------------

#-----------------------------------------------------------------------
# Recommended Workbench parameters
# Lg       = 0.028   ; 28 nm
# DMG_Gap  = 0.003   ; 3 nm
#-----------------------------------------------------------------------

#-----------------------------------------------------------------------
# Scaled geometry parameters for 28nm device
# Unit: um
#-----------------------------------------------------------------------

set GateCapThick     0.020
set GateCapEtch      0.030

set GateMetalThick   0.050
set GateMetalEtch    0.070

set AlContactThick   0.050
set AlContactEtch    0.080

set SpacerThick      [expr 0.25*@Lg@]
set SpacerEtch       [expr 1.20*$SpacerThick]

#-----------------------------------------------------------------------
# High-K gate dielectric parameters
# Unit: um
#-----------------------------------------------------------------------

set T_IL             0.0005
set T_HK             0.00564
set K_SiO2           3.9
set K_HfO2           20.0
set T_PHY            [expr $T_IL + $T_HK]
set EOT              [expr $T_IL + $T_HK*$K_SiO2/$K_HfO2]

#-----------------------------------------------------------------------
# Mesh / simulation domain
#
# x direction: vertical direction
# x = 0      : Si surface
# x < 0      : oxide / high-k / metal / gas side
# x > 0      : silicon substrate
#
# For 28nm planar MOSFET, 1.0um substrate is visually too deep.
# Use 0.4um depth for compact 2D device simulation.
#-----------------------------------------------------------------------

line x location= 0.000 spacing= 0.002 tag= top
line x location= 0.030 spacing= 0.003
line x location= 0.080 spacing= 0.008
line x location= 0.150 spacing= 0.020
line x location= 0.400 spacing= 0.050 tag= bottom

# y direction: lateral direction
# Use +/-4Lg to provide enough source/drain extension and contact region.

line y location= -4*@Lg@    spacing= @Lg@       tag= left
line y location= -2*@Lg@    spacing= 0.25*@Lg@
line y location= -1.0*@Lg@  spacing= 0.08*@Lg@
line y location= -0.5*@Lg@  spacing= 0.03*@Lg@
line y location=  0.0       spacing= 0.01*@Lg@
line y location=  0.5*@Lg@  spacing= 0.03*@Lg@
line y location=  1.0*@Lg@  spacing= 0.08*@Lg@
line y location=  2*@Lg@    spacing= 0.25*@Lg@
line y location=  4*@Lg@    spacing= @Lg@       tag= right

region Silicon xlo= top xhi= bottom ylo= left yhi= right

## step Init
init concentration= @NWell@ field= Boron slice.angle= 180 !DelayFullD

pdbSet Silicon Dopant DiffModel ChargedFermi

#visualize
struct tdr= JH_n@node@_01_initialize !Gas !interfaces

#-----------------------------------------------------------------------
# step High-K Gate Dielectric Stack
#
# Original SiO2-only gate oxidation is replaced by:
#   1) SiO2 interfacial layer, 0.5 nm
#   2) HfO2 high-k layer, 5.64 nm
#
# This keeps EOT close to the original SiO2 tox = 1.6 nm
# while increasing the physical dielectric thickness to reduce Ig.
#-----------------------------------------------------------------------

pdbSet Oxide Grid perp.add.dist 0.005e-4
deposit Oxide type= anisotropic thickness= $T_IL

pdbSet HfO2 Grid perp.add.dist 0.005e-4
deposit material= {HfO2} type= anisotropic thickness= $T_HK

#visualize
struct tdr= JH_n@node@_02_highk_stack !Gas !interfaces

## step extract_highk_thickness
puts "DOE: T_IL_nm [format %.4f [expr $T_IL*1000.0]]"
puts "DOE: T_HK_nm [format %.4f [expr $T_HK*1000.0]]"
puts "DOE: T_PHY_nm [format %.4f [expr $T_PHY*1000.0]]"
puts "DOE: EOT_nm [format %.4f [expr $EOT*1000.0]]"

#-----------------------------------------------------------------------
# step Dual-Metal Gate Formation
#
# gate length = Lg
# source-side gate: -Lg/2 ~ -DMG_Gap/2
# drain-side gate : +DMG_Gap/2 ~ +Lg/2
#
# gateS : Titanium
# gateD : Tungsten
# Workfunction is defined in SDevice.
#-----------------------------------------------------------------------

## Source-side metal gate
deposit material= {Titanium} type= anisotropic thickness= $GateMetalThick

mask name= gateS left= -@Lg@/2 right= -@DMG_Gap@/2
etch material= {Titanium} type= anisotropic thickness= $GateMetalEtch mask= gateS

#visualize
struct tdr= JH_n@node@_03_gateS_formation !Gas !interfaces

## Drain-side metal gate
deposit material= {Tungsten} type= anisotropic thickness= $GateMetalThick

mask name= gateD left= @DMG_Gap@/2 right= @Lg@/2
etch material= {Tungsten} type= anisotropic thickness= $GateMetalEtch mask= gateD

#visualize
struct tdr= JH_n@node@_04_gateD_formation !Gas !interfaces

#-----------------------------------------------------------------------
# step Gate Dielectric Etch
# Protect the whole gate region and remove exposed high-k/oxide from
# source/drain region.
#-----------------------------------------------------------------------

mask name= gateAll left= -@Lg@/2 right= @Lg@/2

etch material= {HfO2} type= anisotropic thickness= 0.020 mask= gateAll
etch Oxide type= anisotropic thickness= 0.020 mask= gateAll

#visualize
struct tdr= JH_n@node@_05_gate_dielectric_etch !Gas !interfaces

#-----------------------------------------------------------------------
# step Temporary Gate/Gap Implant-Block Cap
#
# Purpose:
# Prevent n-type dopant penetration through DMG gap.
# Nitride cap remains only on gateAll region.
#-----------------------------------------------------------------------

deposit Nitride type= anisotropic thickness= $GateCapThick

#visualize
# Blanket nitride cap deposition before gateCap etch.
# This snapshot is added to show that the cap is first deposited over
# the exposed top surface, then etched back to remain only on the gate/gap region.
struct tdr= JH_n@node@_06a_gate_cap_depo !Gas !interfaces

mask name= gateCap left= -@Lg@/2 right= @Lg@/2
etch Nitride type= anisotropic thickness= $GateCapEtch mask= gateCap

#visualize
struct tdr= JH_n@node@_06b_gate_gap_cap_etch !Gas !interfaces

#-----------------------------------------------------------------------
# step LDD implant
#-----------------------------------------------------------------------

implant Arsenic dose= @LDD_Dose@ energy= @LDD_E@

#visualize
struct tdr= JH_n@node@_07_LDD_implant !Gas !interfaces

#-----------------------------------------------------------------------
# step Spacer formation
#
# Spacer thickness for 28nm device:
# SpacerThick = 0.25*Lg ≈ 7 nm when Lg = 28 nm.
#-----------------------------------------------------------------------

deposit Nitride type= isotropic thickness= $SpacerThick

#visualize
struct tdr= JH_n@node@_08_spacer_depo !Gas !interfaces

etch Nitride type= anisotropic thickness= $SpacerEtch mask= gateCap

#visualize
struct tdr= JH_n@node@_09_spacer_etch_cap_kept !Gas !interfaces

#-----------------------------------------------------------------------
# step SD Implant
# Gate/gap region is still protected by Nitride cap.
#-----------------------------------------------------------------------

implant Phosphorus dose= @SD_Dose@ energy= @SD_E@

#visualize
struct tdr= JH_n@node@_10_SD_implant !Gas !interfaces

## step SD Anneal
diffuse time=0.5<s> temperature= 950

#visualize
struct tdr= JH_n@node@_11_SD_anneal !Gas !interfaces

#-----------------------------------------------------------------------
# step Remove Temporary Gate/Gap Cap
#
# Remove temporary Nitride cap on gateAll region.
# Keep outer nitride spacers around source/drain side.
# Since the lateral domain is now +/-4Lg, update outer mask accordingly.
#-----------------------------------------------------------------------

mask name= keepOuterNitride segments= { -4*@Lg@ -@Lg@/2  @Lg@/2 4*@Lg@ }

set GateCapStripThick [expr $GateCapThick + 1.50*$SpacerThick]

etch Nitride type= anisotropic thickness= $GateCapStripThick mask= keepOuterNitride

#visualize
struct tdr= JH_n@node@_12_gate_cap_removed !Gas !interfaces

#-----------------------------------------------------------------------
# step contactSD
# source/drain contact metal
# source/drain contact metal: Aluminum
#-----------------------------------------------------------------------

deposit Aluminum type= anisotropic thickness= $AlContactThick

# Leave Al only at far source/drain regions.
# For +/-4Lg domain, use source/drain contact windows around +/-3Lg.
mask name= contact segments= { -4*@Lg@ -2.2*@Lg@  2.2*@Lg@ 4*@Lg@ }

etch Aluminum type= anisotropic thickness= $AlContactEtch mask= contact

#visualize
struct tdr= JH_n@node@_13_Al_contact !Gas !interfaces

#-----------------------------------------------------------------------
# No reflect
# Dual metal gate is asymmetric, so transform reflect must not be used.
#-----------------------------------------------------------------------

contact name= substrate bottom

# Source/drain contacts moved outward for the wider +/-4Lg lateral domain.
contact name= source point y= -3.0*@Lg@ x= -0.010 replace
contact name= drain  point y=  3.0*@Lg@ x= -0.010 replace

## Dual gate contacts
# Gate metal thickness is now 0.05um, so x=-0.025 is near metal center.
contact name= gateS point y= -@Lg@*0.25 x= -0.025 replace
contact name= gateD point y=  @Lg@*0.25 x= -0.025 replace

## step save
struct tdr= n@node@ !Gas !interfaces

```

## 2. Dual-Metal Gap

- 코드 종류: Sentaurus SDevice
- 원본 파일: [`dual_metal_gap_sdevice.cmd`](./source/dual_metal_gap_sdevice.cmd)

```tcl
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

```

## 3. Dual-Metal Gap

- 코드 종류: Sentaurus SVisual
- 원본 파일: [`dual_metal_gap_svisual.tcl`](./source/dual_metal_gap_svisual.tcl)

```tcl
#setdep @node|sdevice@

puts "DEBUG: SVisual High-K Ig script started"

set n @node|sdevice@

#------------------------------------------------------------
# User settings
#------------------------------------------------------------

set VgOff 0.0
set VgOn  2.5

# Operation-point gate voltage for extra Ig extraction.
# In this project, Vd_High is usually 0.7 V, so VgOp = @Vd_High@ gives Ig near Vg=0.7 V.
set VgOp  @Vd_High@

set VdLow  @Vd_Low@
set VdHigh @Vd_High@

#------------------------------------------------------------
# Utility functions
#------------------------------------------------------------

proc abs_list {input_list} {
  set output_list {}
  foreach v $input_list {
    lappend output_list [expr {abs($v) + 1.0e-30}]
  }
  return $output_list
}

proc add_lists {list_a list_b} {
  set output_list {}
  foreach a $list_a b $list_b {
    lappend output_list [expr {$a + $b}]
  }
  return $output_list
}

proc nearest_y {xlist ylist x0} {
  set best_diff 1.0e99
  set best_y 0.0

  foreach x $xlist y $ylist {
    set diff [expr {abs($x - $x0)}]
    if {$diff < $best_diff} {
      set best_diff $diff
      set best_y $y
    }
  }

  return $best_y
}

proc max_y {ylist} {
  set max_value -1.0e99

  foreach y $ylist {
    if {$y > $max_value} {
      set max_value $y
    }
  }

  return $max_value
}

#------------------------------------------------------------
# Flexible number format
#------------------------------------------------------------

proc format_value {value} {
  set avalue [expr {abs($value)}]

  if {$avalue == 0.0} {
    return [format %.2f $value]
  } elseif {$avalue >= 0.01 && $avalue < 1.0e6} {
    return [format %.2f $value]
  } else {
    return [format %.4e $value]
  }
}

#------------------------------------------------------------
# Workbench DOE output function
#------------------------------------------------------------

proc wb_scalar {name value} {
  set value_fmt [format_value $value]

  puts "DOE: $name $value_fmt"

  if {[llength [info commands ft_scalar]] > 0} {
    ft_scalar $name $value_fmt
  }
}

#------------------------------------------------------------
# Extract Id-Vg parameters from one dataset
#------------------------------------------------------------

proc extract_idvg_params {dataset_name VgOff VgOn label} {

  set Vgs     [get_variable_data "gateS OuterVoltage" -dataset $dataset_name]
  set Ids_raw [get_variable_data "drain TotalCurrent" -dataset $dataset_name]

  set Ids [abs_list $Ids_raw]

  puts "DEBUG: $label Id data loaded"
  puts "DEBUG: $label Vgs points = [llength $Vgs]"
  puts "DEBUG: $label Ids points = [llength $Ids]"

  #------------------------------------------------------------
  # Manual gm extraction
  # gm = dId/dVg
  #------------------------------------------------------------

  set gmList {}
  set gmXList {}

  set npts [llength $Vgs]

  for {set i 1} {$i < $npts} {incr i} {
    set x0 [lindex $Vgs [expr {$i-1}]]
    set x1 [lindex $Vgs $i]
    set y0 [lindex $Ids [expr {$i-1}]]
    set y1 [lindex $Ids $i]

    set dx [expr {$x1 - $x0}]

    if {[expr {abs($dx)}] > 1.0e-30} {
      set gm_i [expr {($y1 - $y0) / $dx}]
      set xmid [expr {0.5 * ($x0 + $x1)}]

      lappend gmList $gm_i
      lappend gmXList $xmid
    }
  }

  set gmmax -1.0e99
  set Vgm 0.0

  foreach gx $gmXList gy $gmList {
    if {$gy > $gmmax} {
      set gmmax $gy
      set Vgm $gx
    }
  }

  set Idgm [nearest_y $Vgs $Ids $Vgm]

  if {$gmmax <= 0.0} {
    set Vtgm 0.0
  } else {
    set Vtgm [expr {$Vgm - ($Idgm / $gmmax)}]
  }

  set Vth $Vtgm
  set gm $gmmax

  #------------------------------------------------------------
  # Manual SS extraction
  # SS = 1000 / max(dlog10(Id)/dVg)
  # unit: mV/dec
  #------------------------------------------------------------

  set maxSlope -1.0e99

  for {set i 1} {$i < $npts} {incr i} {
    set x0 [lindex $Vgs [expr {$i-1}]]
    set x1 [lindex $Vgs $i]
    set y0 [lindex $Ids [expr {$i-1}]]
    set y1 [lindex $Ids $i]

    set dx [expr {$x1 - $x0}]

    if {[expr {abs($dx)}] > 1.0e-30} {
      set log0 [expr {log($y0) / log(10.0)}]
      set log1 [expr {log($y1) / log(10.0)}]
      set slope [expr {($log1 - $log0) / $dx}]

      if {$slope > $maxSlope} {
        set maxSlope $slope
      }
    }
  }

  if {$maxSlope <= 0.0} {
    set SS 1.0e99
  } else {
    set SS [expr {1000.0 / $maxSlope}]
  }

  #------------------------------------------------------------
  # Ion / Ioff / IonIoff
  #------------------------------------------------------------

  set Ioff [nearest_y $Vgs $Ids $VgOff]
  set Ion  [nearest_y $Vgs $Ids $VgOn]
  set IdMax [max_y $Ids]

  if {$Ioff == 0.0} {
    set IonIoff 1.0e99
  } else {
    set IonIoff [expr {$Ion / $Ioff}]
  }

  return [list $Vtgm $Vth $SS $gm $Ion $Ioff $IonIoff $IdMax]
}

#------------------------------------------------------------
# Extract Ig parameters from one dataset
# Ig_total = |I(gateS)| + |I(gateD)|
#------------------------------------------------------------

proc extract_ig_params {dataset_name VgOff VgOp VgOn label} {

  set Vgs       [get_variable_data "gateS OuterVoltage" -dataset $dataset_name]
  set IgS_raw   [get_variable_data "gateS TotalCurrent" -dataset $dataset_name]
  set IgD_raw   [get_variable_data "gateD TotalCurrent" -dataset $dataset_name]

  set IgS [abs_list $IgS_raw]
  set IgD [abs_list $IgD_raw]
  set IgTotal [add_lists $IgS $IgD]

  puts "DEBUG: $label Ig data loaded"
  puts "DEBUG: $label IgS points = [llength $IgS]"
  puts "DEBUG: $label IgD points = [llength $IgD]"

  set IgS_Off     [nearest_y $Vgs $IgS $VgOff]
  set IgD_Off     [nearest_y $Vgs $IgD $VgOff]
  set IgTotal_Off [nearest_y $Vgs $IgTotal $VgOff]

  set IgS_Op      [nearest_y $Vgs $IgS $VgOp]
  set IgD_Op      [nearest_y $Vgs $IgD $VgOp]
  set IgTotal_Op  [nearest_y $Vgs $IgTotal $VgOp]

  set IgS_On      [nearest_y $Vgs $IgS $VgOn]
  set IgD_On      [nearest_y $Vgs $IgD $VgOn]
  set IgTotal_On  [nearest_y $Vgs $IgTotal $VgOn]

  set IgTotal_Max [max_y $IgTotal]

  return [list $IgS_Off $IgD_Off $IgTotal_Off $IgS_Op $IgD_Op $IgTotal_Op $IgS_On $IgD_On $IgTotal_On $IgTotal_Max]
}

#------------------------------------------------------------
# Create Id-Vg plot
#------------------------------------------------------------

if {[llength [list_plots Plot_IdVg]] == 0} {
  create_plot -1d -name Plot_IdVg
  select_plots Plot_IdVg

  set_plot_prop -hide_title -show_legend

  set_axis_prop -title_font_size 16 -scale_font_size 14
  set_axis_prop -axis x -title "Gate Voltage (V)" -type linear
  set_axis_prop -axis y -title "Drain Current (A/<greek>m</greek>m)" -type log

  set_legend_prop -label_font_size 14 -location bottom_right
}

#------------------------------------------------------------
# Create Ig-Vg plot
# Raw gate currents are plotted on a linear axis because terminal-current
# signs may be negative. Absolute Ig values are extracted as DOE scalars.
#------------------------------------------------------------

if {[llength [list_plots Plot_IgVg]] == 0} {
  create_plot -1d -name Plot_IgVg
  select_plots Plot_IgVg

  set_plot_prop -hide_title -show_legend

  set_axis_prop -title_font_size 16 -scale_font_size 14
  set_axis_prop -axis x -title "Gate Voltage (V)" -type linear
  set_axis_prop -axis y -title "Raw Gate Current (A/<greek>m</greek>m)" -type linear

  set_legend_prop -label_font_size 14 -location bottom_right
}

#------------------------------------------------------------
# Load Low-Vd Id-Vg / Ig-Vg data
#------------------------------------------------------------

puts "DEBUG: loading Low-Vd file = @[relpath IdVg_Low_n@node|sdevice@_des.plt]@"
load_file @[relpath IdVg_Low_n@node|sdevice@_des.plt]@ -name PLT_LOW($n)
puts "DEBUG: Low-Vd file loaded"

select_plots Plot_IdVg
create_curve -name IdVg_Low($n) -dataset PLT_LOW($n) \
  -axisX "gateS OuterVoltage" -axisY "drain TotalCurrent"

select_plots Plot_IgVg
create_curve -name IgS_Low($n) -dataset PLT_LOW($n) \
  -axisX "gateS OuterVoltage" -axisY "gateS TotalCurrent"

create_curve -name IgD_Low($n) -dataset PLT_LOW($n) \
  -axisX "gateS OuterVoltage" -axisY "gateD TotalCurrent"

#------------------------------------------------------------
# Load High-Vd Id-Vg / Ig-Vg data
#------------------------------------------------------------

puts "DEBUG: loading High-Vd file = @[relpath IdVg_High_n@node|sdevice@_des.plt]@"
load_file @[relpath IdVg_High_n@node|sdevice@_des.plt]@ -name PLT_HIGH($n)
puts "DEBUG: High-Vd file loaded"

select_plots Plot_IdVg
create_curve -name IdVg_High($n) -dataset PLT_HIGH($n) \
  -axisX "gateS OuterVoltage" -axisY "drain TotalCurrent"

select_plots Plot_IgVg
create_curve -name IgS_High($n) -dataset PLT_HIGH($n) \
  -axisX "gateS OuterVoltage" -axisY "gateS TotalCurrent"

create_curve -name IgD_High($n) -dataset PLT_HIGH($n) \
  -axisX "gateS OuterVoltage" -axisY "gateD TotalCurrent"

#------------------------------------------------------------
# Extract Low-Vd Id parameters
#------------------------------------------------------------

set lowParams [extract_idvg_params PLT_LOW($n) $VgOff $VgOn "Low-Vd"]

set Vtgm_Low    [lindex $lowParams 0]
set Vth_Low     [lindex $lowParams 1]
set SS_Low      [lindex $lowParams 2]
set gm_Low      [lindex $lowParams 3]
set Ion_Low     [lindex $lowParams 4]
set Ioff_Low    [lindex $lowParams 5]
set IonIoff_Low [lindex $lowParams 6]
set IdMax_Low   [lindex $lowParams 7]

#------------------------------------------------------------
# Extract High-Vd Id parameters
#------------------------------------------------------------

set highParams [extract_idvg_params PLT_HIGH($n) $VgOff $VgOn "High-Vd"]

set Vtgm_High    [lindex $highParams 0]
set Vth_High     [lindex $highParams 1]
set SS_High      [lindex $highParams 2]
set gm_High      [lindex $highParams 3]
set Ion_High     [lindex $highParams 4]
set Ioff_High    [lindex $highParams 5]
set IonIoff_High [lindex $highParams 6]
set IdMax_High   [lindex $highParams 7]

#------------------------------------------------------------
# Extract Low-Vd Ig parameters
#------------------------------------------------------------

set lowIgParams [extract_ig_params PLT_LOW($n) $VgOff $VgOp $VgOn "Low-Vd"]

set IgS_Off_Low     [lindex $lowIgParams 0]
set IgD_Off_Low     [lindex $lowIgParams 1]
set IgTotal_Off_Low [lindex $lowIgParams 2]
set IgS_Op_Low      [lindex $lowIgParams 3]
set IgD_Op_Low      [lindex $lowIgParams 4]
set IgTotal_Op_Low  [lindex $lowIgParams 5]
set IgS_On_Low      [lindex $lowIgParams 6]
set IgD_On_Low      [lindex $lowIgParams 7]
set IgTotal_On_Low  [lindex $lowIgParams 8]
set IgTotal_Max_Low [lindex $lowIgParams 9]

#------------------------------------------------------------
# Extract High-Vd Ig parameters
#------------------------------------------------------------

set highIgParams [extract_ig_params PLT_HIGH($n) $VgOff $VgOp $VgOn "High-Vd"]

set IgS_Off_High     [lindex $highIgParams 0]
set IgD_Off_High     [lindex $highIgParams 1]
set IgTotal_Off_High [lindex $highIgParams 2]
set IgS_Op_High      [lindex $highIgParams 3]
set IgD_Op_High      [lindex $highIgParams 4]
set IgTotal_Op_High  [lindex $highIgParams 5]
set IgS_On_High      [lindex $highIgParams 6]
set IgD_On_High      [lindex $highIgParams 7]
set IgTotal_On_High  [lindex $highIgParams 8]
set IgTotal_Max_High [lindex $highIgParams 9]

#------------------------------------------------------------
# Total off leakage estimate
# TotalOffLeakage = |Id at Vg=0| + |IgS at Vg=0| + |IgD at Vg=0|
#------------------------------------------------------------

set TotalLeak_Off_Low  [expr {$Ioff_Low  + $IgTotal_Off_Low}]
set TotalLeak_Off_High [expr {$Ioff_High + $IgTotal_Off_High}]

#------------------------------------------------------------
# DIBL extraction
# DIBL = abs((Vth_lowVd - Vth_highVd) / (Vd_high - Vd_low))
# unit: mV/V
#------------------------------------------------------------

set dVd [expr {$VdHigh - $VdLow}]

if {[expr {abs($dVd)}] < 1.0e-30} {
  set DIBL_VperV 0.0
  set DIBL_mVperV 0.0
} else {
  set DIBL_VperV_raw [expr {($Vth_Low - $Vth_High) / $dVd}]
  set DIBL_VperV [expr {abs($DIBL_VperV_raw)}]
  set DIBL_mVperV [expr {$DIBL_VperV * 1000.0}]
}

#------------------------------------------------------------
# Console output
#------------------------------------------------------------

puts "=========================================="
puts "High-K Dual-Metal Gate MOSFET Id/Ig Extraction"
puts "=========================================="
puts "Vd_Low              = [format_value $VdLow] V"
puts "Vd_High             = [format_value $VdHigh] V"
puts "Vg_Off              = [format_value $VgOff] V"
puts "Vg_On               = [format_value $VgOn] V"
puts "Vg_Op               = [format_value $VgOp] V"
puts "------------------------------------------"
puts "Vth_Low             = [format_value $Vth_Low] V"
puts "Vth_High            = [format_value $Vth_High] V"
puts "Vtgm_Low            = [format_value $Vtgm_Low] V"
puts "Vtgm_High           = [format_value $Vtgm_High] V"
puts "DIBL                = [format_value $DIBL_mVperV] mV/V"
puts "SS_Low              = [format_value $SS_Low] mV/dec"
puts "SS_High             = [format_value $SS_High] mV/dec"
puts "gm_Low              = [format_value $gm_Low]"
puts "gm_High             = [format_value $gm_High]"
puts "Ion_Low             = [format_value $Ion_Low] A"
puts "Ion_High            = [format_value $Ion_High] A"
puts "Ioff_Low            = [format_value $Ioff_Low] A"
puts "Ioff_High           = [format_value $Ioff_High] A"
puts "Ion/Ioff_Low        = [format_value $IonIoff_Low]"
puts "Ion/Ioff_High       = [format_value $IonIoff_High]"
puts "IdMax_Low           = [format_value $IdMax_Low] A"
puts "IdMax_High          = [format_value $IdMax_High] A"
puts "------------------------------------------"
puts "IgS_Off_Low         = [format_value $IgS_Off_Low] A"
puts "IgD_Off_Low         = [format_value $IgD_Off_Low] A"
puts "IgTotal_Off_Low     = [format_value $IgTotal_Off_Low] A"
puts "IgS_Op_Low          = [format_value $IgS_Op_Low] A"
puts "IgD_Op_Low          = [format_value $IgD_Op_Low] A"
puts "IgTotal_Op_Low      = [format_value $IgTotal_Op_Low] A"
puts "IgS_On_Low          = [format_value $IgS_On_Low] A"
puts "IgD_On_Low          = [format_value $IgD_On_Low] A"
puts "IgTotal_On_Low      = [format_value $IgTotal_On_Low] A"
puts "IgTotal_Max_Low     = [format_value $IgTotal_Max_Low] A"
puts "------------------------------------------"
puts "IgS_Off_High        = [format_value $IgS_Off_High] A"
puts "IgD_Off_High        = [format_value $IgD_Off_High] A"
puts "IgTotal_Off_High    = [format_value $IgTotal_Off_High] A"
puts "IgS_Op_High         = [format_value $IgS_Op_High] A"
puts "IgD_Op_High         = [format_value $IgD_Op_High] A"
puts "IgTotal_Op_High     = [format_value $IgTotal_Op_High] A"
puts "IgS_On_High         = [format_value $IgS_On_High] A"
puts "IgD_On_High         = [format_value $IgD_On_High] A"
puts "IgTotal_On_High     = [format_value $IgTotal_On_High] A"
puts "IgTotal_Max_High    = [format_value $IgTotal_Max_High] A"
puts "------------------------------------------"
puts "TotalLeak_Off_Low   = [format_value $TotalLeak_Off_Low] A"
puts "TotalLeak_Off_High  = [format_value $TotalLeak_Off_High] A"
puts "=========================================="

#------------------------------------------------------------
# Workbench DOE output: Id-related values
#------------------------------------------------------------

wb_scalar Vth_Low        $Vth_Low
wb_scalar Vth_High       $Vth_High
wb_scalar Vtgm_Low       $Vtgm_Low
wb_scalar Vtgm_High      $Vtgm_High

wb_scalar DIBL_VperV     $DIBL_VperV
wb_scalar DIBL_mVperV    $DIBL_mVperV

wb_scalar VgOp            $VgOp

wb_scalar SS_Low         $SS_Low
wb_scalar SS_High        $SS_High

wb_scalar gm_Low         $gm_Low
wb_scalar gm_High        $gm_High

wb_scalar Ion_Low        $Ion_Low
wb_scalar Ion_High       $Ion_High

wb_scalar Ioff_Low       $Ioff_Low
wb_scalar Ioff_High      $Ioff_High

wb_scalar IonIoff_Low    $IonIoff_Low
wb_scalar IonIoff_High   $IonIoff_High

wb_scalar IdMax_Low      $IdMax_Low
wb_scalar IdMax_High     $IdMax_High

#------------------------------------------------------------
# Workbench DOE output: Ig-related values
#------------------------------------------------------------

wb_scalar IgS_Off_Low         $IgS_Off_Low
wb_scalar IgD_Off_Low         $IgD_Off_Low
wb_scalar IgTotal_Off_Low     $IgTotal_Off_Low
wb_scalar IgS_Op_Low          $IgS_Op_Low
wb_scalar IgD_Op_Low          $IgD_Op_Low
wb_scalar IgTotal_Op_Low      $IgTotal_Op_Low
wb_scalar IgS_On_Low          $IgS_On_Low
wb_scalar IgD_On_Low          $IgD_On_Low
wb_scalar IgTotal_On_Low      $IgTotal_On_Low
wb_scalar IgTotal_Max_Low     $IgTotal_Max_Low

wb_scalar IgS_Off_High        $IgS_Off_High
wb_scalar IgD_Off_High        $IgD_Off_High
wb_scalar IgTotal_Off_High    $IgTotal_Off_High
wb_scalar IgS_Op_High         $IgS_Op_High
wb_scalar IgD_Op_High         $IgD_Op_High
wb_scalar IgTotal_Op_High     $IgTotal_Op_High
wb_scalar IgS_On_High         $IgS_On_High
wb_scalar IgD_On_High         $IgD_On_High
wb_scalar IgTotal_On_High     $IgTotal_On_High
wb_scalar IgTotal_Max_High    $IgTotal_Max_High

wb_scalar TotalLeak_Off_Low   $TotalLeak_Off_Low
wb_scalar TotalLeak_Off_High  $TotalLeak_Off_High

#------------------------------------------------------------
# Curve properties
#------------------------------------------------------------

if {[info exists runVisualizerNodesTogether]} {
  set_curve_prop IdVg_Low($n) -label "Low Vd IdVg $legend" \
    -color $color -line_style $line -line_width 3

  set_curve_prop IdVg_High($n) -label "High Vd IdVg $legend" \
    -color $color -line_style dashed -line_width 3

  set_curve_prop IgS_Low($n) -label "Low Vd IgS $legend" \
    -color $color -line_style $line -line_width 2

  set_curve_prop IgD_Low($n) -label "Low Vd IgD $legend" \
    -color $color -line_style dashed -line_width 2

  set_curve_prop IgS_High($n) -label "High Vd IgS $legend" \
    -color $color -line_style dot -line_width 2

  set_curve_prop IgD_High($n) -label "High Vd IgD $legend" \
    -color $color -line_style dashdot -line_width 2
} else {
  puts "To see the curves, select both Sentaurus Visual nodes and at the toolbar"
  puts "press the \"Run selected Visualizer Nodes Together\" button."
}

puts "DEBUG: SVisual Ig script finished"

```

