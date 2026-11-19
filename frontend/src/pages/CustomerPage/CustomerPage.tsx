import BottomNav from "../../components/BottomNav";
import { demoCustomerOrders, type CustomerOrderStatus } from "../../data/demoOrders";
import { demoCustomerProfile } from "../../data/demoAccounts";
import "../AdminPage/AdminPage.css";
import "./CustomerPage.css";

type CustomerPageProps = {
  onNavigate: (page: "landing" | "menu" | "login" | "admin" | "staff" | "customer") => void;
};

const statusClass: Record<CustomerOrderStatus, string> = {
  Received: "customer-status--received",
  "On the way": "customer-status--on-the-way",
  Delivered: "customer-status--delivered",
};
const statusSteps: CustomerOrderStatus[] = ["Received", "On the way", "Delivered"];

function CustomerPage({ onNavigate }: CustomerPageProps) {
  const activeOrders = demoCustomerOrders.filter((order) => order.status !== "Delivered").length;

  return (
    <main className="admin-page customer-page page-frame">
      <header className="admin-header">
        <div>
          <p className="admin-eyebrow">STARS CANTINA / CUSTOMER</p>
          <h1 className="admin-brand">My orders</h1>
        </div>
        <div className="admin-header__user">
          <span className="admin-avatar" aria-hidden="true">{demoCustomerProfile.name.charAt(0)}</span>
          <span className="admin-header__name">{demoCustomerProfile.name}</span>
          <button
            className="admin-button admin-button--quiet admin-header__logout"
            onClick={() => onNavigate("landing")}
            type="button"
          >
            Log out
          </button>
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
