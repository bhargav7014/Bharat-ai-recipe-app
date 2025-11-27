// import React, { useRef } from "react";
// import { StyleSheet, View } from "react-native";
// import { Video } from "expo-av";

// export default function SplashVideoScreen({ navigation }) {
//   const videoRef = useRef(null);

//   return (
//     <View style={styles.container}>
//       <Video
//         ref={videoRef}
//         source={require("../../assets/splash.mp4")}
//         style={styles.video}
//         resizeMode="cover"
//         shouldPlay
//         isLooping={false}
//         onPlaybackStatusUpdate={(status) => {
//           if (status.didJustFinish) {
//             navigation.replace("Main");
//           }
//         }}
//       />
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: "black",
//   },
//   video: {
//     width: "100%",
//     height: "100%",
//   },
// });
