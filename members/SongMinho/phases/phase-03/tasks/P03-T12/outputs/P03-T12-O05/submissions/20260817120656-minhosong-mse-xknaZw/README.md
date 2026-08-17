# Phase 3 산출물 — Ion·Ioff·Vth·SS·GIDL 통합표

- 과제 ID: `P03-T12`
- 산출물 ID: `P03-T12-O05`
- 제출자: 송민호 (`@minhosong-mse`)
- 제출 시각: 2026-08-17T12:06:56.149Z
- 관련 Issue: [#3](https://github.com/jujushmaterial/VCAT-1T1C-DRAM-TCAD-Research/issues/3)
- 제출 방식: files

## 제출 파일

- [P03-T12-O05_DualMetal_DC_GIDL_Metrics.xlsx](./files/P03-T12-O05_DualMetal_DC_GIDL_Metrics.xlsx) (5.1KB)
- [P03-T12-O05_GIDL_1.csv](./files/P03-T12-O05_GIDL_1.csv) (13.9KB)
- [P03-T12-O05_GIDL_2.csv](./files/P03-T12-O05_GIDL_2.csv) (14.0KB)
- [P03-T12-O05_GIDL_3.csv](./files/P03-T12-O05_GIDL_3.csv) (13.9KB)
- [P03-T12-O05_GIDL_4.csv](./files/P03-T12-O05_GIDL_4.csv) (13.9KB)
- [P03-T12-O05_GIDL_5.csv](./files/P03-T12-O05_GIDL_5.csv) (14.3KB)
- [P03-T12-O05_GIDL_5WF_SVisual.png](./files/P03-T12-O05_GIDL_5WF_SVisual.png) (408.2KB)

## 제출 메모

P03-T12-O05 — Ion·Ioff·Vth·SS·GIDL 통합표

Forward raw와 신규 Dual-Metal GIDL raw를 동일 추출법으로 통합했다.

GIDL 그래프 축:
- X축: gate_sn OuterVoltage [V], 0→-0.4 V sweep
- Y축: storage TotalCurrent [A], signed raw current
- 정량 GIDL 지표: |storage TotalCurrent| at Vd=1.0 V, Vg=-0.4 V

핵심 경향:
- negative ΔWF(WF_SN<WF_BL): Ioff/GIDL/DIBL 감소, 대신 큰 |ΔWF|에서 Vth 증가와 Ion 감소
- positive ΔWF(WF_SN>WF_BL): GIDL/Ioff/DIBL 악화
따라서 평균 WF뿐 아니라 공간적 WF 순서가 전기특성에 중요하다.
