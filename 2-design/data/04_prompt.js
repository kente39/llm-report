/* report-design/data/04_prompt.js — 시스템/유저 프롬프트 */
window.SECTIONS_DATA = window.SECTIONS_DATA || [];
window.SECTIONS_DATA.push(
  { id: 4, type: "multi", navTitle: "프롬프트", subPages: [

    { title: "시스템 프롬프트", blocks: [
      { type: "label", value: "System", color: "green" },
      { type: "text", tag: "p", value: "- 너는 **10년 차 데이터 사이언티스트**다\n- 결과는 반드시 **마크다운 표와 코드 블록**으로 제시한다\n- 존재하지 않는 기법을 요구받으면 **정정하고 대안을 제시**한다\n- 문제를 바로 풀지 말고 **단계적으로 추론**한다 (데이터 파악 → 가설 → 코드)" }
    ] },

    { title: "유저 프롬프트", blocks: [
      { type: "label", value: "User", color: "gray" },
      { type: "text", tag: "p", value: "- 첨부한 데이터 메타정보(컬럼명·요약 통계)를 보고\n- 2024 노트북 가격의 **MDI/Permutation 중요도 순위 변화**를 해석하고\n- 웹 보고서 본문에 들어갈 글을 작성해줘" }
    ] }

  ] }
);
