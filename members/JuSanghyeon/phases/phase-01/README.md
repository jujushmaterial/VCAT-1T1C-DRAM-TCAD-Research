# Phase 1 — 기존 SProcess 구조의 Dual-WF 작동 원인 검증

- **담당자:** 주상현 (`@jujushmaterial`)
- **GitHub Issue:** #1
- **핵심 흐름:** 네 WF 조건 실행 → Device 프로파일 확인 → 공통 cutline 검증 → 단자 결과 비교 → 결론
- **필수 산출물:** 6개
- **기존 제출본:** 삭제·이동·재등록하지 않고 참고자료로 보존

## 1. 목표

동일한 기존 SProcess 구조에서 `WF_S`, `WF_D`만 변경해 LL·LH·HL·HH를 실행하고, Device 결과의 핵심 프로파일과 공통 cutline이 올바른지 확인한 뒤 Id–Vg와 주요 단자 지표에 연결한다.

신규 SDE 구조 생성, Gap sweep, 변수별 문서 분할은 수행하지 않는다.

## 2. WF 조건

| 조건 | WF_S | WF_D | 의미 |
|---|---:|---:|---|
| LL | 4.2 eV | 4.2 eV | Low-WF 균일 gate |
| LH | 4.2 eV | 4.8 eV | 목표 Dual-WF 구조 |
| HL | 4.8 eV | 4.2 eV | 역방향 Dual-WF 구조 |
| HH | 4.8 eV | 4.8 eV | High-WF 균일 gate |

사용자가 보고한 Workbench 매핑은 `n2=LL`, `n19=LH`, `n15=HL`, `n21=HH`이다. 실제 WF·Vd 치환값과 로그를 확인하기 전에는 공식 성공 결과로 확정하지 않는다.

## 3. 필수 산출물 6개

| 순서 | Output ID | 내용 |
|---:|---|---|
| 1 | `P01-T01-O01` | 공통 SDevice 코드와 WF·bias 설정 |
| 2 | `P01-T01-O02` | LL·LH·HL·HH 실행 확인표와 로그·TDR 생성 증거 |
| 3 | `P01-T03-O01` | Potential·ConductionBandEnergy·ElectricField·eDensity·eCurrent 핵심 프로파일 비교 자료 |
| 4 | `P01-T04-O01` | lateral·vertical cutline 위치 이미지와 좌표·bias 매핑 |
| 5 | `P01-T09-O01` | LL·LH·HL·HH Id–Vg와 Vth·Ion·Ioff·SS·DIBL 비교표 |
| 6 | `P01-T10-O01` | Dual-WF 작동 원인 통합 결론과 발표용 핵심 그림 |

## 4. 선택 참고자료

다음 Output은 기존 경로와 제출 이력을 보존하기 위해 Issue에 계속 선언하지만 Phase 1 완료의 필수 조건으로 계산하지 않는다.

- `P01-T05-O01`: Dual-Metal Gap 구조 전체 코드
- `P01-T05-O02`: Dual-Metal Gap 구조 단면 이미지
- `P01-T05-O03`: Gap과 금속 경계 위치 확인값
- `P01-T10-O05`: DIBL 코드 수정 자료(확인요망)

## 5. Device 프로파일 확인

대표 bias에서 다음 변수를 먼저 확인한다.

- Potential
- ConductionBandEnergy
- ElectricField
- eDensity
- eCurrent

모든 변수를 별도 산출물로 분리하지 않는다. 차이가 명확하고 물리 해석에 필요한 변수만 최종 비교 자료에 포함한다.

## 6. cutline 검증

- lateral cutline은 Si/절연막 계면의 Silicon 쪽 mesh line에 둔다.
- LL·LH·HL·HH에 동일한 좌표를 사용한다.
- gateS, Gap, gateD 위치가 올바른지 확인한다.
- 선택한 TDR profile이 실제 원하는 Vg인지 확인한다.
- 한두 mesh node의 spike만으로 물리적 효과를 주장하지 않는다.

## 7. 대표 bias

- Off-state: Vd=0.7 V, Vg=0 V
- Threshold 부근: Vg≈1.0 V
- On-state: Vd=0.7 V, Vg=2.5 V

## 8. 결론 기준

- 평균 WF가 같은 LH와 HL의 차이가 있으면 WF 공간 배치 방향 효과의 근거로 사용한다.
- 내부 프로파일 변화가 Id–Vg, Vth, Ion, Ioff, SS, DIBL 변화와 같은 방향으로 연결되는지 확인한다.
- Gap은 고정하므로 Gap 효과는 미평가로 기록한다.
- 실제 geometry를 확인하기 전에는 Gap 치수를 확정하지 않는다.
- 실행 로그와 TDR을 확인하지 않은 조건은 성공으로 기록하지 않는다.

## 9. 공식 Issue 본문

Issue #1에 적용할 버전 관리 본문은 [`ISSUE_BODY.md`](./ISSUE_BODY.md)를 사용한다.
