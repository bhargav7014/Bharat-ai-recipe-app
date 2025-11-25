// Favorites.js
import React from 'react';
import { View, Text, StyleSheet, FlatList, SafeAreaView } from 'react-native';
import RecipeCard from '../components/RecipeCard'; 

// --- UI Constants ---
// Define constants here so they are globally accessible to the StyleSheet
const PRIMARY_COLOR = "#00B8D4"; 
const TEXT_COLOR = "#333333";
const BACKGROUND_COLOR = "#F9F9F9";
const SUBTLE_TEXT_COLOR = "#777777"; 
const FAVORITE_COLOR = PRIMARY_COLOR; 

export default function Favorites({ navigation }) {
  // Replace this placeholder array with actual data from your state management
  const favoriteRecipes = [
    // Example data structure (Added two examples for demonstration)
    { id: '1', name: 'Spicy Tacos', cuisine: 'Mexican', region: 'North America', time: '30 min' },
    { id: '2', name: 'Pancakes', cuisine: 'Breakfast', region: 'Global', time: '15 min' },
  ];
  
  // Placeholder function for toggling favorite status
  const handleToggleFavorite = (recipeId) => {
    // This is where you would call your actual global state update function
    console.log(`Toggling favorite status for recipe: ${recipeId}`);
  };

  const renderItem = ({ item }) => (
    <RecipeCard
      item={item}
      onPress={() => navigation.navigate("RecipeDetails", { recipeId: item.id })}
      isFavorite={true} // Always true on the Favorites screen
      onToggleFavorite={handleToggleFavorite} // This prop is correctly passed here
    />
  );

  return (
    // Use SafeAreaView to prevent content from touching the status bar
    <SafeAreaView style={favStyles.safeArea}> 
      <View style={favStyles.contentContainer}>
        <Text style={favStyles.headerTitle}>Your Favorite Recipes</Text>
        
        {favoriteRecipes.length === 0 ? (
          <View style={favStyles.emptyContainer}>
            <Text style={favStyles.emptyText}>
              You haven't added any favorites yet.
            </Text>
            <Text style={favStyles.emptyText}>
              Find a recipe and tap the heart! ❤️
            </Text>
          </View>
        ) : (
          <FlatList
            data={favoriteRecipes}
            renderItem={renderItem}
            keyExtractor={(item) => item.id}
            contentContainerStyle={{ paddingBottom: 20 }}
          />
        )}
      </View>
    </SafeAreaView>
  );
}

const favStyles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: BACKGROUND_COLOR, // Background fills the safe area
  },
  contentContainer: {
    flex: 1,
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: '800',
    color: PRIMARY_COLOR,
    paddingHorizontal: 15,
    paddingTop: 15,
    paddingBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0',
    marginBottom: 5,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  emptyText: {
    fontSize: 16,
    color: SUBTLE_TEXT_COLOR, // 👈 FIX: This now correctly uses the constant
    textAlign: 'center',
    marginTop: 10,
  }
});