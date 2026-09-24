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

/**
 * Plain text for structured data.
 *
 * FAQ answers are authored in markdown, and `acceptedAnswer.text` was getting
 * the raw source — so the FAQPage schema shipped literal `**MNSP**` and
 * `[anchor](/url)` to search engines. 10 answers across 6 posts were affected.
 * Link text is kept, the target is dropped: a schema answer can't be clicked.
 */
export function stripMarkdown(text: string): string {
  return text
    .replace(/!\[([^\]]*)\]\([^)]*\)/g, '$1')   // images -> alt text
    .replace(/\[([^\]]+)\]\([^)]*\)/g, '$1')    // links  -> anchor text
    .replace(/\*\*([^*]+)\*\*/g, '$1')          // bold
    .replace(/(^|\W)\*([^*\n]+)\*(?=\W|$)/g, '$1$2') // italics, not mid-word
    .replace(/`([^`]+)`/g, '$1')                // inline code
    .replace(/\s*\n\s*/g, ' ')                  // fold to one line
    .replace(/\s{2,}/g, ' ')
    .trim();
}

/**
 * Dates shown to visitors. sk-SK gives a lowercase genitive month
 * ("27. júna 2026"), which the hand-written `date` field ("27. Jún 2026")
 * did not.
 *
 * The timezone is pinned deliberately. Posts are stamped 08:00+01:00, i.e.
 * 07:00 UTC, so without it a reader west of UTC-7 renders the *previous*
 * calendar day — and in a client component (BlogSection) server and client
 * would disagree, which is a hydration mismatch. A publication date should
 * also read the same for every visitor, not shift with where they are.
 */
export function formatSkDate(iso: string): string {
  return new Intl.DateTimeFormat('sk-SK', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
    timeZone: 'Europe/Bratislava',
  }).format(new Date(iso));
}

/**
 * True when the post was genuinely revised, not merely published.
 *
 * Compares calendar days in the same timezone formatSkDate displays in.
 * Comparing UTC days instead (toISOString) could disagree with what the reader
 * sees: a post stamped 00:30 Bratislava time falls on the previous UTC day, so
 * "Aktualizované" would appear next to an identical-looking publish date.
 */
export function wasUpdated(publishedAt: string, updatedAt?: string): boolean {
  if (!updatedAt) return false;
  // en-CA formats as YYYY-MM-DD, which compares cleanly as a string.
  const day = (s: string) =>
    new Intl.DateTimeFormat('en-CA', { timeZone: 'Europe/Bratislava' }).format(new Date(s));
  return day(updatedAt) !== day(publishedAt);
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
