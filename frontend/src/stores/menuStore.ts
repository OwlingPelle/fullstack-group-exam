import { create } from 'zustand'
import type { MenuItem } from '../data/demoMenu'
import type { MenuItemApiType } from '../types/menu.types'
import { getMenu } from '../services/menu.api'

// VAd Finns i storen
interface MenuState {
  menuItems: MenuItem[]          
  isLoading: boolean
  isError: boolean
  fetchMenu: () => Promise<void> // Menyn hämtas ofh sparas i store
}

const toMenuItem = (item: MenuItemApiType): MenuItem => ({
  id: item.itemId,
  name: item.title,
  description: item.description,
  price: item.price,
  category: item.category === 'food' ? 'Main dishes' : 'Drinks',
  // Färgen är backup.. ska vi ha kvar???
  color: item.category === 'food' ? '#f36a2b' : '#83b9cb',
  image: item.image,
})

export const useMenuStore = create<MenuState>((set) => ({
  menuItems: [],
  isLoading: false,
  isError: false,

  fetchMenu: async (): Promise<void> => {
    // Visa "laddar" och nollställ eventuellt gammalt fel
    set({ isLoading: true, isError: false })

    try {
      const apiItems: MenuItemApiType[] = await getMenu()
      // Gör om varje rätt med toMenuItem
      const items: MenuItem[] = apiItems.map(toMenuItem)
      set({ menuItems: items, isLoading: false })
    } catch (error: unknown) {
      console.error(error)
      set({ isError: true, isLoading: false })
    }
  },
}))
