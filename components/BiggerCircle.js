import * as React from "react";
import { StyleSheet, TouchableOpacity, View } from "react-native";

export default (props) => {
  return (
    <TouchableOpacity
      onPress={props.onPress}
      style={{ ...styles.circle, backgroundColor: props.color }}
    >
      {props.children}
    </TouchableOpacity>
  );
};
const styles = StyleSheet.create({
  circle: {
    height: 50,
    width: 50,
    borderRadius: 25,
    margin: 2,
    alignItems: "center",
    justifyContent: "center",
  },
});
