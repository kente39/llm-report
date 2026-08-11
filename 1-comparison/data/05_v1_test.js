/* =========================================================
   data/05_v1_test.js — 섹션 5: v1 테스트 결과 요약
   [사실] 점수·성향은 v1 평가표 근거. 상세는 섹션 9 참조.
   ========================================================= */
window.SECTIONS_DATA = window.SECTIONS_DATA || [];
window.SECTIONS_DATA.push(
  { id: 5, type: "single", navTitle: "v1 test", subPages: [ { blocks: [
    { type: "text", tag: "p", value: "동일 프롬프트에 대한 세 모델의 v1 응답 성향이 뚜렷이 갈렸습니다. 상세 대화는 **섹션 9(new v1)** 참조." },
    { type: "table",
      headers: ["모델", "성향", "형식", "과정", "결과"],
      rows: [
        ["GPT-5.4", "보고서 문체 줄글", "3", "4", "3"],
        ["Gemini 3.1", "학습 튜터 관점 설명", "2", "3~4", "4"],
        [{ t: "Claude Opus 4.8", mark: "good" }, "순위표+인사이트 도출", { t: "3~4", mark: "good" }, { t: "4~5", mark: "good" }, "4"]
      ] },
    { type: "text", tag: "p", value: "v1 단계에서는 Claude가 순위 변화 표를 근거로 해석·결론까지 매끄럽게 이어 가장 높은 평가를 받았습니다. 다만 세 모델 모두 **형식 제약이 없어 출력 구조가 제각각**이라는 공통 한계를 보였습니다." }
  ] } ] }
);
