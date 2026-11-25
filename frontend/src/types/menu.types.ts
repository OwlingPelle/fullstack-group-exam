export interface MenuItemApiType {
    itemId : string;
    title : string;
    category : "food" | "drinks";
    description : string;
    price : number;
    image : string;
}
