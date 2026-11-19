import { useState } from "react";
import LandingPage from "./pages/LandingPage/LandingPage";
import MenuPage from "./pages/MenuPage/MenuPage";
import LoginPanel from "./pages/LoginPanel/LoginPanel";

function App() {
  const [currentPage, setCurrentPage] = useState<"landing" | "menu" | "login">(
    "landing",
  );

  return (
    <>
      {currentPage === "landing" && <LandingPage onNavigate={setCurrentPage} />}
      {currentPage === "menu" && <MenuPage onNavigate={setCurrentPage} />}
      {currentPage === "login" && <LoginPanel />}
    </>
  );
}

export default App;
