import { menuCategories } from '../types/menu.types'

interface CategoryFilterProps {
  selected: string
  onSelect: (category: string) => void
}

function CategoryFilter({ selected, onSelect }: CategoryFilterProps) {
  return (
    <nav className="category-list" aria-label="Filter menu by category">
      {menuCategories.map((category) => (
        <button
          aria-pressed={selected === category}
          className="category-button"
          key={category}
          onClick={() => onSelect(category)}
          type="button"
        >
          {category}
        </button>
      ))}
    </nav>
  )
}

export default CategoryFilter
