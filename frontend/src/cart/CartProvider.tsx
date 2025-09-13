import { useState, useEffect } from "react";
import type { ReactNode } from "react";
import type { CartItem, Flower } from "../types";
import { Ctx } from "./CartContext";

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>(() => {
    const saved = localStorage.getItem("cart");
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(items));
  }, [items]);

  const add = (flower: Flower) => {
    setItems((prev) => {
      const exist = prev.find((i) => i.flower.id === flower.id);
      if (exist) {
        return prev.map((i) =>
          i.flower.id === flower.id ? { ...i, quantity: i.quantity + 1 } : i
        );
      }
      return [...prev, { flower, quantity: 1 }];
    });
  };

  const remove = (flowerId: number) => {
    setItems((prev) => prev.filter((i) => i.flower.id !== flowerId));
  };

  const changeQty = (flowerId: number, qty: number) => {
    setItems((prev) =>
      prev.map((i) => (i.flower.id === flowerId ? { ...i, quantity: qty } : i))
    );
  };

  const clear = () => setItems([]);

  return (
    <Ctx.Provider value={{ items, add, remove, changeQty, clear }}>
      {children}
    </Ctx.Provider>
  );
}
