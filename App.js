import AppNavigation from "./src/navigation/AppNavigation";
import FavoritesProvider from "./src/context/FavoritesContext";

export default function App() {
  return (
    <FavoritesProvider>
      <AppNavigation />
    </FavoritesProvider>
  );
}
