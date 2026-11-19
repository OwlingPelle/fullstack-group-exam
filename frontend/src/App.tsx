import { useState } from "react";
import AdminPage from "./pages/AdminPage/AdminPage";
import LandingPage from "./pages/LandingPage/LandingPage";
import MenuPage from "./pages/MenuPage/MenuPage";
import StaffPage from "./pages/StaffPage/StaffPage";

function App() {
  const [currentPage, setCurrentPage] = useState<"landing" | "menu" | "admin" | "staff">("landing");

  return (
    <>
      {currentPage === "admin" ? (
        <AdminPage onNavigate={setCurrentPage} />
      ) : currentPage === "staff" ? (
        <StaffPage onNavigate={setCurrentPage} />
      ) : currentPage === "landing" ? (
        <LandingPage onNavigate={setCurrentPage} />
      ) : (
        <MenuPage onNavigate={setCurrentPage} />
      )}
    </>
  );
}

export default App;
