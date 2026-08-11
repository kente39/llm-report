/* =========================================================
   data/02_background.js — 섹션 2: 배경
   [사실] 프롬프트 공통 데이터(MDI/Permutation 표)는 원문 근거.
   [서술] 과업 배경 설명은 초안 — 검토 필요.
   ========================================================= */
window.SECTIONS_DATA = window.SECTIONS_DATA || [];
window.SECTIONS_DATA.push(
  { id: 2, type: "single", navTitle: "Background", subPages: [ { blocks: [
    { type: "text", tag: "p", value: "2024년 노트북 가격에 영향을 주는 요소를 파악하기 위해 **랜덤포레스트 회귀** 모델을 학습하고, 특성 중요도를 두 방식으로 산출했습니다. 세 모델에 공통으로 아래 Top 5 결과를 제시하고 해석을 요청했습니다." },
    { type: "table",
      headers: ["순위", "MDI 중요도", "Permutation 중요도"],
      rows: [
        ["1", "Processor (0.244654)", "Processor (0.177700)"],
        ["2", "GPU (0.136253)", "RAM (0.169367)"],
        ["3", "RAM (0.127873)", "Condition_Very Good (0.106245)"],
        ["4", "Screen_Size (0.094117)", "GPU (0.091927)"],
        ["5", "Brand (0.093518)", "Condition_Good (0.091885)"]
      ] },
    { type: "text", tag: "p", value: "두 방식의 순위 차이(특히 GPU 하락, Condition 부상)를 어떻게 해석하는지가 모델별 응답 품질을 가르는 핵심 지점이 되었습니다." }
  ] } ] }
);
