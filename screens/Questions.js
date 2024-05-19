import {
  Button,
  Layout,
  List,
  StyleService,
  Text,
  useStyleSheet,
} from "@ui-kitten/components";
import * as React from "react";
import Questions from "../questions.json";
import { Alert, Dimensions, Image, TouchableOpacity, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import URL from "../components/URL";

export default (props) => {
  const styles = useStyleSheet(styles2);
  const [user, setuser] = React.useState();
  const Quiz = Questions[props.route.params.active];
  const active2 = props.route.params.active;
  const [question, setQuestion] = React.useState(Quiz.questions[0]);
  const [answers, setAnswers] = React.useState([]);
  const [index, setIndex] = React.useState(0);
  const [active, setactive] = React.useState(false);
  const [gifurl, setgifurl] = React.useState(
    require("../assets/gifs/decide.gif")
  );

  React.useEffect(() => {
    switch (active2) {
      case 0:
        setgifurl(require("../assets/gifs/0.gif"));
        break;
      case 1:
        setgifurl(require("../assets/gifs/1.gif"));
        break;
      case 2:
        setgifurl(require("../assets/gifs/2.gif"));
        break;
    }
    (async () => {
      let us = await AsyncStorage.getItem("name");
      us = JSON.parse(us);
      setuser(us);
    })();
  }, []);

  function GetIndex(quiz) {
    let index = -1;
    Quiz.questions.forEach((element, i) => {
      if (element.question === quiz) {
        index = i;
        return;
      }
    });
    return index;
  }

  const Choices = ({ item, index }) => {
    let check = false;
    let ans = answers;
    let qindex = GetIndex(question.question);
    if (ans[qindex] !== undefined) {
      check = ans[qindex] === index;
    }

    return (
      <TouchableOpacity
        style={{
          ...styles.box,
          ...(check ? styles.boxactive : styles.boxinactive),
        }}
        onPress={() => {
          let ans = answers;
          if (ans[qindex] === undefined) {
            ans.push(index);
          } else {
            ans[qindex] = index;
          }
          console.log(ans);
          setAnswers(ans);
          setactive(index);
        }}
      >
        <Text style={styles.txt} category="h6">
          {item}
        </Text>
      </TouchableOpacity>
    );
  };
  const HandlePress = async () => {
    let ans = answers;
    if (index < Quiz.questions.length - 1) {
      setIndex(index + 1);
      setQuestion(Quiz.questions[index + 1]);
      setactive(false);
      if (ans[index + 1] !== undefined) {
        setactive(ans[index + 1]);
      }
    } else if (index === Quiz.questions.length - 1) {
      setactive(false);
      console.log(answers);
      let v = { topic: active2, answers: ans };
      let prev = await AsyncStorage.getItem("answers");
      if (prev) {
        prev = JSON.parse(prev);
      } else {
        prev = [];
      }
      console.log("prev type", typeof prev);
      console.log("prev", prev);
      prev.push(v);

      //pid,qid,tid,aid,point
      let data = "";
      let url = URL + "save_answers.php";
      let method = "POST";
      ans.forEach((element, i) => {
        point = 0;
        if (Quiz.questions[i].answer === element) {
          point = 1;
        }
        data = new FormData();
        data.append("pid", user.id);
        data.append("qid", i);
        data.append("tid", active2);
        data.append("aid", element);
        data.append("point", point);
        fetch(url, {
          method: method,
          body: data,
        })
          .then((response) => response.text())
          .then(async (responseJson) => {
            console.log(responseJson);
          })
          .catch((error) => {
            console.error(error);
          })
          .finally(() => {});
      });
      await AsyncStorage.setItem("answers", JSON.stringify(prev));
      props.navigation.goBack();
      console.log(prev);
    }
  };

  return (
    <Layout style={styles.parent}>
      <Image
        style={{ height: 100, width: 100, alignSelf: "center" }}
        source={gifurl}
      />
      <Text
        style={{
          width: Dimensions.get("window").width,
          textAlign: "center",
        }}
        category="h6"
        appearance="hint"
      >
        {question.question}
      </Text>

      <View style={styles.parentlist}>
        <List
          data={question.choices}
          renderItem={Choices}
          contentContainerStyle={styles.list}
          style={styles.list}
        />
      </View>
      <View style={styles.rowparent}>
        <Button
          onPress={() => {
            if (index > 0) {
              setIndex(index - 1);
              setQuestion(Quiz.questions[index - 1]);
              setactive(answers[index - 1]);
            }
          }}
          style={styles.btn}
          status="info"
          accessoryLeft={(props) => (
            <Ionicons name="chevron-back-sharp" color={"white"} size={20} />
          )}
        >
          Back
        </Button>
        <Button
          onPress={HandlePress}
          style={styles.btn}
          disabled={active === false ? true : false}
          accessoryRight={(props) => (
            <Ionicons name="chevron-forward-sharp" color={"white"} size={20} />
          )}
        >
          {Quiz.questions.length - 1 === index ? "Finish" : "Next"}
        </Button>
      </View>
    </Layout>
  );
};
const styles2 = StyleService.create({
  parent: {
    flex: 1,
  },
  box: {
    borderWidth: 1,
    width: Dimensions.get("window").width - 20,
    height: 80,
    borderRadius: 10,
    borderBottomWidth: 4,
    borderColor: "color-danger-200",
    margin: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  parentlist: {
    flex: 1,
    paddingTop: 20,
  },
  list: {
    backgroundColor: "color-basic-100",
  },
  rowparent: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-around",
    marginHorizontal: 20,
  },
  btn: {
    margin: 10,
    marginVertical: 40,
    width: Dimensions.get("window").width / 3,
  },
  txt: {
    textAlign: "center",
  },
  boxactive: {
    borderColor: "color-danger-200",
  },
  boxinactive: {
    borderColor: "color-basic-500",
  },
});
