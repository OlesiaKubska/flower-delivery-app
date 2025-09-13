import { createContext } from "react";
import type { Flower } from "../types";

interface FavoritesContextValue {
  favorites: Flower[];
  toggleFavorite: (flower: Flower) => void;
  isFavorite: (id: number) => boolean;
}

export const FavoritesContext = createContext<
  FavoritesContextValue | undefined
>(undefined);
