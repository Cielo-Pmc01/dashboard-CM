import { igMetrics, growthData, reachByFormat, engagementMix, retention, funnel, heatmap, insights, content } from '@/data/mock';
import { scoreColor } from '@/utils/helpers';

function IGMetrics() {
  return (
    <section className="card">
      <h2 className="card-title">Instagram — Métricas 30 días</h2>
      <div className="metrics-grid">
        {igMetrics.map((m) => (
          <div key={m.label} className="metric-cell">
            <span className="metric-label">{m.label}</span>
            <span className="metric-value" style={{ color: m.color }}>{m.value}</span>
            <span className="metric-delta">{m.delta}</span>
            <span className="metric-detail">{m.detail}</span>
          </div>
        ))}
      </div>
    </section>
  );
}

function GrowthChart() {
  const max = Math.max(...growthData);
  const W = 600; const H = 120; const pad = 8;
  const pts = growthData.map((v, i) => {
    const x = pad + (i / (growthData.length - 1)) * (W - pad * 2);
    const y = H - pad - ((v / max) * (H - pad * 2));
    return `${x},${y}`;
  });
  const area = `M${pts[0]} L${pts.join(' L')} L${W - pad},${H} L${pad},${H} Z`;
  return (
    <section className="card">
      <h2 className="card-title">Crecimiento — últimos 30 días</h2>
      <svg viewBox={`0 0 ${W} ${H}`} width="100%" height={H} style={{ display: 'block' }}>
        <defs>
          <linearGradient id="gr" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#58e6ff" stopOpacity="0.25" />
            <stop offset="100%" stopColor="#58e6ff" stopOpacity="0" />
          </linearGradient>
        </defs>
        <path d={area} fill="url(#gr)" />
        <polyline points={pts.join(' ')} fill="none" stroke="#58e6ff" strokeWidth="2" />
      </svg>
    </section>
  );
}

function ReachByFormat() {
  const max = Math.max(...reachByFormat.map((r) => r.value));
  return (
    <section className="card">
      <h2 className="card-title">Reach por formato</h2>
      {reachByFormat.map((r) => (
        <div key={r.label} className="bar-row">
          <span className="bar-label">{r.label}</span>
          <div className="bar-track">
            <div className="bar-fill" style={{ width: `${(r.value / max) * 100}%`, background: r.color }} />
          </div>
          <span className="bar-value">{r.value}</span>
        </div>
      ))}
    </section>
  );
}

function EngagementMix() {
  return (
    <section className="card">
      <h2 className="card-title">Mix de engagement</h2>
      <div className="donut-legend">
        {engagementMix.map((e) => (
          <div key={e.label} className="legend-item">
            <span className="legend-dot" style={{ background: e.color }} />
            <span>{e.label}</span>
            <strong style={{ color: e.color }}>{e.value}</strong>
          </div>
        ))}
      </div>
    </section>
  );
}

function Retention() {
  const max = 100;
  return (
    <section className="card">
      <h2 className="card-title">Retención de Reels</h2>
      {retention.map((r) => (
        <div key={r.label} className="bar-row">
          <span className="bar-label">{r.label}</span>
          <div className="bar-track">
            <div className="bar-fill" style={{ width: `${(r.value / max) * 100}%`, background: r.color }} />
          </div>
          <span className="bar-value">{r.value}%</span>
        </div>
      ))}
    </section>
  );
}

function Funnel() {
  return (
    <section className="card">
      <h2 className="card-title">Funnel de conversión</h2>
      {funnel.map((f) => (
        <div key={f.label} className="funnel-row">
          <span className="funnel-label">{f.label}</span>
          <div className="funnel-bar-wrap">
            <div className="funnel-bar" style={{ width: `${f.pct}%`, background: f.color }} />
          </div>
          <span className="funnel-value" style={{ color: f.color }}>{f.value}</span>
        </div>
      ))}
    </section>
  );
}

function Heatmap() {
  return (
    <section className="card">
      <h2 className="card-title">Mejor horario de posteo</h2>
      <div className="heatmap-grid">
        {heatmap.map((h, i) => (
          <div
            key={i}
            className="heat-cell"
            style={{ background: `rgba(88,230,255,${h.heat / 100})` }}
            title={`${h.day} ${h.hour}: ${h.heat}`}
          >
            <span>{h.day}</span>
            <span>{h.hour}</span>
          </div>
        ))}
      </div>
    </section>
  );
}

function TopContent() {
  const top = [...content].sort((a, b) => b.score - a.score).slice(0, 3);
  return (
    <section className="card">
      <h2 className="card-title">Top contenido</h2>
      {top.map((c, i) => (
        <div key={i} className="top-row">
          <span className="top-rank" style={{ color: scoreColor(c.score) }}>#{i + 1}</span>
          <div className="top-info">
            <p className="top-hook">{c.hook}</p>
            <span className="top-meta">{c.format} · {c.owner} · Score {c.score}</span>
          </div>
        </div>
      ))}
    </section>
  );
}

function Insights() {
  return (
    <section className="card">
      <h2 className="card-title">Insights de audiencia</h2>
      {insights.map(([title, text, color]) => (
        <div key={title} className="insight-row">
          <span className="insight-title" style={{ color }}>{title}</span>
          <p className="insight-text">{text}</p>
        </div>
      ))}
    </section>
  );
}

export default function OverviewView() {
  return (
    <div className="view-grid">
      <IGMetrics />
      <GrowthChart />
      <ReachByFormat />
      <EngagementMix />
      <Retention />
      <Funnel />
      <Heatmap />
      <TopContent />
      <Insights />
    </div>
  );
}
