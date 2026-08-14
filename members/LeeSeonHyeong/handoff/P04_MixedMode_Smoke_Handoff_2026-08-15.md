# Phase 4 Mixed-Mode Smoke Test 인수인계 — 2026-08-15

## 1. 작업 성격

- **작업자:** 이선형 (`@LSH-linear`)
- **관련 Phase / Issue:** Phase 4 / #4
- **관련 Task:** P04-T01, P04-T02 준비·사전검증
- **현재 Phase 4 Assignee:** `@seanthe17`
- **문서 성격:** 이선형 개인 실험 인수인계. **공식 P04 제출본/완료 증거가 아님.**
- **Phase 4 Issue·체크리스트·Assignee 수정:** 수행하지 않음
- **`shared/` 수정:** 수행하지 않음
- **P04 공식 제출:** 수행하지 않음

## 2. 서버 환경과 작업 위치

- 계정: `semi330`
- 호스트: `ssudisu1`
- 작업 폴더: `/user/semi/semi330/VCAT/P4_SingleMetal_1T1C_swb`
- Sentaurus: `T-2022.03`

대용량 TDR/PLT/LOG는 GitHub에 올리지 않았으며 위 서버 폴더에 남아 있다.

## 3. P2 기준 파일 재현 확인

### Local Mesh SDE

서버 파일: `P02_LocalMesh_SDE.cmd`

- 크기: `14358 bytes`
- `git hash-object`: `4841c1fe53359aacae00cd05f87a194f27c837f8`
- `sde -S P02_LocalMesh_SDE.cmd` syntax check: passed, status `0`

실행용 복사본 `P4A_LocalMesh_SDE_run.cmd`에서 `@node@`를 `P4A`로 치환해 mesh를 생성했다.

- 생성 TDR: `nP4A_msh.tdr`
- mesh: `1825 points`, `3454 elements`
- `3454 elements`는 기존 P02 Local Mesh handoff 수치와 일치

### P2 Single-Metal SDevice

서버 파일: `P02_SingleMetal_SDevice.cmd`

- 크기: `2401 bytes`
- `git hash-object`: `35ab8f0c5cfbc13e1a16c5d7b31f3b0bf06ce934`
- electrodes: `bitline`, `storage`, `gate`
- 유지한 physics: Fermi, OldSlotboom, PhuMob, HighFieldSaturation, SRH, Band2Band(Model=NonlocalPath)

## 4. T-2022.03 공식 Mixed-Mode 예제에서 확인한 사항

서버 설치본 Synopsys Applications Library의 `Memory/SF_DRAM` 및 GettingStarted MixedMode 예제를 직접 확인했다.

확인된 문법/방식:

- `Capacitor_pset`, `Vsource_pset`
- `Method=Blocked`, `SubMethod=ILS`, `Circuit`
- `dram.poisson`, `dram.electron`, `dram.hole`, `dram.contact`
- `Set(node=...)` / `Unset(node)`
- DRAM transient 예제에서 `Transient=BE`
- RH 예제에서 BL precharge 후 `Unset(bl)`로 floating BL 구현

따라서 이전 사전 메모의 미검증 `Switch_pset` 방식은 현재 사용하지 않는다.

## 5. 오늘 수행한 Smoke Test

### Step A — 최소 Mixed-Mode + BL DC precharge

파일: `P4A_MixedMode_StepA.cmd`

조건:

- Grid: `nP4A_msh.tdr`
- gate WF `4.70 eV`
- `Cs=10 fF`, `Cbl=100 fF`
- WL `0 V`, SN `Set(sn=0)`
- BL `0 -> 0.5 V` DC ramp

결과:

- status `0`
- wallclock `34.67 s`
- `P4A_stepA_sys.plt` 마지막 `v(bl)=0.500000 V`, `v(wl)=0 V`, `v(sn)=0 V`

**판정: PASS — Mixed-Mode 연결과 BL DC precharge 확인.**

### Step B — 기본 transient(BDF2)

파일: `P4B_MixedMode_WLTransient.cmd`

- WL smoke pulse high `1.0 V`, delay `1 ns`, rise/fall `0.2 ns`, on `2 ns`, FinalTime `10 ns`
- `Transient=BE` 미지정

결과:

- 약 `9.0431 ps -> 11.218 ps` 부근에서 RHS 폭증 및 Newton retry
- 최종 `Step-size is too small`
- WL pulse 시작 `1 ns`보다 훨씬 전 실패

