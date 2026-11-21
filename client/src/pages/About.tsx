import { ArrowRight } from "lucide-react";
import { Link } from "wouter";

export default function About() {
  return (
    <section className="page-section about-page">
      <div className="about-hero">
        <div className="about-copy">
          <span className="section-kicker">ABOUT APAKU AWUA INVESTMENTS CC</span>
          <h1>Health is wealth.</h1>
          <p>Apaku Awua Investments CC brings fresh fruits, vegetables, beans and dry fruits to our community every day. We hand-pick our produce, keep it clean and well displayed, and sell it at prices families can afford.</p>
          <div className="values-row"><span>Quality</span><span>Freshness</span><span>Affordability</span></div>
          <Link href="/shop" className="button button-primary">Browse our produce <ArrowRight size={17} /></Link>
        </div>
        <div className="about-photo-wrap"><img src="/images/roadside-sign.png" alt="Apaku Awua roadside shop sign" /></div>
      </div>
      <img className="about-gallery-image" src="/images/produce-stand.png" alt="Apples, cabbage and potatoes displayed fresh on a produce stand" loading="lazy" />
    </section>
  );
}
