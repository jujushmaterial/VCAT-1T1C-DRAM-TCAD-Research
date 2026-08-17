# Phase 4 1T1C 중단 결정 및 DRAM Future Work 인수인계 — 2026-08-17

## 1. 기록 성격

- **작업자:** 이선형 (`@LSH-linear`)
- **관련 Phase / Issue:** Phase 4 / #4, 이후 Phase 5~9 연구 흐름 참고
- **관련 Task:** P04-T01~T03 검토 및 개인 사전검증
- **현재 Phase 4 실제 Assignee:** `@seanthe17`
- **문서 성격:** 조원 논의 결과와 이선형의 P4 사전검증·문헌 검토를 정리한 **개인 인수인계 기록**
- **공식 제출/Issue 체크/shared 수정:** 수행하지 않음

> 중요: 2026-08-17 기준 최신 GitHub Issue #4는 여전히 P4에서 공통 1T1C Testbench, Single-Metal baseline, L-H-L 기본 1T1C 동작을 확정하도록 정의되어 있다. 따라서 아래의 “P4 중단”은 사용자에게 전달된 **조원 합의 사항**을 기록한 것이며, 저장소의 공식 Phase 정의는 아직 변경되지 않았다. 향후 팀이 이 방향을 공식 채택하면 P4/P5/P9 연결 문구를 별도로 정비해야 한다.

## 2. 이번 결정의 핵심

조원 논의 결과, **현재 연구의 필수 흐름에서 P4 1T1C 검증을 중단**하기로 했다.

중단 이유는 1T1C를 단순화하여 우회 구현할 경우 실제 DRAM 동작의 회로 조건을 충분히 반영하지 못해, 오히려 “DRAM 타당성 검증”이라는 주장의 신뢰도를 떨어뜨릴 수 있다고 판단했기 때문이다.

현재까지 검토 과정에서 1T1C 동작을 정의하려면 구조 외에도 다음 요소를 새롭게 선택해야 함이 확인되었다.

- Storage capacitor `Ccell`
- Bit-line equivalent load `CBL`
- BL precharge 방식과 전압
- WL high/low 운용
- cell plate bias 여부
- Write/Read/Hold pulse와 시간축
- Read 시 charge sharing 및 sensing 범위
- Sense amplifier/BLB/reference/restore를 어디까지 모델링할지
- Hold/Retention/Read Disturb의 정량 판정 기준

이 값들은 단순한 보조 설정이 아니라 서로 결합된 DRAM 회로 조건이다. 충분한 회로 근거 없이 일부 값만 선택하면, 관찰된 결과가 VCAT 구조 차이 때문인지 Testbench 선택 때문인지 분리하기 어려워질 수 있다.

따라서 이번 연구의 핵심 결과는 우선 **device-level L-H-L gate segmentation geometry 성능·민감도·tolerance**에 집중하고, 1T1C는 시간이 허용될 경우 후속 적용성 검증으로 배치하는 방향이 더 방어적이라고 판단했다.

## 3. 기존 연구 흐름을 우선한 결정

### 3.1 WL Low

- **이번 연구 방향:** 기존 P1~P2에서 사용해 온 `WL Low = 0 V` 기준을 유지한다.
- **검토한 대안:** 실제 DRAM/VCAT 문헌에서 retention 개선을 위한 negative WL bias가 사용됨.
- **미채택 이유:** 지금 negative WL을 새 nominal 조건으로 도입하면 P1~P2에서 이미 구축한 device 기준을 다시 흔들고 별도의 회로 최적화 문제가 추가된다. 현재 프로젝트의 시간과 연구 범위를 고려하면 새 기준 도입의 비용이 크다.
- **처리:** 실제 DRAM에서는 negative WL이 사용될 수 있다는 점만 한계/Future Work로 기록한다.

### 3.2 Storage capacitor plate

