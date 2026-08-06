# Mesh Baseline Policy

## 원칙
- 기존 P02-T09 Uniform Mesh 결과를 재사용한다.
- 기존 조건을 다시 계산하지 않는다.
- A 영역은 interface·junction·GIDL·최대 전계, B는 channel, C는 외곽, E는 구조별 예외로 구분한다.
- Local Mesh 후보 1개부터 확인하고 필요할 때만 Reference-Local 1개를 추가한다.
- 후보 순위와 연구 결론이 유지되면 더 세밀하게 만들지 않는다.
- Multi-WF에서는 WF boundary만, 3D에서는 circumference·contact·corner만 필요 범위에서 추가한다.

## 변경 기록
변경 이유, 영역, 전후 Mesh, 신규 계산 수, 성능 차이, 후보 순위 영향과 후속 범위를 기록한다.
기존 Task와 기존 제출물은 수정하지 않는다.
 
## 적용 순서

1. 기존 `P02-T09`의 Uniform MeshScale 0.5·1·2 자료를 먼저 읽습니다.
2. 기존 결과에서 계면·접합·GIDL·최대 전계 영역을 A, 채널을 B, 외곽을 C, 구조별 경계를 E로 분류합니다.
3. Local Mesh 후보 1개를 기존 Medium 또는 Fine 결과와 대표 조건에서 비교합니다.
4. 결론이 불분명하거나 후보 순위에 영향을 줄 때만 Reference-Local 1개를 추가합니다.
5. 결론이 유지되면 추가 세분화를 중단하고 후속 Phase용 규칙을 기록합니다.

## 기존 결과 보존

- 기존 Task·Output ID와 제출물은 변경하지 않습니다.
- 기존 0.5·1·2 계산을 다시 실행하지 않습니다.
- 신규 결과가 다르더라도 기존 파일을 교체하지 않고 신규 Task 산출물에 영향 범위만 남깁니다.
