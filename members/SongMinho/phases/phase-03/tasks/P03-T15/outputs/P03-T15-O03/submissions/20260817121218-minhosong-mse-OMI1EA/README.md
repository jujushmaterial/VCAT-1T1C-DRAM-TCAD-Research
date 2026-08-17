# Phase 3 산출물 — Geometry별 Id–Vg·DC 비교

- 과제 ID: `P03-T15`
- 산출물 ID: `P03-T15-O03`
- 제출자: 송민호 (`@minhosong-mse`)
- 제출 시각: 2026-08-17T12:12:18.947Z
- 관련 Issue: [#3](https://github.com/jujushmaterial/VCAT-1T1C-DRAM-TCAD-Research/issues/3)
- 제출 방식: files

## 제출 파일

- [P03-T15-O03_G1_G2_Forward_IdVg_SVisual.png](./files/P03-T15-O03_G1_G2_Forward_IdVg_SVisual.png) (391.8KB)
- [P03-T15-O03_G1_G2_GIDL_SVisual.png](./files/P03-T15-O03_G1_G2_GIDL_SVisual.png) (326.9KB)

## 제출 메모

P03-T15-O03 — Geometry별 Id–Vg·DC 비교

SVisual 원본을 사용한다.
Forward 그래프 축:
- X축: gate_m1 OuterVoltage [V]
- Y축: storage TotalCurrent [A], signed raw current
- n112/n115 = G1(25/10/25) Vd=1.0/0.05 V
- n123/n126 = G2(15/30/15) Vd=1.0/0.05 V

G0는 T14의 n73 1:1:1 기준 raw를 재사용하며 정량 비교는 O04 통합표에 함께 포함했다.
GIDL 보조 그래프도 X=gate_m1 OuterVoltage [V], Y=storage TotalCurrent [A]이다.
