import { sources, insights } from '@/data/mock';

export default function SourcesView() {
  return (
    <div className="view-grid">
      <section className="card">
        <h2 className="card-title">Fuentes de contenido</h2>
        <div className="sources-list">
          {sources.map((s) => (
            <div key={s.name} className="source-row">
              <div className="source-header">
                <strong className="source-name">{s.name}</strong>
                <span className="source-type">{s.type}</span>
              </div>
              <p className="source-summary">{s.summary}</p>
              <div className="source-tags">
                {s.tags.map((t) => (
                  <span key={t} className="tag">{t}</span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="card">
        <h2 className="card-title">Insights clave de audiencia</h2>
        <div className="insights-list">
          {insights.map(([title, text, color]) => (
            <div key={title} className="insight-card" style={{ borderLeft: `3px solid ${color}` }}>
              <span className="insight-badge" style={{ color }}>{title}</span>
              <p className="insight-body">{text}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
