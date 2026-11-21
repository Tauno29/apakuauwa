import { ArrowRight, Clock3, Leaf, Phone, ShoppingBasket } from "lucide-react";
import { Link } from "wouter";
import { BUSINESS } from "@/data/catalog";

const offers = [
  { icon: "🍊", title: "Fresh Fruits", description: "Oranges, apples, bananas, pineapples, grapes" },
  { icon: "🥬", title: "Fresh Vegetables", description: "Potatoes, cabbage, onions, tomatoes, garlic" },
  { icon: "🫘", title: "Beans", description: "Quality dry beans by the kilo" },
  { icon: "🥜", title: "Dry Fruits", description: "Healthy snacks packed fresh" },
];

const steps = [
  "Choose your fruits & vegetables in our shop",
  "Tap “Send order on WhatsApp”",
  "We confirm price & pickup — fresh and ready",
];

export default function Home() {
  return (
    <>
      <section className="hero-section">
        <div className="hero-inner">
          <div className="hero-copy">
            <div className="eyebrow"><Leaf size={17} fill="currentColor" /> Fresh, Healthy, Quality</div>
            <h1>Your one-stop shop for <em>fresh</em> produce.</h1>
            <p className="hero-description">Fruits, vegetables, beans and dry fruits at fair prices. Pick your basket online and send your order straight to us on WhatsApp.</p>
            <div className="hero-actions">
              <Link href="/shop" className="button button-primary">Start your order <ArrowRight size={17} /></Link>
              <a href="tel:+264814307010" className="button button-outline"><Phone size={16} /> {BUSINESS.phone}</a>
            </div>
          </div>
          <div className="hero-visual">
            <img className="hero-photo" src="/manus-storage/storefront_8db7a994.png" alt="Apaku Awua Investments CC fresh produce shop front" />
            <div className="hero-stamp">Quality · Freshness · Affordability</div>
          </div>
        </div>
      </section>

      <section className="content-section offers-section">
        <div className="section-heading">
          <div><span className="section-kicker">GOODNESS, GROWN CLOSE</span><h2>What we offer</h2></div>
          <Link href="/shop" className="text-link">Explore the shop <ArrowRight size={16} /></Link>
        </div>
        <div className="offer-grid">
          {offers.map((offer) => (
            <Link href="/shop" className="offer-card" key={offer.title}>
              <span className="offer-emoji" aria-hidden="true">{offer.icon}</span>
              <h3>{offer.title}</h3>
              <p>{offer.description}</p>
              <span className="offer-arrow" aria-hidden="true">↗</span>
            </Link>
          ))}
        </div>
        <div className="produce-strip">
          <img src="/manus-storage/produce-stand_7513b9aa.png" alt="Fresh apples, cabbage, and potatoes arranged on a wooden produce stand" loading="lazy" />
          <img src="/manus-storage/potatoes_c894c14b.png" alt="Fresh potatoes, hand-picked for quality" loading="lazy" />
          <img src="/manus-storage/oranges_634434d6.png" alt="Fresh oranges packed in mesh bags" loading="lazy" />
          <img src="/manus-storage/garlic_6607c31c.png" alt="Fresh garlic packed for customers" loading="lazy" />
        </div>
      </section>

      <section className="order-section">
        <div className="order-content">
          <span className="section-kicker">SIMPLE, FRESH, READY</span>
          <h2>Order in 3 easy steps</h2>
          <div className="step-list">
            {steps.map((step, index) => <div className="step-row" key={step}><span className="step-number">{index + 1}</span><p>{step}</p></div>)}
          </div>
          <a className="button button-accent" href={`https://wa.me/${BUSINESS.phoneDigits}?text=${encodeURIComponent("Hello Apaku Awua! I'd like to place an order.")}`} target="_blank" rel="noreferrer">💬 Chat on WhatsApp <ArrowRight size={16} /></a>
        </div>
        <aside className="hours-card">
          <div className="hours-title"><span className="hours-icon"><Clock3 size={19} /></span><div><span className="section-kicker">COME BY WHEN IT SUITS</span><h3>Opening hours</h3></div></div>
          <div className="hours-rows">{BUSINESS.hours.map((item) => <div className="hours-row" key={item.day}><span>{item.day}</span><strong>{item.time}</strong></div>)}</div>
          <div className="hours-note"><ShoppingBasket size={17} /> Order ahead and we’ll have your fresh basket ready.</div>
        </aside>
      </section>
    </>
  );
}
