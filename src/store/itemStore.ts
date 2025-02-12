import { create } from 'zustand';

export interface Item {
  id: string;
  title: string;
  description: string;
}

interface ItemStore {
  items: Item[];
  addItem: (item: Omit<Item, 'id'>) => void;
}

export const useItemStore = create<ItemStore>((set) => ({
  items: [],
  addItem: (item) =>
    set((state) => ({
      items: [
        ...state.items,
        {
          ...item,
          id: Math.random().toString(36).substring(7),
        },
      ],
    })),
}));