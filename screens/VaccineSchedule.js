import * as React from "react";
import AddDaysToDate from "../components/Add";
import {
  Layout,
  List,
  StyleService,
  Text,
  useStyleSheet,
} from "@ui-kitten/components";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { View } from "react-native";
import GetSchedule from "../components/GetSchedule";

export default (props) => {
  const styles = useStyleSheet(styles2);
  const [duedate, setduedate] = React.useState(new Date());
  const [schedule, setschedule] = React.useState([]);

  React.useEffect(() => {
    (async () => {
      let due_date = await AsyncStorage.getItem("due_date");
      due_date = new Date(due_date);
      setduedate(due_date);
      let schedule2 = GetSchedule(due_date);
      setschedule(schedule2);
    })();
  }, []);

  const BigItem = ({ item }) => {
    return (
      <View style={styles.row}>
        <Text style={styles.date}>{item.day}</Text>
        <View>
          <Text style={styles.date}>Vaccinations</Text>
          <List key={"2"} data={item.vaccines} renderItem={SmallItemName} />
        </View>
        <View>
          <Text style={styles.date}>Dosage</Text>
          <List key={"3"} data={item.vaccines} renderItem={SmallItemVaccine} />
        </View>
      </View>
    );
  };

  const SmallItemName = ({ item }) => {
    return (
      <>
        <Text style={styles.vaccine}>{item.vaccine}</Text>
      </>
    );
  };
  const SmallItemVaccine = ({ item }) => {
    return (
      <>
        <Text style={styles.vaccine}>{item.dosage}</Text>
      </>
    );
  };

  return (
    <Layout style={styles.parent}>
      <Text style={{ margin: 10 }} appearance="hint">
        These schedules are based of your due date: {duedate.toDateString()}
      </Text>
      <List data={schedule} key={"1"} renderItem={BigItem} />
    </Layout>
  );
};

const styles2 = StyleService.create({
  parent: {
    flex: 1,
  },
  row: {
    flexDirection: "row",
    borderBottomWidth: 1,
    margin: 10,
    paddingBottom: 10,
    borderBottomColor: "color-basic-600",
    borderStyle: "dashed",
    justifyContent: "space-between",
    alignItems: "center",
  },
  date: {
    margin: 10,
    color: "color-primary-500",
  },
  vaccine: {
    marginHorizontal: 10,
  },
});
