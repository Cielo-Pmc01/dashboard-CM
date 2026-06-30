import { useCMStore } from '@/store';
import { MARCAS_ACTIVAS } from '@/data/brands';
import type { FormatKey, MarcaFilter } from '@/types';

const FORMATS: { key: FormatKey; label: string }[] = [
  { key: 'all',      label: 'Todo'       },
  { key: 'Reel',     label: 'Reels'      },
  { key: 'Carrusel', label: 'Carruseles' },
  { key: 'Stories',  label: 'Stories'    },
  { key: 'Ad',       label: 'Ads'        },
];

export default function FilterBar() {
  const { format, marca, search, setFormat, setMarca, setSearch } = useCMStore();

  function reset() {
    setFormat('all');
    setMarca('all');
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
        <select
          value={marca}
          onChange={(e) => setMarca(e.target.value as MarcaFilter)}
          style={{ minHeight: 40, padding: '0 10px', borderRadius: 'var(--radius)', border: '1px solid var(--line)', background: 'rgba(255,255,255,.07)', color: 'var(--text)', fontSize: 13 }}
        >
          <option value="all">Todas las marcas</option>
          {MARCAS_ACTIVAS.map((m) => (
            <option key={m.key} value={m.key}>{m.nombre}</option>
          ))}
        </select>
        <input
          className="search"
          type="search"
          placeholder="Buscar hook, marca, responsable..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <button className="icon-button" onClick={reset} title="Limpiar filtros">R</button>
      </div>
    </div>
  );
}
