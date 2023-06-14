import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Pressable,
  Dimensions,
  TouchableOpacity,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import * as Animatable from "react-native-animatable";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { useAppSelector } from "../reducers/hooks";
import { selectCart } from "../reducers/cartSlice";

const DATA = [
  { id: "1", text: "11:00", style: "default" },
  { id: "2", text: "11:15", style: "default" },
  { id: "3", text: "11:30", style: "default" },
  { id: "4", text: "11:45", style: "default" },
  { id: "5", text: "12:00", style: "default" },
  { id: "6", text: "12:15", style: "default" },
  { id: "7", text: "12:30", style: "default" },
  { id: "8", text: "12:45", style: "default" },
  { id: "9", text: "13:00", style: "default" },
  { id: "10", text: "13:15", style: "default" },
  { id: "11", text: "13:30", style: "default" },
  { id: "12", text: "13:45", style: "default" },
  { id: "13", text: "14:00", style: "default" },
  { id: "14", text: "14:15", style: "default" },
  { id: "15", text: "14:30", style: "default" },
];

const Item = ({ item, onPress, style }) => (
  <TouchableOpacity onPress={onPress}>
    <View style={[styles.box, style]}>
      <Text style={{ color: style.color }}>{item.text}</Text>
    </View>
  </TouchableOpacity>
);

const TimeScreen = (props) => {
  const [selectedId, setSelectedId] = useState(null);
  const [time, setTime] = useState();
  const cart = useAppSelector(selectCart);
  const [currentCart, setCurrentCart] = useState(cart);
  const [price, setPrice] = useState(0);

  useEffect(() => {
    setCurrentCart(cart);

    let cost = 0;
    cart.forEach((item) => {
      cost += item.price * item.cartQuantity;
    });
    setPrice(cost);
  }, [cart]);

  const timeFunction = (timeTemp, id) => {
    setSelectedId(id);
    setTime(timeTemp);
  };

  const renderItem = ({ item }) => {
    const backgroundColor = item.id === selectedId ? "#6667AB" : "white";
    const color = item.id === selectedId ? "white" : "black";

    return (
      <Item
        item={item}
        onPress={() => timeFunction(item.text, item.id)}
        style={{
          backgroundColor,
          color,
          width: 100,
          alignItems: "center",
          justifyContent: "center",
          borderColor: "#523F90",
          borderWidth: 2,
          borderRadius: 15,
          marginLeft: "1%",
          fontWeight: "bold",
          marginRight: "2%",
          marginTop: 20,
          width: Dimensions.get("window").width / 3.8,
          height: Dimensions.get("window").width / 7,
        }}
      />
    );
  };

  const check = () => {
    if (time == undefined) {
      alert("Nebol vybraný žiadny čas");
    } else {
      props.navigation.navigate("Final", {
        paramKey: time,
      });
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header2}>
        <Pressable>
          <Icon
            name="keyboard-backspace"
            style={styles.button_icon}
            onPress={() => {
              props.navigation.goBack();
            }}
          />
        </Pressable>
        <Text style={styles.text_header}>Výber času:</Text>
      </View>

      <View style={styles.boxes}>
        <FlatList
          contentContainerStyle={{ alignSelf: "flex-start", paddingTop: 10 }}
          numColumns={3}
          showsVerticalScrollIndicator={false}
          showsHorizontalScrollIndicator={false}
          keyExtractor={(item) => item.id}
          data={DATA}
          style={styles}
          extraData={selectedId}
          renderItem={renderItem}
        />
      </View>

      <View style={styles.button}>
        <LinearGradient colors={["#523F90", "#523F90"]} style={styles.signIn}>
          <Text
            style={[
              styles.textSign,
              {
                color: "white",
                fontSize: 25,
                fontWeight: "bold",
              },
            ]}
          >
            Suma: {price}€
          </Text>
        </LinearGradient>
      </View>

      <Animatable.View animation="fadeInUpBig" style={styles.footer}>
        <View style={styles.button}>
          <TouchableOpacity style={styles.signIn} onPress={check}>
            <LinearGradient colors={["#fff", "#fff"]} style={styles.signIn}>
              <Text
                style={[
                  styles.textSign,
                  {
                    color: "#523F90",
                  },
                ]}
              >
                Zaplatiť
              </Text>
            </LinearGradient>
          </TouchableOpacity>
        </View>
      </Animatable.View>
    </View>
  );
};

export default TimeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  header2: {
    paddingTop: 70,
    paddingHorizontal: 20,
    paddingBottom: 10,
    flexDirection: "row",
    alignItems: "center",
  },
  text_header: {
    color: "#523F90",
    fontWeight: "bold",
    fontSize: 30,
    paddingTop: 10,
  },
  list: {
    alignItems: "center",
    paddingVertical: 20,
  },

  headerUser: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginHorizontal: 20,
    marginTop: 20,
  },
  headerUser_right: {
    flexDirection: "row",
    alignItems: "center",
  },
  headerUser_image: {
    width: 40,
    height: 40,
    marginLeft: 20,
  },

  list_text: {
    fontSize: 30,
  },
  button: {
    alignItems: "center",
    marginTop: 30,
  },
  button_icon: {
    padding: 4,
    color: "#523F90",
    fontSize: 40,
    paddingTop: 10,
    paddingRight: 15,
  },
  signIn: {
    width: "100%",
    height: 50,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
  },
  textSign: {
    fontSize: 18,
    fontWeight: "bold",
  },
  footer: {
    flex: 1,
    backgroundColor: "#6667AB",
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    paddingHorizontal: 20,
  },

  button: {
    marginTop: 50,
    paddingVertical: 10,
    paddingHorizontal: 30,
  },
  signIn: {
    width: "100%",
    height: 50,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
  },
  footer: {
    paddingBottom: 50,
    backgroundColor: "#6667AB",
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
  },
  boxes: {
    flexDirection: "row",
    flexWrap: "wrap",
    flex: 2,
    marginLeft: "4%",
    marginRight: "2%",
    marginTop: 5,
    padding: 10,
    marginBottom: 50,
  },
  box: {
    alignItems: "center",
    justifyContent: "center",
    marginLeft: "2%",
    marginRight: "2%",
    marginTop: 20,
  },
});
