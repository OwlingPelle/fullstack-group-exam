import type { MenuItem } from "../data/demoMenu";

const API_URL = import.meta.env.VITE_API_URL;

export const getMenuItems = async (): Promise<MenuItem[]> => {
  const response = await fetch(`${API_URL}/menu`);

  if (!response.ok) {
    throw new Error("Could not fetch menu");
  }

  return response.json();
};

export const saveMenuItem = async (item: MenuItem): Promise<void> => {
  const response = await fetch(`${API_URL}/menu`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(item),
  });

  if (!response.ok) {
    throw new Error("Could not save menu item");
  }
};

export const deleteMenuItem = async (id: string): Promise<void> => {
  const response = await fetch(`${API_URL}/menu/${id}`, {
    method: "DELETE",
  });

  if (!response.ok) {
    throw new Error("Could not delete menu item");
  }
};