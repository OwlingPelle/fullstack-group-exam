import BottomNav from "../../components/BottomNav";
import { demoCustomerProfile } from "../../utils/adminData";
import "../AdminPage/AdminPage.css";
import "./CustomerPage.css";

type CustomerOrderStatus = "Received" | "On the way" | "Delivered";
type CustomerOrder = {
  id: string;
  date: string;
  status: CustomerOrderStatus;
  items: { name: string; quantity: number; price: number }[];
};
type CustomerPageProps = {
  onNavigate: (page: "landing" | "menu" | "admin" | "staff" | "customer") => void;
};

const demoCustomerOrders: CustomerOrder[] = [
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

const statusClass: Record<CustomerOrderStatus, string> = {
  Received: "customer-status--received",
  "On the way": "customer-status--on-the-way",
  Delivered: "customer-status--delivered",
};
const statusSteps: CustomerOrderStatus[] = ["Received", "On the way", "Delivered"];

function CustomerPage({ onNavigate }: CustomerPageProps) {
  const activeOrders = demoCustomerOrders.filter((order) => order.status !== "Delivered").length;

  return (
    <main className="admin-page customer-page">
      <header className="admin-header">
        <div>
          <p className="admin-eyebrow">STARS CANTINA / CUSTOMER</p>
          <h1 className="admin-brand">My orders</h1>
        </div>
        <div className="admin-header__user">
          <span className="admin-avatar" aria-hidden="true">{demoCustomerProfile.name.charAt(0)}</span>
          <span>{demoCustomerProfile.name}</span>
        </div>
      </header>
      <div className="admin-colour-stripes" aria-hidden="true" />

      <section className="admin-content customer-content" aria-labelledby="customer-page-title">
        <div className="admin-content__heading">
          <div>
            <p className="admin-eyebrow">YOUR ACCOUNT</p>
            <h2 id="customer-page-title">Order history</h2>
          </div>
        </div>

        <p className="customer-intro">
          Welcome back, {demoCustomerProfile.name.split(" ")[0]}. Track your current orders and review past receipts.
        </p>

        <div className="admin-stat-grid customer-stat-grid" aria-label="Your order summary">
          <article className="admin-stat-card"><span>Active orders</span><strong>{activeOrders}</strong><small>Being prepared or delivered</small></article>
          <article className="admin-stat-card"><span>Order history</span><strong>{demoCustomerOrders.length}</strong><small>Receipts on this account</small></article>
        </div>

        <div className="customer-order-list" aria-label={`Orders for ${demoCustomerProfile.name}`}>
          {demoCustomerOrders.map((order) => {
            const currentStep = statusSteps.indexOf(order.status);
            const total = order.items.reduce((sum, item) => sum + item.quantity * item.price, 0);

            return (
              <article className="customer-order-card" key={order.id}>
                <div className="customer-order-card__header">
                  <div>
                    <p className="admin-eyebrow">ORDER RECEIPT</p>
                    <h3>{order.id}</h3>
                  </div>
                  <span className={`customer-status ${statusClass[order.status]}`}>{order.status}</span>
                </div>

                <p className="customer-order-date">{order.date} <span>·</span> Delivery</p>

                <ul className="customer-order-items">
                  {order.items.map((item) => (
                    <li key={item.name}>
                      <span>{item.quantity} × {item.name}</span>
                      <strong>{item.quantity * item.price} kr</strong>
                    </li>
                  ))}
                </ul>

                <div className="customer-order-total">
                  <span>Total paid</span>
                  <strong>{total} kr</strong>
                </div>

                <ol className="customer-progress" aria-label={`Order status: ${order.status}`}>
                  {statusSteps.map((step, index) => (
                    <li
                      className={index <= currentStep ? "customer-progress__step customer-progress__step--complete" : "customer-progress__step"}
                      key={step}
                    >
                      <span className="customer-progress__marker" aria-hidden="true" />
                      <span>{step}</span>
                    </li>
                  ))}
                </ol>
              </article>
            );
          })}
        </div>

        <p className="admin-data-note">
          These receipts and order statuses are placeholder data. Connect this account to the order API to show live customer orders.
        </p>
      </section>

      <BottomNav currentPage="customer" onNavigate={onNavigate} />
    </main>
  );
}

export default CustomerPage;
