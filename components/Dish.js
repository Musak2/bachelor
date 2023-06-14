import React, { useEffect, useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import { addDishToCart, removeDishFromCart } from "../reducers/cartSlice.js";
import { useAppDsipatch, useAppSelector } from "../reducers/hooks.js";
import { selectCart } from "../reducers/cartSlice";

export default function Dish({ name, price }) {
  const dispatch = useAppDsipatch();
  const dishes = useAppSelector(selectCart);
  const [selectedDish, setSelectedDish] = useState({
    name: name,
    price: price,
    count: 0,
  });
  //Vymaz quantity z kosika
  useEffect(() => {
    if (dishes.length == 0) {
      setSelectedDish({
        ...selectedDish,
        count: 0,
      });
    }
  }, [dishes]);

  const addDishToState = () => {
    const currentDish = {
      name: name,
      price: price,
      count: selectedDish.count + 1,
    };

    dispatch(addDishToCart(currentDish));
  };

  const removeDishToState = (dish) => {
    dispatch(removeDishFromCart(dish));
  };
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
        <Text style={{ fontSize: 20, fontWeight: "bold" }}>{name}</Text>
        <Text style={{ fontSize: 15, color: "grey" }}>
          Alergény: 1, 3, 7, 10
        </Text>
        <Text style={{ fontSize: 18, fontWeight: "bold" }}>{price}€</Text>
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
        <View
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "flex-end",
          }}
        >
          {selectedDish.count > 0 && (
            <TouchableOpacity
              onPress={() => {
                selectedDish.count != 0 &&
                  setSelectedDish({
                    ...selectedDish,
                    count: selectedDish.count - 1,
                  });
                removeDishToState(selectedDish);
              }}
              disabled={selectedDish.count === 0}
              key={price}
            >
              <Icon
                name="ios-remove-circle-outline"
                style={styles.button_icon}
                color="#26a69a"
              />
            </TouchableOpacity>
          )}

          <TouchableOpacity
            onPress={() => {
              setSelectedDish({
                ...selectedDish,
                count: selectedDish.count + 1,
              });
              addDishToState();
            }}
            key={name}
          >
            <Icon
              name="ios-add-circle-outline"
              style={styles.button_icon}
              color="#26a69a"
            />
          </TouchableOpacity>
        </View>
        <View style={{ marginHorizontal: 10 }}></View>
        <Text style={{ fontSize: 20, fontWeight: "bold", color: "black" }}>
          {selectedDish.count}
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  button_icon: {
    padding: 3,
    color: "#523F90",
    fontSize: 30,
  },
});
