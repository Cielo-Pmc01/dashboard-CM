import { useState } from 'react';
import { PALETTE } from '@/data/mock';
import { MARCA_MAP } from '@/data/brands';
import { approveItem, editItem, rejectWithReason } from '@/lib/contentPipeline';
import type { ContentItem } from '@/types';

function scoreColor(score: number): string {
  if (score >= 86) return 'linear-gradient(90deg, var(--green), var(--lime))';
  if (score >= 74) return 'linear-gradient(90deg, var(--amber), var(--green))';
  return 'linear-gradient(90deg, var(--coral), var(--amber))';
}

interface Props {
  item:  ContentItem;
  index: number;
  onChanged?: () => void;
}

export default function PostCard({ item, index, onChanged }: Props) {
  const colors = PALETTE[index % PALETTE.length];
  const slug   = item.format.toLowerCase();
  const marca  = MARCA_MAP[item.marca];
  const [mode, setMode] = useState<'view' | 'edit' | 'reject'>('view');
  const [editHook, setEditHook] = useState(item.hook);
  const [editSummary, setEditSummary] = useState(item.summary);
  const [motivo, setMotivo] = useState('');
  const [busy, setBusy] = useState(false);

  async function handleApprove() {
    if (!item.id) return;
    setBusy(true);
    await approveItem(item.id);
    setBusy(false);
    onChanged?.();
  }

  async function handleSaveEdit() {
    if (!item.id) return;
    setBusy(true);
    await editItem(item.id, { hook: editHook, summary: editSummary });
    setBusy(false);
    setMode('view');
    onChanged?.();
  }

  async function handleReject() {
    if (!item.id || !motivo.trim()) return;
    setBusy(true);
    await rejectWithReason(item.id, motivo);
    setBusy(false);
    setMode('view');
    setMotivo('');
    onChanged?.();
  }

  return (
    <article className="post-card">
      <div className="thumb" style={{ '--a': colors[0], '--b': colors[1] } as React.CSSProperties} />
      <div className="card-body">
        <div className="card-top">
          <span className={`badge ${slug}`}>{item.format}</span>
          <span className="badge status">{item.status}</span>
          <span
            className="badge"
            style={{ background: marca.color + '22', color: marca.color, border: `1px solid ${marca.color}44` }}
          >
            {item.marca}
          </span>
        </div>

        {mode === 'edit' ? (
          <>
            <input value={editHook} onChange={(e) => setEditHook(e.target.value)} />
            <textarea value={editSummary} onChange={(e) => setEditSummary(e.target.value)} rows={3} />
          </>
        ) : (
          <>
            <h3>{item.hook}</h3>
            <p>{item.summary}</p>
          </>
        )}

        {item.motivoRechazo && mode === 'view' && (
          <p className="no-results">Rechazado: {item.motivoRechazo}</p>
        )}

        <div className="meta">
          <span>{item.owner}</span>
          <span>{item.day} {item.time}</span>
          <span>{item.objective}</span>
          <span>{item.cta}</span>
        </div>
        <div className="score-line">
          <div className="meter">
            <span style={{ '--score': `${item.score}%`, '--meter': scoreColor(item.score) } as React.CSSProperties} />
          </div>
          <div className="score">{item.score}</div>
        </div>

        {mode === 'reject' ? (
          <div className="form-grid">
            <input
              value={motivo}
              onChange={(e) => setMotivo(e.target.value)}
              placeholder="Motivo (ej: cambiar el ángulo, muy largo)"
            />
            <div className="card-actions">
              <button className="button small" disabled={busy} onClick={() => setMode('view')}>Cancelar</button>
              <button className="button primary small" disabled={busy || !motivo.trim()} onClick={handleReject}>Confirmar rechazo</button>
            </div>
          </div>
        ) : mode === 'edit' ? (
          <div className="card-actions">
            <button className="button small" disabled={busy} onClick={() => setMode('view')}>Cancelar</button>
            <button className="button primary small" disabled={busy} onClick={handleSaveEdit}>Guardar</button>
          </div>
        ) : (
          <div className="card-actions">
            <button className="button primary small" disabled={busy || item.status === 'Aprobado'} onClick={handleApprove}>Aprobar</button>
            <button className="button small" disabled={busy} onClick={() => setMode('edit')}>Editar a mano</button>
            <button className="button small" disabled={busy} onClick={() => setMode('reject')}>Rechazar</button>
          </div>
        )}
      </div>
    </article>
  );
}
