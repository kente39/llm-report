/* =========================================================
   data/11_new_v3.js — 섹션 11: v3 (Final Format)
   완성된 마크다운 보고서 전문을 블록으로 변환.
   원문 위계 보존: 원문 ## → h4, ### → h5 (서브페이지 title 이 h3 이므로 그 아래).
   웹은 h4/h5 로 크기 구분, md 는 #### / ##### 로 목차 계층 유지.
   서브: 11-1 GPT / 11-2 Gemini / 11-3 Claude
   ========================================================= */

window.SECTIONS_DATA = window.SECTIONS_DATA || [];

window.SECTIONS_DATA.push(
  { id: 11, type: "multi", navTitle: "new v3", subPages: [

    { title: "모델 비교", blocks: [
      { type: "text", tag: "p", value: "v3 (Final Format) — 세 모델(GPT-5.4 · Gemini 3.1 · Claude Opus 4.8)의 응답을 비교합니다. 카드나 상단 탭을 눌러 각 모델로 이동하거나, 방향키 ↓ 로 순서대로 볼 수 있습니다." },
      { type: "hub", cards: [
        { label: "GPT-5.4",        sub: 2, src: "assets/images/s11-hub-gpt.png" },
        { label: "Gemini 3.1",     sub: 3, src: "assets/images/s11-hub-gemini.png" },
        { label: "Claude Opus 4.8", sub: 4, src: "assets/images/s11-hub-claude.png" }
      ] }
    ] },

    { title: "GPT-5.4", blocks: [
      { type: "label", value: "GPT-5.4 · v3", color: "red" },
      { type: "text", tag: "p", value: "- 2024년 노트북 시장은 고성능 수요와 중고·리퍼비시 거래 확대가 동시에 진행되는 구조임.\n- 특히 멀티태스킹 중심의 사용 환경과 AI PC 트렌드는 RAM 수요를 끌어올리며, 소비자가 체감하는 성능 기준을 바꾸고 있음.\n- 반면 실제 구매 현장에서는 브랜드 이미지, 스펙 표기, 판매 문구가 혼재되어 정보의 비대칭성이 크게 발생함.\n- 본 분석은 랜덤포레스트의 **MDI 중요도**와 **Permutation 중요도**를 함께 비교해, 노트북 가격을 실제로 움직이는 요인이 무엇인지 정리한 결과임." },
      { type: "text", tag: "h4", value: "핵심 요약" },
      { type: "text", tag: "p", value: "- **Processor는 가장 강력한 가격 결정 변수**임.\n- **RAM은 과소평가되기 쉬우나 실제 시장 영향력은 매우 큼**.\n- **GPU는 MDI에서 높게 보이지만 실제 가격 설명력은 과대평가될 가능성이 큼**.\n- **중고·리퍼비시 시장에서는 Condition(상태)이 핵심 가격 축**임.\n- **Brand는 절대적 프리미엄 요인이 아니며, 사양과 상태 대비 영향력이 제한적**임.\n- **50만 원 예산에서는 신형 저가형보다 상태 좋은 중고/리퍼비시 i5급·RAM 16GB 구성이 더 합리적**임." },
      { type: "text", tag: "p", value: "---" },
      { type: "text", tag: "h4", value: "1. MDI vs Permutation: 데이터가 밝혀낸 시장의 진실" },
      { type: "text", tag: "h5", value: "1-1. 두 지표의 해석 차이" },
      { type: "text", tag: "p", value: "- **MDI(Mean Decrease in Impurity)**는 트리 모델 내부에서 분할에 자주 쓰인 변수를 높게 평가하는 방식임.\n- 이 방식은 **범주가 많거나 값의 경우의 수가 많은 변수**를 상대적으로 유리하게 볼 수 있음.\n- **Permutation 중요도**는 특정 변수를 무작위로 섞었을 때 예측력이 얼마나 떨어지는지 측정함.\n- 따라서 실제 시장 가격을 설명하는 **실질적 기여도**를 보기에는 Permutation이 더 해석 친화적임." },
      { type: "text", tag: "h5", value: "1-2. 순위 비교로 본 핵심 차이" },
      { type: "table",
        headers: ["구분", "MDI 상위 변수", "Permutation 상위 변수", "해석"],
        rows: [
          ["1위", "Processor (0.244654)", "Processor (0.177700)", "가격의 중심축으로 일관됨"],
          ["2위", "GPU (0.136253)", "RAM (0.169367)", "GPU 과대평가, RAM 재평가 필요"],
          ["3위", "RAM (0.127873)", "Condition_Very Good - Refurbished (0.106245)", "상태 변수의 실질 영향 확인"],
          ["4위", "Screen_Size (0.094117)", "GPU (0.091927)", "GPU는 중요하지만 최상위는 아님"],
          ["5위", "Brand (0.093518)", "Condition_Good - Refurbished (0.091885)", "브랜드보다 상태가 더 중요함"]
        ] },
      { type: "text", tag: "h5", value: "1-3. 실무적 결론" },
      { type: "text", tag: "p", value: "- **MDI만 보면 GPU가 과하게 중요해 보이는 착시**가 발생함.\n- 이는 GPU가 다양한 모델명과 세부 사양으로 구성되어 **고유값이 많은 변수**이기 때문임.\n- 반면 Permutation은 실제 예측력 저하를 기준으로 하므로, **시장 가격 형성 구조를 더 정확히 반영**함.\n- 결과적으로 2024년 노트북 가격 분석에서는 **Permutation 기준 해석이 우선**되어야 함." },
      { type: "text", tag: "p", value: "---" },
      { type: "text", tag: "h4", value: "2. 핵심 변수 분석" },
      { type: "text", tag: "h5", value: "2-1. Processor: 여전히 가격의 1순위" },
      { type: "text", tag: "p", value: "- Processor는 MDI와 Permutation 모두에서 **압도적 1위**임.\n- 이는 소비자가 노트북의 전반적 성능을 판단할 때 CPU를 가장 기본적인 기준으로 본다는 의미임.\n- 중고 시장에서도 동일함. 같은 브랜드, 같은 외관이라도 **프로세서 급 차이**가 가격 격차를 가장 크게 만듦.\n- 따라서 가격 책정, 재고 분류, 구매 우선순위 모두에서 **CPU 등급이 기준점**이 되어야 함." },
      { type: "text", tag: "h5", value: "2-2. RAM의 재발견: 체감가치를 반영하는 변수" },
      { type: "text", tag: "p", value: "- RAM은 MDI에서 3위였지만, Permutation에서는 **2위로 상승**함.\n- 이는 RAM이 단순 보조 사양이 아니라, **실사용 만족도와 직결되는 핵심 변수**임을 의미함.\n- 브라우저 다중 탭, 화상회의, 문서 작업, 협업 툴 동시 실행 등 현대적 사용 패턴에서 RAM 부족은 즉시 체감됨.\n- 또한 AI PC 트렌드는 시장 전반에서 **메모리 수요 증가의 배경 요인**으로 작용하며, RAM의 실질 가치를 더 높이고 있음." },
      { type: "text", tag: "p", value: "**해석 포인트**" },
      { type: "text", tag: "p", value: "- 소비자는 CPU만이 아니라 **RAM 용량이 충분한지**를 함께 가격 판단 기준으로 삼고 있음.\n- 특히 중가 이하 시장에서는 GPU보다 **RAM 증설 여부가 거래가와 체감 성능을 더 직접적으로 좌우**할 수 있음." },
      { type: "text", tag: "h5", value: "2-3. GPU: 중요하지만, 생각보다 절대적이지 않음" },
      { type: "text", tag: "p", value: "- GPU는 MDI 2위였으나, Permutation에서는 **4위**로 하락함.\n- 이는 GPU가 무의미하다는 뜻이 아니라, **모든 구매자에게 동일한 가격 결정력을 갖는 변수는 아니라는 뜻**임.\n- 사무·학습·일반 생산성 중심 수요에서는 GPU보다 CPU와 RAM이 더 큰 영향을 미칠 가능성이 높음.\n- 따라서 GPU 프리미엄은 **특정 수요층**에서만 강하게 작동한다고 보는 것이 타당함." },
      { type: "text", tag: "p", value: "**실무 시사점**" },
      { type: "text", tag: "p", value: "- 판매자는 모든 제품에 GPU 프리미엄을 일괄 적용하기보다, **타깃 용도별 가격 전략**을 구분해야 함.\n- 구매자는 “외장 GPU 탑재” 문구보다 **실제 용도 대비 필요한 수준인지**를 먼저 판단해야 함." },
      { type: "text", tag: "h5", value: "2-4. Condition의 부상: 중고·리퍼비시 시장의 핵심 축" },
      { type: "text", tag: "p", value: "- Permutation 상위권에 **Condition_Very Good - Refurbished(3위)**, **Condition_Good - Refurbished(5위)**가 동시에 등장함.\n- 이는 중고·리퍼비시 시장에서 가격을 움직이는 요소가 단순 스펙이 아니라 **관리 상태와 신뢰도**임을 보여줌.\n- 같은 CPU와 RAM을 갖춘 제품이라도 외관, 배터리 상태, 수리 이력, 관리 수준에 따라 가격 차이가 크게 발생할 수 있음." },
      { type: "text", tag: "p", value: "**의미**" },
      { type: "text", tag: "p", value: "- 중고 시장에서는 “고사양”보다 “상태가 좋은 준고사양”이 더 높은 거래 효율을 가질 수 있음.\n- 리퍼비시 판매자는 상태 등급 표준화와 검수 신뢰도를 강화할수록 가격 방어력이 높아짐." },
      { type: "text", tag: "h5", value: "2-5. Brand의 한계: 맹신보다 합리 비교가 우선" },
      { type: "text", tag: "p", value: "- Brand는 MDI에서는 5위였지만, Permutation에서는 **상위 5위권 밖**으로 밀려남.\n- 이는 브랜드가 전혀 중요하지 않다는 뜻이 아니라, **실제 가격 형성에서 절대 우선 변수는 아니라는 뜻**임.\n- 소비자는 최종적으로 브랜드보다 **프로세서, RAM, 상태**에 더 민감하게 반응하고 있음." },
      { type: "text", tag: "p", value: "**시장 해석**" },
      { type: "text", tag: "p", value: "- 브랜드 프리미엄은 존재하지만, 중고·리퍼비시 시장에서는 특히 **사양과 상태 대비 가격 합리성**이 더 중요함.\n- 따라서 “유명 브랜드라서 비싸도 된다”는 전략은 데이터 기준으로 지속 가능성이 낮음." },
      { type: "text", tag: "p", value: "---" },
      { type: "text", tag: "h4", value: "3. 실전 비즈니스 및 구매 전략" },
      { type: "text", tag: "h5", value: "3-1. 판매자·플랫폼 관점의 가격 전략" },
      { type: "text", tag: "p", value: "- 가격 산정 모델은 **Processor > RAM > Condition > GPU** 순으로 가중치를 재설계하는 것이 타당함.\n- 중고·리퍼비시 카테고리에서는 상태 등급을 단순 참고값이 아니라 **핵심 가격 변수**로 반영해야 함.\n- 브랜드 프리미엄은 일괄 적용보다, **동일 스펙·동일 상태 대비 실제 거래 반응**을 기준으로 제한적으로 반영해야 함.\n- 상품 상세 페이지에서는 GPU 강조보다 **CPU 등급, RAM 용량, 상태 검수 정보**를 더 전면에 배치하는 편이 전환율에 유리함." },
      { type: "text", tag: "h5", value: "3-2. 일반 소비자 관점의 구매 원칙" },
      { type: "text", tag: "p", value: "- 1순위는 **Processor** 확인임.\n- 2순위는 **RAM 용량** 확인임.\n- 3순위는 중고·리퍼비시라면 반드시 **Condition(상태)** 확인임.\n- GPU와 브랜드는 그 다음 판단 요소로 두는 것이 합리적임." },
      { type: "text", tag: "p", value: "**체크리스트**" },
      { type: "text", tag: "p", value: "- CPU가 최소한 업무·학습용으로 충분한 급인지 확인\n- RAM이 16GB 수준인지 우선 확인\n- 리퍼비시 상태 등급이 Very Good 또는 Good인지 확인\n- 브랜드보다 동일 예산 내 사양·상태 비교를 우선 수행\n- 외장 GPU는 실제 필요 용도일 때만 비용 지불" },
      { type: "text", tag: "h5", value: "3-3. 50만 원 예산 구매 전략" },
      { type: "text", tag: "p", value: "- 50만 원 예산에서는 **신형 저가형 신제품**이 언뜻 매력적으로 보일 수 있음.\n- 그러나 실제 사용성과 가격 효율을 고려하면, 이 구간에서는 **상태가 좋은 중고/리퍼비시 제품**이 훨씬 유리함.\n- 데이터상 Processor와 RAM, 그리고 Condition의 영향력이 크므로, 제한된 예산에서는 이 세 요소를 우선 확보해야 함." },
      { type: "text", tag: "p", value: "**가장 합리적인 선택**" },
      { type: "text", tag: "p", value: "- **상태가 좋은 중고/리퍼비시**\n- **i5급 프로세서**\n- **RAM 16GB**\n- 브랜드는 후순위" },
      { type: "text", tag: "p", value: "**이 전략이 유리한 이유**" },
      { type: "text", tag: "p", value: "- 신형 저가형은 브랜드와 신품 이미지 대비 실제 성능이 낮을 수 있음.\n- 반면 중고/리퍼비시는 같은 예산에서 **상위 CPU와 충분한 RAM** 확보가 가능함.\n- 특히 RAM 16GB는 멀티태스킹 환경에서 체감 차이가 커, 장기 만족도를 높일 가능성이 큼.\n- 여기에 상태가 Good 이상이면, 단순 저가 신품보다 **성능 대비 가격 효율이 압도적**임." },
      { type: "text", tag: "h5", value: "3-4. 구매 우선순위 한 줄 정리" },
      { type: "text", tag: "p", value: "- **50만 원 예산이라면 “브랜드 신품”보다 “상태 좋은 리퍼비시 i5급 + RAM 16GB”가 더 합리적임.**" },
      { type: "text", tag: "p", value: "---" },
      { type: "text", tag: "h4", value: "결론" },
      { type: "text", tag: "p", value: "- 2024년 노트북 가격은 겉보기 스펙보다 **실사용 성능과 거래 신뢰도**에 의해 결정되는 경향이 강함.\n- 가장 중요한 변수는 **Processor**이며, 그 다음 축은 **RAM**과 **Condition**임.\n- **GPU는 중요하지만 과대평가되기 쉬우며**, **Brand는 생각보다 결정력이 제한적**임.\n- 따라서 시장 분석, 가격 책정, 실제 구매 모두에서 **브랜드 중심 사고보다 CPU·RAM·상태 중심 판단**이 더 높은 성과를 만든다고 해석할 수 있음." }
    ] },

    { title: "Gemini 3.1", blocks: [
      { type: "label", value: "Gemini 3.1 · v3", color: "red" },
      { type: "text", tag: "p", value: "최근 노트북 시장은 'AI PC' 트렌드의 부상과 함께 하드웨어 요구 사양이 급변하고 있다. 그러나 소비자와 판매자 간의 정보 비대칭성으로 인해, 스펙의 실질적 가치와 시장 가격 간의 괴리가 발생하고 있다. 본 보고서는 머신러닝 모델의 변수 중요도 분석을 통해 2024년 노트북 가격을 결정하는 진짜 요인을 파악하고, 합리적인 실전 구매 전략을 제시한다." },
      { type: "text", tag: "h4", value: "1. MDI vs Permutation: 데이터가 밝혀낸 시장의 진실" },
      { type: "text", tag: "p", value: "노트북 가격 예측 모델(랜덤포레스트)에서 두 가지 변수 중요도 지표(MDI, Permutation)를 비교한 결과, 시장을 바라보는 관점의 차이가 확인되었다." },
      { type: "text", tag: "p", value: "- **MDI의 한계 (GPU 과대평가):** MDI 기준 2위인 GPU는 고유값이 많은 변수 특성상 모델에 과적합되어 중요도가 과대평가되었다.\n- **Permutation의 신뢰성:** 실제 데이터의 노이즈를 반영하여 평가하는 Permutation 중요도가 실제 시장의 가격 결정력을 더욱 정확하게 대변한다.\n- **분석의 기준:** 따라서 본 보고서는 실질적 가격 영향력을 보여주는 Permutation 지표를 중심으로 시장의 가격 결정 요인을 분석한다." },
      { type: "text", tag: "h4", value: "2. 핵심 변수 분석 (Processor, RAM, GPU, Condition, Brand)" },
      { type: "text", tag: "p", value: "Permutation 중요도를 기반으로 도출한 핵심 가격 결정 요인은 다음과 같다." },
      { type: "text", tag: "p", value: "- **Processor (부동의 1위):** MDI와 Permutation 모두 1위를 기록하며, 노트북의 심장으로서 가격에 가장 큰 영향을 미치는 절대적 요소임이 입증되었다.\n- **RAM의 재발견 (2위):** MDI 3위에서 Permutation 2위로 상승했다. 현대의 무거운 멀티태스킹 환경과 'AI PC' 트렌드로 인한 기본 메모리 요구량 증가가 RAM의 실질적 가치를 크게 끌어올렸다.\n- **Condition(상태)의 부상 (3, 5위):** 중고 및 리퍼비시 시장에서는 'Very Good' 및 'Good'과 같은 기기의 관리 상태가 GPU나 브랜드보다 높은 가격 결정력을 지닌다.\n- **GPU의 위치 조정 (4위):** 게이밍이나 전문 작업용이 아닌 일반적인 시장 전체를 기준으로는 RAM이나 기기 상태보다 가격 영향력이 낮다.\n- **Brand의 한계 (5위권 밖):** MDI에서는 5위였으나 Permutation에서는 5위권 밖으로 밀려났다. 무조건적인 브랜드 맹신보다는 실제 사양과 상태가 가격을 결정하는 핵심이다." },
      { type: "text", tag: "h4", value: "3. 실전 비즈니스 및 구매 전략 (50만 원 예산 가이드 포함)" },
      { type: "text", tag: "p", value: "데이터 분석 결과를 바탕으로 도출한 실전 구매 및 비즈니스 전략은 다음과 같다." },
      { type: "text", tag: "p", value: "- **스펙 우선순위 재설정:** 브랜드나 외장 GPU 유무에 집착하기보다, Processor의 성능과 충분한 RAM 용량을 최우선으로 고려해야 한다.\n- **중고/리퍼비시 시장의 핵심:** 판매자는 기기의 외관 및 기능 상태(Condition)를 최상으로 유지 및 검수하는 것이 마진율 확보에 직결된다.\n- **50만 원 예산 실전 구매 가이드:**\n- 제한된 예산에서는 신형 저가형 노트북을 구매하는 것보다, **'상태가 좋은 중고/리퍼비시(Very Good/Good)'** 제품을 선택하는 것이 압도적으로 합리적이다.\n- 구체적으로 **'인텔 i5급 (또는 동급) 프로세서 + RAM 16GB'** 조합의 중고 제품을 탐색하는 것이 쾌적한 사용 환경을 보장하는 최적의 전략이다.\n- 단, 해당 예산대의 중고 기기는 일반적인 사무 및 학습용에 적합하며, 고사양을 요구하는 온디바이스 AI PC 구동 등의 목적과는 부합하지 않으므로 용도에 맞는 현실적인 접근이 필요하다." }
    ] },

    { title: "Claude Opus 4.8", blocks: [
      { type: "label", value: "Claude Opus 4.8 · v3", color: "red" },
      { type: "text", tag: "p", value: "2024년 노트북 시장은 'AI PC'라는 새로운 화두와 함께 재편되고 있으며, 소비자와 판매자 간 정보의 비대칭성이 그 어느 때보다 심화되었다. 본 보고서는 랜덤포레스트 기반 변수 중요도 분석을 통해 가격을 실제로 결정하는 핵심 요인을 규명하고, 데이터에 근거한 합리적 구매 전략을 제시한다." },
      { type: "text", tag: "h4", value: "1. MDI vs Permutation: 데이터가 밝혀낸 시장의 진실" },
      { type: "text", tag: "p", value: "두 가지 중요도 지표는 상이한 순위를 도출하며, 이 차이가 곧 시장의 실체를 드러낸다." },
      { type: "text", tag: "p", value: "- **MDI(불순도 기반)의 한계**: MDI는 고유값(카디널리티)이 많은 변수를 과대평가하는 편향을 지님. GPU가 MDI 2위(0.136)에 오른 것은 실제 가격 결정력이 아닌 통계적 착시일 가능성이 높음.\n- **Permutation의 신뢰성**: 변수를 무작위로 섞어 예측력 손실을 측정하는 Permutation 방식은 실제 시장의 가격 결정력을 정확히 반영함.\n- **결론**: 시장 해석의 기준은 반드시 Permutation 중요도를 채택해야 하며, MDI는 보조 지표로만 활용함." },
      { type: "text", tag: "h4", value: "2. 핵심 변수 분석 (Processor, RAM, GPU, Condition, Brand)" },
      { type: "text", tag: "p", value: "**① Processor (1위 / 0.178)**" },
      { type: "text", tag: "p", value: "- 두 지표 모두에서 압도적 1위를 유지하는 가장 확실한 가격 결정 요인임.\n- CPU 세대와 등급(i5/i7 등)이 가격의 기준선을 형성함." },
      { type: "text", tag: "p", value: "**② RAM의 재발견 (MDI 3위 → Permutation 2위)**" },
      { type: "text", tag: "p", value: "- 실제 시장에서는 GPU를 제치고 2위로 상승함.\n- 원인: 멀티태스킹 환경 보편화 및 'AI PC' 트렌드로 인한 대용량 메모리 수요 증가.\n- 8GB에서 16GB로의 전환이 체감 성능과 가격을 동시에 견인함." },
      { type: "text", tag: "p", value: "**③ GPU (Permutation 4위 / 0.092)**" },
      { type: "text", tag: "p", value: "- MDI에서는 2위였으나 Permutation에서 4위로 하락, 과대평가 사례의 전형임.\n- 게이밍·전문 작업 등 특정 세그먼트에 한해 가격 영향력을 발휘함." },
      { type: "text", tag: "p", value: "**④ Condition의 부상 (Very Good/Good Refurbished)**" },
      { type: "text", tag: "p", value: "- 신품 스펙 변수를 제외하면 '관리 상태'가 3위·5위를 차지하며 핵심 축으로 부상함.\n- 중고·리퍼비시 시장에서는 동일 사양이라도 상태 등급이 가격 프리미엄을 결정함." },
      { type: "text", tag: "p", value: "**⑤ 브랜드의 한계 (Permutation 5위권 밖)**" },
      { type: "text", tag: "p", value: "- Brand는 MDI 5위였으나 실제 가격 결정력 순위에서는 이탈함.\n- 시사점: 브랜드 프리미엄에 대한 맹신보다 사양과 상태가 실질적 가치를 좌우함." },
      { type: "text", tag: "h4", value: "3. 실전 비즈니스 및 구매 전략 (50만 원 예산 가이드 포함)" },
      { type: "text", tag: "p", value: "**[판매자·경영진 관점]**" },
      { type: "text", tag: "p", value: "- 가격 책정의 우선순위: **Processor → RAM → Condition** 순으로 설정.\n- 리퍼비시 사업 시 상태 등급(Very Good/Good) 관리에 투자하는 것이 스펙 상향보다 마진 확보에 유리함.\n- 과도한 GPU 마케팅보다 RAM 용량 강조가 대중 수요에 부합함." },
      { type: "text", tag: "p", value: "**[50만 원 예산 구매자 가이드]**" },
      { type: "text", tag: "p", value: "동일 예산에서 '신형 저가형'과 '상태 좋은 중고·리퍼비시'를 비교하면 후자가 압도적으로 합리적임." },
      { type: "table",
        headers: ["구분", "신형 저가형", "상태 좋은 중고/리퍼비시"],
        rows: [
          ["Processor", "저성능 보급형", "i5급"],
          ["RAM", "8GB", "16GB"],
          ["Condition", "신품", "Very Good 등급"],
          ["실사용 만족도", "낮음", "높음"]
        ] },
      { type: "text", tag: "p", value: "- **권장 사양**: i5급 Processor + RAM 16GB + Very Good 등급 리퍼비시.\n- **판단 근거**: 데이터가 지목한 핵심 요인(Processor·RAM·Condition)을 예산 내에서 모두 충족하는 유일한 선택지임.\n- **주의**: 해당 예산대의 중고·리퍼비시 제품은 일반 문서·웹·멀티태스킹 용도에 최적화된 선택이며, 본격적인 온디바이스 AI 연산(AI PC) 구동을 목적으로 삼는 구매는 권장하지 않음. RAM 수요 상승의 원인일 뿐 이 가격대의 구매 목표가 될 수 없음." }
    ] }

  ] }
);
