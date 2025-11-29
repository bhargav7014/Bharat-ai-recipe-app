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
  Alert
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { API } from "../api/api";
import { saveUser } from "../storage/storage";

const PRIMARY_COLOR = "#00B8D4";
const SECONDARY_COLOR = "#00838F";
const TEXT_COLOR = "#333333";
const PLACEHOLDER_COLOR = "#999999";
const BACKGROUND_COLOR = "#E0F7FA";

export default function Register({ navigation }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [showPass, setShowPass] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [loading, setLoading] = useState(false);

  // EMAIL VALIDATION
  const validateEmail = (email) => {
    return email.includes("@"); // simple and correct
  };

  // PASSWORD VALIDATION (Medium)
  const validatePassword = (password) => {
    const hasMin = password.length >= 8;
    const hasNum = /\d/.test(password);
    const hasLetter = /[A-Za-z]/.test(password);
    return hasMin && hasNum && hasLetter;
  };

  const register = async () => {
    if (!email || !password || !confirm) {
      Alert.alert("Error", "Please fill all fields");
      return;
    }

    if (!validateEmail(email)) {
      Alert.alert("Invalid Email", "Email must contain '@' and a '.'");
      return;
    }

    if (!validatePassword(password)) {
      Alert.alert(
        "Weak Password",
        "Password must be at least 8 characters long, contain a number and a letter."
      );
      return;
    }

    if (password !== confirm) {
      Alert.alert("Password Error", "Passwords do not match");
      return;
    }

    try {
      setLoading(true);

      // REGISTER USER
      const res = await API.post("/users/register", {
        email,
        password,
      });

      const { userId, mongoId } = res.data;

      // AUTO-LOGIN
      const loginRes = await API.post("/users/login", { email, password });
      const token = loginRes.data.token;

      // SAVE TOKEN
      await saveUser({ token });

      // ADD TOKEN TO API REQUESTS
      API.defaults.headers.common["Authorization"] = "Bearer " + token;

      // GET PROFILE
      const profileRes = await API.get("/users/me");
      await saveUser({
        token,
        profile: profileRes.data,
        userId: profileRes.data.userId,
      });

      setLoading(false);

      // SUCCESS MESSAGE
      Alert.alert("Success", "Registration successful!");

      navigation.replace("Main");

    } catch (err) {
      setLoading(false);
      Alert.alert("Error", "Registration failed. Try different email.");
    }
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: BACKGROUND_COLOR }}>
      <KeyboardAvoidingView
        style={styles.container}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
      >
        <Text style={styles.title}>Create Account 🚀</Text>
        <Text style={styles.subtitle}>Join us and start your adventure.</Text>

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

// --- STYLES ---
const styles = StyleSheet.create({
  container: { flex: 1, padding: 30, justifyContent: "center" },
  title: { fontSize: 32, fontWeight: "800", color: PRIMARY_COLOR },
  subtitle: { fontSize: 16, color: SECONDARY_COLOR, marginBottom: 40 },
  input: {
    backgroundColor: "#fff",
    padding: 18,
    borderRadius: 12,
    marginVertical: 10,
    borderWidth: 1,
    borderColor: PRIMARY_COLOR + "40",
    fontSize: 16,
  },
  passwordRow: { flexDirection: "row", alignItems: "center", position: "relative" },
  passwordInput: { flex: 1, marginVertical: 0 },
  eyeButton: { position: "absolute", right: 18, padding: 5 },
  button: {
    backgroundColor: PRIMARY_COLOR,
    padding: 18,
    borderRadius: 12,
    marginTop: 30,
    elevation: 8,
  },
  buttonText: { color: "#fff", textAlign: "center", fontSize: 18, fontWeight: "700" },
  loginLink: { marginTop: 40, alignSelf: "center" },
  loginText: { fontSize: 14, color: TEXT_COLOR },
  loginLinkText: { fontWeight: "bold", color: SECONDARY_COLOR },
});
