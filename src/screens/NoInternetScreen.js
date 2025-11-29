import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import NetInfo from "@react-native-community/netinfo";

export default function NoInternet({ navigation }) {
  const retry = async () => {
    const state = await NetInfo.fetch();
    if (state.isConnected) {
      navigation.replace("Splash"); // Restart flow
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.icon}>📡</Text>
      <Text style={styles.title}>No Internet Connection</Text>
      <Text style={styles.msg}>
        Please check your Wi-Fi or mobile data and try again.
      </Text>

      <TouchableOpacity style={styles.btn} onPress={retry}>
        <Text style={styles.btnText}>Try Again</Text>
      </TouchableOpacity>
    </View>
  );
}

const PRIMARY = "#5B37B7";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F8F5FF",
    justifyContent: "center",
    alignItems: "center",
    padding: 30,
  },
  icon: {
    fontSize: 70,
    marginBottom: 20,
  },
  title: {
    fontSize: 26,
    fontWeight: "800",
    color: PRIMARY,
    marginBottom: 10,
  },
  msg: {
    color: "#555",
    fontSize: 16,
    textAlign: "center",
    marginBottom: 30,
  },
  btn: {
    backgroundColor: PRIMARY,
    paddingVertical: 14,
    paddingHorizontal: 25,
    borderRadius: 12,
  },
  btnText: {
    color: "#fff",
    fontWeight: "700",
    fontSize: 16,
  },
});
