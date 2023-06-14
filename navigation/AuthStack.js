import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import CartScreen from "../screens/CartScreen";
import TimeScreen from "../screens/TimeScreen";
import TabNavigator from "./TabNavigator";
import SettingsScreen from "../screens/SettingsScreen";
import FinalScreen from "../screens/FinalScreen";
import HistoryScreen from "../screens/HistoryScreen";

const Stack = createStackNavigator();

const AuthStack = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Home" component={TabNavigator} />
      <Stack.Screen name="Time" component={TimeScreen} />
      <Stack.Screen name="Cart" component={CartScreen} />
      <Stack.Screen name="Settings" component={SettingsScreen} />
      <Stack.Screen name="Final" component={FinalScreen} />
      <Stack.Screen name="History" component={HistoryScreen} />
    </Stack.Navigator>
  );
};

export default AuthStack;
