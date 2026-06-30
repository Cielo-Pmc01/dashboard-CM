import { useState } from 'react';
import { sources } from '@/data/mock';
import { MARCAS_ACTIVAS } from '@/data/brands';

interface Props { active: boolean; }

const OBJETIVOS = ['Consulta / DM', 'Reserva directa', 'WhatsApp', 'Visita al perfil', 'Guardar'];
const ANGULOS   = ['Experiencia POV', 'Testimonio de cliente', 'Tips prácticos', 'Antes / Después', 'Comparación destinos', 'Pregunta retórica'];
const TONOS     = [
  { label: 'Familiar / Cercano (TB)', value: 1 },
  { label: 'Premium / Inspirador (BE, PB)', value: 2 },
  { label: 'Joven / Viral (TC)', value: 3 },
  { label: 'Económico / Directo (TP)', value: 4 },
  { label: 'Portugués / Brasil (PBRS, TBBR)', value: 5 },
];

function generarHook(angulo: string, marca: string, tono: number): string {
  const hooks: Record<string, string[]> = {
    'Experiencia POV':         ['El día que [excursión] te cambia la perspectiva de la Patagonia.', 'Esto es lo que sentís cuando llegás al [destino] por primera vez.'],
    'Testimonio de cliente':   ['"Nunca pensé que Bariloche en invierno iba a ser tan increíble." — Familia de Buenos Aires.', '"La mejor decisión del viaje fue esta excursión." — Turista brasileño.'],
    'Tips prácticos':          ['Todo lo que nadie te dice antes de ir a [destino] en invierno.', '5 cosas que tenés que saber antes de reservar en Bariloche.'],
    'Antes / Después':         ['Antes: no sabíamos qué hacer en Bariloche. Después: hicimos [excursión] y queremos volver.', 'Llegaron sin plan. Se fueron con el mejor recuerdo de su vida.'],
    'Comparación destinos':    ['Si tenés que elegir entre el Circuito Chico y Cerro Campanario, este reel decide por vos.', 'Las 3 excursiones imperdibles de Bariloche — y cuál hacer primero.'],
    'Pregunta retórica':       ['¿Sabés qué pasa cuando bajás el Río Limay por primera vez? 🌊', '¿Nunca pisaste nieve? Esto es lo que sentís el primer día en Bariloche. ❄️'],
  };
  const pool = hooks[angulo] ?? hooks['Experiencia POV'];
  return pool[Math.floor(Math.random() * pool.length)];
}

export default function GeneratorView({ active }: Props) {
  const [source,    setSource]    = useState(sources[0].name);
  const [marcaSel,  setMarcaSel]  = useState(MARCAS_ACTIVAS[0].key);
  const [format,    setFormat]    = useState('Reel');
  const [objetivo,  setObjetivo]  = useState(OBJETIVOS[0]);
  const [angulo,    setAngulo]    = useState(ANGULOS[0]);
  const [tono,      setTono]      = useState(1);
  const [score,     setScore]     = useState(85);
  const [output,    setOutput]    = useState('');

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const hook = generarHook(angulo, marcaSel, tono);
    const newScore = 70 + tono * 4 + Math.floor(Math.random() * 10);
    setScore(Math.min(newScore, 99));
    setOutput(`
      <h3>${hook}</h3>
      <p><strong>Marca:</strong> ${marcaSel} · <strong>Formato:</strong> ${format} · <strong>Objetivo:</strong> ${objetivo} · <strong>Ángulo:</strong> ${angulo}.</p>
      <ol>
        <li><strong>Hook visual:</strong> ${hook}</li>
        <li><strong>Desarrollo:</strong> Mostrar la experiencia desde adentro — punto de vista del turista, no del vendedor.</li>
        <li><strong>Prueba social:</strong> Incluir reacción real o testimonio breve al final.</li>
        <li><strong>CTA claro:</strong> Una sola acción esperada — no mezclar.</li>
        <li><strong>Protocolo TM:</strong> Comunicación positiva. Sin "no te lo pierdas", sin negatividad. Vivilo hoy.</li>
      </ol>
      <p><strong>Fuente sugerida:</strong> ${source}</p>
    `);
  }

  return (
    <section className={`view${active ? ' active' : ''}`} id="generator">
      <div className="generator">
        <section className="panel">
          <div className="panel-head">
            <div>
              <p className="eyebrow">Generador TM</p>
              <h2>Crear pieza de contenido</h2>
            </div>
          </div>
          <form className="form-grid" onSubmit={handleSubmit}>
            <label>
              Marca
              <select value={marcaSel} onChange={(e) => setMarcaSel(e.target.value)}>
                {MARCAS_ACTIVAS.map((m) => (
                  <option key={m.key} value={m.key}>{m.nombre}</option>
                ))}
              </select>
            </label>
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
              <select value={objetivo} onChange={(e) => setObjetivo(e.target.value)}>
                {OBJETIVOS.map((o) => <option key={o}>{o}</option>)}
              </select>
            </label>
            <label>
              Ángulo
              <select value={angulo} onChange={(e) => setAngulo(e.target.value)}>
                {ANGULOS.map((a) => <option key={a}>{a}</option>)}
              </select>
            </label>
            <label>
              Tono de marca
              <select value={tono} onChange={(e) => setTono(Number(e.target.value))}>
                {TONOS.map((t) => <option key={t.value} value={t.value}>{t.label}</option>)}
              </select>
            </label>
            <button className="button primary" type="submit">Generar idea</button>
          </form>
        </section>

        <section className="panel output">
          <div className="panel-head">
            <div>
              <p className="eyebrow">Salida</p>
              <h2>Pieza lista para revisar</h2>
            </div>
            {output && <span className="badge reel">Score {score}</span>}
          </div>
          {output
            ? <div className="script-card" dangerouslySetInnerHTML={{ __html: output }} />
            : <div className="no-results">Completá el formulario y hacé click en "Generar idea".</div>
          }
        </section>
      </div>
    </section>
  );
}
