import Icon from './Icon'

function BottomNav() {
  return (
    <nav className="bottom-nav" aria-label="Main navigation">
      <button className="nav-button" type="button" aria-current="page">
        <Icon name="menu" />
        <span>Menu</span>
      </button>
      <button className="nav-button" type="button">
        <Icon name="cart" />
        <span>Cart</span>
      </button>
      <button className="nav-button" type="button">
        <Icon name="user" />
        <span>Account</span>
      </button>
    </nav>
  )
}

export default BottomNav
