import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  SafeAreaView,
  ScrollView,
  ImageBackground,
  TouchableOpacity,
  StatusBar,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

import CustomSwitch from "../components/CustomSwitch";
import Dish from "../components/Dish";
import axios from "axios";

export default function HomeScreen({ navigation }) {
  const [switcher, setSwitcher] = useState(1);
  // const user = useAppSelector(selectUser)
  const [username, setUsername] = useState();
  const [data, setData] = useState();
  const [visibleStatusBar, setvisibleStatusBar] = useState(false);

  useEffect(async () => {
    const user = await AsyncStorage.getItem("user");
    setUsername(user);[]
    meals();
  }, []);

  const meals = () => {
    axios
      .get("http://192.168.0.114:8080/api/meal", {
        responseType: "json",
      })
      .then(function (response) {
        setData(response.data);
        console.log(data);
      });
  };

  const onSelectSwitch = (value) => {
    setSwitcher(value);
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#fff" }}>
      <StatusBar hidden={visibleStatusBar} />
      <ScrollView style={{ padding: 20 }}>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            marginBottom: 20,
            marginTop: 15,
          }}
        >
          <Text style={{ fontSize: 18, fontWeight: "bold" }}>
            Ahoj, {username}
          </Text>
          <TouchableOpacity onPress={() => navigation.openDrawer()}>
            <ImageBackground
              source={require("../assets/memoji.png")}
              style={{ width: 35, height: 35 }}
              imageStyle={{ borderRadius: 25, borderWidth: 1 }}
            />
          </TouchableOpacity>
        </View>

        <View style={{ marginVertical: 20 }}>
          <CustomSwitch
            selectionMode={1}
            option1="Jedlá"
            option2="Burza"
            onSelectSwitch={onSelectSwitch}
          />
        </View>
        {switcher == 1 &&
          data &&
          data.map((dish, i) => (
            <Dish
              key={i}
              name={dish.mealName}
              price={dish.price}
              count={dish.count}
            />
          ))}
        {switcher == 2 && <Text>Žiadne objednávky</Text>}
      </ScrollView>
    </SafeAreaView>
  );
}