**판정: FAIL. WL edge 자체를 원인으로 확정할 수 없음.**

### Step B2 — `Transient=BE`

파일: `P4B2_MixedMode_WLTransient_BE.cmd`

Step B 대비 `Transient = BE`만 핵심 변경.

결과:

- status `0`
- wallclock `216.37 s`
- 마지막 accepted step `9.9995e-09 -> 1.0000e-08 s`
- 10 ns 최종 시간 도달
- console gate contact 최대 outer voltage `1.0 V`
- 중간 Newton/RHS retry는 있었지만 `Step-size is too small` 없이 완주

**판정: PASS — BE transient 10 ns 및 WL pulse 전달 확인.**

주의: `P4B2_stepB_BE_sys.plt`에서는 transient WL 데이터가 기대대로 추출되지 않았고 precharge 값만 보였다. console contact table에서는 gate=1.0 V가 확인됐다. System Plot 기록 방식은 미해결.

### Step C — SN 완전 floating

파일: `P4C_Write1_Smoke.cmd`

변경:

- BL 목표 `1.0 V`
- transient 전 `Unset(sn)`
- SN anchor 없음
- `Transient=BE`

결과:

- 실제 transient 약 `22 ps`에서 `Step-size is too small`
- `MAX_SN ≈ 6.892e-12 V`

**판정: FAIL. Write1 동작으로 볼 수 없음.**

### Step C2 — `Rsn=1e20 Ohm` numerical anchor

파일: `P4C2_Write1_Ranchor.cmd`

추가:

```text
Resistor_pset Rsn (sn 0) {
  resistance = 1e20
}
```

주요 조건:

- `Cs=10 fF`, `Cbl=100 fF`
- BL `1.0 V`
- WL smoke high `1.0 V`
- `Unset(sn)`
- `Transient=BE`
- FinalTime `10 ns`

결과:

- status `0`
- 마지막 accepted step `9.9764e-09 -> 1.0000e-08 s`
- 10 ns 최종 시간 도달
- `Step-size is too small` 없음
- storage contact 179개 행에서 `MIN_SN=0 V`, `MAX_SN=0.4564 V`
- 진행 중 약 `2.652 ns`에서 `BL=1.0 V`, `WL=1.0 V`, `SN≈0.4271 V` 관찰

**판정: PASS as smoke test.**

단, **공식 Write1 PASS가 아니다.**

- WL `1.0 V`는 smoke 조건
- 프로젝트 후보 WL Active `2.5 V`는 아직 미검증
- SN max `0.4564 V`로 후보 `SN >= 0.9 V` 미달
- `Rsn=1e20 Ohm`은 numerical stabilization 후보일 뿐 공식 P4 회로 요소로 승인되지 않음
- Write/Hold/Read/Disturb 통합 실행 안 함

## 6. 현재 판정 요약

| 단계 | 결과 |
|---|---|
| Step A — Mixed-Mode + BL 0→0.5 V | PASS |
| Step B — BDF2 transient | FAIL |
| Step B2 — BE 10 ns + WL pulse | PASS |
| Step C — anchor 없는 floating SN | FAIL |
| Step C2 — BE + 1e20 Ohm anchor + floating SN | PASS (smoke only) |

핵심은 `P4C2_Write1_Ranchor.cmd`가 현재 가장 멀리 정상 진행한 개인 smoke-test 기준점이라는 것이다. 이를 공식 P4 Testbench나 Write1 PASS로 간주하지 않는다.

## 7. 아직 하지 않은 것

- WL Active `2.5 V` 검증
- WL Standby `-0.2 V` 검증
- 정식 Write1 / Write0
- 1 ms Hold1 / Hold0
- Hold ΔSN / leakage
- Read BL precharge → `Unset(bl)` charge sharing
- Read ΔVBL / read disturb
- P3 L-H-L 1T1C
- 공식 P04 제출 및 체크리스트 수정

**중요: 2026-08-15 새벽에는 1 ms overnight Hold 계산을 시작하지 않았다. 따라서 다음 접속 시 자동으로 새 Hold 결과가 생겨 있을 것으로 기대하면 안 된다.**

## 8. 다음 접속 시 매뉴얼

### A. 서버 접속 직후

```csh
cd ~/VCAT/P4_SingleMetal_1T1C_swb
ps -fu semi330 | grep '[s]device'
```

