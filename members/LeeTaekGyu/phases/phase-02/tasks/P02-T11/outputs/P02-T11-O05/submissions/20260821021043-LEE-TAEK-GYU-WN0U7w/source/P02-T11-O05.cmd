P02-T11-O05. Phase 3·5 Handoff 요약

1. Single-Metal 3D 기준 구조 요약 (SVisual로 실측 확인됨)

구조: VCAT, Single-Metal 게이트(Gate WF=4.70eV 단일), 축대칭 3D 원통 구조
도핑: Boron 배경(Nbody=1e17), Arsenic Gaussian(NSD=1e20, JDepthSN/BL=20nm, GaussFactor=0.8)
Mesh: MeshScale=1.0(Medium) — Fine 대비 오차 Ion 0.842%, DIBL 1.285% 이내로 프로젝트 DC 허용 기준 통과 확인됨(P02-T09 검증)
SVisual 5단계 검증(Geometry/Region/Contact/Doping/Mesh) 전부 완료 — O01/O02 제출 완료

2. 전기적 성능 베이스라인 (O03 실측 결과)

Vd=0.05V: Vth=0.5070V, SS=60.24mV/dec, Ion=2.852e-06A
Vd=1.00V: Vth=0.5038V, SS=60.05mV/dec, Ion=8.456e-06A
2D 대비 Vth/SS/Ion 전부 0.5% 이내 재현성 확인됨
참고: 여기 쓴 WF=4.70eV는 Multi-Metal L-H-L 구조의 WF_HIGH=4.70eV와 동일값 → Phase 3에서 WF_HIGH 후보 판단 시 이 Single-Metal 결과를 직접 참고 가능

3. 2D-3D 정규화·적용범위 결론

(실측으로 확인됨) Cylindrical 옵션 기반 2D 전류는 별도 정규화 없이 3D 총 전류와 직접 비교 가능함 — O03 데이터로 확인
(추론, 별도 검증 필요) 이 재현성은 축대칭(원주방향 WF 균일) 구조에서 확인된 것 — Multi-Metal L-H-L도 원주방향은 균일(높이 방향으로만 M1/M2/M3 분할)하므로 적용 가능성은 높으나, 이 구조 자체에 대한 검증은 아직 안 됨

4. 한계 및 주의사항

GIDL/역방향 바이어스 영역은 아직 3D 검증 안 됨 (Band2Band NonlocalPath 물리가 3D 모서리에서 다르게 거동할 가능성)
Ioff 비교 시 First_Vg 지점 차이 주의 (2D=0.00035V, 3D=0.005V로 상이)
3D 시뮬레이션 소요시간: Fast 전략 적용에도 불구하고 조건 하나당 수십 시간 단위 소요 가능 — 실측 사례로 P5 Multi-Metal Forward Fast, VdBias=0.05V 조건 1건에 약 33시간 소요됨. Phase 3·5에서 3D 추가 시뮬레이션(특히 GIDL) 계획 시 이 시간 예산을 반드시 고려할 것
