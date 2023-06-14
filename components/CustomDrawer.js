import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  ImageBackground,
  Image,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import { DrawerItem } from "@react-navigation/drawer";
import { AuthContext } from "../components/context";
import Ionicons from "react-native-vector-icons/Ionicons";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";
import { Drawer } from "react-native-paper";
import AsyncStorage from "@react-native-async-storage/async-storage";

const CustomDrawer = (props) => {
  const { signOut, toggleTheme } = React.useContext(AuthContext);
  const [username, setUsername] = useState();

  useEffect(async () => {
    const user = await AsyncStorage.getItem("user");
    setUsername(user);
  }, []);

  return (
    <View style={{ flex: 1 }}>
      <View {...props} contentContainerStyle={{ backgroundColor: "#8200d6" }}>
        <ImageBackground
          source={require("../assets/menu-bg.jpeg")}
          style={{ padding: 20, paddingTop: 50 }}
        >
          <Image
            source={require("../assets/memoji.png")}
            style={{
              height: 80,
              width: 80,
              borderRadius: 40,
              borderWidth: 2,
              marginBottom: 10,
            }}
          />
          <Text
            style={{
              color: "#fff",
              fontSize: 18,
              marginBottom: 5,
            }}
          >
            {username}
          </Text>
          <View style={{ flexDirection: "row" }}>
            <Text
              style={{
                color: "#fff",
                marginRight: 5,
              }}
            >
              100
            </Text>
            <FontAwesome5 name="coins" size={14} color="#fff" />
          </View>
        </ImageBackground>
      </View>
      <View>
        <Drawer.Section style={styles.drawerSection}>
          <DrawerItem
            icon={({ color, size }) => (
              <Ionicons name="home-outline" color={color} size={size} />
            )}
            label="Domov"
            onPress={() => {
              props.navigation.navigate("Home");
            }}
          />
        </Drawer.Section>
        <Drawer.Section style={styles.drawerSection}>
          <DrawerItem
            icon={({ color, size }) => (
              <Ionicons name="hourglass-outline" color={color} size={size} />
            )}
            label="História"
            onPress={() => {
              props.navigation.navigate("History");
            }}
          />
        </Drawer.Section>
        <Drawer.Section style={styles.drawerSection}>
          <DrawerItem
            icon={({ color, size }) => (
              <Ionicons name="settings-outline" color={color} size={size} />
            )}
            label="Nastavenia"
            onPress={() => {
              props.navigation.navigate("Settings");
            }}
          />
        </Drawer.Section>
      </View>
      <View style={{ display: "flex", flex: 1, justifyContent: "flex-end" }}>
        <View
          style={{ padding: 20, borderTopWidth: 1, borderTopColor: "#ccc" }}
        >
          <TouchableOpacity
            onPress={() => signOut()}
            style={{ paddingVertical: 15 }}
          >
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <Ionicons name="exit-outline" size={22} />
              <Text
                style={{
                  fontSize: 15,
                  marginLeft: 5,
                }}
              >
                Sign Out
              </Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  drawerContent: {
    flex: 1,
  },
  userInfoSection: {
    paddingLeft: 20,
  },
  title: {
    fontSize: 16,
    marginTop: 3,
    fontWeight: "bold",
  },
  caption: {
    fontSize: 14,
    lineHeight: 14,
  },
  row: {
    marginTop: 20,
    flexDirection: "row",
    alignItems: "center",
  },
  section: {
    flexDirection: "row",
    alignItems: "center",
    marginRight: 15,
  },
  paragraph: {
    fontWeight: "bold",
    marginRight: 3,
  },
  drawerSection: {
    flexDirection: "column",
  },
  bottomDrawerSection: {
    marginBottom: 15,
    borderTopColor: "#f4f4f4",
    borderTopWidth: 1,
  },
  preference: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 12,
    paddingHorizontal: 16,
  },
});

export default CustomDrawer;
