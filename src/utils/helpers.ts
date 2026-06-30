import type { ContentItem, FormatKey, MarcaFilter } from '@/types';

export function scoreColor(score: number): string {
  if (score >= 86) return 'linear-gradient(90deg, var(--green), var(--lime))';
  if (score >= 74) return 'linear-gradient(90deg, var(--amber), var(--green))';
  return 'linear-gradient(90deg, var(--coral), var(--amber))';
}

export function filteredContent(
  items: ContentItem[],
  format: FormatKey,
  owner: string,
  search: string,
  marca: MarcaFilter = 'all',
): ContentItem[] {
  const term = search.trim().toLowerCase();
  return items.filter((c) => {
    if (format !== 'all' && c.format !== format) return false;
    if (owner  !== 'all' && c.owner  !== owner)  return false;
    if (marca  !== 'all' && c.marca  !== marca)  return false;
    if (term) {
      const hay = [c.hook, c.summary, c.cta, c.owner, c.status, c.objective, c.marca]
        .join(' ').toLowerCase();
      if (!hay.includes(term)) return false;
    }
    return true;
  });
}
