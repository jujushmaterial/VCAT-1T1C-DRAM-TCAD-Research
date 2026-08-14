# Phase 4 Mixed-Mode 사전 점검 메모 — 2026-08-15

## 1. 작업 목적

Phase 4의 P04-T01 공통 1T1C Mixed-Mode Testbench와 P04-T02 Single-Metal 1T1C Baseline을 준비하기 전에, 최신 GitHub 기준과 기존 P2 Single-Metal 구조/물리 모델, 관련 논문 조건을 대조하고 Mixed-Mode 코드 초안의 전제와 미검증 항목을 기록한다.

## 2. 관련 Phase와 결과물 ID

- Phase 4 / Issue #4
- 관련 예정 산출물: P04-T01-O01~O07, P04-T02-O01~O07
- 현재 Issue 실제 Assignee: `seanthe17`
- 이 메모는 이선형 개인 연구 메모이며 Phase 4 공식 제출본/완료 증거가 아니다.

## 3. 현재 공식 상태

- Phase 4는 P3 대표 L-H-L 구조 및 Fixed WF 확정 대기 상태이다.
- 따라서 P04-T03 L-H-L 1T1C 실행은 P3 handoff 완료 후 진행해야 한다.
- 현재는 P04-T01 공통 Testbench 및 P04-T02 Single-Metal Baseline 준비/검토 범위로 제한한다.

## 4. P2 Single-Metal에서 확인한 기준

### 실제 contact 이름

기존 P2 SDE/SDevice에서 확인된 contact는 다음 3개이다.

- `storage`: Storage Node 측 top contact
- `bitline`: Bit Line 측 bottom contact
- `gate`: continuous gate contact

현재 P2 구조에는 별도의 `substrate` contact가 없다. 따라서 Mixed-Mode `System`에서 임의의 `source/drain/substrate` 이름을 사용하지 않고 실제 electrode 이름을 그대로 매핑해야 한다.

### P2 SDevice physics

기존 P2 기준 SDevice는 다음을 사용한다.

- Fermi
- EffectiveIntrinsicDensity(OldSlotboom)
- Mobility(PhuMob, HighFieldSaturation)
- Recombination(SRH, Band2Band(Model=NonlocalPath))
- cylindrical coordinate setup

Phase 4에서는 우선 이 physics를 유지하여 Single-Metal baseline과의 연속성을 확보한다. 별도 검증 없이 impact ionization 등 새 물리 모델을 추가하지 않는다.

### P2 Single-Metal 전기특성 참고

기존 공식 DC metrics에서 Vth는 약 0.50 V 수준으로 추출되어 있다. 다만 기존 gate sweep 검증 범위와 Phase 4 제안 WL Active=2.5 V는 동일 범위가 아니므로, 2.5 V 사용 전 convergence/electric-field/current sanity check가 필요하다.

## 5. 논문 기반 Mixed-Mode 조건과 프로젝트 조건 구분

논문/프로젝트 검토를 통해 다음과 같이 구분한다.

- Storage capacitor `Cs = 10 fF`: 논문 기반
- Bit-line capacitor `Cbl = 100 fF`: 논문 기반
- `Cbl/Cs = 10`: 위 값에서 파생
- BL precharge `0.5 V`: 논문 기반 기준과 정합
- BL Write 1 `1.0 V`: 프로젝트 Phase 4 제안값
- BL Write 0 `0.0 V`: 프로젝트 Phase 4 제안값
- WL Active `2.5 V`: 프로젝트 제안값, P2에서 동일 bias 직접 검증되지 않음
- WL Standby `-0.2 V`: 프로젝트 제안값, 추가 검증 필요
- Write 5 ns / Hold 1 ms / Read 5 ns: Phase 4 기능 검증용 프로젝트 기준 후보
- Target Storage Node >= 0.9 V: 판정 기준 후보이며 논문 직접 기준으로 확정하지 않음

