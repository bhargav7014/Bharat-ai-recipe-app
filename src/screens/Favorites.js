import React, { useContext, useEffect, useState } from "react";
import { View, Text, FlatList, ActivityIndicator, StyleSheet } from "react-native";
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
      setLoading(false);
    } catch (err) {
      setLoading(false);
      alert("Failed to load recipes");
    }
  };

  useEffect(() => {
    fetchRecipes();
  }, []);

  // Correct filtering using _id
  const favoriteRecipes = recipes.filter((r) => favorites.includes(r._id));

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
        renderItem={({ item }) => {
          console.log("FAV ITEM:", item); // <--- IMPORTANT
          
          return (
            <RecipeCard
              item={item}
              isFavorite={favorites.includes(item._id)}
              onToggleFavorite={() => toggleFavorite(item._id)} // <--- FIXED
              onPress={() =>
                navigation.navigate("RecipeDetails", { recipeId: item._id })
              }
            />
          );
        }}
      />
    </View>
  );
}
