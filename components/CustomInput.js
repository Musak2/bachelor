import React from "react";
import { View, TextInput, StyleSheet } from "react-native";

const CustomInput = ({ value, setValue, placeholder, secureTextEntry }) => {
  return (
    <View style={styles.container}>
      <TextInput
        value={value}
        onChangeText={setValue}
        placeholderTextColor={"#9A91B7"}
        placeholder={placeholder}
        style={styles.input}
        secureTextEntry={secureTextEntry}
      />
    </View>
  );
};

export default CustomInput;

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    width: "100%",

    borderColor: "#523F90",
    borderWidth: 2,
    shadowColor: "black",
    borderRadius: 10,
    padding: 13,
    paddingHorizontal: 10,
    marginVertical: 5,
  },
  input: {
    color: "#523F90",
  },
  placeholder: {
    color: "black",
  },
});
