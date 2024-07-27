import {
  StyleSheet,
  View,
  SafeAreaView,
  StatusBar,
  Platform,
  Text,
} from "react-native";
import { useFonts } from "expo-font";
import { colors } from "./src/global/colors";

import Navigator from "./src/navigation/Navigator";

import { Provider } from "react-redux";
import store from "./src/store";
import { useDB } from "./src/hooks/useDB"; // importo
import { useEffect } from "react";
import { NativeBaseProvider } from "native-base";

export default function App() {
  const { initDB } = useDB() // preparo el metodo
  const [fontsLoaded, fontError] = useFonts({
    Josefin: require("./assets/JosefinSans-Regular.ttf"),
    Cabin: require("./assets/Cabin-VariableFont_wdth,wght.ttf"),
    CabinItalic: require("./assets/Cabin-Italic-VariableFont_wdth,wght.ttf"),
    CabinBoldItalic: require("./assets/Cabin-BoldItalic.ttf"),
  });

  useEffect(() => {
    initDB() // creo la tabla si no existe
  }, [])

  if (!fontsLoaded && !fontError) {
    return null;
  }

  return (
    <SafeAreaView style={styles.container}>
      <Provider store={store}>
        <NativeBaseProvider>
          <Navigator />
        </NativeBaseProvider>
      </Provider>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
    flex: 1,
    backgroundColor: colors.lightGray,
  },
});
