import {
  Button,
  Card,
  Input,
  Layout,
  List,
  StyleService,
  Text,
  useStyleSheet,
} from "@ui-kitten/components";
import * as React from "react";
import { Dimensions, Image, ScrollView, TouchableOpacity } from "react-native";
import FloatingCirle from "../components/FloatingCirle";
import uri from "../components/URL";
import Loading from "../components/Loading";
import { FontAwesome } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import JoinCommunity from "../components/JoinCommunity";

export default (props) => {
  const styles = useStyleSheet(styles2);
  const [data, setdata] = React.useState([]);
  const [user, setuser] = React.useState(null);
  const [changingdata, setchangingdata] = React.useState([]);
  const [loading, setloading] = React.useState(false);
  const tags = ["All", "Lactating", "Diet", "Parenting", "Postpartum anxiety"];
  const [currenttag, setcurrenttag] = React.useState("All");

  React.useEffect(() => {
    getuser();
    getdata();
  }, []);

  React.useEffect(() => {
    let dt = [];
    if (data.length > 0) {
      if (currenttag == "All") {
        setchangingdata(data);
      } else {
        dt = data.filter((item) => item.tags.includes(currenttag));
        setchangingdata(dt);
      }
    }
  }, [currenttag]);

  const getuser = async () => {
    let user2 = await AsyncStorage.getItem("user");
    user2 = JSON.parse(user2);
    setuser(user2);
  };

  const getdata = async () => {
    setloading(true);
    const url = uri + "get_community.php";
    const data = new FormData();
    if (!user) {
      let user2 = await AsyncStorage.getItem("user");
      user2 = JSON.parse(user2);
      setuser(user2);
      data.append("cid", user2.id);
    } else {
      data.append("cid", user.id);
    }
    const options = {
      method: "POST",
      body: data,
    };
    fetch(url, options)
      .then((res) => res.json())
      .then((res) => {
        setdata(res);
        setchangingdata(res);
      })
      .catch((e) => {
        console.log(e);
      })
      .finally(() => {
        setloading(false);
      });
  };

  const fetchData = async (rid, cid) => {
    const data = new FormData();
    const url = uri + "add_member.php";
    data.append("rid", rid);
    data.append("cid", cid);
    const options = { method: "POST", body: data };
    console.log(data);
    console.log(url);
    try {
      const response = await fetch(url, options);
      if (!response.ok) {
        throw new Error(`Failed to fetch data: ${response.statusText}`);
      }

      const result = await response.json();
      console.log(result);
    } catch (err) {
      console.log(err);
    } finally {
    }
  };

  const Tags = ({ item }) => {
    let bcolor =
      currenttag == item
        ? theme["color-primary-500"]
        : theme["color-primary-200"];
    let color = currenttag == item ? theme["color-primary-600"] : "black";
    return (
      <TouchableOpacity
        style={{ ...styles.card2 }}
        onPress={() => {
          setcurrenttag(item);
        }}
      >
        <Text style={{ color: color }}>{item}</Text>
      </TouchableOpacity>
    );
  };

  const Filter = (text) => {
    if (text == "") {
      setchangingdata(data);
    }
    let dt = data.filter((item) => item.name.includes(text));
    setchangingdata(dt);
  };

  const Items = ({ item }) => {
    return (
      <Card
        style={styles.card}
        onPress={() => {
          props.navigation.navigate("Details", { item: item });
        }}
        header={() => (
          <Image
            style={styles.img}
            source={{ uri: "https://hayahafrica.com/uploads/" + item.image }}
          ></Image>
        )}
      >
        <Text status="primary" numberOfLines={2} ellipsizeMode="tail">
          {item.name}
        </Text>
        <Text>{item.no} members</Text>
        <Button
          size="small"
          onPress={async () => {
            await fetchData(user.id, item.id);
            getdata();
          }}
          disabled={item.member}
          style={styles.btn}
        >
          Join now
        </Button>
      </Card>
    );
  };

  return (
    <>
      <FloatingCirle
        onPress={() => {
          props.navigation.navigate("CreateCommunity");
        }}
      />
      {loading && <Loading />}

      <Layout>
        <Input
          placeholder="search"
          style={styles.input}
          onChangeText={(text) => {
            Filter(text);
          }}
          accessoryRight={() => <FontAwesome size={18} name="search" />}
        />
        <List key={0} data={tags} renderItem={Tags} horizontal />
        <List
          key={1}
          refreshing={loading}
          onRefresh={getdata}
          data={changingdata}
          renderItem={Items}
          numColumns={2}
        />
      </Layout>
    </>
  );
};
const styles2 = StyleService.create({
  parent: {
    flex: 1,
  },
  card: {
    width: Dimensions.get("window").width / 2 - 20,
    margin: 10,
  },
  img: {
    objectFit: "cover",
    width: Dimensions.get("window").width / 2 - 20,
    height: Dimensions.get("window").width / 2 - 20,
  },
  btn: {
    margin: 5,
  },
  input: {
    margin: 10,
  },
  card2: {
    height: 20,
    minWidth: 80,
    justifyContent: "center",
    alignItems: "center",
    margin: 10,
    borderRadius: 10,
  },
});
