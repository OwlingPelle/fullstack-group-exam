import type { MenuItem } from '../utils/menuData'

interface MenuItemCardProps {
  item: MenuItem
  onAdd: (id: string) => void
}

function MenuItemCard({ item, onAdd }: MenuItemCardProps) {
  return (
    <article className="menu-item">
      <div className="dish-art" style={{ backgroundColor: item.color }} aria-hidden="true" />
      <div className="dish-details">
        <h2 className="dish-name">{item.name}</h2>
        <p className="dish-description">{item.description}</p>
        <div className="dish-actions">
          <span className="dish-price">{item.price} kr</span>
          <button className="add-button" onClick={() => onAdd(item.id)} type="button">
            + Add
          </button>
        </div>
      </div>
    </article>
  )
}

export default MenuItemCard
