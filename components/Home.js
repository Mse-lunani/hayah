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
      <Ionicons
        name="home-outline"
        size={25}
        onPress={() => {
          props.navigation.reset({
            index: 0,
            routes: [{ name: "Main" }],
          });
        }}
      />
    </View>
  );
};
const styles2 = StyleService.create({
  parent: {
    marginRight: 10,
    justifyContent: "flex-end",
    alignItems: "center",
  },
});
