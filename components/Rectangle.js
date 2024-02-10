import * as React from "react";
import { Dimensions, ImageBackground, StyleSheet } from "react-native";
import { View } from "react-native";

export default (props) => {
  return (
    <View style={{ ...styles.rectangle, ...props.style }}>
      <ImageBackground
        source={require("../assets/bg.png")}
        style={{ ...styles.rectangle2, ...props.imgstyle }}
      >
        {props.children}
      </ImageBackground>
    </View>
  );
};
const styles = StyleSheet.create({
  rectangle: {
    width: Dimensions.get("window").width - 20,
    marginHorizontal: 10,
    height: 121,
    backgroundColor: "#FEAFB6",
  },
  rectangle2: {
    width: Dimensions.get("window").width - 20,
    height: 121,
  },
});
