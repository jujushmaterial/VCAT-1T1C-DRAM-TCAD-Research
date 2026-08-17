# Phase 3 산출물 — 방향별 Id–Vg·전류 비교

- 과제 ID: `P03-T12`
- 산출물 ID: `P03-T12-O04`
- 제출자: 송민호 (`@minhosong-mse`)
- 제출 시각: 2026-08-17T12:04:49.690Z
- 관련 Issue: [#3](https://github.com/jujushmaterial/VCAT-1T1C-DRAM-TCAD-Research/issues/3)
- 제출 방식: files

## 제출 파일

- [P03-T12-O04_DM0_Vd0p05.csv](./files/P03-T12-O04_DM0_Vd0p05.csv) (13.3KB)
- [P03-T12-O04_DM0_Vd1p0.csv](./files/P03-T12-O04_DM0_Vd1p0.csv) (15.0KB)
- [P03-T12-O04_DMm0p2_Vd0p05.csv](./files/P03-T12-O04_DMm0p2_Vd0p05.csv) (13.3KB)
- [P03-T12-O04_DMm0p2_Vd1p0.csv](./files/P03-T12-O04_DMm0p2_Vd1p0.csv) (17.1KB)
- [P03-T12-O04_DMm0p4_Vd0p05.csv](./files/P03-T12-O04_DMm0p4_Vd0p05.csv) (13.4KB)
- [P03-T12-O04_DMm0p4_Vd1p0.csv](./files/P03-T12-O04_DMm0p4_Vd1p0.csv) (16.2KB)
- [P03-T12-O04_DMp0p2_Vd0p05.csv](./files/P03-T12-O04_DMp0p2_Vd0p05.csv) (13.3KB)
- [P03-T12-O04_DMp0p2_Vd1p0.csv](./files/P03-T12-O04_DMp0p2_Vd1p0.csv) (13.3KB)
- [P03-T12-O04_DMp0p4_Vd0p05.csv](./files/P03-T12-O04_DMp0p4_Vd0p05.csv) (13.7KB)
- [P03-T12-O04_DMp0p4_Vd1p0.csv](./files/P03-T12-O04_DMp0p4_Vd1p0.csv) (13.3KB)

## 제출 메모

P03-T12-O04 — 방향별 Id–Vg·전류 비교

원본 SVisual Forward Id–Vg 5조건 비교와 raw CSV 10개를 제출한다.

그래프 축:
- X축: gate_sn OuterVoltage [V] (gate_sn/gate_bl은 같은 word-line 전압으로 함께 sweep)
- Y축: storage TotalCurrent [A], signed raw current

Vd=0.05 V와 Vd=1.0 V를 각각 비교한다. 표 지표 계산 시 전류 크기 |Id|를 사용하지만 raw CSV의 부호는 보존했다.
ΔWF 부호를 바꾸었을 때 같은 평균 WF에서도 Id–Vg 이동과 전류가 달라져 spatial WF order 효과가 확인된다.
