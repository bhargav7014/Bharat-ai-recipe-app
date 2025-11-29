import React, { useEffect } from "react";
import { View, ActivityIndicator } from "react-native";
import { getUser } from "../storage/storage";

export default function AuthLoading({ navigation }) {

  useEffect(() => { check(); }, []);

  const check = async () => {
    const saved = await getUser();

    if (saved && saved.token && saved.profile) {
      navigation.replace("Main");
    } else {
      navigation.replace("Login");
    }
  };

  return (
    <View style={{
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
      backgroundColor: "#F4F7FC"
    }}>
      <ActivityIndicator size="large" color="#5B37B7" />
    </View>
  );
}
