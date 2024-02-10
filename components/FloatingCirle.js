import { FontAwesome } from "@expo/vector-icons";
import { StyleService, Text, useStyleSheet } from "@ui-kitten/components";
import * as React from "react";
import { Image, TouchableOpacity } from "react-native";

export default (props) => {
  const styles = useStyleSheet(styles2);
  return (
    <TouchableOpacity style={styles.float} onPress={props.onPress}>
      <FontAwesome color={"white"} name="plus" size={30} />
    </TouchableOpacity>
  );
};

const styles2 = StyleService.create({
  float: {
    position: "absolute",
    bottom: 10,
    right: 10,
    height: 50,
    width: 50,
    borderRadius: 25,
    backgroundColor: "color-primary-500",
    zIndex: 1,
    justifyContent: "space-around",
    alignItems: "center",
    flexDirection: "row",
  },
});
