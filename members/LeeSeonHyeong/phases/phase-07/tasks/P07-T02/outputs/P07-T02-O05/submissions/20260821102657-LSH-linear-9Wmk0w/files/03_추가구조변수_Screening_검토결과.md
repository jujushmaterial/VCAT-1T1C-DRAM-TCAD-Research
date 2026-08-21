# 추가 구조변수 Screening 검토 결과

## 권고

**P07-T02-O01~O03의 추가 TCAD Screening은 현재 수행하지 않는 방향을 권고한다.**

현재 필수 판단은 P07-T02-O04의 "추가 구조변수를 P8에 포함할 필요가 있는가"이며, 기존 제출본은 추가 Screening을 수행하지 않고 Xbnd1/Xbnd2의 2D Geometry 분석을 유지하는 것으로 정리되어 있다.

---

## 1. 왜 추가 Screening을 생략하는가

### 1) 현재 두 Metal Boundary만으로 P8 2D 분석을 구성할 근거가 있음

현재까지 확보된 자료는 다음을 이미 제공한다.

- P5 7x7 Metal Boundary Sweep
- 주요 Forward 지표의 49-point 결과
- Nominal 주변 Local Slope
- Xbnd1/Xbnd2의 서로 다른 변화 방향
- 다른 Boundary 위치에 따라 민감도 크기가 달라지는 conditional effect
- P6의 tolerance 분석용 Xbnd1/Xbnd2 parameterization

따라서 "제3 변수가 없어서 P8 Device-level Window를 정의할 수 없다"는 증거 공백이 현재 존재하지 않는다.

### 2) 추가 변수 결과가 P8 핵심 결정을 바꿀 가능성이 낮음

예를 들어 Gate oxide thickness를 추가로 screening한다고 가정하면:

- 영향이 작게 나올 경우: 현재 Xbnd1/Xbnd2 2D 계획 유지
- 영향이 크게 나올 경우: oxide thickness도 중요한 device parameter라는 사실은 확인되지만, 이를 P8 제3축으로 추가하려면 연구 질문을 Gate Segmentation Geometry에서 더 넓은 process/device variation 문제로 확대해야 함

따라서 현재 일정에서는 결과가 어느 방향으로 나와도 P8 핵심 handoff를 크게 바꾸지 않을 가능성이 높다.

### 3) 선택 산출물의 기회비용

P07-T02-O01~O03은 선택사항이며, 새 TCAD를 수행하면 다음 작업이 추가된다.

- SDE/SDevice 조건 추가
- simulation 완료 확인
- Raw 결과 추출
- 기존 Boundary sensitivity와 동일 기준 비교
- 그래프 제작
- 기존 O04의 "Screening 미수행" 제출 내용을 새 결과에 맞게 수정

남은 일정에서 이 작업보다 다른 필수 Phase의 simulation/검증/보고서 지원이 프로젝트 전체 완성도에 더 직접 기여할 가능성이 높다.

---

## 2. 내부 의사결정 점수

아래 비율은 실험 확률이나 물리적 통계량이 아니라, **프로젝트 운영을 위한 weighted decision score**이다.

평가 기준은 다음 항목을 사용하였다.

- P8 최종결론에 대한 직접 기여
- 현재 증거 공백 해소 정도
- P8 변수 선정 변경 가능성
- 보고서 근거 보강 효과
- 남은 일정의 기회비용
- 추가 실행·검증 부담
- 연구 범위 확대 위험

### 평가 결과

| 선택 | 이득 | 손실 |
|---|---:|---:|
| P07-T02-O01~O03 추가 TCAD 실행 | 약 31% | 약 69% |
| 기존 Raw + 선행연구로 제외 근거 보강 | 약 81% | 약 19% |

이 점수의 목적은 "Tox가 중요하지 않다"를 정량화하는 것이 아니라, **현재 시점에 새 TCAD를 수행하는 것이 프로젝트 전체 일정 대비 얼마나 효율적인가**를 비교하는 것이다.

---

## 3. 후보 변수별 검토

