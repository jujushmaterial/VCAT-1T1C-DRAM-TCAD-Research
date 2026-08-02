# P02-T08 GIDL Mesh-Sensitivity Interpretation

## 목적

기존 P02-T08 Medium mesh 결과에 대해 Coarse와 Fine mesh를 추가 실행하여 다음 항목의 mesh sensitivity를 확인했다.

- terminal GIDL current at `Vg=-0.4 V`
- oxide maximum electric field
- Silicon peak electric field
- maximum Band2BandGeneration
- 동일 물리 좌표의 Silicon field, Silicon BTBT, oxide field
- runtime과 memory

세 조건은 입력 mesh만 다르고 GIDL bias, 물리 모델, solver 설정은 동일하다.

## 공통 조건

- storage: `+1.0 V`
- bitline: `0 V`
- gate: `0 → -0.4 V`
- work function: `4.70 eV`
- temperature: `300 K`
- physics: Fermi, OldSlotboom, PhuMob, HighFieldSaturation, SRH, NonlocalPath BTBT
- cylindrical axisymmetric calculation

## 핵심 결과

Fine 기준 절대 차이:

| Metric | Medium–Fine | Coarse–Fine |
|---|---:|---:|
| GIDL current | 19.173% | 33.473% |
| Oxide Emax | 27.499% | 27.430% |
| Silicon peak field | 15.161% | 27.614% |
| Maximum BTBT generation | 14.216% | 42.996% |
| Fixed-point Silicon field | 5.268% | 14.998% |
| Fixed-point Silicon BTBT | 0.538% | 21.497% |
| Fixed-point oxide field | 18.298% | 20.358% |

## 해석

1. **Terminal GIDL current는 현재 mesh 범위에서 수렴하지 않았다.**  
   Medium은 Fine보다 약 19.17%, Coarse는 Fine보다 약 33.47% 크다.

2. **Oxide field는 최대값과 고정점 모두 mesh-sensitive하다.**  
   Fine의 pointwise oxide Emax는 약 `8.57E+06 V/cm`로 Coarse/Medium보다 높다. 동일 oxide 고정점에서도 Medium–Fine 차이가 약 18.30%이므로, 단순히 최대 node 위치만 달라진 영향으로 설명하기 어렵다.

3. **Silicon fixed-point BTBT는 Medium과 Fine에서 거의 수렴했다.**  
   동일한 `R.SN`, `(X,Y)=(0.0199,0.0059) µm`에서 BTBT 차이는 약 0.54%이다. pointwise maximum의 차이에는 mesh node 위치와 hotspot 해상도의 영향이 포함된 것으로 판단된다.

4. **Silicon field는 BTBT보다 더 큰 mesh sensitivity를 보인다.**  
   동일 Silicon 고정점의 Medium–Fine 차이는 약 5.27%이다.

5. **Hotspot 위치 해석은 안정적이다.**  
   세 mesh 모두 주요 field/BTBT hotspot이 상부 SN–Channel junction의 외곽 Si/oxide edge 부근에 유지된다.

6. **Maximum BTBT와 terminal GIDL의 mesh 순서는 일치할 필요가 없다.**  
   Maximum BTBT는 단일 지점의 peak이며, terminal current는 공간 전체 generation과 carrier transport가 누적된 결과이다.

## 결론

- 기존 P02-T09의 전역 DC Id–Vg 지표에는 Medium MeshScale=1.0을 사용할 수 있다.
- P02-T08의 절대 GIDL current와 oxide field는 아직 완전한 mesh-independent 결과로 간주하지 않는다.
- 동일 위치의 Silicon BTBT는 Medium과 Fine에서 잘 일치한다.
- 향후 GIDL 절대값이나 oxide reliability를 핵심 비교지표로 사용할 경우 Fine 또는 추가 mesh 정의를 사용하고 mesh sensitivity를 함께 보고한다.

## 제한

- MeshScale=0.5보다 더 미세한 mesh는 실행하지 않았다.
- BTBT의 공간 적분값을 별도로 추출하지 않았다.
- Pointwise maximum과 fixed-point probe를 비교했으며, volume-averaged field는 계산하지 않았다.
