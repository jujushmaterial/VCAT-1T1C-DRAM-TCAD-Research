# P01-T04-O01 프로파일 인덱스·문서 보완본

현재 GitHub에 이미 올라간 24개 핵심 profile 이미지와 6개 보조 이미지는 다시 포함하지 않는다. 본 보완본은 각 이미지의 bias·TDR index·변수·cutline을 찾을 수 있도록 인덱스와 provenance만 추가한다.

## 공식 비교 조건

- Cases: LL(n2), LH(n19), HL(n15), HH(n21)
- High Vd = 0.7 V
- Off: Vg=0 V, index `0000`
- Near-threshold: Vg=1.0 V, index `0003`
- On: Vg=2.5 V, index `0005`
- C1: `X=0.0003 µm`, `Y=-0.112→+0.112 µm`

## 핵심 변수

- ElectrostaticPotential
- ConductionBandEnergy
- Abs(ElectricField-V)
- eDensity
- Abs(eCurrentDensity-V)

2D panel은 자동 color range가 다를 수 있으므로 조건 간 정량 비교는 공통 1D cutline을 우선한다. ElectricField는 한두 mesh-node spike보다 위치·폭·주변 profile을 본다. 보조 LH/HL High/Low-Vd 이미지는 공식 네 조건 High-Vd 비교를 대체하지 않는다.
