import React, { useState, useRef, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Animated,
  Easing,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { API } from "../api/api";
import { getUser, getChatHistory, saveChatHistory } from "../storage/storage";

// UI COLORS
const PRIMARY = "#00AEEF"; 
const SECONDARY = "#1E90FF"; 
const BG = "#F4FAFF"; 
const CARD = "#FFFFFF"; 
const TEXT = "#222"; 
const USER_BUBBLE_COLOR = PRIMARY; 
const BOT_BUBBLE_COLOR = CARD;
const ACCENT_COLOR = "#FF6347"; 

export default function AIChat() {
  const [user, setUser] = useState(null);

  // ✅ THIS WAS MISSING (the reason for crash)
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    loadUserAndChat();
  }, []);

const loadUserAndChat = async () => {
  const u = await getUser();
  setUser(u);

  const userId = u?.profile?.userId;

  const saved = await getChatHistory(userId);

  setMessages(
    saved.length > 0
      ? saved
      : [
          {
            role: "assistant",
            text: "👋 Hi! Ask me anything or provide ingredients for a recipe!",
          },
        ]
  );
};



  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const dot = useRef(new Animated.Value(0)).current;
  const scrollViewRef = useRef();

  // Animate typing dots
  const startDotAnimation = () => {
    dot.setValue(0);
    Animated.loop(
      Animated.timing(dot, {
        toValue: 1,
        duration: 900,
        easing: Easing.linear,
        useNativeDriver: true,
      })
    ).start();
  };

  const stopDotAnimation = () => {
    dot.stopAnimation();
  };

  // Detect recipe query
  const isRecipeQuery = (msg) => {
    msg = msg.toLowerCase();
    return (
      msg.includes("recipe") ||
      msg.includes("cook") ||
      msg.includes("make") ||
      msg.includes("prepare") ||
      msg.includes("dish") ||
      msg.split(",").length > 1
    );
  };

  // Send message
  const sendMessage = async () => {
    if (!input.trim() || loading) return;

    const userMsg = { role: "user", text: input };
    setMessages(prev => {
      const updated = [...prev, userMsg];
      saveChatHistory(user._id, updated);
      return updated;
    });

    const userInput = input;
    setInput("");
    setLoading(true);
    startDotAnimation();

    try {
      if (isRecipeQuery(userInput)) {
        const ingredientsArr = userInput.split(",").map(i => i.trim());
        const payload = {
          ingredients: ingredientsArr,
          cuisine: "Indian",
          diet: "vegetarian",
          timeLimit: "30 minutes"
        };
        const res = await API.post("/ai/generate", payload);
        const recipe = res.data;

        setMessages(prev => {
          const updated = [...prev, { role: "assistant", type: "recipe", recipe }];
          saveChatHistory(user._id, updated);
          return updated;
        });

      } else {
        const res = await API.post("/chat/ask", { message: userInput });
        const reply = res.data.reply;

        setMessages(prev => {
          const updated = [...prev, { role: "assistant", text: reply }];
          saveChatHistory(user._id, updated);
          return updated;
        });

      }
    } catch (err) {
      setMessages(prev => [
        ...prev,
        { role: "assistant", text: "❌ Something went wrong. Try again." }
      ]);
    }

    stopDotAnimation();
    setLoading(false);
  };

  // Recipe card
  const RecipeCard = ({ recipe }) => (
    <View style={styles.recipeCard}>
      <Text style={styles.recipeTitle}>{recipe.name}</Text>
      {recipe.description ? (
        <Text style={styles.description}>{recipe.description}</Text>
      ) : null}
      <View style={styles.infoRow}>
        <Ionicons name="time-outline" size={16} color={ACCENT_COLOR} />
        <Text style={styles.value}> {recipe.time}</Text>
      </View>
      <Text style={styles.section}>🥕 Ingredients</Text>
      {recipe.ingredients.map((i, index) => (
        <Text key={index} style={styles.listItem}>
          <Text style={{color: ACCENT_COLOR}}>• </Text>
          <Text style={{ fontWeight: 'bold' }}>{i.name}</Text>
          <Text> — {i.quantity}</Text>
        </Text>
      ))}
      <Text style={styles.section}>👩‍🍳 Steps</Text>
      {recipe.steps.map((s, index) => (
        <Text key={index} style={styles.listItem}>
          <Text style={{ fontWeight: 'bold', color: SECONDARY }}>{index + 1}. </Text>
          <Text>{s}</Text>
        </Text>
      ))}
      {recipe.tags?.length > 0 && (
        <>
          <Text style={styles.section}>🏷 Tags</Text>
          <View style={styles.tagContainer}>
            {recipe.tags.map((tag, idx) => (
              <Text key={idx} style={styles.tag}>{tag}</Text>
            ))}
          </View>
        </>
      )}
    </View>
  );

  return (
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === "android" ? "padding" : "height"}
        keyboardVerticalOffset={Platform.OS === "android" ? 10 : 0}>
        <View style={{ flex: 1 }}>
          {/* Chat messages */}
          <ScrollView
            style={{ flex: 1, paddingHorizontal: 15 }}
            contentContainerStyle={{ flexGrow: 1 }}
            ref={scrollViewRef}
            onContentSizeChange={() =>
              scrollViewRef.current?.scrollToEnd({ animated: true })
            }>
            {messages.map((msg, i) => (
              <View
                key={i}
                style={[
                  styles.chatBubble,
                  msg.role === "user" ? styles.userBubble : styles.botBubble,
                  msg.type === "recipe" ? styles.recipeBubbleMargin : null,
                ]}>
                {msg.type === "recipe" ? (
                  <RecipeCard recipe={msg.recipe} />
                ) : (
                  <Text
                    style={{
                      color: msg.role === "user" ? "#fff" : TEXT,
                      fontSize: 15
                    }}>
                    {msg.text}
                  </Text>
                )}
              </View>
            ))}
            {loading && (
              <View style={[styles.botBubble, { paddingVertical: 10, paddingHorizontal: 15 }]}>
                <Animated.Text
                  style={{
                    fontSize: 22,
                    color: TEXT,
                    transform: [
                      {
                        scale: dot.interpolate({
                          inputRange: [0, 0.5, 1],
                          outputRange: [0.8, 1.1, 0.8]
                        })
                      }
                    ],
                    opacity: dot.interpolate({
                      inputRange: [0, 1],
                      outputRange: [0.5, 1]
                    })
                  }}>
                  ● ● ●
                </Animated.Text>
              </View>
            )}
            <View style={{ height: 10 }} />
          </ScrollView>
          {/* Input bar -- OUTSIDE ScrollView */}
          <View style={styles.inputContainer}>
            <TextInput
              style={styles.input}
              placeholder="Ask something... or enter ingredients"
              placeholderTextColor="#666"
              value={input}
              onChangeText={setInput}
              multiline
              minHeight={45}
              maxHeight={120}
            />
            <TouchableOpacity 
              style={styles.sendBtn} 
              onPress={sendMessage} 
              disabled={loading}>
              <Ionicons name="send" size={22} color="#fff" />
            </TouchableOpacity>
          </View>
        </View>
      </KeyboardAvoidingView>
  );
}

