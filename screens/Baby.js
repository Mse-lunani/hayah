import * as React from "react";
import Rectangle from "../components/Rectangle";
import {
  Button,
  Layout,
  StyleService,
  Text,
  useStyleSheet,
} from "@ui-kitten/components";
import { Image, ScrollView, View } from "react-native";
import Floating from "../components/Floating";

export default (props) => {
  const styles = useStyleSheet(styles2);
  return (
    <>
      <Floating
        onPress={() => {
          props.navigation.navigate("AskHayah");
        }}
      />
      <ScrollView>
        <Layout style={styles.parent}>
          <View style={styles.btnrow}>
            <Button
              onPress={() => {
                props.navigation.navigate("Updates");
              }}
              size="small"
              status="success"
            >
              Your body
            </Button>
            <Button
              onPress={() => {
                props.navigation.navigate("Baby");
              }}
              size="small"
            >
              Your baby
            </Button>
            <Button
              onPress={() => {
                props.navigation.navigate("Tips");
              }}
              size="small"
              status="success"
            >
              Tips
            </Button>
          </View>
          <Rectangle
            imgstyle={styles.imgstyle}
            style={{ backgroundColor: "#DEA4B2" }}
          >
            <View style={styles.row}>
              <Text style={styles.text}>Pregancy at week 16</Text>
              <Image
                style={styles.img}
                source={require("../assets/Group78.png")}
              />
            </View>
          </Rectangle>
          <Text style={styles.texttitle}>Overview</Text>
          <Text category="p1" style={{ margin: 10 }}>
            During the 16th week of pregnancy, you may experience a variety of
            physical and emotional changes. It's important to note that every
            pregnancy is unique, and individual experiences can vary.
          </Text>
          <Text style={styles.texttitle}>Changes in your baby</Text>
          <Text category="p1" style={{ margin: 10 }}>
            During the 16th week of pregnancy, you may experience a variety of
            physical and emotional changes. It's important to note that every
            pregnancy is unique, and individual experiences can vary.
          </Text>
        </Layout>
      </ScrollView>
    </>
  );
};
const styles2 = StyleService.create({
  parent: {
    flex: 1,
  },
  btnrow: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginBottom: 10,
  },
  imgstyle: {
    justifyContent: "center",
    padding: 10,
  },
  text: {
    fontSize: 20,
    color: "white",
    alignSelf: "center",
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  texttitle: {
    fontWeight: "bold",
    fontSize: 20,
    margin: 10,
  },
  img: {
    height: 100,
    width: 100,
    objectFit: "contain",
  },
});
