import "./MenuPage.css";
import { useMemo, useState } from "react";
import BottomNav from "../../components/BottomNav";
import CategoryFilter from "../../components/CategoryFilter";
import MenuHeader from "../../components/MenuHeader";
import MenuItemCard from "../../components/MenuItemCard";
import { useCartStore } from "../../stores/cartStore";
import { useMenuStore } from "../../stores/menuStore";


interface MenuPageProps {
  onNavigate?: (page: "landing" | "menu" | "cart" | "login" | "admin" | "staff" | "customer") => void;
}

function MenuPage({ onNavigate }: MenuPageProps) {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const addItem = useCartStore((state) => state.addItem);
  const cartCount = useCartStore((state) => state.itemCount());

  const menuItems = useMenuStore((state) => state.menuItems);
  const isLoading = useMenuStore((state) => state.isLoading);
  const isError = useMenuStore((state) => state.isError);

  const visibleItems = useMemo(
    () =>
      selectedCategory === "All"
        ? menuItems
        : menuItems.filter((item) => item.category === selectedCategory),
    [selectedCategory, menuItems],
  );

  return (
    <main className="menu-page page-frame">
      <MenuHeader cartCount={cartCount} onNavigate={onNavigate} />

      <section className="menu-content" aria-label="Food and drinks menu">
        <CategoryFilter
          selected={selectedCategory}
          onSelect={setSelectedCategory}
        />

        {isLoading && <p>Loading menu...</p>}
        {isError && <p>Something went wrong. Please try again later.</p>}

        <div className="menu-items">
          {visibleItems.map((item) => (
            <MenuItemCard item={item} key={item.id} onAdd={addItem} />
          ))}
        </div>
      </section>

      <BottomNav currentPage="menu" onNavigate={onNavigate} />
    </main>
  );
}

export default MenuPage;
