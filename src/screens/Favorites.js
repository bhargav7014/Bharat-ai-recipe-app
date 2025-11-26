import React, { useContext, useEffect, useState } from "react";
import { View, Text, StyleSheet, FlatList, ActivityIndicator, SafeAreaView } from "react-native";
import RecipeCard from "../components/RecipeCard";
import { FavoritesContext } from "../context/FavoritesContext";
import { API } from "../api/api";

const PRIMARY_COLOR = "#00B8D4";
const SUBTLE_TEXT_COLOR = "#777777";
const BACKGROUND_COLOR = "#F9F9F9";

export default function Favorites({ navigation }) {
  const { favorites, toggleFavorite } = useContext(FavoritesContext);

  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch recipe list from API (same as Home)
  const fetchRecipes = async () => {
    try {
      const res = await API.get("/recipes");
      setRecipes(res.data);
      setLoading(false);
    } catch (e) {
      setLoading(false);
      alert("Failed to load recipes");
    }
  };

  useEffect(() => {
    fetchRecipes();
  }, []);

  // Filter only favorites
  const favoriteRecipes = recipes.filter(r => favorites.includes(r._id));

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" color={PRIMARY_COLOR} />
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      <Text style={styles.headerTitle}>Your Favorite Recipes</Text>

      {favoriteRecipes.length === 0 ? (
        <View style={styles.emptyContainer}>
          <Text style={styles.emptyText}>No favorites yet.</Text>
          <Text style={styles.emptyText}>Tap the heart to add one ❤️</Text>
        </View>
      ) : (
        <FlatList
          data={favoriteRecipes}
          keyExtractor={(item) => item._id}
          renderItem={({ item }) => (
            <RecipeCard
              item={item}
              isFavorite={favorites.includes(item._id)}
              onToggleFavorite={toggleFavorite}
              onPress={() =>
                navigation.navigate("RecipeDetails", { recipeId: item._id })
              }
            />
          )}
        />
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: BACKGROUND_COLOR,
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: "800",
    color: PRIMARY_COLOR,
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
  },
  emptyContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  emptyText: {
    fontSize: 16,
    color: SUBTLE_TEXT_COLOR,
    textAlign: "center",
    marginTop: 10,
  },
});
