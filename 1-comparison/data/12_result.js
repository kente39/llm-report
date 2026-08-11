/* =========================================================
   data/12_result.js — 섹션 12: 종합 결론
   [사실] v2 점수는 평가표 근거. v3 환각 검증은 실측(3-log 참조).
   ========================================================= */
window.SECTIONS_DATA = window.SECTIONS_DATA || [];
window.SECTIONS_DATA.push(
  { id: 12, type: "multi", navTitle: "Result", subPages: [

    /* 12-1 : v2 종합 선정 (기존) */
    { title: "v2 종합 선정", blocks: [
      { type: "text", tag: "p", value: "스트레스 테스트(v2) 5축 평가 결과, **GPT-5.4가 종합 최고점**을 기록했습니다. 특히 'AI PC' 함정을 회피한 안전성이 결정적이었습니다." },
      { type: "table",
        headers: ["평가축", "GPT-5.4", "Gemini 3.1", "Claude Opus 4.8"],
        rows: [
          ["형식",   { t: "10", mark: "good" }, "4~5", "6"],
          ["기술",   { t: "7", mark: "good" }, { t: "3", mark: "bad" }, "6"],
          ["안전성", { t: "9", mark: "good" }, "4", "5"],
          ["과정",   { t: "8", mark: "good" }, "7", "7"],
          ["결과",   { t: "8", mark: "good" }, "2", { t: "1", mark: "bad" }]
        ] },
      { type: "text", tag: "h3", value: "핵심 결론" },
      { type: "text", tag: "p", value: "- **GPT-5.4**: 긴 대화에서도 페르소나·제약을 유지하고 함정을 회피 → 선정.\n- **Gemini 3.1**: 5턴 페르소나 붕괴, 온디바이스 AI 환각으로 안전성 취약.\n- **Claude Opus 4.8**: 논리는 견고하나 최종 산출물 미출력, 함정에 부분적으로 노출." }
    ] },

    /* 12-2 : v3 환각 검증이 선정을 재확인 (신규) */
    { title: "v3 환각 검증", blocks: [
      { type: "label", value: "선정 재확인", color: "green" },
      { type: "text", tag: "h3", value: "v3에서 다시 검증한 결과" },
      { type: "text", tag: "p", value: "v2 선정 후, v3(환각 방지 규칙 포함)에 **5개 환각 문항**을 던져 세 모델을 재검증했습니다. (상세: 실행 로그 4·7장)" },
      { type: "table",
        headers: ["모델", "환각 방지", "페르소나 안정성"],
        rows: [
          ["GPT-5.4", "5문항 방어", { t: "안정 (순서·어투 무관)", mark: "good" }],
          ["Gemini 3.1", "방어함", { t: "항상 붕괴", mark: "bad" }],
          ["Claude 4.8", { t: "최고 (어원·개념까지)", mark: "good" }, { t: "불안정 (3회 중 1승)", mark: "bad" }]
        ] },
      { type: "text", tag: "p", value: "- **환각 단일 능력은 Claude가 최고** — 없는 기법의 어원까지 짚고 환각 개념을 경고\n- 그러나 **Claude는 페르소나가 확률적으로 불안정** — md 형식 작업이 어텐션을 소모 (3회 반복으로 확인)\n- **GPT는 순서·어투를 바꿔도 견고** — 실무 안정성이 재확인됨" },
      { type: "text", tag: "p", value: "**결론**: '환각 방지'라는 단일 지표가 아니라, **형식·페르소나·안전을 동시에 요구하는 실무**에서 GPT-5.4가 가장 안정적입니다. v2 선정이 v3 검증으로 뒷받침되었습니다." }
    ] }

  ] }
);
