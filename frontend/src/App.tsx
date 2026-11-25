import { useEffect, useState } from "react";
import AdminPage from "./pages/AdminPage/AdminPage";
import CustomerPage from "./pages/CustomerPage/CustomerPage";
import LandingPage from "./pages/LandingPage/LandingPage";
import LoginPanel from "./pages/LoginPanel/LoginPanel";
import MenuPage from "./pages/MenuPage/MenuPage";
import StaffPage from "./pages/StaffPage/StaffPage";
import CartPage from "./pages/CartPage/CartPage";
import PaymentPage from "./pages/PaymentPage/PaymentPage";
import { useMenuStore } from "./stores/menuStore";
import type { AccountRole, AuthSession } from "./api/auth";

type AppPage = "landing" | "menu" | "cart" | "payment" | "login" | "register" | "admin" | "staff" | "customer";

function App() {
  const [currentPage, setCurrentPage] = useState<AppPage>("landing");

  const [session, setSession] = useState<AuthSession | null>(null);
  const [registrationNotice, setRegistrationNotice] = useState("");

  function handleAuthenticated(authenticatedSession: AuthSession) {
    setSession(authenticatedSession);
    setRegistrationNotice("");
    setCurrentPage(authenticatedSession.role);
  }

  function handleRegistered(username: string) {
    setRegistrationNotice(`Account created for ${username}. You can now log in.`);
    setCurrentPage("login");
  }

  function handleLogout() {
    setSession(null);
    setCurrentPage("landing");
  }

  function handleNavigate(page: AppPage) {
    if (page === "login" && session) {
      setCurrentPage(session.role);
      return;
    }
    setCurrentPage(page);
  }

  const dashboardRole: AccountRole | null =
    currentPage === "admin" || currentPage === "staff" || currentPage === "customer"
      ? currentPage
      : null;
  const visiblePage =
    dashboardRole && session?.role !== dashboardRole ? "landing" : currentPage;

  // ---------- MENYN ----------
  // Hämtar menyn när appen startar
  const fetchMenu = useMenuStore((state) => state.fetchMenu);

  useEffect(() => {
    fetchMenu();
  }, [fetchMenu]);

  return (
    <>
      {visiblePage === "admin" && session ? (
        <AdminPage username={session.username} onNavigate={handleNavigate} onLogout={handleLogout} />
      ) : visiblePage === "staff" && session ? (
        <StaffPage username={session.username} onNavigate={handleNavigate} onLogout={handleLogout} />
      ) : visiblePage === "customer" && session ? (
        <CustomerPage username={session.username} onNavigate={handleNavigate} onLogout={handleLogout} />
      ) : visiblePage === "login" || visiblePage === "register" ? (
        <LoginPanel
          mode={visiblePage}
          onNavigate={handleNavigate}
          onAuthenticated={handleAuthenticated}
          onRegistered={handleRegistered}
          registrationNotice={registrationNotice}
        />
      ) : visiblePage === "landing" ? (
        <LandingPage onNavigate={handleNavigate} />
      ) : visiblePage === "cart" ? (
        <CartPage onNavigate={handleNavigate} isLoggedIn={session !== null} />
      ) : visiblePage === "payment" ? (
        <PaymentPage
          onBack={() => setCurrentPage("cart")}
          onPaid={() => setCurrentPage("landing")} />
      ) : (
        <MenuPage onNavigate={handleNavigate} />
      )}
    </>
  );
}

export default App;
