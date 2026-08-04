#-----------------------------------------------------------------------
# sdevice.par: High-K EOT=1.6 nm 28nm-scaled Dual-Metal Gate MOSFET v3_scaled28
#
# Usage in Sentaurus Workbench:
#   Register this file as the SDevice parameter file named sdevice.par.
#   The SDevice command file must contain:
#      Parameter = "@parameter@"
#
# Material implementation:
#   Oxide : SiO2 interfacial layer, 0.5 nm
#   HfO2  : native Sentaurus high-k material, 5.64 nm
#
# Purpose:
#   Provide BarrierTunneling model parameters for the SiO2 IL and HfO2
#   so gate leakage current can be calculated with NLM_gateS/NLM_gateD.
#-----------------------------------------------------------------------

#-----------------------------------------------------------------------
# Global fallback tunneling parameters
#-----------------------------------------------------------------------

BarrierTunneling "NLM_gateS" {
  mt = 1.0, 1.0
  g  = 1.0, 1.0
}

BarrierTunneling "NLM_gateD" {
  mt = 1.0, 1.0
  g  = 1.0, 1.0
}

#-----------------------------------------------------------------------
# Silicon parameters for the tunneling model
#-----------------------------------------------------------------------

Material = "Silicon" {
  BarrierTunneling "NLM_gateS" {
    mt = 1.0, 1.0
    g  = 1.0, 1.0
  }

  BarrierTunneling "NLM_gateD" {
    mt = 1.0, 1.0
    g  = 1.0, 1.0
  }
}

#-----------------------------------------------------------------------
# SiO2 interfacial layer
#-----------------------------------------------------------------------

Material = "Oxide" {
  BarrierTunneling "NLM_gateS" {
    mt = 0.42, 1.0
    g  = 1.0, 1.0
  }

  BarrierTunneling "NLM_gateD" {
    mt = 0.42, 1.0
    g  = 1.0, 1.0
  }
}

#-----------------------------------------------------------------------
# HfO2 high-k layer
# First-pass comparison parameter:
#   electron tunneling mass mt = 0.11
#   hole tunneling mass mt = 1.0
# This is for trend comparison, not calibrated absolute leakage fitting.
#-----------------------------------------------------------------------

Material = "HfO2" {
  BarrierTunneling "NLM_gateS" {
    mt = 0.11, 1.0
    g  = 1.0, 1.0
  }

  BarrierTunneling "NLM_gateD" {
    mt = 0.11, 1.0
    g  = 1.0, 1.0
  }
}
