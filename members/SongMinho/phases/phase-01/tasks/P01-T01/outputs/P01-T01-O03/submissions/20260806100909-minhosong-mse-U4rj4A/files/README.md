# P01-T01-O01 설정 보완본

현재 GitHub 제출본의 공통 `SDevice.cmd`를 다시 올리지 않고, 그 파일만으로 확인하기 어려운 실제 LL·LH·HL·HH 치환 조건과 파라미터를 보완한다.

## 포함 파일

- `P01-T01-O01_WF_bias_node_matrix.csv`: case·node·WF·bias·입력 TDR 매핑
- `source/P01-T01-O01_*_generated_sdevice.cmd`: 네 조건의 실제 치환 CMD
- `source/P01-T01-O01_sdevice.par`: Oxide/HfO2 barrier-tunneling 파라미터

## 공통 조건

- Input structure: `n1_fps.tdr`
- Low Vd: 0.08 V
- High Vd: 0.7 V
- gateS/gateD sweep: 0 → 2.5 V
- LL: n2, 4.2/4.2 eV
- LH: n19, 4.2/4.8 eV
- HL: n15, 4.8/4.2 eV
- HH: n21, 4.8/4.8 eV

네 generated CMD는 Physics, Math, Solve, bias 및 profile 저장 설정이 같고, 의도한 WF와 노드별 파일명만 다르다. TCAD를 재실행하지 않고 사용자 제공 파일을 정리했다.
