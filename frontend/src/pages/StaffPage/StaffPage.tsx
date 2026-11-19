import { useMemo, useState } from "react";
import BottomNav from "../../components/BottomNav";
import { demoPersonnel } from "../../data/demoAccounts";
import { demoStaffOrders, type StaffOrder, type StaffOrderStatus } from "../../data/demoOrders";
import "../AdminPage/AdminPage.css";
import "./StaffPage.css";

type StaffPageProps = {
  onNavigate: (page: "landing" | "menu" | "login" | "admin" | "staff" | "customer") => void;
};

const statusClass: Record<StaffOrderStatus, string> = {
  Received: "staff-status--received",
  "In kitchen": "staff-status--kitchen",
  Ready: "staff-status--ready",
  Delivered: "staff-status--delivered",
};

function StaffPage({ onNavigate }: StaffPageProps) {
  const [orders, setOrders] = useState(demoStaffOrders);
  const [verificationCodes, setVerificationCodes] = useState<Record<string, string>>({});
  const [notice, setNotice] = useState("");
  const staffMember = demoPersonnel.find((person) => person.status === "Active");
  const staffName = staffMember?.name ?? "Staff member";

  const orderCounts = useMemo(
    () => ({
      received: orders.filter((order) => order.status === "Received").length,
      kitchen: orders.filter((order) => order.status === "In kitchen").length,
      ready: orders.filter((order) => order.status === "Ready").length,
    }),
    [orders],
  );

  function updateOrder(orderId: string, status: StaffOrderStatus, message: string) {
    setOrders((current) =>
      current.map((order) => (order.id === orderId ? { ...order, status } : order)),
    );
    setNotice(message);
  }

  function sendToKitchen(order: StaffOrder) {
    updateOrder(order.id, "In kitchen", `Order ${order.id} sent to the kitchen.`);
  }

  function markReady(order: StaffOrder) {
    updateOrder(order.id, "Ready", `Order ${order.id} marked ready.`);
  }

  function confirmHandoff(order: StaffOrder) {
    if (verificationCodes[order.id]?.trim() !== order.verificationCode) {
      setNotice("The customer verification code does not match this order.");
      return;
    }
    updateOrder(order.id, "Delivered", `Order ${order.id} handed to the verified customer.`);
    setVerificationCodes((current) => ({ ...current, [order.id]: "" }));
  }

  return (
    <main className="admin-page staff-page page-frame">
      <header className="admin-header">
        <div>
          <p className="admin-eyebrow">STARS CANTINA / STAFF</p>
          <h1 className="admin-brand">Order desk</h1>
        </div>
        <div className="admin-header__user">
          <span className="admin-avatar" aria-hidden="true">{staffName.charAt(0)}</span>
          <span className="admin-header__name">{staffName}</span>
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

      <section className="admin-content staff-content" aria-labelledby="staff-page-title">
        <div className="admin-content__heading">
          <div>
            <p className="admin-eyebrow">SERVICE DESK</p>
            <h2 id="staff-page-title">Customer orders</h2>
          </div>
        </div>

        <p className="staff-intro">
          Review each receipt, send incoming orders to the kitchen, and verify the customer before handoff.
        </p>

        <div className="admin-stat-grid staff-stat-grid" aria-label="Order status totals">
          <article className="admin-stat-card"><span>New orders</span><strong>{orderCounts.received}</strong><small>Waiting for kitchen</small></article>
          <article className="admin-stat-card"><span>In kitchen</span><strong>{orderCounts.kitchen}</strong><small>Being prepared</small></article>
          <article className="admin-stat-card"><span>Ready for handoff</span><strong>{orderCounts.ready}</strong><small>Verify before delivery</small></article>
        </div>

        {notice && <p className="admin-notice staff-notice" role="status">{notice}</p>}

        <div className="staff-order-list" aria-label="Order receipts">
          {orders.map((order) => (
            <article className="staff-order-card" key={order.id}>
              <div className="staff-order-card__header">
                <div>
                  <p className="admin-eyebrow">ORDER RECEIPT</p>
                  <h3>{order.id}</h3>
                </div>
                <span className={`staff-status ${statusClass[order.status]}`}>{order.status}</span>
              </div>

              <div className="staff-order-customer">
                <div><span>Customer</span><strong>{order.customer}</strong></div>
                <div><span>{order.type === "Delivery" ? "Delivery contact" : "Contact"}</span><strong>{order.contact}</strong></div>
                <div><span>Order type</span><strong>{order.type}</strong></div>
              </div>

              <ul className="staff-order-items">
                {order.items.map((item) => (
                  <li key={item.name}>
                    <span>{item.quantity} × {item.name}</span>
                    <strong>{item.quantity * item.price} kr</strong>
                  </li>
                ))}
              </ul>

              <div className="staff-order-total">
                <span>Total</span>
                <strong>{order.items.reduce((total, item) => total + item.quantity * item.price, 0)} kr</strong>
              </div>

              {order.status === "Received" && (
                <div className="staff-order-action">
                  <p>Receipt is ready to be prepared.</p>
                  <button className="admin-button admin-button--primary" onClick={() => sendToKitchen(order)} type="button">
                    Send to kitchen
                  </button>
                </div>
              )}
              {order.status === "In kitchen" && (
                <div className="staff-order-action">
                  <p>Update the order when preparation is complete.</p>
                  <button className="admin-button admin-button--outline" onClick={() => markReady(order)} type="button">
                    Mark ready
                  </button>
                </div>
              )}
              {order.status === "Ready" && (
                <div className="staff-verification">
                  <div className="staff-verification__prompt">
                    <strong>Verify customer before handoff</strong>
                    <span>Ask the customer for the code on their receipt.</span>
                  </div>
                  <p className="staff-verification__reference">
                    Receipt code: <strong>{order.verificationCode}</strong>
                  </p>
                  <label className="staff-code-field">
                    Customer’s code
                    <input
                      autoComplete="off"
                      inputMode="numeric"
                      maxLength={8}
                      onChange={(event) =>
                        setVerificationCodes((current) => ({ ...current, [order.id]: event.target.value }))
                      }
                      placeholder="Enter receipt code"
                      value={verificationCodes[order.id] ?? ""}
                    />
                  </label>
                  <button
                    className="admin-button admin-button--primary"
                    disabled={verificationCodes[order.id]?.trim() !== order.verificationCode}
                    onClick={() => confirmHandoff(order)}
                    type="button"
                  >
                    Confirm customer & handoff
                  </button>
                </div>
              )}
              {order.status === "Delivered" && (
                <p className="staff-complete-message">Customer verified and order handed over.</p>
              )}
            </article>
          ))}
          {orders.length === 0 && <p className="admin-empty">No orders are waiting right now.</p>}
        </div>

        <p className="admin-data-note">
          Placeholder orders and staff profile are stored in this page only. Connect order actions to the shared API before production.
        </p>
      </section>

      <BottomNav currentPage="staff" onNavigate={onNavigate} />
    </main>
  );
}

export default StaffPage;
