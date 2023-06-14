import React from "react";
import { View } from "react-native";
import CustomDrawer from "../components/CustomDrawer";

const AuthStack = (props) => {
  return (
    <View style={{ flex: 1, backgroundColor: "white" }}>
      <CustomDrawer {...props} />
    </View>
  );
};

export default AuthStack;
