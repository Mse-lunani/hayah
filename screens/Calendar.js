import {
  Button,
  Layout,
  List,
  StyleService,
  Text,
  useStyleSheet,
} from "@ui-kitten/components";
import * as React from "react";
import { Calendar } from "react-native-calendars";
import colors from "../components/colors";
import { Alert, Dimensions, TouchableOpacity, View } from "react-native";
import FloatingCirle from "../components/FloatingCirle";
import * as Calendar2 from "expo-calendar";
import Loading from "../components/Loading";
import {
  FontAwesome,
  Ionicons,
  MaterialCommunityIcons,
} from "@expo/vector-icons";
import Vaccine from "../components/Vaccine";

export default (props) => {
  const styles = useStyleSheet(styles2);
  const [calendarId, setcalendarId] = React.useState("");
  const [status, setstatus] = "pending";
  const [events, setevents] = React.useState([]);
  const [loading, setloading] = React.useState(false);
  const [date, setdate] = React.useState(new Date());
  const [obj, setobj] = React.useState({});

  React.useEffect(() => {
    (async () => {
      const { status } = await Calendar2.requestCalendarPermissionsAsync();
      if (status === "granted") {
        const calendars = await Calendar2.getCalendarsAsync(
          Calendar2.EntityTypes.EVENT
        );
        if (calendars.length < 1) {
          const cid = await createCalendar();
          console.log("cid: ", cid);
          console.log("cid: ", cid);
          setcalendarId(cid);
        } else {
          last = calendars.length - 1;
          setcalendarId(calendars[last].id);
          console.log("cid existing: ", calendars[last].id);
          let startdate = new Date();
          let dt = startdate.toISOString().split("T")[0];
          startdate = new Date(dt + "T00:00:00");
          endDate = new Date(dt + "T23:59:59");
          await getevents([calendars[last].id], startdate, endDate);
          let startdate2 = new Date("2023-12-01" + "T00:00:00");
          let endDate2 = new Date("2025-01-01" + "T23:59:59");
          await getEvents([calendars[last].id], startdate2, endDate2);
        }
      }
    })();
  }, []);

  async function getDefaultCalendarSource() {
    const defaultCalendar = await Calendar2.getDefaultCalendarAsync();
    return defaultCalendar.source;
  }

  async function createCalendar() {
    const defaultCalendarSource =
      Platform.OS === "ios"
        ? await getDefaultCalendarSource()
        : { isLocalAccount: true, name: "Hayah events" };
    const newCalendarID = await Calendar2.createCalendarAsync({
      title: "Hayah Events",
      color: "blue",
      entityType: Calendar2.EntityTypes.EVENT,
      sourceId: defaultCalendarSource.id,
      source: defaultCalendarSource,
      name: "internalCalendarName",
      ownerAccount: "personal",
      accessLevel: Calendar2.CalendarAccessLevel.OWNER,
    });
    console.log(`Your new calendar ID is: ${newCalendarID}`);
    return newCalendarID;
  }

  async function createEvent() {
    const newEvent = await Calendar2.createEventAsync("4", {
      title: "Meeting with instructor",
      startDate: new Date("2024-01-17T09:00:00.000"),
      endDate: new Date("2024-01-17T10:00:00.000"),
      allDay: false,
      timeZone: "Africa/Nairobi",
      notes: "sample event",
      calendarId: "4",
    });
    console.log(`Created event id: ${newEvent}`);
  }

  async function getevents(id, startdate, endDate) {
    setloading(true);
    setevents([]);
    const events = await Calendar2.getEventsAsync(id, startdate, endDate);
    setloading(false);
    setevents(events);
  }

  const getEvents = async (id, startdate, endDate) => {
    const events = await Calendar2.getEventsAsync(id, startdate, endDate);
    if (events.length > 0) {
      let dates = [];
      events.forEach((element) => {
        dates.push(element.startDate.split("T")[0]);
      });
      const uniqueDates = [...new Set(dates)];
      let obj = {};
      uniqueDates.forEach((element) => {
        obj[element] = { selected: true, selectedColor: colors[2].dark };
      });
      setobj(obj);
    }
  };

  const Events = ({ item, index }) => {
    let j = index;
    if (index > 3) {
      j = index % 4;
    }
    let bgcolor = colors[j].light;
    let color = colors[j].dark;
    let dt = new Date(item.startDate);
    dt = dt.toLocaleTimeString();

    return (
      <TouchableOpacity
        onPress={() => {
          props.navigation.navigate("SingleEvent", { event: item });
        }}
        style={{ ...styles.parenttask, backgroundColor: bgcolor }}
      >
        <Text
          numberOfLines={1}
          ellipsizeMode="tail"
          style={{ ...styles.tasktext, color: color }}
        >
          {item.title}
        </Text>

        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <Text style={{ ...styles.tasktext, color: color }}>{dt}</Text>
          <MaterialCommunityIcons
            name="trash-can"
            size={20}
            style={{ marginRight: 20 }}
            color={"red"}
            onPress={Delete.bind(this, item.id)}
          />
        </View>
      </TouchableOpacity>
    );
  };

  const Delete = (id) => {
    Alert.alert("Delete", "Are you sure you want to delete this event?", [
      {
        text: "Cancel",
        onPress: () => console.log("Cancel Pressed"),
        style: "cancel",
      },
      { text: "OK", onPress: () => deleteEvent(id) },
    ]);
  };

  const deleteEvent = async (id) => {
    await Calendar2.deleteEventAsync(id);
    let startdate = new Date(date.toISOString().split("T")[0] + "T00:00:00");
    let endDate = new Date(date.toISOString().split("T")[0] + "T23:59:59");
    await getevents([calendarId], startdate, endDate);
  };

  return (
    <>
      {status == "pending" ? (
        <Layout style={styles.cnt}>
          <Text>
            Please give permissions to calendar before you can use this
            interface
          </Text>
        </Layout>
      ) : (
        <Layout style={styles.parent}>
          {loading && <Loading />}
          <FloatingCirle
            onPress={() => {
              props.navigation.navigate("CreateEvent", {
                calendarId: calendarId,
                date: date.toISOString().split("T")[0],
                startDate: date.toISOString(),
              });
            }}
          />
          <Vaccine
            onPress={() => {
              props.navigation.navigate("VaccineSchedule");
            }}
          />
          <Calendar
            onDayPress={(date) => {
              let startdt = new Date(date.dateString + "T00:00:00");
              console.log("startdt: ", startdt);
              let enddt = new Date(date.dateString + "T23:59:59");
              getevents([calendarId], startdt, enddt);
              setdate(new Date(date.dateString));
            }}
            markedDates={{
              ...obj,
              [date.toISOString().split("T")[0]]: {
                selected: true,
                selectedColor: colors[0].dark,
              },
            }}
          />
          {events.length < 1 && (
            <Layout style={styles.cnt}>
              <Text>No events for this day</Text>
            </Layout>
          )}
          <List data={events} renderItem={Events} />
        </Layout>
      )}
    </>
  );
};
const styles2 = StyleService.create({
  parent: {
    flex: 1,
  },
  parenttask: {
    margin: 10,
    width: Dimensions.get("window").width - 20,
    height: 50,
    borderRadius: 20,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  tasktext: {
    marginHorizontal: 20,
    fontWeight: "bold",
  },
  cnt: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
