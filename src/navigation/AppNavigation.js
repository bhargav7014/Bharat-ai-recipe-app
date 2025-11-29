import { createNativeStackNavigator } from "@react-navigation/native-stack";

// import SplashVideoScreen from "../screens/SplashVideoScreen";
import SplashScreen from "../screens/SplashScreen";
import AuthLoading from "../screens/AuthLoading";
import Login from "../screens/Login";
import Register from "../screens/Register";

import TabsNavigator from "./TabsNavigator";
import RecipeDetails from "../components/RecipeDetails";

const Stack = createNativeStackNavigator();

export default function AppNavigation() {
  return (
        // <Stack.Navigator screenOptions={{ headerShown: false }} initialRouteName="Splash">
<Stack.Navigator initialRouteName="Splash" screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Splash" component={SplashScreen} />
      {/* <Stack.Screen name="Splash" component={SplashVideoScreen} /> */}

      <Stack.Screen name="AuthLoading" component={AuthLoading} />

      <Stack.Screen name="Login" component={Login} />
      <Stack.Screen name="Register" component={Register} />

      <Stack.Screen name="Main" component={TabsNavigator} />
      <Stack.Screen name="RecipeDetails" component={RecipeDetails} />

    </Stack.Navigator>
  );
}
