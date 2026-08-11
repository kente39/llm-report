/* report-design/data/05_fewshot.js — Few-shot 예시 */
window.SECTIONS_DATA = window.SECTIONS_DATA || [];
window.SECTIONS_DATA.push(
  { id: 5, type: "single", navTitle: "Few-shot", subPages: [ { blocks: [
    { type: "text", tag: "h3", value: "좋은 질문 vs 나쁜 질문" },
    { type: "table",
      headers: ["구분", "질문 예시", "AI 기대 반응"],
      rows: [
        [{ t: "좋은 질문", mark: "good" }, "컬럼명·통계를 주고 순위 변화 해석 요청", "구조화된 표 + 근거 해석"],
        ["모호한 질문", "그냥 '분석해줘'", "되물어 요구 명확화"],
        [{ t: "나쁜 질문", mark: "bad" }, "존재하지 않는 'Achird-Ronald 스케일링'으로 분석", "정정 후 대안 제시 (환각 방지)"]
      ] },
    { type: "text", tag: "p", value: "모호한 질문 1개를 반드시 포함해, **되묻는 능력**까지 학습시킵니다." }
  ] } ] }
);