- **이번 연구 방향:** 기존 사전검증과의 연속성을 위해 `Ccell-to-GND` 단순화 모델을 유지하는 쪽으로 정리했다.
- **검토한 대안:** 실제 DRAM처럼 별도 cell plate node `VCP`를 두고 중간전압을 인가.
- **미채택 이유:** 본 연구의 핵심은 capacitor reliability/plate 설계가 아니라 VCAT access-transistor geometry 효과이다. VCP를 새로 도입하면 P4에서 새로운 공통 회로조건을 하나 더 정의·검증해야 하고 기존 Single-Metal smoke 결과와 조건도 달라진다.
- **주의:** 이 선택은 실제 상용 DRAM capacitor plate를 재현했다는 의미가 아니다.

### 3.3 Read 범위

P4를 계속할 경우에는 full sense amplifier보다 다음의 최소 charge-sharing 측정이 연구 목적에 더 적합하다고 논의했다.

1. `Ccell`과 `CBL`을 두고 BL을 precharge
2. WL ON
3. SN–BL charge sharing
4. `ΔVBL`, Read time, Read 전·후 `ΔVSN` 측정

다만 최종적으로 P4 자체를 필수 흐름에서 중단했으므로, 이 Read 설계 역시 **현재 공식 기준으로 확정하지 않는다.**

Full BLSA/BLB/reference/restore 회로는 실제 DRAM에는 중요하지만 회로변수·offset·timing·reference·parasitic이 대폭 추가되어, 본 연구의 VCAT 구조 비교를 흐릴 수 있어 현재 범위에서는 채택하지 않았다.

## 4. 참고 문헌과 활용 범위

아래 논문은 P4 회로조건을 이해하고 “왜 단순 1T1C를 바로 DRAM 검증으로 간주하기 어려운가”를 판단하기 위해 검토했다. 특정 논문의 수치를 그대로 우리 nominal 값으로 복사하지 않는다.

### 4.1 Spessot & Oh, 2020 — 1T-1C DRAM review

**A. Spessot and H. Oh, “1T-1C Dynamic Random Access Memory Status, Challenges, and Prospects,” IEEE Transactions on Electron Devices, 2020.**

확인한 역할:

- 1T1C access transistor–BL–storage capacitor 기본 연결
- Write/Read/Retention의 전체 동작 체계
- 현대 DRAM의 boosted WL, negative off-WL, BL precharge, cell plate bias가 서로 독립된 단일 숫자가 아니라 시스템 조건임
- Read에서 `Cs/CBL` 비율과 charge sharing이 sensing margin에 직접 영향을 줌

**채택:** 물리적 동작과 변수 관계의 기준 자료.

**미채택:** 논문에 제시된 전형적인 VPP/VINTA/VCP 등의 수치를 우리 VCAT에 그대로 적용하지 않음. 해당 수치는 특정 DRAM 세대·회로 architecture의 예시이기 때문이다.

### 4.2 Song et al., 2010 — 실제 surrounding-gate VCAT 4F² DRAM

**K.-W. Song et al., “A 31 ns Random Cycle VCAT-Based 4F² DRAM With Manufacturability and Enhanced Cell Efficiency,” IEEE Journal of Solid-State Circuits, 2010.**

확인한 역할:

- surrounding-gate VCAT가 실제 DRAM access transistor로 적용된 직접적인 선행 연구
- VCAT의 high drive, low leakage, retention 및 AC performance가 WL 운용과 연결됨
- WL high 증가에 따른 AC 성능 포화가 약 2 V 수준에서 관찰되었다는 보고
- retention mode에서는 negative WL 운용이 검토됨

**채택:** 우리 vertical/surrounding-gate 구조가 DRAM access device로 연구될 수 있다는 직접적 타당성 근거.

**미채택:** 논문의 WL bias·array 회로값을 우리 P4 nominal로 직접 복사하지 않음. 소자 geometry, technology node, Vth, core architecture가 다르기 때문이다.

### 4.3 Feng et al., 2023 — 미래 4F² VCT access transistor

**D. Feng et al., “Vertical Channel Transistor (VCT) as Access Transistor for Future 4F² DRAM Architecture,” IEEE IMW, 2023.**

확인한 역할:

