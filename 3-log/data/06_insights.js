/* =========================================================
   3-log/data/06_insights.js — 기술적 통찰
   과제 중 품었던 의문점들을 원인·결과·이유로 상세화.
   시계열(Vanishing Gradient)은 간단히 유지.
   ========================================================= */
window.SECTIONS_DATA = window.SECTIONS_DATA || [];
window.SECTIONS_DATA.push(
  { id: 6, type: "multi", navTitle: "기술적 통찰", subPages: [

    /* ---- 6-1 : 아키텍처 — Vanishing Gradient (간단 유지) ---- */
    { title: "LLM 아키텍처·한계", blocks: [
      { type: "label", value: "Architecture", color: "blue" },
      { type: "image", src: "assets/images/vanishing-gradient.svg",
        caption: "반복 곱셈(×0.5)으로 먼 과거의 기울기가 0에 가까워지는 모습", zoomable: true },
      { type: "chat", full: true,
        messages: [
          { role: "user", body: "시계열 분석의 Vanishing Gradient와 LLM의 Context Loss는 어떤 유사성과 차이가 있어?" },
          { role: "ai", model: "정리", body: "**RNN과 Vanishing Gradient (간단히)**\n\nRNN은 문장을 앞에서부터 **한 단어씩 순차로** 처리하며 정보를 뒤로 넘깁니다. 학습할 때 오차를 거꾸로 되돌리는데, 이 과정에서 **작은 값(<1)이 반복해서 곱해집니다.** 곱이 거듭될수록 0에 가까워져, **먼 과거의 기울기가 최근 것에 묻혀** 사라집니다 — 이것이 Vanishing Gradient이자 '오래된 기억의 소실'입니다.\n\n**Context Loss와의 연결**\n\nLLM(Transformer)은 순차 계산이 아니라 전체를 한 번에 보므로 이 문제는 없습니다. 그런데도 대화가 길어지면 초기 지시를 잊는데, 원인이 다릅니다.\n\n- **RNN**: 반복 곱셈으로 과거 기울기가 묻힘 (구조적)\n- **LLM**: 컨텍스트 윈도우 초과 + Attention이 최근 토큰에 쏠려 초기 지시가 희석 (용량·주의)\n\n**유사성**은 '멀리 있는 정보일수록 영향이 준다'는 현상, **차이**는 그 원인입니다." }
        ] }
    ] },

    /* ---- 6-2 : 마크다운이 인지에 유리한 이유 (상세) ---- */
    { title: "왜 마크다운인가", blocks: [
      { type: "label", value: "의문 1", color: "green" },
      { type: "text", tag: "h3", value: "왜 마크다운으로 넣으면 더 잘 알아듣는가" },
      { type: "text", tag: "h4", value: "원인 — 구조를 함께 학습했기 때문" },
      { type: "text", tag: "p", value: "- LLM은 인터넷의 방대한 문서를 학습했고, 그 문서 대부분이 마크다운·HTML 등 **구조화된 형식**임\n- 그래서 `#`, `-`, `|` 같은 기호를 단순 문자가 아니라 **'제목/목록/표'를 뜻하는 의미론적 태그**로 인식함" },
      { type: "text", tag: "h4", value: "결과 — 역할 분리가 명확해짐" },
      { type: "text", tag: "p", value: "- `# Role`, `# Data`, `# Constraints`로 나누면, 모델이 각 블록의 **역할을 헷갈리지 않고** 처리\n- 실제로 v3에서 이 구조를 쓴 뒤 출력 형식 준수율이 크게 올라감\n- 반대로 줄글로 뭉뚱그리면 지시·데이터·제약이 섞여 누락·오해가 늘어남" },
      { type: "text", tag: "h4", value: "이유 — 확률 분포를 좁힌다" },
      { type: "text", tag: "p", value: "구조가 명확하면 모델이 '다음에 올 내용'의 확률 분포를 더 좁게 예측함. 즉 마크다운은 모델의 **불확실성을 줄여** 안정적 출력을 유도하는 장치임." }
    ] },

    /* ---- 6-3 : 어투가 응답에 미치는 영향 (상세) ---- */
    { title: "어투의 영향", blocks: [
      { type: "label", value: "의문 2", color: "green" },
      { type: "text", tag: "h3", value: "질문 어투가 응답 품질을 바꾸는가" },
      { type: "text", tag: "h4", value: "원인 — 어투가 학습 분포를 지목한다" },
      { type: "text", tag: "p", value: "- LLM은 '이런 어투 다음엔 이런 답이 온다'는 패턴을 통째로 학습함\n- **정중·전문적 어투**('전문가로서 분석하라')는 학습 데이터 중 **고품질·전문 응답이 많은 영역**을 지목\n- **성의 없는 어투**는 그에 상응하는 가벼운 응답 분포로 향함" },
      { type: "text", tag: "h4", value: "결과 — 같은 질문도 답이 달라짐" },
      { type: "text", tag: "p", value: "- v3에서 '~하라' 체로 역할을 강하게 규정하자 전문가다운 어조가 유지됨\n- 다만 [[7장]]에서 검증했듯, 어투를 격식체로 바꿔도 **환각 방지 자체는 GPT에서 차이 없었음** — 어투는 '톤'에 영향을 주지만, 강한 규칙(환각 방지)까지 뒤집진 못함" },
      { type: "text", tag: "h4", value: "이유 — 프롬프트는 '분포 선택'이다" },
      { type: "text", tag: "p", value: "프롬프트를 쓴다는 건 모델에게 정답을 가르치는 게 아니라, 방대한 학습 분포 중 **어느 영역에서 답을 꺼낼지 지목**하는 행위임. 어투·형식·페르소나가 모두 그 '지목'의 수단임." }
    ] }

  ] }
);
