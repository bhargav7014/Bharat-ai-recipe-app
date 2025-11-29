import React, { useContext, useEffect, useState } from "react";
import { View, Text, FlatList, ActivityIndicator } from "react-native";
import RecipeCard from "../components/RecipeCard";
import { FavoritesContext } from "../context/FavoritesContext";
import { API } from "../api/api";

export default function Favorites({ navigation }) {
  const { favorites, toggleFavorite } = useContext(FavoritesContext);

  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchRecipes = async () => {
    try {
      const res = await API.get("/recipes");
      setRecipes(res.data);
    } catch (err) {
      alert("Failed to load recipes");
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchRecipes();
  }, []);

  // Filter only favorite recipes
  const favoriteRecipes = recipes.filter((item) =>
    favorites.includes(item._id)
  );

  if (loading) {
    return <ActivityIndicator size="large" color="#00B8D4" />;
  }

  return (
    <View style={{ flex: 1, padding: 16 }}>
      <Text style={{ fontSize: 24, fontWeight: "bold", marginBottom: 10 }}>
        Your Favorites
      </Text>

      <FlatList
        data={favoriteRecipes}
        keyExtractor={(item) => item._id}
        renderItem={({ item }) => (
          <RecipeCard
            item={item}
            isFavorite={favorites.includes(item._id)}
            onToggleFavorite={() => toggleFavorite(item._id)}
            onPress={() => navigation.navigate("RecipeDetails", { recipeId: item._id })}
          />
        )}
      />
    </View>
  );
}
