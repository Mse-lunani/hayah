import { FontAwesome5 } from "@expo/vector-icons";
import {
  Button,
  Input,
  Layout,
  Spinner,
  StyleService,
  useStyleSheet,
} from "@ui-kitten/components";
import * as React from "react";
import { Dimensions, ImageBackground, View } from "react-native";
import * as ImagePicker from "expo-image-picker";
import { Alert } from "react-native";
import hjhj from "../components/URL";
import AsyncStorage from "@react-native-async-storage/async-storage";
export default (props) => {
  const [user, setuser] = React.useState(null);
  const [image, setImage] = React.useState(null);
  const { item } = props.route.params;
  const [des, setdes] = React.useState(null);
  const styles = useStyleSheet(styles2);
  const [loading, setloading] = React.useState(false);

  React.useEffect(() => {
    getuser();
  }, []);
  const getuser = async () => {
    let u = await AsyncStorage.getItem("user");
    if (u) {
      u = JSON.parse(u);
      setuser(u);
    }
  };
  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });
    console.log(result);
    if (!result.canceled) {
      setImage(result.assets[0]);
    }
  };

  const Finish = () => {
    const data = new FormData();
    if (des == null) {
      Alert.alert("Fill all fields", "Some fields are missing");
    } else {
      setloading(true);

      data.append("description", des);
      data.append("rid", user.id);
      data.append("cid", item.id);
      if (image) {
        data.append("image", {
          type: "image/jpeg",
          uri: image.uri,
          name: "image.jpeg",
        });
      }
      const options = {
        method: "POST",
        body: data,
      };
      const url = hjhj + "add_post.php";
      console.log(url);
      fetch(url, options)
        .then((res) => res.text())
        .then((res) => {
          props.navigation.goBack();
        })
        .catch((e) => {
          console.log(e);
        })
        .finally(() => {
          setloading(false);
        });
    }
  };

  return (
    <Layout style={styles.parent}>
      <Input
        multiline
        numberOfLines={6}
        label={"Description"}
        onChangeText={(text) => {
          setdes(text);
        }}
        style={styles.input}
      />

      {image ? (
        <ImageBackground style={styles.imgbox} source={{ uri: image.uri }}>
          <FontAwesome5 name="camera" size={30} onPress={pickImage} />
        </ImageBackground>
      ) : (
        <View style={styles.imgbox}>
          <FontAwesome5 name="camera" size={30} onPress={pickImage} />
        </View>
      )}
      {loading ? (
        <View style={{ justifyContent: "center", alignItems: "center" }}>
          <Spinner />
        </View>
      ) : (
        <Button onPress={Finish} style={styles.input}>
          Submit
        </Button>
      )}
    </Layout>
  );
};
const styles2 = StyleService.create({
  parent: {
    flex: 1,
  },
  input: {
    margin: 10,
  },
  imgbox: {
    width: Dimensions.get("window").width - 20,
    height: 200,
    borderWidth: 1,
    alignSelf: "center",
    borderStyle: "dashed",
    justifyContent: "center",
    alignItems: "center",
  },
});
