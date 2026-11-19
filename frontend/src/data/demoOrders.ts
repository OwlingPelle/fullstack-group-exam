export type StaffOrderStatus = "Received" | "In kitchen" | "Ready" | "Delivered";

export interface StaffOrder {
  id: string;
  customer: string;
  contact: string;
  type: "Takeout" | "Delivery";
  verificationCode: string;
  status: StaffOrderStatus;
  items: { name: string; quantity: number; price: number }[];
}

export const demoStaffOrders: StaffOrder[] = [
  {
    id: "SC-1042",
    customer: "Jordan Lee",
    contact: "jordan@example.com",
    type: "Takeout",
    verificationCode: "4821",
    status: "Received",
    items: [
      { name: "Nerf Kebab", quantity: 2, price: 129 },
      { name: "Stardust Soda", quantity: 2, price: 35 },
    ],
  },
  {
    id: "SC-1043",
    customer: "Casey Patel",
    contact: "+46 70 555 12 34",
    type: "Delivery",
    verificationCode: "7395",
    status: "In kitchen",
    items: [
      { name: "Nebulosa-ramen", quantity: 1, price: 155 },
      { name: "Comet Wings", quantity: 1, price: 99 },
    ],
  },
  {
    id: "SC-1044",
    customer: "Morgan Reyes",
    contact: "+46 70 555 98 76",
    type: "Takeout",
    verificationCode: "2618",
    status: "Ready",
    items: [{ name: "Meteor Fries", quantity: 1, price: 59 }],
  },
];

export type CustomerOrderStatus = "Received" | "On the way" | "Delivered";

export interface CustomerOrder {
  id: string;
  date: string;
  status: CustomerOrderStatus;
  items: { name: string; quantity: number; price: number }[];
}

export const demoCustomerOrders: CustomerOrder[] = [
  {
    id: "SC-1045",
    date: "Today · 6:20 PM",
    status: "On the way",
    items: [
      { name: "Nebulosa-ramen", quantity: 1, price: 155 },
      { name: "Stardust Soda", quantity: 2, price: 35 },
    ],
  },
  {
    id: "SC-1038",
    date: "Today · 12:45 PM",
    status: "Received",
    items: [
      { name: "Nerf Kebab", quantity: 1, price: 129 },
      { name: "Meteor Fries", quantity: 1, price: 59 },
    ],
  },
  {
    id: "SC-1012",
    date: "Yesterday · 7:10 PM",
    status: "Delivered",
    items: [{ name: "Comet Wings", quantity: 2, price: 99 }],
  },
];
