import AsyncStorage from "@react-native-async-storage/async-storage";

// Save user
export const saveUser = async (user) => {
  await AsyncStorage.setItem("user", JSON.stringify(user));
};

export const getUser = async () => {
  const data = await AsyncStorage.getItem("user");
  return data ? JSON.parse(data) : null;
};

export const removeUser = async () => {
  await AsyncStorage.removeItem("user");
};

// Save chat history
export const saveChatHistory = async (messages) => {
  await AsyncStorage.setItem("chatHistory", JSON.stringify(messages));
};

export const getChatHistory = async () => {
  const data = await AsyncStorage.getItem("chatHistory");
  return data ? JSON.parse(data) : [];
};

// Save favorites
export const saveFavorites = async (favorites) => {
  await AsyncStorage.setItem("favorites", JSON.stringify(favorites));
};

export const getFavorites = async () => {
  const data = await AsyncStorage.getItem("favorites");
  return data ? JSON.parse(data) : [];
};
