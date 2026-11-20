import { useState } from "react";
import AdminPage from "./pages/AdminPage/AdminPage";
import CustomerPage from "./pages/CustomerPage/CustomerPage";
import LandingPage from "./pages/LandingPage/LandingPage";
import LoginPanel from "./pages/LoginPanel/LoginPanel";
import MenuPage from "./pages/MenuPage/MenuPage";
import StaffPage from "./pages/StaffPage/StaffPage";
import CartPage from "./pages/CartPage/CartPage";
import PaymentPage from "./pages/PaymentPage/PaymentPage";

type AppPage = "landing" | "menu" | "cart" | "payment" | "login" | "admin" | "staff" | "customer";

function App() {
  const [currentPage, setCurrentPage] = useState<AppPage>("landing");

  return (
    <>
      {currentPage === "admin" ? (
        <AdminPage onNavigate={setCurrentPage} />
      ) : currentPage === "staff" ? (
        <StaffPage onNavigate={setCurrentPage} />
      ) : currentPage === "customer" ? (
        <CustomerPage onNavigate={setCurrentPage} />
      ) : currentPage === "login" ? (
        <LoginPanel onNavigate={setCurrentPage} />
      ) : currentPage === "landing" ? (
        <LandingPage onNavigate={setCurrentPage} />
      ) : currentPage === "cart" ? (
        <CartPage onNavigate={setCurrentPage} />
      ) : currentPage === "payment" ? (
        <PaymentPage
          onBack={() => setCurrentPage("cart")}
          onPaid={() => setCurrentPage("landing")} />
      ) : (
        <MenuPage onNavigate={setCurrentPage} />
      )}
    </>
  );
}

export default App;
