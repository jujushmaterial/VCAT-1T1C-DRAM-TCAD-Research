# Phase 1 — 기존 SProcess 구조의 Dual-WF 전기적 작동 원인 검증

- **담당자:** 주상현 (`@jujushmaterial`)
- **GitHub Issue:** #1
- **작업 폴더:** `members/JuSanghyeon/phases/phase-01/`
- **개편 기준:** 기존 `P01-T01`~`P01-T10` ID 유지
- **기존 제출본 보존:** `P01-T05-O01`, `P01-T05-O02`, `P01-T10-O05`의 의미와 경로 유지

## 1. 한 문장 정의

동일한 검증 SProcess 구조와 고정된 중앙 Gap을 유지한 상태에서 `gateS`와 `gateD`의 일함수 조합만 변경하고, Si/절연막 계면의 전위·밴드·전계·전하·전류 분포와 단자 특성을 연결해 Dual-WF gate의 전기적 유효성과 공간적 배치 방향 효과를 검증한다.

## 2. 개편 이유

기존 Phase 1은 Single-Metal 무간격, Same-Metal Gap, Dual-Metal 무간격, Dual-Metal Gap의 네 형상을 비교해 Gap 효과와 금속 일함수 효과를 분리하려 했다. 그러나 연구 시간, 형상 재구성 안정성, 기존 SProcess 결과의 활용성 및 발표 목적을 고려해 신규 SDE 형상 재구성과 Gap sweep을 중단한다.

개편 후에는 기존 SProcess 구조와 `n1_fps.tdr`을 공통 입력으로 사용하고, 구조·도핑·절연막·mesh·물리 모델·bias를 고정한 채 `WF_S`, `WF_D` 조합만 비교한다.

## 3. 연구 질문

1. `gateS`와 `gateD`의 일함수 조합이 Si/절연막 계면 Potential을 변화시키는가?
2. WF 조합이 채널의 ConductionBandEnergy 장벽 높이와 위치를 변화시키는가?
3. Dual-WF gate가 채널 내부의 횡방향·수직 전계를 재분배하는가?
4. WF 조합이 inversion charge와 current path를 변화시키는가?
5. 공간 분포 변화가 Vth, Ion, Ioff, SS, DIBL, gm, Ig 변화와 일관되게 연결되는가?
6. 평균 WF가 같은 LH와 HL의 차이를 통해 WF 공간 배치 방향 효과를 확인할 수 있는가?

## 4. 가설

### 주가설

동일한 SProcess 구조에서 `gateS`와 `gateD`의 일함수 조합은 Si/절연막 계면의 Potential, ConductionBandEnergy, ElectricField, inversion charge 및 current distribution을 변화시키며, 이 변화는 단자 전류 특성의 차이와 연결된다.

### 보조가설

평균 WF가 동일한 LH와 HL에서 계면 분포와 전기 특성이 다르면, 단순 평균 WF뿐 아니라 WF의 공간적 배치 방향도 소자 특성에 영향을 준다.

## 5. WF 실험 행렬

| 조건 | WF_S | WF_D | 평균 WF | 의미 |
|---|---:|---:|---:|---|
| LL | 4.2 eV | 4.2 eV | 4.2 eV | Low-WF 균일 gate 기준 |
| LH | 4.2 eV | 4.8 eV | 4.5 eV | source-side Low-WF, drain-side High-WF 목표 구조 |
| HL | 4.8 eV | 4.2 eV | 4.5 eV | 역방향 Dual-WF 구조 |
| HH | 4.8 eV | 4.8 eV | 4.8 eV | High-WF 균일 gate 기준 |

사용자가 보고한 Workbench node 매핑은 `n2=LL`, `n19=LH`, `n15=HL`, `n21=HH`이나, 공식 결과로 사용하기 전에 실제 치환값과 로그를 확인한다.

## 6. 비교 논리

- **LH ↔ HL:** 평균 WF가 같고 배치 방향만 반대이므로 공간 배치 방향 효과의 핵심 비교
- **LL ↔ LH:** drain-side WF 상승 효과. 평균 WF도 4.2→4.5 eV로 증가하므로 순수 경계 효과로 단정하지 않음
- **LL ↔ HL:** source-side WF 상승 효과. 평균 WF 변화가 함께 존재함
- **LL ↔ HH:** gate 전체 WF 상승 효과
- **LH ↔ HH:** LH의 source-side Low-WF 역할 확인

## 7. 고정 조건

다음 조건은 네 WF 조합에서 동일하게 유지한다.

