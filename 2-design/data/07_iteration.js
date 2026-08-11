/* report-design/data/07_iteration.js — v1→v2→v3 개선 이력 */
window.SECTIONS_DATA = window.SECTIONS_DATA || [];
window.SECTIONS_DATA.push(
  { id: 7, type: "multi", navTitle: "개선 이력", subPages: [

    { title: "v1 → v2 → v3", blocks: [
      { type: "text", tag: "h3", value: "프롬프트 버전 개선" },
      { type: "table",
        headers: ["버전", "추가한 것", "해결한 문제"],
        rows: [
          ["v1", "기본 지시만", "코드는 나오나 설명 불친절·멋대로 분석"],
          ["v2", "페르소나 + 출력 규격 + Few-shot", "형식이 깔끔해지고 전문가 어투 (논리력은 아직 아쉬움)"],
          [{ t: "v3", mark: "good" }, "단계적 추론 + 환각 방지", "논리 완성 + 거짓말 안 하는 분석 조수"]
        ] }
    ] },

    { title: "핵심 교훈", blocks: [
      { type: "label", value: "Lesson", color: "blue" },
      { type: "text", tag: "p", value: "- **v1→v2**: 페르소나·형식을 넣자 출력 품질이 급상승\n- **v2→v3**: 단계적 추론을 넣자 논리 구멍이 메워짐\n- 같은 채팅방에서 v1→v2를 이어 입력하면 **문맥 오염** — 새 창에서 검증 필요" }
    ] }

  ] }
);
