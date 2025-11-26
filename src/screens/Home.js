import { useEffect, useState, useContext } from "react";
import {
  SafeAreaView,
  View,
  Text,
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
  console.log("FAVORITES:", favorites);


  // ❗ You forgot useContext import earlier
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
        keyExtractor={(item) => item._id}
        renderItem={({ item }) => (
          <RecipeCard
            item={item}

            onPress={() =>
              navigation.navigate("RecipeDetails", { recipeId: item._id })
            }

            isFavorite={favorites.includes(item._id)}

            onToggleFavorite={toggleFavorite}
          />
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: "#f5f5f5",
  },
  container: {
    flex: 1,
    padding: 16,
  },
  center: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
