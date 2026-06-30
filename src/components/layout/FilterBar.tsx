import { useCMStore } from '@/store';
import { content } from '@/data/mock';
import type { FormatKey } from '@/types';

const FORMATS: FormatKey[] = ['all', 'Reel', 'Carrusel', 'Stories', 'Ad'];
const owners = ['all', ...Array.from(new Set(content.map((c) => c.owner)))];

export default function FilterBar() {
  const { format, owner, search, setFormat, setOwner, setSearch } = useCMStore();
  return (
    <div className="filter-bar">
      <select value={format} onChange={(e) => setFormat(e.target.value as FormatKey)}>
        {FORMATS.map((f) => (
          <option key={f} value={f}>{f === 'all' ? 'Todos los formatos' : f}</option>
        ))}
      </select>
      <select value={owner} onChange={(e) => setOwner(e.target.value)}>
        {owners.map((o) => (
          <option key={o} value={o}>{o === 'all' ? 'Todos los dueños' : o}</option>
        ))}
      </select>
      <input
        type="text"
        placeholder="Buscar contenido..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
    </div>
  );
}
