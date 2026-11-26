
import { useCartStore } from '../../stores/cartStore'
import { useMenuStore } from '../../stores/menuStore';
import './CartPage.css'
import Icon from "../../components/Icon";

interface CartPageProps {
  onNavigate: (page: "landing" | "menu" | "cart" | "payment" | "login" | "admin" | "staff" | "customer") => void
  isLoggedIn: boolean
}

function CartPage({ onNavigate, isLoggedIn }: CartPageProps) {
  const items = useCartStore((state) => state.items)
  const menuItems = useMenuStore((state) => state.menuItems) // Menyn från DynamoDB
  const addItem = useCartStore((state) => state.addItem)

  const cartProducts = Object.entries(items).flatMap(
    ([id, quantity]) => {
      const product = menuItems.find((item) => item.id === id)

      return product ? [{ ...product, quantity }] : []
    }
  )

  const total = cartProducts.reduce(
    (sum, product) => sum + product.price * product.quantity,
    0
  )

  const totalItems = cartProducts.reduce(
    (sum, product) => sum + product.quantity,
    0
  )

  const decreaseItem = (id: string) => {
    useCartStore.setState((state) => {
      const currentQuantity = state.items[id] ?? 0

      if (currentQuantity <= 1) {
        const updatedItems = { ...state.items }
        delete updatedItems[id]
        return { items: updatedItems }
      }

      return {
        items: {
          ...state.items,
          [id]: currentQuantity - 1,
        },
      }
    })
  }

  const removeItem = (id: string) => {
    useCartStore.setState((state) => {
      const updatedItems = { ...state.items }
      delete updatedItems[id]

      return { items: updatedItems }
    })
  }

  return (
    <main className="cart-page">
      <header className="cart-header">
        <button
          className="cart-back-button"
          onClick={() => onNavigate("menu")}
        >
          ← Back
        </button>

        <p className="cart-eyebrow">YOUR ORDER</p>
        <h1>Your Cart</h1>
        <p className="cart-item-count">
          {totalItems} {totalItems === 1 ? "item" : "items"} in your cart
        </p>
      </header>

      <section className="cart-content">
        {cartProducts.length === 0 ? (
          <div className="cart-empty">
            <h2>Your cart is empty</h2>
            <p>It looks like you haven’t added anything yet.</p>
          </div>
        ) : (
          <div className="cart-list">
            {cartProducts.map((product) => (
              <article className="cart-product" key={product.id}>
                <div
                  className="cart-product-icon"
                  style={{ backgroundColor: product.color }}
                >
                  ✦
                </div>

                <div className="cart-product-info">
                  <h2>{product.name}</h2>
                  <p>{product.price} kr each</p>
                </div>

                <div className="cart-product-controls">
                  <button
                    onClick={() => decreaseItem(product.id)}
                    aria-label={`Decrease quantity of ${product.name}`}
                  >
                    −
                  </button>

                  <span>{product.quantity}</span>

                  <button
                    onClick={() => addItem(product.id)}
                    aria-label={`Increase quantity of ${product.name}`}
                  >
                    +
                  </button>
                </div>

                <div className="cart-product-total">
                  {product.price * product.quantity} kr
                </div>

                <button
                  className="cart-remove-button"
                  onClick={() => removeItem(product.id)}
                  aria-label={`Remove ${product.name}`}
                >
                  <Icon name="remove" />
                </button>
              </article>
            ))}
          </div>
        )}
      </section>

      <footer className="cart-footer">
        <div className="cart-total">
          <span>Total</span>
          <strong>{total} kr</strong>
        </div>

        <button
          className="cart-checkout-button"
          onClick={() => onNavigate("payment")}
          disabled={cartProducts.length === 0}
        >
          Proceed to checkout →
        </button>

        {!isLoggedIn && (
          <p className="cart-login">
            Already have an account?{" "}
            <button type="button" onClick={() => onNavigate("login")}>
              Log in
            </button>
          </p>
        )}
      </footer>
    </main>
  )
}

export default CartPage
