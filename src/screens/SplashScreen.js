import React, { useEffect, useRef } from "react";
import { View, Text, Animated, StyleSheet } from "react-native";

export default function SplashScreen({ navigation }) {
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const scaleAnim = useRef(new Animated.Value(0.7)).current;
  const slideAnim = useRef(new Animated.Value(50)).current;

  useEffect(() => {
    // Animate all elements
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 1200,
        useNativeDriver: true,
      }),
      Animated.spring(scaleAnim, {
        toValue: 1,
        friction: 4,
        tension: 60,
        useNativeDriver: true,
      }),
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 1000,
        useNativeDriver: true,
      }),
    ]).start();

    // Navigate after delay
    const timer = setTimeout(() => {
      navigation.replace("AuthLoading");
    }, 2500);

    return () => clearTimeout(timer);
  }, []);

  return (
    <View style={styles.container}>
      <Animated.View 
        style={[
          styles.logoContainer,
          { 
            opacity: fadeAnim, 
            transform: [{ scale: scaleAnim }] 
          }
        ]}
      >
        <View style={styles.logoCircle}>
          <Text style={styles.logoIcon}>👨‍🍳</Text>
        </View>
      </Animated.View>

      <Animated.View 
        style={{
          opacity: fadeAnim,
          transform: [{ translateY: slideAnim }]
        }}
      >
        <Text style={styles.tagline}>AI Powered Smart Cooking</Text>

        <Text style={styles.appName}>@CoOkMiTrA</Text>
      </Animated.View>
    </View>
  );
}

const PRIMARY = "#5B37B7";
const SECONDARY = "#8B5CF6";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F8F5FF",
    justifyContent: "center",
    alignItems: "center",
  },
  logoContainer: {
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 30,
  },
  logoCircle: {
    width: 140,
    height: 140,
    borderRadius: 70,
    backgroundColor: PRIMARY,
    justifyContent: "center",
    alignItems: "center",
    shadowColor: PRIMARY,
    shadowOffset: {
      width: 0,
      height: 8,
    },
    shadowOpacity: 0.3,
    shadowRadius: 16,
    elevation: 8,
  },
  logoIcon: {
    fontSize: 60,
  },
  appName: {
    fontSize: 32,
    fontWeight: "800",
    marginTop: 20,
    color: PRIMARY,
    textAlign: "center",
    letterSpacing: 0.5,
  },
  tagline: {
    fontSize: 16,
    color: "#666",
    marginTop: 12,
    letterSpacing: 1.2,
    textAlign: "center",
    fontWeight: "500",
  },
});