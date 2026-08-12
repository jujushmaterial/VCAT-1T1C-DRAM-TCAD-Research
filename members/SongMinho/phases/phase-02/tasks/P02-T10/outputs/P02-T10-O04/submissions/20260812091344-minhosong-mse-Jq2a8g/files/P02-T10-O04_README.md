# P02-T10-O04 Local vs Reference 비교 증거

## GIDL 조건
- storage = +1.0 V
- bitline = 0.0 V
- gate = 0.0 V -> -0.4 V
- gate work function = 4.70 eV
- temperature = 300 K
- BTBT = NonlocalPath
- 2D cylindrical: yAxis = 0.0

## GIDL CSV 축
`P02-T10-O04_GIDL_Raw.csv`

- X축: `gate OuterVoltage [V]`
- Y축: `storage TotalCurrent [A]`
- CSV에는 signed raw current를 그대로 보존한다.
- 그래프에서는 `|storage TotalCurrent|`를 사용하고 Y축을 log scale로 표시한다.

## Local 결과 핵심값
- GIDL @ Vg=-0.4 V = 2.9398496e-14 A
- ElectricField max = 8.56553e6 V/cm
- Band2BandGeneration max = 7.98864e24 cm^-3 s^-1
- SDevice wallclock = 668.94 s
- grid points = 1825
- SDevice log total elements = 3454
- R.Channel DeltaVolume warning = 0.05788%
- non-Delaunay elements = 0

## Fine 0.5 reference 대비
- GIDL: +19.96%
- ElectricField max: -0.066%
- BTBT max: +15.93%
- GIDL runtime: -33.7%
- SDevice elements: -36.4%

## 해석
Local mesh는 DC 및 peak electric-field 기반 2D screening에 적합하지만, absolute GIDL/BTBT precision에서는 Uniform Fine 0.5를 대체하지 않는다.
따라서 후속 일반 2D 구조 탐색은 Local Mesh를 기본으로 하고, 최종 또는 대표 후보의 정밀 GIDL/BTBT는 Fine 0.5로 spot-check한다.
