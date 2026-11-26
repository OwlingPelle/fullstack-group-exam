import type { MenuItemApiType } from "../types/menu.types";

export const getMenu = async () : Promise<MenuItemApiType[]> => {
    // VITE_API_URL från frontend/.env.local - ALLA MÅSTE SKAPA DEN FILEN!!!
    const url : string = `${import.meta.env.VITE_API_URL}/menu`;

    const response : Response = await fetch(url);

    if (!response.ok) {
        throw new Error("Could not get the menu");
    }

    const data : MenuItemApiType[] = await response.json();

    return data;
};
