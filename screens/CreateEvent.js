import {
  Button,
  Datepicker,
  Input,
  Layout,
  StyleService,
  Text,
  useStyleSheet,
} from "@ui-kitten/components";
import * as React from "react";
import { Dimensions, TouchableOpacity, View } from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";
import RNDateTimePicker from "@react-native-community/datetimepicker";
import Loading from "../components/Loading";
import * as Calendar2 from "expo-calendar";

export default (props) => {
  const calendarId = props.route.params.calendarId;
  const date = props.route.params.date;
  const startDate = props.route.params.startDate;
  const [loading, setloading] = React.useState(false);
  const styles = useStyleSheet(styles2);
  const [show, setshow] = React.useState(false);
  const [show2, setshow2] = React.useState(false);
  const [starttime, setstarttime] = React.useState(new Date(startDate));
  const [startdate, setstartdate] = React.useState(new Date(startDate));
  const [endtime, setendtime] = React.useState(new Date(startDate));
  const [enddate, setenddate] = React.useState(new Date());
  const [title, settitle] = React.useState("");
  const [notes, setnotes] = React.useState("");

  const onChange = (event, value) => {
    setstarttime(value);
    const endtime = add30Minutes(value);
    setendtime(endtime);
    if (Platform.OS === "android") {
      setshow(false);
    }
  };
  const onChange2 = (event, value) => {
    setendtime(value);
    console.log("here");
    if (Platform.OS === "android") {
      setshow2(false);
    }
  };

  const changeDate = (date) => {
    setstarttime(date);
    const endtime = add30Minutes(date);
    setendtime(endtime);
    setstartdate(date);
  };

  async function createEvent() {
    setloading(true);
    const newEvent = await Calendar2.createEventAsync(calendarId, {
      title: title,
      startDate: starttime,
      endDate: endtime,
      allDay: false,
      timeZone: "Africa/Nairobi",
      notes: notes,
      calendarId: calendarId,
    });
    console.log(`Created event id: ${newEvent}`);
    alert("Created successfully");
    props.navigation.reset({
      index: 0,
      routes: [{ name: "Main" }],
    });
  }
  function add30Minutes(date) {
    const newDate = new Date(date);
    newDate.setMinutes(newDate.getMinutes() + 30);
    return newDate;
  }

  return (
    <Layout style={styles.parent}>
      {loading && <Loading />}
      <Text category="h5" style={{ margin: 10 }}>
        Event for {startdate.toLocaleString().split(",")[0]}
      </Text>
      <Input
        value={title}
        onChangeText={(text) => {
          settitle(text);
        }}
        placeholder="Title"
        label={"Title"}
        style={{ margin: 10 }}
      />
      <Input
        placeholder="Notes"
        label={"Notes"}
        multiline
        value={notes}
        onChangeText={(text) => {
          setnotes(text);
        }}
        numberOfLines={4}
        style={{ margin: 10 }}
      />
      <Datepicker
        date={startdate}
        style={{ margin: 10 }}
        onSelect={changeDate}
        label={"Event date"}
      />

      <View style={styles.row}>
        <View>
          <Text
            style={{ marginHorizontal: 10, fontWeight: "bold", fontSize: 12 }}
            appearance="hint"
          >
            Start time
          </Text>
          <TouchableOpacity
            style={styles.timeinput}
            onPress={() => {
              setshow(true);
            }}
          >
            <Text style={styles.timetext}>
              {starttime.toLocaleTimeString()}
            </Text>
          </TouchableOpacity>
        </View>
        <View>
          <Text
            style={{ marginHorizontal: 10, fontWeight: "bold", fontSize: 12 }}
            appearance="hint"
          >
            End time
          </Text>
          <TouchableOpacity
            style={styles.timeinput}
            onPress={() => {
              setshow2(true);
            }}
          >
            <Text style={styles.timetext}>{endtime.toLocaleTimeString()}</Text>
          </TouchableOpacity>
        </View>
      </View>
      {show && (
        <DateTimePicker
          value={starttime}
          display="default"
          is24Hour={true}
          testID="time"
          mode="time"
          onChange={onChange}
        />
      )}
      {show2 && (
        <DateTimePicker
          value={endtime}
          display="default"
          is24Hour={true}
          testID="time"
          mode="time"
          onChange={onChange2}
        />
      )}
      <Button style={{ margin: 10 }} onPress={createEvent}>
        {" "}
        Create event
      </Button>
    </Layout>
  );
};
const styles2 = StyleService.create({
  parent: {
    flex: 1,
  },
  row: {
    flexDirection: "row",
  },
  inputhalf: {
    width: Dimensions.get("window").width / 2 - 20,
    marginBottom: 10,
    marginHorizontal: 10,
    marginTop: 5,
  },
  timeinput: {
    backgroundColor: "color-basic-200",
    width: Dimensions.get("window").width / 2 - 20,
    height: 40,
    marginHorizontal: 10,
    marginBottom: 10,
    marginTop: 5,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: "color-basic-400",
    justifyContent: "center",
  },
  timetext: {
    paddingHorizontal: 10,
  },
});
