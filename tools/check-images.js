/* =========================================================
   tools/check-images.js — 이미지 참조 ↔ 실제 파일 정합성 점검
   실행: node tools/check-images.js
   - data 의 모든 image/hub src 를 수집
   - 파일 존재 / 0바이트(placeholder) / placeholder 플래그 상태 리포트
   - 실제 이미지가 있는데 placeholder:true 로 남아있으면 경고
   ========================================================= */

const fs = require('fs');
const path = require('path');

const REPORTS = ['1-comparison', '2-design', '3-log'];
let warn = 0;

REPORTS.forEach(report => {
  const dataDir = path.join(report, 'data');
  if (!fs.existsSync(dataDir)) return;

  const refs = []; // { src, placeholder, file, sectionFile }
  fs.readdirSync(dataDir).filter(f => f.endsWith('.js')).forEach(f => {
    const src = fs.readFileSync(path.join(dataDir, f), 'utf8');
    // src: "assets/images/..." 와 같은 줄에서 placeholder 여부 추출
    const re = /src:\s*"(assets\/images\/[^"]+)"([^}]*)/g;
    let m;
    while ((m = re.exec(src))) {
      refs.push({
        src: m[1],
        placeholder: /placeholder:\s*true/.test(m[2]),
        sectionFile: f
      });
    }
  });

  if (!refs.length) return;
  console.log(`\n=== ${report} ===`);

  refs.forEach(r => {
    const abs = path.join(report, r.src);
    let status, size = 0;
    if (!fs.existsSync(abs)) {
      status = '❌ 파일 없음';
      warn++;
    } else {
      size = fs.statSync(abs).size;
      if (size === 0) {
        status = r.placeholder ? '⬜ placeholder (정상)' : '⚠️ 0바이트인데 placeholder 아님';
        if (!r.placeholder) warn++;
      } else {
        status = r.placeholder ? '⚠️ 실제 이미지 있는데 placeholder:true (플래그 제거 필요)' : '✅ 연결됨';
        if (r.placeholder) warn++;
      }
    }
    console.log(`  ${r.src.padEnd(38)} ${status}`);
  });
});

console.log(warn ? `\n⚠️  확인 필요 ${warn}건` : '\n✅ 이미지 연결 정상');
process.exit(warn ? 1 : 0);
