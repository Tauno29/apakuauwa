import { useState, type ReactNode } from "react";
import { Link, useLocation } from "wouter";
import { Menu, Phone, ShoppingBasket, X } from "lucide-react";
import { BUSINESS } from "@/data/catalog";
import { useCart } from "@/contexts/CartContext";

const LOGO = "/manus-storage/logo_d028daf8.png";
const navItems = [
  { href: "/", label: "Home" },
  { href: "/shop", label: "Shop" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];

function Brand({ inverse = false }: { inverse?: boolean }) {
  return (
    <Link href="/" className={`brand ${inverse ? "brand-inverse" : ""}`} aria-label="Apaku Awua home">
      <img src={LOGO} alt="Apaku Awua Investments CC logo" />
      <span className="brand-copy">
        <strong>Apaku Awua</strong>
        <small>Fruits &amp; Vegetables</small>
      </span>
    </Link>
  );
}

function Header() {
  const [path] = useLocation();
  const [open, setOpen] = useState(false);
  const { count } = useCart();
  const current = path === "/" ? "/" : path;

  return (
    <header className="site-header">
      <div className="header-inner">
        <Brand />
        <nav className="desktop-nav" aria-label="Main navigation">
          {navItems.map((item) => (
            <Link key={item.href} href={item.href} className={`nav-link ${current === item.href ? "is-active" : ""}`}>
              {item.label}
            </Link>
          ))}
        </nav>
        <div className="header-actions">
          <Link href="/shop" className="basket-link" aria-label={`Basket, ${count} items`}>
            <ShoppingBasket size={17} strokeWidth={2.5} />
            <span>Basket</span>
            {count > 0 && <b className="basket-count">{count}</b>}
          </Link>
          <button className="menu-toggle" type="button" aria-label={open ? "Close menu" : "Open menu"} aria-expanded={open} onClick={() => setOpen((v) => !v)}>
            {open ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>
      {open && (
        <nav className="mobile-nav" aria-label="Mobile navigation">
          {navItems.map((item) => (
            <Link key={item.href} href={item.href} className={`mobile-nav-link ${current === item.href ? "is-active" : ""}`} onClick={() => setOpen(false)}>
              {item.label}
            </Link>
          ))}
          <Link href="/shop" className="mobile-nav-link" onClick={() => setOpen(false)}>🧺 Basket{count > 0 ? ` (${count})` : ""}</Link>
        </nav>
      )}
    </header>
  );
}

function Hours() {
  return (
    <div className="footer-hours">
      <strong>Opening hours</strong>
      {BUSINESS.hours.map((item) => <div className="footer-hours-row" key={item.day}><span>{item.day}</span><span>{item.time}</span></div>)}
    </div>
  );
}

function Footer() {
  return (
    <footer className="site-footer">
      <div className="footer-inner">
        <div className="footer-brand-block">
          <Brand inverse />
          <p>{BUSINESS.tagline}. Health is wealth.</p>
        </div>
        <div className="footer-contact">
          <strong>Call or WhatsApp</strong>
          <a href="tel:+264814307010">{BUSINESS.phone}</a>
          <a href="tel:+264814306048">{BUSINESS.alternatePhone}</a>
          <a className="footer-whatsapp" href={`https://wa.me/${BUSINESS.phoneDigits}?text=${encodeURIComponent("Hello Apaku Awua!")}`} target="_blank" rel="noreferrer">WhatsApp us →</a>
        </div>
        <Hours />
      </div>
      <div className="footer-bottom"><span>© {new Date().getFullYear()} Apaku Awua Investments CC</span><span>Quality · Freshness · Affordability</span></div>
    </footer>
  );
}

export default function SiteLayout({ children }: { children: ReactNode }) {
  return <><Header /><main>{children}</main><Footer /></>;
}
