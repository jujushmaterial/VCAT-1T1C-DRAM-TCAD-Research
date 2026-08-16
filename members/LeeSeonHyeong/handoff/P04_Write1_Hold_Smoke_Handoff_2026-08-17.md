# Phase 4 Single-Metal Write1·Hold Smoke 인수인계 — 2026-08-17

## 1. 기록 성격

- **작업자:** 이선형 (`@LSH-linear`)
- **관련 Phase / Issue:** Phase 4 / #4
- **관련 Task:** P04-T01, P04-T02 준비·개인 사전검증
- **현재 Phase 4 Assignee:** `@seanthe17`
- **서버:** `semi330@ssudisu1`
- **작업 폴더:** `/user/semi/semi330/VCAT/P4_SingleMetal_1T1C_swb`
- **Sentaurus 버전:** T-2022.03
- **문서 성격:** 이선형 개인 실험 인수인계. **공식 P04 제출본/완료 증거가 아님.**
- **Issue 체크/공식 제출/`shared/` 수정:** 수행하지 않음

이 문서는 사용자가 연구실 서버에서 직접 실행하고 제공한 터미널 출력과 생성 PLT에서 추출한 값만 기록한다. ChatGPT가 연구실 서버에 직접 SSH 접속하거나 TCAD를 실행한 것은 아니다.

## 2. 오늘 작업 시작점과 semi333 확인 결과

기존 개인 기준점은 2026-08-15의 `P4C2_Write1_Ranchor.cmd`였다.

- `Transient=BE`
- `Cs=10 fF`
- `Cbl=100 fF`
- `Rsn=1e20 Ohm`
- BL `1.0 V`
- WL smoke high `1.0 V`
- FinalTime `10 ns`
- 기존 결과: `MAX_SN=0.4564 V`, status 0, 10 ns 완주

2026-08-16 밤 `semi333`을 확인했으나 홈과 `~/VCAT`에서 P4/1T1C 사용자 프로젝트 또는 Mixed-Mode 실행 파일은 확인되지 않았다. 대신 Sentaurus 공식 Applications Library 자료를 `~/TCAD_AI_Reference_Raw/Memory/SF_DRAM`에 확보해 둔 흔적을 확인했다.

공식 `SF_DRAM` 예제에서 오늘 직접 확인한 핵심은 다음과 같다.

- `sdevice_mixedmode_des.cmd`: `Transient=BE`, storage capacitor `10e-15 F`, `Resistor_pset R0 (sc 0) {resistance=1e20}`, `Set(sc=0)` 후 `Unset(sc)` 사용
- `RH_des.cmd`: `Csn=10e-15 F`, `Cbl=45e-15 F`, `Set(sc=0)`, `Set(bl=0)` 후 precharge하고 `Unset(sc)`, `Unset(bl)`로 둘 다 floating 처리
- `retention_des.cmd`: 파일명과 달리 오늘 확인한 내용에는 장시간 `Transient` Hold가 없고 `vsc` Quasistationary sweep이 주 내용

따라서 오늘 P4 실제 계산은 더 진전된 기존 `semi330` 기준점에서 계속 수행했다. 공식 예제의 전압값·Cbl 값 자체는 우리 P4 기준으로 복사하지 않았고, 문법/회로 구성 근거로만 참고했다.

## 3. C3 계열 — WL 단계 증가 Write1 사전검증

기존 C2는 보존하고 새 파일만 생성했다. 모든 run은 BL DC goal `1.0 V`, `Cs=10 fF`, `Cbl=100 fF`, `Rsn=1e20 Ohm`, `Transient=BE`, FinalTime `10 ns`를 유지했다.

### 3.1 C3a — WL command 1.2 V

