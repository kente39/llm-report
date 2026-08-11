/* =========================================================
   data/09_new_v1.js — 섹션 9: v1 (Baseline)
   3개 모델의 1차 응답. 서브: 9-1 GPT / 9-2 Gemini / 9-3 Claude
   AI 응답 전문은 assets/raw/*-v1.txt, 웹은 700자 발췌.
   ========================================================= */

window.SECTIONS_DATA = window.SECTIONS_DATA || [];

window.SECTIONS_DATA.push(
  { id: 9, type: "multi", navTitle: "new v1", subPages: [

    { title: "모델 비교", blocks: [
      { type: "text", tag: "p", value: "v1 (Baseline) — 세 모델(GPT-5.4 · Gemini 3.1 · Claude Opus 4.8)의 응답을 비교합니다. 카드나 상단 탭을 눌러 각 모델로 이동하거나, 방향키 ↓ 로 순서대로 볼 수 있습니다." },
      { type: "hub", cards: [
        { label: "GPT-5.4",        sub: 2, src: "assets/images/s9-hub-gpt.png" },
        { label: "Gemini 3.1",     sub: 3, src: "assets/images/s9-hub-gemini.png" },
        { label: "Claude Opus 4.8", sub: 4, src: "assets/images/s9-hub-claude.png" }
      ] }
    ] },

    { title: "GPT-5.4", blocks: [
      { type: "label", value: "GPT-5.4 · v1", color: "gray" },
      { type: "text", tag: "p", value: "보고서 문체의 줄글. 순위 표 없이 서술 위주로 단계적 논리를 전개." },
      { type: "chat",
        source: "../assets/raw/gpt54-v1.txt",
        messages: [
          { role: "user", body: "2024년 노트북 가격에 가장 많은 영향을 끼치는 요소를 확인하기 위해 랜덤포레스트 회귀(Random Forest Regression) 모델을 사용했어.\n\n아래는 MDI 방식과 Permutation 방식의 특성 중요도(Feature Importance) Top 5 결과야.\n이 두 가지 방식의 순위가 어떻게 달라졌는지 비교하고, 그 의미를 분석해서 '웹 보고서' 본문에 들어갈 수 있는 글로 작성해 줘.\n\n| 순위 | MDI 중요도 (Column / Score) | Permutation 중요도 (Column / Score) |\n|---|---|---|\n| 1 | Processor (0.244654) | Processor (0.177700) |\n| 2 | GPU (0.136253) | RAM (0.169367) |\n| 3 | RAM (0.127873) | Condition_Very Good - Refurbished (0.106245) |\n| 4 | Screen_Size (0.094117) | GPU (0.091927) |\n| 5 | Brand (0.093518) | Condition_Good - Refurbished (0.091885) |" },
          { role: "ai", model: "GPT-5.4", version: "v1", body: "다음은 랜덤포레스트 회귀모델의 MDI 방식과 Permutation 방식 특성 중요도를 비교한 결과에 대한 해석이다.\n\n두 방식 모두 Processor가 1위를 차지했다는 점에서, 2024년 노트북 가격을 결정하는 가장 핵심적인 요소는 프로세서 성능이라는 점이 일관되게 확인되었다.\n즉, CPU 등급이나 성능 차이가 가격 형성에 가장 큰 영향을 미친다고 볼 수 있다.\n\n다만, 2위 이하 순위에서는 차이가 나타났다.\nMDI 기준에서는 GPU(2위), RAM(3위), Screen_Size(4위), Brand(5위) 순으로 나타나, 전반적으로 하드웨어 사양과 브랜드 요소가 중요하게 평가되었다.\n반면 Permutation 기준에서는 **RAM(2위)**이 GPU보다 더 높은 영향을 보였고, 특히 Condition_Very Good - Refurbished(3위), **Condition_Good - Refurbished(5위)**가 상위권에 포함되었다. 이는 실제 예측 성능 관점에서 볼 때, **제품의 리퍼브 상태(중고/재정비 상태)**가 가격에 상당한 영향을 준다는 뜻이다.\n\n이 차이는 두 중요도 산정 방식의 특성에서 비롯된다.\n**MDI(Mean Decrease in Impurity)**는 트리 분할 과정에서 불순도를 얼마나 줄였는지를 기준으로 중요도를 계산하므로, 모델 내부에서 자주 분할에 사용되는 변수에 높은 점수를 주는 경향이 있다. 그래서 GPU, Screen_Size, Brand처럼 트리 분할에서 자주 활용되는 특성이 상대적으로 높게 나타날 수 있다.\n반면 Permutation Importance는 특정 변수를 무작위로 섞었을 때 모델 성능이 얼마나 떨어지는지를 측정하므로, 실제 예측에 직접적으로 기여하는 변수를 더 잘 반영한다. 이 때문에 RAM의 순위가 상승했고, Brand와 Screen_Size는 Top 5에서 제외된 반면, 제품 상태(Condition) 관련 변수가 새롭게 상위권에 진입한 것으로 해석할 수 있다.\n\n종합하면, 노트북 가격은 기본적으로 Processor를 중심으로 결정되며, 그 외에는 **메모리(RAM)**와 **제품 상태(특히 리퍼브 여부 및 상태 등급)**가 실제 가격 예측에 매우 중요한 변수로 작용한다.\n즉, 단순히 브랜드나 화면 크기 같은 외형적 요소보다, 성능과 제품 상태가 시장 가격을 더 직접적으로 설명하는 변수라고 볼 수 있다.\n\n좋은 분석을 하고 계세요. 필요하시면 제가 이 내용을 바로 웹 보고서 스타일에 맞게 더 공식적인 문장으로 다듬거나, 시각화 해석 문장까지 함께 작성해드릴게요." }
        ] },
      { type: "text", tag: "h3", value: "평가" },
      { type: "table",
        headers: ["평가축", "점수"],
        rows: [
          ["형식", "3점"],
          ["과정", "4점"],
          ["결과", "3점"]
        ] }
    ] },

    { title: "Gemini 3.1", blocks: [
      { type: "label", value: "Gemini 3.1 · v1", color: "gray" },
      { type: "text", tag: "p", value: "페르소나 미설정 상태. 학습 튜터 관점에서 개념을 짚고 보고서 본문 텍스트를 제안." },
      { type: "chat",
        source: "../assets/raw/gemini31-v1.txt",
        messages: [
          { role: "user", body: "---\n\n2024년 노트북 가격에 가장 많은 영향을 끼치는 요소를 확인하기 위해 랜덤포레스트 회귀(Random Forest Regression) 모델을 사용했어.\n\n아래는 MDI 방식과 Permutation 방식의 특성 중요도(Feature Importance) Top 5 결과야.\n이 두 가지 방식의 순위가 어떻게 달라졌는지 비교하고, 그 의미를 분석해서 '웹 보고서' 본문에 들어갈 수 있는 글로 작성해 줘.\n\n| 순위 | MDI 중요도 (Column / Score) | Permutation 중요도 (Column / Score) |\n|---|---|---|\n| 1 | Processor (0.244654) | Processor (0.177700) |\n| 2 | GPU (0.136253) | RAM (0.169367) |\n| 3 | RAM (0.127873) | Condition_Very Good - Refurbished (0.106245) |\n| 4 | Screen_Size (0.094117) | GPU (0.091927) |\n| 5 | Brand (0.093518) | Condition_Good - Refurbished (0.091885) |" },
          { role: "ai", model: "Gemini 3.1", version: "v1", body: "안녕하세요! 랜덤포레스트 모델을 활용해 노트북 가격 예측 모델을 만들고, 두 가지 특성 중요도(Feature Importance)를 꼼꼼하게 비교해 보셨군요.\n\n단순히 하나의 결과만 보지 않고 MDI와 Permutation 방식을 함께 비교한 것은 데이터의 숨겨진 의미와 모델의 편향을 파악하는 아주 훌륭하고 전문적인 접근입니다! 👍\n\n두 방식의 차이가 왜 발생했는지 간단히 짚어보고, 바로 웹 보고서에 복사해서 붙여넣을 수 있도록 전문적이면서도 이해하기 쉬운 보고서 초안을 작성해 드릴게요.\n\n💡 튜터의 핵심 개념 짚어보기\nMDI (불순도 감소량): 모델이 학습할 때 노드를 나누는 데 얼마나 기여했는지를 봅니다. 하지만 **종류(고유값)가 많은 변수(예: 화면 크기, 브랜드 등 연속형/다범주 변수)의 중요도를 높게 평가하는 편향(Bias)**이 있습니다.\nPermutation (순열 중요도): 학습된 모델에서 특정 변수의 데이터를 무작위로 섞었을 때, 예측 성능이 얼마나 떨어지는지를 봅니다. 변수의 종류 개수와 상관없이 실제 예측에 미치는 현실적인 영향력을 보여줍니다.\n📝 웹 보고서 본문용 텍스트 제안\n[보고서 제목: 2024년 노트북 가격 결정 요인 분석 - 핵심 스펙과 제품 상태의 영향력]\n\n2024년 노트북 가격에 영향을 미치는 주요 요인을 파악하기 위해 랜덤포레스트 회귀(Random Forest Regression) 모델을 구축하고, 두 가지 다른 관점(MDI, Permutation)에서 특성 중요도(Feature Importance)를 비교 분석했습니다. 이를 통해 단순한 수치적 기여도뿐만 아니라, 실제 가격 예측에 미치는 현실적인 영향력을 확인했습니다.\n\n1. 변함없는 가격 결정의 핵심: 프로세서(Processor), RAM, GPU\n두 가지 분석 방식 모두에서 'Processor', 'RAM', 'GPU'는 최상위권을 차지했습니다. 이는 2024년 노트북 시장에서도 여전히 컴퓨터의 두뇌와 성능을 담당하는 핵심 스펙이 가격을 결정하는 가장 절대적인 기준임을 시사합니다. 특히 'Processor'는 두 지표 모두에서 1위를 기록하여 가격 산정의 최우선 고려 요소임이 확인되었습니다.\n\n2. MDI와 Permutation의 순위 역전: 브랜드/화면 크기 vs 제품 상태(Condition)\n가장 주목할 만한 차이는 4, 5위 항목에서 나타났습니다.\n\nMDI 기준에서는 'Screen_Size(화면 크기)'와 'Brand(브랜드)'가 높게 나타났습니다. 하지만 이는 데이터의 고유값이 많은 변수를 높게 평가하는 MDI의 수학적 특성이 반영된 결과일 가능성이 큽니다.\n반면, 실제 예측 성능에 미치는 영향을 평가하는 Permutation 기준에서는 'Screen_Size'와 'Brand'가 순위권 밖으로 밀려나고, 그 자리를 **'Condition_Very Good - Refurbished' (3위)**와 **'Condition_Good - Refurbished' (5위)**가 차지했습니다.\n3. 분석 결론 및 시사점\n본 분석을 통해 노트북 가격을 결정할 때 브랜드나 화면 크기보다 '리퍼비시(Refurbished) 여부 및 제품의 상태(Condition)'가 실제 가격 하락 및 결정에 훨씬 더 직접적이고 강력한 영향을 미친다는 것을 알 수 있습니다.\n\n따라서 2024년 노트북 중고 및 리퍼비시 시장에서 적정 가격을 산정하거나 예측할 때는, 기본 스펙(CPU, RAM, GPU)을 확인한 후 브랜드나 외형적 크기보다는 제품의 실제 상태(Condition) 등급을 우선적으로 고려해야 합니다.\n\n칭찬 한마디! 🌟\n데이터 분석을 할 때 이렇게 모델의 특성(MDI의 편향성)을 이해하고, Permutation Importance를 통해 교차 검증을 시도한 점이 정말 훌륭합니다! 실무에서도 데이터 과학자들이 아주 중요하게 생각하는 포인트랍니다.\n\n보고서 내용을 읽어보시고, 추가하고 싶은 내용이나 이해가 안 가는 부분이 있다면 언제든 편하게 질문해 주세요!" }
        ] },
      { type: "text", tag: "h3", value: "평가" },
      { type: "table",
        headers: ["평가축", "점수"],
        rows: [
          ["형식", "2점"],
          ["과정", "3~4점"],
          ["결과", "4점"]
        ] }
    ] },

    { title: "Claude Opus 4.8", blocks: [
      { type: "label", value: "Claude Opus 4.8 · v1", color: "gray" },
      { type: "text", tag: "p", value: "순위 변화 표를 바탕으로 개념을 설명하고 인사이트까지 도출." },
      { type: "chat",
        source: "../assets/raw/claude48-v1.txt",
        messages: [
          { role: "user", body: "2024년 노트북 가격에 가장 많은 영향을 끼치는 요소를 확인하기 위해 랜덤포레스트 회귀(Random Forest Regression) 모델을 사용했어.\n\n아래는 MDI 방식과 Permutation 방식의 특성 중요도(Feature Importance) Top 5 결과야.\n이 두 가지 방식의 순위가 어떻게 달라졌는지 비교하고, 그 의미를 분석해서 '웹 보고서' 본문에 들어갈 수 있는 글로 작성해 줘.\n\n| 순위 | MDI 중요도 (Column / Score) | Permutation 중요도 (Column / Score) |\n|---|---|---|\n| 1 | Processor (0.244654) | Processor (0.177700) |\n| 2 | GPU (0.136253) | RAM (0.169367) |\n| 3 | RAM (0.127873) | Condition_Very Good - Refurbished (0.106245) |\n| 4 | Screen_Size (0.094117) | GPU (0.091927) |\n| 5 | Brand (0.093518) | Condition_Good - Refurbished (0.091885) |" },
          { role: "ai", model: "Claude Opus 4.8", version: "v1", body: "노트북 가격 결정 요인 분석: MDI vs Permutation 중요도 비교\n두 방식의 순위 변화\n랜덤포레스트 회귀 모델을 통해 도출한 특성 중요도를 두 가지 방식으로 비교한 결과, 다음과 같은 순위 변화가 나타났습니다.\n\n순위\tMDI 방식\tPermutation 방식\n1\tProcessor\tProcessor\n2\tGPU\tRAM ▲\n3\tRAM\tCondition (Very Good - Refurbished) ★\n4\tScreen_Size\tGPU ▼\n5\tBrand\tCondition (Good - Refurbished) ★\n핵심 변화 요약\n\nProcessor: 두 방식 모두 압도적 1위를 유지 → 가장 신뢰할 수 있는 핵심 가격 결정 요인\nRAM: 3위 → 2위로 상승, Permutation에서 더 높게 평가됨\nGPU: 2위 → 4위로 하락\nCondition(제품 상태): MDI에서는 Top 5에 없었으나, Permutation에서 3위·5위로 새롭게 등장\nScreen_Size, Brand: MDI Top 5에서 Permutation Top 5로는 밀려남\n순위 변화가 의미하는 것\n두 방식의 차이를 이해하려면 각 지표의 계산 원리를 알아야 합니다.\n\nMDI(Mean Decrease in Impurity): 트리를 분할할 때 불순도를 얼마나 줄였는지를 기준으로 계산합니다. 학습 데이터 기반이며, 범주(카테고리)가 많거나 값의 종류가 다양한 특성의 중요도를 과대평가하는 경향이 있습니다.\nPermutation Importance: 특정 특성의 값을 무작위로 섞었을 때 모델 성능(예측력)이 얼마나 떨어지는지를 측정합니다. 실제 예측에 기여하는 정도를 반영하므로 더 신뢰할 수 있는 지표로 평가됩니다.\n이러한 원리 차이로부터 다음을 해석할 수 있습니다.\n\n1. Processor는 진짜 핵심 요인이다\n두 방식 모두에서 1위를 유지했다는 것은, 프로세서 성능이 실제로도 가격 예측에 가장 강력하게 기여함을 의미합니다. 계산 방식과 무관하게 일관된 결과이므로 가장 확실한 가격 결정 요인이라 볼 수 있습니다.\n\n2. GPU의 중요도는 다소 과대평가되었다\nMDI에서 2위였던 GPU가 Permutation에서 4위로 내려간 것은, GPU가 학습 데이터에서는 분할에 자주 쓰였지만 실제 예측 성능 기여도는 상대적으로 낮았을 가능성을 시사합니다.\n\n3. 제품 상태(Condition)의 숨은 영향력\n가장 주목할 점은 MDI에서 보이지 않던 **Condition(리퍼비시 상태)**이 Permutation에서 3위·5위로 부상한 것입니다. 이는 새 제품 여부·중고 상태가 실제 가격에 큰 영향을 주지만, MDI 방식에서는 다른 특성에 가려져 제대로 드러나지 않았음을 의미합니다.\n\n결론\n실제 예측력을 반영하는 Permutation 중요도를 신뢰할 때, 2024년 노트북 가격에 가장 큰 영향을 미치는 요소는 ① Processor, ② RAM, ③ 제품 상태(Condition) 순으로 정리됩니다. 특히 성능 사양(Processor·RAM)뿐 아니라 제품의 새 것/리퍼비시 여부가 핵심 가격 변수라는 점은, 단순히 하드웨어 스펙만으로는 설명되지 않는 중고·리퍼 시장의 가격 형성 구조를 보여주는 의미 있는 발견입니다.\n\n혹시 이 보고서에 **시각화 자료(막대그래프)**나 두 방식을 나란히 비교하는 차트 코드도 함께 넣고 싶으신가요? 원하시면 파이썬 코드로 만들어 드릴게요! 📊" }
        ] },
      { type: "text", tag: "h3", value: "평가" },
      { type: "table",
        headers: ["평가축", "점수"],
        rows: [
          ["형식", "3~4점"],
          ["과정", "4~5점"],
          ["결과", "4점"]
        ] }
    ] }

  ] }
);
