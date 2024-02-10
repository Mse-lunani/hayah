import {
  Card,
  Layout,
  List,
  StyleService,
  Text,
  useStyleSheet,
  useTheme,
} from "@ui-kitten/components";
import * as React from "react";
import { Dimensions, ScrollView, View } from "react-native";
import BiggerCircle from "../components/BiggerCircle";
import { Image } from "react-native";
import Floating from "../components/Floating";
import AsyncStorage from "@react-native-async-storage/async-storage";
import weeks from "../components/Wk";
import Pregancydata from "../components/Pregancydata";
import { Fontisto, MaterialCommunityIcons } from "@expo/vector-icons";
import Loading from "../components/Loading";

export default (props) => {
  const [data, setdata] = React.useState(weeks);
  const [currentDate, setcurrentDate] = React.useState(new Date());
  const [pdata, setpdata] = React.useState(Pregancydata[0]);
  const [ddat, setddate] = React.useState("");
  const [user, setuser] = React.useState([]);
  const [week, setweek] = React.useState(1);
  const flatListRef = React.useRef();
  const [daysLeft, setDaysLeft] = React.useState(null);
  const [loading, setloading] = React.useState(false);

  const calculateCurrentWeek = (dueDate, cdate) => {
    const currentDate = cdate;
    const daysBetween = currentDate - calculatelmp(dueDate);
    const currentWeek = Math.floor(daysBetween / (1000 * 60 * 60 * 24 * 7));
    if (currentWeek > 40) {
      currentWeek = 40;
    }

    const index = data.findIndex((week) => week.wk === currentWeek);
    let dt = data.map((item, i) => ({
      ...item,
      active: false,
      active: i === index,
    }));
    setdata(dt);

    const timeDifference = dueDate - currentDate;
    const daysDifference = Math.ceil(timeDifference / (1000 * 60 * 60 * 24));
    setDaysLeft(daysDifference);
    setweek(currentWeek);

    return currentWeek;
  };
  const calculatelmp = (duedate) => {
    const lmpDateObj = new Date(duedate);
    lmpDateObj.setDate(duedate.getDate() - 280);
    return lmpDateObj;
  };

  const CalculateDayOfPregnancyWeek = (wk, duedate, lmpDate) => {
    const targetWeek = wk;
    const daysToAdd = targetWeek * 7;
    const firstDayOfTargetWeek = new Date(
      new Date(lmpDate).getTime() + daysToAdd * (1000 * 60 * 60 * 24)
    );
    return firstDayOfTargetWeek;
  };

  React.useEffect(() => {
    get_date();
  }, []);

  const get_date = async () => {
    let [date, user] = await Promise.all([
      AsyncStorage.getItem("due_date"),
      AsyncStorage.getItem("user"),
    ]);
    setddate(date);
    date = new Date(date);
    user = JSON.parse(user);
    setuser(user);
    let week = calculateCurrentWeek(date, currentDate);
    flatListRef.current.scrollToIndex({ index: week - 1, animated: true });
    let wkdt = Pregancydata.filter((item) => item.week == week);
    wkdt = wkdt[0];
    setpdata(wkdt);
  };

  const styles = useStyleSheet(themedStyles);
  const theme = useTheme();

  const Item = ({ item, index }) => {
    const bcolor = item.active ? theme["color-primary-500"] : "white";
    const color = item.active ? "white" : "black";
    return (
      <Card
        style={{ ...styles.card, backgroundColor: bcolor }}
        onPress={() => {
          let date = new Date(ddat);
          let lmpDate = calculatelmp(date);
          let week = item.wk;
          let dt = data.map((item, i) => ({
            ...item,
            active: false,
            active: i === index,
          }));
          setdata(dt);
          let cday = CalculateDayOfPregnancyWeek(index + 1, date, lmpDate);
          const timeDifference = date - cday;
          const daysDifference = Math.ceil(
            timeDifference / (1000 * 60 * 60 * 24)
          );
          setDaysLeft(daysDifference);
          let wkdt = Pregancydata.filter((item) => item.week == week);
          wkdt = wkdt[0];
          setpdata(wkdt);
        }}
      >
        <Text style={{ ...styles.itemtext, color: color }}>wk {item.wk}</Text>
      </Card>
    );
  };
  return (
    <>
      <Floating
        onPress={() => {
          props.navigation.navigate("AskHayah");
        }}
      />
      {loading && <Loading />}
      <ScrollView>
        <Layout style={styles.parent}>
          <Text appearance="hint" style={styles.welcometext}>
            Hello, {user.name != null ? user.name : ""}
          </Text>
          <Text style={styles.texttitle}> Week {week} of pregnancy</Text>
          <Text style={styles.due}>Due Date {ddat}</Text>
          <List
            onScrollToIndexFailed={(info) => {
              const wait = new Promise((resolve) => {
                setTimeout(resolve, 500);
                // Convert the time difference to dayst(resolve, 500);
              });
              wait.then(() => {
                flatListRef.current.scrollToIndex({
                  index: info.index,
                  animated: true,
                });
              });
            }}
            ref={flatListRef}
            data={data}
            horizontal
            renderItem={Item}
          />
          <Card style={styles.outsidecard}>
            <View style={styles.row}>
              <BiggerCircle color={theme["color-primary-100"]}>
                <Image source={require("../assets/Maternal.png")} />
              </BiggerCircle>
              <Text
                style={{
                  ...styles.text,
                  width: Dimensions.get("window").width / 2,
                }}
              >
                Your baby is {pdata.fruit_seed_comparison}
              </Text>
            </View>
            <View style={styles.row}>
              <View>
                <Text style={styles.textcenter}>Baby Height</Text>
                <Text style={styles.textcenter} category="h6">
                  {pdata.height}cm
                </Text>
              </View>
              <View>
                <Text style={styles.textcenter}>Baby Weight</Text>
                <Text style={styles.textcenter} category="h6">
                  {pdata.weight}grams
                </Text>
              </View>
              <View>
                <Text style={styles.textcenter}>Days left</Text>
                <Text style={styles.textcenter} category="h6">
                  {daysLeft}
                </Text>
              </View>
            </View>
          </Card>
          <Text style={styles.texttitle}>Updates</Text>

          <View style={styles.row}>
            <Card
              style={{ ...styles.btncard, backgroundColor: "#FF9BA3" }}
              onPress={() => {
                props.navigation.navigate("Updates");
              }}
            >
              <Text style={styles.cardTitle}>Your Body</Text>
              <View style={styles.row2}>
                <Text style={styles.cardtext}>Weekly symptoms</Text>
                <Image
                  style={styles.img}
                  source={require("../assets/Group.png")}
                />
              </View>
            </Card>
            <Card
              onPress={() => {
                props.navigation.navigate("Baby");
              }}
              style={{ ...styles.btncard, backgroundColor: "#D48699" }}
            >
              <Text style={styles.cardTitle}>Your Baby</Text>
              <View style={styles.row2}>
                <Text style={styles.cardtext}>Development</Text>
                <Image
                  style={styles.img}
                  source={require("../assets/Group78.png")}
                />
              </View>
            </Card>
          </View>
          <View style={{ ...styles.row, marginTop: 10 }}>
            <Card
              style={{ ...styles.btncard, backgroundColor: "#AF90B1" }}
              onPress={() => {
                props.navigation.navigate("Calendar");
              }}
            >
              <Text style={styles.cardTitle}>Log</Text>
              <View style={styles.row2}>
                <Text style={styles.cardtext}>Logs & Reminders</Text>
                <MaterialCommunityIcons
                  name="calendar-month"
                  size={96}
                  color="white"
                />
              </View>
            </Card>
            <Card
              onPress={() => {
                props.navigation.navigate("Tips");
              }}
              style={{ ...styles.btncard, backgroundColor: "#81A5C3" }}
            >
              <Text style={styles.cardTitle}>Tips & Insights</Text>
              <View style={styles.row2}>
                <Text style={styles.cardtext}>Tricks & Tips</Text>
                <MaterialCommunityIcons
                  name="lightbulb-on-outline"
                  size={96}
                  color="white"
                />
              </View>
            </Card>
          </View>
          <Card
            style={{
              ...styles.btncard,
              backgroundColor: theme["color-primary-300"],
              margin: 10,
            }}
          >
            <Text style={styles.cardTitle}>Book Specialist</Text>
            <View style={styles.row2}>
              <Text style={styles.cardtext}>Professional help</Text>
              <Fontisto name="doctor" size={96} color="white" />
            </View>
          </Card>
        </Layout>
      </ScrollView>
    </>
  );
};
const themedStyles = StyleService.create({
  parent: {
    flex: 1,
  },
  welcometext: {
    margin: 10,
  },
  texttitle: {
    margin: 10,
    fontWeight: "500",
    fontSize: 24,
  },
  due: {
    margin: 10,
    textDecorationLine: "underline",
  },
  card: {
    width: 80,
    margin: 5,
  },
  itemtext: {
    color: "#fff",
  },
  outsidecard: {
    margin: 10,
  },
  text: {
    fontSize: 16,
    marginBottom: 10,
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-around",
  },
  textcenter: {
    textAlign: "center",
  },
  btncard: {
    width: Dimensions.get("window").width / 2 - 20,
    height: 148,
  },
  cardTitle: {
    color: "white",
    fontWeight: "bold",
    fontSize: 18,
  },
  cardtext: {
    color: "white",
    fontSize: 14,
    width: Dimensions.get("window").width / 4,
  },
  row2: {
    flexDirection: "row",
    justifyContent: "space-evenly",
  },
  img: {
    height: 80,
    width: 80,
    objectFit: "contain",
  },
});
