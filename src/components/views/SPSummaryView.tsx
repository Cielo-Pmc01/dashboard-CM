import { useAuthStore } from '@/store/auth';
import { usePipelineSummary } from '@/hooks/usePipelineSummary';
import { MARCAS_ACTIVAS } from '@/data/brands';

const STATUSES = ['Idea', 'Guion', 'Grabado', 'Editado', 'Aprobado', 'Programado'] as const;

export default function SPSummaryView() {
  const { session, profile, signOut } = useAuthStore();
  const { summary, loading, error, refetch } = usePipelineSummary();

  return (
    <div className="sp-summary-shell">
      <header className="sp-summary-header">
        <div className="brand">
          <div className="mark">S</div>
          <div>
            <strong>SYK Command</strong>
            <span>Resumen de contenido</span>
          </div>
        </div>
        <div className="sp-summary-account">
          <span>{profile?.email ?? session?.user.email ?? ''}</span>
          <button type="button" className="button" onClick={() => void signOut()}>Salir</button>
        </div>
      </header>

      <main className="sp-summary-main">
        <p className="eyebrow">Content Command Center</p>
        <h1>Resumen de contenido CM</h1>
        <p className="hero-copy">
          Vista de solo lectura — cantidad de piezas por estado y por marca. El detalle y el copy
          completo lo maneja el equipo de CM.
        </p>

        {loading && <div className="no-results">Cargando resumen…</div>}
        {error && (
          <div className="no-results">
            Error cargando datos: {error} — <button className="button" onClick={refetch}>Reintentar</button>
          </div>
        )}

        {!loading && !error && (
          <>
            <section className="card sp-summary-section">
              <div className="card-title">Piezas por estado ({summary.total} en total)</div>
              <div className="mini-metrics">
                {STATUSES.map((estado) => (
                  <article key={estado} className="mini-metric">
                    <span>{estado}</span>
                    <strong>{summary.porEstado[estado] ?? 0}</strong>
                  </article>
                ))}
              </div>
            </section>

            <section className="card sp-summary-section">
              <div className="card-title">Piezas por marca</div>
              <div className="mini-metrics">
                {MARCAS_ACTIVAS.map((m) => (
                  <article
                    key={m.key}
                    className="mini-metric"
                    style={{ '--accent': m.color } as React.CSSProperties}
                  >
                    <span>{m.nombre}</span>
                    <strong>{summary.porMarca[m.key] ?? 0}</strong>
                  </article>
                ))}
              </div>
            </section>
          </>
        )}
      </main>
    </div>
  );
}
