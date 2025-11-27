import { useEffect, useState, useContext } from "react";
import {
  View,
  FlatList,
  ActivityIndicator,
  StyleSheet,
} from "react-native";
import { API } from "../api/api";
import RecipeCard from "../components/RecipeCard";
import { FavoritesContext } from "../context/FavoritesContext";

export default function Home({ navigation }) {
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(true);
  const { favorites, toggleFavorite } = useContext(FavoritesContext);

  const fetchRecipes = async () => {
    try {
      const res = await API.get("/recipes");
      setRecipes(res.data);
      setLoading(false);
    } catch (err) {
      setLoading(false);
      alert("Couldn't load recipes");
    }
  };

  useEffect(() => {
    fetchRecipes();
  }, []);

  if (loading) {
    return <ActivityIndicator size="large" color="#009688" />;
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={recipes}
        contentContainerStyle={{ paddingBottom: 20 }}
        keyExtractor={(item) => item._id} // ← will update after log
        renderItem={({ item }) => {
          
          // LOG HERE (CORRECT PLACE)
          console.log("ITEM STRUCTURE:", item);

          return (
            <RecipeCard
              item={item}
              onPress={() =>
                navigation.navigate("RecipeDetails", { recipeId: item._id }) // ← will update if needed
              }
              isFavorite={favorites.includes(item._id)} // ← will update if needed
              onToggleFavorite={() => toggleFavorite(item._id)} // ← will update if needed
            />
          );
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
});
