import {
  Button,
  Divider,
  Icon,
  Input,
  Layout,
  Spinner,
  Text,
} from "@ui-kitten/components";
import * as React from "react";
import {
  Alert,
  Dimensions,
  Image,
  ScrollView,
  StyleSheet,
  View,
} from "react-native";
import URL from "../components/URL";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default (props) => {
  const [name, setname] = React.useState(null);
  const [phone, setphone] = React.useState(null);
  const [email, setemail] = React.useState(null);
  const [password, setpassword] = React.useState(null);
  const [loading, setloading] = React.useState(false);

  const Register = () => {
    const data = new FormData();
    const url = URL + "register.php";
    const options = {
      method: "POST",
      body: data,
    };
    if (name == null || phone == null || email == null || password == null) {
      Alert.alert("Enter all Fields", "please enter all fields");
    } else {
      setloading(true);
      data.append("name", name);
      data.append("email", email);
      data.append("phone", phone);
      data.append("password", password);
      fetch(url, options)
        .then((res) => res.json())
        .then(async (res) => {
          if (res.status == 1) {
            let dt = JSON.stringify(res.data);
            await AsyncStorage.setItem("user", dt);
            props.navigation.replace("Personal");
          } else {
            Alert.alert("Error", "User Already Exists!, Please Login");
          }
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
    <ScrollView>
      <Layout style={styles.parent}>
        <Image style={styles.img} source={require("../assets/logo.png")} />
        <Text category="h1" style={styles.heading} status="primary">
          Welcome Back!
        </Text>

        <Input
          style={styles.input}
          keyboardType="email-address"
          onChangeText={(text) => setemail(text)}
          placeholder="Email"
          accessoryRight={(props) => <Icon {...props} name="email" />}
        />
        <Input
          style={styles.input}
          placeholder="Name"
          onChangeText={(text) => setname(text)}
          accessoryRight={(props) => <Icon {...props} name="person" />}
        />
        <Input
          style={styles.input}
          placeholder="Phone"
          keyboardType="number-pad"
          onChangeText={(text) => setphone(text)}
          accessoryRight={(props) => <Icon {...props} name="phone" />}
        />
        <Input
          style={styles.input}
          placeholder="Password"
          secureTextEntry
          onChangeText={(text) => setpassword(text)}
          accessoryRight={(props) => <Icon {...props} name="lock" />}
        />

        {loading ? (
          <View style={{ justifyContent: "center", alignItems: "center" }}>
            <Spinner />
          </View>
        ) : (
          <Button style={styles.btn} onPress={Register}>
            Continue
          </Button>
        )}

        <Text>
          Have an account?{" "}
          <Text
            onPress={() => {
              props.navigation.navigate("Login");
            }}
            status="primary"
          >
            Login
          </Text>
        </Text>
        <Divider
          style={{
            margin: 10,
            width: Dimensions.get("window").width - 20,
            height: 2,
          }}
        />
        <Button
          status="danger"
          style={styles.btn}
          accessoryLeft={(props) => <Icon {...props} name="google" />}
        >
          {" "}
          continue with google
        </Button>
      </Layout>
    </ScrollView>
  );
};
const styles = StyleSheet.create({
  parent: {
    flex: 1,
    paddingTop: 50,
    alignItems: "center",
  },
  img: {
    height: 200,
    width: 200,
  },
  heading: {
    margin: 10,
  },
  input: {
    margin: 10,
  },
  btn: {
    width: Dimensions.get("window").width - 20,
    margin: 10,
  },
});
