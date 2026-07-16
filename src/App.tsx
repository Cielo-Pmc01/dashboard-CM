import '@/style.css';
import { useCMStore } from '@/store';
import { useAuthStore } from '@/store/auth';
import { LoginScreen } from '@/components/auth/LoginScreen';
import SPSummaryView from '@/components/views/SPSummaryView';
import Rail          from '@/components/layout/Rail';
import FilterBar     from '@/components/layout/FilterBar';
import OverviewView  from '@/components/views/OverviewView';
import PipelineView  from '@/components/views/PipelineView';
import CalendarView  from '@/components/views/CalendarView';
import GeneratorView from '@/components/views/GeneratorView';
import SourcesView   from '@/components/views/SourcesView';
import SettingsView  from '@/components/views/SettingsView';

export default function App() {
  const { view, setView } = useCMStore();
  const { status, profile } = useAuthStore();

  if (status === 'loading') {
    return (
      <div className="loading-overlay">
        <div className="loading-spinner" />
        <div>Cargando…</div>
      </div>
    );
  }

  if (status === 'signedOut') {
    return <LoginScreen />;
  }

  if (profile && profile.role !== 'cm' && profile.role !== 'admin') {
    return <SPSummaryView />;
  }

  return (
    <div className="app">
      <Rail />
      <main className="main">
        <section className="hero">
          <div className="hero-inner">
            <div>
              <p className="eyebrow">SYK Content Command Center</p>
              <h1>IG Performance Command Center.</h1>
              <p className="hero-copy">
                Tablero principal con métricas mock de Instagram, gráficos, señales de contenido
                y las otras pestañas operativas listas sin tocar Meta ni consultar APIs reales.
              </p>
              <div className="hero-actions">
                <button className="button primary" onClick={() => setView('generator')}>Crear pieza mock</button>
                <button className="button"         onClick={() => setView('pipeline')}>Ver pipeline</button>
                <button className="button"         onClick={() => setView('settings')}>IG offline</button>
              </div>
            </div>
            <div className="command-strip" aria-label="Estado operativo">
              <div className="command-card">
                <div className="row"><strong>Quality gate</strong><span>87%</span></div>
                <div className="pulse-bar"><span style={{ '--w': '87%' } as React.CSSProperties} /></div>
              </div>
              <div className="command-card">
                <div className="row"><strong>Publicables hoy</strong><span>9 piezas</span></div>
                <div className="pulse-bar"><span style={{ '--w': '68%' } as React.CSSProperties} /></div>
              </div>
              <div className="command-card">
                <div className="row"><strong>Bloqueos creativos</strong><span>2 rojos</span></div>
                <div className="pulse-bar"><span style={{ '--w': '24%' } as React.CSSProperties} /></div>
              </div>
            </div>
          </div>
        </section>

        <FilterBar />

        <OverviewView  active={view === 'overview'}  />
        <PipelineView  active={view === 'pipeline'}  />
        <CalendarView  active={view === 'calendar'}  />
        <GeneratorView active={view === 'generator'} />
        <SourcesView   active={view === 'sources'}   />
        <SettingsView  active={view === 'settings'}  />
      </main>
    </div>
  );
}
