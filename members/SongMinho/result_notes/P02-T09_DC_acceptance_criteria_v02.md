# P02-T09 DC 메시 허용 기준 및 재실행 판단 v02

## 1. 목적

기존 `P02-T09-O03_Mesh_Error_vs_Fine.csv`에는 criterion 결과가 `True`로 기록되어 있지만 수치 허용 기준이 명시되지 않아 제3자가 판정을 재현할 수 없었다. 이 문서는 기존 원본 결과를 변경하지 않고, P02-T09의 DC 메시 판정 기준·수식·선택 규칙·재실행 필요성을 명문화한다.

- **Phase / Issue:** Phase 2 / #2
- **Task / Output 관련:** `P02-T09`, 기존 `P02-T09-O01`, `P02-T09-O03`, 보완 성격 `P02-T09-O07`
- **기준 데이터:**
  - `../phases/phase-02/tasks/P02-T09/outputs/P02-T09-O01/submissions/20260802065627-minhosong-mse-X-GnSw/files/P02-T09-O01_DC_Metrics.csv`
  - `../phases/phase-02/tasks/P02-T09/outputs/P02-T09-O03/submissions/20260802065851-minhosong-mse-6Y6-8g/files/P02-T09-O03_Mesh_Error_vs_Fine.csv`
- **Reference:** Fine, `MeshScale=0.5`

## 2. 판정식

각 지표는 Fine 결과를 기준으로 계산한다.

- `Vth absolute difference [mV] = |Vth_mesh - Vth_fine| × 1000`
- `SS relative error [%] = |SS_mesh - SS_fine| / |SS_fine| × 100`
- `Ion relative error [%] = |Ion_mesh - Ion_fine| / |Ion_fine| × 100`
- `Ioff decade difference = |log10(|Ioff_mesh|) - log10(|Ioff_fine|)|`
- `DIBL [mV/V] = (Vth(Vd=0.05 V) - Vth(Vd=1.00 V)) / 0.95 × 1000`
- `DIBL absolute difference [mV/V] = |DIBL_mesh - DIBL_fine|`
- `DIBL relative error [%] = |DIBL_mesh - DIBL_fine| / |DIBL_fine| × 100`

Vth, SS, Ion, Ioff는 두 drain bias 중 더 큰 오차를 사용한다.

## 3. P2 내부 DC 허용 기준

아래 수치는 외부 표준이 아니라 **P2 기준 소자의 DC 재현성과 후속 구조 순위 비교를 위한 프로젝트 내부 공학 기준**이다. 2026-08-06에 명문화되었으며, 기존 계산 전에 사전 등록된 기준은 아니므로 이 점을 결과 해석에 남긴다.

### 3.1 DC screening 통과 기준

| 지표 | 허용 기준 |
|---|---:|
| Vth | 각 Vd에서 절대차이 ≤ 1.0 mV |
| SS | 각 Vd에서 상대차이 ≤ 1.0% |
| Ion | 각 Vd에서 상대차이 ≤ 2.0% |
| Ioff | 각 Vd에서 decade 차이 ≤ 0.10 decade |
| DIBL | 절대차이 ≤ 0.5 mV/V **그리고** 상대차이 ≤ 5.0% |

`Overall_DC_Screening_Pass=True`는 위 항목을 모두 만족할 때만 부여한다.

### 3.2 공식 baseline 선호 기준

Screening을 통과한 비-reference mesh 중 다음을 추가로 만족하는 가장 계산비용이 낮은 mesh를 P2 공식 DC baseline으로 선택한다.

- 최대 Ion 상대오차 ≤ 1.0%
- DIBL 상대오차 ≤ 2.0%

이 2단계 규칙을 적용하면 Coarse는 screening 용도로는 통과하지만 baseline 선호 기준을 만족하지 못하고, Medium은 두 기준을 모두 만족한다.

## 4. 재계산 결과

| Mesh | Vth 최대 절대차이 | SS 최대 상대오차 | Ion 최대 상대오차 | Ioff 최대 decade 차이 | DIBL 절대차이 | DIBL 상대오차 | Screening | Baseline 선호 |
|---|---:|---:|---:|---:|---:|---:|---|---|
| Coarse | 0.139199 mV | 0.037385% | 1.896032% | 0.072503 | 0.116634 mV/V | 3.466009% | Pass | Fail |
| Medium | 0.047477 mV | 0.026675% | 0.841722% | 0.038525 | 0.043243 mV/V | 1.285056% | Pass | Pass |
| Fine | 0 | 0 | 0 | 0 | 0 | 0 | Reference | Reference |

따라서 **Medium, MeshScale=1.0 선택 결론은 유지**한다. Coarse는 넓은 DC screening에는 사용할 수 있으나 P2 공식 baseline으로는 채택하지 않는다.

정확한 수치와 boolean 재계산 결과는 `P02-T09_DC_acceptance_recalculation_v02.csv`에 기록한다.

## 5. 기존 문서와의 관계

기존 `P02-T09-O03_Mesh_Error_and_Selection.md`의 문구 `current project DC acceptance limits`는 이 문서의 3절 기준으로 구체화한다. 기존 CSV의 `*_Criterion_Pass`와 `Overall_Project_Criteria_Pass` 열은 당시 수치 기준이 누락된 역사적 결과이므로, 독립적인 판정 근거로 사용하지 않고 이 v02 재계산표를 우선 사용한다.

기존 제출본은 보존하며 덮어쓰지 않는다.

## 6. 재실행 필요성

### 6.1 이번 확인사항을 해결하기 위한 TCAD 재실행

**필요 없음.**

이 문제는 원본 DC 결과 부족이 아니라 허용 기준 문서화 누락이다. 기존 `P02-T09-O01_DC_Metrics.csv`에 Coarse·Medium·Fine의 Vth, SS, Ion, Ioff가 있고 DIBL도 동일 값으로 재계산할 수 있으므로, 기준 명문화와 후처리 재계산만으로 True/False 판정을 재현할 수 있다.

### 6.2 별도 목적에서 재실행 또는 추가 검증이 필요한 경우

- Ioff를 정확히 `Vg=0 V`에서 다시 정의해야 할 때: 현재 첫 점은 `Vg=0.00035 V`이다.
- 원본 서버 log의 직접 provenance가 필요할 때: 기존 mesh log 일부는 연구 채팅에서 전사되었다.
- absolute GIDL, oxide-field peak, local BTBT/field 수렴성을 주장할 때: 본 DC 허용 기준의 적용 범위가 아니며 Fine 또는 targeted local refinement 검증이 필요하다.
- 후속 후보 구조에서 hotspot이나 금속 경계가 이동할 때: 기준 소자에서 통과한 mesh 규칙을 그대로 신뢰하지 말고 대표 후보에 대해 별도 mesh 확인이 필요하다.

## 7. 적용 범위

이 기준은 P2 Single-WF 기준 소자의 **global DC Id–Vg 지표**에 한정한다. GIDL 절대값, oxide field, 국부 peak field 및 BTBT에는 적용하지 않는다.
