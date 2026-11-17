export type MenuCategory = 'Main dishes' | 'Small plates' | 'Drinks' | 'Desserts'

export interface MenuItem {
  id: string
  name: string
  description: string
  price: number
  category: MenuCategory
  color: string
}

export const menuCategories = ['All', 'Main dishes', 'Small plates', 'Drinks', 'Desserts'] as const

export const menuItems: MenuItem[] = [
  {
    id: 'nerf-kebab',
    name: 'Nerf Kebab',
    description: 'Tender tortillas, crispy browned onions, grilled mayo and ice cream.',
    price: 129,
    category: 'Main dishes',
    color: '#f36a2b',
  },
  {
    id: 'black-sesame-macaron',
    name: 'Black Sesame Macaron',
    description: 'Smoky veggie burger, cheddar and caramelized onions.',
    price: 169,
    category: 'Main dishes',
    color: '#df4030',
  },
  {
    id: 'nebulosa-ramen',
    name: 'Nebulosa-ramen',
    description: 'Miso broth, noodles, marinated egg, mushrooms and spring onion.',
    price: 155,
    category: 'Main dishes',
    color: '#278f8c',
  },
  {
    id: 'comet-wings',
    name: 'Comet Wings',
    description: 'Crispy chicken wings with a hot honey glaze.',
    price: 99,
    category: 'Small plates',
    color: '#ffba37',
  },
  {
    id: 'meteor-fries',
    name: 'Meteor Fries',
    description: 'Golden fries with house seasoning and a smoky dip.',
    price: 59,
    category: 'Small plates',
    color: '#cf7d38',
  },
  {
    id: 'stardust-soda',
    name: 'Stardust Soda',
    description: 'A sparkling citrus drink with a little cosmic kick.',
    price: 35,
    category: 'Drinks',
    color: '#83b9cb',
  },
  {
    id: 'moon-pie',
    name: 'Moon Pie',
    description: 'Warm chocolate brownie with vanilla cream.',
    price: 69,
    category: 'Desserts',
    color: '#9c6c8c',
  },
]
