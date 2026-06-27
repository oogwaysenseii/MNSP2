export function extractFAQ(content: string) {
  const faqs: { q: string; a: string }[] = [];
  const lines = content.split('\n');
  let inFaq = false;
  let currentQ: string | null = null;
  let currentA: string[] = [];

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i].trim();
    if (line.match(/^#{2,3}\s+.*FAQ/i) || line.match(/^#{2,3}\s+Často kladené otázky/i)) {
      inFaq = true;
      continue;
    }
    if (inFaq && line.match(/^#{2,3}\s+/)) {
      break;
    }
    if (inFaq) {
      if (line === '') {
        if (currentQ && currentA.length > 0) {
          // add empty lines to answer to preserve paragraphs
          currentA.push(line);
        }
        continue;
      }
      
      const boldMatch = line.match(/^\*\*(?:\d+\.\s*|-\s*)?([^*]+)\*\*$/);
      const listMatch = line.match(/^(?:\d+\.\s+|-\s+)(?:\*\*)?([^*]+?)(?:\*\*)?$/);
      const isQuestion = boldMatch || listMatch || (line.endsWith('?') && !line.startsWith('>'));
      
      if (isQuestion) {
        if (currentQ) {
          faqs.push({ q: currentQ, a: currentA.join('\n').trim() });
        }
        currentQ = (boldMatch?.[1] || listMatch?.[1] || line).replace(/^\*\*(.*)\*\*$/, '$1').trim();
        currentA = [];
      } else if (currentQ) {
        currentA.push(line);
      }
    }
  }
  if (currentQ && currentA.length > 0) {
    faqs.push({ q: currentQ, a: currentA.join('\n').trim() });
  }
  return faqs;
}

export function calculateReadingTime(text: string): string {
  const wordsPerMinute = 200;
  const noOfWords = text.split(/\s+/).length;
  const minutes = Math.ceil(noOfWords / wordsPerMinute);
  return `${minutes} min čítania`;
}

export function getWordCount(text: string): number {
  return text.split(/\s+/).length;
}
