import { useState } from 'react';
import { MARCAS_ACTIVAS } from '@/data/brands';
import { usePipelineContent } from '@/hooks/usePipelineContent';
import { useExcursionCatalog } from '@/hooks/useExcursionCatalog';

interface Props { active: boolean; }

type Modo = 'brief' | 'catalogo' | 'tendencia';

const WEBHOOK_BY_MODO: Record<Modo, string> = {
  brief: import.meta.env.VITE_CM_WEBHOOK_URL,
  catalogo: import.meta.env.VITE_CM_CATALOG_WEBHOOK_URL,
  tendencia: import.meta.env.VITE_CM_TREND_WEBHOOK_URL,
};

export default function GeneratorView({ active }: Props) {
  const [modo,    setModo]    = useState<Modo>('brief');
  const [brief,   setBrief]   = useState('');
  const [excursionId, setExcursionId] = useState<string>('azar');
  const [formato, setFormato] = useState<'Reel' | 'Carrusel' | 'Stories' | 'Ad'>('Reel');
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [resultCount, setResultCount] = useState<number | null>(null);
  const [resultLabel, setResultLabel] = useState<string | null>(null);
  const { refetch } = usePipelineContent();
  const { excursiones, loading: loadingExcursiones } = useExcursionCatalog();

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (modo === 'brief' && !brief.trim()) return;
    setLoading(true);
    setErrorMsg(null);
    setResultCount(null);
    setResultLabel(null);
    try {
      const body = modo === 'brief'
        ? { brief, formato }
        : modo === 'catalogo'
          ? { formato, ...(excursionId !== 'azar' ? { excursion_id: Number(excursionId) } : {}) }
          : { formato };
      const res = await fetch(WEBHOOK_BY_MODO[modo], {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      });
      if (!res.ok) throw new Error(`El generador respondió ${res.status}`);
      const data = await res.json();
      if (modo === 'catalogo') {
        setResultCount(data.count ?? null);
        setResultLabel(data.excursion_nombre ?? null);
      } else if (modo === 'tendencia') {
        setResultCount(data.count ?? null);
        setResultLabel(data.tema ?? null);
      } else {
        const rows = Array.isArray(data) ? data : [data];
        setResultCount(rows.length);
      }
      await refetch();
    } catch (err) {
      setErrorMsg(err instanceof Error ? err.message : 'Error generando contenido');
    } finally {
      setLoading(false);
    }
  }

  return (
    <section className={`view${active ? ' active' : ''}`} id="generator">
      <div className="generator">
        <section className="panel">
          <div className="panel-head">
            <div>
              <p className="eyebrow">Generador TM</p>
              <h2>Crear piezas para las {MARCAS_ACTIVAS.length} marcas</h2>
            </div>
          </div>

          <div className="filters" style={{ marginBottom: 14 }}>
            <button type="button" className={`chip${modo === 'brief' ? ' active' : ''}`} onClick={() => setModo('brief')}>Brief manual</button>
            <button type="button" className={`chip${modo === 'catalogo' ? ' active' : ''}`} onClick={() => setModo('catalogo')}>Desde catálogo</button>
            <button type="button" className={`chip${modo === 'tendencia' ? ' active' : ''}`} onClick={() => setModo('tendencia')}>Desde tendencia</button>
          </div>

          <form className="form-grid" onSubmit={handleSubmit}>
            {modo === 'brief' && (
              <label>
                Brief
                <textarea
                  value={brief}
                  onChange={(e) => setBrief(e.target.value)}
                  placeholder="Ej: Promocionar la excursión a Piedras Blancas para la temporada de nieve"
                  rows={4}
                  required
                />
              </label>
            )}
            {modo === 'catalogo' && (
              <label>
                Excursión
                <select value={excursionId} onChange={(e) => setExcursionId(e.target.value)} disabled={loadingExcursiones}>
                  <option value="azar">Cualquiera (al azar)</option>
                  {excursiones.map((exc) => (
                    <option key={exc.id} value={exc.id}>{exc.nombre}</option>
                  ))}
                </select>
              </label>
            )}
            {modo === 'tendencia' && (
              <p className="no-results">
                El generador busca en la web qué tema de nieve/invierno en Bariloche está generando interés esta semana y arma el contenido sobre eso — no hace falta elegir nada más.
              </p>
            )}
            <label>
              Formato
              <select value={formato} onChange={(e) => setFormato(e.target.value as typeof formato)}>
                <option>Reel</option>
                <option>Carrusel</option>
                <option>Stories</option>
                <option>Ad</option>
              </select>
            </label>
            <button className="button primary" type="submit" disabled={loading}>
              {loading
                ? (modo === 'tendencia' ? 'Investigando y generando…' : 'Generando para las 9 marcas…')
                : 'Generar contenido'}
            </button>
          </form>
        </section>

        <section className="panel output">
          <div className="panel-head">
            <div>
              <p className="eyebrow">Resultado</p>
              <h2>Estado de la generación</h2>
            </div>
          </div>
          {errorMsg && <div className="no-results">{errorMsg}</div>}
          {resultCount !== null && !errorMsg && (
            <div className="no-results">
              Se generaron {resultCount} piezas{resultLabel ? ` sobre "${resultLabel}"` : ''} — revisalas en la pestaña Pipeline, columna "Idea".
            </div>
          )}
          {!errorMsg && resultCount === null && !loading && (
            <div className="no-results">
              {modo === 'brief' && 'Completá el brief y hacé click en "Generar contenido".'}
              {modo === 'catalogo' && 'Elegí una excursión (o dejá "al azar") y hacé click en "Generar contenido".'}
              {modo === 'tendencia' && 'Hacé click en "Generar contenido" — puede tardar un poco más porque primero investiga en la web.'}
            </div>
          )}
        </section>
      </div>
    </section>
  );
}