| 후보 변수 | 현재 판단 | 자세한 이유 |
|---|---|---|
| Gate oxide thickness | 추가 Screening을 굳이 한다면 가장 실행이 쉬운 후보이나 현재는 미수행 | 이미 baseline parameter로 존재하고 문헌 근거가 충분함. 그러나 현재 L-H-L Gate Segmentation Geometry와는 별도의 device 축이며, 결과가 커도 P8 제3축으로 즉시 채택하기 어렵다. |
| Silicon pillar/body thickness | 미수행 | gate electrostatic control뿐 아니라 current area, floating-body effect, GIDL, 매우 얇은 영역에서는 quantum-confinement 해석까지 함께 열릴 수 있다. 단순 보조 변수보다 별도 연구축에 가깝다. |
| Gate length | 미수행 | 현재 전체 gate length 60 nm 내부에서 M1/M2/M3와 Metal Boundary를 정의한다. Gate length를 바꾸면 Xbnd 위치의 의미와 segment ratio까지 함께 다시 정의해야 한다. |
| Doping / junction profile | 미수행 | junction electric field, depletion width, BTBT/GIDL, series resistance 등 여러 특성이 동시에 바뀌어 Gate Segmentation Geometry보다 doping/process variation 연구에 가까워진다. |
| Work Function | 미수행 | 앞 Phase에서 Low-WF/High-WF 선택이 완료되었다. 다시 Sweep하면 Geometry tolerance가 아니라 Work Function + Geometry의 복합 연구로 바뀐다. |
| Metal interface spread / non-abrupt boundary | 미수행 | 실제 공정 관점에서는 의미가 있을 수 있으나 현재 검증된 독립 parameter가 없고, "spread"의 물리적 모델 정의부터 새로 필요하다. |
| M1/M2/M3 segment length | 별도 Screening 불필요 | Xbnd1/Xbnd2에서 자동 결정되는 파생값이다. |
| 중앙 High-WF 영역 폭/위치 | 별도 Screening 불필요 | 동일한 Xbnd1/Xbnd2 geometry를 해석하기 위한 파생 descriptor이다. |

---

## 4. 특히 Tox를 선택 후보로 검토했던 이유

Tox가 가장 중요한 변수라서가 아니라, **선택사항 O01~O03을 꼭 수행해야 한다면 최소 비용으로 수행하기 쉬운 후보**였기 때문이다.

- baseline에서 이미 parameter로 사용됨
- Nominal 1 nm 기준의 작은 변화 조건을 만들기 쉬움
- 선행 TMSG 연구에서 oxide thickness의 영향을 별도로 분석함
- Work Function 또는 gate length를 다시 열지 않아도 됨

그러나 현재 판단에서는 "실행이 쉽다"는 이유만으로 선택산출물을 수행할 필요는 없다.

---

## 5. 선행연구가 보여주는 중요한 점

선행연구는 오히려 다른 parameter들이 실제로 device 특성에 영향을 줄 수 있음을 보여준다.

- TMSG 연구: gate-length ratio, oxide thickness, silicon thickness, doping concentration을 모두 threshold voltage 관련 parameter로 분석
- VCT 석사학위논문: gate length, body thickness, drain doping과 floating-body effect를 각각 분석
- Three-layer WF VCT 연구: 양 끝 Low-WF와 중앙 High-WF의 역할을 분리하여 설명

따라서 보고서에서는 다음과 같이 쓰는 것이 정확하다.

> 추가 변수가 물리적으로 무민감하다고 판단하여 제외한 것이 아니라, 본 연구의 직접 분석 범위를 L-H-L Three-zone의 Metal Boundary 기반 Gate Segmentation Geometry로 한정하고, 현재 P5/P6/P7 결과만으로 P8 2D Window를 구성할 근거가 충분하므로 추가 독립 Sweep 축을 열지 않았다.

---

## 6. 재검토 조건

아래 상황이 실제로 발생할 경우에만 추가 구조변수 Screening을 다시 검토한다.

- P8의 Xbnd1/Xbnd2 2D Window만으로 특정 limiting metric을 설명하기 어려운 경우
- 이후 검증에서 현재 2D Geometry 모델과 명확한 불일치가 나타나는 경우
- 교수/심사 피드백에서 특정 process parameter의 tolerance 분석이 직접 요구되는 경우

그 전까지는 P07-T02-O01~O03 미수행 결정을 유지하는 것이 계산량과 연구범위 측면에서 합리적이다.