- **파일:** `P4C3a_Write1_WL1p2.cmd`
- **console:** `P4C3a_console.log`
- **실행 결과:** status `0`
- **FinalTime:** `10 ns` 도달
- **failure:** `Step-size is too small` / `Exit due to failure` 확인되지 않음
- **wallclock:** `295.13 s` (`4m55s`)
- **peak memory:** `212 MB`
- **storage rows:** `176`
- **MAX_SN:** `0.6483 V`

**판정:** 수치해석적 성공. WL command 증가에 따라 C2 대비 SN charging이 증가했다. 공식 Write1 PASS 판정은 아님.

### 3.2 C3b — WL command 1.5 V

- **파일:** `P4C3b_Write1_WL1p5.cmd`
- **console:** `P4C3b_console.log`
- **실행 결과:** status `0`
- **FinalTime:** `10 ns` 도달
- **failure:** `Step-size is too small` / `Exit due to failure` 확인되지 않음
- **wallclock:** `436.29 s` (`7m16s`)
- **peak memory:** `212 MB`
- **storage rows:** `193`
- **MAX_SN:** `0.934 V`
- **10 ns 종료부 storage:** 약 `0.9339 V`

**판정:** 수치해석적 성공. 1.5 V command에서 SN이 BL 1 V에 근접했다.

### 3.3 C3c — WL command 2.0 V

- **파일:** `P4C3c_Write1_WL2p0.cmd`
- **console:** `P4C3c_console.log`
- **transient system PLT:** `Write1_P4C3c_write1_WL2p0_sys.plt`
- **실행 결과:** status `0`
- **FinalTime:** `10 ns` 도달
- **failure:** `Step-size is too small` / `Exit due to failure` 확인되지 않음
- **wallclock:** `530.12 s` (`8m50s`)
- **peak memory:** `214 MB`
- **console MAX_SN:** `0.9998 V`

`Write1_P4C3c_write1_WL2p0_sys.plt`를 직접 파싱해 transient 실제 파형을 확인했다.

| 항목 | 값 |
|---|---:|
| MAX_BL | `1.0 V` |
| MAX_WL | `2.0 V` |
| MAX_SN | `0.99981188128259 V` |
| Final time | `1.0e-8 s` |
| Final BL | `1.0 V` |
| Final WL | `0 V` |
| Final SN | `0.998367512656142 V` |

주요 시점:

| 시점 | BL | WL | SN |
|---:|---:|---:|---:|
| `0.8389 ns` | `1.0 V` | `0 V` | `0 V` |
| `1.0 ns` | `1.0 V` | `0 V` | `0 V` |
| `1.2 ns` | `1.0 V` | `2.0 V` | `0.20152 V` |
| `2.005 ns` | `1.0 V` | `2.0 V` | `0.89737 V` |
| `3.031 ns` | `1.0 V` | `2.0 V` | `0.99951 V` |
| `3.4 ns` | `1.0 V` | `0 V` | `0.99837 V` |
| `10 ns` | `1.0 V` | `0 V` | `0.99837 V` |

**판정:** C3c는 현재 개인 Write1 사전검증 중 가장 좋은 기준점이다. 실제 system transient에서 WL=2.0 V pulse, BL=1.0 V, SN charging 및 WL OFF 후 SN 유지가 확인됐다. 1.5→2.0 V에서 SN이 BL 1 V 부근에 도달해 오늘은 WL 2.5 V run을 추가하지 않았다.

**주의:** 이는 `WL=2.0 V`를 P04 공식 공통기준으로 확정했다는 의미가 아니다. P04-T01의 전압·시간·부하·측정·판정 기준은 아직 공식 고정되지 않았다.

## 4. C4a — BL clamp 상태 50 ns short-Hold smoke

C3c를 보존하고 `P4C4a_Write1_ShortHold.cmd`를 생성했다.

조건:

- WL command high `2.0 V`
- pulse delay `1.0 ns`
- rise/fall `0.2 ns`
- on time `2.0 ns`
- WL period를 `1.0 us`로 늘려 50 ns 안에 두 번째 pulse가 발생하지 않도록 함
- BL은 `1.0 V` 전압원에 계속 clamp
- FinalTime `50 ns`
- MaxStep `1.0e-10 s`

