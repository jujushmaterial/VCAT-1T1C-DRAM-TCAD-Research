# Phase 1~9 연구 워크플로

이 문서는 VCAT–1T1C DRAM TCAD 연구의 단계 간 입력·산출물·판정 관계를 설명합니다. 실제 과제와 산출물 ID의 원본은 각 Phase GitHub Issue이며, 이 문서는 전체 흐름을 이해하기 위한 공통 기준입니다.

## 1. 전체 흐름

```text
Phase 1  Planar 구조에서 Gap 효과와 일함수 차이 효과 분리
   ↓
Phase 2  비교 기준이 되는 Single-Metal VCAT 구축·검증
   ↓
Phase 3  넓은 구조·일함수·구간 비율 Sweep으로 후보 선별
   ↓
Phase 4  공통 1T1C Testbench에서 Write·Read·Hold 가능성 확인
   ↓
Phase 5  DRAM 통과 후보의 세부 최적화와 공정 가능 후보 선정
   ↓
Phase 6  이상적 SDE 구조를 SProcess 공정 흐름으로 변환
   ↓
Phase 7  단일 변수 민감도 + 주요 변수 조합 DOE
   ↓
Phase 8  단일 소자 Proxy 기반 예비 공정 허용범위 + 대표 1T1C 보정
   ↓
Phase 9  보정에 사용하지 않은 조건으로 독립 1T1C 검증
```

## 2. Phase별 역할과 다음 단계 전달값

| Phase | 핵심 질문 | 주요 산출물 | 다음 단계에서의 사용 |
|---|---|---|---|
| 1 | 성능 변화가 Gap 때문인지 일함수 차이 때문인지 | 네 구조의 동일 조건 비교, Potential·Ec·전계, 효과 결론 | Phase 2·3에서 검토할 구조 계열 결정 |
| 2 | Single-Metal VCAT이 기준 소자로 안정적으로 동작하는지 | 기준 구조·도핑·메시·Id–Vg/Id–Vd·양방향·누설·메시 독립성 | 이후 모든 후보의 비교 기준 |
| 3 | 넓은 설계 공간에서 어떤 후보가 가능성이 있는지 | 구조·일함수·구간 비율 Sweep, 상위 후보와 탈락 이유 | Phase 4의 1T1C 후보 목록 |
| 4 | 단일 소자 성능이 실제 1T1C 동작으로 이어지는지 | 공통 Testbench, Write·Read·Hold 파형, Pass·Fail | Phase 5 후보 선별 및 Phase 8 Proxy 근거 |
| 5 | 최고 성능·강건성·DRAM 균형을 만족하는 조건은 무엇인지 | Nominal-best, Robust-best, DRAM-balanced, SProcess 후보 | Phase 6 공정 대상 구조 |
| 6 | 이상적 구조를 실제 공정 순서로 만들 수 있는지 | SProcess 전체 코드, 실제 형성 치수, SDE–SProcess 차이 | Phase 7 공정 변수와 Nominal 조건 |
| 7 | 어떤 공정 오차와 변수 조합이 성능을 크게 바꾸는지 | 단일 변수 민감도, 주요 변수, 조합 DOE, 상호작용 Map | Phase 8 예비 허용범위 계산 데이터 |
| 8 | 많은 DOE 조건을 제한된 Mixed-Mode 계산으로 어떻게 선별할지 | Proxy 기준, 예비 Map, 대표 조건 1T1C 보정, 독립 검증 조건 | Phase 9 검증 대상과 예측 판정 |
| 9 | 예비 Map이 실제 DRAM에서도 유효한지 | 독립 1T1C 결과, 오판정 분석, 최종 허용범위 Map | 최종 보고서·논문 결론 |

## 3. Phase 4 공통 Testbench 규칙

Phase 4에서 다음 조건을 먼저 고정한 뒤 모든 후보에 동일하게 적용합니다.

- 저장 커패시터 값
- Bit Line 등가 부하 또는 커패시턴스
- Bit Line Precharge 조건
- WL·BL 전압과 펄스 시간
- Write·Hold·Read 구간
- 측정 시점과 단위
- Write·Read·Retention 성공 판정 기준

후속 Phase에서 다른 Testbench 조건을 사용하면 구조 차이와 회로 조건 차이를 분리할 수 없으므로, 변경이 필요할 때는 변경 이유와 영향 범위를 별도로 기록합니다.

## 4. Phase 7 조합 DOE 규칙

1. 모든 공정 변수에 대해 단일 변수 민감도를 먼저 확인합니다.
2. 영향이 큰 변수만 조합 DOE 대상으로 선정합니다.
3. 조합 DOE에는 목표 공정값뿐 아니라 실제 형성 치수를 함께 기록합니다.
4. 모든 조건에 같은 SDevice와 성능 추출 기준을 적용합니다.
5. 주효과뿐 아니라 변수 간 상호작용과 결합 실패를 확인합니다.
6. Phase 8에 중심·경계·실패 후보와 변수 범위를 전달합니다.

## 5. Phase 8 Proxy와 보정 규칙

Phase 8의 Proxy는 실제 DRAM 성능값이 아니라, Phase 4의 단일 소자–1T1C 대응 결과를 이용해 DRAM 동작을 예측하는 지표입니다.

