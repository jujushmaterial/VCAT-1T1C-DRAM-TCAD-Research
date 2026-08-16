# Phase 4 진행 전 연구실 서버 계정 상태 인수인계 — 2026-08-16

## 1. 기록 성격

- **작업자:** 이선형 (`@LSH-linear`)
- **관련 Phase / Issue:** Phase 4 / #4
- **관련 Task:** P04-T01, P04-T02 준비·사전검증
- **확인 시각:** 사용자가 각 연구실 계정 터미널에서 직접 확인한 2026-08-16 약 23:07~23:16 KST 스냅샷
- **문서 성격:** 이선형 개인 서버 상태 인수인계. **공식 P04 제출본/완료 증거가 아님.**
- **Phase 4 Issue Assignee:** `@seanthe17`
- **Issue 체크/공식 제출/`shared/` 수정:** 수행하지 않음

이 문서는 사용자가 제공한 터미널 출력만 기록한다. ChatGPT가 연구실 서버에 직접 SSH 접속하거나 새 TCAD 실행을 수행한 것은 아니다.

## 2. 계정별 현재 TCAD 상태

2026-08-16 약 23:07 KST에 각 계정에서 다음 명령으로 확인했다.

```csh
ps -u "$USER" -o pid,lstart,etime,cmd | grep -E 'sdevice|sde|sprocess' | grep -v grep
```

| 계정 | 호스트 | 확인 결과 |
|---|---|---|
| `semi330` | `ssudisu1` | 실행 중인 `sdevice/sde/sprocess` 없음 |
| `semi7` | `ssudisu4` | 실행 중인 `sdevice/sde/sprocess` 없음 |
| `semi333` | `ssudisu1` | 실행 중인 `sdevice/sde/sprocess` 없음 |
| `semi302` | `ssudisu1` | **SDevice 2건 실행 중** |
| `semi114` | `ssudisu2` | 실행 중인 `sdevice/sde/sprocess` 없음 |
| `semi116` | `ssudisu2` | 실행 중인 `sdevice/sde/sprocess` 없음 |

주의: `semi7@ssudisu4`의 `date` 출력은 다른 서버보다 약 47분 느리게 보였다. 서버 시각 동기화 상태는 확인하지 않았으므로 semi7 파일 timestamp를 다른 호스트와 절대시각으로 직접 비교할 때 주의한다.

## 3. semi302에서 확인된 실행 중 P3 작업

### A. `~/p3_Copy`

- PID: `118453`
- working directory: `/user/semi/semi302/p3_Copy`
- command: `sdevice --max_threads 1 pp90_des.cmd`
- 시작 시각: 2026-08-16 16:29:19 KST
- 확인 당시 CPU: 99%
- 확인 당시 경과: 약 6시간 44분
- 최근 갱신 파일(23:15~23:16 KST):
  - `n90_des.out`
  - `n90_des.log`
  - `ForwardDrainRamp_n90_des.plt`

`pp90_des.cmd`에서 확인된 조건:

- Dual-Metal 2-zone Forward 계열
- SN-side WorkFunction = `4.80 eV`
- BL-side WorkFunction = `4.60 eV`
- storage drain goal = `1.0 V`
- `gate_sn`, `gate_bl` goal = `1.0 V`

`n90_des.log`는 확인 당시 nonlinear iteration이 계속 증가하며 로그가 갱신 중이었다. 실패/완료로 단정하지 않고 **RUNNING — 유지**로 기록한다.

### B. `~/p3_Copy_Copy`

- PID: `106540`
- working directory: `/user/semi/semi302/p3_Copy_Copy`
- command: `sdevice --max_threads 1 pp67_des.cmd`
- 시작 시각: 2026-08-16 19:57:30 KST
- 확인 당시 CPU: 99%
- 확인 당시 경과: 약 3시간 16분
- 최근 갱신 파일(23:16 KST):
  - `n67_des.out`
  - `n67_des.log`
  - `GIDLDrainRamp_n67_des.plt`

`pp67_des.cmd`에서 확인된 조건:

- `P03-T12: Dual-Metal (2-zone WF) VCAT - GIDL`
- `gate_sn` WF = `4.90 eV`
- `gate_bl` WF = `4.50 eV`
- storage = `0 -> +1.0 V`
- `gate_sn`, `gate_bl` = `0 -> -0.4 V`

`n67_des.log`는 확인 당시 iteration 29~58 구간이 계속 진행했고 관련 log/out/plt 파일도 23:16까지 갱신됐다. 수렴이 오래 걸리는 구간으로 보이지만 실패로 확정할 근거는 없으므로 **RUNNING — 유지**로 기록한다.

## 4. 서버 상태 해석 시 주의점

- semi302의 위 두 run은 `~/VCAT` 아래가 아니라 홈의 `~/p3_Copy`, `~/p3_Copy_Copy`에 있다. 따라서 `find ~/VCAT ...`만으로는 이 run을 찾을 수 없다.
- 기존 `find` 명령에서 `2>/dev/null`을 사용했을 때 연구실 로그인 shell에서 `Ambiguous output redirect`가 발생했다. csh/tcsh 계열 문법 차이로 판단하며 TCAD 오류가 아니다.
- 두 semi302 run은 CPU 99%이고 최근 log/plt가 갱신됐으므로 확인 시점에는 임의 종료/Abort하지 않기로 했다.
- n90 코드 주석에는 과거 `WF_SN=4.50 / WF_BL=4.90` 조건이 drain ramp에서 abort한 기록이 존재했다. 현재 n90/n67 자체의 실패를 의미하지는 않는다.

## 5. Phase 4 재개 위치

사용자 계획:

- **P4는 `semi333` 계정에서 이어서 수행한다.**
- 이택규 조원이 이전에 P4 관련 작업을 이어서 수행한 이력이 있으므로, 실제 재실행 전에 `semi333`의 최신 P4 파일·로그·Workbench 상태를 먼저 확인한다.
- 기존 이선형 P4 개인 기준점은 `semi330@ssudisu1`의 `/user/semi/semi330/VCAT/P4_SingleMetal_1T1C_swb`와 `P4C2_Write1_Ranchor.cmd` smoke 결과이다.
- `P4C2_Write1_Ranchor.cmd`는 덮어쓰지 않고 새 버전에서 정식 WL 조건 → Write1 → 짧은 Hold 순으로 검증한다.

## 6. 다음 작업

1. `semi333`에서 P4 관련 프로젝트/파일/마지막 실행 로그를 확인한다.
2. 이택규 조원이 이어서 수행한 P4 변경 내용이 있으면 기존 이선형 smoke handoff와 대조한다.
3. 정식 조건과 smoke 조건을 분리한다.
4. semi302의 n90/n67은 종료될 때까지 임의 Abort하지 않는다.
5. 종료 후 `tail -50` 및 최종 로그에서 정상 완료/수렴 실패/도달 ramp를 판정한다.

## 7. 미검증 항목

- semi302 n90/n67의 최종 완료 여부: **미확인, 확인 당시 실행 중**
- semi333 P4의 현재 실제 파일/결과 상태: **아직 이번 확인에서 세부 파일 내용 미확인**
- semi7 호스트 시각 차이의 원인: **미확인**
- 위 서버 상태를 근거로 한 공식 Phase 3/4 완료 판정: **수행하지 않음**
