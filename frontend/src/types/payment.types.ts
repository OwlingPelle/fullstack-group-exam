// One row in the order summary: a dish from the menu and how many
export interface OrderLineType {
    id : string;
    name : string;
    price : number;
    quantity : number;
}

// What we send to the backend for each dish: only id and quantity.
// The backend looks up the prices itself.
export interface PaymentItemType {
    id : string;
    quantity : number;
}
