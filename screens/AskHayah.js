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

export default () => {
  const [loading, setLoading] = React.useState(false);
  const [message, setMessage] = React.useState("");
  const flatListRef = React.useRef(null);
  const isFocused = useIsFocused();
  const convo = Convo;
  const styles = useStyleSheet(styles2);
  const theme = useTheme();
  React.useEffect(() => {
    getmessages();
  }, []);

  const Message = ({ item }) => {
    if (item.speaker == "AI") {
      return <MessageAI message={item.message} />;
    }
    return <Human message={item.message} />;
  };

  const [data, setData] = React.useState([]);

  const getmessages = () => {
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

    fetch(
      "https://api.openai.com/v1/threads/thread_BKK2Bm5hNqhDU6m2mD1rtv76/messages?order=asc",
      requestOptions
    )
      .then((response) => response.json())
      .then((result) => {
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
      "https://api.openai.com/v1/threads/thread_BKK2Bm5hNqhDU6m2mD1rtv76/runs",
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
        "https://api.openai.com/v1/threads/thread_BKK2Bm5hNqhDU6m2mD1rtv76/messages",
        requestOptions
      )
        .then((response) => response.text())
        .then((result) => console.log(result))
        .catch((error) => console.log("error", error))
        .finally(() => {
          setMessage("");
          runthread();
          setTimeout(() => {
            getmessages();
          }, 30000);
        });
    }
  };

  return (
    <>
      <Layout style={styles.parent}>
        {loading && <Loading />}
        <List data={data} renderItem={Message} ref={flatListRef} />
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
