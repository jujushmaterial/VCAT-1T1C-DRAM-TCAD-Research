# P01-T10-O01 — Dual-WF 작동 원인 통합 결론

## 1. 비교 기준

동일한 기존 SProcess 구조와 동일 SDevice 물리·수치 설정에서 `WF_S`, `WF_D`만
LL·LH·HL·HH로 변경했다. P01-T01-O02의 사용자 제공 원본 로그에서 네 조건의 실제 WorkFunction,
Low/High-Vd sweep, profile/final TDR 기록과 정상 종료를 확인했다.

| Case | Node | WF_S | WF_D |
|---|---|---:|---:|
| LL | n2 | 4.2 eV | 4.2 eV |
| LH | n19 | 4.2 eV | 4.8 eV |
| HL | n15 | 4.8 eV | 4.2 eV |
| HH | n21 | 4.8 eV | 4.8 eV |

대표 내부 비교는 `Vd=0.7 V`, `Vg=0, 1.0, 2.5 V`와 공통 C1 lateral cutline을 사용했다.

## 2. 단자 결과

| Case | Vth High (V) | Ion High (raw) | Ioff High (raw) | SS High (mV/dec) | 보고된 |DIBL| (mV/V) | signed (Vth_low−Vth_high)/ΔVd (mV/V) |
|---|---:|---:|---:|---:|---:|---:|
| LL | 0.601 | 1.1047e-03 | 4.7192e-11 | 80.65 | 113.72 | -113.72 |
| LH | 1.011 | 1.0534e-03 | 2.2331e-15 | 82.08 | 90.40 | -90.40 |
| HL | 1.069 | 1.0478e-03 | 1.1596e-15 | 84.30 | 86.64 | -86.64 |
| HH | 1.202 | 9.9957e-04 | 8.5444e-16 | 80.73 | 189.82 | -189.82 |

확인된 경향은 다음과 같다.

- **LL:** 가장 낮은 High-Vd Vth와 가장 큰 High-Vd Ioff를 보이며 Ion도 가장 크다.
- **LH:** LL보다 Ioff가 크게 감소하고 Vth가 증가하지만, High-Vd Ion은 `1.0534e-03`으로 유지된다.
- **HL:** 평균 WF는 LH와 같지만 Vth·Ioff·보고된 |DIBL|이 LH와 동일하지 않다.
- **HH:** 가장 높은 Vth와 가장 작은 Ioff를 보이며 High-Vd Ion은 네 조건 중 가장 작다.

따라서 단순 평균 WF만으로 네 조건의 Id–Vg 차이를 설명할 수 없고,
WF의 source/drain 방향 배치가 결과에 관여한다는 근거가 있다.

## 3. 내부 프로파일과 단자 결과의 연결

### Off-state: Vg=0 V

공통 C1 cutline의 Potential에서 LL과 High-WF 포함 조건의 profile 차이가 크다.
이 차이는 LL의 낮은 추출 Vth와 큰 Ioff가 함께 나타난 단자 결과와 같은 방향의 경향이다.
다만 Potential 한 변수만으로 누설 메커니즘을 확정하지 않고 CBE·eDensity·eCurrent와 함께 본다.

### Threshold 부근: Vg=1.0 V

Potential·ConductionBandEnergy·ElectricField·eDensity·eCurrent에서 LL·LH·HL·HH의
profile 위치와 형상이 서로 다르다. 특히 평균 WF가 같은 LH와 HL도 겹치지 않으므로,
**공간적 WF 순서가 채널 전위와 전도대 형상에 영향을 준다는 해석을 지지한다.**

ElectricField는 좁은 peak와 mesh-node spike에 민감하므로 peak 한 점의 크기보다
전체 위치·폭·주변 profile을 우선한다.

### On-state: Vg=2.5 V

High-Vd Ion은 `9.9957e-04~1.1047e-03` 범위로 off-state Ioff의 조건 간 차이보다 훨씬 좁다.
이는 강한 gate bias에서 네 조건의 전위 profile 차이가 상대적으로 줄어드는 화면과 일관된다.
다만 절대 전류 단위 정규화가 확정되지 않았으므로 수치는 `raw exported unit`로 유지한다.

## 4. 통합 결론

이 구조에서 관측된 Dual-WF 효과는 다음 흐름으로 정리할 수 있다.

**WF_S/WF_D의 값과 공간 순서 변화  
→ 채널의 Potential·ConductionBandEnergy·ElectricField·전자 분포 변화  
→ Id–Vg 이동과 Vth·Ioff·Ion 차이**

LH 조건은 LL보다 off-state 누설을 크게 낮추면서 HH보다 낮은 Vth와 비슷한 on-state Ion을 보인다.
LH와 HL의 차이는 평균 WF가 같더라도 WF 배치 순서가 중요하다는 근거다.

## 5. DIBL 해석 주의

현재 추출 코드는 `abs((Vth_Low−Vth_High)/(Vd_High−Vd_Low))*1000`을 보고한다.
그런데 네 조건 모두 `Vth_High > Vth_Low`이므로 conventional signed 값은 음수다.
따라서 표의 양수 값은 **절대 이동량**이며, 이를 곧바로 일반적인 drain-induced barrier lowering의
크기로 해석해서는 안 된다. Low-Vd sweep 방향, Vth 추출 방식과 데이터 선택을 재확인하기 전에는
`reported |DIBL|`로 표기한다.

## 6. 제한사항

- SProcess 경계 자료에서 gateS와 gateD 사이 Gap은 1 nm로 확인되지만, 고정값만 사용했고 Gap sweep을 수행하지 않았으므로 Gap 효과는 평가하지 않는다.
- LL과 LH만으로 순수 WF 경계 효과를 단정하지 않는다.
- 2D contour의 color scale이 다를 수 있으므로 정량 비교는 공통 1D cutline을 우선한다.
- 전류는 SVisual 화면에서 A/µm로 표시되지만 Tcl 출력은 A로 표기되어 절대 단위 정규화가 미확인이다.
- 이 결과는 제공된 구조·mesh·물리 모델 조건에 한정되며 1T1C 동작 검증을 대체하지 않는다.
