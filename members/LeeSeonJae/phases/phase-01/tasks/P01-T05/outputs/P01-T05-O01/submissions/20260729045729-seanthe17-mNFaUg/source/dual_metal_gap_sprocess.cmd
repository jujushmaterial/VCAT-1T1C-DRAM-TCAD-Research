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
