import { Link } from "react-router-dom";
import "./style.css";

export default function Landing() {
  return (
    <div className="landing">
      {/* Header */}
      <header className="header">
        <div className="logo-landing">
          <img src="./logo.svg" alt="noteflow logo" />
          NoteFlow
        </div>
        {/* <img src="./logo.svg" className="nav-logo" alt="noteflow logo" /> */}

        <nav className="nav">
          <Link to="/login" className="nav-btn login-btn">
            Login
          </Link>
          <Link to="/signup" className="nav-btn signup-btn">
            Get Started
          </Link>
        </nav>
      </header>

      {/* Hero Section */}
      <section className="hero">
        <h1 className="hero-title">Fast, Simple & Secure Notes.</h1>
        <p className="hero-subtitle">
          Your thoughts, safely stored and accessible anywhere. Write freely.
          Save instantly. Organize effortlessly.
        </p>

        <Link to="/signup" className="cta-btn">
          Start Writing
        </Link>
      </section>

      {/* Features Section */}
      <section className="features">
        <div className="feature-card">
          <h3>âš¡ Speed</h3>
          <p>Instant load time and quick note creation.</p>
        </div>

        <div className="feature-card">
          <h3>ðŸ”’ Security</h3>
          <p>Your notes are protected with secure login tokens.</p>
        </div>

        <div className="feature-card">
          <h3>ðŸŒ Access Anywhere</h3>
          <p>Use it on mobile or desktop, no installation needed.</p>
        </div>

        <div className="feature-card">
          <h3>Organization</h3>
          <p>Categorize your notes for easy retrieval</p>
        </div>
      </section>

      {/* Footer */}
      <footer className="footer">
        <p>Â© {new Date().getFullYear()} NoteFlow. Built by You.</p>
        <a href="https://github.com/" target="_blank" rel="noreferrer">
          GitHub
        </a>
      </footer>
    </div>
  );
}
