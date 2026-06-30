import { create } from 'zustand';
import type { ViewKey, FormatKey } from '@/types';

interface CMStore {
  view: ViewKey;
  format: FormatKey;
  owner: string;
  search: string;
  setView: (v: ViewKey) => void;
  setFormat: (f: FormatKey) => void;
  setOwner: (o: string) => void;
  setSearch: (s: string) => void;
}

export const useCMStore = create<CMStore>((set) => ({
  view:   'overview',
  format: 'all',
  owner:  'all',
  search: '',
  setView:   (view)   => set({ view }),
  setFormat: (format) => set({ format }),
  setOwner:  (owner)  => set({ owner }),
  setSearch: (search) => set({ search }),
}));
