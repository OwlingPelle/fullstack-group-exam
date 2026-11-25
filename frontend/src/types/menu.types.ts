export type MenuCategory = "Main dishes" | "Drinks";

export interface MenuItem {
    id : string;
    name : string;
    description : string;
    price : number;
    category : MenuCategory;
    color : string;
    image? : string;
}

export const menuCategories = ["All", "Main dishes", "Drinks"] as const;

export interface MenuItemApiType {
    itemId : string;
    title : string;
    category : "food" | "drinks";
    description : string;
    price : number;
    image : string;
}
