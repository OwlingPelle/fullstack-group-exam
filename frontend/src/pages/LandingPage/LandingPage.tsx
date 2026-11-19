import "./LandingPage.css";
import BottomNav from "../../components/BottomNav";
import Icon from "../../components/Icon";

interface LandingPageProps {
  onNavigate: (page: "landing" | "menu" | "login" | "admin" | "staff" | "customer") => void;
}

function LandingPage({ onNavigate }: LandingPageProps) {
  return (
    <div className="page page-frame">
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
          <Icon
            className="hero__planet"
            name="planet"
            role="img"
            aria-label="En planet i gult, rött och turkost med en ljus ring"
          />

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
