/* 2-design/data/02_target.js — 타겟 · 문제 + 입출력 명세
   평가 #1(입력/출력/목표 통합 명세)·#2(재사용 입력 템플릿) 대응. */
window.SECTIONS_DATA = window.SECTIONS_DATA || [];
window.SECTIONS_DATA.push(
  { id: 2, type: "multi", navTitle: "타겟 · 명세", subPages: [

    /* 2-1 : 타겟·문제 (기존) */
    { title: "타겟 · 문제", blocks: [
      { type: "text", tag: "h3", value: "타겟 사용자" },
      { type: "text", tag: "p", value: "- 노트북 가격 데이터를 다루는 **데이터 분석가**\n- 랜덤포레스트 결과(MDI/Permutation)를 받았으나 해석·보고서화 필요\n- LLM을 분석 조수로 활용하려 함" },
      { type: "text", tag: "h3", value: "업무 문제" },
      { type: "text", tag: "p", value: "- '그냥 물어보기'로는 **불친절한 설명·멋대로 분석**이 나옴\n- 두 중요도 지표의 **순위 차이 해석**이 필요\n- 결과를 **웹 보고서 본문**으로 옮길 형식 통제가 필요" }
    ] },

    /* 2-2 : 입력/출력/목표 명세 + 스키마 (신규) */
    { title: "입출력 명세", blocks: [
      { type: "label", value: "명세", color: "blue" },
      { type: "text", tag: "h3", value: "입력 · 출력 · 목표" },
      { type: "text", tag: "p", value: "- **입력**: 랜덤포레스트 변수 중요도 표(MDI·Permutation 순위/점수) + 데이터 메타정보(컬럼명·타입)\n- **출력**: 마크다운 웹 보고서 본문 (MDI vs Permutation 해석 → 변수 분석 → 구매 전략)\n- **목표**: 두 중요도 지표의 순위 차이를 해석하고, 실전 구매 전략까지 도출" },
      { type: "text", tag: "h4", value: "재사용 입력 템플릿 (스키마)" },
      { type: "text", tag: "p", value: "동일 분석을 재현할 수 있도록, 입력을 표준 스키마로 정의합니다. (저장소 `templates/` 참고)" },
      { type: "table",
        headers: ["필드", "타입", "설명", "예시"],
        rows: [
          ["rank", "int", "중요도 순위", "1"],
          ["metric", "string", "지표 종류 (MDI / Permutation)", "MDI"],
          ["feature", "string", "변수명", "Processor"],
          ["score", "float", "중요도 점수", "0.244654"]
        ] },
      { type: "text", tag: "h4", value: "입력 예시 (JSON)" },
      { type: "code", value: "{\n  \"metric\": \"MDI\",\n  \"ranking\": [\n    { \"rank\": 1, \"feature\": \"Processor\", \"score\": 0.244654 },\n    { \"rank\": 2, \"feature\": \"GPU\",       \"score\": 0.136253 },\n    { \"rank\": 3, \"feature\": \"RAM\",       \"score\": 0.127873 }\n  ]\n}" },
      { type: "text", tag: "h4", value: "출력 샘플 (기대)" },
      { type: "text", tag: "p", value: "```\n## 1. MDI vs Permutation\n- Processor가 두 지표 모두 1위 → CPU가 최우선 가격 변수임\n- GPU는 MDI 2위이나 Permutation 4위 → MDI가 과대평가\n...\n```" }
    ] }

  ] }
);
