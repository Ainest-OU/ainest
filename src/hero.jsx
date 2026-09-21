/* global React */
const { useEffect, useRef, useMemo } = React;

/**
 * Default wave motion intensity (0 = still, 1 = very active).
 * Controls BOTH the amplitude (how far waves drift) and the speed
 * (how fast they cycle). See HeroWaves below for how it's applied.
 *
 * 0.4 was chosen as a tuned sweet-spot:
 *   - visible, organic drift that reads as "alive"
 *   - slow enough to feel expensive / editorial
 *   - doesn't compete with the hero type for attention
 *
 * Users can override live via the Tweaks panel "Motion intensity" slider;
 * this constant is just the fallback when no tweak value is present.
 */
const MOTION_DEFAULT = 0.4;

/* ============================================================
   VARIANT A — Flowing Waves (most literal to LinkedIn banner)
   ============================================================ */
function HeroWaves({ animate, motion = MOTION_DEFAULT }) {
  const pathsRef = useRef([]);

  useEffect(() => {
    if (!animate || motion <= 0) {
      // reset to no transform when motion is zero
      pathsRef.current.forEach((p) => p && p.setAttribute("transform", "translate(0 0)"));
      return;
    }
    let raf;
    const start = performance.now();
    const tick = (t) => {
      const dt = (t - start) / 1000;
      // motion scales BOTH speed and amplitude so 0 = still, 1 = very active
      const ampScale = motion;
      const speedScale = 0.2 + motion * 1.1; // 0.2..1.3
      pathsRef.current.forEach((p, i) => {
        if (!p) return;
        const speedX = (0.35 + i * 0.04) * speedScale;
        const speedY = (0.28 + i * 0.03) * speedScale;
        const phaseX = dt * speedX + i * 0.7;
        const phaseY = dt * speedY + i * 0.5;
        const x = (Math.sin(phaseX) * 110 + Math.sin(phaseX * 0.43) * 28) * ampScale;
        const y = (Math.cos(phaseY) * 42 + Math.sin(phaseY * 0.7 + i) * 12) * ampScale;
        p.setAttribute("transform", `translate(${x} ${y})`);
      });
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [animate, motion]);

  // Hero waves — fill 1920×1080 viewport only; continuation is rendered separately in the next section.
  const bands = useMemo(() => ([
    { d: "M -200 320 C 220 180, 520 540, 900 360 S 1600 160, 2200 340 L 2200 420 C 1600 260, 1200 600, 900 440 S 220 260, -200 420 Z", fill: "#0A0A0B" },
    { d: "M -200 420 C 260 280, 600 640, 950 460 S 1700 260, 2200 440 L 2200 540 C 1700 360, 1250 700, 950 560 S 260 380, -200 540 Z", fill: "#F4F1EA" },
    { d: "M -200 540 C 280 400, 640 760, 1000 580 S 1750 380, 2200 560 L 2200 680 C 1750 480, 1280 820, 1000 680 S 280 500, -200 680 Z", fill: "#2C6BD6" },
    { d: "M -200 680 C 300 540, 680 900, 1040 720 S 1780 520, 2200 700 L 2200 820 C 1780 620, 1300 960, 1040 820 S 300 640, -200 820 Z", fill: "#0A0A0B" },
    { d: "M -200 820 C 320 680, 720 1040, 1080 860 S 1820 660, 2200 840 L 2200 1000 C 1820 760, 1320 1100, 1080 960 S 320 780, -200 960 Z", fill: "#F4F1EA" },
    { d: "M -200 960 C 340 820, 760 1180, 1120 1000 S 1860 800, 2200 980 L 2200 1100 L -200 1100 Z", fill: "#2C6BD6" },
  ]), []);

  return (
    <svg
      viewBox="0 0 1920 1080"
      preserveAspectRatio="none"
      style={{ width: "100%", height: "100%", display: "block" }}
    >
      <defs>
        <linearGradient id="heroFadeTop" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#0A0A0B" stopOpacity="0.7" />
          <stop offset="1" stopColor="#0A0A0B" stopOpacity="0" />
        </linearGradient>
        <linearGradient id="heroFadeLeft" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" stopColor="#0A0A0B" stopOpacity="0.92" />
          <stop offset="0.45" stopColor="#0A0A0B" stopOpacity="0.6" />
          <stop offset="1" stopColor="#0A0A0B" stopOpacity="0" />
        </linearGradient>
        {/* Bottom fade into page bg — simple linear dissolve */}
        <linearGradient id="heroFadeBottom" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0"    stopColor="var(--bg)" stopOpacity="0" />
          <stop offset="0.55" stopColor="var(--bg)" stopOpacity="0.25" />
          <stop offset="0.85" stopColor="var(--bg)" stopOpacity="0.8" />
          <stop offset="1"    stopColor="var(--bg)" stopOpacity="1" />
        </linearGradient>
      </defs>

      <rect width="1920" height="1080" fill="#0A0A0B" />

      <g style={{ transformOrigin: "center" }}>
        {bands.map((b, i) => (
          <path
            key={i}
            ref={(el) => (pathsRef.current[i] = el)}
            d={b.d}
            fill={b.fill}
          />
        ))}
      </g>

      <rect width="1920" height="420" fill="url(#heroFadeTop)" />
      <rect x="0" y="0" width="1200" height="1080" fill="url(#heroFadeLeft)" />
      {/* Simple linear dissolve into page bg */}
      <rect x="0" y="700" width="1920" height="380" fill="url(#heroFadeBottom)" />
    </svg>
  );
}

/* Continuation waves rendered at the TOP of the first section — picks up the hero's cadence and fades into bg by ~1/3 into the section. */
function HeroContinuation({ animate }) {
  const pathsRef = useRef([]);

  useEffect(() => {
    if (!animate) return;
    let raf;
    const start = performance.now();
    const tick = (t) => {
      const dt = (t - start) / 1000;
      pathsRef.current.forEach((p, i) => {
        if (!p) return;
        const phase = dt * 0.08 + i * 0.35;
        const x = Math.sin(phase) * 40;
        const y = Math.cos(phase * 0.8) * 14;
        p.setAttribute("transform", `translate(${x} ${y})`);
      });
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [animate]);

  // Bands across 1920×600. Top band continues the bottom hero band seamlessly.
  const bands = [
    { d: "M -200 0   C 260 -80,  640 80,   1000 -20  S 1760 -120, 2200 -20  L 2200 120 C 1760 40,  1320 200,  1000 100  S 260 40,   -200 160  Z", fill: "#0A0A0B" },
    { d: "M -200 120 C 280 40,   680 200,  1040 100  S 1780 0,    2200 100  L 2200 240 C 1780 160, 1340 320,  1040 220  S 280 160,  -200 280  Z", fill: "#F4F1EA" },
    { d: "M -200 240 C 300 160,  720 320,  1080 220  S 1800 120,  2200 220  L 2200 360 C 1800 280, 1360 440,  1080 340  S 300 280,  -200 400  Z", fill: "#2C6BD6" },
    { d: "M -200 360 C 320 280,  760 440,  1120 340  S 1820 240,  2200 340  L 2200 500 C 1820 420, 1380 560,  1120 480  S 320 420,  -200 540  Z", fill: "#0A0A0B" },
    { d: "M -200 500 C 340 420,  800 580,  1160 480  S 1840 380,  2200 480  L 2200 640 L -200 640 Z", fill: "#F4F1EA" },
  ];

  return (
    <svg
      viewBox="0 0 1920 640"
      preserveAspectRatio="none"
      style={{ width: "100%", height: "100%", display: "block" }}
    >
      <defs>
        {/* fade starts transparent at top (seamless with hero), dissolves to bg by ~65% down */}
        <linearGradient id="contFadeBottom" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0"    stopColor="var(--bg)" stopOpacity="0" />
          <stop offset="0.35" stopColor="var(--bg)" stopOpacity="0.25" />
          <stop offset="0.65" stopColor="var(--bg)" stopOpacity="0.75" />
          <stop offset="1"    stopColor="var(--bg)" stopOpacity="1" />
        </linearGradient>
      </defs>

      <g style={{ transformOrigin: "center" }}>
        {bands.map((b, i) => (
          <path
            key={i}
            ref={(el) => (pathsRef.current[i] = el)}
            d={b.d}
            fill={b.fill}
          />
        ))}
      </g>

      <rect x="0" y="0" width="1920" height="640" fill="url(#contFadeBottom)" />
    </svg>
  );
}

/* ============================================================
   VARIANT B — Molecular field (quantum/particle hero)
   ============================================================ */
function HeroMolecular({ animate }) {
  const canvasRef = useRef(null);
  const rafRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");

    const resize = () => {
      const dpr = window.devicePixelRatio || 1;
      canvas.width = canvas.clientWidth * dpr;
      canvas.height = canvas.clientHeight * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    resize();
    window.addEventListener("resize", resize);

    // particle field
    const N = 70;
    const particles = Array.from({ length: N }, () => ({
      x: Math.random() * canvas.clientWidth,
      y: Math.random() * canvas.clientHeight,
      vx: (Math.random() - 0.5) * 0.18,
      vy: (Math.random() - 0.5) * 0.18,
      r: Math.random() * 2.5 + 1.2,
    }));

    const LINK = 160;

    const draw = () => {
      const W = canvas.clientWidth;
      const H = canvas.clientHeight;
      ctx.clearRect(0, 0, W, H);

      // background
      ctx.fillStyle = "#0A0A0B";
      ctx.fillRect(0, 0, W, H);

      // update
      for (const p of particles) {
        if (animate) {
          p.x += p.vx;
          p.y += p.vy;
          if (p.x < 0 || p.x > W) p.vx *= -1;
          if (p.y < 0 || p.y > H) p.vy *= -1;
        }
      }

      // links
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const a = particles[i], b = particles[j];
          const dx = a.x - b.x, dy = a.y - b.y;
          const d = Math.sqrt(dx * dx + dy * dy);
          if (d < LINK) {
            const alpha = (1 - d / LINK) * 0.35;
            ctx.strokeStyle = `rgba(44, 107, 214, ${alpha})`;
            ctx.lineWidth = 0.6;
            ctx.beginPath();
            ctx.moveTo(a.x, a.y);
            ctx.lineTo(b.x, b.y);
            ctx.stroke();
          }
        }
      }

      // nodes
      for (const p of particles) {
        ctx.fillStyle = "#F4F1EA";
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fill();
      }

      rafRef.current = requestAnimationFrame(draw);
    };
    draw();

    return () => {
      cancelAnimationFrame(rafRef.current);
      window.removeEventListener("resize", resize);
    };
  }, [animate]);

  return (
    <div style={{ position: "absolute", inset: 0, background: "#0A0A0B" }}>
      <canvas
        ref={canvasRef}
        style={{ width: "100%", height: "100%", display: "block" }}
      />
      {/* overlaid big circles suggesting orbital shells */}
      <svg
        viewBox="0 0 1920 1080"
        preserveAspectRatio="xMidYMid slice"
        style={{ position: "absolute", inset: 0, width: "100%", height: "100%", pointerEvents: "none" }}
      >
        <g fill="none" stroke="rgba(244,241,234,0.08)" strokeWidth="1">
          <circle cx="1400" cy="540" r="300" />
          <circle cx="1400" cy="540" r="440" />
          <circle cx="1400" cy="540" r="580" />
        </g>
        <circle cx="1400" cy="540" r="8" fill="#2C6BD6" />
      </svg>
    </div>
  );
}

/* ============================================================
   VARIANT C — Editorial / Mono (big type, stripe field)
   ============================================================ */
function HeroEditorial({ animate }) {
  const stripesRef = useRef(null);

  useEffect(() => {
    if (!animate) return;
    const el = stripesRef.current;
    if (!el) return;
    let raf;
    const start = performance.now();
    const tick = (t) => {
      const dt = (t - start) / 1000;
      el.style.transform = `translateX(${Math.sin(dt * 0.3) * 40}px)`;
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [animate]);

  return (
    <div style={{ position: "absolute", inset: 0, background: "#0A0A0B", overflow: "hidden" }}>
      {/* diagonal stripe band — subtle */}
      <svg
        viewBox="0 0 1920 1080"
        preserveAspectRatio="xMidYMid slice"
        style={{ position: "absolute", inset: 0, width: "100%", height: "100%" }}
      >
        <defs>
          <pattern id="stripePat" width="6" height="6" patternUnits="userSpaceOnUse" patternTransform="rotate(35)">
            <rect width="6" height="6" fill="#0A0A0B" />
            <rect width="1" height="6" fill="rgba(244,241,234,0.18)" />
          </pattern>
        </defs>
        <g ref={stripesRef}>
          <rect x="-200" y="0" width="2400" height="1080" fill="url(#stripePat)" />
        </g>
        {/* big blue wedge */}
        <path d="M 1100 0 L 1920 0 L 1920 1080 L 1440 1080 Z" fill="#2C6BD6" opacity="0.85" />
        <path d="M 1400 0 L 1920 0 L 1920 1080 L 1700 1080 Z" fill="#0A0A0B" />
      </svg>

      {/* floating tick marks — scientific ruler */}
      <svg
        viewBox="0 0 1920 1080"
        preserveAspectRatio="xMidYMid slice"
        style={{ position: "absolute", inset: 0, width: "100%", height: "100%", pointerEvents: "none" }}
      >
        <g stroke="rgba(244,241,234,0.35)" strokeWidth="1">
          {Array.from({ length: 30 }).map((_, i) => (
            <line key={i} x1={80 + i * 24} y1="960" x2={80 + i * 24} y2={i % 5 === 0 ? 940 : 950} />
          ))}
        </g>
      </svg>
    </div>
  );
}

/* ============================================================
   HERO shell
   ============================================================ */
function Hero({ variant, animate, motion }) {
  return (
    <section className="hero" id="top" data-screen-label="01 Hero">
      <div className="hero-stage">
        {variant === "waves" && <HeroWaves animate={animate} motion={motion} />}
        {variant === "molecular" && <HeroMolecular animate={animate} />}
        {variant === "editorial" && <HeroEditorial animate={animate} />}
      </div>

      <div className="hero-content">
        <div className="hero-top">
          <div><span className="dot" />Ainest OÜ</div>
        </div>

        <div className="hero-main">
          <h1 className="hero-title">
            Discovering <em>matter,</em><br/>
            faster<br/>
            <em>than ever.</em>
          </h1>
        </div>

        <div>
          <div className="hero-bottom">
            <p className="hero-lede">
              <strong>Ainest</strong>, where material science meets machine learning, AI, and high-throughput research software engineering.
            </p>
            <div className="hero-meta">
              <div>§ Deep-tech R&amp;D</div>
              <div>§ Digital-first laboratory</div>
              <div>§ Open science</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}


Object.assign(window, { Hero, HeroContinuation });
