import { useState, useEffect } from "react";
import type { ReactNode } from "react";
import type { Flower } from "../types";
import { FavoritesContext } from "./FavoritesContext";

export function FavoritesProvider({ children }: { children: ReactNode }) {
  const [favorites, setFavorites] = useState<Flower[]>(() => {
    const saved = localStorage.getItem("favorites");
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem("favorites", JSON.stringify(favorites));
  }, [favorites]);

  const toggleFavorite = (flower: Flower) => {
    setFavorites((prev) => {
      if (prev.find((f) => f.id === flower.id)) {
        return prev.filter((f) => f.id !== flower.id);
      }
      return [...prev, flower];
    });
  };

  const isFavorite = (id: number) => favorites.some((f) => f.id === id);

  return (
    <FavoritesContext.Provider
      value={{ favorites, toggleFavorite, isFavorite }}
    >
      {children}
    </FavoritesContext.Provider>
  );
}
