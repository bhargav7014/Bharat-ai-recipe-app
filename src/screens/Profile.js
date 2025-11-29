import React, { useEffect, useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { getUser, removeUser, clearChatHistory, clearFavorites } from "../storage/storage";

export default function Profile({ navigation }) {
  const [data, setData] = useState(null);

  useEffect(() => { load(); }, []);

  const load = async () => {
    const stored = await getUser();
    setData(stored);
  };

  if (!data || !data.profile) {
    return (
      <View style={styles.container}>
        <Text style={{ fontSize: 16 }}>Loading profile...</Text>
      </View>
    );
  }

  const profile = data.profile;
  const userId = profile.userId;

  const logout = async () => {
    await clearChatHistory(userId);
    await clearFavorites(userId);
    await removeUser();
    navigation.replace("Login");
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Profile</Text>

      <Text style={styles.label}>User ID</Text>
      <Text style={styles.value}>{profile.userId}</Text>

      <Text style={styles.label}>Email</Text>
      <Text style={styles.value}>{profile.email}</Text>

      <Text style={styles.label}>Diet Preference</Text>
      <Text style={styles.value}>{profile.preferences?.diet}</Text>

      <Text style={styles.label}>Spice Level</Text>
      <Text style={styles.value}>{profile.preferences?.spiceLevel}</Text>

      <TouchableOpacity style={styles.logoutBtn} onPress={logout}>
        <Text style={styles.logoutText}>Logout</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 25, backgroundColor: "#F4F7FC" },
  header: { fontSize: 28, fontWeight: "800", marginBottom: 20 },
  label: { fontSize: 14, color: "#666", marginTop: 12 },
  value: { fontSize: 18, fontWeight: "600", color: "#333", marginTop: 4 },
  logoutBtn: { backgroundColor: "red", padding: 14, borderRadius: 10, marginTop: 30 },
  logoutText: { color: "#fff", textAlign: "center", fontWeight: "700" }
});
