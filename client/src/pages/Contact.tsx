import { useState, type FormEvent } from "react";
import { ArrowRight, Clock3, MessageCircle, Phone } from "lucide-react";
import { BUSINESS } from "@/data/catalog";

function contactUrl(name: string, message: string) {
  const text = `Hello ${BUSINESS.shortName}!${name.trim() ? ` My name is ${name.trim()}.` : ""}${message.trim() ? ` ${message.trim()}` : ""}`;
  return `https://wa.me/${BUSINESS.phoneDigits}?text=${encodeURIComponent(text)}`;
}

export default function Contact() {
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    window.open(contactUrl(name, message), "_blank", "noopener,noreferrer");
  }

  return (
    <section className="page-section contact-page">
      <div className="page-heading"><span className="section-kicker">APAKU AWUA · GET IN TOUCH</span><h1>Get in touch</h1><p>Questions about prices, bulk orders or what's fresh today? We're happy to help.</p></div>
      <div className="contact-layout">
        <div className="contact-info">
          <a className="phone-card" href="tel:+264814307010"><span><small>Call us</small><strong>{BUSINESS.phone}</strong></span><Phone size={22} fill="currentColor" /></a>
          <a className="phone-card" href="tel:+264814306048"><span><small>Call us</small><strong>{BUSINESS.alternatePhone}</strong></span><Phone size={22} fill="currentColor" /></a>
          <div className="contact-hours-card"><div className="contact-hours-title"><Clock3 size={20} /><h2>Opening hours</h2></div>{BUSINESS.hours.map((item) => <div className="hours-row" key={item.day}><span>{item.day}</span><strong>{item.time}</strong></div>)}</div>
        </div>
        <form className="contact-form" onSubmit={handleSubmit}>
          <h2>Send us a message</h2>
          <p>It opens WhatsApp with your message ready to send.</p>
          <label className="field-label">Your name<input value={name} onChange={(event) => setName(event.target.value)} placeholder="Your name" autoComplete="name" /></label>
          <label className="field-label">Your message<textarea value={message} onChange={(event) => setMessage(event.target.value)} placeholder="Your message" rows={5} /></label>
          <button className="button button-accent contact-submit" type="submit"><MessageCircle size={17} /> Send on WhatsApp <ArrowRight size={16} /></button>
        </form>
      </div>
    </section>
  );
}
