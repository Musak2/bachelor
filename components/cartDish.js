import React from "react";
import { View, Text } from "react-native";

export default function CartDish({ item }) {
  if (item.cartQuantity === 0) return null;
  return (
    <View
      style={{
        display: "flex",
        padding: 3,
        marginBottom: 10,
        flex: 1,
        backgroundColor: "white",
        borderRadius: 20,
        marginTop: 10,
        flexDirection: "row",
        alignContent: "center",
        margin: 2,
        shadowColor: "#000",
        shadowOffset: {
          width: 0,
          height: 5,
        },
        shadowOpacity: 0.5,
        shadowRadius: 3.84,
      }}
    >
      <View
        style={{
          display: "flex",
          flex: 1,
          marginLeft: 12,
          marginRight: -50,
          margin: 10,
          padding: 5,
        }}
      >
        <Text style={{ fontSize: 20, fontWeight: "bold" }}>{item.name}</Text>
        <Text style={{ fontSize: 15, color: "grey" }}>
          Alergény: 1, 3, 7, 10
        </Text>
        <Text style={{ fontSize: 18, fontWeight: "bold" }}>{item.price}€</Text>
      </View>
      <View
        style={{
          display: "flex",
          flex: 0.5,
          alignItems: "center",
          justifyContent: "center",
          alignContent: "center",
          borderRadius: 20,
          backgroundColor: "white",
          padding: 10,
          width: 80,
          flexDirection: "row",
          borderWidth: 0,
        }}
      >
        <View style={{ marginHorizontal: 10 }}></View>
        <Text style={{ fontSize: 20, fontWeight: "bold", color: "black" }}>
          {item.cartQuantity}
        </Text>
      </View>
    </View>
  );
}
