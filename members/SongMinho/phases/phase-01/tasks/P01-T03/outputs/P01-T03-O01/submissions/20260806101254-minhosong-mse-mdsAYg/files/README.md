# P01-T03-O01 cutline 문서 보완본

현재 GitHub에 이미 올라간 cutline 이미지와 좌표·bias CSV는 다시 포함하지 않는다. 본 문서는 기존 제출 자료의 의미와 적용 기준만 보완한다.

## 공통 cutline

- C1 lateral: `(X,Y)=(0.0003,-0.112) → (0.0003,+0.112) µm`
- C2 vertical: `(X,Y)=(-0.0744944,0) → (0.4,0) µm`
- C1은 Si/절연막 계면의 Silicon 쪽 비교선으로 사용했다.
- 네 case와 대표 bias에 동일 좌표를 적용했다.

## case 및 bias 매핑

- `n2=LL`, `n19=LH`, `n15=HL`, `n21=HH`
- High Vd = 0.7 V
- `0000=Vg 0 V`, `0003=Vg 1.0 V`, `0005=Vg 2.5 V`

한두 mesh node의 spike만으로 물리적 효과를 주장하지 않으며, 정확한 정량 비교는 동일 C1 cutline을 우선한다. 기존 파일명에 과거 Task ID가 남아 있더라도 최신 Issue #1 기준 본 산출물은 `P01-T03-O01`이다.
