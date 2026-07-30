#setdep @node|sdevice@

puts "DEBUG: SVisual High-K Ig script started"

set n @node|sdevice@

#------------------------------------------------------------
# User settings
#------------------------------------------------------------

set VgOff 0.0
set VgOn  2.5

# Constant-current threshold criterion for Vti extraction.
# Current unit follows the Id-Vg dataset unit: A/um.
set Ivti 1.0e-7

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
# Constant-current Vti extraction
# Vti is interpolated linearly in Vg versus log10(|Id|).
#------------------------------------------------------------

proc extract_vti_log {Vgs Ids Ivti label} {
  if {$Ivti <= 0.0} {
    error "$label Vti extraction failed: Ivti must be positive."
  }

  set npts [llength $Vgs]

  if {$npts != [llength $Ids] || $npts < 2} {
    error "$label Vti extraction failed: invalid Id-Vg data length."
  }

  set logIvti [expr {log($Ivti) / log(10.0)}]
  set found 0
  set Vti 0.0

  for {set i 1} {$i < $npts} {incr i} {
    set Vg0 [lindex $Vgs [expr {$i-1}]]
    set Vg1 [lindex $Vgs $i]
    set Id0 [lindex $Ids [expr {$i-1}]]
    set Id1 [lindex $Ids $i]

    # Detect a crossing of the constant-current criterion.
    if {(($Id0 <= $Ivti) && ($Ivti <= $Id1)) ||
        (($Id1 <= $Ivti) && ($Ivti <= $Id0))} {

      set logId0 [expr {log($Id0) / log(10.0)}]
      set logId1 [expr {log($Id1) / log(10.0)}]
      set dlogId [expr {$logId1 - $logId0}]

      if {[expr {abs($dlogId)}] < 1.0e-30} {
        set Vti [expr {0.5 * ($Vg0 + $Vg1)}]
      } else {
        set fraction [expr {($logIvti - $logId0) / $dlogId}]
        set Vti [expr {$Vg0 + $fraction * ($Vg1 - $Vg0)}]
      }

      set found 1
      break
    }
  }

  if {!$found} {
    set IdMin [lindex $Ids 0]
    set IdMax [lindex $Ids 0]

    foreach Id $Ids {
      if {$Id < $IdMin} {
        set IdMin $Id
      }
      if {$Id > $IdMax} {
        set IdMax $Id
      }
    }

    error "$label Vti extraction failed: Ivti=$Ivti A/um is outside the simulated Id range ($IdMin to $IdMax A/um)."
  }

  puts "DEBUG: $label Vti extracted at Id=$Ivti A/um: Vti=$Vti V"
  return $Vti
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

proc extract_idvg_params {dataset_name VgOff VgOn Ivti label} {

  set Vgs     [get_variable_data "gateS OuterVoltage" -dataset $dataset_name]
  set Ids_raw [get_variable_data "drain TotalCurrent" -dataset $dataset_name]

  set Ids [abs_list $Ids_raw]

  puts "DEBUG: $label Id data loaded"
  puts "DEBUG: $label Vgs points = [llength $Vgs]"
  puts "DEBUG: $label Ids points = [llength $Ids]"

  #------------------------------------------------------------
  # Constant-current threshold extraction
  # Vti is taken at |Id| = Ivti using log(Id)-linear interpolation.
  #------------------------------------------------------------

  set Vti [extract_vti_log $Vgs $Ids $Ivti $label]

  #------------------------------------------------------------
  # Manual gm extraction
  # gm = dId/dVg
  # Vtgm is retained only as an auxiliary output.
  # It is not used for DIBL extraction.
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

  return [list $Vti $Vtgm $SS $gm $Ion $Ioff $IonIoff $IdMax]
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

set lowParams [extract_idvg_params PLT_LOW($n) $VgOff $VgOn $Ivti "Low-Vd"]

set Vti_Low     [lindex $lowParams 0]
set Vtgm_Low    [lindex $lowParams 1]
set SS_Low      [lindex $lowParams 2]
set gm_Low      [lindex $lowParams 3]
set Ion_Low     [lindex $lowParams 4]
set Ioff_Low    [lindex $lowParams 5]
set IonIoff_Low [lindex $lowParams 6]
set IdMax_Low   [lindex $lowParams 7]

#------------------------------------------------------------
# Extract High-Vd Id parameters
#------------------------------------------------------------

set highParams [extract_idvg_params PLT_HIGH($n) $VgOff $VgOn $Ivti "High-Vd"]

set Vti_High     [lindex $highParams 0]
set Vtgm_High    [lindex $highParams 1]
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
# Vti-based DIBL extraction
# DIBL = (Vti_lowVd - Vti_highVd) / (Vd_high - Vd_low)
# No absolute value is applied. A normal threshold shift gives positive DIBL.
# unit: mV/V
#------------------------------------------------------------

set dVd [expr {$VdHigh - $VdLow}]

if {[expr {abs($dVd)}] < 1.0e-30} {
  error "DIBL extraction failed: Vd_High and Vd_Low must be different."
} else {
  set DIBL_Vti_VperV [expr {($Vti_Low - $Vti_High) / $dVd}]
  set DIBL_Vti_mVperV [expr {$DIBL_Vti_VperV * 1000.0}]
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
puts "Ivti                = [format_value $Ivti] A/um"
puts "------------------------------------------"
puts "Vti_Low             = [format_value $Vti_Low] V"
puts "Vti_High            = [format_value $Vti_High] V"
puts "Vtgm_Low            = [format_value $Vtgm_Low] V"
puts "Vtgm_High           = [format_value $Vtgm_High] V"
puts "DIBL_Vti            = [format_value $DIBL_Vti_mVperV] mV/V"
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

wb_scalar Ivti                 $Ivti
wb_scalar Vti_Low              $Vti_Low
wb_scalar Vti_High             $Vti_High
wb_scalar Vtgm_Low             $Vtgm_Low
wb_scalar Vtgm_High            $Vtgm_High

wb_scalar DIBL_Vti_VperV       $DIBL_Vti_VperV
wb_scalar DIBL_Vti_mVperV      $DIBL_Vti_mVperV

wb_scalar VgOp                 $VgOp

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
