const keywords = [
  { match: /rodinn[ýehoémuým]+ dom[uovyeami]*/i, url: '/sluzby/rodinne-domy' },
  { match: /výstavb[aouy] domu/i, url: '/sluzby/rodinne-domy/stavba-domu-na-kluc' },
  { match: /dom[u] na kľúč/i, url: '/sluzby/rodinne-domy/stavba-domu-na-kluc' },
  { match: /rekonštrukci[aouie] domu/i, url: '/sluzby/rodinne-domy/rekonstrukcia-rodinneho-domu' },
  // These three previously pointed at '/sluzby/murarske' and '/sluzby/vykopove',
  // which are SubServiceKey values rather than route slugs — so the auto-linker
  // was generating 404s inside article bodies.
  { match: /murársk[eichým]+ prác[eami]*/i, url: '/sluzby/murarske-prace' },
  { match: /fasád[yamiu]*/i, url: '/sluzby/fasady' },
  { match: /omietk[yamiu]*/i, url: '/sluzby/omietky' },
  { match: /zemn[éýchými]+ prác[eami]*/i, url: '/sluzby/vykopove-zemne-prace' },
  { match: /výkopov[éýchými]+ prác[eami]*/i, url: '/sluzby/vykopove-zemne-prace' },
];

export function autoLinkKeywords(content: string): string {
  // A simple tokenizer to protect code blocks, links, URLs, and headings
  const tokenRegex = /(```[\s\S]*?```|`[^`]+`|\[[^\]]+\]\([^)]+\)|https?:\/\/[^\s]+|^#{1,6}\s+.*$)/gm;
  
  const tokens: { type: 'text' | 'protected'; text: string }[] = [];
  let lastIndex = 0;
  let matchObj;
  
  while ((matchObj = tokenRegex.exec(content)) !== null) {
    if (matchObj.index > lastIndex) {
      tokens.push({ type: 'text', text: content.slice(lastIndex, matchObj.index) });
    }
    tokens.push({ type: 'protected', text: matchObj[0] });
    lastIndex = tokenRegex.lastIndex;
  }
  if (lastIndex < content.length) {
    tokens.push({ type: 'text', text: content.slice(lastIndex) });
  }

  const linkedUrls = new Set<string>();

  for (let i = 0; i < tokens.length; i++) {
    if (tokens[i].type !== 'text') continue;
    let textChunk = tokens[i].text;
    
    for (const { match, url } of keywords) {
      if (linkedUrls.has(url)) continue;
      
      // Match whole word boundaries if possible
      const regex = new RegExp(`(^|\\s|[.,;!?])(${match.source})($|\\s|[.,;!?])`, 'i');
      const m = textChunk.match(regex);
      if (m) {
        textChunk = textChunk.replace(regex, `$1[${m[2]}](${url})$3`);
        linkedUrls.add(url);
      }
    }
    tokens[i].text = textChunk;
  }

  return tokens.map(t => t.text).join('');
}

