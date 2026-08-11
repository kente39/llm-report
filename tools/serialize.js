/* 블록 배열 → 마크다운 직렬화 (스키마 검증용) */

function cell(c) { return typeof c === 'object' ? c.t : c; }

function tableMd(b) {
  const out = ['| ' + b.headers.join(' | ') + ' |',
               '|' + b.headers.map(() => '---').join('|') + '|'];
  b.rows.forEach(r => out.push('| ' + r.map(cell).join(' | ') + ' |'));
  return out.join('\n');
}

// 웹 발췌 경계 마커 — md 출력에서는 제거한다 (렌더링 시 어차피 보이지 않음)
const MORE = /\n?<!--\s*more\s*-->\n?/;

function chatMd(b) {
  const out = [];
  b.messages.forEach(m => {
    if (m.role === 'user') {
      out.push('**🧑 User**', '', m.body.replace(MORE, '\n\n').replace(/\n{3,}/g, '\n\n').trim(), '');
    } else {
      out.push(`**🤖 ${m.model}**` + (m.version ? ` · ${m.version}` : ''), '',
               m.body.replace(MORE, '\n\n').replace(/\n{3,}/g, '\n\n').trim(), '', '---', '');   // 한 쌍이 끝날 때만 구분선
    }
  });
  if (b.source) out.push(`전문: [${b.source}](${b.source})`);
  return out.join('\n');
}

function blockMd(b) {
  switch (b.type) {
    case 'title':  return `# ${b.main}\n\n_${b.sub}_`;
    case 'text':   return b.tag === 'p' ? b.value : `${'#'.repeat(+b.tag[1])} ${b.value}`;
    case 'image':  return `![${b.caption || ''}](${b.src})` + (b.caption ? `\n\n*${b.caption}*` : '');
    case 'table':  return tableMd(b);
    case 'code':   return '```' + (b.lang || '') + '\n' + b.value.trim() + '\n```';
    case 'label':  return `**［${b.value}］**`;
    case 'chat':   return chatMd(b);
    case 'nav':    return '';  // 웹 전용 탭 — md 는 목차 링크로 대체되므로 생략
    case 'hub':    return '';  // 웹 전용 허브 카드 — md 는 목차 링크로 대체되므로 생략
    default: throw new Error('알 수 없는 블록 타입: ' + b.type);
  }
}


/* 웹 발췌: 마커가 있으면 그 앞까지, 없으면 글자 수 기준 문단 경계에서 끊음 */
function chatExcerpt(body, limit) {
  if (MORE.test(body)) return { text: body.split(MORE)[0].trim(), cut: true, by: 'marker' };

  const paras = body.split(/\n\n+/);
  let out = [], total = 0;
  for (const p of paras) {
    if (out.length && total + p.length > (limit || 700)) return { text: out.join('\n\n'), cut: true, by: 'auto' };
    out.push(p); total += p.length;
  }
  return { text: body.trim(), cut: false, by: 'full' };
}

module.exports = { blockMd, blocksMd: bs => bs.map(blockMd).filter(Boolean).join('\n\n'), chatExcerpt };

/* 데이터 유효성 검사 — A안 헤딩 규칙 등 */
function validate(sections) {
  var errors = [];
  sections.forEach(function (s) {
    s.subPages.forEach(function (sp, i) {
      var loc = s.id + '-' + (i + 1);
      // A안: title 있는 페이지의 blocks 안에 h1/h2 금지 (섹션 헤딩과 충돌)
      if (sp.title) {
        (sp.blocks || []).forEach(function (b) {
          if (b.type === 'text' && (b.tag === 'h1' || b.tag === 'h2')) {
            errors.push(loc + ': title 있는 페이지에 ' + b.tag + ' 블록 (A안 위반) — "' + b.value + '"');
          }
        });
      }
    });
  });
  return errors;
}
module.exports.validate = validate;
