## 1. 해야 할 것

- [ ] <!-- task-id:P01-T01 --> 기존 SProcess 공통 구조와 고정 조건을 확정한다.
  - <!-- output-id:P01-T01-O01 type:files review:recommended --> 공통 구조·재료·치수 조건표
  - <!-- output-id:P01-T01-O02 type:files review:recommended --> 공통 전압·물리 모델·추출 조건표
  - <!-- output-id:P01-T01-O03 type:server review:recommended --> n1_fps.tdr 출처·생성 node·서버 위치
  - <!-- output-id:P01-T01-O04 type:files review:recommended --> 고정변수와 미검증 항목표
- [ ] <!-- task-id:P01-T02 --> LL·LH·HL·HH WF 실험 행렬과 Workbench node 매핑을 확정한다.
  - <!-- output-id:P01-T02-O01 type:files review:recommended --> LL·LH·HL·HH WF 조합표
  - <!-- output-id:P01-T02-O02 type:files review:recommended --> n2·n19·n15·n21 node 매핑 확인표
  - <!-- output-id:P01-T02-O03 type:files review:recommended --> 실제 WF·Vd 치환값 확인표
  - <!-- output-id:P01-T02-O04 type:files review:recommended --> 비교쌍별 해석 범위와 결론 제한표
- [ ] <!-- task-id:P01-T03 --> 공간 물리량과 Vg snapshot을 저장하는 공통 SDevice 실행 구성을 검증한다.
  - <!-- output-id:P01-T03-O01 type:code review:recommended --> 공통 SDevice 전체 코드
  - <!-- output-id:P01-T03-O02 type:code review:recommended --> 공통 sdevice.par
  - <!-- output-id:P01-T03-O03 type:files review:recommended --> Plot 공간 변수 확인표
  - <!-- output-id:P01-T03-O04 type:files review:recommended --> Vg·정규화 Time·profile index 매핑표
  - <!-- output-id:P01-T03-O05 type:files review:recommended --> 네 WF 조건별 LowVd·HighVd profile TDR 생성 확인표
  - <!-- output-id:P01-T03-O06 type:files review:recommended --> sta·log 성공·실패 및 오류 기록
- [ ] <!-- task-id:P01-T04 --> 모든 조건에 공통 적용할 interface cutline과 추출 파이프라인을 확정한다.
  - <!-- output-id:P01-T04-O01 type:files review:recommended --> geometry·contact·interface cutline 이미지
  - <!-- output-id:P01-T04-O02 type:files review:recommended --> 공통 lateral·vertical cutline 좌표표
  - <!-- output-id:P01-T04-O03 type:code review:recommended --> SVisual 또는 Python profile 추출 코드
  - <!-- output-id:P01-T04-O04 type:files review:recommended --> TDR profile index와 실제 bias 매핑 확인표
  - <!-- output-id:P01-T04-O05 type:files review:recommended --> 단위·energy reference·vector 성분 확인표
- [ ] <!-- task-id:P01-T05 --> 기존 Dual-Metal Gap SProcess 구조를 공통 기준 구조로 보존하고 실제 형상을 확인한다.
  - <!-- output-id:P01-T05-O01 type:code review:none --> Dual-Metal Gap 구조 전체 코드
  - <!-- output-id:P01-T05-O02 type:files review:none --> Dual-Metal Gap 구조 단면 이미지
  - <!-- output-id:P01-T05-O03 type:files review:recommended --> Gap과 금속 경계 위치 확인값
  - <!-- output-id:P01-T05-O04 type:files review:recommended --> n1_fps.tdr 구조·재료·contact 검증표
  - <!-- output-id:P01-T05-O05 type:files review:recommended --> 실제 mesh와 Si·SiO2·HfO2 interface 좌표표
- [ ] <!-- task-id:P01-T06 --> WF 조합별 interface Potential과 ConductionBandEnergy를 분석한다.
  - <!-- output-id:P01-T06-O01 type:files review:none --> Potential 원본 CSV
  - <!-- output-id:P01-T06-O02 type:files review:recommended --> Potential 비교 그래프
  - <!-- output-id:P01-T06-O03 type:files review:none --> ConductionBandEnergy 원본 CSV
  - <!-- output-id:P01-T06-O04 type:files review:recommended --> ConductionBandEnergy 비교 그래프
  - <!-- output-id:P01-T06-O05 type:files review:recommended --> barrier 높이·위치·Low/High Vd 차이 정량표
