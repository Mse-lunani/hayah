import {
  Button,
  Input,
  Layout,
  List,
  Spinner,
  StyleService,
  Text,
  useStyleSheet,
} from "@ui-kitten/components";
import * as React from "react";
import { Alert, Dimensions, Image, TouchableOpacity, View } from "react-native";
import Questions from "../questions.json";
import AsyncStorage from "@react-native-async-storage/async-storage";
import URL from "../components/URL";
import { useIsFocused } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";

export default (props) => {
  const styles = useStyleSheet(styles2);
  const [name, setname] = React.useState("");
  const [isname, setisname] = React.useState(false);
  const [active, setactive] = React.useState(false);
  const [topicset, settopicset] = React.useState([]);

  let isFocused = useIsFocused();

  React.useEffect(() => {
    (async () => {
      let name = await AsyncStorage.getItem("name");
      if (name) {
        name = JSON.parse(name);
        console.log("obj", name);
        name = name.name;
        console.log("name", name);
        setname(name);
        setisname(true);
      }
    })();
  }, []);

  React.useEffect(() => {
    setactive(false);
    let top = [];
    Questions.forEach((element, index) => {
      top.push(false);
    });
    (async () => {
      let answers = await AsyncStorage.getItem("answers");
      console.log(answers);
      if (answers) {
        answers = JSON.parse(answers);
        answers.forEach((element, index) => {
          if (top[element.topic] == undefined) {
            top[element.topic] = true;
          } else {
            top[element.topic] = true;
          }
        });
      }
      settopicset(top);
    })();
  }, [isFocused]);

  const [loading, setloading] = React.useState(false);
  const HandleSave = async () => {
    setloading(true);
    if (name != "") {
      const data = new FormData();
      data.append("name", name);
      let url = URL + "save_name.php";
      fetch(url, {
        method: "POST",
        body: data,
      })
        .then((response) => response.json())
        .then(async (responseJson) => {
          if (responseJson.status == 1) {
            await AsyncStorage.setItem(
              "name",
              JSON.stringify(responseJson.data[0])
            );
            setname(name);
            setisname(true);
          } else {
            Alert.alert(
              "Name taken",
              "It seems that name has already being taken, please try again"
            );
          }
        })
        .catch((error) => {
          Alert.alert("Error", "An error occured, please try again");
          console.log(error);
        })
        .finally(() => {
          setloading(false);
        });
    } else {
      setloading(false);
      Alert.alert("Name cannot be empty", "Please enter your name");
    }
  };

  const Topics = ({ item, index }) => {
    let check = index === active;

    return (
      <TouchableOpacity
        style={{
          ...styles.box,
          ...(check ? styles.boxactive : styles.boxinactive),
        }}
        onPress={() => {
          setactive(index);
        }}
        disabled={topicset[index]}
      >
        <Text category="h6">{item.topic}</Text>
        {topicset[index] && <Ionicons name="md-checkmark" size={20} />}
      </TouchableOpacity>
    );
  };

  return (
    <Layout style={styles.parent}>
      {!isname ? (
        <>
          <View style={styles.rowparent}>
            <Image
              style={styles.img}
              source={require("../assets/gifs/identification.gif")}
            />
            <Text category="h5" appearance="hint">
              Please enter your name
            </Text>
          </View>
          <Input
            placeholder="Enter your name"
            value={name}
            onChangeText={(nextValue) => setname(nextValue)}
            style={styles.input}
          />
          {loading ? (
            <View style={{ alignItems: "center", justifyContent: "center" }}>
              <Spinner />
            </View>
          ) : (
            <Button style={styles.btn} onPress={HandleSave}>
              Submit
            </Button>
          )}
        </>
      ) : (
        <>
          <Text style={{ margin: 10, fontSize: 20 }}>
            Hello {name.charAt(0).toUpperCase() + name.slice(1)}
          </Text>
          <View style={styles.rowparent}>
            <Image
              style={styles.img}
              source={require("../assets/gifs/decide.gif")}
            />
            <Text category="h5" appearance="hint">
              Please select a category
            </Text>
          </View>
          <View style={styles.parentlist}>
            <List
              data={Questions}
              renderItem={Topics}
              contentContainerStyle={styles.list}
              style={styles.list}
            />
          </View>
          <Button
            onPress={() => {
              props.navigation.navigate("Questions", {
                active: active,
              });
            }}
            style={styles.btn}
            disabled={active === false ? true : false}
          >
            Continue
          </Button>
        </>
      )}
    </Layout>
  );
};

const styles2 = StyleService.create({
  parent: {
    flex: 1,
  },
  box: {
    borderWidth: 1,
    width: Dimensions.get("window").width - 20,
    height: 80,
    borderRadius: 10,
    borderBottomWidth: 4,
    flexDirection: "row",
    margin: 10,
    justifyContent: "space-around",
    alignItems: "center",
  },
  boxactive: {
    borderColor: "color-danger-200",
  },
  boxinactive: {
    borderColor: "color-basic-500",
  },
  parentlist: {
    flex: 1,
    paddingTop: 20,
  },
  list: {
    backgroundColor: "color-basic-100",
  },
  rowparent: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-around",
    marginHorizontal: 20,
  },
  btn: {
    margin: 10,
    marginVertical: 40,
  },
  img: { height: 50, width: 50 },
  input: { margin: 10 },
});
