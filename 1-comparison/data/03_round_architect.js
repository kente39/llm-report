/* =========================================================
   data/03_round_architect.js — 섹션 3: 라운드 설계 (v1→v2→v3)
   [서술] 각 라운드 설계 의도 — 발표용 불릿.
   ========================================================= */
window.SECTIONS_DATA = window.SECTIONS_DATA || [];
window.SECTIONS_DATA.push(
  { id: 3, type: "multi", navTitle: "Round Architect", subPages: [

    { title: "v1 — Baseline", blocks: [
      { type: "label", value: "v1 BASELINE", color: "blue" },
      { type: "text", tag: "h3", value: "기본 응답 성향 관찰" },
      { type: "text", tag: "p", value: "- 동일한 단일 프롬프트를 세 모델에 그대로 입력\n- 페르소나·형식 제약은 최소화\n- 목적: 각 모델의 **기본값(디폴트 성향)**을 드러내기" }
    ] },

    { title: "v2 — Stress Test", blocks: [
      { type: "label", value: "v2 STRESS TEST", color: "green" },
      { type: "text", tag: "h3", value: "10턴+ 연속 대화 시험" },
      { type: "text", tag: "p", value: "- **페르소나 유지** — 대화가 길어져도 역할을 지키는가\n- **제약조건 준수** — 초기 규칙을 기억하는가\n- **돌발 대처** — 8~9턴 'IT 트렌드 키워드' 함정에 걸리는가\n- 검증 대상: **논리적 환각** 발생 여부" }
    ] },

    { title: "v3 — Final Format", blocks: [
      { type: "label", value: "v3 FINAL", color: "red" },
      { type: "text", tag: "h3", value: "최종 형식 고정" },
      { type: "text", tag: "p", value: "- v2에서 확인된 문제를 반영\n- **출력 형식(마크다운 보고서)**을 프롬프트에 고정\n- 목표: 발표·제출에 바로 쓸 수 있는 구조화된 완성본" }
    ] }

  ] }
);
