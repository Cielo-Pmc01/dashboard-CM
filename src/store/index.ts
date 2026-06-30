import { create } from 'zustand';
import type { ViewKey, FormatKey, MarcaFilter } from '@/types';

interface CMStore {
  view:      ViewKey;
  format:    FormatKey;
  marca:     MarcaFilter;
  owner:     string;
  search:    string;
  setView:   (v: ViewKey)     => void;
  setFormat: (f: FormatKey)   => void;
  setMarca:  (m: MarcaFilter) => void;
  setOwner:  (o: string)      => void;
  setSearch: (s: string)      => void;
}

export const useCMStore = create<CMStore>((set) => ({
  view:      'overview',
  format:    'all',
  marca:     'all',
  owner:     'all',
  search:    '',
  setView:   (view)   => set({ view }),
  setFormat: (format) => set({ format }),
  setMarca:  (marca)  => set({ marca }),
  setOwner:  (owner)  => set({ owner }),
  setSearch: (search) => set({ search }),
}));
