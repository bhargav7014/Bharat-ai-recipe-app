import { useEffect, useState } from "react";
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

export default function Home({ navigation }) {
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(true);

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
    return (
      <SafeAreaView style={styles.center}>
        <ActivityIndicator size="large" color="#009688" />
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.safe}>
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
            />
          )}
        />
      </View>
    </SafeAreaView>
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