결과:

- status `0`
- `50 ns` 완주
- wallclock `940.40 s` (`15m40s`)
- peak memory `215 MB`
- `SN(3.4 ns)=0.998367525278254 V`
- `SN(50 ns)=0.998367503250624 V`
- `ΔSN=-2.20276300533229e-08 V` (약 `-22 nV`)

**판정:** BL=1 V clamp 상태에서 WL OFF 이후 50 ns 동안 high-state가 수치적으로 안정적으로 유지됐다.

**주의:** BL이 계속 voltage source에 연결된 상태이므로 정식 Hold 또는 retention 성능으로 해석하지 않는다. 위 미세 ΔSN을 물리적 leakage 값으로 확정하지 않는다.

## 5. C4b — BL/SN floating high-state Hold-only smoke

### 5.1 코드 구성

- **파일:** `P4C4b_FloatingHold_Smoke.cmd`
- **console:** `P4C4b_console.log`
- **transient system PLT:** `Hold_P4C4b_floating_hold_sys.plt`
- WL: `Vsource_pset vwl (wl 0) { dc = 0.0 }`
- BL voltage source: 제거
- 초기: `Set(sn=0)`, `Set(bl=0)`
- Quasistationary Goal:
  - `Node="bl"`, `Voltage=1.0 V`
  - `Node="sn"`, `Voltage=0.9983675 V`
- transient 전: `Unset(sn)`, `Unset(bl)`
- `NewCurrentFile="Hold_"`
- FinalTime `50 ns`
- `Transient=BE`

코드 수정 도중 SN Goal을 삽입하는 한 차례 `sed` 명령이 shell에서 실패했으나, **실행 전에 다시 삽입하고 `grep`으로 최종 코드에 BL Goal과 SN Goal, 두 `Unset`이 존재함을 확인한 뒤 run했다.**

### 5.2 실행 결과

- `Sentaurus Device simulation finished`
- `Good Bye`
- wallclock `398.41 s` (`6m38s`)
- peak memory `206 MB`
- FinalTime `50 ns`
- 시작 BL `1.0 V`
- 종료 BL `1.0 V`
- `ΔBL=0 V`
- 시작 SN `0.9983675 V`
- 종료 SN `0.998367499999954 V`
- `ΔSN=-4.59632332194815e-14 V`

**판정:** BL/SN을 모두 floating 처리한 high-state Hold-only smoke에서 50 ns까지 수치적으로 안정적으로 완주했다.

**중요:** C4b는 C3c의 실제 Write transient 상태를 그대로 이어받은 통합 Write→Hold run이 아니다. Quasistationary Node Goal로 BL/SN 초기값을 만든 뒤 floating한 별도 Hold-only smoke이다. 따라서 `P04-T02 Hold1 완료`, retention 성능 또는 leakage 검증 완료로 간주하지 않는다.

## 6. 오늘 확인된 run 요약

| Run | 목적 | WL command | FinalTime | 핵심 결과 | wallclock | 판정 |
|---|---|---:|---:|---|---:|---|
| C3a | Write1 단계검증 | `1.2 V` | `10 ns` | `MAX_SN=0.6483 V` | `295.13 s` | 수치 성공, 개인 smoke |
| C3b | Write1 단계검증 | `1.5 V` | `10 ns` | `MAX_SN=0.934 V`, final≈`0.9339 V` | `436.29 s` | 수치 성공, 개인 smoke |
| C3c | Write1 단계검증 | `2.0 V` | `10 ns` | `MAX_SN=0.9998119 V`, final=`0.9983675 V` | `530.12 s` | 수치 성공, 현재 Write1 기준점 |
| C4a | clamp short Hold | Write 후 0 V | `50 ns` | `ΔSN≈-2.20e-8 V`, BL clamp | `940.40 s` | 수치 성공, 정식 Hold 아님 |
| C4b | floating Hold-only | `0 V` | `50 ns` | `ΔSN≈-4.60e-14 V`, `ΔBL=0 V` | `398.41 s` | 수치 성공, Hold-only smoke |

