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
import * as React from "react";
import { Dimensions, Image, View } from "react-native";
import Baseurl from "../components/Baseurl";
import { FontAwesome } from "@expo/vector-icons";
import uri from "../components/URL";
import { useIsFocused } from "@react-navigation/native";

export default (props) => {
  const styles = useStyleSheet(styles2);
  const { item } = props.route.params;
  const [data, setdata] = React.useState([]);
  const [loading, setloading] = React.useState(false);
  const isFocused = useIsFocused();

  const getdata = () => {
    if (item.member) {
      setloading(true);
      let url = uri + "get_post.php";
      fetch(url)
        .then((res) => res.json())
        .then((res) => {
          console.log(res);
          setdata(res.data);
        })
        .catch((e) => {
          console.log(e);
        })
        .finally(() => {
          setloading(false);
        });
    }
  };
  React.useEffect(() => {
    getdata();
  }, [isFocused]);
  const theme = useTheme();
  const Render = ({ item }) => {
    return (
      <Layout>
        <View style={styles.imgrow}>
          <FontAwesome
            name="user-circle"
            size={50}
            color={theme["color-primary-600"]}
          />
          <View>
            <Text style={styles.text}>{item.name}</Text>
            <Text style={styles.text} appearance="hint">
              {item.date_created}
            </Text>
          </View>
        </View>
        <Text style={styles.text}>{item.description}</Text>
        {data[0].image && (
          <Image
            style={styles.img}
            source={{ uri: Baseurl + "uploads/" + item.image }}
          />
        )}
      </Layout>
    );
  };

  return (
    <Layout style={styles.parent}>
      <Image
        style={styles.img}
        source={{ uri: Baseurl + "uploads/" + item.image }}
      />
      <View style={styles.row}>
        <Text status="primary" style={styles.text}>
          {item.name}
        </Text>
        <Button disabled={item.member} style={{ margin: 10 }} size="small">
          Join now
        </Button>
      </View>
      <Text style={styles.text}>{item.description}</Text>
      <Divider style={styles.divider} />
      <Text style={styles.text}>
        Jael, Christine and {item.no} others are also in this group.
        {!item.member && <Text status="primary"> Join Now</Text>}
      </Text>
      <Divider style={styles.divider} />
      {item.member && (
        <>
          <View style={styles.rowsbetween}>
            <Button
              style={styles.btn}
              status="basic"
              onPress={() => {
                props.navigation.navigate("Post", { item: item });
              }}
              accessoryRight={() => <FontAwesome name="send-o" size={20} />}
            >
              whats on your mind
            </Button>
          </View>
          {data.length > 0 && (
            <List
              refreshing={loading}
              onRefresh={getdata}
              data={data}
              renderItem={Render}
            />
          )}
        </>
      )}
    </Layout>
  );
};
const styles2 = StyleService.create({
  parent: {
    flex: 1,
  },
  img: {
    width: Dimensions.get("window").width,
    height: 200,
    objectFit: "contain",
  },
  divider: {
    backgroundColor: "color-primary-500",
    margin: 10,
  },
  text: { marginVertical: 5, marginHorizontal: 10 },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  rowsbetween: {
    flexDirection: "row",
    justifyContent: "space-around",
  },
  btn: {
    width: Dimensions.get("window").width - 20,
  },
  imgrow: {
    flexDirection: "row",
    margin: 10,
    alignItems: "center",
  },
});
