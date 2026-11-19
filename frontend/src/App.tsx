
import { useEffect, useState } from 'react'
import MenuPage from './pages/MenuPage/MenuPage'
import CartPage from './pages/CartPage/CartPage'

function App() {
  const [showCart, setShowCart] = useState(
    window.location.hash === '#cart'
  )

  useEffect(() => {
    const handleHashChange = () => {
      setShowCart(window.location.hash === '#cart')
    }

    window.addEventListener('hashchange', handleHashChange)

    return () => {
      window.removeEventListener('hashchange', handleHashChange)
    }
  }, [])

  return showCart ? <CartPage /> : <MenuPage />
}

export default App
