import { useState, type FormEvent } from "react";
import BottomNav from "../../components/BottomNav";
import Icon from "../../components/Icon";
import { login, register, type AuthSession } from "../../api/auth";
import "./LoginPanel.css";

type AuthPage = "landing" | "menu" | "cart" | "login" | "register" | "admin" | "staff" | "customer";
type LoginPanelProps = {
  mode: "login" | "register";
  onNavigate: (page: AuthPage) => void;
  onAuthenticated: (session: AuthSession) => void;
  onRegistered: (username: string) => void;
  registrationNotice: string;
};

function LoginPanel({
  mode,
  onNavigate,
  onAuthenticated,
  onRegistered,
  registrationNotice,
}: LoginPanelProps) {
  const [formError, setFormError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const isRegistering = mode === "register";

  async function submitForm(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    setFormError("");
    setIsSubmitting(true);

    try {
      const username = String(form.get("username") ?? "").trim();
      const password = String(form.get("password") ?? "");

      if (isRegistering) {
        const confirmPassword = String(form.get("confirmPassword") ?? "");
        if (password !== confirmPassword) {
          setFormError("Passwords do not match.");
          return;
        }

        await register({
          username,
          password,
          email: String(form.get("email") ?? "").trim(),
        });
        onRegistered(username);
      } else {
        const session = await login({ username, password });
        onAuthenticated(session);
      }
    } catch (error) {
      setFormError(
        error instanceof Error
          ? error.message
          : isRegistering
            ? "Could not create account."
            : "Could not log in.",
      );
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <div className="login-panel-page page-frame">
      <main className="login-container">
        <Icon
          className="login-planet"
          name="planet"
          role="img"
          aria-label="A planet with yellow, red, and turquoise stripes and a bright ring"
        />

        <div className="login-header">
          <p className="login-subtitle">
            {isRegistering ? "JOIN THE CANTINA" : "WELCOME BACK"}
          </p>
          <h1 className="login-title">STARS CANTINA</h1>
        </div>

        <form className="login-form" onSubmit={submitForm}>
          <div className="input-group">
            <label htmlFor="username">USERNAME</label>
            <input
              autoComplete="username"
              type="text"
              id="username"
              name="username"
              placeholder="At least 4 characters"
              minLength={4}
              required
            />
          </div>

          {isRegistering && (
            <div className="input-group">
              <label htmlFor="email">EMAIL</label>
              <input
                autoComplete="email"
                type="email"
                id="email"
                name="email"
                placeholder="namn@exempel.se"
                required
              />
            </div>
          )}

          <div className="input-group">
            <label htmlFor="password">PASSWORD</label>
            <input
              type="password"
              id="password"
              name="password"
              placeholder="********"
              minLength={4}
              autoComplete={isRegistering ? "new-password" : "current-password"}
              required
            />
          </div>

          {isRegistering ? (
            <div className="input-group">
              <label htmlFor="confirmPassword">CONFIRM PASSWORD</label>
              <input
                autoComplete="new-password"
                type="password"
                id="confirmPassword"
                name="confirmPassword"
                placeholder="********"
                minLength={4}
                required
              />
            </div>
          ) : (
            <a href="#" className="forgot-password">
              Forgot password?
            </a>
          )}

          {formError && <p className="login-error" role="alert">{formError}</p>}
          {!isRegistering && registrationNotice && (
            <p className="login-demo-hint" role="status">{registrationNotice}</p>
          )}

          <button type="submit" className="login-button" disabled={isSubmitting}>
            {isSubmitting
              ? isRegistering ? "CREATING ACCOUNT..." : "LOGGING IN..."
              : isRegistering ? "CREATE ACCOUNT" : "LOG IN"}
          </button>
        </form>

        <div className="login-footer">
          <p>
            {isRegistering ? "Already have an account? " : "New to the cantina? "}
            <button
              type="button"
              onClick={() => {
                setFormError("");
                onNavigate(isRegistering ? "login" : "register");
              }}
            >
              {isRegistering ? "Log in" : "Create account"}
            </button>
          </p>
        </div>
      </main>

      <BottomNav currentPage={mode} onNavigate={onNavigate} />
    </div>
  );
}

export default LoginPanel;
