import { content as allContent } from '@/data/mock';
import { useCMStore } from '@/store';
import { filteredContent } from '@/utils/helpers';

const DAYS = ['Lun', 'Mar', 'Mie', 'Jue', 'Vie', 'Sab', 'Dom'] as const;

interface Props { active: boolean; }

export default function CalendarView({ active }: Props) {
  const { format, owner, search } = useCMStore();
  const items = filteredContent(allContent, format, owner, search);

  return (
    <section className={`view${active ? ' active' : ''}`} id="calendar">
      <div className="panel">
        <div className="panel-head">
          <div>
            <p className="eyebrow">Semana mock</p>
            <h2>Calendario editorial</h2>
          </div>
        </div>
        <div className="calendar">
          {DAYS.map((day) => {
            const dayItems = items.filter((c) => c.day === day);
            return (
              <section key={day} className="day">
                <strong>{day}</strong>
                {dayItems.map((item, i) => (
                  <div key={i} className="calendar-item">
                    <span>{item.time} · {item.format}</span>
                    <p>{item.hook}</p>
                  </div>
                ))}
              </section>
            );
          })}
        </div>
      </div>
    </section>
  );
}
