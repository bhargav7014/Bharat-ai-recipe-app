// import React, { useEffect } from "react";
// import { View, Image } from "react-native";

// export default function SplashVideoScreen({ navigation }) {
  
//   useEffect(() => {
//     const timer = setTimeout(() => {
//       navigation.replace("AuthLoading");
//     }, 2500); // 2.5 seconds splash

//     return () => clearTimeout(timer);
//   }, []);

//   return (
//     <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
//       <Image source={require("../assets/splash.gif")} style={{ width: 200, height: 200 }} />
//     </View>
//   );
// }
