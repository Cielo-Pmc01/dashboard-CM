import { sources } from '@/data/mock';

interface Props { active: boolean; }

export default function SourcesView({ active }: Props) {
  return (
    <section className={`view${active ? ' active' : ''}`} id="sources">
      <div className="source-grid">
        {sources.map((s) => (
          <article key={s.name} className="source-card">
            <p className="eyebrow">{s.type}</p>
            <h3>{s.name}</h3>
            <p>{s.summary}</p>
            <div className="tags">
              {s.tags.map((tag) => <span key={tag}>{tag}</span>)}
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
