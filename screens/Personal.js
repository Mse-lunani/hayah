import { Ionicons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  Button,
  Datepicker,
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

export default (props) => {
  const [cal, setcal] = React.useState(false);
  const [due_date, setduedate] = React.useState(new Date());
  const [lmp_date, setlmpdate] = React.useState(new Date());
  const [loading, setloading] = React.useState(false);

  const checkDueDate = (dueDate) => {
    const currentDate = new Date();
    const maxDueDate = currentDate.setDate(currentDate.getDate() + 300);

    if (dueDate > maxDueDate) {
      Alert.alert(
        "Invalid due date",
        "The due date must be within 10 months of the current date."
      );
      return false;
    }

    return true;
  };

  const calculateDueDate = () => {
    const dueDate = lmp_date.setDate(lmp_date.getDate() + 280);
    let dt = new Date(dueDate);
    return dt;
  };

  const Continue = async () => {
    let udata = await AsyncStorage.getItem("user");
    if (udata) {
      udata = JSON.parse(udata);
      const data = new FormData();
      let dt = due_date;
      if (cal) {
        dt = calculateDueDate();
      }
      if (checkDueDate(dt)) {
        setloading(true);
        let date = dt.toISOString().split("T")[0];
        data.append("due_date", date);
        data.append("cid", udata.id);
        const url = URL + "add_due_date.php";
        options = { method: "post", body: data };
        fetch(url, options)
          .then((res) => res.text())
          .then(async (res) => {
            await AsyncStorage.setItem(
              "due_date",
              dt.toISOString().split("T")[0]
            );
            props.navigation.replace("Main");
          })
          .catch(async (e) => {
            console.log(e);
            await AsyncStorage.setItem(
              "due_date",
              dt.toISOString().split("T")[0]
            );
            props.navigation.replace("Main");
          })
          .finally(() => {
            setloading(false);
          });
      }
    }
  };

  return (
    <ScrollView>
      <Layout style={styles.parent}>
        <Image style={styles.img} source={require("../assets/logo.png")} />
        <Text category="h1" style={styles.heading} status="primary">
          Personal Details
        </Text>
        {!cal ? (
          <>
            <Datepicker
              label={"due date"}
              date={due_date}
              max={new Date("2030")}
              min={new Date("2021")}
              style={styles.input}
              onSelect={(nextDate) => setduedate(nextDate)}
              accessoryRight={() => (
                <Ionicons size={20} name="calendar-outline" />
              )}
            />

            <Text>
              I don't know my due date{" "}
              <Text
                status="primary"
                onPress={() => {
                  setcal(true);
                }}
              >
                Calculate for me
              </Text>
            </Text>
          </>
        ) : (
          <>
            <Datepicker
              label={"Enter the first date of your last menstrual cycle."}
              style={styles.input}
              date={lmp_date}
              min={new Date("2021")}
              accessoryRight={() => (
                <Ionicons size={20} name="calendar-outline" />
              )}
              onSelect={(nextDate) => setlmpdate(nextDate)}
            />

            <Text>
              I know my due date{" "}
              <Text
                status="primary"
                onPress={() => {
                  setcal(false);
                }}
              >
                Give due date
              </Text>
            </Text>
          </>
        )}
        {loading ? (
          <View>
            <Spinner />
          </View>
        ) : (
          <Button style={styles.btn} onPress={Continue}>
            Continue
          </Button>
        )}
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
    width: Dimensions.get("window").width - 20,
  },
  btn: {
    width: Dimensions.get("window").width - 20,
    margin: 10,
  },
});
