
import type { AdminProfile } from "../data/demoAccounts";

const API_URL = import.meta.env.VITE_API_URL;

export const getAdminAccount = async (
  id: string
): Promise<AdminProfile | null> => {
  const response = await fetch(`${API_URL}/account?id=${id}`);

  if (!response.ok) {
    throw new Error("Could not fetch admin account");
  }

  return response.json();
};

export const saveAdminAccount = async (
  account: AdminProfile
): Promise<void> => {
  const response = await fetch(`${API_URL}/account`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(account),
  });

  if (!response.ok) {
    throw new Error("Could not save admin account");
  }
};
