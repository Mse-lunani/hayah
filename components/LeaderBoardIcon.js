import { StyleService, Text, useStyleSheet } from "@ui-kitten/components";
import * as React from "react";
import { View } from "react-native";
import { Ionicons, MaterialIcons } from "@expo/vector-icons";

export default (props) => {
  const styles = useStyleSheet(styles2);
  return (
    <View style={styles.parent}>
      <MaterialIcons
        onPress={() => {
          props.navigation.navigate("LeaderBoard");
        }}
        name="leaderboard"
        size={24}
        color="black"
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
});
