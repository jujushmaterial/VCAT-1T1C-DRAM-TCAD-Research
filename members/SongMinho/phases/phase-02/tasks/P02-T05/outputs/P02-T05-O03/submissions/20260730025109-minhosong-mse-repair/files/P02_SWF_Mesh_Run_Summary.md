# P02 Single-WF VCAT — SDE / Mesh Run Summary

## 실행 환경

- Tool: Sentaurus Mesh
- Version: T-2022.03
- Host: `ssudisu1`
- Date: 2026-07-29

## 실행 결과

Sentaurus Mesh가 오류 없이 완료되었고 `n1_msh.tdr`가 생성되었다.

| 항목 | 결과 |
|---|---:|
| Final points | 881 |
| Final elements | 1616 |
| Regions reported by Sentaurus Mesh | 7 |
| Materials in mesh quality report | 4 |
| Maximum connectivity | 7 |
| Minimum angle | 1.71836 deg |
| Maximum angle | 90 deg |
| Minimum edge length | 7.8125e-05 um |
| Minimum edge length | 0.078125 nm |
| Minimum volume | 3.66211e-09 um^3 |
| Maximum volume | 1.36719e-06 um^3 |
| Non-Delaunay elements | 0 |

## 주요 위치

- Minimum edge near `(x, y) = (0.0199609, 0.006) um`
- Minimum-angle element near `(x, y) = (0.071875, 0.006) um`
- Maximum connectivity near `(x, y) = (0.0140625, 0.000875) um`

## 해석

- 최소 edge는 SN/channel 접합과 Si/SiO2 계면에 가까운 위치에서 형성되어 의도한 국부 refinement가 적용된 것으로 판단한다.
- 접합부와 Si/SiO2 계면에서 삼각형 mesh가 조밀해지는 것을 SVisual 이미지로 확인했다.
- `minAngle = 1.71836 deg`인 가느다란 요소가 일부 존재한다. 현재 SDE와 mesh 생성은 성공했지만, 이후 SDevice 수렴 또는 mesh independence 문제가 나타나면 해당 계면 요소를 우선 점검한다.
- 본 결과는 `MeshScale = 1.0`의 nominal/medium mesh이며, coarse/fine 비교는 P02-T09에서 수행한다.

## 미완료 항목

- Donor/acceptor X-cut 기반 metallurgical junction 위치 정량 측정
- Coarse / medium / fine mesh independence
- SDevice DC 특성 검증
