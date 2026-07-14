import type { MarcaKey } from '@/data/brands';

export type ViewKey   = 'overview' | 'pipeline' | 'calendar' | 'generator' | 'sources' | 'settings';
export type FormatKey = 'all' | 'Reel' | 'Carrusel' | 'Stories' | 'Ad';
export type MarcaFilter = 'all' | MarcaKey;

export interface ContentItem {
  id?:        number;
  marca:      MarcaKey;
  format:     'Reel' | 'Carrusel' | 'Stories' | 'Ad';
  status:     'Idea' | 'Guion' | 'Grabado' | 'Editado' | 'Aprobado' | 'Programado';
  aprobado?:  boolean;
  owner:      string;
  day:        string;
  time:       string;
  objective:  string;
  hook:       string;
  summary:    string;
  cta:        string;
  score:      number;
  copy?:              string | null;
  slides?:            string[];
  mediaCandidatos?:   string[];
  fechaPublicacion?:  string | null;
  origen?:            'catalogo' | 'brief_manual' | 'consulta_chatwoot' | 'tendencia';
  motivoRechazo?:     string | null;
}

export interface Source {
  name:    string;
  type:    string;
  summary: string;
  tags:    string[];
}

export interface IGMetric {
  label:  string;
  value:  string;
  delta:  string;
  detail: string;
  color:  string;
}

export interface EngagementEntry {
  label: string;
  value: string;
  color: string;
}

export interface FormatReachEntry {
  label: string;
  value: number;
  color: string;
}

export interface RetentionEntry {
  label: string;
  value: number;
  color: string;
}

export interface FunnelEntry {
  label: string;
  value: string;
  pct:   number;
  color: string;
}

export interface HeatCell {
  day:  string;
  hour: string;
  heat: number;
}