- [ ] <!-- task-id:P01-T07 --> WF 조합에 따른 lateral·vertical electric field 재분배를 분석한다.
  - <!-- output-id:P01-T07-O01 type:files review:none --> lateral ElectricField 원본 CSV
  - <!-- output-id:P01-T07-O02 type:files review:recommended --> lateral ElectricField 비교 그래프
  - <!-- output-id:P01-T07-O03 type:files review:none --> vertical ElectricField 원본 CSV
  - <!-- output-id:P01-T07-O04 type:files review:recommended --> vertical ElectricField 비교 그래프
  - <!-- output-id:P01-T07-O05 type:files review:recommended --> field peak 위치·폭·영역 평균 정량표
  - <!-- output-id:P01-T07-O06 type:files review:recommended --> mesh spike와 물리적 peak 구분 기록
- [ ] <!-- task-id:P01-T08 --> WF 조합별 inversion charge와 current distribution을 분석한다.
  - <!-- output-id:P01-T08-O01 type:files review:none --> eDensity 원본 CSV
  - <!-- output-id:P01-T08-O02 type:files review:recommended --> eDensity 비교 그래프
  - <!-- output-id:P01-T08-O03 type:files review:none --> eCurrent 원본 CSV
  - <!-- output-id:P01-T08-O04 type:files review:recommended --> eCurrent 비교 그래프
  - <!-- output-id:P01-T08-O05 type:files review:recommended --> inversion charge·minimum channel density·current crowding 정량표
- [ ] <!-- task-id:P01-T09 --> 단자 특성과 공간 물리량 변화를 연결한다.
  - <!-- output-id:P01-T09-O01 type:files review:none --> Id–Vg·Ig–Vg 원본 데이터
  - <!-- output-id:P01-T09-O02 type:files review:recommended --> Id–Vg·Ig–Vg 비교 그래프
  - <!-- output-id:P01-T09-O03 type:files review:recommended --> Vth·Ion·Ioff·Ion/Ioff·SS·DIBL·gm·Ig 비교표
  - <!-- output-id:P01-T09-O04 type:files review:recommended --> 공간 지표와 단자 지표 연결표
  - <!-- output-id:P01-T09-O05 type:code review:recommended --> 단자 지표 추출 정의와 전체 코드
  - <!-- output-id:P01-T09-O06 type:files review:recommended --> LL·LH·HL·HH 통합 정량 비교표
- [ ] <!-- task-id:P01-T10 --> Dual-WF의 전기적 유효성과 WF 배치 방향 효과를 판단하고 발표자료로 정리한다.
  - <!-- output-id:P01-T10-O01 type:files review:recommended --> LL·LH·HL·HH 통합 비교표
  - <!-- output-id:P01-T10-O02 type:files review:recommended --> Dual-WF 전기적 효과 결론
  - <!-- output-id:P01-T10-O03 type:files review:recommended --> WF 공간 배치 방향 효과 결론
  - <!-- output-id:P01-T10-O04 type:files review:recommended --> Phase 2·3 전달 결정문
  - <!-- output-id:P01-T10-O05 type:any review:none --> DIBL 코드 수정 자료(확인요망)
  - <!-- output-id:P01-T10-O06 type:files review:recommended --> Gap 효과 미평가와 연구 한계 명시문
  - <!-- output-id:P01-T10-O07 type:files review:recommended --> 발표용 핵심 그림 묶음
  - <!-- output-id:P01-T10-O08 type:files review:recommended --> 발표용 결론문

## 2. 나와야 하는 결과물

각 과제에 연결된 필수 산출물을 제출하고 검토 승인을 받는다. 승인된 제출본만 완료 증거로 계산하며, `P01-T10-O05`는 기존 DIBL 추출 코드 수정 과정의 참고자료이므로 선택 산출물로 유지한다.

기존 `P01-T05-O01`, `P01-T05-O02`, `P01-T10-O05` 제출본은 삭제·이동·재등록하지 않고 현재 경로와 이력을 보존한다. 기존 P01-T02~P01-T04의 신규 형상 생성 계획은 연구 범위 변경으로 중단됐으며, 동일 Task ID는 개편된 분석 작업에 사용한다.

## 3. 과정의 이유

동일한 검증 SProcess 구조와 고정된 중앙 Gap을 유지한 상태에서 `gateS`와 `gateD`의 일함수 조합만 변경하고, Si/절연막 계면의 Potential, band profile, electric field, inversion charge 및 current distribution 변화가 단자 전류 특성과 어떻게 연결되는지 확인한다. 새로운 SDE 구조 재구성과 Gap sweep은 수행하지 않는다.

