import React, { useState } from "react";
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
import CustomInput from "../components/CustomInput";
import axios from "axios";
import { AuthContext } from "../components/context";
import AsyncStorage from "@react-native-async-storage/async-storage";

// keyboard avoiding view
import KeyboardAvoidingWrapper from "../components/KeyboardAvoidingWrapper";

const RegisterScreen = ({ navigation }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isic, setIsic] = useState("");
  const [email, setEmail] = useState("");
  const path = "http://192.168.0.114:8080/api/auth/signup";
  const { signIn } = React.useContext(AuthContext);
  const data = {
    username: username,
    password: confirmPassword,
    email: email,
    isic: isic,
    money: "100",
  };

  const handleRegistration = async () => {
    if (
      username.length > 0 &&
      password.length > 0 &&
      confirmPassword.length > 0 &&
      email.length > 0 &&
      isic.length > 0
    ) {
      if (password == confirmPassword) {
        axios
          .post(path, data)
          .then(async (res) => {
            console.log("REGISTER");
            console.log(res.data);
            const asyncStorageKeys = await AsyncStorage.getAllKeys();

            if (asyncStorageKeys.length >= 0) {
              if (Platform.OS === "android") {
                await AsyncStorage.clear();
              }
              if (Platform.OS === "ios") {
                await AsyncStorage.multiRemove(asyncStorageKeys);
              }
            }
            try {
              await AsyncStorage.setItem("token", isic);
              await AsyncStorage.setItem("user", username);
              await AsyncStorage.setItem("id", res.data.id);
            } catch (e) {
              console.log(e);
            }
            signIn(username);
          })
          .catch(async (error) => {
            console.error(error);
          });
      } else {
        alert("Heslá sa nezhodujú");
      }
    } else {
      alert("Vypíš všetky polia");
    }
  };

  const { height } = useWindowDimensions();
  return (
    <KeyboardAvoidingWrapper>
      <>
        {/* <View style={{flex:1,justifyContent:'center',alignItems:'center'}}>
      <TouchableOpacity onPress={() => navigation.navigate("Home")}>
        <Text>Login Screen</Text>
      </TouchableOpacity>
    </View> */}

        <View style={styles.root}>
          <Image
            source={Logo}
            style={(styles.logo, { height: height * 0.2 })}
            resizeMode="contain"
          />

          <Text style={[styles.textSign]}>Bakalárska práca</Text>
        </View>

        <Text
          style={{
            paddingLeft: 40,
            color: "#523F90",
            fontWeight: "bold",
            fontSize: 20,
            marginTop: -60,
          }}
        >
          Zaregistrujte sa
        </Text>
        <View style={styles.input}>
          <CustomInput
            placeholder="Meno"
            value={username}
            setValue={setUsername}
          />
          <CustomInput placeholder="Email" value={email} setValue={setEmail} />
          <CustomInput
            placeholder="Heslo"
            value={password}
            setValue={setPassword}
            secureTextEntry={true}
          />
          <CustomInput
            placeholder="Potvrď heslo"
            value={confirmPassword}
            setValue={setConfirmPassword}
            secureTextEntry={true}
          />
          <CustomInput placeholder="ISIC" value={isic} setValue={setIsic} />

          <View style={{ padding: 15 }}></View>

          <Animatable.View animation="fadeInUpBig" style={styles.footer}>
            <View style={styles.button}>
              <TouchableOpacity
                style={styles.signIn}
                onPress={handleRegistration}
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

              <TouchableOpacity onPress={() => navigation.navigate("Login")}>
                <Text style={{ margin: 30, textAlign: "center" }}>
                  Prihláste sa tu!
                </Text>
              </TouchableOpacity>
            </View>
          </Animatable.View>
        </View>
      </>
    </KeyboardAvoidingWrapper>
  );
};

export default RegisterScreen;

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
    padding: 30,
  },
  signIn: {
    width: "100%",
    height: 40,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
  },
  button: {
    alignItems: "center",
    marginTop: -60,
    padding: 100,
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
});