- vertical access transistor의 WL/BL parasitic capacitance가 DRAM system performance에 중요한 변수임
- 3D TCAD에서 per-cell coupling capacitance를 별도로 평가

**채택:** `CBL`을 임의의 단순 비율만으로 정하면 안 되고 vertical 구조의 parasitic과 array load를 구분해야 한다는 근거.

**미채택:** 논문의 aF 단위 per-cell coupling 값을 Mixed-Mode의 전체 lumped `CBL`로 직접 사용하지 않음. 전체 bit line에는 여러 cell, wiring, contact 등의 load가 포함되므로 물리적 의미가 다르다.

### 4.4 Eto et al., 1998 — Ground precharge + nonboosted WL

**S. Eto et al., “A 1-Gb SDRAM with Ground-Level Precharged Bit Line and Nonboosted 2.1-V Word Line,” IEEE Journal of Solid-State Circuits, 1998.**

확인한 역할:

- GND precharge가 단순히 BL precharge 전압 하나를 0 V로 바꾸는 방법이 아님
- negative WL reset, 낮은 pass-transistor Vth, reference/sense scheme과 결합된 새로운 cell-operating concept
- 이 architecture에서 2.1 V nonboosted WL을 사용

**채택:** GND precharge와 WL 조건은 architecture 전체와 함께 판단해야 한다는 근거.

**미채택:** `BL precharge=0 V`, `WL=2.1 V`를 분리하여 우리 P4 공통값으로 가져오지 않음.

### 4.5 Lee et al., 2025 — GND-precharge single-ended BLSA

**C. Lee et al., “A Single-Ended Offset-Compensating Bit-Line Sense-Amplifier With Ground Precharge and Charge Transfer Pre Sensing for Sub-1V DRAM,” IEEE Solid-State Circuits Letters, 2025.**

확인한 역할:

- 최신 GND precharge도 single-ended offset compensation, charge-transfer pre-sensing, 전용 BLSA와 결합됨
- conventional VCCA/2 precharge와 다른 회로 목적·제약을 가짐

**채택:** 0 V precharge를 “일반 DRAM 기본조건”으로 단정하지 않는 근거.

**미채택:** 해당 BLSA architecture를 P4에 그대로 구현하지 않음. 본 연구의 범위를 sense-amplifier 회로 설계로 확장하기 때문이다.

### 4.6 Half-Vcc precharge noise 연구

**S. Ikenaga et al., “New DRAM Noise Generation Under Half Vcc Precharge and Its Reduction Using a Transposed Amplifier.”**

확인한 역할:

- half-Vcc precharge가 실제 CMOS sense-amplifier DRAM에서 사용된 방식이며 sensing noise와 array coupling이 중요한 문제임

**채택:** precharge 방식 선택이 sensing architecture·noise 문제와 결합된다는 근거.

**미채택:** 오래된 특정 회로의 전압/시간값을 현대 VCAT Testbench 수치로 직접 사용하지 않음.

### 4.7 Noble & Walker, 1985 — DRAM storage capacitor 한계

**W. P. Noble and W. W. Walker, “Fundamental Limitations on DRAM Storage Capacitors,” 1985.**

확인한 역할:

- stored charge, BL sensing ability, capacitor leakage, dielectric field 사이의 기초적인 물리 관계
- cell capacitance를 단순히 작게/크게 정하는 것이 아니라 sensing과 charge retention을 함께 고려해야 함

**채택:** storage capacitance의 물리적 역할을 설명하는 기초 자료.

**미채택:** 당시 DRAM 세대의 저장전하·전압·cell size 수치를 현재 프로젝트 nominal 값으로 사용하지 않음. 기술 세대 차이가 너무 크다.

## 5. Synopsys 공식 SF_DRAM 예제의 위치

Sentaurus T-2022.03 Applications Library의 `Memory/SF_DRAM`을 공식 구현 참고자료로 선택했다.

확인된 코드 측면의 주요 특징:

