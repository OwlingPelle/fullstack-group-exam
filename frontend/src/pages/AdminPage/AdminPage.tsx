import { useMemo, useState, type FormEvent } from "react";
import AdminModal from "../../components/AdminModal";
import BottomNav from "../../components/BottomNav";
import {
  demoAccounts,
  demoAdminProfile,
  demoPersonnel,
  type AccountRecord,
  type AdminProfile,
  type Personnel,
} from "../../data/demoAccounts";
import { menuItems as demoMenuItems, menuCategories, type MenuCategory, type MenuItem } from "../../data/demoMenu";
import "./AdminPage.css";

type AdminSection = "overview" | "menu" | "personnel" | "accounts" | "profile";
type DialogState =
  | { kind: "menu"; item?: MenuItem }
  | { kind: "personnel"; person?: Personnel }
  | { kind: "profile" }
  | { kind: "password"; account: AccountRecord }
  | null;
type AdminPageProps = {
  username: string;
  onNavigate: (page: "landing" | "menu" | "cart" | "login" | "admin" | "staff" | "customer") => void;
  onLogout: () => void;
};

const sections: { id: AdminSection; label: string }[] = [
  { id: "overview", label: "Overview" },
  { id: "menu", label: "Food menu" },
  { id: "personnel", label: "Personnel" },
  { id: "accounts", label: "Accounts" },
  { id: "profile", label: "My account" },
];

