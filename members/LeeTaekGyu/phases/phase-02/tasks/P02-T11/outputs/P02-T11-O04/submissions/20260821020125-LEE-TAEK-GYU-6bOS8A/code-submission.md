# Phase 2 산출물 — 전류 정규화와 2D 적용 범위

- 과제 ID: `P02-T11`
- 산출물 ID: `P02-T11-O04`
- 제출자: 이택규 (`@LEE-TAEK-GYU`)
- 제출 시각: 2026-08-21T02:01:25.528Z
- 관련 Issue: [#2](https://github.com/jujushmaterial/VCAT-1T1C-DRAM-TCAD-Research/issues/2)
- 제출 방식: code

## 1. P02-T11-O04. 전류 정규화와 2D 적용 범위

- 코드 종류: Sentaurus SDevice
- 원본 파일: [`code-1.cmd`](./source/code-1.cmd)

```tcl
P02-T11-O04. 전류 정규화와 2D 적용 범위

근거: O03 "2D-3D 핵심 성능 비교표" (2026-08-21 제출) 결과 기반

1. 전류 정규화

2D SDevice 코드의 Math 블록에는 Cylindrical(yAxis=0.0) 옵션이 포함되어 있음. 이 옵션은 2D 축대칭 단면을 중심축 기준 360도 회전시켜, 실제 원통형(3D) 소자 전체의 전류를 계산하는 방식임.

O03에서 확인한 바에 따르면, 이 2D 결과(Ion, Ioff)는 별도의 스케일링(원주 길이 보정, 단위폭당 전류 환산 등) 없이도 3D 전체 전류값과 직접 비교 가능한 수준으로 일치함:

Vd=0.05V: 2D Ion=2.8647e-06A vs 3D Ion=2.8521e-06A (차이 -0.44%)
Vd=1.00V: 2D Ion=8.4764e-06A vs 3D Ion=8.4563e-06A (차이 -0.24%)

결론: Cylindrical 옵션으로 계산된 2D 전류값은 추가 정규화 없이 3D 총 전류값과 직접 비교 가능함.

2. 2D 적용 범위

현재까지 검증된 조건 (2D-3D 재현성 확인됨, O03 기준):

구조: Single-Metal, 축대칭(원주 방향 WF 균일)
바이어스: Forward Id-Vg, Vg=0~1.0V, Vd=0.05V/1.00V
Mesh: MeshScale=1.0(Medium)
이 조건에서 Vth/SS/Ion 모두 0.5% 이내로 일치

아직 검증되지 않은 범위:

GIDL/역방향 바이어스 영역 (Band2Band NonlocalPath 물리가 3D 모서리 형상에서 2D와 다르게 거동할 가능성 있음, 미검증)
축대칭이 깨지는 구조 (원주 방향으로 WF가 불균일한 경우)
Ioff/Ion-Ioff 비교는 2D-3D 간 첫 저장 전압(First_Vg) 지점이 달라(2D=0.00035V, 3D=0.005V) 직접 비교에 한계 있음 (O03 비고 참고)

참고 (P5 Multi-Metal 관련): P5의 L-H-L 구조는 게이트가 높이(축) 방향으로 3구간(M1/M2/M3) 나뉘지만, 각 구간 내에서는 원주 방향으로 여전히 균일한 WF를 가짐 — 즉 축대칭은 유지됨. 따라서 이번에 확인한 2D-3D 재현성 결과가 P5 쪽에도 참고 가능할 것으로 보이나, 별도 검증은 되지 않았음.
```

