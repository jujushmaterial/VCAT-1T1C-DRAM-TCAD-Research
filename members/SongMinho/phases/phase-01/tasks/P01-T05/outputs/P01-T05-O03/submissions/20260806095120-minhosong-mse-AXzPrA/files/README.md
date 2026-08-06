# P01-T05-O03 — Gap과 금속 경계 위치 확인값

## 1. 결과물 정보
- Phase / Issue: Phase 1 / Issue #1
- Task / Output: `P01-T05` / `P01-T05-O03`
- 목적: 기존 Dual-Metal Gate 구조의 실제 Gap 값과 gateS·gateD 경계 위치를 기록

## 2. 실제 적용 조건
- Gate length `Lg`: `0.028 µm` = `28 nm`
- Workbench `DMG_Gap`: `0.001 µm` = `1 nm`
- Gap 중심: `Y = 0`

## 3. 금속 경계
- gateS, source-side Titanium:
  - `Y = -0.0140 → -0.0005 µm`
  - `Y = -14.0 → -0.5 nm`
- Gap:
  - `Y = -0.0005 → 0.0005 µm`
  - `Y = -0.5 → 0.5 nm`
- gateD, drain-side Tungsten:
  - `Y = 0.0005 → 0.0140 µm`
  - `Y = 0.5 → 14.0 nm`
- 각 금속의 lateral 길이: `13.5 nm`

## 4. 코드 근거
SProcess mask 정의:
```tcl
mask name= gateS left= -@Lg@/2 right= -@DMG_Gap@/2
mask name= gateD left=  @DMG_Gap@/2 right=  @Lg@/2
```

좌표 방향:
- `Y < 0`: source side
- `Y > 0`: drain side
- gateS material: Titanium
- gateD material: Tungsten

## 5. 충돌 및 적용 기준
제공된 SProcess 코드 주석에는 권장값으로 `DMG_Gap=0.003 µm`가 적혀 있지만,
실제 Workbench 화면에는 `DMG_Gap=0.001 µm`가 적용되어 있다.
본 결과물은 **실제 실행 파라미터인 0.001 µm = 1 nm**를 공식 확인값으로 기록한다.

## 6. 포함 파일
- `P01-T05-O03_gap_metal_boundary_values.csv`
- `P01-T05-O03_workbench_parameter_evidence.png`
- `P01-T05-O03_sprocess_boundary_excerpt.txt`
- `PROVENANCE.md`