- 1T1C Mixed-Mode write 예제 존재
- storage capacitor와 매우 큰 저항을 포함한 floating storage-node 처리
- Set/Unset, Quasistationary precharge, Transient, Circuit 결합
- retention은 장시간 Hold transient 하나가 아니라 leakage 특성과 SVisual extraction을 함께 사용하는 흐름을 포함
- Row Hammer는 BL/SC floating 및 반복 pulse를 별도 조건으로 다룸

2026-08-17 현재 공식 SF_DRAM 프로젝트를 `semi330@ssudisu1`에서 실행 중이며 **전체 결과 분석은 아직 완료되지 않았다.** 마지막 확인 시 IdVg 계산 일부와 RH split 일부가 완료되었고 RH SDevice가 계속 실행 중이었다. 따라서 SF_DRAM의 최종 파형·추출값·성공 여부는 이 문서에서 확정하지 않는다.

**추가 계획:** SF_DRAM 실행이 종료되면 실제 결과와 SVisual extraction을 확인해 본 문서에 별도 후속 기록을 추가한다.

## 6. 우리 Single-Metal 사전검증에서 확인된 것

기존 `members/LeeSeonHyeong/handoff/P04_Write1_Hold_Smoke_Handoff_2026-08-17.md`에 상세 기록이 있다.

현재 확인된 핵심은 다음과 같다.

- WL command를 `1.0 → 1.2 → 1.5 → 2.0 V`로 올리며 SN charging이 증가함
- `WL=2.0 V`, `BL=1.0 V` smoke에서 `MAX_SN≈0.9998 V`, WL OFF 후 10 ns 종료 시 SN≈`0.99837 V`
- BL clamp 상태 50 ns short-Hold smoke와 별도 floating Hold-only smoke는 수치적으로 완주
- BL Set/Unset을 포함한 통합 floating Write→Hold 시도는 수렴 실패 사례가 존재
- `Rbl=1 Ω` control Write는 기존 Write 파형과 거의 같은 수준으로 재현됨

이 결과들은 **개인 사전검증(smoke)**이며 P04-T01 공통 Testbench 또는 P04-T02 공식 baseline을 확정한 결과가 아니다.

## 7. 왜 P4를 현재 필수 연구에서 중단하는가

현재까지의 자료를 종합하면 다음 두 사실이 동시에 성립한다.

1. VCAT을 Sentaurus Mixed-Mode 1T1C 회로에 연결해 Write/Hold smoke를 계산하는 것은 기술적으로 가능하다.
2. 그러나 이를 실제 DRAM 타당성 검증으로 주장하려면 `Ccell`, `CBL`, precharge, WL/BL timing, sensing architecture, plate, restore, retention 판정 등 추가 회로 가정을 충분히 정당화해야 한다.

현재 프로젝트는 P1~P3 device 연구에 이미 상당한 시간을 사용했고, 후반부 핵심 목표는 L-H-L geometry 최적화와 tolerance 분석이다. 따라서 P4에서 새로운 DRAM circuit benchmark 자체를 구축하는 것은 연구 범위를 과도하게 넓힐 수 있다.

**결론:** 불충분한 단순 1T1C를 억지로 “DRAM 검증”으로 완료하기보다, 이번 연구의 직접 검증 범위를 device-level로 명확히 제한하는 것이 더 타당하다.

## 8. 수정 제안 연구 스토리

### 8.1 본 연구의 핵심 흐름

```text
P1~P3
VCAT 기본 구조 및 L-H-L 구조/WF 결정
        ↓
P5
L-H-L Metal Boundary 중심 geometry 최적화
        ↓
P6
최종 Nominal 구조 parameterization 및 재현성 확인
        ↓
P7
Nominal 주변 geometry sensitivity 분석
        ↓
P8
Device-level L-H-L Gate Segmentation Geometry
Tolerance Window 확정
        ↓
[본 연구의 핵심 결론]
```

핵심 주장은 다음 수준으로 제한한다.

> L-H-L gate segmentation geometry가 VCAT의 device-level 성능에 미치는 영향과 허용 범위를 TCAD로 정량화한다.

현재 단계에서 다음 주장은 하지 않는다.

