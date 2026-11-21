import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from "react";

export type CartEntry = { id: string; quantity: number };

type CartContextValue = {
  items: CartEntry[];
  count: number;
  addItem: (id: string) => void;
  setQuantity: (id: string, quantity: number) => void;
  clearBasket: () => void;
};

const CartContext = createContext<CartContextValue | null>(null);
const STORAGE_KEY = "apaku-awua-basket-v1";

function readBasket(): CartEntry[] {
  try {
    const saved: unknown = JSON.parse(window.localStorage.getItem(STORAGE_KEY) || "[]");
    if (!Array.isArray(saved)) return [];
    return saved.filter((line): line is CartEntry =>
      typeof line?.id === "string" && Number.isInteger(line?.quantity) && line.quantity > 0,
    );
  } catch {
    return [];
  }
}

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartEntry[]>(readBasket);

  useEffect(() => {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
  }, [items]);

  const value = useMemo<CartContextValue>(() => ({
    items,
    count: items.reduce((sum, line) => sum + line.quantity, 0),
    addItem: (id) => setItems((current) => {
      const line = current.find((item) => item.id === id);
      return line
        ? current.map((item) => item.id === id ? { ...item, quantity: item.quantity + 1 } : item)
        : [...current, { id, quantity: 1 }];
    }),
    setQuantity: (id, quantity) => setItems((current) => quantity <= 0
      ? current.filter((item) => item.id !== id)
      : current.map((item) => item.id === id ? { ...item, quantity } : item)),
    clearBasket: () => setItems([]),
  }), [items]);

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) throw new Error("useCart must be used inside CartProvider");
  return context;
}
