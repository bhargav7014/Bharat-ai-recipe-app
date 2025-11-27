import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons } from "@expo/vector-icons";

import Home from "../screens/Home";
import GenerateRecipe from "../screens/GenerateRecipe";
import Favorites from "../screens/Favorites";
import Profile from "../screens/Profile";

const Tab = createBottomTabNavigator();

export default function TabsNavigator() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ color, size }) => {
          let iconName;

          switch (route.name) {
            case "Home":
              iconName = "home-outline";
              break;

            case "Favorites":
              iconName = "heart-outline";
              break;

            case "AI Recipe":
              iconName = "restaurant-outline";
              break;

            case "Profile":
              iconName = "person-outline";
              break;

            default:
              iconName = "ellipse-outline";
          }

          return <Ionicons name={iconName} size={size} color={color} />;
        },
      })}
    >
      <Tab.Screen name="Home" component={Home} />
      <Tab.Screen name="Favorites" component={Favorites} />
      <Tab.Screen name="AI Recipe" component={GenerateRecipe} />
      <Tab.Screen name="Profile" component={Profile} />
    </Tab.Navigator>
  );
}
