import { StyleService, Text, useStyleSheet } from "@ui-kitten/components";
import * as React from "react";
import { Image, KeyboardAvoidingView, TouchableOpacity } from "react-native";

export default (props) => {
  const styles = useStyleSheet(styles2);
  const text = props.text ? props.text : true;
  return (
    <KeyboardAvoidingView style={styles.float}>
      <TouchableOpacity style={styles.float2} onPress={props.onPress}>
        <Image
          style={{ height: 100, width: 100 }}
          source={require("../assets/gifs/online-quiz.gif")}
        />
        {text && <Text style={styles.text}>Start Quiz</Text>}
      </TouchableOpacity>
    </KeyboardAvoidingView>
  );
};

const styles2 = StyleService.create({
  float: {
    alignSelf: "center",
    zIndex: 1,
  },
  float2: {
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
  },
  text: {
    fontSize: 18,
    color: "black",
    fontWeight: "700",
  },
});
