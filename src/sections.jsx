/* global React */
const { useEffect, useRef } = React;

/* ---------- scroll reveal hook ---------- */
function useReveal() {
  const ref = useRef(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add("in");
            io.unobserve(e.target);
          }
        });
      },
      { threshold: 0.15, rootMargin: "0px 0px -60px 0px" }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);
  return ref;
}

/* ============================================================
   ABOUT
   ============================================================ */
function About() {
  const ref = useReveal();
  return (
    <section className="about" id="about" data-screen-label="02 About">


      <div className="section-inner">
        <div className="about-intro">
          <div className="about-intro-meta">
            <div>§ 01 / Overview</div>
            <div>Ainest OÜ</div>
          </div>
          <h2 className="about-big">
            A fully <em>digital</em> laboratory<br/>
            for the discovery<span className="tick" />of <em>new matter.</em>
          </h2>
        </div>

        <div className="about-grid about-grid-main">
          <div className="about-label">
            <div className="mono-label">§ Mission</div>
          </div>

          <div ref={ref} className="about-copy reveal">
            <div className="about-body">
              <p>
                At <strong>Ainest OÜ</strong> we drive deep-tech innovation by converting
                fundamental research into high-impact industrial applications. We
                accelerate the discovery of new materials through a fully digital
                laboratory environment, developing and applying novel thermodynamic
                theories and quantum technologies.
              </p>
              <p>
                Our mission is to compose a usable and useful molecular simulation infrastructure 
                that supports easy adaptions in manufacturing sectors. We deliver high-throughput 
                workflows from problem-finding to solution-crafting in record time. 
              </p>
              <p>
                Our work is built on the global principles of open science,
                sustainable software engineering, and rigorous first-principles
                methods. What happens at the atomic scale determines what is
                possible at the industrial one.
              </p>
            </div>

            <div className="about-factrow">
              <div className="fact">
                <div className="n">Digital</div>
                <div className="l">Laboratory environment</div>
              </div>
              <div className="fact">
                <div className="n">Quantum</div>
                <div className="l">Accuracy</div>
              </div>
              <div className="fact">
                <div className="n">Open</div>
                <div className="l">Science principles</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ============================================================
   SECTORS
   ============================================================ */
const SECTORS = [
  {
    num: "01",
    name: "Fast\u00a0Algorithm",
    em: "Nested Sampling",
    desc:
      // "Understanding, optimising and redefining vital manufacturing processes, from nanoscale atomic and molecular simulations capturing materials' quantum and thermodynamic behaviours.",
      "The Bayesian-based autonomous search engine for material design, when combined with cutting-edge AI, machine leaning, and optimisation techniques, offers unprecedented levels of speed and accuracy.",
    apps: ["Nanoscale simulation", "Quantum & thermo modelling", "Real-world processes"],
  },
  {
    num: "02",
    name: "Rapid\u00a0Prototyping",
    em: "Powered by Julia",
    desc:
      "Designing catalysts, electrolytes and storage materials from first principles, compressing decade-long development cycles into months through quantum-accurate simulation, powered by our Julia-based backend.",
    apps: ["Fast problem finding", "Rapid solution development", "Easy user onboarding"],
  },
  {
    num: "03",
    name: "Sustainable\u00a0Code",
    em: "Open and Sovereign",
    desc:
      // "Hardened, sovereign materials pipelines for optics, sensing and energetics, delivered through a simulation stack that keeps IP onshore and under the right jurisdiction.",
      "Ainest maintains hardened, open and sustainable materials discovery pipelines and codebases through best research software engineering practices, keeping the fundamental science open, and key technologies sovereign.",
    apps: ["Open ecosystem", "Sovereign ownership", "Societal responsibility"],
  },
];

function Sectors() {
  const headRef = useReveal();
  const listRef = useReveal();
  return (
    <section className="tech" id="tech" data-screen-label="03 Sectors">
      <div className="section-inner">
        <div ref={headRef} className="sectors-head reveal">
          <div>
            <div className="mono-label">§ 02 / Tech</div>
          </div>
          <h2 className="sectors-title">
            Three key ingredients that guarantee our unparalleled speed:
          </h2>
        </div>

        <div ref={listRef} className="sector-list reveal-stagger">
          {SECTORS.map((s) => (
            <article className="sector" key={s.num}>
              <div className="sector-num">{s.num}</div>
              <div className="sector-name">
                {s.name}<br/>
                <em>{s.em}</em>
              </div>
              <div className="sector-desc">{s.desc}</div>
              <div className="sector-apps">
                {s.apps.map((a) => <span key={a}>{a}</span>)}
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ============================================================
   PARTNERS
   ------------------------------------------------------------
   Logos live in app/assets/logos/ as SVG, taken from each
   institution's own brand asset. They render as a monochrome
   silhouette and reveal their brand colours on hover (light
   theme only — several are dark-on-transparent and would
   disappear against the dark background).
   ============================================================ */
const PARTNERS = [
  {
    code: "P-01",
    name: "Washington University in St.\u00a0Louis",
    place: "St.\u00a0Louis, US",
    logo: "assets/logos/washu.svg",
    scale: 1,
  },
  {
    code: "P-02",
    name: "Carnegie Mellon University",
    place: "Pittsburgh, US",
    logo: "assets/logos/cmu.svg",
    scale: 1.05,
  },
  {
    code: "P-03",
    name: "EPFL",
    place: "Lausanne, CH",
    logo: "assets/logos/epfl.svg",
    scale: 0.7,
  },
  {
    code: "P-04",
    name: "University of Vienna",
    place: "Vienna, AT",
    logo: "assets/logos/univie.svg",
    scale: 1,
  },
  {
    code: "P-05",
    name: "University of G\u00f6ttingen",
    place: "G\u00f6ttingen, DE",
    logo: "assets/logos/goettingen.svg",
    scale: 0.98,
  },
  {
    code: "P-06",
    name: "Helmholtz-Zentrum Hereon",
    place: "Geesthacht, DE",
    logo: "assets/logos/hereon.svg",
    scale: 1.15,
  },
];

function Partners() {
  const ref = useReveal();
  return (
    <section className="partners" id="partners" data-screen-label="04 Partners">
      <div className="section-inner">
        <div className="partners-head">
          <div>
            <div className="mono-label" style={{ marginBottom: 16 }}>§ 03 / Partners</div>
            <h2 className="partners-title">
              Built in collaboration.
            </h2>
          </div>
          <div className="partners-note">
            Research and academic<br/>institutions we work with.
          </div>
        </div>

        <div ref={ref} className="partners-grid reveal-stagger">
          {PARTNERS.map((p) => (
            <div className="partner" key={p.code}>
              <div className="partner-tag">
                <span>{p.code}</span>
                <span>{p.place}</span>
              </div>
              <div className="partner-slot">
                <img
                  className="partner-logo"
                  style={{ "--logo-scale": p.scale }}
                  src={p.logo}
                  alt={`${p.name} logo`}
                  loading="lazy"
                  decoding="async"
                />
              </div>
              <div className="partner-name">{p.name}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ============================================================
   CONTACT
   ============================================================ */
function Contact() {
  const ref = useReveal();
  return (
    <section className="contact" id="contact" data-screen-label="05 Contact">
      <div className="section-inner">
        <div ref={ref} className="contact-grid reveal">
          <div>
            <div className="mono-label">§ 04 / Contact</div>
            <h2 className="contact-display">
              Let's simulate <em>something</em> meaningful.
            </h2>
          </div>

          <div className="contact-details">
            <div className="contact-card">
              <div className="mono-label">Email</div>
              <div className="contact-card-value">
                <a href="mailto:info@ainest.ee">info@ainest.ee</a>
              </div>
            </div>
            <div className="contact-card">
              <div className="mono-label">Entity</div>
              <div className="contact-card-value">
                Ainest OÜ<br/>
                <span style={{ color: "var(--fg-dim)" }}>Private limited company</span><br/>
                <span style={{ color: "var(--fg-dim)", fontFamily: "var(--font-mono)", fontSize: 13 }}>
                  Registry code 17432548
                </span>
              </div>
            </div>
            <div className="contact-card">
              <div className="mono-label">Social</div>
              <div className="contact-card-value">
                <a href="https://www.linkedin.com/company/ainest-ee/" target="_blank" rel="noopener noreferrer">
                  LinkedIn ↗
                </a>
              </div>
            </div>
            <div className="slogan">
              <em>Software composes when people compose.</em> Let's build the future together.
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ============================================================
   FOOTER
   ============================================================ */
function Footer() {
  return (
    <footer className="footer">
      <div className="section-inner">
        <div className="footer-grid">
          <div className="footer-mark">ainest</div>
          <div>© 2026 Ainest OÜ · All rights reserved</div>
          <div>v. 1.0</div>
        </div>
      </div>
    </footer>
  );
}

Object.assign(window, { About, Sectors, Partners, Contact, Footer });