## 6. Mixed-Mode 코드 초안에서 확인된 핵심 논리

### Electrode 매칭

Physical device instance는 다음 mapping을 사용해야 한다.

```text
DramCell n1 (
  "bitline" = BL_node
  "gate"    = WL_node
  "storage" = SN_node
)
```

`Sub_node`는 현재 P2 TDR에 실제 substrate electrode가 없으므로 추가하지 않는다.

### Read charge sharing

Read 단계에서 BL을 이상적인 0.5 V voltage source에 계속 직접 연결하면 `VBL`이 clamp되어 charge-sharing에 의한 `Delta VBL`을 제대로 관측할 수 없다.

따라서 필요한 회로 동작은 다음과 같다.

1. BL을 0.5 V로 precharge
2. read 직전에 BL driver에서 분리
3. BL을 `Cbl=100 fF`에 의해 floating 상태로 둠
4. WL read pulse 인가
5. `V(BL_node)` 변화를 기록하여 `Delta VBL` 추출

Read sense margin은 결과를 보기 전에 고정한 sample time 기준으로 비교하는 방향을 우선 검토한다.

## 7. 코드 초안의 미검증 항목

현재 작성된 Mixed-Mode draft는 아직 연구실 Sentaurus에서 실행하지 않았다. 따라서 아래 syntax는 실행 가능하다고 확정하지 않는다.

- BL isolation 구현에 사용하려던 `Switch_pset`의 존재/port/parameter syntax
- voltage source의 임의 PWL syntax 형식
- physical device + circuit 초기화 방식
- 여러 `Transient` block 사이의 absolute `InitialTime`/`FinalTime` 연결 방식
- `System Plot`의 device current node 표기
- 현재 서버 Sentaurus release에서의 compact element parameter 명칭

특히 `Switch_pset`은 공식 서버 환경에서 syntax 확인 전까지 기준 코드에 확정 반영하지 않는다. BL floating 구현 방법은 설치된 Sentaurus 예제/매뉴얼 또는 syntax test를 통해 먼저 검증한다.

## 8. 현재 코드 검토 결론

- P2 contact mapping과 physics 재사용 방향은 타당하다.
- `Cs=10 fF`, `Cbl=100 fF`, BL precharge=0.5 V를 공통 Testbench 출발점으로 사용할 근거가 있다.
- read 단계의 BL isolation/floating 처리는 필수이다.
- 기존 draft는 회로 논리는 맞지만 `Switch_pset` 등을 포함한 Sentaurus 문법이 아직 검증되지 않아 즉시 실행 가능한 최종 코드로 간주하면 안 된다.
- Single-Metal P04-T02 실행 전에 먼저 최소 Mixed-Mode syntax smoke test가 필요하다.

## 9. 다음 작업

1. 현재 연구실 Sentaurus 버전/예제에서 BL isolation 또는 floating-node 구현 방법 확인
2. 가장 작은 Mixed-Mode syntax test로 physical VCAT + Cs + Cbl + WL/BL source 연결 확인
3. System Plot에서 `V(SN_node)`, `V(BL_node)`, `V(WL_node)` 출력 확인
4. Write 1/0 두 조건을 분리 실행할 수 있도록 pulse source 구성 검증
5. ns 구간과 1 ms hold 구간의 transient time-step strategy 검증
6. 실행 성공 후에만 P04-T01 기준 코드 후보로 정리
7. P3 handoff가 완료되기 전까지 P04-T03 L-H-L 공식 실행은 보류

## 10. 실행/검증 상태

- GitHub 최신 기준 확인: 수행
- 기존 P2 SDE/SDevice/metrics 대조: 수행
- 연구실 Sentaurus 실행: 수행하지 않음
- Mixed-Mode syntax compile/run: 수행하지 않음
- Write/Hold/Read 실제 파형: 없음
- P04 Pass/Fail 수치 확정: 미확정
