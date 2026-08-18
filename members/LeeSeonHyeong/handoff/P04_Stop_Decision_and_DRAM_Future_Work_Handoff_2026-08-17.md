# Phase 4 1T1C 검토 중단 및 SF_DRAM 분석 정리

## 1. Phase 4 검토 목적

Phase 4에서는 P2 Single-Metal VCAT과 P3 L-H-L 구조를 1T1C 환경에 연결하여 Write, Hold, Read 등의 기본 동작을 검증하는 방안을 검토하였다.

이를 위해 Single-Metal 구조를 이용한 Sentaurus Mixed-Mode smoke test를 수행하고, DRAM 동작 조건을 정하기 위한 문헌 조사와 Synopsys 공식 `SF_DRAM` 예제 분석을 병행하였다.

---

## 2. 1T1C 검증 과정에서 확인된 문제

1T1C 검증을 수행하려면 VCAT 소자 자체의 특성 외에도 여러 회로 조건을 추가로 정의해야 한다.

대표적으로 Storage capacitor 크기, Bit-line 등가 capacitance, BL precharge 전압, WL high/low 전압, cell plate 전압, Write/Read pulse timing, sensing 방식, Read Disturb 및 Retention 판정 기준 등이 필요하다.

이 변수들은 서로 독립적인 단순 parameter가 아니라 실제 DRAM의 sensing 및 cell-operating architecture와 연계되어 있다.

따라서 이러한 조건을 충분히 검증하지 않은 상태에서 간략화된 1T1C Testbench를 구성하면, 결과가 VCAT 구조 자체의 특성 때문인지 선택한 회로 조건 때문인지 구분하기 어려워질 수 있다.

---

## 3. 문헌 검토에서 확인한 사항

DRAM 관련 문헌을 조사한 결과 BL precharge, WL bias, cell plate, sensing 방식은 하나의 회로 체계 안에서 함께 결정되는 경우가 많았다.

예를 들어 GND-precharge DRAM은 단순히 Bit Line을 0 V로 초기화하는 방식이 아니라 negative WL, reference scheme, sense amplifier 구조 등과 결합되어 사용된다.

또한 conventional half-VDD precharge 방식에서도 `Ccell/CBL` 비율과 charge sharing, sense-amplifier 특성 등이 Read margin에 직접 영향을 준다.

따라서 특정 논문에서 사용한 전압이나 capacitance 값 하나만을 분리하여 본 연구의 1T1C 기준으로 사용하는 것은 적절하지 않다고 판단하였다.

---

## 4. Single-Metal Mixed-Mode 사전검증

Single-Metal VCAT을 이용하여 1T1C Mixed-Mode 구현 가능성을 사전 확인하였다.

WL 전압을 증가시키면서 Storage Node charging이 증가하는 것을 확인하였고, `WL=2.0 V`, `BL=1.0 V` 조건의 Write smoke에서는 Storage Node가 약 `1 V` 부근까지 충전되는 결과를 얻었다.

WL OFF 이후의 short-Hold 및 floating Hold smoke도 일부 조건에서 수치적으로 정상 종료하였다.

반면 BL을 동적으로 floating시키는 통합 Write-to-Hold 구성에서는 수렴 실패 사례도 발생하였다.

이 결과는 **1T1C Mixed-Mode 구현 자체가 불가능한 것은 아님**을 보여주지만, 공식적인 DRAM 동작 기준이나 PASS/FAIL 조건을 확정한 결과는 아니다.

---

## 5. Synopsys 공식 SF_DRAM 예제 실행

Sentaurus T-2022.03 Applications Library의 `Memory/SF_DRAM` 예제를 연구실 서버에서 직접 실행하였다.

주요 SDevice 계산은 모두 정상 종료하였으며, SVisual 후처리까지 완료되었다.

| 항목 | 결과 |
|---|---:|
| `Vtgm` | `0.665 V` |
| `VtLin` | `0.419 V` |
| `IdSat` | `4.929e-06 A` |
| `Ioff` | `4.209e-15 A` |
| Write `Vmax` | `0.454777 V` |
| `T_RET` | `0.2485 s` |

Write 계산에서는 별도의 Mixed-Mode transient가 사용되었으며, `Write_n14_sys_des.plt` 종료 시점 `28.5 ns`에서 Storage Node는 약 `0.454774 V`였다. SVisual에서 추출한 `Vmax=0.454777 V`와 일치하였다.

