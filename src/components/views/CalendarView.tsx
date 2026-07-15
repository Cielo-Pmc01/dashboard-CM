import { useState } from 'react';
import { usePipelineContent } from '@/hooks/usePipelineContent';
import { useCMStore } from '@/store';
import { filteredContent } from '@/utils/helpers';
import { MARCAS_ACTIVAS } from '@/data/brands';
import type { MarcaFilter } from '@/types';

const DAYS = ['Lun', 'Mar', 'Mie', 'Jue', 'Vie', 'Sab', 'Dom'] as const;

interface Props { active: boolean; }

export default function CalendarView({ active }: Props) {
  const { format, owner, search } = useCMStore();
  const { items: allContent, loading } = usePipelineContent();
  const [marcaCal, setMarcaCal] = useState<MarcaFilter>('all');

  const items = filteredContent(allContent, format, owner, search, marcaCal);

  return (
    <section className={`view${active ? ' active' : ''}`} id="calendar">
      <div className="panel">
        <div className="panel-head">
          <div>
            <p className="eyebrow">Por marca — como el calendario de Notion</p>
            <h2>Calendario editorial</h2>
          </div>
          <select value={marcaCal} onChange={(e) => setMarcaCal(e.target.value as MarcaFilter)}>
            <option value="all">Todas las marcas</option>
            {MARCAS_ACTIVAS.map((m) => (
              <option key={m.key} value={m.key}>{m.nombre}</option>
            ))}
          </select>
        </div>
        {loading && <div className="no-results">Cargando…</div>}
        {!loading && (
          <div className="calendar">
            {DAYS.map((day) => {
              const dayItems = items.filter((c) => c.day === day);
              return (
                <section key={day} className="day">
                  <strong>{day}</strong>
                  {dayItems.length === 0 && <p className="no-results">Sin piezas</p>}
                  {dayItems.map((item) => (
                    <div key={item.id} className="calendar-item">
                      <span>{item.time} · {item.format} · {item.marca}</span>
                      <p>{item.hook}</p>
                    </div>
                  ))}
                </section>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
}
