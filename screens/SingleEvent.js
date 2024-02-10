import * as React from "react";
import { useNavigation } from "@react-navigation/native";
import {
  Card,
  Layout,
  StyleService,
  Text,
  useStyleSheet,
} from "@ui-kitten/components";
import { View } from "react-native";

export default (props) => {
  const styles = useStyleSheet(styles2);
  const event = props.route.params.event;
  const navigation = useNavigation();
  let time = new Date(event.startDate);
  time = time.toLocaleTimeString();

  React.useEffect(() => {
    navigation.setOptions({ headerTitle: event.title });
  }, []);

  return (
    <Layout style={styles.parent}>
      <Card
        style={{ margin: 10 }}
        header={(props) => (
          <Text style={{ margin: 10 }} category="h6">
            {event.title}
          </Text>
        )}
      >
        <Text appearance="hint">{event.notes}</Text>

        <View style={styles.rowright}>
          <Text status="primary" style={{ fontWeight: "bold" }}>
            {event.startDate.split("T")[0]}
          </Text>

          <Text status="primary" style={{ fontWeight: "bold", marginLeft: 10 }}>
            {time}
          </Text>
        </View>
      </Card>
    </Layout>
  );
};
const styles2 = StyleService.create({
  parent: {
    flex: 1,
  },
  rowright: {
    flexDirection: "row",
    justifyContent: "flex-end",
    alignItems: "center",
  },
});
