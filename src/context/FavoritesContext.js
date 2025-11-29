import React, { createContext, useState, useEffect } from "react";
import { getUser, getFavorites, saveFavorites } from "../storage/storage";

export const FavoritesContext = createContext();

export default function FavoritesProvider({ children }) {
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    loadFavorites();
  }, []);

  const loadFavorites = async () => {
    const user = await getUser();
    if (!user || !user.userId) return;

    const saved = await getFavorites(user.userId);
    setFavorites(saved);
  };

  const toggleFavorite = async (recipeId) => {
    const user = await getUser();
    if (!user || !user.userId) return;

    let updated = [...favorites];

    if (updated.includes(recipeId)) {
      updated = updated.filter((id) => id !== recipeId);
    } else {
      updated.push(recipeId);
    }

    setFavorites(updated);
    await saveFavorites(user.userId, updated);
  };

  return (
    <FavoritesContext.Provider value={{ favorites, toggleFavorite }}>
      {children}
    </FavoritesContext.Provider>
  );
}
