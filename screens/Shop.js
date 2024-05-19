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
import Product from "../components/Product";
import { TouchableOpacity } from "react-native";
import * as Redux from "react-redux";
import { setcount, setproduct } from "../redux/actions";
import apiurl from "../components/apiurl";
import Loading from "../components/Loading";
export default (props) => {
  const { count } = Redux.useSelector((state) => state.countreducer);
  const [loading, setloading] = React.useState(false);

  const updatecount = Redux.useDispatch();

  const styles = useStyleSheet(styles2);
  const theme = useTheme();
  const [data, setdata] = React.useState([
    {
      name: "Havea round baby pacifer",
      id: 1,
      image: require("../assets/shop/pacifier.png"),
      price: 4500,
      quantity: 0,
      category: "pacifier",
      description:
        "When it comes to caring for your little one, one of the essential items to have is a round baby pacifier. These soothing pacifiers provide comfort and security to your baby, helping to calm and pacify them. The rounded shape is designed for easy use and fits perfectly in your baby's mouth, making it a convenient and trusted choice for parents looking to ensure their baby's contentment",
    },
    {
      name: "Classic chocolate chip lactation cookies",
      id: 2,
      image: require("../assets/shop/cookies.png"),
      price: 600,
      category: "food",
      quantity: 0,
      description:
        "If you're a new mom or a mom-to-be looking for a tasty and nutritious treat to support your breastfeeding journey, consider trying classic chocolate chip lactation cookies. These delectable cookies are not only a delightful snack but also designed to help boost your milk supply. Packed with the goodness of chocolate chips and lactation-boosting ingredients, these cookies are a favorite choice for nursing mothers seeking a sweet and effective way to nourish both themselves and their little ones.",
    },
    {
      name: "Calpol infant oral suspension",
      id: 3,
      image: require("../assets/shop/calpol.png"),
      price: 4000,
      quantity: 0,
      category: "medicine",
      description:
        "Calpol infant oral suspension is a trusted and reliable solution for parents looking to alleviate discomfort in their infants. This specially formulated oral suspension is designed to provide effective relief from common ailments like fever, pain, and discomfort in babies. With its gentle and easy-to-administer liquid form, Calpol is a go-to choice for parents seeking a safe and convenient way to help their little ones feel better when they are under the weather.",
    },
    {
      name: "Shield wide neck feeder with handle",
      id: 4,
      image: require("../assets/shop/bottle.png"),
      price: 800,
      quantity: 0,
      category: "bottle",
      description:
        "The Shield wide neck feeder with a handle is a convenient and practical solution for parents and caregivers. This innovative design offers ease of use, making it an excellent choice for feeding your baby. With its wide neck and ergonomic handle, it provides a comfortable grip and effortless feeding experience. Whether you're at home or on the go, the Shield wide neck feeder is a reliable companion for ensuring your baby's nourishment is both efficient and enjoyable.",
    },
  ]);

  const [categories, setcategories] = React.useState([
    "All",
    "pacifier",
    "medicine",
    "bottle",
    "food",
  ]);

  const [currentcat, setcurrentcat] = React.useState("All");
  const [quantity, setquantity] = React.useState(0);
  const [visible, setVisible] = React.useState(false);

  const [changingdata, setchangingdata] = React.useState(data);
  const getdata = () => {
    getcategories();
    setloading(true);
    console.log(apiurl);
    fetch(apiurl + "view_products.php")
      .then((response) => response.json())
      .then((json) => {
        setdata(json);
        setchangingdata(json);
      })
      .catch((error) => console.error(error))
      .finally(() => setloading(false));
  };
  const getcategories = () => {
    setloading(true);
    fetch(apiurl + "view_categories.php")
      .then((response) => response.json())
      .then((json) => {
        setcategories(json);
      })
      .catch((error) => console.error(error))
      .finally(() => setloading(false));
  };

  React.useEffect(() => {
    getdata();
  }, []);
  React.useEffect(() => {
    let dt = [];
    if (currentcat == "All") {
      setchangingdata(data);
    } else {
      dt = data.filter((item) => item.category === currentcat);
      setchangingdata(dt);
    }
  }, [currentcat]);

  React.useEffect(() => {
    updatecount(setproduct(data));
  }, []);

  React.useEffect(() => {
    let dt = [];
    dt = data.filter((item) => item.quantity > 0);
    updatecount(setcount(dt));
  }, [quantity]);

  const Items = ({ item, index }) => {
    let price = parseInt(item.price);
    return (
      <Product
        {...item}
        price={price}
        onPress={() => {
          props.navigation.navigate("ProductDetails", {
            item: item,
            data: data.filter((items) => items.name != item.name),
            index: index,
          });
        }}
        minus={() => {
          if (quantity > 0) {
            let q = quantity;
            q -= 1;
            let dt = data;
            dt[index].quantity = q;
            setdata(dt);
            setquantity(q);
          }
        }}
        add={() => {
          let q = quantity;
          q += 1;
          let dt = data;
          dt[index].quantity = q;
          setdata(dt);
          setquantity(q);
        }}
        done={() => {
          setquantity(0);
          setVisible(false);
        }}
        quan={quantity}
        visible={visible}
      />
    );
  };
  const Cat = ({ item }) => {
    let bcolor =
      currentcat == item
        ? theme["color-primary-500"]
        : theme["color-primary-200"];
    let color = currentcat == item ? "white" : "black";
    return (
      <TouchableOpacity
        style={{ ...styles.card, backgroundColor: bcolor }}
        onPress={() => {
          setcurrentcat(item);
        }}
      >
        <Text style={{ color: color }}>{item}</Text>
      </TouchableOpacity>
    );
  };

  return (
    <Layout style={styles.parent}>
      {loading && <Loading />}
      <Layout style={{ height: 60 }}>
        <List
          key={"2"}
          style={{ height: 0 }}
          data={categories}
          renderItem={Cat}
          horizontal
        />
      </Layout>
      <List
        onRefresh={getdata}
        refreshing={loading}
        key={"1"}
        data={changingdata}
        renderItem={Items}
        numColumns={2}
      />
    </Layout>
  );
};

const styles2 = StyleService.create({
  parent: {
    flex: 1,
  },
  card: {
    height: 40,
    minWidth: 80,
    justifyContent: "center",
    alignItems: "center",
    margin: 10,
    padding: 5,
    borderRadius: 10,
  },
});
