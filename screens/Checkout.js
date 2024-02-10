import * as React from "react";
import * as Redux from "react-redux";
import { setcount, setproduct } from "../redux/actions";
import {
  Button,
  Card,
  Divider,
  Input,
  Layout,
  StyleService,
  Text,
  useStyleSheet,
  useTheme,
} from "@ui-kitten/components";
import { ScrollView, View } from "react-native";
import URL from "../components/URL";
import Loading from "../components/Loading";

export default (props) => {
  const { count } = Redux.useSelector((state) => state.countreducer);
  const [loading, setloading] = React.useState(false);
  const [total, settotal] = React.useState(0);
  const styles = useStyleSheet(styles2);
  const updatecount = Redux.useDispatch();

  const theme = useTheme();
  React.useEffect(() => {
    let total = 0;
    count.forEach((element) => {
      total += element.quantity * element.price;
    });
    settotal(total);
  }, [count]);
  const [name, setname] = React.useState("");
  const [phone, setphone] = React.useState("");
  const [email, setemail] = React.useState("");
  const [country, setcountry] = React.useState("");
  const [county, setcounty] = React.useState("");
  const [city, setcity] = React.useState("");
  const [apt_suite, setapt] = React.useState("");

  const Submit = () => {
    const fields = [
      { value: name, label: "Name" },
      { value: phone, label: "Phone number" },
      { value: email, label: "Email" },
      { value: country, label: "Country" },
      { value: county, label: "County" },
      { value: city, label: "City" },
      { value: apt_suite, label: "Apt/Suite" },
    ];

    let isEmpty = false;

    fields.forEach((field) => {
      if (field.value === "") {
        alert(`Please enter your ${field.label}`);
        isEmpty = true;
      }
    });

    if (!isEmpty) {
      const url = URL + "checkout.php";
      const data = new FormData();
      data.append("name", name);
      data.append("phone", phone);
      data.append("email", email);
      data.append("country", country);
      data.append("county", county);
      data.append("city", city);
      data.append("apt_suite", apt_suite);
      data.append("total", total);
      data.append("suborders", JSON.stringify(count));
      console.log(JSON.stringify(count));
      const options = {
        method: "POST",
        body: data,
      };
      setloading(true);
      fetch(url, options)
        .then((res) => res.text())
        .then((res) => {
          console.log(res);
        })
        .catch((err) => {
          console.log(err);
        })
        .finally(() => {
          setloading(false);
          updatecount(setcount([]));
          props.navigation.reset({
            index: 0,
            routes: [{ name: "Main" }],
          });
        });
    }
  };

  return (
    <ScrollView>
      {loading && <Loading />}
      <Layout style={styles.parent}>
        <Card style={styles.card}>
          <Text style={{ margin: 10 }}>Personal details</Text>
          <Input
            style={styles.input}
            placeholder="full name"
            value={name}
            onChangeText={(text) => setname(text)}
          />
          <Input
            style={styles.input}
            placeholder="Email"
            keyboardType="email-address"
            value={email}
            onChangeText={(text) => setemail(text)}
          />
          <Input
            style={styles.input}
            placeholder="Phone number"
            keyboardType="phone-pad"
            value={phone}
            onChangeText={(text) => setphone(text)}
          />
          <Text style={{ margin: 10 }}>Delivery details</Text>
          <Input
            style={styles.input}
            placeholder="country"
            value={country}
            onChangeText={(text) => setcountry(text)}
          />
          <Input
            style={styles.input}
            placeholder="county/region"
            value={county}
            onChangeText={(text) => setcounty(text)}
          />
          <Input
            style={styles.input}
            placeholder="city"
            value={city}
            onChangeText={(text) => setcity(text)}
          />
          <Input
            style={styles.input}
            placeholder="Apt/suit"
            value={apt_suite}
            onChangeText={(text) => setapt(text)}
          />
        </Card>
        <View style={styles.box}>
          <View style={styles.boxrow}>
            <Text style={styles.title}>Order Summary</Text>
            <Text style={styles.titlelittle}>{count.length} Items</Text>
          </View>
          <Divider
            style={{
              marginHorizontal: 10,
              marginVertical: 5,
            }}
          />
          <View style={styles.boxrow}>
            <Text style={styles.titlelittle}>Items total</Text>
            <Text style={styles.title}>Ksh {total}</Text>
          </View>
          <Divider
            style={{
              marginHorizontal: 10,
              marginVertical: 5,
            }}
          />
          <View style={styles.boxrow}>
            <Text style={styles.titlelittle}>Total</Text>
            <Text style={styles.title}>Ksh {total}</Text>
          </View>
          <Button onPress={Submit} style={{ margin: 10 }}>
            Checkout
          </Button>
        </View>
      </Layout>
    </ScrollView>
  );
};
const styles2 = StyleService.create({
  parent: { flex: 1 },
  card: {
    margin: 10,
  },
  input: {
    margin: 10,
  },
  box: {
    margin: 10,
    borderRadius: 5,
    backgroundColor: "#D9D9D9",
  },
  boxrow: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  title: {
    fontSize: 20,
    margin: 10,
    fontWeight: "bold",
  },
  titlelittle: {
    fontSize: 14,
    margin: 10,
    fontWeight: "bold",
    alignSelf: "center",
  },
});
