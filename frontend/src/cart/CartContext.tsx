import { createContext } from "react";
import type { CartItem, Flower } from "../types";

export type CartCtx = {
  items: CartItem[];
  add: (flower: Flower) => void;
  remove: (flowerId: number) => void;
  changeQty: (flowerId: number, qty: number) => void;
  clear: () => void;
};

export const Ctx = createContext<CartCtx | null>(null);
