/* global React, ReactDOM, Hero, About, Sectors, Partners, Contact, Footer */
const { useState, useEffect } = React;

/* Baked-in design settings — previously exposed via a Tweaks panel, now locked.
   If you need to change these, edit them here and the matching data-attrs on <html>. */
const SETTINGS = {
  accent: "blue",       // brand primary blue
  typePair: "dm",       // DM Serif + Sans
  heroVariant: "waves", // flowing black/white/blue waves (matches LinkedIn banner)
  waveAnimation: true,
  motion: 0.4,
};

/* Theme resolution: persists a user preference in localStorage, otherwise
   follows the OS. The nav moon/sun toggle flips between light and dark. */
function useTheme() {
  const [override, setOverride] = useState(() => {
    try { return localStorage.getItem("ainest-theme"); } catch { return null; }
  });
  const [systemTheme, setSystemTheme] = useState(() =>
    typeof window !== "undefined" &&
    window.matchMedia?.("(prefers-color-scheme: dark)").matches
      ? "dark"
      : "light"
  );
  useEffect(() => {
    if (!window.matchMedia) return;
    const mq = window.matchMedia("(prefers-color-scheme: dark)");
    const onChange = (e) => setSystemTheme(e.matches ? "dark" : "light");
    mq.addEventListener?.("change", onChange);
    return () => mq.removeEventListener?.("change", onChange);
  }, []);
  const resolved = override ?? systemTheme;
  const setTheme = (t) => {
    setOverride(t);
    try { localStorage.setItem("ainest-theme", t); } catch {}
  };
  return [resolved, setTheme];
}

function Nav({ resolvedTheme, onToggleTheme }) {
  return (
    <nav className="nav" aria-label="Primary">
      <a href="#top" className="nav-logo" style={{ textDecoration: "none", color: "inherit" }}>
        ainest
      </a>
      <div className="nav-links">
        <a href="#about">About</a>
        <a href="#tech">Tech</a>
        <a href="#partners">Partners</a>
        <a href="#contact">Contact</a>
        <button
          type="button"
          className="nav-theme-toggle"
          aria-label={`Switch to ${resolvedTheme === "dark" ? "light" : "dark"} mode`}
          onClick={onToggleTheme}
        >
          {resolvedTheme === "dark" ? (
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <circle cx="12" cy="12" r="4" />
              <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41" />
            </svg>
          ) : (
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d="M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8z" />
            </svg>
          )}
        </button>
      </div>
    </nav>
  );
}

function App() {
  const [resolvedTheme, setTheme] = useTheme();

  // apply fixed design tokens + resolved theme to <html>
  useEffect(() => {
    const root = document.documentElement;
    root.setAttribute("data-theme", resolvedTheme);
    root.setAttribute("data-accent", SETTINGS.accent);
    root.setAttribute("data-typepair", SETTINGS.typePair);
  }, [resolvedTheme]);

  return (
    <div className="page">
      <Nav
        resolvedTheme={resolvedTheme}
        onToggleTheme={() => setTheme(resolvedTheme === "dark" ? "light" : "dark")}
      />
      <Hero
        variant={SETTINGS.heroVariant}
        animate={SETTINGS.waveAnimation}
        motion={SETTINGS.motion}
      />
      <About />
      <Sectors />
      <Partners />
      <Contact />
      <Footer />
    </div>
  );
}

ReactDOM.createRoot(document.getElementById("root")).render(<App />);