- 기존 SProcess 구조와 공통 입력 TDR
- 중앙 Gap 형상과 치수
- gate length, 도핑, dielectric stack, mesh
- mobility, recombination, tunneling model
- NonLocal mesh, parameter file, Solve 순서와 수렴 조건
- Low/High drain bias 및 gate sweep

현재 GitHub SProcess 코드의 권장 `DMG_Gap` 값과 사용자가 보고한 값이 다르므로 실제 `n1_fps.tdr` geometry에서 Gap 치수를 확인하기 전에는 공식 수치로 확정하지 않는다.

## 8. 대표 bias 분석점

| 상태 | Vd | Vg | 목적 |
|---|---:|---:|---|
| Off-state | 0.7 V | 0 V | 누설 경로, drain-side field, source-channel barrier |
| Threshold 부근 Low drain | 0.08 V | 1.0 V | 기본 장벽과 gate control |
| Threshold 부근 High drain | 0.7 V | 1.0 V | DIBL의 공간적 원인 |
| On-state | 0.7 V | 2.5 V | inversion charge와 current path |

위 네 점에서 의미 있는 차이가 확인되면 Vg=0.5 V, 0.75 V, 1.25 V 분석을 추가한다.

## 9. Interface extraction 원칙

- lateral cutline은 Si/SiO2 계면의 Silicon 쪽 첫 mesh line을 사용한다.
- material 경계 자체인 `x=0`은 가능한 한 피한다.
- 모든 WF와 bias에서 동일한 좌표를 사용한다.
- gateS·Gap·gateD 중앙의 vertical cutline을 동일 기준으로 사용한다.
- Gap과 gate edge의 한두 mesh node spike는 영역 평균에서 제외하고 별도로 검토한다.
- nominal 좌표는 실제 TDR geometry와 contact 위치 확인 후 확정한다.

## 10. 분석 변수와 정량 지표

### 공간 변수

- Potential
- ConductionBandEnergy, ValenceBandEnergy
- ElectricField의 lateral/vertical 성분과 magnitude
- eDensity, hDensity
- eCurrent, hCurrent의 vector 또는 magnitude
- DopingConcentration, DonorConcentration, AcceptorConcentration
- eBarrierTunneling, hBarrierTunneling

### 정량 지표

- gateS/gateD 평균 Potential과 차이
- source-channel barrier 최대값과 위치
- Low/High Vd barrier difference
- 중앙·drain-side peak field와 위치·폭
- gateS/gateD 평균 vertical field
- gateS/gateD 평균 eDensity와 비율
- minimum channel density
- gateS/gateD 평균 current density와 current crowding 위치
- Vth, Ion, Ioff, Ion/Ioff, SS, DIBL, gm, IgS, IgD, Ig_total

## 11. 결론 판정 기준

Dual-WF 효과를 주장하려면 다음이 함께 확인돼야 한다.

1. LH와 LL에서 interface Potential 또는 Ec가 달라진다.
2. 평균 WF가 같은 LH와 HL에서 profile 방향이나 barrier 위치가 달라진다.
3. field 또는 charge/current distribution 변화가 확인된다.
4. 공간 변화가 Vth, DIBL, Ion, Ioff 등의 단자 지표와 같은 방향으로 연결된다.

전류만 다르고 Potential/Ec가 동일하거나, 차이가 한두 mesh node spike에만 존재하거나, cutline·단위·energy reference·profile index가 다르면 결론을 보류한다.

## 12. 한계와 금지 표현

- Gap을 변화시키지 않으므로 Gap 효과는 **미평가**다.
- `Gap 효과가 없다`고 표현하지 않는다.
- LL→LH에서 평균 WF도 증가하므로 `순수한 WF 경계 효과`라고 단정하지 않는다.
- TCAD 결과만으로 실험 검증을 완료했다고 표현하지 않는다.
- 실행 로그와 TDR 변수를 확인하기 전에는 네 조건의 성공을 확정하지 않는다.

## 13. 기존 계획 처리

- P01-T02~T04의 신규 형상 생성 계획은 중단하고 분석 Task로 재정의한다.
- P01-T05의 기존 Dual-Metal Gap 구조 코드·이미지·치수 Output은 그대로 보존한다.
- P01-T10-O05의 DIBL 코드 수정 참고자료는 선택 산출물로 보존한다.
- 기존 제출본은 삭제·이동·재등록하지 않는다.

## 14. 공식 Issue 본문

Issue #1에 적용할 버전 관리 본문은 [`ISSUE_BODY.md`](./ISSUE_BODY.md)를 사용한다.
