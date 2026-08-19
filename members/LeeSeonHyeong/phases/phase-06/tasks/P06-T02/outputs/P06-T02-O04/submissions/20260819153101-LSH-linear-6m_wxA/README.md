# Phase 6 산출물 — P7·P8 공통 성능 추출 기준

- 과제 ID: `P06-T02`
- 산출물 ID: `P06-T02-O04`
- 제출자: 이선형 (`@LSH-linear`)
- 제출 시각: 2026-08-19T15:31:01.089Z
- 관련 Issue: [#6](https://github.com/jujushmaterial/VCAT-1T1C-DRAM-TCAD-Research/issues/6)
- 제출 방식: table

## 저장된 표

- 크기: 9행 × 6열
- 첫 행 제목 사용: 예
- [CSV 원본](./table.csv)
- [TSV 원본](./table.tsv)
- [JSON 원본](./table.json)

## 표 설명

P7/P8 tolerance 분석에서 모든 구조를 동일 기준으로 비교하기 위해 공통 성능 추출 기준을 고정하였다. Ion은 Vd=1.0 V, Vg=1.0 V, Ioff는 Vd=1.0 V, Vg=0 V에서 추출하며, Vth는 |Id|=1×10^-7 A constant-current 기준, SS는 Vd=1.0 V에서 1×10^-12≤|Id|≤1×10^-8 A 구간, DIBL은 Vth@Vd=0.05 V와 Vth@Vd=1.0 V의 차이를 기준으로 계산한다.

| Metric | Bias_or_Data_Range | Extraction_Method | Current_Definition | Unit | Frozen_Note |
| --- | --- | --- | --- | --- | --- |
| Ion | Vd=1.0 V, Vg=1.0 V | Use final Forward Id-Vg point | \|storage TotalCurrent\| | A | P5/P6 common |
| Ioff | Vd=1.0 V, nominal Vg=0 V | Use first stored Forward Id-Vg point; fresh PLT first point is Vg=1e-5 V | \|storage TotalCurrent\| | A | Preserves P5 extraction behavior |
| Ion/Ioff | Ion and Ioff above | Ion / Ioff | absolute-current ratio | - | P5/P6 common |
| Vth@Vd=0.05 | \|Id\| target = 1e-7 A | Log-linear interpolation in log10(\|Id\|) between bracketing points | \|storage TotalCurrent\| | V | constant-current method |
| Vth@Vd=1.0 | \|Id\| target = 1e-7 A | Log-linear interpolation in log10(\|Id\|) between bracketing points | \|storage TotalCurrent\| | V | constant-current method |
| SS | Vd=1.0 V; 1e-12 <= \|Id\| <= 1e-8 A | Linear fit log10(\|Id\|) versus Vg; SS = 1000 / slope | \|storage TotalCurrent\| | mV/dec | 120 points in fresh nominal run |
| DIBL | Vd=0.05 and 1.0 V | (Vth@0.05 - Vth@1.0) / 0.95 × 1000 | Vth values above | mV/V | P5/P6 common |
| GIDL | Vd=1.0 V, Vg=-0.4 V | Use final GIDL gate-sweep point | \|storage TotalCurrent\| | A | Use validated P5 PRODFAST GIDL deck |
