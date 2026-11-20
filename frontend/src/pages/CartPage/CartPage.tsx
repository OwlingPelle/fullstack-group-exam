
import { useCartStore } from '../../stores/cartStore'
import { menuItems } from "../../data/demoMenu";
import './CartPage.css'
import Icon from "../../components/Icon";

interface CartPageProps {
  onNavigate?: (page: "landing" | "menu" | "cart" | "payment" | "login" | "admin" | "staff" | "customer") => void
}

function CartPage({ onNavigate }: CartPageProps) {
  const items = useCartStore((state) => state.items)
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
          onClick={() => onNavigate?.("menu")}
        >
          ← Tillbaka
        </button>

        <p className="cart-eyebrow">DIN ORDER</p>
        <h1>Varukorg</h1>
        <p className="cart-item-count">
          {totalItems} produkter i din varukorg
        </p>
      </header>

      <section className="cart-content">
        {cartProducts.length === 0 ? (
          <div className="cart-empty">
            <h2>Din varukorg är tom</h2>
            <p>Det ser ut som att du inte har lagt till något ännu.</p>
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
                  <p>{product.price} kr / st</p>
                </div>

                <div className="cart-product-controls">
                  <button
                    onClick={() => decreaseItem(product.id)}
                    aria-label={`Minska antal ${product.name}`}
                  >
                    −
                  </button>

                  <span>{product.quantity}</span>

                  <button
                    onClick={() => addItem(product.id)}
                    aria-label={`Öka antal ${product.name}`}
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
                  aria-label={`Ta bort ${product.name}`}
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
          <span>Totalt</span>
          <strong>{total} kr</strong>
        </div>

        <button
          className="cart-checkout-button"
          onClick={() => onNavigate?.("payment")}
          disabled={cartProducts.length === 0}
        >
          Gå till betalning →
        </button>

        <p className="cart-login">
          Har du redan ett konto? <a href="/login">Logga in</a>
        </p>
      </footer>
    </main>
  )
}

export default CartPage
