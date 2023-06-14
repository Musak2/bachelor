import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Image,
  useWindowDimensions,
} from "react-native";
import * as Animatable from "react-native-animatable";
import { LinearGradient } from "expo-linear-gradient";
import Logo from "../assets/logo.png";

const WelcomeScreen = ({ navigation }) => {
  const { height } = useWindowDimensions();
  return (
    <>
      <View style={styles.root}>
        <Image
          source={Logo}
          style={(styles.logo, { height: height * 0.2 })}
          resizeMode="contain"
        />

        <Text style={[styles.textSign]}>Bakalárska práca</Text>
      </View>

      <View style={styles.input}>
        <View style={{ padding: 60, width: "110%" }}>
          <TouchableOpacity onPress={() => navigation.navigate("Login")}>
            <LinearGradient
              colors={["#523F90", "#523F90"]}
              style={styles.signInButton}
            >
              <Text
                style={[
                  styles.textSign,
                  {
                    color: "white",
                  },
                ]}
              >
                Prihlásenie
              </Text>
            </LinearGradient>
          </TouchableOpacity>
        </View>

        <Animatable.View animation="fadeInUpBig" style={styles.footer}>
          <View style={styles.button}>
            <TouchableOpacity
              style={styles.signIn}
              onPress={() => navigation.navigate("Register")}
            >
              <LinearGradient colors={["#fff", "#fff"]} style={styles.signIn}>
                <Text
                  style={[
                    styles.textSign,
                    {
                      color: "#523F90",
                    },
                  ]}
                >
                  Registrácia
                </Text>
              </LinearGradient>
            </TouchableOpacity>
            <Text style={{ margin: 80, textAlign: "center" }}>©2022</Text>
          </View>
        </Animatable.View>
      </View>
    </>
  );
};

export default WelcomeScreen;

const styles = StyleSheet.create({
  root: {
    alignItems: "center",
    padding: 100,
  },
  logo: {
    width: "70%",
    maxWidth: 300,
    maxHeight: 200,
  },
  input: {
    alignItems: "center",
    padding: 10,
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
    fontSize: 18,
    fontWeight: "bold",
  },
  footer: {
    width: "130%",
    backgroundColor: "#6667AB",
    borderTopLeftRadius: 60,
    borderTopRightRadius: 60,
  },
  signInButton: {
    borderRadius: 10,
    width: "100%",
    height: 50,
    justifyContent: "center",
    alignItems: "center",
  },
});
