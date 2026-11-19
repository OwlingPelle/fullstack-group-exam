import { useState, type FormEvent } from "react";
import BottomNav from "../../components/BottomNav";
import Icon from "../../components/Icon";
import { demoAccounts } from "../../data/demoAccounts";
import "./LoginPanel.css";

type LoginPage = "landing" | "menu" | "login" | "admin" | "staff" | "customer";
type LoginPanelProps = {
  onNavigate: (page: LoginPage) => void;
};

function LoginPanel({ onNavigate }: LoginPanelProps) {
  const [loginError, setLoginError] = useState("");

  function signIn(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    const email = String(form.get("email")).trim().toLowerCase();
    const account = demoAccounts.find((item) => item.email.toLowerCase() === email);

    if (!account || account.status !== "Active") {
      setLoginError("Kontot hittades inte eller är inaktivt. Använd en aktiv demokontoadress.");
      return;
    }

    setLoginError("");
    onNavigate(account.role === "Admin" ? "admin" : account.role === "Personnel" ? "staff" : "customer");
  }

  return (
    <div className="login-panel-page page-frame">
      <main className="login-container">
        <Icon
          className="login-planet"
          name="planet"
          role="img"
          aria-label="En planet i gult, rött och turkost med en ljus ring"
        />

        <div className="login-header">
          <p className="login-subtitle">VÄLKOMMEN TILLBAKA</p>
          <h1 className="login-title">STARS CANTINA</h1>
        </div>

        <form className="login-form" onSubmit={signIn}>
          <div className="input-group">
            <label htmlFor="email">E-POST</label>
            <input
              autoComplete="username"
              type="email"
              id="email"
              name="email"
              placeholder="namn@exempel.se"
              required
            />
          </div>

          <div className="input-group">
            <label htmlFor="password">LÖSENORD</label>
            <input
              autoComplete="current-password"
              type="password"
              id="password"
              name="password"
              placeholder="********"
              required
            />
          </div>

          <a href="#" className="forgot-password">
            Glömt lösenordet?
          </a>

          {loginError && <p className="login-error" role="alert">{loginError}</p>}
          <p className="login-demo-hint">Demoinloggning: använd en aktiv e-postadress från demo-kontona. Lösenord verifieras inte.</p>

          <button type="submit" className="login-button">
            LOGGA IN
          </button>
        </form>

        <div className="login-footer">
          <p>
            Ny i cantinan? <a href="#">Skapa konto</a>
          </p>
        </div>
      </main>

      <BottomNav currentPage="login" onNavigate={onNavigate} />
    </div>
  );
}

export default LoginPanel;
