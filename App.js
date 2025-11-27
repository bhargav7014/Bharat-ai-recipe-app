import FavoritesProvider from "./src/context/FavoritesContext";
import AppNavigation from "./src/navigation/AppNavigation";
import { NavigationContainer } from "@react-navigation/native";

export default function App() {
  return (
    <FavoritesProvider>
      <NavigationContainer>
        <AppNavigation />
      </NavigationContainer>
    </FavoritesProvider>
  );
}
