# 중앙 High-WF 영역의 폭 및 위치를 이용한 보조 해석

## 1. 왜 이 값을 추가로 보는가

Phase 3 보고서에서는 gate를 축 방향으로 Low-High-Low의 세 영역(M1/M2/M3)으로 나누고, 중앙 M2에 High-WF를 배치한다.

이 구조에서 `Xbnd1`, `Xbnd2`는 실제 TCAD 입력으로 사용하기에 명확하지만, 두 Boundary가 동시에 변했을 때 물리적으로 무엇이 달라졌는지는 직관적으로 읽기 어려울 수 있다.

따라서 동일한 Xbnd1/Xbnd2 결과를 다음 두 관점으로 다시 표현해 볼 수 있다.

### 중앙 High-WF 영역의 폭

`High-WF width = Xbnd2 - Xbnd1`

이는 M2 segment length와 동일하다.

### 중앙 High-WF 영역 중심의 위치

`High-WF center shift = (Xbnd1 + Xbnd2)/2 - 50`

현재 gate 중심은 50 nm이므로, 이 값은 중앙 High-WF 영역의 중심이 전체 gate 중심에서 얼마나 이동했는지를 나타낸다.

내부 분석 과정에서는 각각 `H-width`, `H-shift`라는 약칭을 사용했으나, 조원 공유 및 보고서에서는 가능하면 **중앙 High-WF 영역의 폭**, **중앙 High-WF 영역 중심 이동량**으로 표현하는 것을 권장한다.

---

## 2. 새로운 독립변수는 아니다

이 두 값은 Xbnd1/Xbnd2에서 직접 계산되는 파생값이다.

반대로 중앙 High-WF 영역의 폭과 중심 위치를 알면 Xbnd1/Xbnd2도 다시 계산할 수 있으므로, 두 표현은 동일한 2-자유도 geometry를 다른 좌표로 나타낸 것이다.

따라서 다음과 같이 구분한다.

- **TCAD 입력 / P8 Window 변수**: Xbnd1, Xbnd2
- **파생 segment 값**: M1/M2/M3 length
- **보조 물리 해석값**: 중앙 High-WF 영역의 폭, 중앙 High-WF 영역 중심 위치

이 보조값을 Xbnd1/Xbnd2와 별개의 제3·제4 변수로 추가해서는 안 된다.

---

## 3. 물리적으로 어떤 해석을 돕는가

두 Metal Boundary가 변할 때 전기적 특성 변화는 크게 다음 두 변화형태가 섞여 나타날 수 있다.

1. **중앙 High-WF 영역 자체가 넓어지거나 좁아지는 변화**
2. **중앙 High-WF 영역의 폭은 비슷하지만 전체 위치가 한쪽으로 이동하는 변화**

Phase 1 및 Phase 3 초안에서는 Work Function의 공간적인 순서와 배치가 channel barrier, electric field, Ioff, DIBL, GIDL 등의 특성에 영향을 줄 수 있다는 방향으로 해석하고 있다.

또한 triple-material gate 문헌에서는 각 metal 영역의 length 또는 gate-length ratio에 따라 threshold voltage와 short-channel 특성이 변할 수 있음을 분석한다.

따라서 중앙 High-WF 영역의 폭과 위치를 추가로 표시하면, "Metal Boundary가 몇 nm 변했다"는 구현 관점에서 한 단계 더 나아가 **중앙 High-WF 영역의 크기와 공간 배치가 어떻게 변했는지**를 설명하기 쉽다.

---

## 4. 선행연구와의 관계에서 주의할 점

### Triple-material gate 연구

Dhanaselvam & Balamurugan의 TMSG 연구는 M1/M2/M3의 gate-length ratio, oxide thickness, silicon thickness, doping concentration에 따른 threshold voltage 변화를 분석한다.

이는 **segment length를 물리적으로 해석할 수 있다는 근거**로 사용할 수 있다.

### Gate misalignment 연구

Sharma et al.은 Dual-Material Double-Gate MOSFET에서 gate misalignment가 surface potential, electric field, threshold voltage, subthreshold slope, DIBL, drain current 등에 영향을 주는 것을 분석했다.

다만 이 논문의 gate misalignment는 우리 L-H-L VCAT에서 중앙 High-WF 영역이 축 방향으로 이동하는 현상과 동일한 공정오차가 아니다.

따라서 이 논문은 **"위치 변화도 device 특성에 영향을 줄 수 있다"는 방법론 참고**로만 사용하고, 중앙 High-WF 영역 중심 이동의 직접 선행연구라고 표현하지 않는다.

---

## 5. P7에서의 사용 범위

현재 P7의 공식 sensitivity 수치는 verified P5 Boundary Sweep data를 기준으로 해석하는 것이 안전하다.

특히 `Xbnd2=69 nm` 조건은 현재 P7 handoff에서 P8의 새 전기계산 영역으로 취급되고 있으므로, 중앙 High-WF 영역 폭/위치 해석을 위해 P7의 공식 전기적 근거로 임의 추가하지 않는다.

따라서 이 보조 해석은 다음 목적으로만 사용한다.

- P7 결과의 직관적 설명
- P8 2D Window를 보고서에서 이해하기 쉽게 재표현
- Xbnd1/Xbnd2의 결합 변화가 중앙 High-WF 영역의 폭/위치에 어떤 변화를 만드는지 설명

P8 변수 자체를 변경하거나 새로운 자유도를 추가하는 근거로 사용하지 않는다.
