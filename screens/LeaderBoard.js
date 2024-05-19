import {
  Layout,
  List,
  StyleService,
  Text,
  useStyleSheet,
} from "@ui-kitten/components";
import * as React from "react";
import { Dimensions, View } from "react-native";
import URL from "../components/URL";
import { useIsFocused } from "@react-navigation/native";
import Loading from "../components/Loading";

export default (props) => {
  const styles = useStyleSheet(styles2);
  const Isfocused = useIsFocused();

  const [data, setData] = React.useState([]);
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    let url = URL + "leaderboard.php";
    fetch(url)
      .then((response) => response.json())
      .then((responseJson) => {
        console.log(responseJson);
        setData(responseJson);
      })
      .catch((error) => {
        console.error(error);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [Isfocused]);

  const Board = ({ item, index }) => {
    return (
      <View
        style={{ ...styles.tr, ...(index % 2 == 0 && styles.trodd) }}
        key={index}
      >
        <View style={styles.td}>
          <Text>{item.name}</Text>
        </View>
        <View style={styles.td}>
          <Text>{item.points}</Text>
        </View>
      </View>
    );
  };

  return (
    <Layout style={styles.parent}>
      {loading ? (
        <Loading />
      ) : (
        <>
          <View style={styles.tr}>
            <View style={styles.td}>
              <Text style={styles.head}>Name</Text>
            </View>
            <View style={styles.td}>
              <Text style={styles.head}>Points</Text>
            </View>
          </View>
          <List style={styles.listparent} renderItem={Board} data={data} />
        </>
      )}
    </Layout>
  );
};
const styles2 = StyleService.create({
  parent: {
    flex: 1,
    padding: 10,
  },
  tr: {
    backgroundColor: "color-basic-200",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  trodd: {
    backgroundColor: "color-basic-100",
  },

  td: {
    padding: 10,
    borderRightWidth: 1,
    borderRightColor: "color-basic-400",
    width: Dimensions.get("window").width / 2,
    alignItems: "center",
    flexWrap: "wrap",
  },
  head: {
    fontSize: 16,
    fontWeight: "bold",
  },
  listparent: {
    backgroundColor: "color-basic-100",
  },
});
