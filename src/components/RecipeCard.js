import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";

// --- UI Constants ---
const PRIMARY_COLOR = "#00B8D4"; // Cyan/Teal (Highlight bar & filled heart)
const TEXT_COLOR = "#333333";
const ACCENT_COLOR = "#FF6347"; // Tomato Red (Time badge)
const SUBTLE_TEXT_COLOR = "#777777";
const FAVORITE_COLOR = PRIMARY_COLOR; // Use PRIMARY_COLOR for the heart

// This component now needs two new props:
// 1. isFavorite: boolean to determine the icon state.
// 2. onToggleFavorite: function to call when the heart is pressed.
export default function RecipeCard({ item, onPress, isFavorite, onToggleFavorite }) {
  
  // New handler to stop propagation
  const handleFavoritePress = (e) => {
    // 1. Stop the main card's onPress event from firing (prevents navigation)
    e.stopPropagation(); 
    // 2. Execute the toggle logic
    onToggleFavorite(item.id); 
  };

  return (
    <TouchableOpacity 
      style={styles.card} 
      onPress={onPress}
      // Added accessibility label for the main card action
      accessibilityLabel={`View details for ${item.name}`}
    >
      
      {/* 💖 Favorite Button */}
      <TouchableOpacity 
        style={styles.favoriteButton} 
        onPress={handleFavoritePress} // Using the new handler
        // Added accessibility label for the favorite action
        accessibilityLabel={isFavorite ? "Remove from favorites" : "Add to favorites"}
      >
        <Ionicons 
          name={isFavorite ? "heart" : "heart-outline"} 
          size={24} 
          color={isFavorite ? FAVORITE_COLOR : SUBTLE_TEXT_COLOR} 
        />
      </TouchableOpacity>
      
      <View>
        <Text style={styles.title}>{item.name}</Text>
        
        {/* Cuisine & Region Row */}
        <View style={styles.infoRow}>
          <Text style={styles.subtitle}>{item.cuisine}</Text>
          <Text style={styles.dot}>•</Text>
          <Text style={styles.subtitle}>{item.region}</Text>
        </View>

        {/* Time Badge */}
        <View style={styles.timeBadge}>
          <Ionicons name="time-outline" size={16} color={ACCENT_COLOR} />
          <Text style={styles.timeText}>{item.time}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
}

// --- UPDATED STYLES (No changes needed here) ---
const styles = StyleSheet.create({
  card: {
    backgroundColor: "#fff",
    padding: 20, 
    borderRadius: 16, 
    marginHorizontal: 15,
    marginVertical: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.08, 
    shadowRadius: 10,
    elevation: 5,
    borderLeftWidth: 5, 
    borderLeftColor: PRIMARY_COLOR,
  },
  favoriteButton: {
    position: 'absolute',
    top: 15,
    right: 15,
    zIndex: 10, 
    padding: 5,
  },
  title: {
    fontSize: 22,
    fontWeight: "700",
    color: TEXT_COLOR,
    marginBottom: 8,
    marginRight: 40, 
  },
  infoRow: {
    flexDirection: 'row',
    marginBottom: 15,
    alignItems: 'center',
  },
  subtitle: {
    fontSize: 14,
    color: SUBTLE_TEXT_COLOR,
    fontWeight: '500',
  },
  dot: {
    fontSize: 18,
    color: SUBTLE_TEXT_COLOR,
    marginHorizontal: 8,
    marginTop: -4, 
  },
  timeBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'flex-start', 
    backgroundColor: ACCENT_COLOR + '10', 
    paddingVertical: 4,
    paddingHorizontal: 10,
    borderRadius: 8,
    marginTop: 5,
  },
  timeText: {
    marginLeft: 6,
    fontWeight: "600",
    color: ACCENT_COLOR,
    fontSize: 14,
  },
});