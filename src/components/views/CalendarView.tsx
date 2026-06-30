import { content } from '@/data/mock';
import { useCMStore } from '@/store';
import { filteredContent } from '@/utils/helpers';

const DAYS = ['Lun', 'Mar', 'Mie', 'Jue', 'Vie', 'Sab', 'Dom'] as const;

const FORMAT_COLOR: Record<string, string> = {
  Reel:     '#58e6ff',
  Carrusel: '#d8ff63',
  Stories:  '#ff77bc',
  Ad:       '#ffc857',
};

export default function CalendarView() {
  const { format, owner, search } = useCMStore();
  const filtered = filteredContent(content, format, owner, search);

  return (
    <div className="calendar-wrap">
      <div className="calendar-grid">
        {DAYS.map((day) => (
          <div key={day} className="calendar-col">
            <div className="calendar-day-header">{day}</div>
            {filtered
              .filter((c) => c.day === day)
              .sort((a, b) => a.time.localeCompare(b.time))
              .map((c, i) => (
                <div
                  key={i}
                  className="cal-event"
                  style={{ borderLeft: `3px solid ${FORMAT_COLOR[c.format]}` }}
                  title={c.hook}
                >
                  <span className="cal-time">{c.time}</span>
                  <span className="cal-format" style={{ color: FORMAT_COLOR[c.format] }}>{c.format}</span>
                  <p className="cal-hook">{c.hook.slice(0, 55)}{c.hook.length > 55 ? '…' : ''}</p>
                  <span className="cal-owner">{c.owner}</span>
                </div>
              ))}
          </div>
        ))}
      </div>
    </div>
  );
}
