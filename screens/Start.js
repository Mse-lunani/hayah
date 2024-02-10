import { Button, Layout, Text } from "@ui-kitten/components";
import * as React from "react";
import { Dimensions, Image, StyleSheet, View } from "react-native";
import Cirle from "../components/Cirle";
import PagerView from "react-native-pager-view";

export default (props) => {
  const [page, setpage] = React.useState(0);
  const ref = React.useRef();
  return (
    <Layout style={styles.parent}>
      <PagerView
        style={styles.viewPager}
        initialPage={0}
        ref={ref}
        onPageScroll={(e) => {
          let page = e.nativeEvent.position;
          setpage(page);
        }}
      >
        <View style={styles.page} key="0">
          <Image style={styles.img} source={require("../assets/14.png")} />
          <Text category="h3" status="primary">
            Educational
          </Text>
          <Text category="p1" style={styles.text}>
            Educational resources to help learn about maternal health, including
            articles, videos, and events.
          </Text>
        </View>
        <View style={styles.page} key="1">
          <Image style={styles.img} source={require("../assets/5.png")} />
          <Text category="h3" status="primary">
            Tracking
          </Text>
          <Text category="p1" style={styles.text}>
            Tracking the baby’s progress and monitor your pregnancy and
            postpartum progress.
          </Text>
        </View>
        <View style={styles.page} key="2">
          <Image style={styles.img} source={require("../assets/three.png")} />
          <Text category="h3" status="primary">
            Community
          </Text>
          <Text category="p1" style={styles.text}>
            A community support feature to helps pregant women and mums connect
            share experiences, and receive support.
          </Text>
        </View>
        <View style={styles.page} key="3">
          <Image
            style={styles.img}
            source={require("../assets/Illustration.png")}
          />
          <Text category="h3" status="primary">
            Shop
          </Text>
          <Text category="p1" style={styles.text}>
            Shop a variety of products online at your comfort zone.
          </Text>
        </View>
      </PagerView>
      {page < 3 ? (
        <View style={styles.bottomview}>
          <View style={styles.row}>
            <Text
              onPress={() => {
                ref.current?.setPage(3);
              }}
            >
              SKIP
            </Text>
            <View style={styles.circlerow}>
              <Cirle
                color={"#C85103"}
                onPress={() => {
                  ref.current?.setPage(0);
                }}
              />
              <Cirle
                onPress={() => {
                  ref.current?.setPage(1);
                }}
                color={page > 0 ? "#C85103" : "#ccc"}
              />
              <Cirle
                onPress={() => {
                  ref.current?.setPage(2);
                }}
                color={page > 1 ? "#C85103" : "#ccc"}
              />
              <Cirle
                onPress={() => {
                  ref.current?.setPage(3);
                }}
                color={page > 2 ? "#C85103" : "#ccc"}
              />
            </View>
            <Text
              onPress={() => {
                console.log("here");
                if (page < 3) {
                  console.log(page);
                  ref.current?.setPage(page + 1);
                }
              }}
            >
              NEXT
            </Text>
          </View>
        </View>
      ) : (
        <View style={styles.btnview}>
          <Button
            onPress={() => {
              props.navigation.replace("Login");
            }}
            style={styles.btn}
          >
            Get started
          </Button>
        </View>
      )}
    </Layout>
  );
};
const styles = StyleSheet.create({
  parent: {
    flex: 1,
  },
  bottomview: {
    flex: 0.1,
    justifyContent: "center",
    padding: 10,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  circlerow: {
    flexDirection: "row",
  },
  viewPager: {
    flex: 1,
  },
  page: {
    justifyContent: "center",
    alignItems: "center",
  },
  img: {},
  text: {
    justifyContent: "center",
    marginHorizontal: 30,
    marginTop: 10,
    textAlign: "center",
    // fontFamily: "Raleway-Regular",
  },
  btnview: {
    flex: 0.18,
  },
  btn: {
    marginHorizontal: 10,
    marginBottom: 20,
  },
});
