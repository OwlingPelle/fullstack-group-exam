import "./MenuPage.css";
import { useMemo, useState } from "react";
import BottomNav from "../../components/BottomNav";
import CategoryFilter from "../../components/CategoryFilter";
import MenuHeader from "../../components/MenuHeader";
import MenuItemCard from "../../components/MenuItemCard";
import { useCartStore } from "../../stores/cartStore";
import { menuItems } from "../../utils/menuData";

// 1. Vi lägger till detta interface för att ta emot navigationen
interface MenuPageProps {
  onNavigate?: (page: "landing" | "menu" | "cart" | "admin") => void;
}

// 2. Vi lägger till { onNavigate } i funktionen
function MenuPage({ onNavigate }: MenuPageProps) {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const addItem = useCartStore((state) => state.addItem);
  const cartCount = useCartStore((state) => state.itemCount());

  const visibleItems = useMemo(
    () =>
      selectedCategory === "All"
        ? menuItems
        : menuItems.filter((item) => item.category === selectedCategory),
    [selectedCategory],
  );

  return (
    <main className="menu-page">
      <MenuHeader cartCount={cartCount} />
      <section className="menu-content" aria-label="Food and drinks menu">
        <CategoryFilter
          selected={selectedCategory}
          onSelect={setSelectedCategory}
        />
        <div className="menu-items">
          {visibleItems.map((item) => (
            <MenuItemCard item={item} key={item.id} onAdd={addItem} />
          ))}
        </div>
      </section>

      {/* 3. Vi skickar med propsen till BottomNav */}
      <BottomNav currentPage="menu" onNavigate={onNavigate} />
    </main>
  );
}

export default MenuPage;