function AdminPage({ username, onNavigate, onLogout }: AdminPageProps) {
  const adminName = username.trim() || demoAdminProfile.name;
  const [section, setSection] = useState<AdminSection>("overview");
  const [items, setItems] = useState<MenuItem[]>(demoMenuItems);
  const [personnel, setPersonnel] = useState<Personnel[]>(demoPersonnel);
  const [accounts, setAccounts] = useState<AccountRecord[]>(() =>
    demoAccounts.map((account) =>
      account.id === demoAdminProfile.id ? { ...account, name: adminName } : account,
    ),
  );
  const [profile, setProfile] = useState<AdminProfile>(() => ({
    ...demoAdminProfile,
    name: adminName,
  }));
  const [dialog, setDialog] = useState<DialogState>(null);
  const [notice, setNotice] = useState("");
  const [passwordError, setPasswordError] = useState("");

  const activePersonnel = useMemo(
    () => personnel.filter((person) => person.status === "Active").length,
    [personnel],
  );

  function showNotice(message: string) {
    setNotice(message);
    window.setTimeout(() => setNotice(""), 3200);
  }

  function saveMenuItem(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (dialog?.kind !== "menu") return;
    const form = new FormData(event.currentTarget);
    const saved: MenuItem = {
      id: dialog.item?.id ?? `menu-${crypto.randomUUID()}`,
      name: String(form.get("name")).trim(),
      description: String(form.get("description")).trim(),
      price: Number(form.get("price")),
      category: String(form.get("category")) as MenuCategory,
      color: String(form.get("color")),
    };
    setItems((current) =>
      dialog.item
        ? current.map((item) => (item.id === saved.id ? saved : item))
        : [...current, saved],
    );
    setDialog(null);
    showNotice(dialog.item ? "Menu item updated." : "Menu item added.");
  }

  function savePersonnel(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (dialog?.kind !== "personnel") return;
    const form = new FormData(event.currentTarget);
    const saved: Personnel = {
      id: dialog.person?.id ?? `staff-${crypto.randomUUID()}`,
      name: String(form.get("name")).trim(),
      email: String(form.get("email")).trim(),
      position: String(form.get("position")).trim(),
      phone: String(form.get("phone")).trim(),
      status: String(form.get("status")) as Personnel["status"],
    };
    setPersonnel((current) =>
      dialog.person
        ? current.map((person) => (person.id === saved.id ? saved : person))
        : [...current, saved],
    );
    setAccounts((current) => {
      const account = {
        id: saved.id,
        name: saved.name,
        email: saved.email,
        role: "Personnel" as const,
        status: saved.status,
      };
      return dialog.person
        ? current.map((record) => (record.id === saved.id ? account : record))
        : [...current, account];
    });
    setDialog(null);
    showNotice(dialog.person ? "Personnel details updated." : "Personnel member added.");
  }

  function saveProfile(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    const updated = {
      ...profile,
      name: String(form.get("name")).trim(),
      email: String(form.get("email")).trim(),
    };
    setProfile(updated);
    setAccounts((current) =>
      current.map((account) =>
        account.id === updated.id
          ? { ...account, name: updated.name, email: updated.email }
          : account,
      ),
    );
    setDialog(null);
    showNotice("Your account details were updated.");
  }

  function removeMenuItem(item: MenuItem) {
    if (!window.confirm(`Remove "${item.name}" from the menu?`)) return;
    setItems((current) => current.filter((entry) => entry.id !== item.id));
    showNotice("Menu item removed.");
  }

  function removePersonnel(person: Personnel) {
    if (!window.confirm(`Remove ${person.name} from personnel? Their account will also be removed.`)) {
      return;
    }
    setPersonnel((current) => current.filter((entry) => entry.id !== person.id));
    setAccounts((current) => current.filter((account) => account.id !== person.id));
    showNotice("Personnel member and account removed.");
  }

  function resetPassword(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    const password = String(form.get("password"));
    const confirmPassword = String(form.get("confirmPassword"));
    if (password !== confirmPassword) {
      setPasswordError("Passwords do not match.");
      return;
    }
    setPasswordError("");
    setDialog(null);
    showNotice("Password update simulated. Connect this action to your identity provider before production.");
  }

  const heading = sections.find((item) => item.id === section)?.label ?? "Overview";

  return (
    <main className="admin-page page-frame">
      <header className="admin-header">
        <div>
          <p className="admin-eyebrow">STARS CANTINA / ADMIN</p>
          <h1 className="admin-brand">Control room</h1>
        </div>
        <div className="admin-header__user">
          <span className="admin-avatar" aria-hidden="true">{profile.name.charAt(0).toUpperCase()}</span>
          <span className="admin-header__name">{profile.name}</span>
          <button
            className="admin-button admin-button--quiet admin-header__logout"
            onClick={onLogout}
            type="button"
          >
            Log out
          </button>
        </div>
      </header>
      <div className="admin-colour-stripes" aria-hidden="true" />

      <div className="admin-layout">
        <aside className="admin-sidebar" aria-label="Administration sections">
          <p className="admin-sidebar__label">Manage</p>
          {sections.map((item) => (
            <button
              aria-current={section === item.id ? "page" : undefined}
              className="admin-sidebar__link"
              key={item.id}
              onClick={() => setSection(item.id)}
              type="button"
            >
              <span aria-hidden="true">{item.id === "overview" ? "⌂" : item.id === "menu" ? "✦" : item.id === "personnel" ? "◉" : item.id === "accounts" ? "◎" : "○"}</span>
              {item.label}
            </button>
          ))}
          <div className="admin-sidebar__note">
            <span className="admin-status-dot" />
            Demo data
            <small>Changes are stored in this session only.</small>
          </div>
        </aside>

        <section className="admin-content" aria-labelledby="admin-section-title">
          <div className="admin-content__heading">
            <div>
              <p className="admin-eyebrow">ADMINISTRATION</p>
              <h2 id="admin-section-title">{heading}</h2>
            </div>
            {section === "menu" && (
              <button className="admin-button admin-button--primary" onClick={() => setDialog({ kind: "menu" })} type="button">
                + Add menu item
              </button>
            )}
            {section === "personnel" && (
              <button className="admin-button admin-button--primary" onClick={() => setDialog({ kind: "personnel" })} type="button">
                + Add personnel
              </button>
            )}
          </div>

          {notice && <p className="admin-notice" role="status">{notice}</p>}

          {section === "overview" && (
            <div className="admin-overview">
              <p className="admin-welcome">Welcome back, {profile.name.split(" ")[0]}. Here’s what’s happening at the cantina.</p>
              <div className="admin-stat-grid">
                <article className="admin-stat-card"><span>Menu items</span><strong>{items.length}</strong><small>Across all categories</small></article>
                <article className="admin-stat-card"><span>Personnel</span><strong>{personnel.length}</strong><small>{activePersonnel} active</small></article>
                <article className="admin-stat-card"><span>Accounts</span><strong>{accounts.length}</strong><small>Customers and team</small></article>
              </div>
              <div className="admin-overview-card">
                <div><p className="admin-eyebrow">QUICK ACTION</p><h3>Keep your cantina up to date</h3><p>Manage menu offerings, team details and account access from one place.</p></div>
                <button className="admin-button admin-button--outline" onClick={() => setSection("menu")} type="button">Manage menu</button>
              </div>
              <p className="admin-data-note">This dashboard currently uses placeholder data. Connect the data operations to your AWS-backed API before production.</p>
            </div>
          )}

          {section === "menu" && (
            <div className="admin-list">
              {items.map((item) => (
                <article className="admin-row admin-menu-row" key={item.id}>
                  <span className="admin-menu-swatch" style={{ backgroundColor: item.color }} aria-hidden="true" />
                  <div className="admin-row__main"><strong>{item.name}</strong><span>{item.category} · {item.description}</span></div>
                  <strong className="admin-row__price">{item.price} kr</strong>
                  <div className="admin-row__actions">
                    <button className="admin-button admin-button--quiet" onClick={() => setDialog({ kind: "menu", item })} type="button">Edit</button>
                    <button className="admin-button admin-button--danger" onClick={() => removeMenuItem(item)} type="button">Remove</button>
                  </div>
                </article>
              ))}
              {items.length === 0 && <p className="admin-empty">No menu items yet. Add one to get started.</p>}
            </div>
          )}

          {section === "personnel" && (
            <div className="admin-list">
              {personnel.map((person) => (
                <article className="admin-row" key={person.id}>
                  <span className="admin-avatar admin-avatar--small" aria-hidden="true">{person.name.charAt(0)}</span>
                  <div className="admin-row__main"><strong>{person.name}</strong><span>{person.position} · {person.email} · {person.phone}</span></div>
                  <span className={`admin-pill ${person.status === "Active" ? "admin-pill--active" : ""}`}>{person.status}</span>
                  <div className="admin-row__actions">
                    <button className="admin-button admin-button--quiet" onClick={() => setDialog({ kind: "personnel", person })} type="button">Edit</button>
                    <button className="admin-button admin-button--danger" onClick={() => removePersonnel(person)} type="button">Remove</button>
                  </div>
                </article>
              ))}
              {personnel.length === 0 && <p className="admin-empty">No personnel yet. Add your first team member.</p>}
            </div>
          )}

          {section === "accounts" && (
            <>
              <p className="admin-section-intro">View customer and team accounts, or send a password update for an account.</p>
              <div className="admin-list">
                {accounts.map((account) => (
                  <article className="admin-row" key={account.id}>
                    <span className="admin-avatar admin-avatar--small" aria-hidden="true">{account.name.charAt(0)}</span>
                    <div className="admin-row__main"><strong>{account.name}</strong><span>{account.email}</span></div>
                    <span className="admin-pill">{account.role}</span>
                    <button className="admin-button admin-button--outline" onClick={() => { setPasswordError(""); setDialog({ kind: "password", account }); }} type="button">Edit password</button>
                  </article>
                ))}
              </div>
              <p className="admin-security-note">Password changes must be handled by your authentication provider in production. Passwords are never displayed or stored in this demo.</p>
            </>
          )}

          {section === "profile" && (
            <div className="admin-profile-card">
              <span className="admin-avatar admin-avatar--large" aria-hidden="true">{profile.name.charAt(0).toUpperCase()}</span>
              <div className="admin-profile-card__details"><p className="admin-eyebrow">ADMIN ACCOUNT</p><h3>{profile.name}</h3><p>{profile.email}</p><span className="admin-pill admin-pill--active">Administrator</span></div>
              <div className="admin-profile-card__actions">
                <button className="admin-button admin-button--outline" onClick={() => setDialog({ kind: "profile" })} type="button">Edit account</button>
                <button className="admin-button admin-button--quiet" onClick={() => { setPasswordError(""); setDialog({ kind: "password", account: accounts.find((account) => account.id === profile.id) ?? accounts[0] }); }} type="button">Change password</button>
              </div>
            </div>
          )}
        </section>
      </div>

      <BottomNav currentPage="admin" onNavigate={onNavigate} />

      {dialog?.kind === "menu" && (
        <AdminModal title={dialog.item ? "Edit menu item" : "Add menu item"} onClose={() => setDialog(null)} onSubmit={saveMenuItem} submitLabel={dialog.item ? "Save changes" : "Add item"}>
          <label className="admin-field">Item name<input name="name" defaultValue={dialog.item?.name ?? ""} required maxLength={70} /></label>
          <label className="admin-field">Description<textarea name="description" defaultValue={dialog.item?.description ?? ""} required rows={3} maxLength={220} /></label>
          <div className="admin-form-grid">
            <label className="admin-field">Price (kr)<input name="price" type="number" min="0" step="1" defaultValue={dialog.item?.price ?? ""} required /></label>
            <label className="admin-field">Category<select name="category" defaultValue={dialog.item?.category ?? "Main dishes"}>{menuCategories.filter((category) => category !== "All").map((category) => <option key={category}>{category}</option>)}</select></label>
          </div>
          <label className="admin-field">Accent colour<input name="color" type="color" defaultValue={dialog.item?.color ?? "#ee6b2f"} /></label>
        </AdminModal>
      )}

      {dialog?.kind === "personnel" && (
        <AdminModal title={dialog.person ? "Edit personnel" : "Add personnel"} onClose={() => setDialog(null)} onSubmit={savePersonnel} submitLabel={dialog.person ? "Save changes" : "Add personnel"}>
          <label className="admin-field">Full name<input name="name" defaultValue={dialog.person?.name ?? ""} required maxLength={80} /></label>
          <label className="admin-field">Email<input name="email" type="email" defaultValue={dialog.person?.email ?? ""} required maxLength={120} /></label>
          <div className="admin-form-grid">
            <label className="admin-field">Position<input name="position" defaultValue={dialog.person?.position ?? ""} required maxLength={60} /></label>
            <label className="admin-field">Phone<input name="phone" type="tel" defaultValue={dialog.person?.phone ?? ""} maxLength={30} /></label>
          </div>
          <label className="admin-field">Status<select name="status" defaultValue={dialog.person?.status ?? "Active"}><option>Active</option><option>Inactive</option></select></label>
        </AdminModal>
      )}

      {dialog?.kind === "profile" && (
        <AdminModal title="Edit admin account" onClose={() => setDialog(null)} onSubmit={saveProfile} submitLabel="Save changes">
          <label className="admin-field">Full name<input name="name" defaultValue={profile.name} required maxLength={80} /></label>
          <label className="admin-field">Email<input name="email" type="email" defaultValue={profile.email} required maxLength={120} /></label>
          <p className="admin-security-note">Update your password separately from the account list or change password action.</p>
        </AdminModal>
      )}

      {dialog?.kind === "password" && (
        <AdminModal title={`Update password · ${dialog.account.name}`} onClose={() => setDialog(null)} onSubmit={resetPassword} submitLabel="Update password">
          <p className="admin-security-note">Set a new password for <strong>{dialog.account.email}</strong>. Use at least 8 characters.</p>
          <label className="admin-field">New password<input name="password" type="password" minLength={8} required autoComplete="new-password" /></label>
          <label className="admin-field">Confirm new password<input name="confirmPassword" type="password" minLength={8} required autoComplete="new-password" /></label>
          {passwordError && <p className="admin-form-error" role="alert">{passwordError}</p>}
        </AdminModal>
      )}
    </main>
  );
}

export default AdminPage;
