/* =========================================================
   data/06_test_failure.js — 섹션 6: 테스트 실패
   [사실] Gemini 5턴 붕괴, Claude 10턴 미출력 — v2 평가표 근거.
   ========================================================= */
window.SECTIONS_DATA = window.SECTIONS_DATA || [];
window.SECTIONS_DATA.push(
  { id: 6, type: "multi", navTitle: "Test failure", subPages: [

    { title: "페르소나 붕괴", blocks: [
      { type: "label", value: "Gemini 3.1", color: "gray" },
      { type: "text", tag: "h3", value: "5턴에서 페르소나 붕괴" },
      { type: "text", tag: "p", value: "- **4턴부터** 조짐, **5턴에서** 붕괴\n- 초기 제약(챗봇 말투 금지)을 잊고 기본 스타일로 회귀\n- 평가: 형식 4~5점 · 결과 2점" }
    ] },

    { title: "결과물 미출력", blocks: [
      { type: "label", value: "Claude Opus 4.8", color: "gray" },
      { type: "text", tag: "h3", value: "10턴에서 산출물 미출력" },
      { type: "text", tag: "p", value: "- 논리 전개는 유지했으나 **마지막 10턴에서 최종 산출물 미출력**\n- 학습 환경의 출력 한계로 결과 1점" },
      { type: "table",
        headers: ["모델", "실패 지점", "증상"],
        rows: [
          ["Gemini 3.1", "5턴", "페르소나 붕괴 — 제약조건 망각"],
          ["Claude Opus 4.8", "10턴", "최종 산출물 미출력"]
        ] }
    ] }

  ] }
);
