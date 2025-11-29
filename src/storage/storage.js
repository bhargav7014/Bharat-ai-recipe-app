import AsyncStorage from "@react-native-async-storage/async-storage";

// USER
export const saveUser = async (newData) => {
  try {
    const existing = await getUser();
    const merged = { ...existing, ...newData };
    await AsyncStorage.setItem("user", JSON.stringify(merged));
  } catch (e) {
    console.log("saveUser error", e);
  }
};

export const getUser = async () => {
  try {
    const json = await AsyncStorage.getItem("user");
    return json ? JSON.parse(json) : null;
  } catch (e) {
    console.log("getUser error", e);
    return null;
  }
};

export const removeUser = async () => {
  try {
    await AsyncStorage.removeItem("user");
  } catch (e) {
    console.log("removeUser error", e);
  }
};


// CHAT HISTORY (per user)
export const saveChatHistory = async (userId, newMessages) => {
  try {
    if (!userId) return;

    const existing = await getChatHistory(userId);
    const merged = [...existing, ...newMessages];

    await AsyncStorage.setItem(`chat_${userId}`, JSON.stringify(merged));

  } catch (e) {
    console.log("saveChatHistory error", e);
  }
};

export const getChatHistory = async (userId) => {
  try {
    if (!userId) return [];
    const data = await AsyncStorage.getItem(`chat_${userId}`);
    return data ? JSON.parse(data) : [];
  } catch (e) { console.log("getChatHistory error", e); return []; }
};

export const clearChatHistory = async (userId) => {
  try { 
    if (userId) 
      await AsyncStorage.removeItem(`chat_${userId}`); 
  } catch (e) { console.log(e); }
};


// FAVORITES (per user)
export const saveFavorites = async (userId, favorites) => {
  try {
    if (!userId) return;
    await AsyncStorage.setItem(`favorites_${userId}`, JSON.stringify(favorites));
  } catch (e) { console.log("saveFavorites error", e); }
};
export const getFavorites = async (userId) => {
  try {
    if (!userId) return [];
    const data = await AsyncStorage.getItem(`favorites_${userId}`);
    return data ? JSON.parse(data) : [];
  } catch (e) { console.log("getFavorites error", e); return []; }
};
export const clearFavorites = async (userId) => {
  try { if (userId) await AsyncStorage.removeItem(`favorites_${userId}`); } catch (e) { console.log(e); }
};
