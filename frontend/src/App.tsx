import { useState } from "react";
import LandingPage from "./pages/LandingPage/LandingPage";
import MenuPage from "./pages/MenuPage/MenuPage";

function App() {
  const [currentPage, setCurrentPage] = useState<"landing" | "menu">("landing");

  return (
    <>
      {currentPage === "landing" ? (
        <LandingPage onNavigate={setCurrentPage} />
      ) : (
        <MenuPage onNavigate={setCurrentPage} />
      )}
    </>
  );
}

export default App;
