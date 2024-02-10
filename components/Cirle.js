import * as React from "react";
import { StyleSheet, TouchableOpacity, View } from "react-native";

export default (props) => {
  return (
    <TouchableOpacity
      onPress={props.onPress}
      style={{ ...styles.circle, backgroundColor: props.color }}
    ></TouchableOpacity>
  );
};
const styles = StyleSheet.create({
  circle: {
    height: 10,
    width: 10,
    borderRadius: 5,
    margin: 2,
  },
});
