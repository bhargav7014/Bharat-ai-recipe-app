import React, { createContext, useState, useEffect } from "react";
import { saveFavorites, getFavorites } from "../storage/storage";

export const FavoritesContext = createContext();

export default function FavoritesProvider({ children }) {
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    loadFavs();
  }, []);

  const loadFavs = async () => {
    const saved = await getFavorites();
    setFavorites(saved);
  };

  const toggleFavorite = async (id) => {
    setFavorites(prev => {
      const updated = prev.includes(id)
        ? prev.filter(f => f !== id)
        : [...prev, id];

      saveFavorites(updated);
      return updated;
    });
  };

  return (
    <FavoritesContext.Provider value={{ favorites, toggleFavorite }}>
      {children}
    </FavoritesContext.Provider>
  );
}
