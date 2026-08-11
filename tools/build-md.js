/* =========================================================
   tools/build-md.js — data/*.js → README.md 생성
   Claude 작업 환경에서 실행한다 (node tools/build-md.js).
   배포물에는 포함되지 않는 개발용 스크립트.
   ========================================================= */

const fs = require('fs');
const path = require('path');
const { blocksMd, validate } = require('./serialize.js');

function load(folder) {
  global.window = {};
  const dir = path.join(folder, 'data');
  fs.readdirSync(dir).filter(f => f.endsWith('.js')).sort()
    .forEach(f => eval(fs.readFileSync(path.join(dir, f), 'utf8')));
  const d = global.window.SECTIONS_DATA || [];
  d.sort((a, b) => a.id - b.id);
  return d;
}

function anchor(t) {
  return t.toLowerCase().replace(/[^\w가-힣\s-]/g, '').trim().replace(/\s+/g, '-');
}

const NAV = [
  ['1-comparison', '1. 비교 보고서'],
  ['2-design', '2. 설계 문서'],
  ['3-log', '3. 실행 로그']
];
function strip(cur) {
  return '[⌂ 인덱스](../README.md) · ' +
    NAV.map(([f, l]) => f === cur ? `**${l}**` : `[${l}](../${f}/README.md)`).join(' · ');
}

function toMd(folder, title, subtitle, sections) {
  const o = [`# ${title}`, '', strip(folder), '', `> ${subtitle}`, '',
    '웹 버전: [index.html](index.html)', '', '---', '', '## 목차', ''];

  sections.forEach(s => {
    o.push(`${s.id}. [${s.navTitle}](#${anchor(s.navTitle)})`);
    if (s.subPages.length > 1)
      s.subPages.forEach((sp, i) => o.push(`   - [${sp.title || s.id + '-' + (i + 1)}](#${s.id}-${i + 1})`));
  });
  o.push('', '---', '');

  sections.forEach(s => {
    o.push(`## ${s.navTitle}`, '');
    if (s.subPages.length > 1) {
      s.subPages.forEach((sp, i) => {
        o.push(`### ${sp.title ? sp.title + ` (${s.id}-${i + 1})` : s.id + '-' + (i + 1)}`, '');
        o.push(sp.blocks && sp.blocks.length ? blocksMd(sp.blocks) : '<!-- 미작성 -->', '');
      });
    } else {
      const sp = s.subPages[0];
      o.push(sp.blocks && sp.blocks.length ? blocksMd(sp.blocks) : `\`${s.id}-1\`\n\n<!-- 미작성 -->`, '');
    }
    o.push('[↑ 목차](#목차)', '');
  });

  o.push('---', '', strip(folder), '');
  return o.join('\n');
}

const JOBS = [
  ['1-comparison', 'LLM 모델 비교 · 선정 보고서',
   '3 Round Prompt Stress Test for 3 LLMs — 2024 노트북 가격 비교 과업'],
  ['2-design', '시스템 설계 문서',
   '타겟 사용자 · 페르소나 · 프롬프트 v1→v2 개선 이력 · 검증 전략'],
  ['3-log', '실행 로그',
   '10턴 이상 실제 대화 전문과 문제 발생 지점 · 수정 결과']
];

let failed = false;
JOBS.forEach(([folder, title, subtitle]) => {
  const sections = load(folder);

  // A안 등 규칙 검증
  const errors = validate(sections);
  if (errors.length) {
    failed = true;
    console.error(`\n❌ ${folder} 규칙 위반:`);
    errors.forEach(e => console.error('   - ' + e));
  }

  fs.writeFileSync(path.join(folder, 'README.md'), toMd(folder, title, subtitle, sections), 'utf8');
  const pages = sections.reduce((a, s) => a + s.subPages.length, 0);
  console.log(`✅ ${folder}/README.md — 섹션 ${sections.length}, 페이지 ${pages}`);
});

if (failed) {
  console.error('\n⚠️  규칙 위반이 있습니다. md 는 생성했으나 수정이 필요합니다.');
  process.exit(1);
}
