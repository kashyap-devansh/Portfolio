import { useEffect, useState } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { AnimatePresence, motion, useMotionValueEvent, useScroll } from "framer-motion";
import { profile } from "../data/site.js";
import { useClock, useTheme } from "./hooks.js";
import { ease } from "./motion.jsx";

const links = [
  { to: "/", label: "Index", end: true },
  { to: "/projects", label: "Projects" },
  { to: "/about", label: "About" },
  { to: "/#contact", label: "Contact" },
];

function ThemeToggle({ theme, toggle }) {
  const light = theme === "light";
  return (
    <button
      className="nav__icon-btn"
      onClick={toggle}
      aria-label={`Switch to ${light ? "dark" : "light"} theme`}
    >
      <svg viewBox="0 0 24 24" width="16" height="16" fill="none" aria-hidden="true">
        <motion.circle
          cx="12"
          cy="12"
          stroke="currentColor"
          strokeWidth="1.5"
          animate={{ r: light ? 4.5 : 7, fill: light ? "rgba(0,0,0,0)" : "currentColor" }}
          transition={{ duration: 0.5, ease }}
        />
        <motion.g
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          animate={{ opacity: light ? 1 : 0, rotate: light ? 0 : -90, scale: light ? 1 : 0.5 }}
          style={{ originX: "12px", originY: "12px" }}
          transition={{ duration: 0.5, ease }}
        >
          {[0, 45, 90, 135, 180, 225, 270, 315].map((a) => (
            <line key={a} x1="12" y1="1.5" x2="12" y2="4" transform={`rotate(${a} 12 12)`} />
          ))}
        </motion.g>
      </svg>
    </button>
  );
}

export default function Navbar({ ready }) {
  const [theme, toggleTheme] = useTheme();
  const [open, setOpen] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const time = useClock(profile.timeZone);
  const { pathname } = useLocation();
  const { scrollY } = useScroll();

  // Hide when scrolling down, reveal when scrolling up.
  useMotionValueEvent(scrollY, "change", (y) => {
    const prev = scrollY.getPrevious() ?? 0;
    setScrolled(y > 20);
    setHidden(y > 400 && y > prev && !open);
  });

  useEffect(() => setOpen(false), [pathname]);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
  }, [open]);

  return (
    <>
      <motion.header
        className={`nav ${scrolled ? "nav--scrolled" : ""}`}
        initial={{ y: "-100%" }}
        animate={{ y: ready && !hidden ? "0%" : "-100%" }}
        transition={{ duration: 0.7, ease, delay: ready && !scrolled ? 0.9 : 0 }}
      >
        <Link to="/" className="nav__logo" aria-label="Home">
          <span className="faint">&lt;</span>
          DevΛnsh
          <span className="faint">/&gt;</span>
          <span className="nav__caret" />
        </Link>

        <nav className="nav__links" aria-label="Primary">
          {links.map((l, i) => (
            <NavLink key={l.to} to={l.to} end={l.end} className="nav__link hud-label">
              {({ isActive }) => (
                <>
                  <span className="faint">0{i + 1}</span>
                  <span>{l.label}</span>
                  {isActive && !l.to.includes("#") && (
                    <motion.span layoutId="nav-active" className="nav__active" />
                  )}
                </>
              )}
            </NavLink>
          ))}
        </nav>

        <div className="nav__right">
          <span className="nav__clock hud-label">
            <span className="pulse-dot" />
            <span className="faint">IN</span> {time}
          </span>
          <ThemeToggle theme={theme} toggle={toggleTheme} />
          <Link to="/#contact" className="btn btn--solid nav__cta">
            Let's talk
          </Link>
          <button
            className="nav__icon-btn nav__burger"
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            onClick={() => setOpen((o) => !o)}
          >
            <span className={`burger ${open ? "is-open" : ""}`}>
              <span />
              <span />
            </span>
          </button>
        </div>
      </motion.header>

      <AnimatePresence>
        {open && (
          <motion.div
            className="menu"
            initial={{ clipPath: "inset(0 0 100% 0)" }}
            animate={{ clipPath: "inset(0 0 0% 0)" }}
            exit={{ clipPath: "inset(0 0 100% 0)" }}
            transition={{ duration: 0.7, ease: [0.83, 0, 0.17, 1] }}
          >
            <nav className="menu__links" aria-label="Mobile">
              {links.map((l, i) => (
                <div className="mask" key={l.to}>
                  <motion.div
                    initial={{ y: "110%" }}
                    animate={{ y: "0%" }}
                    exit={{ y: "110%" }}
                    transition={{ duration: 0.8, ease, delay: 0.15 + i * 0.06 }}
                  >
                    <Link to={l.to} className="menu__link" onClick={() => setOpen(false)}>
                      <span className="hud-label accent">0{i + 1}</span>
                      {l.label}
                    </Link>
                  </motion.div>
                </div>
              ))}
            </nav>
            <motion.div
              className="menu__foot hud-label"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1, transition: { delay: 0.5 } }}
              exit={{ opacity: 0 }}
            >
              <a href={`mailto:${profile.email}`}>{profile.email}</a>
              <a href={profile.github} target="_blank" rel="noreferrer">
                GitHub ↗
              </a>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
