# Phase 3 산출물 — Mesh 전·후 핵심 지표 안정성

- 과제 ID: `P03-T16`
- 산출물 ID: `P03-T16-O05`
- 제출자: 송민호 (`@minhosong-mse`)
- 제출 시각: 2026-08-18T05:09:50.031Z
- 관련 Issue: [#3](https://github.com/jujushmaterial/VCAT-1T1C-DRAM-TCAD-Research/issues/3)
- 제출 방식: files

## 제출 파일

- [MeshOFF_G2_Forward_Vd0p05.csv](./files/MeshOFF_G2_Forward_Vd0p05.csv) (13.3KB)
- [MeshOFF_G2_Forward_Vd1p0.csv](./files/MeshOFF_G2_Forward_Vd1p0.csv) (13.3KB)
- [MeshOFF_G2_GIDL.csv](./files/MeshOFF_G2_GIDL.csv) (15.8KB)
- [MeshON_G2_Forward_Vd0p05.csv](./files/MeshON_G2_Forward_Vd0p05.csv) (13.3KB)
- [MeshON_G2_Forward_Vd1p0.csv](./files/MeshON_G2_Forward_Vd1p0.csv) (13.3KB)
- [MeshON_G2_GIDL.csv](./files/MeshON_G2_GIDL.csv) (16.1KB)
- [P03-T16-O05_Mesh_Stability.xlsx](./files/P03-T16-O05_Mesh_Stability.xlsx) (6.3KB)
- [P03-T16-O05_Mesh_Stability_Summary.csv](./files/P03-T16-O05_Mesh_Stability_Summary.csv) (795B)

## 제출 메모

Mesh ON/OFF의 Forward(Vd=0.05/1.0 V)와 GIDL 원본 CSV를 바탕으로 Vth·SS·Ioff·Ion·DIBL·GIDL 안정성을 비교했습니다. X=gate_m1 OuterVoltage[V], Y=storage TotalCurrent[A]입니다. Ion 변화 +0.338%, GIDL 변화 +0.567%이며 대표구조 판단을 뒤집는 mesh 민감성은 확인되지 않았습니다. 정량 cutoff는 Issue에 명시되지 않아 절대 변화량과 대표선정 유지 여부를 기준으로 해석했습니다.
