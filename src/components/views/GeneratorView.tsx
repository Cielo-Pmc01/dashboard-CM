import { useState } from 'react';
import { MARCAS_ACTIVAS } from '@/data/brands';
import { usePipelineContent } from '@/hooks/usePipelineContent';

interface Props { active: boolean; }

export default function GeneratorView({ active }: Props) {
  const [brief,   setBrief]   = useState('');
  const [formato, setFormato] = useState<'Reel' | 'Carrusel' | 'Stories' | 'Ad'>('Reel');
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [resultCount, setResultCount] = useState<number | null>(null);
  const { refetch } = usePipelineContent();

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!brief.trim()) return;
    setLoading(true);
    setErrorMsg(null);
    setResultCount(null);
    try {
      const res = await fetch(import.meta.env.VITE_CM_WEBHOOK_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ brief, formato }),
      });
      if (!res.ok) throw new Error(`El generador respondió ${res.status}`);
      const data = await res.json();
      setResultCount(Array.isArray(data) ? data.length : null);
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
          <form className="form-grid" onSubmit={handleSubmit}>
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
              Se generaron {resultCount} piezas — revisalas en la pestaña Pipeline, columna "Idea".
            </div>
          )}
          {!errorMsg && resultCount === null && !loading && (
            <div className="no-results">Completá el brief y hacé click en "Generar contenido".</div>
          )}
        </section>
      </div>
    </section>
  );
}
