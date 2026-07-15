import { supabase } from '@/lib/supabase';

export async function approveItem(id: number) {
  const { error } = await supabase
    .from('content_pipeline')
    .update({ estado: 'Aprobado', aprobado: true, motivo_rechazo: null })
    .eq('id', id);
  if (error) throw error;
}

export async function editItem(id: number, fields: { hook?: string; summary?: string; copy?: string; cta?: string }) {
  const { error } = await supabase
    .from('content_pipeline')
    .update({ ...fields, estado: 'Guion' })
    .eq('id', id);
  if (error) throw error;
}

export async function rejectWithReason(id: number, motivo: string) {
  const { error } = await supabase
    .from('content_pipeline')
    .update({ estado: 'Idea', aprobado: false, motivo_rechazo: motivo })
    .eq('id', id);
  if (error) throw error;
}