## 7. 현재 P4 위치

최신 Issue #4 기준 P4는 세 Task로 구성된다.

1. `P04-T01` — 1T1C 공통기준 설정
2. `P04-T02` — Single-Metal 1T1C Baseline 확정
3. `P04-T03` — P3 L-H-L 기본 1T1C 동작 확인

오늘 작업은 **공식 T01/T02 완료가 아니라, P04-T02 Single-Metal Baseline에 들어가기 위한 개인 Write1·Hold1 사전검증**이다. 저장소 자동 상태가 별도 제출 증거를 요구하므로 이 문서를 Phase 완료 증거로 사용하지 않는다.

## 8. 서버 원본 위치

대용량 원본은 GitHub에 업로드하지 않았다.

```text
/user/semi/semi330/VCAT/P4_SingleMetal_1T1C_swb
```

주요 오늘 파일:

```text
P4C3a_Write1_WL1p2.cmd
P4C3a_console.log
P4C3b_Write1_WL1p5.cmd
P4C3b_console.log
P4C3c_Write1_WL2p0.cmd
P4C3c_console.log
Write1_P4C3c_write1_WL2p0_sys.plt
P4C4a_Write1_ShortHold.cmd
P4C4a_console.log
Write1_P4C4a_write1_shorthold_sys.plt
P4C4b_FloatingHold_Smoke.cmd
P4C4b_console.log
Hold_P4C4b_floating_hold_sys.plt
```

## 9. 미검증 / 미완료

- P04-T01 공통 WL/BL/Storage Node 전압 조건 최종 고정: **미완료**
- `Rsn=1e20 Ohm`의 P04 공식 회로 요소 채택: **미확정**. 다만 Sentaurus 공식 SF_DRAM 예제에서 같은 크기의 storage-node resistor 사용을 확인함
- 실제 Write1 transient 상태를 직접 이어받는 **Write→floating Hold 통합 run:** 미수행
- Write0 / Hold0: 미수행
- 장시간 Hold (예: 1 ms): 미수행
- Hold leakage/current 정식 추출: 미수행
- Read BL precharge→floating / ΔVBL / Read disturb: 미수행
- P3 L-H-L 1T1C: 미수행
- 공식 P04 submission/checklist: 미수행

## 10. 다음 시작점

다음 작업은 `P4C3c_Write1_WL2p0.cmd`와 `P4C4b_FloatingHold_Smoke.cmd`를 보존한 채 새 파일에서 다음을 수행한다.

1. 실제 Write1 transient를 수행한다.
2. Write 종료 후 WL을 OFF한다.
3. BL을 실제로 disconnect/floating 상태로 전환한다.
4. 같은 시퀀스에서 Hold transient를 이어간다.
5. ns/us 단위 중간 Hold에서 수렴과 node 상태를 검증한 뒤 장시간 Hold timestep 전략을 정한다.
6. 이후 Write0/Hold0, Read, Disturb로 확장한다.
7. 마지막으로 같은 공통 Testbench를 P3 대표 L-H-L 구조에 적용한다.

## 11. 핵심 한 줄

**2026-08-17 새벽 개인 사전검증에서는 Single-Metal C3c에서 실제 WL 2.0 V pulse와 BL 1.0 V에서 SN을 약 0.99837 V까지 Write하고, 별도 C4b Hold-only 구성에서 BL/SN floating 50 ns를 수치적으로 완주했다. 다음 단계는 이 둘을 하나의 실제 Write→floating Hold 시퀀스로 통합하는 것이다.**
