import { useState } from 'react';
import { content as allContent } from '@/data/mock';
import { useCMStore } from '@/store';
import { filteredContent } from '@/utils/helpers';
import PostCard from '@/components/shared/PostCard';

const STATUSES = ['Idea', 'Guion', 'Grabado', 'Editado', 'Aprobado', 'Programado'] as const;

interface Props { active: boolean; }

export default function PipelineView({ active }: Props) {
  const { format, search } = useCMStore();
  const [owner, setOwner] = useState('all');

  const owners = ['all', ...Array.from(new Set(allContent.map((c) => c.owner))).sort()];
  const items = filteredContent(allContent, format, owner, search);

  return (
    <section className={`view${active ? ' active' : ''}`} id="pipeline">
      <div className="panel">
        <div className="panel-head">
          <div>
            <p className="eyebrow">Workflow editorial</p>
            <h2>Pipeline de producción</h2>
          </div>
          <select value={owner} onChange={(e) => setOwner(e.target.value)}>
            {owners.map((o) => (
              <option key={o} value={o}>{o === 'all' ? 'Todos' : o}</option>
            ))}
          </select>
        </div>
        <div className="board">
          {STATUSES.map((status) => {
            const laneItems = items.filter((c) => c.status === status);
            return (
              <section key={status} className="lane">
                <div className="lane-head">
                  <span>{status}</span>
                  <b>{laneItems.length}</b>
                </div>
                {laneItems.length > 0
                  ? laneItems.map((item, i) => <PostCard key={i} item={item} index={i} />)
                  : <div className="no-results">Vacío</div>
                }
              </section>
            );
          })}
        </div>
      </div>
    </section>
  );
}
