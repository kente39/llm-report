# LLM 모델 비교 · 선정 프로젝트

2024년 노트북 가격에 영향을 끼치는 요소 분석을 과업으로, 3종 이상의 LLM을 비교하고
프롬프트를 v1 → v2 → v3 으로 개선한 기록입니다.

제출물은 각 폴더의 `README.md` 이며, 같은 내용을 웹으로 볼 수 있는 `index.html` 이 함께 있습니다.

---

## 제출물

| # | 문서 | 마크다운 (제출본) | 웹 (참고용) |
|---|------|------------------|------------|
| 1 | LLM 모델 비교 · 선정 보고서 | [1-comparison/README.md](1-comparison/README.md) | [열기](1-comparison/index.html) |
| 2 | 시스템 설계 문서 | [2-design/README.md](2-design/README.md) | [열기](2-design/index.html) |
| 3 | 실행 로그 | [3-log/README.md](3-log/README.md) | [열기](3-log/index.html) |

> 참고: [raw-viewer](raw-viewer/index.html) 는 v1/v2/v3 원문과 전체 세션을 대화 형태로 보는 뷰어입니다. (제출물 아님)

---

## 폴더 구조

```
repo/
├── README.md              ← 지금 이 파일 (마스터 인덱스)
├── shared/                ← 3개 보고서 공용 자산
│   ├── css/base.css
│   ├── css/nav.css
│   ├── js/nav.js
│   └── js/main.js
├── 1-comparison/
│   ├── README.md          ← 제출본
│   ├── index.html         ← 웹 뷰어
│   └── data/              ← 원본 데이터 (md·html 양쪽의 출처)
├── 2-design/
└── 3-log/
```

`data/` 가 단일 원본입니다. `README.md` 와 웹 화면은 모두 여기서 파생됩니다.

---

## 웹 조작법

| 입력 | 동작 |
|------|------|
| ← → | 섹션 이동 |
| ↑ ↓ | 서브페이지 이동 |
| 화면 가장자리 클릭 | 같은 동작 |
| 스와이프 | 같은 동작 (모바일) |
| HOME | 현재 섹션의 첫 서브페이지로 |

주소창의 `#9-1` 은 9번 섹션 1번 서브페이지를 뜻하며, 그대로 공유·북마크할 수 있습니다.

---

## 원본 자료 규칙

| 종류 | 형식 | 위치 | 명명 |
|------|------|------|------|
| 대화 원문 | `.txt` (UTF-8) | `report-*/assets/raw/` | `gpt54-v2.txt` |
| 스크린샷 | `.png` | `report-*/assets/images/` | `s09-1-mdi-rank.png` |
| 차트 | `.png` (라벨 영문) | `report-*/assets/images/` | `s04-1-axis.png` |
| 표 | 마크다운 표 그대로 | 대화 안에 포함 | — |

- 이미지 경로는 `assets/images/...` 상대경로로 쓴다. `README.md` 와 `index.html` 이 같은 폴더에 있어 양쪽에서 동일하게 해석된다.
- `s09-1-` 접두사는 9번 섹션 1번 서브페이지를 뜻한다. 웹 해시 `#9-1` 과 표기가 일치한다.
- 차트 라벨은 영문으로 작성한다 (실행 환경에 한글 폰트 없음).

---

**현재 상태: STEP 1 (구조 + 네비게이션)** — 각 페이지에는 `9-1` 형태의 위치 라벨만 있고
본문은 비어 있습니다. 내용은 STEP 2에서 채웁니다.
