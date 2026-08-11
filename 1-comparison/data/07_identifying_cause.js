/* =========================================================
   data/07_identifying_cause.js — 섹션 7: 원인 규명
   [사실] 컨텍스트 윈도우 한계 — v2 평가표 근거. [서술] 발표용 불릿.
   ========================================================= */
window.SECTIONS_DATA = window.SECTIONS_DATA || [];
window.SECTIONS_DATA.push(
  { id: 7, type: "single", navTitle: "Identifying the cause", subPages: [ { blocks: [
    { type: "label", value: "공통 원인", color: "gray" },
    { type: "text", tag: "h3", value: "컨텍스트 윈도우의 한계" },
    { type: "text", tag: "p", value: "- 두 실패(페르소나 붕괴·산출물 미출력)의 **공통 원인**\n- 대화가 길어질수록 최초 프롬프트의 제약을 점차 망각\n- 기본 학습 성향으로 회귀 → 특정 모델 결함이 아닌 **구조적 현상**" },
    { type: "text", tag: "h3", value: "대응 전략" },
    { type: "text", tag: "p", value: "- 제약조건을 **대화 후반에 재주입**\n- 또는 처음부터 **출력 형식을 강하게 고정** (→ v3 방향)" }
  ] } ] }
);
