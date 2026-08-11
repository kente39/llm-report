/* report-log/data/05_summary.js — 문제 발생 지점 종합 */
window.SECTIONS_DATA = window.SECTIONS_DATA || [];
window.SECTIONS_DATA.push(
  { id: 5, type: "single", navTitle: "문제 요약", subPages: [ { blocks: [
    { type: "text", tag: "h3", value: "문제 발생 지점 및 수정 결과" },
    { type: "table",
      headers: ["문제", "유형", "수정 결과"],
      rows: [
        ["v1→v2 같은 창 이어쓰기", "문맥 오염", "새 창에서 독립 실행"],
        ["없는 기법 요구 시 가짜 코드 우려", "환각", "v3 환각 방지 규칙 → 정정 확인"],
        ["Gemini 5턴 페르소나 붕괴", "문맥 끊김", "제약 재주입 / 형식 고정(v3)"],
        ["Claude 최종 산출물 미출력", "출력 한계", "출력 형식 명시로 보완"],
        ["차트 이미지 미표시", "렌더링", "경로·삽입 방식 수정"]
      ] },
    { type: "text", tag: "p", value: "전체 대화 전문은 assets/raw/full-session.txt 참조." }
  ] } ] }
);
