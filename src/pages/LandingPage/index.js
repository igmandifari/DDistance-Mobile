import React, { useState } from "react";
import {
  Dimensions,
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Image,
  Button,
} from "react-native";

import Svg from "react-native-svg";
import Polygon from "../../assets/img/Polygon.svg";
import { useSelector } from "react-redux";

const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;

const LandingPage = ({ navigation }) => {
  const user = useSelector((state) => state.user);
  return (
    <View style={styles.container}>
      <View style={styles.polygon}>
        <Svg style={{ width: windowWidth }}>
          <Polygon />
        </Svg>
      </View>
      <View style={styles.logoBankContainer}>
        <Image
          source={require("../../assets/img/danamon.png")}
          style={styles.logoBank}
        />
      </View>
      <Text style={styles.text}>D-DISTANCE</Text>
      <Image
        source={require("../../assets/img/LogoDD2.png")}
        style={styles.logo}
      />
      <TouchableOpacity
        onPress={() => navigation.navigate("dashboard-distributor")}
      >
        <Text style={styles.buttonText}>Ke dashboard distributor</Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => navigation.navigate("dashboard-merchant")}
      >
        <Text style={styles.buttonText}>Ke dashboard merchant</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => console.log(user)}>
        <Text style={styles.buttonText}>cek user</Text>
      </TouchableOpacity>
      <View style={styles.bawah}>
        <TouchableOpacity
          style={styles.masuk}
          onPress={() => navigation.navigate("login")}
        >
          <Text style={styles.buttonText}>Masuk</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.daftar}
          onPress={() => navigation.navigate("register")}
        >
          <Text style={styles.buttonText}>Daftar</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 16,
    backgroundColor: "#F36C21",
  },
  logoBankContainer: {
    position: "absolute",
    top: 0,
    left: 5,
    padding: 5,
  },
  logoBank: {
    width: 105,
    height: 64,
    resizeMode: "stretch",
  },
  text: {
    color: "#FFF",
    textAlign: "center",
    textShadowColor: "rgba(0, 0, 0, 0.25)",
    textShadowOffset: { width: 0, height: 4 },
    textShadowRadius: 4,
    fontSize: 40,
    fontStyle: "normal",
    fontWeight: "800",
    lineHeight: 48,
    marginBottom: 30,
    marginTop: 130,
  },
  masuk: {
    borderRadius: 10,
    backgroundColor: "#F8DD91",
    padding: 10,
    marginBottom: 16,
    width: 360,
    height: 60,
    justifyContent: "center",
  },
  daftar: {
    borderRadius: 10,
    backgroundColor: "#FFF7E1",
    padding: 10,
    marginBottom: 16,
    width: 360,
    height: 60,
    justifyContent: "center",
    alignItems: "center",
  },
  buttonText: {
    color: "#9D7F2C",
    textAlign: "center",
    fontSize: 16,
    fontWeight: "bold",
  },
  polygon: {
    position: "absolute",
    top: -50,
    height: windowHeight,
    width: windowWidth,
  },
  logo: {
    marginRight: 30,
  },
  bawah: {
    marginTop: 200,
  },
  // svg {
  //   filter: drop-shadow(3px 5px 2px rgb(0 0 0 / 0.4));
  // }
});

export default LandingPage;
