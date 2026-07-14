import { useState } from 'react';
import { MARCAS_ACTIVAS } from '@/data/brands';
import { usePipelineContent } from '@/hooks/usePipelineContent';
import { useExcursionCatalog } from '@/hooks/useExcursionCatalog';

interface Props { active: boolean; }

type Modo = 'brief' | 'catalogo';

export default function GeneratorView({ active }: Props) {
  const [modo,    setModo]    = useState<Modo>('brief');
  const [brief,   setBrief]   = useState('');
  const [excursionId, setExcursionId] = useState<string>('azar');
  const [formato, setFormato] = useState<'Reel' | 'Carrusel' | 'Stories' | 'Ad'>('Reel');
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [resultCount, setResultCount] = useState<number | null>(null);
  const [resultExcursion, setResultExcursion] = useState<string | null>(null);
  const { refetch } = usePipelineContent();
  const { excursiones, loading: loadingExcursiones } = useExcursionCatalog();

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (modo === 'brief' && !brief.trim()) return;
    setLoading(true);
    setErrorMsg(null);
    setResultCount(null);
    setResultExcursion(null);
    try {
      const url = modo === 'brief' ? import.meta.env.VITE_CM_WEBHOOK_URL : import.meta.env.VITE_CM_CATALOG_WEBHOOK_URL;
      const body = modo === 'brief'
        ? { brief, formato }
        : { formato, ...(excursionId !== 'azar' ? { excursion_id: Number(excursionId) } : {}) };
      const res = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      });
      if (!res.ok) throw new Error(`El generador respondió ${res.status}`);
      const data = await res.json();
      if (modo === 'catalogo') {
        setResultCount(data.count ?? null);
        setResultExcursion(data.excursion_nombre ?? null);
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
          </div>

          <form className="form-grid" onSubmit={handleSubmit}>
            {modo === 'brief' ? (
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
            ) : (
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
              {loading ? 'Generando para las 9 marcas…' : 'Generar contenido'}
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
              Se generaron {resultCount} piezas{resultExcursion ? ` sobre "${resultExcursion}"` : ''} — revisalas en la pestaña Pipeline, columna "Idea".
            </div>
          )}
          {!errorMsg && resultCount === null && !loading && (
            <div className="no-results">
              {modo === 'brief'
                ? 'Completá el brief y hacé click en "Generar contenido".'
                : 'Elegí una excursión (o dejá "al azar") y hacé click en "Generar contenido".'}
            </div>
          )}
        </section>
      </div>
    </section>
  );
}
