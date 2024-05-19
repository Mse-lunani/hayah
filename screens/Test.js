import React, { useEffect } from "react";
import { Text, View } from "react-native";

export default () => {
  useEffect(() => {
    const fetchData = async () => {
      try {
        // Perform your fetch operation here
        const response = await fetch("https://api.publicapis.org/entries");
        const data = await response.json();
        console.log("fetched"); // Do something with the fetched data
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    // Fetch data initially
    //fetchData();

    // Set up interval to fetch data every 10 seconds
    //const intervalId = setInterval(fetchData, 10000);

    // Cleanup function to clear the interval when component unmounts
    // return () => clearInterval(intervalId);
  }, []); // Empty dependency array ensures this effect runs only once after the component mounts

  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text>Comming soon</Text>
      {/* Render your UI components here */}
    </View>
  );
};
