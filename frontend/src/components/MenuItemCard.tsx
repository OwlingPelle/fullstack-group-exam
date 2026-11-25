import type { MenuItem } from '../data/demoMenu'

interface MenuItemCardProps {
  item: MenuItem
  onAdd: (id: string) => void
}

function MenuItemCard({ item, onAdd }: MenuItemCardProps) {
  return (
    <article className="menu-item">
      {/* <div className="dish-art" style={{ backgroundColor: item.color }} aria-hidden="true" /> */}
      
      {/* Om rätten har en bild visas den i cirkeln.
          Färgen ligger kvar under och syns om bilden saknas. */}
      <div
        className="dish-art"
        style={{
          backgroundColor: item.color,
          // url(...) är hur CSS anger en bild. Ingen bild → undefined (ingen bakgrundsbild)
          backgroundImage: item.image ? `url(${item.image})` : undefined,
          backgroundSize: 'cover',     // bilden fyller hela cirkeln
          backgroundPosition: 'center' // bilden centreras
        }}
        aria-hidden="true"
      />
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
