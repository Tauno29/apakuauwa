import { useMemo, useState } from "react";
import { MessageCircle, Minus, PackageOpen, Plus, ShoppingBasket, Trash2 } from "lucide-react";
import { BUSINESS, CATALOG, CATEGORIES } from "@/data/catalog";
import type { Product } from "@/data/catalog";
import { useCart } from "@/contexts/CartContext";

type BasketLine = { product: Product; quantity: number };

function formatMoney(amount: number) {
  return `N$ ${amount.toFixed(2)}`;
}

function formatMoneyRange(min: number, max: number) {
  return min === max ? formatMoney(min) : `${formatMoney(min)}–${formatMoney(max)}`;
}

function productPrice(product: Product) {
  if (product.price === undefined) return null;
  return formatMoneyRange(product.price, product.priceMax ?? product.price);
}

function orderPriceDetail({ product, quantity }: BasketLine) {
  if (product.price === undefined) return "price to confirm on WhatsApp";

  const unitMax = product.priceMax ?? product.price;
  const lineMin = product.price * quantity;
  const lineMax = unitMax * quantity;
  const lineLabel = product.priceMax === undefined ? "line total" : "estimated line total";
  return `${formatMoneyRange(product.price, unitMax)} per ${product.unit}; ${lineLabel} ${formatMoneyRange(lineMin, lineMax)}`;
}

function whatsappOrderUrl(lines: BasketLine[], name: string, note: string) {
  const list = lines.map((line) => `• ${line.quantity} × ${line.product.name} (${line.product.unit}) — ${orderPriceDetail(line)}`).join("\n");
  const pricedLines = lines.filter(({ product }) => product.price !== undefined);
  const hasUnpricedItems = pricedLines.length < lines.length;
  const knownMin = pricedLines.reduce((sum, line) => sum + line.product.price! * line.quantity, 0);
  const knownMax = pricedLines.reduce((sum, line) => sum + (line.product.priceMax ?? line.product.price!) * line.quantity, 0);
  const subtotal = pricedLines.length
    ? `\n\n${hasUnpricedItems ? "Subtotal for items with listed prices" : "Estimated total"}: ${formatMoneyRange(knownMin, knownMax)}`
    : "\n\nPrices to be confirmed on WhatsApp.";
  const priceNote = hasUnpricedItems ? "\nItems marked price to confirm are not included in this subtotal." : "";
  const message = `Hello ${BUSINESS.shortName}! I'd like to order:\n${list}${subtotal}${priceNote}${name.trim() ? `\n\nName: ${name.trim()}` : ""}${note.trim() ? `\nNote: ${note.trim()}` : ""}`;
  return `https://wa.me/${BUSINESS.phoneDigits}?text=${encodeURIComponent(message)}`;
}

function ProductCard({ product, quantity, onAdd, onQuantity }: { product: Product; quantity: number; onAdd: () => void; onQuantity: (quantity: number) => void }) {
  const price = productPrice(product);
  const itemLabel = `${product.name} (${product.unit})`;

  return (
    <article className="product-card">
      <div className={`product-visual ${product.image ? "has-photo" : "no-photo"}`}>
        {product.image ? (
          <img className={product.imageFit === "contain" ? "contain" : undefined} src={product.image} alt={product.imageAlt || product.name} loading="lazy" />
        ) : (
          <span className="product-photo-placeholder" aria-hidden="true"><PackageOpen size={48} strokeWidth={1.4} /></span>
        )}
      </div>
      <div className="product-details">
        <span className="product-category">{product.category}</span>
        <h3>{product.name}</h3>
        <p className="product-unit">{product.unit}</p>
        <p className={`product-price ${price === null ? "on-request" : ""}`}>
          {price === null ? "Price confirmed on WhatsApp" : `${price} / ${product.unit}`}
        </p>
        {quantity > 0 ? (
          <div className="quantity-control" aria-label={`${itemLabel} quantity`}>
            <button type="button" aria-label={`Remove one ${itemLabel}`} onClick={() => onQuantity(quantity - 1)}><Minus size={16} /></button>
            <span aria-live="polite">{quantity}</span>
            <button type="button" aria-label={`Add one ${itemLabel}`} onClick={() => onQuantity(quantity + 1)}><Plus size={16} /></button>
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
  const pricedLines = lines.filter(({ product }) => product.price !== undefined);
  const hasUnpricedItems = pricedLines.length < lines.length;
  const totalMin = pricedLines.reduce((sum, line) => sum + line.product.price! * line.quantity, 0);
  const totalMax = pricedLines.reduce((sum, line) => sum + (line.product.priceMax ?? line.product.price!) * line.quantity, 0);

  return (
    <aside className="basket-panel" id="basket">
      <div className="basket-panel-title"><span className="basket-panel-icon"><ShoppingBasket size={19} /></span><h2>Your basket</h2>{count > 0 && <span className="basket-panel-count">{count}</span>}</div>
      {lines.length === 0 ? <p className="empty-basket">Your basket is empty. Add some fresh goodness!</p> : (
        <>
          <div className="basket-lines">
            {lines.map(({ product, quantity }) => (
              <div className="basket-line" key={product.id}>
                <span className="basket-product-thumbnail" aria-hidden="true">
                  {product.image ? <img src={product.image} alt="" loading="lazy" /> : <PackageOpen size={19} strokeWidth={1.5} />}
                </span>
                <div className="basket-product-copy">
                  <strong>{product.name}</strong>
                  <small>{quantity} × {product.unit}</small>
                  <small className={`basket-line-price ${product.price === undefined ? "price-to-confirm" : ""}`}>
                    {product.price === undefined
                      ? "Price to confirm"
                      : `${productPrice(product)} per ${product.unit} · line ${formatMoneyRange(product.price * quantity, (product.priceMax ?? product.price) * quantity)}`}
                  </small>
                </div>
                <div className="basket-mini-quantity">
                  <button type="button" aria-label={`Remove one ${product.name} (${product.unit})`} onClick={() => setQuantity(product.id, quantity - 1)}><Minus size={13} /></button>
                  <span>{quantity}</span>
                  <button type="button" aria-label={`Add one ${product.name} (${product.unit})`} onClick={() => setQuantity(product.id, quantity + 1)}><Plus size={13} /></button>
                </div>
              </div>
            ))}
          </div>
          {pricedLines.length > 0 ? (
            <div className="basket-total" aria-live="polite">
              <div className="basket-total-row"><span>{hasUnpricedItems ? "Priced items subtotal" : "Estimated total"}</span><strong>{formatMoneyRange(totalMin, totalMax)}</strong></div>
              {hasUnpricedItems && <small>Items without a listed price are excluded and will be confirmed on WhatsApp.</small>}
            </div>
          ) : (
            <p className="basket-price-note">Prices for these items will be confirmed on WhatsApp.</p>
          )}
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
      <div className="page-heading shop-heading"><span className="section-kicker">APAKU AWUA · SHOP</span><h1>Fresh produce</h1><p>Browse the listed prices below. Items marked “Price confirmed on WhatsApp” will be priced directly with the shop.</p></div>
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
