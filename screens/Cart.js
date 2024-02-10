import * as Redux from "react-redux";
import { setcount, setproduct } from "../redux/actions";
import * as React from "react";
import {
  Button,
  Divider,
  Layout,
  List,
  StyleService,
  Text,
  useStyleSheet,
  useTheme,
} from "@ui-kitten/components";
import { Dimensions, Image, View } from "react-native";
import { FontAwesome, Ionicons } from "@expo/vector-icons";
import imageurl from "../components/imageurl";

export default (props) => {
  const { count } = Redux.useSelector((state) => state.countreducer);
  const [total, settotal] = React.useState(0);
  const styles = useStyleSheet(styles2);
  const theme = useTheme();
  const updatecount = Redux.useDispatch();

  React.useEffect(() => {
    let total = 0;
    count.forEach((element) => {
      total += element.quantity * element.price;
    });
    settotal(total);
  }, [count]);

  const add = (quantity, index) => {
    let total = 0;
    quantity += 1;
    let cartitems = count;
    cartitems[index].quantity = quantity;
    updatecount(setcount(cartitems));
    cartitems.forEach((element) => {
      total += element.quantity * element.price;
    });
    settotal(total);
  };
  const minus = (quantity, index) => {
    let total = 0;
    if (quantity > 1) {
      quantity -= 1;
      let cartitems = count;
      cartitems[index].quantity = quantity;
      updatecount(setcount(cartitems));
      cartitems.forEach((element) => {
        total += element.quantity * element.price;
      });
      settotal(total);
    }
  };
  const Delete = (id) => {
    let cartitems = count.filter((item) => item.id != id);
    updatecount(setcount(cartitems));
  };

  const Item = ({ item, index }) => {
    let color = count[index].quantity > 1 ? "#000" : "#ccc";
    return (
      <View style={{ ...styles.row, margin: 15 }}>
        {typeof item.image === "number" ? (
          <Image source={item.image} style={{ width: 100, height: 100 }} />
        ) : (
          <Image
            source={{ uri: imageurl + item.image }}
            style={{ width: 100, height: 100 }}
          />
        )}
        <View>
          <Text
            style={{ width: Dimensions.get("window").width / 2 }}
            numberOfLines={1}
            ellipsizeMode="tail"
          >
            {item.name}
          </Text>
          <Text>QTY: {item.quantity}</Text>
          <View style={styles.row}>
            <View style={styles.addquan}>
              <FontAwesome
                name="minus"
                size={11}
                color={color}
                onPress={() => {
                  minus(count[index].quantity, index);
                }}
              />
              <Text>{count[index].quantity}</Text>
              <FontAwesome
                name="plus"
                size={11}
                onPress={() => {
                  add(count[index].quantity, index);
                }}
              />
            </View>
            <Text style={styles.pricetext}>
              Ksh {item.price * count[index].quantity}
            </Text>
          </View>
        </View>
        <FontAwesome
          name="trash"
          color={theme["color-primary-600"]}
          size={25}
          onPress={() => {
            Delete(item.id);
          }}
        />
      </View>
    );
  };
  const Footercom = () => {
    return (
      <View style={styles.box}>
        <View style={styles.boxrow}>
          <Text style={styles.title}>Order Summary</Text>
          <Text style={styles.titlelittle}>{count.length} Items</Text>
        </View>
        <Divider
          style={{
            marginHorizontal: 10,
            marginVertical: 5,
          }}
        />
        <View style={styles.boxrow}>
          <Text style={styles.titlelittle}>Items total</Text>
          <Text style={styles.title}>Ksh {total}</Text>
        </View>
        <Divider
          style={{
            marginHorizontal: 10,
            marginVertical: 5,
          }}
        />
        <View style={styles.boxrow}>
          <Text style={styles.titlelittle}>Total</Text>
          <Text style={styles.title}>Ksh {total}</Text>
        </View>
        <Button
          onPress={() => {
            props.navigation.navigate("Checkout");
          }}
          style={{ margin: 10 }}
        >
          Proceed to checkout
        </Button>
      </View>
    );
  };
  return (
    <Layout style={styles.parent}>
      {count.length > 0 ? (
        <Layout>
          <List
            data={count}
            renderItem={Item}
            ListFooterComponent={Footercom}
          />
        </Layout>
      ) : (
        <Layout style={styles.parent2}>
          <Text appearance="hint">Cart is empty</Text>
          <Button
            accessoryLeft={() => (
              <Ionicons name="home-outline" size={18} color={"white"} />
            )}
            style={{ width: Dimensions.get("window").width / 2, margin: 10 }}
            onPress={() => {
              props.navigation.reset({
                index: 0,
                routes: [{ name: "Main" }],
              });
            }}
          >
            Home
          </Button>
        </Layout>
      )}
    </Layout>
  );
};

const styles2 = StyleService.create({
  parent: {
    flex: 1,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
  },
  addquan: {
    width: 84,
    height: 36,
    flexDirection: "row",
    justifyContent: "space-around",
    borderStyle: "solid",
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 10,
    alignItems: "center",
  },
  pricetext: {
    fontWeight: "bold",
  },
  parent2: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  box: {
    margin: 10,
    borderRadius: 5,
    backgroundColor: "#D9D9D9",
  },
  boxrow: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  title: {
    fontSize: 20,
    margin: 10,
    fontWeight: "bold",
  },
  titlelittle: {
    fontSize: 14,
    margin: 10,
    fontWeight: "bold",
    alignSelf: "center",
  },
});
