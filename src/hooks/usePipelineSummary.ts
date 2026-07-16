import { useCallback, useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';

interface SummaryRow {
  marca: string;
  estado: string;
  total: number;
}

export interface PipelineSummary {
  total: number;
  porEstado: Record<string, number>;
  porMarca: Record<string, number>;
}

const EMPTY: PipelineSummary = { total: 0, porEstado: {}, porMarca: {} };

export function usePipelineSummary() {
  const [summary, setSummary] = useState<PipelineSummary>(EMPTY);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const refetch = useCallback(async () => {
    setLoading(true);
    setError(null);
    const { data, error: err } = await supabase.from('pipeline_summary').select('*');
    if (err) {
      setError(err.message);
      setSummary(EMPTY);
    } else {
      const rows = data as SummaryRow[];
      const porEstado: Record<string, number> = {};
      const porMarca: Record<string, number> = {};
      let total = 0;
      for (const row of rows) {
        porEstado[row.estado] = (porEstado[row.estado] ?? 0) + row.total;
        porMarca[row.marca] = (porMarca[row.marca] ?? 0) + row.total;
        total += row.total;
      }
      setSummary({ total, porEstado, porMarca });
    }
    setLoading(false);
  }, []);

  useEffect(() => { refetch(); }, [refetch]);

  return { summary, loading, error, refetch };
}
