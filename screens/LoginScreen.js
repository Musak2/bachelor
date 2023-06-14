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
import AsyncStorage from "@react-native-async-storage/async-storage";
import { AuthContext } from "../components/context";

// keyboard avoiding view
import KeyboardAvoidingWrapper from "../components/KeyboardAvoidingWrapper";

const LoginScreen = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const path = "http://192.168.0.114:8080/api/auth/signin";
  const data = {
    email: email,
    password: password,
  };
  const { signIn } = React.useContext(AuthContext);

  const handleLogin = async () => {
    if (email.length > 0 && password.length > 0) {
      axios
        .post(path, data)
        .then(async (res) => {
          console.log("LOGIN");
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
            await AsyncStorage.setItem("token", res.data.isic);
            await AsyncStorage.setItem("user", res.data.username);
            await AsyncStorage.setItem("email", res.data.email);
            await AsyncStorage.setItem("isic", res.data.isic);
            await AsyncStorage.setItem("id", res.data._id);
            console.log(res.data._id);
          } catch (e) {
            console.log(e);
          }
          signIn(res.data.username);
        })
        .catch(async (error) => {
          console.error(error);
          alert("Nesprávne údaje");
        });
    } else {
      alert("Vypíš všetky polia");
    }
  };

  const { height } = useWindowDimensions();
  return (
    <KeyboardAvoidingWrapper>
      <>
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
          }}
        >
          Prihláste sa do svojho účtu
        </Text>

        <View style={styles.input}>
          <CustomInput placeholder="Email" value={email} setValue={setEmail} />
          <CustomInput
            placeholder="Heslo"
            value={password}
            setValue={setPassword}
            secureTextEntry={true}
          />

          <View style={{ padding: 30 }}></View>

          <Animatable.View animation="fadeInUpBig" style={styles.footer}>
            <View style={styles.button}>
              <TouchableOpacity style={styles.signIn} onPress={handleLogin}>
                <LinearGradient colors={["#fff", "#fff"]} style={styles.signIn}>
                  <Text
                    style={[
                      styles.textSign,
                      {
                        color: "#523F90",
                      },
                    ]}
                  >
                    Prihlásenie
                  </Text>
                </LinearGradient>
              </TouchableOpacity>

              <TouchableOpacity onPress={() => navigation.navigate("Register")}>
                <Text style={{ margin: 30, textAlign: "center" }}>
                  Zaregistrujte sa tu!
                </Text>
              </TouchableOpacity>
            </View>
          </Animatable.View>
        </View>
      </>
    </KeyboardAvoidingWrapper>
  );
};

export default LoginScreen;

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
    height: 50,
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
