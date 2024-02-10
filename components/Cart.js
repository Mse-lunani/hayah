import { StyleService, Text, useStyleSheet } from "@ui-kitten/components";
import * as React from "react";
import { View } from "react-native";
import * as Redux from "react-redux";
import { setcount } from "../redux/actions";
import { Ionicons } from "@expo/vector-icons";

export default (props) => {
  const { count } = Redux.useSelector((state) => state.countreducer);

  const styles = useStyleSheet(styles2);
  return (
    <View style={styles.parent}>
      <View style={styles.countview}>
        <Text style={styles.counttext}>{count.length}</Text>
      </View>
      <Ionicons
        name="cart-outline"
        size={25}
        onPress={() => {
          props.navigation.navigate("Cart");
        }}
      />
    </View>
  );
};
const styles2 = StyleService.create({
  parent: {
    position: "relative",
    height: 40,
    width: 40,
    marginRight: 10,
    justifyContent: "flex-end",
    alignItems: "center",
  },
  countview: {
    position: "absolute",
    right: 0,
    top: 0,
    height: 20,
    width: 20,
    backgroundColor: "color-primary-100",
    borderRadius: 15,
    justifyContent: "center",
    alignItems: "center",
  },
  counttext: {
    fontSize: 11,
    fontWeight: "bold",
  },
});
