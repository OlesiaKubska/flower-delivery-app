import { useContext } from "react";
import { Ctx } from "./CartContext";

export function useCart() {
  const v = useContext(Ctx);
  if (!v) throw new Error("useCart must be used within CartProvider");
  return v;
}
