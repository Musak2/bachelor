import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  useWindowDimensions,
} from "react-native";
import * as Animatable from "react-native-animatable";
import { LinearGradient } from "expo-linear-gradient";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { useAppDsipatch } from "../reducers/hooks";
import { removeAllFromCart } from "../reducers/cartSlice";
import { useAppSelector } from "../reducers/hooks";
import { selectCart } from "../reducers/cartSlice";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import moment from "moment";

const FinalScreen = (props) => {
  const { height } = useWindowDimensions();
  const { navigation } = props;
  const dispatch = useAppDsipatch();
  const cart = useAppSelector(selectCart);
  const [id, setId] = useState();
  const [currentCart, setCurrentCart] = useState(cart);
  const [price, setPrice] = useState(0);
  const [randomNumber, setRandomNumber] = useState();
  const pathToOrders = "http://192.168.0.114:8080/api/order";
  const date = moment(new Date()).format("DD-MM-YYYY");
  const mealData = {
    meals: Object.values(cart).map((order) => order),
    totalPrice: price,
    user: id,
    date: date,
  };

  const randomNumberGenerator = () => {
    setRandomNumber(Math.floor(Math.random() * (40 + 1)));
  };

  useEffect(() => {
    setCurrentCart(cart);

    let cost = 0;
    cart.forEach((item) => {
      cost += item.price * item.cartQuantity;
    });
    setPrice(cost);
  }, [cart]);

  useEffect(async () => {
    const id = await AsyncStorage.getItem("id");
    setId(id);
    randomNumberGenerator();
  }, []);

  const orderToSend = () => {
    axios.post(pathToOrders, mealData).catch(async (error) => {
      console.error(error);
    });
  };

  // const updateWallet = () => {
  //   axios.put(`http://192.168.0.114:8080/api/user${id}`, { hello: 'world' });

  //   const User = Parse.User.current();

  // 		let kredit = parseInt(user.credit) - parseInt(toPay);

  // 		User.set('credit', kredit);

  // 		User.save().then((response) => {
  // 			console.log('Updated user', response);
  // 		}).catch((error) => {
  // 			console.error('Error while updating user', error);
  // 		});
  // }

  const goHome = () => {
    dispatch(removeAllFromCart(0));
    console.log(moment(new Date()).format("YYYY-MM-DD"));
    orderToSend();
    updateWallet();
    navigation.navigate("Home");
  };

  return (
    <>
      <View style={styles.root}>
        <Icon
          name="checkbox-marked-circle-outline"
          style={(styles.logo, { height: height * 0.21, fontSize: 150 })}
          color="#523F90"
        />

        <Text style={[styles.textSign]}>Platba úspešná</Text>
      </View>

      <View style={styles.input}>
        <View
          style={{
            height: height * 0.1,
            alignContent: "center",
            alignItems: "center",
            padding: 10,
          }}
        >
          <Text
            style={{
              color: "grey",
              fontSize: 20,
              textAlign: "center",
            }}
          >
            <Text>Vaše jedlo bude pripravené o </Text>
            <Text style={{ fontWeight: "bold" }}>
              {props.route.params.paramKey}
            </Text>
            <Text> v boxe číslo</Text>
          </Text>
        </View>

        <Text
          style={{ fontSize: 130, fontWeight: "bold", height: height * 0.25 }}
        >
          {randomNumber}
        </Text>

        <Animatable.View animation="fadeInUpBig" style={styles.footer}>
          <View style={styles.button}>
            <TouchableOpacity style={styles.signIn} onPress={goHome}>
              <LinearGradient colors={["#fff", "#fff"]} style={styles.signIn}>
                <Text
                  style={[
                    styles.textSign,
                    {
                      color: "#523F90",
                    },
                  ]}
                >
                  Domov
                </Text>
              </LinearGradient>
            </TouchableOpacity>
          </View>
        </Animatable.View>
      </View>
    </>
  );
};

export default FinalScreen;

const styles = StyleSheet.create({
  root: {
    alignItems: "center",
    padding: 80,
  },
  logo: {
    width: "70%",
    maxWidth: 300,
    maxHeight: 200,
  },
  input: {
    alignItems: "center",
  },
  signIn: {
    width: "100%",
    height: 50,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
  },
  button: {
    alignItems: "center",
    padding: 100,
    marginTop: -30,
  },
  textSign: {
    fontSize: 20,
    fontWeight: "bold",
    color: "black",
  },
  footer: {
    width: "130%",
    backgroundColor: "#6667AB",
    borderTopLeftRadius: 110,
    borderTopRightRadius: 110,
    paddingBottom: 100,
  },
});
