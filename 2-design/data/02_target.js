/* report-design/data/02_target.js — 타겟 사용자 · 업무 문제 */
window.SECTIONS_DATA = window.SECTIONS_DATA || [];
window.SECTIONS_DATA.push(
  { id: 2, type: "single", navTitle: "타겟 · 문제", subPages: [ { blocks: [
    { type: "text", tag: "h3", value: "타겟 사용자" },
    { type: "text", tag: "p", value: "- 노트북 가격 데이터를 다루는 **데이터 분석가**\n- 랜덤포레스트 결과(MDI/Permutation)를 받았으나 해석·보고서화 필요\n- LLM을 분석 조수로 활용하려 함" },
    { type: "text", tag: "h3", value: "업무 문제" },
    { type: "text", tag: "p", value: "- '그냥 물어보기'로는 **불친절한 설명·멋대로 분석**이 나옴\n- 두 중요도 지표의 **순위 차이 해석**이 필요\n- 결과를 **웹 보고서 본문**으로 옮길 형식 통제가 필요" }
  ] } ] }
);
