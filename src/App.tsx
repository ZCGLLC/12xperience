import { FormEvent, useEffect, useMemo, useRef, useState } from "react";
import {
  experiences,
  instagram,
  linkedin,
  lookbook,
  partners,
  press,
  reuters,
} from "./data";

const nav = [
  { id: "house", label: "The house" },
  { id: "experiences", label: "Experiences" },
  { id: "lookbook", label: "Lookbook" },
  { id: "press", label: "Press" },
  { id: "brands", label: "Brands" },
  { id: "visit", label: "Visit" },
];

function useReveal() {
  useEffect(() => {
    const nodes = document.querySelectorAll<HTMLElement>("[data-reveal]");
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-in");
            io.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.16, rootMargin: "0px 0px -8% 0px" }
    );
    nodes.forEach((n) => io.observe(n));
    return () => io.disconnect();
  }, []);
}

export default function App() {
  const [booting, setBooting] = useState(true);
  const [scrolled, setScrolled] = useState(false);
  const [menu, setMenu] = useState(false);
  const [active, setActive] = useState("top");
  const [lightbox, setLightbox] = useState<number | null>(null);
  const [sent, setSent] = useState(false);
  const year = useMemo(() => new Date().getFullYear(), []);
  const heroRef = useRef<HTMLElement | null>(null);

  useReveal();

  useEffect(() => {
    const t = window.setTimeout(() => setBooting(false), 2400);
    return () => window.clearTimeout(t);
  }, []);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = booting || menu || lightbox !== null ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [booting, menu, lightbox]);

  useEffect(() => {
    const t = window.setTimeout(() => {
      document.querySelectorAll<HTMLElement>("[data-reveal]").forEach((n) => n.classList.add("is-in"));
    }, 1800);
    return () => window.clearTimeout(t);
  }, []);

  useEffect(() => {
    const ids = ["top", ...nav.map((n) => n.id)];
    const els = ids
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => Boolean(el));
    const io = new IntersectionObserver(
      (entries) => {
        const vis = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (vis?.target.id) setActive(vis.target.id);
      },
      { threshold: [0.2, 0.45, 0.7] }
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, [booting]);

  const go = (id: string) => {
    setMenu(false);
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    e.currentTarget.reset();
    setSent(true);
  };

  return (
    <>
      <div className={`loader ${booting ? "" : "is-done"}`} aria-hidden={!booting}>
        <div className="loader-mark">XII</div>
        <p>12XPERIENCE</p>
        <span>Karachi · a social house</span>
      </div>

      <a className="skip" href="#top">
        Skip to content
      </a>

      <header className={`nav ${scrolled || menu ? "is-scrolled" : ""}`}>
        <button className="brand" onClick={() => go("top")} aria-label="Back to top">
          <span className="brand-xii">XII</span>
          <span className="brand-word">
            12X<span>PERIENCE</span>
          </span>
        </button>
        <nav className="nav-links" aria-label="Primary">
          {nav.map((item) => (
            <button
              key={item.id}
              className={active === item.id ? "is-active" : ""}
              onClick={() => go(item.id)}
            >
              {item.label}
            </button>
          ))}
        </nav>
        <a className="nav-cta" href={instagram} target="_blank" rel="noreferrer">
          Instagram
        </a>
        <button
          className={`burger ${menu ? "is-open" : ""}`}
          aria-label="Menu"
          onClick={() => setMenu((v) => !v)}
        >
          <i />
          <i />
        </button>
      </header>

      <div className={`screen-menu ${menu ? "is-open" : ""}`}>
        <div className="screen-menu-inner">
          {nav.map((item, i) => (
            <button key={item.id} style={{ transitionDelay: `${i * 60}ms` }} onClick={() => go(item.id)}>
              <em>0{i + 1}</em>
              {item.label}
            </button>
          ))}
          <a href={instagram} target="_blank" rel="noreferrer">
            @12xperience
          </a>
        </div>
      </div>

      <main>
        <section id="top" className="hero" ref={heroRef}>
          <div className="hero-media">
            <img src="/images/hero-neon-padel.jpg" alt="Guests dancing under neon light at a 12Xperience padel night in Karachi" />
            <div className="hero-shade" />
          </div>
          <div className="hero-copy">
            <p className="eyebrow">
              <span>Karachi</span>
              <span>Est. 2025</span>
              <span>No alcohol · No drugs</span>
            </p>
            <h1>
              The night,
              <em> clarified.</em>
            </h1>
            <p className="lede">
              12Xperience is a social experiential house built on music, wellness, and
              community. Curated rooms. Live DJ sets. Real connections — without chaos.
            </p>
            <div className="hero-actions">
              <button className="btn gold" onClick={() => go("experiences")}>
                Enter the house
              </button>
              <a className="btn ghost" href={instagram} target="_blank" rel="noreferrer">
                Next night on Instagram
              </a>
            </div>
          </div>
          <div className="hero-meta">
            <span>Featured in Reuters</span>
            <span>DHA Phase 6, Karachi</span>
            <span>Once a month, by design</span>
          </div>
          <button className="scroll-cue" onClick={() => go("house")} aria-label="Scroll">
            <span>Scroll</span>
          </button>
        </section>

        <section className="ticker" aria-hidden>
          <div className="ticker-track">
            {Array.from({ length: 2 }).map((_, k) => (
              <p key={k}>
                Music · Wellness · Community · Live DJ sets · Neon padel · Coffee raves ·
                Brand worlds · Say no to alcohol &amp; drugs · Curated guest lists ·
              </p>
            ))}
          </div>
        </section>

        <section id="house" className="house">
          <div className="house-grid">
            <div className="house-sticky" data-reveal>
              <p className="kicker">The house</p>
              <h2>
                A movement that started as a simple idea — and became Karachi’s new social frequency.
              </h2>
            </div>
            <div className="house-body" data-reveal>
              <p>
                Founded by Usman Ahmad, 12Xperience exists so young Karachi can gather in the
                open: inclusive, safe, and unforgettable rooms where people dance, mingle, and
                express themselves without the risks of underground nightlife.
              </p>
              <blockquote>
                “This is about creating a space where people feel safe. Without alcohol,
                without drugs, without chaos.”
                <cite>Usman Ahmad, Founder</cite>
              </blockquote>
              <p>
                Crowd numbers are capped. Venues are approved. The music knows when to end.
                Guardrails are the point — without them, you recreate the same risks people
                came to leave behind.
              </p>
              <ul className="pills">
                <li>Music</li>
                <li>Wellness</li>
                <li>Community</li>
                <li>Holistic, monthly</li>
              </ul>
            </div>
          </div>

          <div className="stats" data-reveal>
            <article>
              <b>XII</b>
              <span>A year of nights — one considered experience at a time.</span>
            </article>
            <article>
              <b>09+</b>
              <span>Community editions, including Nitro Night with hundreds in the room.</span>
            </article>
            <article>
              <b>00</b>
              <span>Alcohol. Drugs. Chaos. The house is built on their absence.</span>
            </article>
            <article>
              <b>∞</b>
              <span>Reuters, French television, and a story that travelled the world.</span>
            </article>
          </div>
        </section>

        <section id="experiences" className="experiences">
          <header className="section-head" data-reveal>
            <p className="kicker">Experiences</p>
            <h2>Six ways the night can feel.</h2>
            <p>
              Community nights for a curated list of attendees — and private worlds for brands
              who would rather be felt than merely seen.
            </p>
          </header>
          <div className="exp-list">
            {experiences.map((item) => (
              <article key={item.num} className="exp-card" data-reveal>
                <div className="exp-img">
                  <img src={item.image} alt={item.title} />
                </div>
                <div className="exp-copy">
                  <span>{item.num}</span>
                  <h3>{item.title}</h3>
                  <p className="place">{item.place}</p>
                  <p>{item.copy}</p>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section id="lookbook" className="lookbook">
          <header className="section-head invert" data-reveal>
            <p className="kicker">Lookbook</p>
            <h2>Rooms we have already made.</h2>
            <p>
              Neon padel at Padelverse. Coffee-forward nights at Café Ammos. A house that
              photographs like a movement because it is one.
            </p>
          </header>
          <div className="masonry">
            {lookbook.map((shot, i) => (
              <button
                key={shot.src}
                className={`tile t-${i}`}
                data-reveal
                onClick={() => setLightbox(i)}
              >
                <img src={shot.src} alt={shot.title} />
                <span>
                  <strong>{shot.title}</strong>
                  {shot.meta}
                </span>
              </button>
            ))}
          </div>
        </section>

        <section id="press" className="press">
          <header className="section-head" data-reveal>
            <p className="kicker">In the world</p>
            <h2>The story left the room.</h2>
            <p>
              In February 2026, Reuters’ Ariba Shahid reported from our neon padel night —
              a feature syndicated internationally, including French television reaching five
              million viewers.
            </p>
          </header>
          <div className="press-grid">
            {press.map((item) => (
              <a key={item.name} className="press-card" href={item.href} target="_blank" rel="noreferrer" data-reveal>
                <em>{item.name}</em>
                <h3>{item.line}</h3>
                <span>{item.by}</span>
              </a>
            ))}
          </div>
          <a className="text-link" href={reuters} target="_blank" rel="noreferrer">
            Read the Reuters feature →
          </a>
        </section>

        <section id="brands" className="brands">
          <div className="brands-media">
            <img src="/images/brands-activation.jpg" alt="Guests gathering around a 12Xperience brand experience" />
          </div>
          <div className="brands-copy" data-reveal>
            <p className="kicker">For brands</p>
            <h2>Stop advertising at communities. Become part of them.</h2>
            <p>
              Most brands still spend money trying to get noticed. The ones who work with us
              create experiences people actually want to be inside — product launches, equity,
              content, trial, and conversations that last after the lights come up.
            </p>
            <ul>
              <li>Entertainment, wellness, food, travel, lifestyle, retail</li>
              <li>Monthly community nights + standalone private activations</li>
              <li>Integration into moments, not booths and banners</li>
            </ul>
            <div className="partner-row">
              {partners.map((p) => (
                <span key={p}>{p}</span>
              ))}
            </div>
            <a className="btn gold" href={instagram} target="_blank" rel="noreferrer">
              Partner with the house
            </a>
          </div>
        </section>

        <section id="visit" className="visit">
          <div className="visit-copy" data-reveal>
            <p className="kicker">Visit</p>
            <h2>The list is curated. The door is still a conversation.</h2>
            <p>
              Follow the next night on Instagram, write to the house, or ask about a private
              world for your brand. We are based in DHA Phase 6, Karachi.
            </p>
            <div className="visit-links">
              <a href={instagram} target="_blank" rel="noreferrer">
                Instagram · @12xperience
              </a>
              <a href={linkedin} target="_blank" rel="noreferrer">
                LinkedIn · 12Xperience
              </a>
              <a href="mailto:house@12xperience.studio">house@12xperience.studio</a>
            </div>
          </div>
          <form className="card-form" onSubmit={onSubmit} data-reveal>
            <label>
              Name
              <input name="name" required placeholder="Your name" />
            </label>
            <label>
              Email
              <input name="email" type="email" required placeholder="you@studio.com" />
            </label>
            <label>
              I am here for
              <select name="intent" defaultValue="A night">
                <option>A night</option>
                <option>A brand partnership</option>
                <option>A private experience</option>
                <option>Press</option>
              </select>
            </label>
            <label>
              Note
              <textarea name="message" rows={4} placeholder="Tell us what you want the room to feel like." />
            </label>
            <button className="btn gold wide" type="submit">
              {sent ? "Sent — we will find you" : "Write to the house"}
            </button>
            <small>
              {sent
                ? "Received on this page. For a real reply, DM @12xperience — the house email is a placeholder."
                : "This uses a placeholder inbox. For a real reply, DM @12xperience."}
            </small>
          </form>
        </section>
      </main>

      <footer className="footer">
        <div className="footer-brand">
          <img src="/images/logo.jpg" alt="12Xperience mark" />
          <div>
            <strong>12XPERIENCE</strong>
            <p>A social experience: music, wellness, community. Live DJ sets. Great vibes. Real connections.</p>
          </div>
        </div>
        <div className="footer-cols">
          <div>
            <span>House</span>
            <a href={instagram} target="_blank" rel="noreferrer">
              Instagram
            </a>
            <a href={linkedin} target="_blank" rel="noreferrer">
              LinkedIn
            </a>
            <a href={reuters} target="_blank" rel="noreferrer">
              Reuters
            </a>
          </div>
          <div>
            <span>Karachi</span>
            <p>DHA Phase 6</p>
            <p>Pakistan</p>
          </div>
          <div>
            <span>Creed</span>
            <p>No alcohol.</p>
            <p>No drugs.</p>
            <p>No chaos.</p>
          </div>
        </div>
        <p className="legal">© {year} 12Xperience. All nights reserved.</p>
      </footer>

      {lightbox !== null && (
        <div className="lightbox" onClick={() => setLightbox(null)} role="dialog" aria-modal>
          <button className="lb-close" aria-label="Close" onClick={() => setLightbox(null)}>
            Close
          </button>
          <img src={lookbook[lightbox].src} alt={lookbook[lightbox].title} />
          <p>
            <strong>{lookbook[lightbox].title}</strong>
            {lookbook[lightbox].meta}
          </p>
        </div>
      )}
    </>
  );
}
