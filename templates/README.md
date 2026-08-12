# 입력 템플릿

LLM 분석을 재현·재사용하기 위한 표준 입력 형식입니다.

## 파일
- `feature_importance.csv` — 변수 중요도 데이터 (rank, metric, feature, score)
- `input_schema.json` — JSON 입력 스키마 (필드 타입·설명 정의)

## 사용법
1. 새 데이터를 `feature_importance.csv` 형식으로 준비
2. 또는 `input_schema.json` 구조에 맞춰 JSON 작성
3. 이 데이터를 v3 프롬프트의 `# Data` 블록에 삽입 → 동일 분석 재현

## 필드 설명
| 필드 | 타입 | 설명 |
|---|---|---|
| rank | int | 중요도 순위 (1이 최상위) |
| metric | string | MDI 또는 Permutation |
| feature | string | 변수명 |
| score | float | 중요도 점수 (0~1) |