이 수치는 Synopsys 공식 SF_DRAM 예제의 결과이며 본 연구의 VCAT 최종 구조 성능값이 아니다.

---

## 6. SF_DRAM의 Retention 평가 방식

SF_DRAM에서 Retention은 단순히 Write 후 Storage Node를 장시간 transient로 관찰하는 방식으로만 계산되지 않았다.

별도의 `IdVSC` 계산을 통해 Storage Node 전압에 따른 leakage current를 구한 뒤, SVisual 후처리에서 Storage capacitance와 leakage current를 이용해 Retention time을 계산한다.

`Plot_RT_vis.tcl`에서 사용된 핵심 적분 형태는 다음과 같다.

```text
T_RET ∝ ∫ Cs / |Isc| dVsc
```

`IdVSC_n16_sys_des.plt`에서 Storage Node 전압은 약 `0.432 V`에서 `0.454777 V`까지 변화하며, 해당 구간의 Storage contact leakage current는 약 `9.1e-16 A` 수준으로 계산되었다.

SVisual 결과에서는 `RT=0.248458344763`, 즉 `T_RET≈0.2485 s`가 추출되었다.

따라서 공식 예제에서도 Write와 Retention은 서로 다른 계산 과정과 추출법을 사용한다.

---

## 7. Row Hammer 평가 방식

SF_DRAM에서는 Row Hammer 역시 Write 또는 Retention 계산에 단순히 포함시키지 않고 별도의 Mixed-Mode 조건으로 계산한다.

`n21`부터 `n24`까지의 노드는 모두 Row Hammer split으로 실행되었으며, 각각 precharge 과정과 반복 WL pulse 조건을 포함하였다.

각 SDevice 노드는 정상 종료하였고 `rh_*_sys_des.plt` 및 `rh_dram_*_des.plt` 결과가 생성되었다.

따라서 공식 DRAM 예제에서도 Write, Retention, Disturb/Row Hammer가 **하나의 단순 1T1C transient로 통합되어 평가되지 않는다는 점**을 확인하였다.

---

## 8. SF_DRAM 분석의 연구적 의의

SF_DRAM을 분석한 목적은 해당 예제의 성능값을 본 연구의 VCAT 결과와 직접 비교하기 위한 것이 아니다.

가장 중요한 의미는 **DRAM-level 검증에 실제로 어느 정도의 회로 조건과 평가 절차가 필요한지를 확인한 것**이다.

공식 예제에서도 transistor characterization, Write Mixed-Mode, Retention leakage extraction, Row Hammer가 서로 다른 계산과 후처리 과정으로 구성되어 있었다.

따라서 간략화된 `VCAT + capacitor + bit-line load` 구조 하나만으로 Write/Hold/Read를 계산한 뒤 이를 실제 DRAM 성능 검증으로 확대 해석하는 것은 적절하지 않다고 판단하였다.

SF_DRAM은 최종 성능 검증 데이터나 Window 보정 도구라기보다, **DRAM-level 검증의 요구사항과 한계를 확인하고 본 연구의 직접 검증 범위를 설정하기 위한 기준조사**로 의미가 있다.

---

## 9. Phase 4를 중단한 이유

Phase 4를 중단한 이유는 1T1C simulation을 구현하지 못했기 때문이 아니다.

Single-Metal Mixed-Mode smoke test와 Synopsys 공식 SF_DRAM 실행을 통해 1T1C simulation 자체는 기술적으로 가능함을 확인하였다.

그러나 실제 DRAM-level validation을 수행하려면 본 연구의 핵심 대상인 L-H-L gate geometry 외에도 상당한 회로 설계 및 평가 기준이 추가로 필요하다는 점을 확인하였다.

이를 충분히 검증하지 않은 상태에서 축약 Testbench로 DRAM 성능을 주장하는 것보다, 직접 검증 범위를 명확히 제한하는 것이 연구의 타당성 측면에서 더 적절하다고 판단하였다.

따라서 본 연구에서는 P4의 1T1C 검증을 필수 연구 흐름에서 제외하고, 후반부 연구를 device-level L-H-L geometry 최적화와 tolerance 분석에 집중한다.

---

## 10. 수정된 연구 범위

현재 연구의 핵심 흐름은 다음과 같이 정리한다.

