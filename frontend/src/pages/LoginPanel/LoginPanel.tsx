import "./LoginPanel.css"; // Uppdaterad import

function LoginPanel() {
  return (
    // Uppdaterad klass härifrån admin-login-page till login-panel-page
    <div className="login-panel-page">
      <main className="login-container">
        <svg
          className="login-planet"
          viewBox="0 0 220 160"
          role="img"
          aria-labelledby="planet-title-login"
          xmlns="http://www.w3.org/2000/svg"
        >
          <title id="planet-title-login">
            En planet i gult, rött och turkost med en ljus ring
          </title>
          <defs>
            <clipPath id="planet-clip-login">
              <circle cx="110" cy="82" r="64" />
            </clipPath>
          </defs>
          <g clipPath="url(#planet-clip-login)">
            <circle cx="110" cy="82" r="64" className="planet-base" />
            <path
              d="M39 67 C48 37 76 18 110 18 C145 18 170 39 181 68 L181 83 L39 83 Z"
              className="planet-stripe-gold"
            />
            <path
              d="M35 76 C64 67 87 72 111 76 C139 81 164 76 185 63 L180 111 C158 127 135 139 110 140 C79 140 52 122 39 100 Z"
              className="planet-stripe-red"
            />
          </g>
          <ellipse
            cx="110"
            cy="82"
            rx="91"
            ry="15"
            className="planet-ring"
            transform="rotate(-12 110 82)"
          />
        </svg>

        <div className="login-header">
          <p className="login-subtitle">VÄLKOMMEN TILLBAKA</p>
          <h1 className="login-title">STARS CANTINA</h1>
        </div>

        <form className="login-form" onSubmit={(e) => e.preventDefault()}>
          <div className="input-group">
            <label htmlFor="email">E-POST</label>
            <input
              type="email"
              id="email"
              placeholder="namn@exempel.se"
              required
            />
          </div>

          <div className="input-group">
            <label htmlFor="password">LÖSENORD</label>
            <input
              type="password"
              id="password"
              placeholder="********"
              required
            />
          </div>

          <a href="#" className="forgot-password">
            Glömt lösenordet?
          </a>

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

      <div className="colour-stripes" aria-hidden="true" />
    </div>
  );
}

export default LoginPanel;