// ---- Styles (unchanged) ----
const styles = StyleSheet.create({
  chatBubble: {
    maxWidth: "85%",
    padding: 12,
    borderRadius: 14,
    marginVertical: 4, 
  },
  userBubble: {
    backgroundColor: USER_BUBBLE_COLOR,
    alignSelf: "flex-end",
    borderTopRightRadius: 2, 
  },
  botBubble: {
    backgroundColor: BOT_BUBBLE_COLOR,
    alignSelf: "flex-start",
    borderWidth: 1,
    borderColor: "#E0E0E0",
    borderTopLeftRadius: 2, 
  },
  recipeBubbleMargin: {
    marginVertical: 8, 
    borderColor: 'transparent', 
    padding: 0, 
  },
  recipeCard: {
    backgroundColor: CARD,
    padding: 15,
    borderRadius: 14,
    borderLeftWidth: 5,
    borderLeftColor: ACCENT_COLOR, 
  },
  recipeTitle: {
    fontSize: 22,
    fontWeight: "800",
    color: SECONDARY,
    marginBottom: 8,
  },
  description: {
    fontStyle: "italic",
    fontSize: 15,
    marginBottom: 10,
    color: TEXT,
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 5,
  },
  section: {
    fontSize: 16,
    color: SECONDARY,
    fontWeight: "700",
    marginTop: 15,
    marginBottom: 5,
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
    paddingBottom: 2,
  },
  value: {
    fontSize: 15,
    color: TEXT,
    fontWeight: '600',
    marginLeft: 5,
  },
  listItem: {
    fontSize: 15,
    color: TEXT,
    marginVertical: 3,
    lineHeight: 22,
    paddingLeft: 5,
  },
  tagContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginTop: 8,
  },
  tag: {
    backgroundColor: '#F0F8FF',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 14,
    marginRight: 6,
    marginBottom: 6,
    color: PRIMARY,
    fontWeight: "600",
    borderWidth: 1,
    borderColor: PRIMARY + '30',
  },
  inputContainer: {
    flexDirection: "row",
    padding: 10,
    backgroundColor: "#fff",
    borderTopWidth: 1,
    borderColor: "#CCE6F5",
  },
  input: {
    flex: 1,
    padding: 12,
    backgroundColor: "#F8FBFF",
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#DCE7F2",
    fontSize: 15,
    color: TEXT,
  },
  sendBtn: {
    backgroundColor: PRIMARY,
    padding: 12,
    marginLeft: 10,
    borderRadius: 12,
    justifyContent: "center",
    alignItems: "center",
  }
});
