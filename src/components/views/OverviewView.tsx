import { igMetrics, growthData, engagementMix, reachByFormat, retention, funnel, heatmap, insights, content as allContent } from '@/data/mock';
import { filteredContent } from '@/utils/helpers';
import { useCMStore } from '@/store';
import PostCard from '@/components/shared/PostCard';

function lineChart(values: number[]): string {
  const max = Math.max(...values);
  const min = Math.min(...values);
  const points = values.map((v, i) => {
    const x = (i / (values.length - 1)) * 100;
    const y = 92 - ((v - min) / (max - min)) * 78;
    return `${x.toFixed(2)},${y.toFixed(2)}`;
  }).join(' ');
  return `<svg viewBox="0 0 100 100" preserveAspectRatio="none" role="img" aria-label="Growth trend">
    <defs>
      <linearGradient id="growthStroke" x1="0" x2="1" y1="0" y2="0">
        <stop offset="0%" stop-color="#58e6ff"/>
        <stop offset="55%" stop-color="#d8ff63"/>
        <stop offset="100%" stop-color="#ff77bc"/>
      </linearGradient>
      <linearGradient id="growthFill" x1="0" x2="0" y1="0" y2="1">
        <stop offset="0%" stop-color="#58e6ff" stop-opacity="0.28"/>
        <stop offset="100%" stop-color="#58e6ff" stop-opacity="0"/>
      </linearGradient>
    </defs>
    <polygon points="0,100 ${points} 100,100" fill="url(#growthFill)"/>
    <polyline points="${points}" fill="none" stroke="url(#growthStroke)" stroke-width="2.8" vector-effect="non-scaling-stroke"/>
  </svg>`;
}

interface Props { active: boolean; }

