import { useCMStore } from '@/store';
import type { ViewKey } from '@/types';

const NAV: { key: ViewKey; icon: string; label: string }[] = [
  { key: 'overview',  icon: 'C',  label: 'Control'    },
  { key: 'pipeline',  icon: 'P',  label: 'Pipeline'   },
  { key: 'calendar',  icon: '7',  label: 'Calendario' },
  { key: 'generator', icon: 'AI', label: 'Generador'  },
  { key: 'sources',   icon: 'F',  label: 'Fuentes'    },
  { key: 'settings',  icon: 'IG', label: 'IG Ready'   },
];

export default function Rail() {
  const { view, setView } = useCMStore();
  return (
    <aside className="rail">
      <div className="brand">
        <div className="mark">S</div>
        <div>
          <strong>SYK Command</strong>
          <span>Content OS mock</span>
        </div>
      </div>

      <nav className="nav" aria-label="Vistas">
        {NAV.map((n) => (
          <button
            key={n.key}
            className={view === n.key ? 'active' : ''}
            onClick={() => setView(n.key)}
            title={n.label}
          >
            <i>{n.icon}</i><b>{n.label}</b>
          </button>
        ))}
      </nav>

      <div className="mini-card">
        <div className="signal">OFFLINE SAFE</div>
        <strong>Data mock local</strong>
        <span>Sin Meta API, sin fetch, sin llamadas externas.</span>
      </div>
    </aside>
  );
}
