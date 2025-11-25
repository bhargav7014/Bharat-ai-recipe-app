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
import { API } from "../api/api"; // Assuming this path is correct

// --- UI Constants ---
const PRIMARY_COLOR = "#00B8D4"; // Cyan/Teal (A vibrant, welcoming color)
const SECONDARY_COLOR = "#00838F"; // Darker Teal
const TEXT_COLOR = "#333333";
const PLACEHOLDER_COLOR = "#999999";
const BACKGROUND_COLOR = "#E0F7FA"; // Lightest Cyan/Aqua

export default function Register({ navigation }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [showPass, setShowPass] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [loading, setLoading] = useState(false);

  const register = async () => {
    if (!email || !password || !confirm) {
      alert("Please fill all fields");
      return;
    }
    if (password !== confirm) {
      alert("Passwords do not match");
      return;
    }

    try {
      setLoading(true);
      // NOTE: This logic is kept exactly as you provided
      await API.post("/users/register", { email, password });
      setLoading(false);

      alert("Account created successfully!");
      navigation.replace("Login");
    } catch (err) {
      setLoading(false);
      alert("Email already exists or server error.");
    }
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: BACKGROUND_COLOR }}>
      <KeyboardAvoidingView
        style={styles.container}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        keyboardVerticalOffset={0}
      >
        <Text style={styles.title}>Create Account 🚀</Text>
        <Text style={styles.subtitle}>Join us and start your adventure.</Text>

        {/* Email Input */}
        <TextInput
          style={styles.input}
          placeholder="Email Address"
          placeholderTextColor={PLACEHOLDER_COLOR}
          onChangeText={setEmail}
          keyboardType="email-address"
          autoCapitalize="none"
        />

        {/* Password Input */}
        <View style={styles.passwordRow}>
          <TextInput
            style={[styles.input, styles.passwordInput]}
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

        {/* Confirm Password Input */}
        <View style={styles.passwordRow}>
          <TextInput
            style={[styles.input, styles.passwordInput]}
            placeholder="Confirm Password"
            placeholderTextColor={PLACEHOLDER_COLOR}
            secureTextEntry={!showConfirm}
            onChangeText={setConfirm}
          />
          <TouchableOpacity
            onPress={() => setShowConfirm(!showConfirm)}
            style={styles.eyeButton}
          >
            <Ionicons
              name={showConfirm ? "eye-outline" : "eye-off-outline"}
              size={24}
              color={PLACEHOLDER_COLOR}
            />
          </TouchableOpacity>
        </View>

        {/* Register Button */}
        <TouchableOpacity
          style={styles.button}
          onPress={register}
          disabled={loading}
        >
          {loading ? (
            <ActivityIndicator color="#fff" />
          ) : (
            <Text style={styles.buttonText}>Register</Text>
          )}
        </TouchableOpacity>

        {/* Login Navigation */}
        <TouchableOpacity
          onPress={() => navigation.navigate("Login")}
          style={styles.loginLink}
        >
          <Text style={styles.loginText}>
            Already have an account?{" "}
            <Text style={styles.loginLinkText}>Login</Text>
          </Text>
        </TouchableOpacity>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

// --- NEW STYLES ---
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
    textAlign: "left",
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: SECONDARY_COLOR,
    textAlign: "left",
    marginBottom: 40,
  },
  input: {
    backgroundColor: "#FFFFFF",
    padding: 18,
    borderRadius: 12,
    marginVertical: 10,
    fontSize: 16,
    borderWidth: 1,
    borderColor: PRIMARY_COLOR + '30', // Light primary border
    color: TEXT_COLOR,
  },
  passwordRow: {
    flexDirection: "row",
    alignItems: "center",
    position: 'relative',
    marginVertical: 10,
  },
  passwordInput: {
    flex: 1,
    marginVertical: 0,
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
    shadowColor: SECONDARY_COLOR,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 8,
  },
  buttonText: {
    color: "#fff",
    textAlign: "center",
    fontWeight: "700",
    fontSize: 18,
  },
  loginLink: {
    marginTop: 40,
    alignSelf: 'center',
  },
  loginText: {
    fontSize: 14,
    color: TEXT_COLOR,
  },
  loginLinkText: {
    fontWeight: "bold",
    color: SECONDARY_COLOR,
  }
});