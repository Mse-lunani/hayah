import { FontAwesome } from "@expo/vector-icons";
import {
  Button,
  Layout,
  List,
  StyleService,
  Text,
  useStyleSheet,
} from "@ui-kitten/components";
import * as React from "react";
import { Dimensions, Image, ScrollView, TouchableOpacity } from "react-native";
import { View } from "react-native";
import PagerView from "react-native-pager-view";
import Product from "../components/Product";
import * as Redux from "react-redux";
import { setcount, setproduct } from "../redux/actions";
import { useIsFocused } from "@react-navigation/native";
import imageurl from "../components/imageurl";
import RenderHtml from "react-native-render-html";
export default (props) => {
  const isFocused = useIsFocused();
  const { count, product } = Redux.useSelector((state) => state.countreducer);
  const [checkcart, setcheckcart] = React.useState(false);
  const updatecount = Redux.useDispatch();
  const styles = useStyleSheet(styles2);
  const [page, setpage] = React.useState(0);
  const ref = React.useRef();
  const { item, data, index } = props.route.params;

  const src = {
    html: item.description,
  };

  React.useEffect(() => {
    let it = product[index];
    let check = count.filter((item) => item.id === it.id);
    if (check.length > 0) {
      setcheckcart(true);
    } else {
      setcheckcart(false);
    }
  }, [isFocused]);

  const Items = ({ item, index }) => {
    return (
      <Product
        {...item}
        onPress={() => {
          props.navigation.replace("ProductDetails", {
            item: item,
            data: data.filter((items) => items.name != item.name),
            index: index,
          });
        }}
        cart={true}
      />
    );
  };

  return (
    <ScrollView>
      <Layout style={styles.parent}>
        <PagerView
          style={styles.viewPager}
          initialPage={0}
          ref={ref}
          onPageScroll={(e) => {
            let page = e.nativeEvent.position;
            setpage(page);
          }}
          scrollEnabled
        >
          <View style={styles.page} key="0">
            {typeof item.image === "number" ? (
              <Image source={item.image} style={{ width: 100, height: 100 }} />
            ) : (
              <Image
                source={{ uri: imageurl + item.image }}
                style={{ width: 200, height: 200 }}
              />
            )}
          </View>
          {item.images.map((item, index) => {
            index += 1;
            return (
              <View style={styles.page} key={index}>
                {typeof item.image === "number" ? (
                  <Image
                    source={item.image}
                    style={{ width: 100, height: 100 }}
                  />
                ) : (
                  <Image
                    source={{ uri: imageurl + item.image }}
                    style={{ width: 200, height: 200 }}
                  />
                )}
              </View>
            );
          })}
        </PagerView>

        <View style={styles.row}>
          <TouchableOpacity
            style={styles.imgcont}
            onPress={() => {
              ref.current?.setPage(0);
            }}
          >
            {typeof item.image === "number" ? (
              <Image source={item.image} style={{ width: 100, height: 100 }} />
            ) : (
              <Image
                source={{ uri: imageurl + item.image }}
                style={styles.img}
              />
            )}
          </TouchableOpacity>

          {item.images.map((item, index) => {
            index += 1;
            return (
              <TouchableOpacity
                key={index}
                style={styles.imgcont}
                onPress={() => {
                  ref.current?.setPage(index);
                }}
              >
                {typeof item.image === "number" ? (
                  <Image
                    source={item.image}
                    style={{ width: 100, height: 100 }}
                  />
                ) : (
                  <Image
                    source={{ uri: imageurl + item.image }}
                    style={styles.img}
                  />
                )}
              </TouchableOpacity>
            );
          })}
        </View>

        <Text style={styles.texttitle}>{item.name}</Text>
        <Text style={styles.texttitle2}>Ksh {item.price}</Text>
        <Text category="p1" style={{ marginHorizontal: 10 }}>
          <RenderHtml
            contentWidth={Dimensions.get("window").width}
            source={src}
          />
        </Text>

        <Button
          disabled={checkcart}
          status="primary"
          onPress={() => {
            let cartitem = item;
            cartitem.quantity = 1;
            let allcartitem = count;
            allcartitem.push(cartitem);
            updatecount(setcount(allcartitem));
            setcheckcart(true);
          }}
          style={{ margin: 10 }}
        >
          Add to cart
        </Button>
        <Text style={styles.texttitle}>Related products</Text>
        <List
          data={data}
          contentContainerStyle={{ backgroundColor: "#fff" }}
          horizontal
          renderItem={Items}
        />
      </Layout>
    </ScrollView>
  );
};
const styles2 = StyleService.create({
  parent: {
    flex: 1,
  },
  viewPager: {
    height: 150,
  },
  page: {
    alignItems: "center",
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-around",
  },
  imgcont: {
    width: 60,
    height: 55,
    overflow: "hidden",
  },
  img: {
    width: 37,
    height: 46,
  },
  texttitle: {
    fontSize: 20,
    fontWeight: "bold",
    margin: 10,
  },
  texttitle2: {
    fontSize: 20,
    fontWeight: "bold",
    margin: 10,
    color: "color-primary-500",
  },
  row2: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginTop: 20,
  },
});
