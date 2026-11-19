import Icon from "./Icon";

interface BottomNavProps {
  currentPage?: "landing" | "menu" | "login" | "admin" | "staff" | "customer";
  onNavigate?: (page: "landing" | "menu" | "login" | "admin" | "staff" | "customer") => void;
}

function BottomNav({ currentPage = "menu", onNavigate }: BottomNavProps) {
  return (
    <nav className="bottom-nav" aria-label="Main navigation">
      {/* Home-knappen */}
      <button
        className="nav-button"
        type="button"
        onClick={() => onNavigate?.("landing")}
        aria-current={currentPage === "landing" ? "page" : undefined}
      >
        <Icon name="home" />
        <span>Home</span>
      </button>

      {/* Meny-knappen */}
      <button
        className="nav-button"
        type="button"
        onClick={() => onNavigate?.("menu")}
        aria-current={currentPage === "menu" ? "page" : undefined}
      >
        <Icon name="menu" />
        <span>Menu</span>
      </button>

      {/* Varukorg */}
      <button className="nav-button" type="button">
        <Icon name="cart" />
        <span>Cart</span>
      </button>

      <button
        className="nav-button"
        type="button"
        onClick={() => onNavigate?.("login")}
        aria-current={currentPage === "login" ? "page" : undefined}
      >
        <Icon name="user" />
        <span>Account</span>
      </button>
    </nav>
  );
}

export default BottomNav;
