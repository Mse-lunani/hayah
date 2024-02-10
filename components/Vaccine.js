import { StyleService, Text, useStyleSheet } from "@ui-kitten/components";
import * as React from "react";
import { Image, TouchableOpacity } from "react-native";

export default (props) => {
  const styles = useStyleSheet(styles2);
  return (
    <TouchableOpacity style={styles.float} onPress={props.onPress}>
      <Text style={styles.text}>Vaccine schedule</Text>
    </TouchableOpacity>
  );
};

const styles2 = StyleService.create({
  float: {
    position: "absolute",
    bottom: 20,
    left: 10,
    height: 32,
    width: 150,
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
