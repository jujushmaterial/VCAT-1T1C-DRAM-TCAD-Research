# 공용 기준 자료

이 폴더에는 검토가 끝난 코드, 조건표, 그래프, 결과 요약만 보관합니다.

## 권장 구조

- `parameters/`: 공통 구조·전압·물리 모델 조건
- `tcad/planar/`: 승인된 Planar 코드
- `tcad/vcat_sde/`: 승인된 SDE VCAT 코드
- `tcad/vcat_sprocess/`: 승인된 SProcess 코드
- `tcad/sdevice/`: 승인된 SDevice 코드
- `tcad/svisual/`: 결과 추출 스크립트
- `tcad/mixed_mode_1t1c/`: 승인된 1T1C Mixed-Mode 코드
- `approved_results/`: 공식 그래프, CSV, 결과 요약

## 반영 기준

- 코드가 재실행 가능하다.
- 사용 조건이 기록돼 있다.
- 결과 파일 위치가 기록돼 있다.
- 그래프와 수치가 코드 결과와 일치한다.
- 결과 해석과 한계가 작성돼 있다.
- 검토자가 확인했다.

개인 작업 중인 파일이나 임시 수정본은 이 폴더에 넣지 않습니다.
