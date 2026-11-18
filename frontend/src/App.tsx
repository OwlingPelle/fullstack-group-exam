// import MenuPage from './pages/MenuPage/MenuPage'

// function App() {
//   return <MenuPage />
// }

// export default App



// TILLFÄLLIG FÖR ATT VISA BETALSIDAN::::::::::: TA BORT INNAN COMMIT!!!!!


import PaymentPage from './pages/PaymentPage/PaymentPage'
import { useCartStore } from './stores/cartStore'

// TILLFÄLLIGA PRODUKTER I VARUKORGEN:
useCartStore.setState({ items: { 'nerf-kebab': 1, 'comet-wings': 2 } })

function App() {
  // VISA BETALSIDAN DIREKT:::: (tills routing är igång)
  return (
    <PaymentPage
      onBack={() => console.log('Back pressed')}
      onPaid={() => console.log('Payment succeeded!')}
    />
  )
}

export default App