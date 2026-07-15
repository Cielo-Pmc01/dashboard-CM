import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';

export interface ExcursionOption {
  id: number;
  nombre: string;
}

export function useExcursionCatalog() {
  const [excursiones, setExcursiones] = useState<ExcursionOption[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      const { data, error } = await supabase
        .from('excursion_catalog')
        .select('id, nombre')
        .eq('activa', true)
        .eq('temporada', 'invierno')
        .order('nombre', { ascending: true });
      if (!cancelled) {
        setExcursiones(error ? [] : (data as ExcursionOption[]));
        setLoading(false);
      }
    })();
    return () => { cancelled = true; };
  }, []);

  return { excursiones, loading };
}
