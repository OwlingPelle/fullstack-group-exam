// Använder samma typer som menysidan, så att alla delar av appen pratar samma "språk"
import type { MenuItem, MenuItemApiType } from "../types/menu.types";

const API_URL = import.meta.env.VITE_API_URL;

// Gör om en rätt från backend-formatet till frontend-formatet.
// Samma tanke som toMenuItem i menuStore.ts.
const toMenuItem = (item: MenuItemApiType): MenuItem => ({
  id: item.itemId,
  name: item.title,
  description: item.description,
  price: item.price,
  category: item.category === "food" ? "Main dishes" : "Drinks",
  color: item.category === "food" ? "#f36a2b" : "#83b9cb",
  image: item.image,
});

// Gör om åt andra hållet: från frontend-formatet till det backend vill ha
const toApiItem = (item: MenuItem): MenuItemApiType => ({
  itemId: item.id,
  title: item.name,
  description: item.description,
  price: item.price,
  category: item.category === "Drinks" ? "drinks" : "food",
  image: item.image ?? "", // tom sträng om rätten saknar bild
});

// Hämtar alla rätter och översätter dem till frontend-formatet
export const getMenuItems = async (): Promise<MenuItem[]> => {
  const response = await fetch(`${API_URL}/menu`);

  if (!response.ok) {
    throw new Error("Could not fetch menu");
  }

  const apiItems: MenuItemApiType[] = await response.json();
  return apiItems.map(toMenuItem);
};

// Översätter rätten till backend-formatet innan den skickas
export const saveMenuItem = async (item: MenuItem): Promise<void> => {
  const response = await fetch(`${API_URL}/menu`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(toApiItem(item)),
  });

  if (!response.ok) {
    throw new Error("Could not save menu item");
  }
};

// id:t i frontend är samma som itemId i backend, så det kan skickas som det är
export const deleteMenuItem = async (id: string): Promise<void> => {
  const response = await fetch(`${API_URL}/menu/${id}`, {
    method: "DELETE",
  });

  if (!response.ok) {
    throw new Error("Could not delete menu item");
  }
};