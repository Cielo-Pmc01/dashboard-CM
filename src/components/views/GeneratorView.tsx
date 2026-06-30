import { useState } from 'react';
import { PALETTE } from '@/data/mock';

const FORMATS   = ['Reel', 'Carrusel', 'Stories', 'Ad'];
const OBJ       = ['DM', 'Agenda', 'Venta', 'Registro', 'Tráfico a perfil'];
const ANGLES    = ['Objeción', 'Dolor', 'Creencia errónea', 'Historia', 'Comparación', 'Pregunta retórica'];

export default function GeneratorView() {
  const [formFmt,  setFormFmt]  = useState('Reel');
  const [formObj,  setFormObj]  = useState('DM');
  const [formAng,  setFormAng]  = useState('Objeción');
  const [generated, setGenerated] = useState<{ hook: string; cta: string; pair: [string, string] } | null>(null);

  function generate() {
    const hooks: Record<string, string[]> = {
      Objeción:           ['Lo que te dijeron sobre {tema} es mentira.', 'No es que no tenes clientes. Es que no tenes mensaje.'],
      Dolor:              ['Si seguís esperando que el algoritmo te salve, estás perdido.', 'La audiencia no te ignora. Te ignora a vos porque tu contenido es genérico.'],
      'Creencia errónea': ['Postear más no arregla un mensaje que no hace elegir.', 'Engagement sin DMs no es crecimiento: es entretenimiento.'],
      Historia:           ['El día que dupliqué mis DMs no publiqué más. Publiqué mejor.', 'Me tardé 6 meses en entender que el problema no era el formato.'],
      Comparación:        ['Un reel con tensión vs un reel educativo. Spoiler: uno genera DMs.', 'Antes vs después de tener sistema de demanda.'],
      'Pregunta retórica': ['¿Cuántos seguidores necesitás para vender lo que vendés?', '¿Por qué tu perfil tiene 10K y tus DMs están vacíos?'],
    };
    const ctas: Record<string, string> = {
      DM: 'Comentá SISTEMA',  Agenda: 'Mandá AGENDA', Venta: 'Mandá LLAMADA',
      Registro: 'Registrate', 'Tráfico a perfil': 'Ir al perfil',
    };
    const pool = hooks[formAng] ?? hooks['Objeción'];
    const hook = pool[Math.floor(Math.random() * pool.length)];
    const pair = PALETTE[Math.floor(Math.random() * PALETTE.length)];
    setGenerated({ hook, cta: ctas[formObj] ?? 'Comentá', pair });
  }

  return (
    <div className="generator-wrap">
      <section className="card generator-form">
        <h2 className="card-title">Generador de contenido</h2>
        <div className="gen-fields">
          <label>
            Formato
            <select value={formFmt} onChange={(e) => setFormFmt(e.target.value)}>
              {FORMATS.map((f) => <option key={f}>{f}</option>)}
            </select>
          </label>
          <label>
            Objetivo
            <select value={formObj} onChange={(e) => setFormObj(e.target.value)}>
              {OBJ.map((o) => <option key={o}>{o}</option>)}
            </select>
          </label>
          <label>
            Ángulo
            <select value={formAng} onChange={(e) => setFormAng(e.target.value)}>
              {ANGLES.map((a) => <option key={a}>{a}</option>)}
            </select>
          </label>
        </div>
        <button className="gen-btn" onClick={generate}>Generar idea</button>
      </section>

      {generated && (
        <section className="card generator-result">
          <h3 className="card-title">Resultado</h3>
          <div className="gen-hook" style={{ background: `linear-gradient(135deg,${generated.pair[0]}22,${generated.pair[1]}22)`, borderColor: generated.pair[0] }}>
            <p>{generated.hook}</p>
          </div>
          <div className="gen-meta">
            <span>Formato: <strong>{formFmt}</strong></span>
            <span>Objetivo: <strong>{formObj}</strong></span>
            <span>Ángulo: <strong>{formAng}</strong></span>
          </div>
          <div className="gen-cta-block">
            <span>CTA sugerido:</span>
            <strong className="gen-cta">{generated.cta}</strong>
          </div>
        </section>
      )}
    </div>
  );
}
