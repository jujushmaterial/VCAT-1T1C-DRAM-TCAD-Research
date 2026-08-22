# Phase 8 산출물 — 변수 간 Interaction·결합 영향 분석

- 과제 ID: `P08-T02`
- 산출물 ID: `P08-T02-O05`
- 제출자: 이선형 (`@LSH-linear`)
- 제출 시각: 2026-08-22T14:50:33.550Z
- 관련 Issue: [#8](https://github.com/jujushmaterial/VCAT-1T1C-DRAM-TCAD-Research/issues/8)
- 제출 방식: files

## 제출 파일

- [P08-T02-O05_Interaction_Interpretation.txt](./files/P08-T02-O05_Interaction_Interpretation.txt) (766B)
- [P08-T02-O05_Interaction_Summary.csv](./files/P08-T02-O05_Interaction_Summary.csv) (1.1KB)
- [P08-T02-O05_Supplemental_15pt_Boundary_Evidence.csv](./files/P08-T02-O05_Supplemental_15pt_Boundary_Evidence.csv) (3.5KB)
- [P08-T02-O05_Supplemental_15pt_Explanation.txt](./files/P08-T02-O05_Supplemental_15pt_Explanation.txt) (1.5KB)
- [P08-T02-O05_DIBL_Conditional_Interaction.png](./files/P08-T02-O05_DIBL_Conditional_Interaction.png) (78.1KB)

## 제출 메모

P08-T02-O05 — 변수 간 Interaction·결합 영향 분석

목적
- Xbnd1 효과가 Xbnd2 위치에 따라 달라지는지, 그리고 그 반대가 성립하는지 확인하여 단순 OAT 이상의 결합효과를 평가한다.

핵심 결과
- low-Xbnd2에서 Xbnd1 증가에 따른 DIBL 악화가 더 강하다.
- high-Xbnd1에서 Xbnd2 증가에 따른 DIBL 회복 효과가 더 강하다.
- 이 conditional-slope dependence가 lower-right 영역의 MARGINAL strip과 일치한다.

결론
- 현재 P8 primary domain에서 Xbnd1–Xbnd2 interaction이 Device-level tolerance에 실질적인 영향을 준다.
- DIBL이 interaction-limited boundary의 핵심 지표이다.

주의
- 이는 현재 고정된 device/WF 조건의 L-H-L gate segmentation geometry에 대한 결론이다.

추가 Boundary 증거
- primary 31점에서 FAIL 경계가 닫히지 않아, 결과 후 별도 supplemental 15점을 외부에 실행하였다.
- supplemental 결과는 PASS 7 / MARGINAL 6 / FAIL 2이며 38/62, 39/62에서 DIBL hard FAIL이 확인되었다.
- 이 결과는 primary grid와 동급으로 합치지 않고, interaction 방향 및 외부 FAIL bracketing의 별도 증거층으로 사용한다.
