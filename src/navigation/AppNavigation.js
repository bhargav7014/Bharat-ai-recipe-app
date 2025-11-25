import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import Login from "../screens/Login";
import Register from "../screens/Register";
import TabsNavigator from "./TabsNavigator";
import RecipeDetails from "../components/RecipeDetails";

const Stack = createNativeStackNavigator();

export default function AppNavigation() {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="Register" component={Register} />

        {/* Main App after login */}
        <Stack.Screen name="Main" component={TabsNavigator} />
        <Stack.Screen name="RecipeDetails" component={RecipeDetails} />

      </Stack.Navigator>
    </NavigationContainer>
  );
}
