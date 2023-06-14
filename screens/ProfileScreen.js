import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  SafeAreaView,
  ImageBackground,
  StyleSheet,
} from "react-native";
import { Title, Caption } from "react-native-paper";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";

const ProfileScreen = () => {
  const [username, setUsername] = useState();
  const [email, setEmail] = useState();
  const [isic, setIsic] = useState();
  const [totalOrders, setTotalOrders] = useState();
  const [money, setMoney] = useState();
  const [id, setId] = useState();
  const path = "http://192.168.0.114:8080/api/order";

  useEffect(async () => {
    const user = await AsyncStorage.getItem("user");
    const mail = await AsyncStorage.getItem("email");
    const isic = await AsyncStorage.getItem("isic");
    const id = await AsyncStorage.getItem("id");
    setUsername(user);
    setEmail(mail);
    setIsic(isic);
    setId(id);
    getCountOrders();
    getMoney();
  }, []);

  const getCountOrders = () => {
    axios
      .get(path)
      .then((res) => {
        setTotalOrders(res.data.length);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const getMoney = () => {
    axios
      .get(`http://192.168.0.114:8080/api/user/${id}`)
      .then((res) => {
        console.log(res.data);
        console.log("ID uzivatela " + id);
        setMoney(res.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <SafeAreaView style={styles.container}>
      <View
        style={{
          alignItems: "center",
          padding: 10,
          backgroundColor: "#523F90",
        }}
      >
        <View style={{ padding: 20 }}>
          <ImageBackground
            source={require("../assets/memoji.png")}
            style={{ width: 150, height: 150 }}
            imageStyle={{
              borderRadius: 60,
              borderWidth: 2,
              borderColor: "black",
            }}
          />
        </View>

        <View style={{ alignItems: "center", padding: 20 }}>
          <Text style={{ fontSize: 30, color: "white" }}>{username}</Text>
          <View style={{ padding: 5 }}></View>
          {/* <Text style={{ fontSize: 20, color: "#6667AB" }}>jm611sr</Text> */}
        </View>
      </View>

      <View style={styles.infoBoxWrapper}>
        <View
          style={[
            styles.infoBox,
            { borderRightColor: "black", borderRightWidth: 1 },
          ]}
        >
          <Title style={{ color: "black", fontWeight: "bold" }}>
            {money && money.money}€
          </Title>
          <Caption style={{ color: "black" }}>Účet</Caption>
        </View>
        <View style={styles.infoBox}>
          <Title style={{ color: "black", fontWeight: "bold" }}>
            {totalOrders}
          </Title>
          <Caption style={{ color: "black" }}>Objednávky</Caption>
        </View>
      </View>

      <View style={styles.userInfoSection}>
        <View style={styles.row}>
          <Icon name="map-marker-radius" color="#6667AB" size={40} />
          <Text style={{ color: "black", marginLeft: 20, marginTop: 12 }}>
            Technická Univerzita v Košiciach
          </Text>
        </View>
        <View style={styles.row}>
          <Icon name="identifier" color="#6667AB" size={40} />
          <Text style={{ color: "black", marginLeft: 20, marginTop: 12 }}>
            {isic}
          </Text>
        </View>
        <View style={styles.row}>
          <Icon name="email" color="#6667AB" size={40} />
          <Text style={{ color: "black", marginLeft: 20, marginTop: 12 }}>
            {email}
          </Text>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default ProfileScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  infoBoxWrapper: {
    borderBottomColor: "black",
    borderBottomWidth: 1,
    borderTopColor: "black",
    borderTopWidth: 1,
    flexDirection: "row",
    height: 100,
  },
  infoBox: {
    width: "50%",
    alignItems: "center",
    justifyContent: "center",
  },
  userInfoSection: {
    paddingHorizontal: 30,
    marginBottom: 25,
    marginTop: 40,
  },
  row: {
    flexDirection: "row",
    marginBottom: 45,
  },
});
