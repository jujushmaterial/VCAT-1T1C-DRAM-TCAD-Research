# P03-T13-O07 WF Split 실행용 기준 구조 확인

## 구조 조건
- 2D axisymmetric VCAT
- Dpillar = 12 nm
- Tox = 1 nm
- Lg = 60 nm
- Lsn / Lbl = 20 / 20 nm
- Nbody = 1e17 cm^-3
- NSD = 1e20 cm^-3
- JDepthSN / JDepthBL = 20 / 20 nm
- GaussFactor = 0.8
- MeshScale = 1.0

## 3-zone gate
- M1:M2:M3 = 1:1:1
- M1 = 20 nm / LOW WF
- M2 = 20 nm / HIGH WF
- M3 = 20 nm / LOW WF
- Xbnd1 = 0.040 um
- Xbnd2 = 0.060 um

## SDevice mapping
- gate_m1 = WF_LOW
- gate_m2 = WF_HIGH
- gate_m3 = WF_LOW
- 세 gate는 동일 gate voltage로 동시에 sweep한다.

제공된 SDE/SDevice 코드, Region/Contact 화면, mesh 화면을 기준으로 L-H-L WF Split 실행용 기준 구조가 구성되어 있다.
