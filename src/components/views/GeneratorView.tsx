import { useState } from 'react';
import { sources } from '@/data/mock';

interface Props { active: boolean; }

export default function GeneratorView({ active }: Props) {
  const [source,    setSource]    = useState(sources[0].name);
  const [format,    setFormat]    = useState('Reel');
  const [objective, setObjective] = useState('DM');
  const [edge,      setEdge]      = useState(4);
  const [score,     setScore]     = useState(90);
  const [output,    setOutput]    = useState(generatorText(sources[0].name, 'Reel', 'DM', 4));

  function generatorText(src: string, fmt: string, obj: string, edgeVal: number): string {
    const tone = edgeVal >= 4 ? 'sin anestesia' : 'directo pero más didáctico';
    return `<h3>Tu contenido no vende porque no hace elegir.</h3>
      <p><strong>Fuente:</strong> ${src} · <strong>Formato:</strong> ${fmt} · <strong>Objetivo:</strong> ${obj} · <strong>Tono:</strong> ${tone}.</p>
      <ol>
        <li><strong>Hook:</strong> Si tu contenido no incomoda a nadie, probablemente tampoco mueve a nadie.</li>
        <li><strong>Diagnóstico:</strong> estás explicando demasiado y tensionando muy poco.</li>
        <li><strong>Reframe:</strong> el contenido no existe para demostrar que sabés. Existe para que el lead se mire al espejo.</li>
        <li><strong>Prueba:</strong> cada objeción real que atacás vuelve el DM más natural.</li>
        <li><strong>CTA:</strong> comentá SISTEMA y te muestro dónde se está perdiendo la conversación.</li>
      </ol>`;
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const newScore = 70 + edge * 5;
    setScore(newScore);
    setOutput(generatorText(source, format, objective, edge));
  }

  return (
    <section className={`view${active ? ' active' : ''}`} id="generator">
      <div className="generator">
        <section className="panel">
          <div className="panel-head">
            <div>
              <p className="eyebrow">Mock IA</p>
              <h2>Crear pieza</h2>
            </div>
          </div>
          <form className="form-grid" onSubmit={handleSubmit}>
            <label>
              Fuente
              <select value={source} onChange={(e) => setSource(e.target.value)}>
                {sources.map((s) => <option key={s.name}>{s.name}</option>)}
              </select>
            </label>
            <label>
              Formato
              <select value={format} onChange={(e) => setFormat(e.target.value)}>
                <option>Reel</option>
                <option>Carrusel</option>
                <option>Stories</option>
                <option>Ad</option>
              </select>
            </label>
            <label>
              Objetivo
              <select value={objective} onChange={(e) => setObjective(e.target.value)}>
                <option>DM</option>
                <option>Agenda</option>
                <option>Registro</option>
                <option>Venta</option>
                <option>Tráfico a perfil</option>
              </select>
            </label>
            <label>
              Nivel de filo
              <input type="range" min={1} max={5} value={edge} onChange={(e) => setEdge(Number(e.target.value))} />
            </label>
            <button className="button primary" type="submit">Generar mock</button>
          </form>
        </section>

        <section className="panel output">
          <div className="panel-head">
            <div>
              <p className="eyebrow">Salida</p>
              <h2>Guion listo para revisar</h2>
            </div>
            <span className="badge reel">Score {score}</span>
          </div>
          <div className="script-card" dangerouslySetInnerHTML={{ __html: output }} />
        </section>
      </div>
    </section>
  );
}
