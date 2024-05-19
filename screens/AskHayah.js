import { FontAwesome } from "@expo/vector-icons";
import {
  Avatar,
  Input,
  Layout,
  List,
  StyleService,
  Text,
  useStyleSheet,
  useTheme,
} from "@ui-kitten/components";
import * as React from "react";
import { View } from "react-native";
import { Convo, Human, MessageAI } from "../components/Convo";
import { useIsFocused } from "@react-navigation/native";
import Loading from "../components/Loading";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default () => {
  const [loading, setLoading] = React.useState(false);
  const [thread_id, setThread_id] = React.useState("");
  const [message, setMessage] = React.useState("");
  const flatListRef = React.useRef(null);
  const isFocused = useIsFocused();
  const convo = Convo;
  const styles = useStyleSheet(styles2);
  const theme = useTheme();
  React.useEffect(() => {
    async function fetchData() {
      await getThread();
    }
    fetchData();
  }, []);

  const getThread = async () => {
    setLoading(true);
    const value = await AsyncStorage.getItem("thread_id");
    if (value !== null) {
      console.log(value);
      setThread_id(value);
      setLoading(false);
      getmessages(value);
    } else {
      const val = await CreateThread();
      getmessages(val);
    }
  };

  const CreateThread = async () => {
    setLoading(true);
    var myHeaders = new Headers();
    myHeaders.append("OpenAI-Beta", "assistants=v1");
    myHeaders.append(
      "Authorization",
      "Bearer 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"
    );
    myHeaders.append(
      "Cookie",
      "__cf_bm=BInrmxC7lAQmCl7k2M3d4ed1lhdSvzdlClPXfI1HL.Q-1707979881-1.0-AQ1u/LUhk7HxvhKUUa4I0rB/4MrJFDtWS5lFDx3bD7G3Cs5eGgux7jq2yuFG58gcg5nciV5gKWQ7kDTG5x/fFLs=; _cfuvid=i35lae4db3.j50XtZbozEm.MK0tKSEASKLTWsRIrAj4-1707979881436-0.0-604800000"
    );

    var requestOptions = {
      method: "POST",
      headers: myHeaders,
      redirect: "follow",
    };

    const response = await fetch(
      "https://api.openai.com/v1/threads",
      requestOptions
    );
    const result = await response.json();
    await AsyncStorage.setItem("thread_id", result.id);
    setThread_id(result.id);
    setLoading(false);
    return result.id;
  };

  const Message = ({ item }) => {
    if (item.speaker == "AI") {
      return <MessageAI message={item.message} />;
    }
    return <Human message={item.message} />;
  };

  const [data, setData] = React.useState([]);

  const getmessages = (thread_id) => {
    setLoading(true);
    var myHeaders = new Headers();
    myHeaders.append("OpenAI-Beta", "assistants=v1");
    myHeaders.append(
      "Authorization",
      "Bearer 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"
    );
    var requestOptions = {
      method: "GET",
      headers: myHeaders,
      redirect: "follow",
    };
    console.log(thread_id);

    fetch(
      "https://api.openai.com/v1/threads/" + thread_id + "/messages?order=asc",
      requestOptions
    )
      .then((response) => response.json())
      .then((result) => {
        console.log(result);
        let temp = [];
        let data = {};
        result.data.forEach((element) => {
          data = {
            timestamp: element.created_at,
            speaker: element.role == "assistant" ? "AI" : "Human",
            message: element.content[0].text.value,
          };
          temp.push(data);
        });
        setData(temp);
      })
      .catch((error) => {
        console.log("error", error);
      })
      .finally(() => {
        setLoading(false);
        if (flatListRef.current) {
          flatListRef.current.scrollToEnd({ animated: true });
        }
      });
  };

  const runthread = () => {
    var myHeaders = new Headers();
    myHeaders.append("OpenAI-Beta", "assistants=v1");
    myHeaders.append("Content-Type", "application/json");
    myHeaders.append(
      "Authorization",
      "Bearer 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"
    );
    myHeaders.append(
      "Cookie",
      "__cf_bm=zpd6TPG7vX7OqxokPHsZb.4jOuVBzFJ9IzboiweZ3tg-1704780929-1-AfNd0HRdlUKIXkSpJLinD4g5xKHwUycKrHfn69B6pCLmDVuTj3egdsHWsJYdg5jPYxpdM1+0JxW8YCXP/zDJCmA=; _cfuvid=zNTMeKyR0y1I8OA_Vsw5E8VbaoS1YrwtBKyI4xwsL8c-1704779486372-0-604800000"
    );

    var raw = JSON.stringify({
      assistant_id: "asst_vQsR1jEFoUKWt4k6vGIyi6Et",
    });

    var requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };

    fetch(
      "https://api.openai.com/v1/threads/" + thread_id + "/runs",
      requestOptions
    )
      .then((response) => response.text())
      .then((result) => console.log(result))
      .catch((error) => console.log("error", error));
  };

  const Send = () => {
    if (message == "") {
      alert("Please enter a message");
    } else {
      setLoading(true);
      var myHeaders = new Headers();
      myHeaders.append("OpenAI-Beta", "assistants=v1");
      myHeaders.append("Content-Type", "application/json");
      myHeaders.append(
        "Authorization",
        "Bearer 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"
      );

      var raw = JSON.stringify({
        role: "user",
        content: message,
      });

      var requestOptions = {
        method: "POST",
        headers: myHeaders,
        body: raw,
        redirect: "follow",
      };

      fetch(
        "https://api.openai.com/v1/threads/" + thread_id + "/messages",
        requestOptions
      )
        .then((response) => response.text())
        .then((result) => console.log(result))
        .catch((error) => console.log("error", error))
        .finally(() => {
          setMessage("");
          runthread();
          setTimeout(() => {
            getmessages(thread_id);
          }, 30000);
        });
    }
  };

  return (
    <>
      <Layout style={styles.parent}>
        {loading && <Loading />}
        {data.length > 0 && (
          <List data={data} renderItem={Message} ref={flatListRef} />
        )}

        {!loading && data.length == 0 && (
          <View
            style={{
              flex: 1,
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Text style={{ textAlign: "center", margin: 20 }}>
              Hi am Hera! Please start by asking me a question. I am here to
              help you.
            </Text>
          </View>
        )}
      </Layout>
      <View style={styles.messagesendbox}>
        <Input
          placeholder="type message"
          value={message}
          onChangeText={(nextValue) => setMessage(nextValue)}
          accessoryRight={(props) => (
            <FontAwesome onPress={Send} size={20} name="send" />
          )}
        />
      </View>
    </>
  );
};
const styles2 = StyleService.create({
  parent: {
    flex: 0.95,
  },
  messagesendbox: {
    margin: 20,
  },
});
