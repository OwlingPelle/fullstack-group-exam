import { useState } from "react";
import AdminPage from "./pages/AdminPage/AdminPage";
import LandingPage from "./pages/LandingPage/LandingPage";
import MenuPage from "./pages/MenuPage/MenuPage";

function App() {
  const [currentPage, setCurrentPage] = useState<"landing" | "menu" | "cart" | "admin">("landing");

  return (
    <>
      {currentPage === "admin" ? (
        <AdminPage onNavigate={setCurrentPage} />
      ) : currentPage === "landing" ? (
        <LandingPage onNavigate={setCurrentPage} />
      ) : (
        <MenuPage onNavigate={setCurrentPage} />
      )}
    </>
  );
}

export default App;
