import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  useWindowDimensions,
} from "react-native";
import { useAppSelector } from "../reducers/hooks";
import { selectCart } from "../reducers/cartSlice";
import CartDish from "../components/CartDish";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";

// import { ScrollView } from 'react-native-gesture-handler';

const CartScreen = (props) => {
  const { height } = useWindowDimensions();
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

  const navigateToTime = () => {
    if (cart.length !== 0) {
      props.navigation.navigate("Time");
      console.log(cart);
    } else alert("Košík je prázdny");
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#fff" }}>
      <View style={{ flexDirection: "row", paddingLeft: 30, paddingTop: 30 }}>
        <Icon name="cart" color="#523F90" size={35} />
        <Text style={{ fontSize: 30, fontWeight: "bold", color: "#523F90" }}>
          Košík
        </Text>
      </View>
      <ScrollView style={{ padding: 20 }}>
        {cart == "" && (
          <View style={{ alignItems: "center", paddingTop: 20 }}>
            <Icon
              name="cart-off"
              style={(styles.logo, { height: height * 0.2, fontSize: 130 })}
              color="black"
            />
            <Text style={{ fontWeight: "bold", fontSize: 25 }}>
              Košík je prázdny
            </Text>
          </View>
        )}
        {cart &&
          currentCart.map((item, index) => (
            <CartDish key={index} item={item} />
          ))}
      </ScrollView>
      <View
        style={{
          justifyContent: "space-between",
          flexDirection: "row",
          padding: 20,
          borderTopWidth: 1,
          borderColor: "grey",
        }}
      >
        <Text style={{ fontWeight: "bold", fontSize: 20 }}>Celková suma</Text>
        <Text style={{ fontWeight: "bold", fontSize: 20 }}>{price}€</Text>
      </View>
      <View style={{ backgroundColor: "white", padding: 10 }}>
        <TouchableOpacity onPress={navigateToTime}>
          <View
            style={{
              backgroundColor: "#523F90",
              alignItems: "center",
              justifyContent: "center",
              padding: 15,
              borderRadius: 20,
            }}
          >
            <Text style={{ color: "white", fontSize: 16, fontWeight: "bold" }}>
              Výber času
            </Text>
          </View>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default CartScreen;

const styles = StyleSheet.create({
  logo: {
    width: "70%",
    maxWidth: 300,
    maxHeight: 200,
  },
});