```text
P1~P3
VCAT 기본 구조 및 L-H-L 구조/WF 결정
        ↓
P5
L-H-L Metal Boundary 기반 geometry 최적화
        ↓
P6
Nominal 구조 parameterization 및 공통 조건 고정
        ↓
P7
Geometry sensitivity 분석
        ↓
P8
Device-level
L-H-L Gate Segmentation Geometry
Tolerance Window 확정
        ↓
최종 연구 결과
```

따라서 본 연구의 핵심 주장은 다음과 같이 제한한다.

> **L-H-L gate segmentation geometry가 VCAT의 device-level 전기적 성능에 미치는 영향과 허용 범위를 TCAD를 이용해 정량적으로 분석한다.**

---

## 11. 연구 결과의 해석 범위

본 연구에서 얻은 Device-level 결과를 실제 1T1C DRAM 성능과 직접 동일시하지 않는다.

특히 다음과 같은 확대 해석은 하지 않는다.

- Device-level 성능 향상이 실제 DRAM 성능 향상을 보장한다고 주장하지 않는다.
- 낮은 `Ioff`만으로 실제 DRAM Retention time을 직접 환산하지 않는다.
- Device-level Geometry Tolerance Window를 DRAM Tolerance Window라고 부르지 않는다.
- 제한된 geometry variation 결과를 전체 fabrication tolerance로 확대하지 않는다.

이 구분을 통해 실제로 검증한 영역과 아직 검증하지 않은 영역을 명확히 한다.

---

## 12. 향후 DRAM 적용 연구

DRAM-level 검증은 현재 연구의 필수 단계로 두지 않는다.

향후 충분한 연구 시간과 회로 기준이 확보될 경우, 이번 연구에서 얻은 구조를 대상으로 별도의 DRAM Testbench와 평가 방법을 정립하여 Write, Retention, Disturb 등의 적용 가능성을 추가 연구할 수 있다.

다만 이러한 후속 연구가 수행되지 않더라도 현재 연구는 **device-level L-H-L gate geometry 최적화 및 tolerance 분석**으로 독립적인 결론을 구성한다.

---

## 13. 최종 정리

Synopsys 공식 DRAM 예제를 직접 실행하고 분석함으로써 DRAM-level 검증에는 Write, Retention, Disturb 각각에 대해 별도의 회로 조건과 평가 절차가 필요함을 확인하였다.

이를 근거로, 본 연구에서는 불충분한 축약 1T1C 모델을 이용해 DRAM 타당성을 과도하게 주장하지 않고 직접 검증 범위를 **device-level L-H-L gate geometry 최적화와 tolerance 분석**으로 한정한다.

---

## 14. 관련 서버 및 결과 파일

### Single-Metal P4 사전검증

```text
/user/semi/semi330/VCAT/P4_SingleMetal_1T1C_swb
```

### Synopsys SF_DRAM

```text
/user/semi/semi330/SF_DRAM
```

주요 확인 파일:

```text
Write_n14_sys_des.plt
IdVSC_n16_sys_des.plt
rh_n21_sys_des.plt
rh_n22_sys_des.plt
rh_n23_sys_des.plt
rh_n24_sys_des.plt
gvars.dat
n15_vis.out
n17_vis.out
Plot_RT_vis.tcl
```

---

## 15. 참고 문헌

- A. Spessot and H. Oh, “1T-1C Dynamic Random Access Memory Status, Challenges, and Prospects,” IEEE Transactions on Electron Devices, 2020.
- K.-W. Song et al., “A 31 ns Random Cycle VCAT-Based 4F² DRAM With Manufacturability and Enhanced Cell Efficiency,” IEEE Journal of Solid-State Circuits, 2010.
- D. Feng et al., “Vertical Channel Transistor (VCT) as Access Transistor for Future 4F² DRAM Architecture,” IEEE IMW, 2023.
- S. Eto et al., “A 1-Gb SDRAM with Ground-Level Precharged Bit Line and Nonboosted 2.1-V Word Line,” IEEE Journal of Solid-State Circuits, 1998.
- C. Lee et al., “A Single-Ended Offset-Compensating Bit-Line Sense-Amplifier With Ground Precharge and Charge Transfer Pre Sensing for Sub-1V DRAM,” IEEE Solid-State Circuits Letters, 2025.
- S. Ikenaga et al., “New DRAM Noise Generation Under Half Vcc Precharge and Its Reduction Using a Transposed Amplifier.”
- W. P. Noble and W. W. Walker, “Fundamental Limitations on DRAM Storage Capacitors,” 1985.
