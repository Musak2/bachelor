import React from "react";
import { View, Text, Pressable } from "react-native";

const SettingsScreen = (props, { navigation }) => {
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Pressable>
        <Text
          onPress={() => {
            props.navigation.goBack();
          }}
        >
          Settings Screen
        </Text>
      </Pressable>
    </View>
  );
};

export default SettingsScreen;
