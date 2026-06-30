import '@/style.css';
import { useCMStore } from '@/store';
import Rail from '@/components/layout/Rail';
import FilterBar from '@/components/layout/FilterBar';
import OverviewView   from '@/components/views/OverviewView';
import PipelineView   from '@/components/views/PipelineView';
import CalendarView   from '@/components/views/CalendarView';
import GeneratorView  from '@/components/views/GeneratorView';
import SourcesView    from '@/components/views/SourcesView';
import SettingsView   from '@/components/views/SettingsView';

const SHOW_FILTER: Record<string, boolean> = {
  pipeline: true,
  calendar: true,
};

export default function App() {
  const { view } = useCMStore();

  return (
    <div className="app-shell">
      <Rail />
      <div className="main-area">
        {SHOW_FILTER[view] && <FilterBar />}
        <div className="content-area">
          {view === 'overview'  && <OverviewView />}
          {view === 'pipeline'  && <PipelineView />}
          {view === 'calendar'  && <CalendarView />}
          {view === 'generator' && <GeneratorView />}
          {view === 'sources'   && <SourcesView />}
          {view === 'settings'  && <SettingsView />}
        </div>
      </div>
    </div>
  );
}
