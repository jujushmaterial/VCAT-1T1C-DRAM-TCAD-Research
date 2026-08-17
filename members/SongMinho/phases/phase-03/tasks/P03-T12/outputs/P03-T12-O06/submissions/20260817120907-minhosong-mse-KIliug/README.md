# Phase 3 산출물 — 대표 Electric Field·Barrier 비교

- 과제 ID: `P03-T12`
- 산출물 ID: `P03-T12-O06`
- 제출자: 송민호 (`@minhosong-mse`)
- 제출 시각: 2026-08-17T12:09:07.239Z
- 관련 Issue: [#3](https://github.com/jujushmaterial/VCAT-1T1C-DRAM-TCAD-Research/issues/3)
- 제출 방식: files

## 제출 파일

- [P03-T12-O06_CBE_Cutline_n67_Delta_p0p4.csv](./files/P03-T12-O06_CBE_Cutline_n67_Delta_p0p4.csv) (3.3KB)
- [P03-T12-O06_CBE_Cutline_n127_Delta_m0p4.csv](./files/P03-T12-O06_CBE_Cutline_n127_Delta_m0p4.csv) (3.3KB)
- [P03-T12-O06_EField_n127_Delta_m0p4.png](./files/P03-T12-O06_EField_n127_Delta_m0p4.png) (79.9KB)
- [P03-T12-O06_Field_BTBT_Summary.csv](./files/P03-T12-O06_Field_BTBT_Summary.csv) (208B)
- [P03-T12-O06_Visual_Manifest.csv](./files/P03-T12-O06_Visual_Manifest.csv) (538B)
- [P03-T12-O06_CBE_3Condition_Overview_SVisual.png](./files/P03-T12-O06_CBE_3Condition_Overview_SVisual.png) (409.7KB)
- [P03-T12-O06_CBE_Cutline_n19_Delta0.csv](./files/P03-T12-O06_CBE_Cutline_n19_Delta0.csv) (3.4KB)
- [P03-T12-O06_CBE_Cutline_Overlay_SVisual.png](./files/P03-T12-O06_CBE_Cutline_Overlay_SVisual.png) (88.2KB)

## 제출 메모

P03-T12-O06 — 대표 Electric Field·Barrier 비교

대표 ΔWF=0(n19), +0.4(n67), -0.4(n127)를 동일 GIDL 최종 상태
(storage=1.0 V, bitline=0 V, gate_sn=gate_bl=-0.4 V, 300 K)에서 비교한다.

첨부 구성:
- ElectricField 3장: n19 / n67 / n127
- Band2BandGeneration 3장: n19 / n67 / n127
- ConductionBandEnergy 3장: n19 / n67 / n127
- 동일 위치 ConductionBand cutline raw CSV 3개 및 SVisual overlay/위치 증빙

Barrier cutline 축:
- X축: device transport x-coordinate [µm], 0→0.1 µm
- cutline 위치: y=0.0055 µm (세 조건 동일)
- Y축: ConductionBandEnergy [eV]

주의:
개별 2D contour는 SVisual auto color scale이 서로 다를 수 있으므로 색 자체의 직접 비교보다
각 legend의 수치와 동일 위치 cutline profile을 우선한다.

대표 legend 값:
- n19 (ΔWF=0): Emax≈6.227e6 V/cm, BTBT max≈7.876e24 cm^-3 s^-1
- n67 (ΔWF=+0.4): Emax≈7.782e6 V/cm, BTBT max≈1.366e25 cm^-3 s^-1
- n127 (ΔWF=-0.4): Emax≈6.446e6 V/cm, BTBT max≈3.188e24 cm^-3 s^-1

따라서 +ΔWF 방향은 GIDL·전계·BTBT가 증가하는 방향이고,
-ΔWF 방향은 BTBT/GIDL 억제 쪽으로 이동하는 경향을 보인다.
