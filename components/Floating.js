import { StyleService, Text, useStyleSheet } from "@ui-kitten/components";
import * as React from "react";
import { Image, TouchableOpacity } from "react-native";

export default (props) => {
  const styles = useStyleSheet(styles2);
  return (
    <TouchableOpacity style={styles.float} onPress={props.onPress}>
      <Image source={require("../assets/Comment.png")} />
      <Text style={styles.text}>Ask Hera</Text>
    </TouchableOpacity>
  );
};

const styles2 = StyleService.create({
  float: {
    position: "absolute",
    bottom: 10,
    right: 10,
    height: 32,
    width: 109,
    borderRadius: 61,
    backgroundColor: "color-primary-500",
    zIndex: 1,
    justifyContent: "space-around",
    alignItems: "center",
    flexDirection: "row",
  },
  text: {
    fontSize: 13,
    color: "white",
    fontWeight: "700",
  },
});
