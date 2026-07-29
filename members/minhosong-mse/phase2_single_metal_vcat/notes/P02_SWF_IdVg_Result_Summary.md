# P02 Single-WF VCAT — Id–Vg Progress Summary

## 실행 조건

| Parameter | Low-drain node | High-drain node |
|---|---:|---:|
| `VdBias` | 0.05 V | 1.00 V |
| `WF` | 4.70 eV | 4.70 eV |
| `Temp` | 300 K | 300 K |
| `VgStop` | 1.00 V | 1.00 V |

## 실행 방식

- 동일한 SDE mesh에서 두 개의 독립 SDevice 노드로 분리하였다.
- 각 노드는 equilibrium → storage bias ramp → gate sweep 순서로 계산하였다.
- 중간 Save/Load 없이 현재 수렴 상태에서 바로 Id–Vg를 수행하였다.

## 현재 결과

- 두 노드 모두 `Vg=0–1.0 V` sweep을 완료하였다.
- 두 곡선은 subthreshold 영역에서 유사한 경향을 보였다.
- `Vd=1.0 V` 조건은 ON 영역에서 `Vd=0.05 V`보다 큰 storage current를 보였다.
- 곡선의 급격한 수치 spike나 중단은 관찰되지 않았다.

## 현재 판정

Id–Vg 계산 자체는 성공했지만 `P02-T06`은 아직 완료 처리하지 않는다. 아래 산출물이 추가로 필요하다.

- Id–Vd 원본 데이터와 그래프
- Id–Vg 원본 CSV
- Vth, SS, Ion, Ioff, DIBL 결과표
- 최종 그래프 파일의 저장소 업로드

## 다음 작업

1. Id–Vd를 `Vg=0.4, 0.6, 0.8, 1.0 V`에서 실행
2. Id–Vg / Id–Vd 데이터를 CSV로 export
3. 공통 추출 기준으로 DC 지표 계산
