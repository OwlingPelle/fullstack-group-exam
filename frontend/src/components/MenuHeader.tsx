import Icon from './Icon'

interface MenuHeaderProps {
  cartCount: number
  onNavigate?: (page: "landing" | "menu" | "cart" | "login" | "admin" | "staff" | "customer") => void
}

function MenuHeader({ cartCount, onNavigate }: MenuHeaderProps) {
  return (
    <>
      <header className="menu-header">
        <div>
          <p className="opening-hours">Open 17–01</p>
          <h1 className="brand-name">STARS CANTINA</h1>
        </div>
        <button
          className="cart-button"
          type="button"
          aria-label={`Cart, ${cartCount} items`}
          onClick={() => onNavigate?.("cart")}
        >
          <Icon name="cart" />
          <span className="cart-count" aria-live="polite">{cartCount}</span>
        </button>
      </header>
      <div className="colour-stripes" aria-hidden="true" />
    </>
  )
}

export default MenuHeader