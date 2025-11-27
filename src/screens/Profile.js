import React, { useState, useEffect } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { getUser, removeUser, clearChatHistory } from "../storage/storage";

export default function Profile({ navigation }) {
  const [user, setUser] = useState(null);

  useEffect(() => {
    loadProfile();
  }, []);

  const loadProfile = async () => {
    const u = await getUser();
    console.log("PROFILE USER:", u);
    setUser(u);
  };

  const logout = async () => {
    if (user) {
      await clearChatHistory(user._id);
    }

    await removeUser();
    navigation.replace("Login");
  };

  if (!user)
    return (
      <View style={styles.container}>
        <Text style={{ fontSize: 18 }}>Loading profile...</Text>
      </View>
    );

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Profile</Text>

      <Text style={styles.label}>User ID</Text>
      <Text style={styles.value}>{user.userId}</Text>

      <Text style={styles.label}>Email</Text>
      <Text style={styles.value}>{user.email}</Text>

      <Text style={styles.label}>Diet Preference</Text>
      <Text style={styles.value}>{user.preferences?.diet || "Not set"}</Text>

      <Text style={styles.label}>Spice Level</Text>
      <Text style={styles.value}>{user.preferences?.spiceLevel || "Not set"}</Text>

      <TouchableOpacity style={styles.logoutBtn} onPress={logout}>
        <Text style={styles.logoutText}>Logout</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 25,
    backgroundColor: "#F4F7FC",
  },
  header: {
    fontSize: 28,
    fontWeight: "800",
    marginBottom: 30,
  },
  label: {
    fontSize: 16,
    color: "#666",
    marginTop: 20,
  },
  value: {
    fontSize: 18,
    fontWeight: "600",
    color: "#333",
    marginTop: 5,
  },
  logoutBtn: {
    backgroundColor: "red",
    padding: 16,
    borderRadius: 10,
    marginTop: 40,
  },
  logoutText: {
    color: "#fff",
    textAlign: "center",
    fontSize: 16,
    fontWeight: "700",
  },
});
