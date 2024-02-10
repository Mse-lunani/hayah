import { FontAwesome, FontAwesome5 } from "@expo/vector-icons";
import {
  Card,
  Layout,
  Popover,
  StyleService,
  Text,
  useStyleSheet,
  useTheme,
} from "@ui-kitten/components";
import * as React from "react";
import { Image, TouchableOpacity } from "react-native";
import { Dimensions, View } from "react-native";
import imageurl from "./imageurl";

export default (props) => {
  const styles = useStyleSheet(styles2);
  const [visible, setVisible] = React.useState(false);
  const theme = useTheme();
  const cart = props.cart ? false : true;

  const Anchor = () => {
    if (!cart) {
      return <></>;
    }

    return (
      <TouchableOpacity
        onPress={() => {
          setVisible(true);
        }}
      >
        <FontAwesome5
          name="shopping-basket"
          size={24}
          color={theme["color-primary-500"]}
        />
      </TouchableOpacity>
    );
  };

  return (
    <Card style={styles.card}>
      <TouchableOpacity
        onPress={() => {
          props.onPress();
        }}
      >
        {typeof props.image === "number" ? (
          <Image source={props.image} style={{ width: 100, height: 100 }} />
        ) : (
          <Image
            source={{ uri: imageurl + props.image }}
            style={{ width: 100, height: 100 }}
          />
        )}
      </TouchableOpacity>
      <Text numberOfLines={2} ellipsizeMode="tail">
        {props.name}
      </Text>
      <Text style={{ marginTop: 5, fontWeight: "bold" }}>
        Ksh {props.price}
      </Text>
      <Text appearance="hint" style={{ textDecorationLine: "line-through" }}>
        Ksh {props.price + 500}
      </Text>
      <View style={styles.left}>
        <Popover
          anchor={Anchor}
          visible={visible}
          placement={"top"}
          backdropStyle={styles.backdrop}
          onBackdropPress={() => {
            props.done();
            setVisible(false);
          }}
        >
          <Layout style={styles.content}>
            <View style={styles.row}>
              <FontAwesome
                name="minus-circle"
                size={30}
                color={theme["color-danger-500"]}
                onPress={props.minus}
              />
              <Text style={{}}>{props.quan}</Text>
              <FontAwesome
                name="plus-circle"
                color={theme["color-primary-500"]}
                size={30}
                onPress={props.add}
              />
              <TouchableOpacity
                onPress={() => {
                  props.done();
                  setVisible(false);
                }}
              >
                <Text status="primary">Done</Text>
              </TouchableOpacity>
            </View>
          </Layout>
        </Popover>
      </View>
    </Card>
  );
};

const styles2 = StyleService.create({
  card: {
    height: 260,
    width: Dimensions.get("window").width / 2 - 20,
    margin: 10,
  },
  left: {
    width: "100%",
    alignItems: "flex-end",
  },
  backdrop: {
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  content: {
    flex: 1,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-around",
    width: 150,
    paddingVertical: 10,
  },
});
