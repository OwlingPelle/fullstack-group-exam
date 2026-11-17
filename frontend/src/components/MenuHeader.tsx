import Icon from './Icon'

interface MenuHeaderProps {
  cartCount: number
}

function MenuHeader({ cartCount }: MenuHeaderProps) {
  return (
    <>
      <header className="menu-header">
        <div>
          <p className="opening-hours">Open 17–01</p>
          <h1 className="brand-name">STARS CANTINA</h1>
        </div>
        <button className="cart-button" type="button" aria-label={`Cart, ${cartCount} items`}>
          <Icon name="cart" />
          <span className="cart-count" aria-live="polite">{cartCount}</span>
        </button>
      </header>
      <div className="colour-stripes" aria-hidden="true" />
    </>
  )
}

export default MenuHeader
