import { useCMStore } from '@/store';
import type { FormatKey } from '@/types';

const FORMATS: { key: FormatKey; label: string }[] = [
  { key: 'all',      label: 'Todo'       },
  { key: 'Reel',     label: 'Reels'      },
  { key: 'Carrusel', label: 'Carruseles' },
  { key: 'Stories',  label: 'Stories'    },
  { key: 'Ad',       label: 'Ads'        },
];

export default function FilterBar() {
  const { format, search, setFormat, setSearch } = useCMStore();

  function reset() {
    setFormat('all');
    setSearch('');
  }

  return (
    <div className="top-row">
      <div className="filters" id="formatFilters">
        {FORMATS.map((f) => (
          <button
            key={f.key}
            className={`chip${format === f.key ? ' active' : ''}`}
            onClick={() => setFormat(f.key)}
          >
            {f.label}
          </button>
        ))}
      </div>
      <div className="toolbar">
        <input
          className="search"
          type="search"
          placeholder="Buscar hook, CTA, responsable..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <button className="icon-button" onClick={reset} title="Limpiar filtros">R</button>
      </div>
    </div>
  );
}
