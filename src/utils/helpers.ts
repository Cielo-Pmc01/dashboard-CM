import type { ContentItem, FormatKey } from '@/types';

export function scoreColor(score: number): string {
  if (score >= 90) return '#d8ff63';
  if (score >= 75) return '#58e6ff';
  if (score >= 60) return '#ffc857';
  return '#ff6f61';
}

export function filteredContent(
  items: ContentItem[],
  format: FormatKey,
  owner: string,
  search: string,
): ContentItem[] {
  return items.filter((c) => {
    if (format !== 'all' && c.format !== format) return false;
    if (owner  !== 'all' && c.owner  !== owner)  return false;
    if (search) {
      const q = search.toLowerCase();
      if (!c.hook.toLowerCase().includes(q) && !c.summary.toLowerCase().includes(q)) return false;
    }
    return true;
  });
}

export function barPct(value: number, max: number): number {
  return Math.round((value / max) * 100);
}
