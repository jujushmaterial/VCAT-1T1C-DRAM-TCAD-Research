# Phase 2 산출물 — 기존 Medium 또는 Fine 대비 최소 비교표

- 과제 ID: `P02-T10`
- 산출물 ID: `P02-T10-O04`
- 제출자: 이선형 (`@LSH-linear`)
- 제출 시각: 2026-08-11T02:33:05.366Z
- 관련 Issue: [#2](https://github.com/jujushmaterial/VCAT-1T1C-DRAM-TCAD-Research/issues/2)
- 제출 방식: files

## 제출 파일

- [P02-T10-O04_junction-mesh-additional-split_not-applied.pdf](./files/P02-T10-O04_junction-mesh-additional-split_not-applied.pdf) (161.4KB)

## 제출 메모

P02-T10-O04 1차 제출 — Junction Mesh 추가 Split 검증 자료

기존 Local Mesh의 Fine 대비 GIDL/BTBT 차이 원인을 확인하기 위해 JunctionMesh만 Uniform Fine 0.5 수준으로 강화한 단일 추가 split 검증 결과를 우선 제출한다.

Reference mesh는 정상 생성되었으나 SDevice 계산에서 Newton iteration 150회 초과 후 step reduction이 반복되고 MinStep에 도달하여 목표 Vg=-0.4 V까지 정상 sweep하지 못했으며, runtime은 3087.76 s로 증가하였다. 따라서 본 조건은 “Junction Mesh 추가 Split 검증 결과 — 최종 적용 X”로 보존하고 최종 Local Mesh baseline에는 반영하지 않는다.

본 제출은 O04의 1차 제출본이다. 현재 Local/Fine 비교 결과 자체는 확보되어 있으나, 보고서 재사용성과 증거 명확성을 높이기 위해 Local Mesh, GIDL, ElectricField, BTBT 및 fixed-point 화면 일부를 다시 캡처하고 있다. 재캡처가 완료되면 Local/Fine 최소 비교표(CSV)와 대표 결과 이미지들을 동일 P02-T10-O04에 2차 보완 제출할 예정이다.

따라서 이번 1차 제출은 Junction Mesh 추가 split 검증 기록을 우선 보존하기 위한 것이며, O04 최종 증거 패키지는 2차 보완 제출까지 포함하여 구성한다.