예시 관계는 다음과 같지만, 실제 기준은 Phase 4 결과로 확정합니다.

- 전류 구동력과 방향별 전류 → Write·Read 가능성 예측
- Ioff·GIDL과 전계 집중 → Hold·Retention 위험 예측
- 비대칭 전류와 Body 영향 → Write ‘1’·‘0’ 비대칭 위험 예측

Proxy를 정의할 때는 지표명만 적지 않고 다음을 함께 기록합니다.

- 측정 전압과 전류 방향
- 측정 시점 또는 추출 방식
- 값이 증가할 때 DRAM 성능이 좋아지는지 나빠지는지
- 기준값의 출처
- Phase 4 결과와의 대응 근거
- 적용 범위와 불확실성

## 6. Phase 8 보정 세트와 Phase 9 검증 세트

### Phase 8 보정 세트

단일 소자 기반 예비 Map에서 다음 조건을 대표로 선택해 1T1C Mixed-Mode를 수행합니다.

- 허용범위 중심 조건
- Pass·Marginal 경계 조건
- 허용범위 밖 실패 조건
- Proxy 판정이 불확실한 조건

이 결과로 Proxy 기준과 경계를 보정합니다.

### Phase 9 독립 검증 세트

Phase 9에서는 Phase 8 보정에 사용하지 않은 조건을 사용합니다. 보정 세트와 검증 세트가 겹치면 독립 검증으로 인정하지 않습니다.

Phase 9에서는 다음을 비교합니다.

- Phase 8의 Pass·Marginal·Fail 예측
- 실제 Write·Read·Hold·Retention·Read Disturb 결과
- False-Pass와 False-Fail
- 예측 경계와 실제 경계의 이동
- 최종 공정 허용범위와 적용 한계

## 7. 단계 완료 전 공통 확인

- 입력 조건과 단위가 기록되어 있는가
- 앞 Phase의 어떤 산출물을 사용했는가
- 동일 조건 비교가 유지되었는가
- 원본 데이터·코드·그래프 경로가 연결되어 있는가
- 예상과 실제 결과가 구분되어 있는가
- 결론의 근거와 미확인 사항이 기록되어 있는가
- 다음 Phase가 바로 사용할 전달값이 준비되어 있는가

> Phase 번호와 연구 목표는 유지합니다. 세부 Task와 Output은 연구 결과에 따라 보완할 수 있지만, 변경 시 기존 제출 ID와 경로를 먼저 확인해야 합니다.

## 8. 기존 Task·산출물 보존 원칙

- 기존 제출 산출물이 연결된 Task는 삭제하거나 수정하지 않습니다.
- 기존 Task ID, 제목, 설명, Output, 체크 상태와 제출물 파일을 유지합니다.
- 새로운 연구 요구는 현재 마지막 ID 뒤에 신규 Task로만 추가합니다.
- 기존 실험은 Workflow 개편을 이유로 일괄 재실행하지 않습니다.
- 신규 검증에서 차이가 발견되면 신규 산출물에 영향 범위만 기록합니다.
- 선택 분석은 필수 완료조건으로 만들지 않습니다.

## 9. 최소 추가 흐름

```text
기존 Phase 2 P02-T01~T09
→ P02-T10 기존 Mesh 재사용 기반 Local Mesh Baseline
→ Phase 3 초기 Sweep 병행
→ P02-T11 Single-Metal 3D·2D–3D 최소 비교
→ P03-T11 상위 후보 WF 경계 확인
→ 기존 Phase 4
→ 기존 Phase 5 + P05-T11 최종 후보 제한 3D
→ 기존 Phase 6
→ 기존 Phase 7 + P07-T13 Variation Basis·DOE 범위
→ 기존 Phase 8 + P08-T14 Process Window·Robust point
→ 기존 Phase 9 + P09-T14 최소 holdout·critical corner
```

## 10. 진행 Gate와 계산량 제한

- Phase 3 초기 탐색은 기존 Phase 2 결과로 시작할 수 있습니다.
- Phase 3 최종 후보 확정 전 `P02-T10`을 반영합니다.
- 최종 Multi-WF 3D 전 `P02-T11`을 완료합니다.
- Local Mesh는 1조건부터 시작하고, 결론이 불분명한 경우에만 Reference-Local 1조건을 추가합니다.
- Single-Metal 3D는 기본 1조건으로 시작하며 Mesh 영향이 의심될 때만 둘레 방향 1조건을 추가합니다.
- Multi-WF 3D는 최종 후보 1개를 기본으로 하고 실제 후보가 다른 구조일 때만 최대 2개로 제한합니다.
- RSM·Monte Carlo·Cp·Cpk와 모든 Process Window 조건의 3D 계산은 기본 필수조건이 아닙니다.
- 결과가 명확하고 후보 순위와 연구 결론이 유지되면 조건을 더 추가하지 않습니다.

## 11. 관련 공통 문서

- [Mesh Baseline Policy](../docs/policies/mesh-baseline-policy.md)
- [2D–3D Comparison Policy](../docs/policies/2d-3d-comparison-policy.md)
- [Process Window Policy](../docs/policies/process-window-policy.md)
- [Phase 2 최소 개편 Handoff](../docs/handoffs/phase-02-minimal-workflow-handoff.md)
