
import type { Personnel } from "../data/demoAccounts";

const API_URL = import.meta.env.VITE_API_URL;

export const getPersonnel = async (): Promise<Personnel[]> => {
  const response = await fetch(`${API_URL}/personnel`);

  if (!response.ok) {
    throw new Error("Could not fetch personnel");
  }

  return response.json();
};

export const savePersonnel = async (person: Personnel): Promise<Personnel> => {
  const response = await fetch(`${API_URL}/personnel`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(person),
  });

  if (!response.ok) {
    throw new Error("Could not save personnel");
  }

  return response.json();
};

export const deletePersonnel = async (id: string): Promise<void> => {
  const response = await fetch(`${API_URL}/personnel/${id}`, {
    method: "DELETE",
  });

  if (!response.ok) {
    throw new Error("Could not delete personnel");
  }
};
