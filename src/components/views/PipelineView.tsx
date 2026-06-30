import { content } from '@/data/mock';
import { useCMStore } from '@/store';
import { filteredContent } from '@/utils/helpers';
import PostCard from '@/components/shared/PostCard';

const STATUSES = ['Idea', 'Guion', 'Grabado', 'Editado', 'Aprobado', 'Programado'] as const;

export default function PipelineView() {
  const { format, owner, search } = useCMStore();
  const filtered = filteredContent(content, format, owner, search);

  return (
    <div className="pipeline-board">
      {STATUSES.map((status) => {
        const col = filtered.filter((c) => c.status === status);
        return (
          <div key={status} className="pipeline-col">
            <div className="pipeline-col-header">
              <span>{status}</span>
              <span className="pipeline-count">{col.length}</span>
            </div>
            <div className="pipeline-cards">
              {col.map((item, i) => (
                <PostCard key={i} item={item} />
              ))}
              {col.length === 0 && <p className="empty-col">Sin contenido</p>}
            </div>
          </div>
        );
      })}
    </div>
  );
}
