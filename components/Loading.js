import { Layout, Text } from "@ui-kitten/components";
import * as React from "react";
import { Dimensions, StyleSheet, View } from "react-native";

export default (props) => {
  return (
    <View style={styles.overlay}>
      <Text style={styles.text}>Loading...</Text>
    </View>
  );
};
const styles = StyleSheet.create({
  overlay: {
    position: "absolute",
    height: Dimensions.get("window").height,
    width: Dimensions.get("window").width,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.7)",
    zIndex: 1,
  },
  text: {
    color: "white",
    fontSize: 24,
    textAlign: "center",
  },
});
