import { useCMStore } from '@/store';
import type { ViewKey } from '@/types';

const NAV: { key: ViewKey; label: string; icon: string }[] = [
  { key: 'overview',  label: 'Overview',   icon: '◉' },
  { key: 'pipeline',  label: 'Pipeline',   icon: '▦' },
  { key: 'calendar',  label: 'Calendario', icon: '▦' },
  { key: 'generator', label: 'Generador',  icon: '✦' },
  { key: 'sources',   label: 'Fuentes',    icon: '◈' },
  { key: 'settings',  label: 'Config',     icon: '⚙' },
];

export default function Rail() {
  const { view, setView } = useCMStore();
  return (
    <nav className="rail">
      <div className="logo">SYK</div>
      {NAV.map((n) => (
        <button
          key={n.key}
          className={`nav-btn${view === n.key ? ' active' : ''}`}
          onClick={() => setView(n.key)}
          title={n.label}
        >
          <span className="nav-icon">{n.icon}</span>
          <span className="nav-label">{n.label}</span>
        </button>
      ))}
    </nav>
  );
}