아무 출력이 없으면 남은 SDevice process 없음. PID가 보이면 먼저 어떤 `.cmd`인지 확인하고 임의로 재실행하지 않는다.

### B. 오늘 C2 기준 결과 재확인

```csh
grep 'Computing BE-step' P4C2_console.log | tail -3
grep -E 'Step-size is too small' P4C2_console.log | tail -5
grep '^[[:space:]]*storage[[:space:]]' P4C2_console.log | awk '{x=$2+0; if(n==0||x>mx)mx=x; if(n==0||x<mn)mn=x; n++} END {print "ROWS =",n," MIN_SN =",mn,"V MAX_SN =",mx,"V"}'
```

기대되는 기존 확인값:

- FinalTime 10 ns 도달
- `Step-size is too small` 없음
- `MAX_SN = 0.4564 V`

값이 다르면 파일 덮어쓰기/재실행 여부를 먼저 확인한다.

### C. 다음 정식 작업 순서

1. `P4C2_Write1_Ranchor.cmd`를 **덮어쓰지 말고 새 파일로 복사**한다.
2. `Transient=BE`는 유지한다.
3. `Rsn=1e20 Ohm`은 우선 수렴용 후보로 유지하되 최종 공통 기준으로 확정하지 않는다.
4. Write 조건을 정식 후보로 옮길 때 WL을 한 번에 임의 변경하지 말고 단계적으로 bias/convergence/current/electric-field를 확인한다.
5. Write 종료 후 WL standby와 BL hold 상태를 별도 구간으로 만든다.
6. 1 ms Hold 전에 ns/us 중간 길이 transient를 먼저 검증한다.
7. Read는 BL 0.5 V precharge 후 `Unset(bl)` 방식으로 floating BL을 만들고 `Cbl=100 fF`에서 ΔVBL을 측정하는 방향을 우선 사용한다.
8. System Plot transient 기록 문제가 해결되기 전에는 console contact 결과와 final-time 로그를 함께 보존한다.

### D. 새로운 run이 끝났을 때 성공 판정 순서

`Good Bye` 또는 shell status `0`만 보고 성공이라고 판단하지 않는다.

항상 아래를 순서대로 본다.

```csh
echo $status
grep 'Computing BE-step' <console.log> | tail -3
grep -E 'Step-size is too small|Exit due to failure' <console.log> | tail -10
```

그 다음 목적에 맞는 node/contact 전압 범위를 확인한다.

- Write: WL/BL이 의도한 bias에 도달했는지, SN이 실제 충전/방전됐는지
- Hold: 최종 시간에 도달했는지, SN 시작/끝/ΔSN 및 leakage
- Read: BL이 precharge 뒤 floating인지, ΔVBL이 생겼는지, read 전후 SN disturb

### E. 1 ms Hold 결과를 나중에 얻었을 때 기록할 항목

- 사용한 `.cmd` 파일명과 기존 기준 파일
- `Transient=BE` 여부
- Cs, Cbl, Rsn
- WL Write / WL Hold 값
- BL Write / BL Hold 값
- SN initial/write-end/hold-end voltage
- FinalTime 실제 도달 여부 (`1.0000e-03 s`)
- `Step-size is too small` 여부
- Newton retry 존재 여부
- Hold 중 ΔSN
- storage current/leakage 추출 방식과 단위
- wallclock / peak memory
- 서버 원본 경로

## 9. 공식 업로드 전 주의

Phase 4 공식 Issue/대시보드 제출은 **이선형 개인 인수인계와 별개**이다. 사용자가 직접 공식 업로드하기 전까지 이 문서나 smoke code를 Phase 4 산출물로 등록하지 않는다.

공식 제출 전에 최소한 다음을 다시 확인해야 한다.

- 최신 Phase 4 Issue/Assignee
- 정식 P04-T01/P04-T02 Output ID
- 실제 정식 Write/Hold/Read 조건
- 실행 완료와 final-time 증거
- 수치/단위/원본 서버 경로
- smoke 조건과 공식 조건이 섞이지 않았는지

## 10. 핵심 한 줄

**다음 작업은 `P4C2_Write1_Ranchor.cmd`를 보존한 채 새 복사본에서 정식 Write→Hold를 단계적으로 구성하는 것이며, 오늘 확인된 것은 `BE + Rsn=1e20 Ohm` 조합의 10 ns smoke 수렴과 SN 최대 0.4564 V까지이다.**
