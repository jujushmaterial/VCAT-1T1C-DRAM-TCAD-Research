# Phase 3 산출물 — 대표 WF 조건 Electric Field·Barrier 비교

- 과제 ID: `P03-T14`
- 산출물 ID: `P03-T14-O05`
- 제출자: 송민호 (`@minhosong-mse`)
- 제출 시각: 2026-08-15T15:09:53.537Z
- 관련 Issue: [#3](https://github.com/jujushmaterial/VCAT-1T1C-DRAM-TCAD-Research/issues/3)
- 제출 방식: files

## 제출 파일

- [P03-T14-O05_ConductionBand_Cutline_n72.csv](./files/P03-T14-O05_ConductionBand_Cutline_n72.csv) (3.8KB)
- [P03-T14-O05_ConductionBand_Cutline_n73.csv](./files/P03-T14-O05_ConductionBand_Cutline_n73.csv) (3.8KB)
- [P03-T14-O05_ConductionBand_Cutline_n74.csv](./files/P03-T14-O05_ConductionBand_Cutline_n74.csv) (3.8KB)
- [P03-T14-O05_Cutline_Summary.csv](./files/P03-T14-O05_Cutline_Summary.csv) (301B)
- [P03-T14-O05_ElectricField_n73_Ti-TiN.png](./files/P03-T14-O05_ElectricField_n73_Ti-TiN.png) (74.4KB)
- [P03-T14-O05_ElectricField_n74_W-TiN.png](./files/P03-T14-O05_ElectricField_n74_W-TiN.png) (74.2KB)
- [P03-T14-O05_ElectricField_Overview_n72-n74.png](./files/P03-T14-O05_ElectricField_Overview_n72-n74.png) (460.4KB)
- [P03-T14-O05_README.md](./files/P03-T14-O05_README.md) (1.4KB)

## 제출 메모

WF 대표 후보 n72(Al/TiN), n73(Ti/TiN), n74(W/TiN)에 대해
동일 GIDL 최종 상태(storage=1.0 V, bitline=0 V, gates=-0.4 V, 300 K)에서
Sentaurus Visual 원본 ElectricField, ConductionBandEnergy,
Band2BandGeneration 이미지를 비교하였다.

Barrier 비교는 동일 위치에서 추출한 ConductionBandEnergy cutline 원본 CSV 3개와
Sentaurus Visual의 3조건 중첩 그래프를 사용하였다.

각 2D 이미지의 color range는 자동 범위이므로 색 자체보다 legend 수치와
동일 cutline 데이터를 우선 비교하였다. 별도 TCAD 재실행이나 인공 데이터 생성은 하지 않았다.