## 4. 다음 과정

- LL·LH·HL·HH의 공간 물리량과 단자 지표가 일관되게 연결되면 Dual-WF의 전기적 유효성과 WF 배치 방향 효과를 Phase 2·3 설계 근거로 전달한다.
- 평균 WF가 같은 LH와 HL에서 차이가 확인되면 WF 공간 배치 방향 효과의 근거로 사용한다.
- 전류 차이와 Potential·Ec·field·charge/current 변화가 연결되지 않으면 profile index, cutline, 단위, energy reference, mesh spike 및 SDevice 코드 일치 여부를 재검증한다.
- Gap을 변화시키지 않으므로 Gap 효과는 미평가로 기록하며 `Gap 효과가 없다`고 결론 내리지 않는다.

---

## 연구 기준

### 중심 연구 질문

1. gateS와 gateD의 일함수 조합이 Si/절연막 계면 전위를 변화시키는가?
2. 일함수 조합이 채널의 전도대 장벽 높이와 위치를 변화시키는가?
3. Dual-WF gate가 횡방향·수직 전계를 재분배하는가?
4. Dual-WF gate가 inversion charge와 current path를 변화시키는가?
5. 내부 물리량 변화가 Vth, Ion, Ioff, SS, DIBL, gm, Ig 변화와 일관되게 연결되는가?
6. 평균 WF가 같은 LH와 HL의 차이를 통해 WF 공간 배치 방향 효과를 확인할 수 있는가?

### WF 조건

| 조건 | WF_S | WF_D | 의미 |
|---|---:|---:|---|
| LL | 4.2 eV | 4.2 eV | Low-WF 균일 gate |
| LH | 4.2 eV | 4.8 eV | 목표 Dual-WF 구조 |
| HL | 4.8 eV | 4.2 eV | 역방향 Dual-WF 구조 |
| HH | 4.8 eV | 4.8 eV | High-WF 균일 gate |

사용자가 보고한 Workbench 매핑은 `n2=LL`, `n19=LH`, `n15=HL`, `n21=HH`이나 실제 WF·Vd 치환값과 로그를 확인하기 전에는 공식 성공 결과로 확정하지 않는다.

### 대표 bias

- Off-state: Vd=0.7 V, Vg=0 V
- Threshold 부근 Low drain: Vd=0.08 V, Vg=1.0 V
- Threshold 부근 High drain: Vd=0.7 V, Vg=1.0 V
- On-state: Vd=0.7 V, Vg=2.5 V

### 결론 제한

- Gap은 고정하며 효과를 평가하지 않는다.
- 실제 `n1_fps.tdr` geometry를 확인하기 전에는 Gap 치수를 확정하지 않는다.
- LL과 LH만 비교해 순수한 WF 경계 효과라고 단정하지 않는다.
- 한두 mesh node spike만으로 물리적 효과를 주장하지 않는다.
- 실행 로그, TDR 파일과 내부 변수를 확인하기 전에는 네 WF 조건의 성공을 확정하지 않는다.

## 작업 기록

- **상태:** Phase 1 개편 — 기존 형상 2×2 비교에서 고정 구조 WF 조합·계면 물리 분석으로 변경
- **담당자:** @jujushmaterial
- **개인 작업 폴더:** `members/JuSanghyeon/phases/phase-01/`
- **공통 입력 구조:** `n1_fps.tdr` — 실제 서버 위치와 생성 node 미확인
- **기존 제출본:** P01-T05-O01·O02 및 P01-T10-O05 관련 기록 보존
- **현재 우선 작업:** 실제 구조·Gap·mesh·WF·Vd 치환값과 profile TDR 생성 성공 여부 검증

## 완료 확인

- [ ] 공통 구조와 고정 조건을 실제 코드·TDR에서 확인했다.
- [ ] LL·LH·HL·HH의 WF와 bias 치환값을 로그에서 확인했다.
- [ ] 모든 대표 bias에 동일한 interface cutline을 사용했다.
- [ ] 공간 물리량과 단자 지표의 단위·추출 정의를 기록했다.
- [ ] numerical spike와 물리적 변화를 구분했다.
- [ ] Gap 효과 미평가와 평균 WF 분리 한계를 명시했다.
- [ ] Phase 2·3 전달 결정문과 발표용 결론을 작성했다.
