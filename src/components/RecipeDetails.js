import { useEffect, useState } from "react";
import { 
  View, 
  Text, 
  ScrollView, 
  ActivityIndicator, 
  StyleSheet, 
  Platform,
  SafeAreaView // 👈 IMPORTED SAFEVIEW
} from "react-native";
import { Ionicons } from "@expo/vector-icons"; 
import { API } from "../api/api"; 
import { StatusBar } from "react-native";


// --- UI Constants ---
const PRIMARY_COLOR = "#FF6347"; 
const ACCENT_COLOR = "#4682B4"; 
const BACKGROUND_COLOR = "#F9F9F9"; 
const TEXT_COLOR = "#333333";
const SUBTLE_TEXT_COLOR = "#777777";

export default function RecipeDetails({ route }) {
  const { recipeId } = route.params;
  const [recipe, setRecipe] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchRecipe = async () => {
    try {
      const res = await API.get(`/recipes/${recipeId}`);
      setRecipe(res.data);
      setLoading(false);
    } catch (err) {
      setLoading(false);
      alert("Failed to load recipe details");
    }
  };

  useEffect(() => {
    fetchRecipe();
  }, []);

  if (loading) {
    return (
      // Apply SafeAreaView to the loading state too
      <SafeAreaView style={styles.safeArea}> 
        <View style={styles.center}>
          <ActivityIndicator size="large" color={PRIMARY_COLOR} />
        </View>
      </SafeAreaView>
    );
  }

  if (!recipe) {
    return (
      // Apply SafeAreaView to the "No recipe found" state
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.center}>
          <Text style={{ color: TEXT_COLOR }}>No recipe found</Text>
        </View>
      </SafeAreaView>
    );
  }

  return (
    // 👈 WRAP THE MAIN CONTENT IN SAFEVIEW
    <SafeAreaView style={styles.safeArea}>
      <ScrollView style={styles.container}>
        {/* --- Header Section --- */}
        <View style={styles.header}>
          <Text style={styles.name}>{recipe.name}</Text>
          <View style={styles.infoRow}>
            <Ionicons name="location-outline" size={16} color={SUBTLE_TEXT_COLOR} />
            <Text style={styles.subTitle}>{recipe.region}</Text>
            <Text style={styles.separator}>•</Text>
            <Ionicons name="restaurant-outline" size={16} color={SUBTLE_TEXT_COLOR} />
            <Text style={styles.subTitle}>{recipe.cuisine}</Text>
            <Text style={styles.separator}>•</Text>
            <Ionicons name="time-outline" size={16} color={SUBTLE_TEXT_COLOR} />
            <Text style={styles.subTitle}>{recipe.time}</Text>
          </View>
        </View>

        {/* --- Ingredients Section --- */}
        <View style={styles.sectionCard}>
          <Text style={styles.sectionTitle}>Ingredients</Text>
          {recipe.ingredients.map((i, index) => (
            <View key={index} style={styles.listItem}>
              <Ionicons name="ellipse" size={5} color={PRIMARY_COLOR} style={styles.bullet} />
              <Text style={styles.ingredientText}>
                **{i.name}** — {i.quantity}
              </Text>
            </View>
          ))}
        </View>

        {/* --- Steps Section --- */}
        <View style={styles.sectionCard}>
          <Text style={styles.sectionTitle}>Preparation Steps</Text>
          {recipe.steps.map((s, index) => (
            <View key={index} style={styles.stepItem}>
              <View style={styles.stepNumberContainer}>
                <Text style={styles.stepNumber}>{index + 1}</Text>
              </View>
              <Text style={styles.stepText}>{s}</Text>
            </View>
          ))}
        </View>

        {/* --- Tags Section --- */}
        <View style={[styles.sectionCard, { borderBottomWidth: 0, marginBottom: 40 }]}>
          <Text style={styles.sectionTitle}>Categories</Text>
          <View style={styles.tagContainer}>
            {recipe.tags.map((tag, index) => (
              <Text key={index} style={styles.tagBadge}>
                {tag}
              </Text>
            ))}
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

// --- UPDATED STYLES ---
const styles = StyleSheet.create({
  // 👈 NEW STYLES FOR SAFEVIEW
  safeArea: {
  flex: 1,
  backgroundColor: BACKGROUND_COLOR,
  paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
},

  container: {
    flex: 1,
    // Removed paddingHorizontal from container since the inner elements already have padding/margin
    backgroundColor: BACKGROUND_COLOR, 
    paddingHorizontal: 20, // Keep padding inside the ScrollView
  },
  center: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: BACKGROUND_COLOR,
  },
  header: {
    paddingVertical: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#EDEDED',
  },
  name: {
    fontSize: 32,
    fontWeight: "800",
    color: PRIMARY_COLOR,
    marginBottom: 8,
    lineHeight: 38,
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  subTitle: {
    fontSize: 14,
    color: SUBTLE_TEXT_COLOR,
    marginLeft: 4,
    marginRight: 8,
  },
  separator: {
    fontSize: 14,
    color: SUBTLE_TEXT_COLOR,
    marginHorizontal: 8,
  },
  sectionCard: {
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#EDEDED',
  },
  sectionTitle: {
    fontSize: 22,
    fontWeight: "700",
    color: TEXT_COLOR,
    marginBottom: 15,
    borderLeftWidth: 4,
    borderLeftColor: ACCENT_COLOR,
    paddingLeft: 10,
  },
  listItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 8,
  },
  bullet: {
    marginRight: 10,
    marginTop: 7, 
  },
  ingredientText: {
    fontSize: 16,
    color: TEXT_COLOR,
    flexShrink: 1,
  },
  stepItem: {
    flexDirection: 'row',
    marginBottom: 15,
  },
  stepNumberContainer: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: ACCENT_COLOR,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 15,
  },
  stepNumber: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 14,
  },
  stepText: {
    fontSize: 16,
    color: TEXT_COLOR,
    flex: 1,
    paddingTop: Platform.OS === 'ios' ? 1 : 0, 
  },
  tagContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: 5,
  },
  tagBadge: {
    backgroundColor: '#E0E0E0',
    color: SUBTLE_TEXT_COLOR,
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 15,
    marginRight: 8,
    marginBottom: 8,
    fontSize: 14,
    fontWeight: '500',
  }
});