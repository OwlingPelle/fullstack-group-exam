import "./LandingPage.css";
import BottomNav from "../../components/BottomNav";

interface LandingPageProps {
  onNavigate: (page: "landing" | "menu") => void;
}

function LandingPage({ onNavigate }: LandingPageProps) {
  return (
    <div className="page">
      {/* Header */}
      <header className="header">
        <h1 className="header__title">
          <span className="header__title-line">Welcome to</span>
          <span className="header__title-line">STARS CANTINA</span>
        </h1>
      </header>

      {/* Färgade avdelare */}
      <div className="color-divider" aria-hidden="true" />

      {/* Hero */}
      <main className="hero">
        <span className="hero__star hero__star--gold" aria-hidden="true" />
        <span className="hero__star hero__star--cream" aria-hidden="true" />

        <div className="hero__content">
          <svg
            className="hero__planet"
            viewBox="0 0 220 160"
            role="img"
            aria-labelledby="planet-title"
            xmlns="http://www.w3.org/2000/svg"
          >
            <title id="planet-title">
              En planet i gult, rött och turkost med en ljus ring
            </title>
            <defs>
              <clipPath id="planet-clip">
                <circle cx="110" cy="82" r="64" />
              </clipPath>
            </defs>
            <g clipPath="url(#planet-clip)">
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

          <div className="hero__wordmark" aria-label="Stars Cantina">
            <span className="hero__title">STARS</span>
            <span className="hero__subtitle">CANTINA</span>
          </div>
        </div>
      </main>

      <BottomNav currentPage="landing" onNavigate={onNavigate} />
    </div>
  );
}

export default LandingPage;