export default function OverviewView({ active }: Props) {
  const { format, owner, search, marca } = useCMStore();
  const items = filteredContent(allContent, format, owner, search, marca);

  const ready   = items.filter((c) => ['Aprobado', 'Programado'].includes(c.status)).length;
  const blocked = items.filter((c) => c.score < 70).length;
  const avg     = Math.round(items.reduce((s, c) => s + c.score, 0) / Math.max(items.length, 1));
  const reels   = items.filter((c) => c.format === 'Reel').length;
  const opsData = [
    ['Piezas activas', items.length,    'Semana mock'],
    ['Listas',         ready,           'Aprobadas/programadas'],
    ['Score medio',    avg,             'Quality gate'],
    ['Reels',          reels,           'Motor principal'],
    ['Bloqueos',       blocked,         'Score bajo 70'],
    ['Publicables hoy',9,               'Mock operativo'],
  ] as const;

  const topItems = [...items].sort((a, b) => b.score - a.score).slice(0, 4);
  const alertItems = items.filter((c) => c.score < 75);

  return (
    <section className={`view${active ? ' active' : ''}`} id="overview">
      <div className="ig-dashboard">

        {/* IG Metrics */}
        <div className="metric-grid">
          {igMetrics.map((m) => (
            <article key={m.label} className="metric-card" style={{ '--accent': m.color } as React.CSSProperties}>
              <span>{m.label}</span>
              <strong>{m.value}</strong>
              <p>{m.detail}</p>
              <div className="delta">{m.delta}</div>
            </article>
          ))}
        </div>

        {/* Growth + Engagement */}
        <div className="analytics-grid">
          <section className="chart-card tall">
            <div className="chart-top">
              <div>
                <p className="eyebrow">Crecimiento 30 dias</p>
                <h2>Seguidores, alcance e interaccion</h2>
                <p>Mock de evolución diaria para ver tendencia, no data real.</p>
              </div>
              <div className="chart-value"><strong>+4.812</strong>net followers</div>
            </div>
            <div
              className="line-chart"
              dangerouslySetInnerHTML={{ __html: lineChart(growthData) }}
            />
          </section>

          <section className="chart-card tall">
            <div className="chart-top">
              <div>
                <p className="eyebrow">Mix engagement</p>
                <h2>Qué está generando acción</h2>
                <p>Likes, comentarios, saves, shares y DMs.</p>
              </div>
            </div>
            <div className="donut-wrap">
              <div className="donut" aria-label="Engagement rate 8.7%" />
              <div className="legend">
                {engagementMix.map((e) => (
                  <div key={e.label} className="legend-row" style={{ '--accent': e.color } as React.CSSProperties}>
                    <span className="legend-dot" />
                    <span>{e.label}</span>
                    <b>{e.value}</b>
                  </div>
                ))}
              </div>
            </div>
          </section>
        </div>

        {/* Format reach + Retention + Funnel */}
        <div className="analytics-grid three">
          <section className="chart-card">
            <div className="chart-top">
              <div>
                <p className="eyebrow">Alcance por formato</p>
                <h2>Reels vs carruseles vs stories</h2>
              </div>
              <div className="chart-value"><strong>1.42M</strong>reach</div>
            </div>
            <div
              className="bars-chart"
              style={{ '--count': reachByFormat.length } as React.CSSProperties}
            >
              {reachByFormat.map((r) => (
                <div key={r.label} className="bar-col" style={{ '--accent': r.color } as React.CSSProperties}>
                  <div className="bar-stack">
                    <div className="bar-fill" style={{ height: `${r.value}%` }} />
                  </div>
                  <span>{r.label}</span>
                </div>
              ))}
            </div>
          </section>

          <section className="chart-card">
            <div className="chart-top">
              <div>
                <p className="eyebrow">Retencion reels</p>
                <h2>Caida por tramo</h2>
              </div>
              <div className="chart-value"><strong>42%</strong>avg finish</div>
            </div>
            <div className="retention-list">
              {retention.map((r) => (
                <div key={r.label} className="retention-row">
                  <span>{r.label}</span>
                  <div className="meter">
                    <span style={{ '--score': `${r.value}%`, '--meter': `linear-gradient(90deg, ${r.color}, rgba(255,255,255,.18))` } as React.CSSProperties} />
                  </div>
                  <b>{r.value}%</b>
                </div>
              ))}
            </div>
          </section>

          <section className="chart-card">
            <div className="chart-top">
              <div>
                <p className="eyebrow">CTR / perfil</p>
                <h2>Ruta a DM y agenda</h2>
              </div>
              <div className="chart-value"><strong>3.9%</strong>CTR bio</div>
            </div>
            <div className="funnel-list">
              {funnel.map((f) => (
                <div key={f.label} className="funnel-step">
                  <div><span>{f.label}</span><b>{f.value}</b></div>
                  <div className="meter">
                    <span style={{ '--score': `${f.pct}%`, '--meter': `linear-gradient(90deg, ${f.color}, rgba(255,255,255,.18))` } as React.CSSProperties} />
                  </div>
                </div>
              ))}
            </div>
          </section>
        </div>

        {/* Heatmap + Ops */}
        <div className="analytics-grid">
          <section className="chart-card">
            <div className="chart-top">
              <div>
                <p className="eyebrow">Performance horario</p>
                <h2>Heatmap de publicación</h2>
                <p>Mock de intensidad por día/hora para decidir slots.</p>
              </div>
            </div>
            <div className="heatmap">
              {heatmap.map((h, i) => (
                <div key={i} className="heat-cell" style={{ '--heat': h.heat } as React.CSSProperties}>
                  {h.day}<span>{h.hour}</span>
                </div>
              ))}
            </div>
          </section>

          <section className="chart-card">
            <div className="chart-top">
              <div>
                <p className="eyebrow">Operación de contenido</p>
                <h2>Lo que hay que mirar hoy</h2>
              </div>
            </div>
            <div className="mini-metrics">
              {opsData.map(([label, value, detail]) => (
                <article key={label} className="mini-metric">
                  <span>{label}</span>
                  <strong>{value}</strong>
                  <p>{detail}</p>
                </article>
              ))}
            </div>
          </section>
        </div>

        {/* Top content + Alerts */}
        <div className="analytics-grid">
          <section className="chart-card">
            <div className="chart-top">
              <div>
                <p className="eyebrow">Piezas ganadoras</p>
                <h2>Contenido con más señal comercial</h2>
              </div>
            </div>
            <div className="content-list">
              {topItems.length > 0
                ? topItems.map((item, i) => <PostCard key={i} item={item} index={i} />)
                : <div className="no-results">Sin piezas para este filtro.</div>
              }
            </div>
          </section>

          <section className="chart-card">
            <div className="chart-top">
              <div>
                <p className="eyebrow">Alertas + insights</p>
                <h2>Control de calidad</h2>
              </div>
            </div>
            <div className="alerts">
              {alertItems.length > 0
                ? alertItems.map((item, i) => (
                    <div key={i} className="alert" style={{ '--accent': item.score < 65 ? 'var(--coral)' : 'var(--amber)' } as React.CSSProperties}>
                      <strong>{item.hook}</strong>
                      <p>Score {item.score}. Revisar tensión, CTA o grababilidad antes de aprobar.</p>
                    </div>
                  ))
                : <div className="alert" style={{ '--accent': 'var(--green)' } as React.CSSProperties}>
                    <strong>Sin rojos</strong>
                    <p>El filtro actual no tiene bloqueos fuertes.</p>
                  </div>
              }
            </div>
            <div className="insights" style={{ marginTop: 10 }}>
              {insights.map(([title, text, color]) => (
                <div key={title} className="insight" style={{ '--accent': color } as React.CSSProperties}>
                  <strong>{title}</strong>
                  <p>{text}</p>
                </div>
              ))}
            </div>
          </section>
        </div>

      </div>
    </section>
  );
}