- 최종 구조가 실제 1T1C DRAM에서 성능 향상을 보장한다.
- Device-level tolerance window가 곧바로 DRAM-level 또는 전체 fabrication tolerance를 의미한다.

### 8.2 시간 여유가 있을 경우의 보완/Future Work

P8에서 만든 Device-level Window에서 정보가 큰 소수 대표조건을 선택한다.

```text
P8 Device-level Window
        ↓
Nominal / Boundary / Outside / 필요 시 Corner
소수 대표점 선택
        ↓
검증된 1T1C DRAM Testbench 적용
        ↓
Write / Hold / Read / Retention / Disturb 확인
        ↓
Device-level PASS/FAIL 경향이
DRAM-level에서도 유지되는지 평가
```

이 후속 검증의 의미는 “P4를 또 하나의 독립 Window로 만든다”가 아니라,

> **P8 Device-level Geometry Tolerance Window의 DRAM 적용 가능성을 대표점 기반으로 검증한다.**

로 표현하는 것이 정확하다.

충분한 조건을 검증해 device-level 경계와 DRAM-level 경계를 실제로 비교할 수 있을 때에만 `DRAM-validated subset/window`와 같은 확장 개념을 논의한다.

## 9. 현재 GitHub 공식 흐름과의 충돌

2026-08-17 최신 저장소에서는 아직 다음과 같이 정의되어 있다.

- Issue #4: P4에서 1T1C 공통 Testbench와 Single/L-H-L 기본 기능 확정
- Issue #5: Phase 4 기본 1T1C 기능 확인을 선행조건으로 기록
- Issue #9: P4에서 고정한 동일 Testbench를 최종 Multi-Metal 및 Holdout 1T1C 검증에 재사용

따라서 본 문서의 팀 논의 방향과 최신 GitHub 사이에 **명시적 충돌**이 있다.

현재 적용 기준은 GitHub이므로, 이 문서만으로 Phase 순서가 공식 변경된 것은 아니다. 팀이 최종 승인하면 관리자/공용 작업에서 Issue 및 Phase 설명을 별도로 수정해야 한다. 이선형 개인 기록에서 공용 Phase 정의를 임의로 수정하지 않는다.

## 10. 후속 작업

1. 실행 중인 Synopsys `SF_DRAM` 결과가 종료되면 실제 결과 파일/파형/SVisual extraction을 분석한다.
2. 그 결과는 “현재 P4를 중단한 판단이 합리적이었는지”와 “향후 1T1C 후속 검증을 어떻게 구성할지”를 보완하는 참고자료로 기록한다.
3. 조원 합의가 최종 공식 방향으로 확정되면 P4/P5/P9 GitHub Issue 연결 흐름을 공용 작업에서 정비한다.
4. 본 연구 본선은 device-level geometry 최적화와 tolerance 분석에 집중한다.

## 11. 서버 및 관련 기존 기록

- 우리 Single-Metal P4 사전검증 서버:
  - `/user/semi/semi330/VCAT/P4_SingleMetal_1T1C_swb`
- Synopsys 공식 SF_DRAM 실행 프로젝트:
  - `/user/semi/semi330/SF_DRAM`
- 기존 개인 인수인계:
  - `members/LeeSeonHyeong/handoff/P04_MixedMode_Smoke_Handoff_2026-08-15.md`
  - `members/LeeSeonHyeong/handoff/P04_Server_Account_Status_Handoff_2026-08-16.md`
  - `members/LeeSeonHyeong/handoff/P04_Write1_Hold_Smoke_Handoff_2026-08-17.md`

## 12. 검증 상태

- 본 문서에서 새 TCAD 계산은 수행하지 않음.
- Single-Metal 수치는 기존 개인 인수인계에 기록된 실행 결과를 재사용함.
- 문헌 검토 결과는 사용자가 제공한 IEEE 논문 PDF를 기준으로 정리함.
- Synopsys SF_DRAM 전체 실행 결과는 아직 미확정.
- Phase 4 공식 제출/완료 처리, Issue 수정, shared 수정은 수행하지 않음.
