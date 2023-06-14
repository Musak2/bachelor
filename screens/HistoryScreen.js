import { React, useEffect, useState } from "react";
import { View, Text, Pressable, ScrollView, StyleSheet } from "react-native";
import axios from "axios";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";

const HistoryScreen = (props) => {
  const [data, setData] = useState();

  useEffect(() => {
    listHistory();
  }, []);

  const listHistory = () => {
    axios
      .get("http://192.168.0.114:8080/api/order", {
        responseType: "json",
      })
      .then(function (response) {
        setData(response.data);
        console.log(data);
      });
  };

  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        padding: 20,
      }}
    >
      <View
        style={{ paddingTop: 60, flexDirection: "row", alignItems: "center" }}
      >
        <Pressable>
          <Icon
            name="keyboard-backspace"
            style={styles.button_icon}
            onPress={() => {
              props.navigation.goBack();
            }}
          />
        </Pressable>
        <Text
          style={{ fontSize: 45, fontWeight: "bold", color: "#523F90" }}
          onPress={() => {
            props.navigation.goBack();
          }}
        >
          História
        </Text>
      </View>
      <View style={{ padding: 10 }}></View>
      <ScrollView style={{ padding: 10 }}>
        {data &&
          data !== undefined &&
          Object.values(data).map((order, i) => {
            return (
              <View
                key={i}
                style={{ padding: 10, borderBottomWidth: 1, alignItems: "" }}
              >
                <Text style={{ fontSize: 25, fontWeight: "bold" }}>
                  {order.date}
                </Text>
                {order.meals.map((meal, key) => (
                  <View key={key} style={{ paddingBottom: 10 }}>
                    <Text style={{ fontSize: 25 }}>
                      {meal.cartQuantity}x {meal.name}
                    </Text>
                  </View>
                ))}
                <Text style={{ fontSize: 20, fontWeight: "bold" }}>
                  Cena: {order.totalPrice}€
                </Text>
              </View>
            );
          })}
      </ScrollView>
    </View>
  );
};

export default HistoryScreen;

const styles = StyleSheet.create({
  button_icon: {
    padding: 4,
    color: "#523F90",
    fontSize: 60,
    paddingTop: 10,
    paddingRight: 15,
  },
});
