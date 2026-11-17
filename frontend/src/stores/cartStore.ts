import { create } from 'zustand'

interface CartState {
  items: Record<string, number>
  addItem: (id: string) => void
  itemCount: () => number
}

export const useCartStore = create<CartState>((set, get) => ({
  items: {},
  addItem: (id) =>
    set((state) => ({
      items: {
        ...state.items,
        [id]: (state.items[id] ?? 0) + 1,
      },
    })),
  itemCount: () => Object.values(get().items).reduce((total, quantity) => total + quantity, 0),
}))
