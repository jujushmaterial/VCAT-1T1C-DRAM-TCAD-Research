# Phase 1 산출물 — Dual-Metal Gap 구조 전체 코드

- 과제 ID: `P01-T05`
- 산출물 ID: `P01-T05-O01`
- 제출자: 주상현 (`@jujushmaterial`)
- 제출 시각: 2026-08-04T07:25:14.243Z
- 관련 Issue: [#1](https://github.com/jujushmaterial/VCAT-1T1C-DRAM-TCAD-Research/issues/1)
- 제출 방식: code

## 1. parameter 코드

- 코드 종류: Sentaurus SDevice
- 원본 파일: [`sdevice.cmd`](./source/sdevice.cmd)

```tcl
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

```

## 실행 조건 및 설명

sdevice 우클릭 -> command 아래에 parmeter 클릭 -> 새로 만들기 -> 붙여넣기 ->  저장

