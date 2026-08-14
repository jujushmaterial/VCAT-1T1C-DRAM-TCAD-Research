# Phase 4 서버 파일 인덱스 및 System Plot 정정 — 2026-08-15

## 성격

- 작업자: 이선형 (`@LSH-linear`)
- 관련 Phase / Issue: Phase 4 / #4
- 개인 인수인계 보완 문서이며 공식 P04 제출본이 아니다.
- Phase 4 Issue, 체크리스트, Assignee, `shared/`는 수정하지 않았다.

## 서버 위치

- `semi330@ssudisu1`
- `/user/semi/semi330/VCAT/P4_SingleMetal_1T1C_swb`
- 2026-08-15 02:22 KST 전후 `ls -lh` 확인 총량: 약 `7.0M`
- `ps -fu semi330 | grep '[s]device'` 결과: 출력 없음 — 확인 시점에 잔존 SDevice process 없음

## 주요 입력/기준 파일 존재 확인

- `P02_LocalMesh_SDE.cmd` — 15K
- `P02_SingleMetal_SDevice.cmd` — 2.4K
- `P4A_LocalMesh_SDE_run.cmd` — 15K
- `nP4A_msh.tdr` — 125K
- `P4A_MixedMode_StepA.cmd` — 3.1K
- `P4B_MixedMode_WLTransient.cmd` — 3.6K
- `P4B2_MixedMode_WLTransient_BE.cmd` — 3.6K
- `P4C_Write1_Smoke.cmd` — 3.6K
- `P4C2_Write1_Ranchor.cmd` — 3.7K

## 주요 console/log 존재 확인

- `P4B2_console.log` — 287K
- `P4C_console.log` — 181K
- `P4C2_console.log` — 300K
- `P4B2_stepB_BE.log_des.log` — 286K
- `P4C2_write1_Ranchor.log_des.log` — 299K

## 주요 TDR/PLT 존재 확인

- `dram_P4A_stepA_des.tdr` — 726K
- `dram_P4B2_stepB_BE_des.tdr` — 726K
- `dram_P4C_write1_des.tdr` — 720K
- `dram_P4C2_write1_Ranchor_des.tdr` — 734K

## 중요 정정: transient System Plot은 별도 prefix 파일로 존재

이전 개인 인수인계 문서에는 `P4B2_stepB_BE_sys.plt`에서 transient WL 값이 보이지 않아 System Plot transient 기록 방식을 미해결로 적었다. 서버 전체 파일 목록을 다시 확인한 결과, **transient 구간은 `NewCurrentFile` prefix가 붙은 별도 System PLT로 생성되어 있었다.**

확인된 파일:

### Step B2

- `P4B2_stepB_BE_sys.plt` — 6.3K: precharge/앞 구간 System plot
- `WLTransient_BE_P4B2_stepB_BE_sys.plt` — 20K: **WL transient 구간 System plot 후보**
- `WLTransient_BE_dram_P4B2_stepB_BE_des.plt` — 82K: transient device current/output

### Step C2

- `P4C2_write1_Ranchor_sys.plt` — 6.3K: precharge/앞 구간 System plot
- `Write1_P4C2_write1_Ranchor_sys.plt` — 20K: **Write1 transient 구간 System plot 후보**
- `Write1_dram_P4C2_write1_Ranchor_des.plt` — 82K: transient device current/output

따라서 기존 인수인계의 “System Plot transient 기록 미해결” 문장은 **이 보완 문서로 정정**한다. 현재는 기록 자체가 없었던 것이 아니라, 이전 확인 시 precharge용 기본 파일만 읽고 transient prefix 파일을 놓친 것으로 판단된다.

단, 위 20K prefix System PLT의 실제 데이터 열과 최종 time/node voltage는 아직 직접 재파싱하지 않았다. 다음 접속 시 파일 내용을 확인해 최종적으로 `time`, `v(bl)`, `v(wl)`, `v(sn)` 파형이 정상 기록됐는지 검증한다.

## 다음 접속 시 우선 확인 명령

```csh
cd ~/VCAT/P4_SingleMetal_1T1C_swb

head -35 WLTransient_BE_P4B2_stepB_BE_sys.plt
tail -40 WLTransient_BE_P4B2_stepB_BE_sys.plt

head -35 Write1_P4C2_write1_Ranchor_sys.plt
tail -40 Write1_P4C2_write1_Ranchor_sys.plt
```

이 두 파일에서 transient waveform이 정상 확인되면 이후 Write/Hold/Read에서 같은 `NewCurrentFile` prefix 규칙으로 구간별 System PLT를 추적한다.

## 현재 보존 기준

- 가장 멀리 정상 진행한 smoke code: `P4C2_Write1_Ranchor.cmd`
- C2 기존 확인값: 10 ns 완주, `Step-size is too small` 없음, console 기준 `MAX_SN=0.4564 V`
- 이는 smoke-test 결과이며 공식 Write1 PASS 또는 공식 P4 Testbench가 아니다.
- 1 ms overnight Hold는 시작하지 않았다.
