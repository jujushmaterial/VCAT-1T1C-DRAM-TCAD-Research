# Phase 3 산출물 — Low·High WF 선정표와 선정 근거

- 과제 ID: `P03-T14`
- 산출물 ID: `P03-T14-O06`
- 제출자: 송민호 (`@minhosong-mse`)
- 제출 시각: 2026-08-15T15:10:50.207Z
- 관련 Issue: [#3](https://github.com/jujushmaterial/VCAT-1T1C-DRAM-TCAD-Research/issues/3)
- 제출 방식: files

## 제출 파일

- [P03-T14-O06_Low_High_WF_Selection.md](./files/P03-T14-O06_Low_High_WF_Selection.md) (1.5KB)

## 제출 메모

P3의 1:1:1 L-H-L 기준구조에서 10개 WF 조합의 Forward/GIDL 지표를 비교하고,
대표 후보 n72/n73/n74에 대해 Electric Field, ConductionBand cutline,
Band2BandGeneration을 추가 비교하였다.

최종 P3 Fixed WF로 LOW=Ti 4.33 eV, HIGH=TiN 4.70 eV(n73)을 선정한다.

선정 이유:
- n72 대비 DIBL과 peak E-field가 낮고 Ioff/SS도 소폭 개선됨
- n74 대비 Ion 손실이 작고 GIDL 및 peak BTBT의 큰 증가를 피함
- 단일 지표의 global best가 아니라 Forward 성능·누설·전계 간 치명적 열화가 없는 균형 후보

주의:
이 선정은 P3 기준 geometry에서의 Fixed WF 결정이다.
WF×geometry 전체 공간의 절대 global optimum을 주장하지 않는다.
후속 P5에서는 이 WF를 고정한 채 두 metal boundary만 정밀 최적화한다.
