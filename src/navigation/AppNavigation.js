import { createNativeStackNavigator } from "@react-navigation/native-stack";

// import SplashVideoScreen from "../screens/SplashVideoScreen";
import TabsNavigator from "./TabsNavigator";
import RecipeDetails from "../components/RecipeDetails";
import Login from "../screens/Login";
import Register from "../screens/Register";
import AuthLoading from "../screens/AuthLoading";

const Stack = createNativeStackNavigator();

export default function AppNavigation() {
  return (
    <Stack.Navigator
      // initialRouteName="SplashVideo"
      screenOptions={{ headerShown: false }}
    >
      {/* <Stack.Screen name="SplashVideo" component={SplashVideoScreen} /> */}
      <Stack.Screen name="AuthLoading" component={AuthLoading} />
      <Stack.Screen name="Login" component={Login} />
      <Stack.Screen name="Register" component={Register} />

      <Stack.Screen name="Main" component={TabsNavigator} />
      <Stack.Screen name="RecipeDetails" component={RecipeDetails} />
    </Stack.Navigator>
  );
}
