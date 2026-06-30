import { PALETTE } from '@/data/mock';
import type { ContentItem } from '@/types';

function scoreColor(score: number): string {
  if (score >= 86) return 'linear-gradient(90deg, var(--green), var(--lime))';
  if (score >= 74) return 'linear-gradient(90deg, var(--amber), var(--green))';
  return 'linear-gradient(90deg, var(--coral), var(--amber))';
}

interface Props {
  item: ContentItem;
  index: number;
}

export default function PostCard({ item, index }: Props) {
  const colors = PALETTE[index % PALETTE.length];
  const slug = item.format.toLowerCase();
  return (
    <article className="post-card">
      <div className="thumb" style={{ '--a': colors[0], '--b': colors[1] } as React.CSSProperties} />
      <div className="card-body">
        <div className="card-top">
          <span className={`badge ${slug}`}>{item.format}</span>
          <span className="badge status">{item.status}</span>
        </div>
        <h3>{item.hook}</h3>
        <p>{item.summary}</p>
        <div className="meta">
          <span>{item.owner}</span>
          <span>{item.day} {item.time}</span>
          <span>{item.objective}</span>
          <span>{item.cta}</span>
        </div>
        <div className="score-line">
          <div className="meter">
            <span style={{ '--score': `${item.score}%`, '--meter': scoreColor(item.score) } as React.CSSProperties} />
          </div>
          <div className="score">{item.score}</div>
        </div>
      </div>
    </article>
  );
}
