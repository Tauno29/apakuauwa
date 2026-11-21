import { useMemo, useState } from "react";
import { MessageCircle, Minus, Plus, ShoppingBasket, Trash2 } from "lucide-react";
import { BUSINESS, CATALOG, CATEGORIES } from "@/data/catalog";
import type { Product } from "@/data/catalog";
import { useCart } from "@/contexts/CartContext";

type BasketLine = { product: Product; quantity: number };

function whatsappOrderUrl(lines: BasketLine[], name: string, note: string) {
  const list = lines.map((line) => `• ${line.quantity} × ${line.product.name} (${line.product.unit})`).join("\n");
  const message = `Hello ${BUSINESS.shortName}! I'd like to order:\n${list}${name.trim() ? `\n\nName: ${name.trim()}` : ""}${note.trim() ? `\nNote: ${note.trim()}` : ""}`;
  return `https://wa.me/${BUSINESS.phoneDigits}?text=${encodeURIComponent(message)}`;
}

function ProductCard({ product, quantity, onAdd, onQuantity }: { product: Product; quantity: number; onAdd: () => void; onQuantity: (quantity: number) => void }) {
  return (
    <article className="product-card">
      <div className={`product-visual ${product.image ? "has-photo" : ""}`}>
        {product.image ? <img src={product.image} alt={product.imageAlt || product.name} loading="lazy" /> : <span aria-hidden="true">{product.emoji}</span>}
      </div>
      <div className="product-details">
        <span className="product-category">{product.category}</span>
        <h3>{product.name}</h3>
        <p>per {product.unit}</p>
        {quantity > 0 ? (
          <div className="quantity-control" aria-label={`${product.name} quantity`}>
            <button type="button" aria-label={`Remove one ${product.name}`} onClick={() => onQuantity(quantity - 1)}><Minus size={16} /></button>
            <span aria-live="polite">{quantity}</span>
            <button type="button" aria-label={`Add one ${product.name}`} onClick={() => onQuantity(quantity + 1)}><Plus size={16} /></button>
          </div>
        ) : (
          <button className="button button-primary product-add" type="button" onClick={onAdd}>Add to basket</button>
        )}
      </div>
    </article>
  );
}

function BasketPanel({ lines, count, setQuantity, clearBasket }: { lines: BasketLine[]; count: number; setQuantity: (id: string, quantity: number) => void; clearBasket: () => void }) {
  const [name, setName] = useState("");
  const [note, setNote] = useState("");
  return (
    <aside className="basket-panel" id="basket">
      <div className="basket-panel-title"><span className="basket-panel-icon"><ShoppingBasket size={19} /></span><h2>Your basket</h2>{count > 0 && <span className="basket-panel-count">{count}</span>}</div>
      {lines.length === 0 ? <p className="empty-basket">Your basket is empty. Add some fresh goodness!</p> : (
        <>
          <div className="basket-lines">
            {lines.map(({ product, quantity }) => (
              <div className="basket-line" key={product.id}>
                <span className="basket-product-emoji" aria-hidden="true">{product.emoji}</span>
                <div className="basket-product-copy"><strong>{product.name}</strong><small>{quantity} {product.unit}{quantity !== 1 && product.unit === "each" ? "" : ""}</small></div>
                <div className="basket-mini-quantity"><button type="button" aria-label={`Remove one ${product.name}`} onClick={() => setQuantity(product.id, quantity - 1)}><Minus size={13} /></button><span>{quantity}</span><button type="button" aria-label={`Add one ${product.name}`} onClick={() => setQuantity(product.id, quantity + 1)}><Plus size={13} /></button></div>
              </div>
            ))}
          </div>
          <label className="field-label">Your name<input value={name} onChange={(event) => setName(event.target.value)} placeholder="Your name" autoComplete="name" /></label>
          <label className="field-label">Pickup time or notes (optional)<textarea value={note} onChange={(event) => setNote(event.target.value)} placeholder="Pickup time or notes (optional)" rows={3} /></label>
          <a className="button button-primary whatsapp-order" href={whatsappOrderUrl(lines, name, note)} target="_blank" rel="noreferrer"><MessageCircle size={17} /> Send order on WhatsApp ({count})</a>
          <button type="button" className="clear-basket" onClick={clearBasket}><Trash2 size={14} /> Clear basket</button>
        </>
      )}
    </aside>
  );
}

export default function Shop() {
  const [filter, setFilter] = useState<(typeof CATEGORIES)[number]>("All");
  const { items, count, addItem, setQuantity, clearBasket } = useCart();
  const visibleProducts = useMemo(() => filter === "All" ? CATALOG : CATALOG.filter((item) => item.category === filter), [filter]);
  const lines = useMemo(() => items.flatMap((entry) => {
    const product = CATALOG.find((item) => item.id === entry.id);
    return product ? [{ product, quantity: entry.quantity }] : [];
  }), [items]);

  return (
    <section className="page-section shop-page">
      <div className="page-heading shop-heading"><span className="section-kicker">APAKU AWUA · SHOP</span><h1>Fresh produce</h1><p>Add items to your basket — we'll confirm today's prices on WhatsApp.</p></div>
      <div className="shop-layout">
        <div className="shop-main">
          <div className="category-filters" role="group" aria-label="Filter products by category">
            {CATEGORIES.map((category) => <button key={category} type="button" className={`filter-button ${filter === category ? "selected" : ""}`} aria-pressed={filter === category} onClick={() => setFilter(category)}>{category}</button>)}
          </div>
          <div className="product-grid">
            {visibleProducts.map((product) => <ProductCard key={product.id} product={product} quantity={items.find((line) => line.id === product.id)?.quantity ?? 0} onAdd={() => addItem(product.id)} onQuantity={(quantity) => setQuantity(product.id, quantity)} />)}
          </div>
        </div>
        <BasketPanel lines={lines} count={count} setQuantity={setQuantity} clearBasket={clearBasket} />
      </div>
    </section>
  );
}
