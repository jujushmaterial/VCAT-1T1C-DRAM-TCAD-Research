## 1. 해야 할 것

- [ ] <!-- task-id:P01-T01 --> LL·LH·HL·HH 네 조건을 동일한 SDevice 코드로 실행하고 실제 적용값과 성공 여부를 확인한다.
  - <!-- output-id:P01-T01-O01 type:code review:recommended --> 공통 SDevice 코드와 WF·bias 설정
  - <!-- output-id:P01-T01-O02 type:files review:recommended --> LL·LH·HL·HH 실행 확인표와 로그·TDR 생성 증거
- [ ] <!-- task-id:P01-T03 --> 대표 bias에서 Device 소자 프로파일을 비교한다.
  - <!-- output-id:P01-T03-O01 type:files review:recommended --> Potential·ConductionBandEnergy·ElectricField·eDensity·eCurrent 핵심 프로파일 비교 자료
- [ ] <!-- task-id:P01-T04 --> 모든 조건에 공통 적용한 cutline 위치와 profile 매핑을 검증한다.
  - <!-- output-id:P01-T04-O01 type:files review:recommended --> 소자 단면의 lateral·vertical cutline 위치 이미지와 좌표·bias 매핑
- [x] <!-- task-id:P01-T05 --> 기존 Dual-Metal Gap 구조 자료를 참고자료로 보존한다.
  - <!-- output-id:P01-T05-O01 type:code review:none --> Dual-Metal Gap 구조 전체 코드
  - <!-- output-id:P01-T05-O02 type:files review:none --> Dual-Metal Gap 구조 단면 이미지
  - <!-- output-id:P01-T05-O03 type:files review:none --> Gap과 금속 경계 위치 확인값
- [ ] <!-- task-id:P01-T09 --> LL·LH·HL·HH의 Id–Vg와 주요 단자 지표를 비교한다.
  - <!-- output-id:P01-T09-O01 type:files review:recommended --> LL·LH·HL·HH Id–Vg와 Vth·Ion·Ioff·SS·DIBL 비교표
- [ ] <!-- task-id:P01-T10 --> 프로파일·cutline·단자 결과를 연결해 Dual-WF 작동 원인을 정리한다.
  - <!-- output-id:P01-T10-O01 type:files review:recommended --> Dual-WF 작동 원인 통합 결론과 발표용 핵심 그림
  - <!-- output-id:P01-T10-O05 type:any review:none --> DIBL 코드 수정 자료(확인요망)

## 2. 나와야 하는 결과물

필수 산출물은 다음 6개다.

1. 공통 SDevice 코드와 WF·bias 설정
2. 네 WF 조건 실행 확인표와 로그·TDR 생성 증거
3. 핵심 소자 프로파일 비교 자료
4. cutline 위치와 좌표·bias 매핑
5. Id–Vg 및 주요 단자 지표 비교표
6. 프로파일과 단자 결과를 연결한 최종 결론

`P01-T05-O01`, `P01-T05-O02`, `P01-T05-O03`, `P01-T10-O05`는 기존 경로와 제출 이력을 보존하는 선택 참고자료다. 기존 제출본은 삭제·이동·재등록하지 않는다.

## 3. 과정의 이유

동일한 기존 SProcess 구조에서 `WF_S`, `WF_D`만 바꿔 LL·LH·HL·HH를 실행하고, Device 결과의 핵심 프로파일과 공통 cutline이 올바른지 확인한 뒤 단자 특성과 연결한다. 별도의 신규 SDE 구조 생성, Gap sweep, 변수별 문서 분할은 수행하지 않는다.

## 4. 다음 과정

- 먼저 네 WF 조건의 실제 치환값, 정상 종료, TDR 생성을 확인한다.
- 같은 대표 bias와 같은 cutline으로 Potential, ConductionBandEnergy, ElectricField, eDensity, eCurrent를 비교한다.
- 차이가 명확한 핵심 변수만 최종 그림에 사용한다.
- Id–Vg와 Vth·Ion·Ioff·SS·DIBL을 비교하고 내부 프로파일 변화와 연결한다.
- 평균 WF가 같은 LH와 HL의 차이가 확인되면 WF 공간 배치 방향 효과의 근거로 사용한다.
- Gap은 고정하므로 Gap 효과는 미평가로 기록한다.

---

## 연구 기준

### WF 조건

| 조건 | WF_S | WF_D | 의미 |
|---|---:|---:|---|
| LL | 4.2 eV | 4.2 eV | Low-WF 균일 gate |
| LH | 4.2 eV | 4.8 eV | 목표 Dual-WF 구조 |
| HL | 4.8 eV | 4.2 eV | 역방향 Dual-WF 구조 |
| HH | 4.8 eV | 4.8 eV | High-WF 균일 gate |

사용자가 보고한 Workbench 매핑은 `n2=LL`, `n19=LH`, `n15=HL`, `n21=HH`이다. 실제 WF·Vd 치환값과 로그를 확인하기 전에는 공식 성공 결과로 확정하지 않는다.

### 대표 bias

- Off-state: Vd=0.7 V, Vg=0 V
- Threshold 부근: Vg≈1.0 V
- On-state: Vd=0.7 V, Vg=2.5 V

### cutline 검증 기준

- lateral cutline은 Si/절연막 계면의 Silicon 쪽 mesh line에 둔다.
- LL·LH·HL·HH에 동일한 좌표를 사용한다.
- gateS, Gap, gateD 위치와 선택한 TDR의 실제 Vg를 확인한다.
- 한두 mesh node의 spike만으로 물리적 효과를 주장하지 않는다.

### 결론 제한

- 실제 `n1_fps.tdr` geometry를 확인하기 전에는 Gap 치수를 확정하지 않는다.
- LL과 LH만으로 순수한 WF 경계 효과라고 단정하지 않는다.
- Gap 효과가 없다고 결론 내리지 않는다.
- 실행 로그와 TDR을 확인하지 않은 조건은 성공으로 기록하지 않는다.

## 작업 기록

- **담당자:** @jujushmaterial
- **개인 작업 폴더:** `members/JuSanghyeon/phases/phase-01/`
- **공통 입력 구조:** 기존 SProcess 결과 TDR
- **기존 제출본 보존:** P01-T05-O01·O02 및 P01-T10-O05
- **현재 우선 작업:** 네 WF 조건 실행 → Device 프로파일 확인 → 공통 cutline 검증
