import { View, Text, StyleSheet, TouchableOpacity } from "react-native";

export default function RecipeCard({ item, onPress }) {
  return (
    <TouchableOpacity style={styles.card} onPress={onPress}>
      <View>
        <Text style={styles.title}>{item.name}</Text>
        <Text style={styles.subtitle}>{item.cuisine} • {item.region}</Text>
        <Text style={styles.time}>Time: {item.time}</Text>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#fff",
    padding: 16,
    borderRadius: 12,
    marginVertical: 10,
    elevation: 2,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
  subtitle: {
    marginTop: 5,
    color: "#777",
  },
  time: {
    marginTop: 10,
    fontWeight: "600",
    color: "#009688",
  },
});
