import { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
  SafeAreaView,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { API } from "../api/api";
import { saveUser } from "../storage/storage";   

const PRIMARY_COLOR = "#5B37B7";
const SECONDARY_COLOR = "#8C6ADF";
const TEXT_COLOR = "#333333";
const PLACEHOLDER_COLOR = "#999999";
const BACKGROUND_COLOR = "#F4F7FC";

export default function Login({ navigation }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPass, setShowPass] = useState(false);
  const [loading, setLoading] = useState(false);

  // FINAL WORKING LOGIN FUNCTION
  const handleLogin = async () => {
    if (!email || !password) {
      alert("Please fill all fields");
      return;
    }

    try {
      setLoading(true);

      // Your working backend route
      const res = await API.post("/users/login", { email, password });

      console.log("LOGIN RESPONSE:", res.data);

      const user = res.data;   // backend returns user object directly

      // Save user EXACTLY as backend sends it
      await saveUser(user);

      setLoading(false);
      navigation.replace("Main");

    } catch (err) {
      setLoading(false);
      alert("Login failed. Check email or password.");
    }
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: BACKGROUND_COLOR }}>
      <KeyboardAvoidingView
        style={styles.container}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
      >
        <Text style={styles.title}>Welcome Back!</Text>
        <Text style={styles.subtitle}>Sign in to continue your journey.</Text>

        <TextInput
          style={styles.input}
          placeholder="Email Address"
          placeholderTextColor={PLACEHOLDER_COLOR}
          onChangeText={setEmail}
          keyboardType="email-address"
          autoCapitalize="none"
        />

        <View style={styles.passwordRow}>
          <TextInput
            style={[styles.input, { flex: 1, marginVertical: 0 }]}
            placeholder="Password"
            placeholderTextColor={PLACEHOLDER_COLOR}
            secureTextEntry={!showPass}
            onChangeText={setPassword}
          />

          <TouchableOpacity
            onPress={() => setShowPass(!showPass)}
            style={styles.eyeButton}
          >
            <Ionicons
              name={showPass ? "eye-outline" : "eye-off-outline"}
              size={24}
              color={PLACEHOLDER_COLOR}
            />
          </TouchableOpacity>
        </View>

        <TouchableOpacity
          style={styles.button}
          onPress={handleLogin}
          disabled={loading}
        >
          {loading ? (
            <ActivityIndicator color="#fff" />
          ) : (
            <Text style={styles.buttonText}>Log In</Text>
          )}
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => navigation.navigate("Register")}
          style={styles.registerLink}
        >
          <Text style={styles.registerText}>
            Don't have an account?{" "}
            <Text style={styles.registerLinkText}>Register</Text>
          </Text>
        </TouchableOpacity>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 30,
    justifyContent: "center",
    backgroundColor: BACKGROUND_COLOR,
  },
  title: {
    fontSize: 32,
    fontWeight: "800",
    color: PRIMARY_COLOR,
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: PLACEHOLDER_COLOR,
    marginBottom: 40,
  },
  input: {
    backgroundColor: "#FFF",
    padding: 18,
    borderRadius: 12,
    marginVertical: 10,
    fontSize: 16,
    borderWidth: 1,
    borderColor: "#E0E0E0",
    color: TEXT_COLOR,
  },
  passwordRow: {
    flexDirection: "row",
    alignItems: "center",
    position: "relative",
    marginVertical: 10,
  },
  eyeButton: {
    position: "absolute",
    right: 18,
    padding: 5,
    zIndex: 1,
  },
  button: {
    backgroundColor: PRIMARY_COLOR,
    padding: 18,
    borderRadius: 12,
    marginTop: 30,
    elevation: 8,
  },
  buttonText: {
    color: "#fff",
    textAlign: "center",
    fontWeight: "700",
    fontSize: 18,
  },
  registerLink: {
    marginTop: 40,
    alignSelf: "center",
  },
  registerText: {
    fontSize: 14,
    color: TEXT_COLOR,
  },
  registerLinkText: {
    fontWeight: "bold",
    color: SECONDARY_COLOR,
  },
});
