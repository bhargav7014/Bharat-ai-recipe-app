import NetInfo from "@react-native-community/netinfo";
import React, { useEffect, useState } from "react";
import AppNavigation from "./src/navigation/AppNavigation";
import { NavigationContainer } from "@react-navigation/native";
import NoInternet from "./src/screens/NoInternetScreen";
import FavoritesProvider from "./src/context/FavoritesContext";

export default function App() {
  const [isConnected, setIsConnected] = useState(true);

  useEffect(() => {
    const unsubscribe = NetInfo.addEventListener((state) => {
      setIsConnected(state.isConnected);
    });
    return () => unsubscribe();
  }, []);

  return (
    <FavoritesProvider>
      <NavigationContainer>
        {!isConnected ? <NoInternet /> : <AppNavigation />}
      </NavigationContainer>
    </FavoritesProvider>
  );
}
