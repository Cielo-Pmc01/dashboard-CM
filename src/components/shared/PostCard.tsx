import { scoreColor } from '@/utils/helpers';
import type { ContentItem } from '@/types';

const FORMAT_COLOR: Record<string, string> = {
  Reel:     '#58e6ff',
  Carrusel: '#d8ff63',
  Stories:  '#ff77bc',
  Ad:       '#ffc857',
};

const STATUS_COLOR: Record<string, string> = {
  Idea:       '#555',
  Guion:      '#9b7cff',
  Grabado:    '#58e6ff',
  Editado:    '#ffc857',
  Aprobado:   '#d8ff63',
  Programado: '#80ffb5',
};

interface Props {
  item: ContentItem;
}

export default function PostCard({ item }: Props) {
  return (
    <div className="post-card">
      <div className="post-card-header">
        <span className="badge" style={{ background: FORMAT_COLOR[item.format] + '22', color: FORMAT_COLOR[item.format] }}>
          {item.format}
        </span>
        <span className="badge" style={{ background: STATUS_COLOR[item.status] + '22', color: STATUS_COLOR[item.status] }}>
          {item.status}
        </span>
        <span className="score" style={{ color: scoreColor(item.score) }}>{item.score}</span>
      </div>
      <p className="post-hook">{item.hook}</p>
      <p className="post-summary">{item.summary}</p>
      <div className="post-meta">
        <span>{item.owner}</span>
        <span>{item.day} {item.time}</span>
        <span className="post-cta">{item.cta}</span>
      </div>
    </div>
  );
}
