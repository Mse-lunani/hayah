import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import * as eva from "@eva-design/eva";
import * as React from "react";
import { ApplicationProvider, IconRegistry } from "@ui-kitten/components";
import { EvaIconsPack } from "@ui-kitten/eva-icons";
import Start from "./screens/Start";
import { default as theme } from "./custom-theme.json";
import * as Fonts from "expo-font";
import { useEffect, useState } from "react";
import * as SplashScreen from "expo-splash-screen";
import { default as mapping } from "./mapping.json";
import useCachedResources from "./hook/Hook";
import Navigation from "./Navigation";
import { Provider } from "react-redux";
import Store from "./redux/store";
export default function App() {
  const [fontsLoaded, setfont] = React.useState(false);

  const load = async () => {
    await Fonts.loadAsync({
      "Raleway-Regular": require("./assets/fonts/Raleway-Regular.ttf"),
      "Raleway-Bold": require("./assets/fonts/Raleway-Bold.ttf"),
      "Raleway-Italic": require("./assets/fonts/Raleway-Italic.ttf"),
    });
    setfont(true);
  };
  React.useEffect(() => {
    load();
  }, []);

  return (
    <>
      {fontsLoaded && (
        <>
          <StatusBar hidden={false} style="dark" translucent={true} />
          <Provider store={Store}>
            <IconRegistry icons={EvaIconsPack} />
            <ApplicationProvider
              {...eva}
              theme={{ ...eva.light, ...theme }}
              customMapping={mapping}
            >
              <Navigation />
            </ApplicationProvider>
          </Provider>
        </>
      )}
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
