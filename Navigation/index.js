import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Start from "../screens/Start";
import Login from "../screens/Login";
import SignUp from "../screens/SignUp";
import Personal from "../screens/Personal";
import { Ionicons } from "@expo/vector-icons";
import { useTheme } from "@ui-kitten/components";
import Main from "../screens/Main";
import PickDay from "../screens/PickDay";
import Shop from "../screens/Shop";
import Cart from "../components/Cart";
import Cart2 from "../screens/Cart";
import ProductDetails from "../screens/ProductDetails";
import Checkout from "../screens/Checkout";
import AskHayah from "../screens/AskHayah";
import Updates from "../screens/Updates";
import Baby from "../screens/Baby";
import Tips from "../screens/Tips";
import Home from "../components/Home";
import Create_Community from "../screens/Create_Community";
import Community from "../screens/Community";
import Community_details from "../screens/Community_details";
import Post from "../screens/Post";
import Calendar from "../screens/Calendar";
import CreateEvent from "../screens/CreateEvent";
import SingleEvent from "../screens/SingleEvent";
import VacccineSchedule from "../screens/VaccineSchedule";
const Tab = createBottomTabNavigator();

const MybtmStack = () => {
  theme = useTheme();
  return (
    <Tab.Navigator
      initialRouteName="Home"
      screenOptions={({ navigation }) => ({
        tabBarActiveTintColor: theme["color-primary-500"],
        headerShown: true,
        headerLeft: (props) => {
          if (!props.canGoBack) {
            return null;
          }
          return (
            <Ionicons
              onPress={() => {
                navigation.goBack();
              }}
              size={25}
              style={{ marginRight: 20 }}
              name="chevron-back-sharp"
            />
          );
        },
        headerRight: (props) => <Cart {...props} navigation={navigation} />,
      })}
    >
      <Tab.Screen
        name="Home"
        component={Main}
        options={{
          title: "Home",
          headerShown: true,
          tabBarIcon: ({ color }) => (
            <TabBarIcon name="md-home-outline" color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="Shop"
        component={Shop}
        options={{
          title: "Shop",
          tabBarIcon: ({ color }) => (
            <TabBarIcon name="basket-outline" color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="Community"
        component={Community}
        options={{
          title: "Community",
          tabBarIcon: ({ color }) => <TabBarIcon name="people" color={color} />,
        }}
      />
    </Tab.Navigator>
  );
};

const Stack = createNativeStackNavigator();
function TabBarIcon(props) {
  return <Ionicons size={24} style={{ marginBottom: -3 }} {...props} />;
}

export default () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={({ navigation, route }) => ({
          headerShown: false,
          headerLeft: (props) => {
            if (!props.canGoBack) {
              return null;
            }
            return (
              <Ionicons
                onPress={() => {
                  navigation.goBack();
                }}
                size={25}
                style={{ marginRight: 20 }}
                name="chevron-back-sharp"
              />
            );
          },
          headerRight: (props) => <Cart {...props} navigation={navigation} />,
          headerShadowVisible: false,
        })}
      >
        <Stack.Screen name="Start" component={Start} />
        <Stack.Screen
          name="CreateCommunity"
          component={Create_Community}
          options={{
            headerRight: () => <></>,
            headerShown: true,
            headerTitle: "Create Community",
          }}
        />
        <Stack.Screen
          name="Post"
          component={Post}
          options={{
            headerRight: () => <></>,
            headerShown: true,
            headerTitle: "Post",
          }}
        />
        <Stack.Screen
          name="Details"
          component={Community_details}
          options={{
            headerRight: () => <></>,
            headerShown: true,
            headerTitle: "Details",
          }}
        />

        <Stack.Screen
          name="Updates"
          component={Updates}
          options={({ navigation }) => ({
            headerShown: true,
            headerRight: () => <Home navigation={navigation} />,
          })}
        />
        <Stack.Screen
          name="Baby"
          component={Baby}
          options={({ navigation }) => ({
            headerShown: true,
            headerRight: () => <Home navigation={navigation} />,
          })}
        />
        <Stack.Screen
          name="Tips"
          component={Tips}
          options={({ navigation }) => ({
            headerShown: true,
            headerRight: () => <Home navigation={navigation} />,
          })}
        />
        <Stack.Screen
          name="AskHayah"
          component={AskHayah}
          options={{ headerShown: true, headerRight: () => <></> }}
        />
        <Stack.Screen
          name="Calendar"
          component={Calendar}
          options={{ headerShown: true }}
        />
        <Stack.Screen
          name="CreateEvent"
          component={CreateEvent}
          options={{ headerShown: true, headerTitle: "Create Event" }}
        />
        <Stack.Screen
          name="SingleEvent"
          component={SingleEvent}
          options={{
            headerShown: true,
            headerTitle: "Single Event",
          }}
        />
        <Stack.Screen
          name="VaccineSchedule"
          component={VacccineSchedule}
          options={{
            headerShown: true,
            headerTitle: "Vaccine Schedule",
          }}
        />
        <Stack.Screen
          name="Cart"
          component={Cart2}
          options={{ headerShown: true }}
        />
        <Stack.Screen
          name="Checkout"
          component={Checkout}
          options={{ headerShown: true, headerRight: () => <></> }}
        />
        <Stack.Screen name="Main" component={MybtmStack} options={{}} />
        <Stack.Screen
          name="ProductDetails"
          component={ProductDetails}
          options={{
            headerShown: true,
            headerTitle: "",
          }}
        />
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="SignUp" component={SignUp} />
        <Stack.Screen name="Personal" component={Personal} />
        <Stack.Screen name="Pickday" component={PickDay} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};
