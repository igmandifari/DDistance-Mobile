import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image } from "react-native";

const LandingPage = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>D-DISTANCE</Text>
      <Image
        source={require('../../assets/img/LogoDD2.png')}
        style={styles.logo}
      />
      <TouchableOpacity style={styles.masuk} onPress={() => navigation.navigate("login")}>
        <Text style={styles.buttonText}>Masuk</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.daftar}  onPress={() => navigation.navigate("register")}>
        <Text style={styles.buttonText}>Daftar</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 16,
    backgroundColor: '#F36C21',
  },
  input: {
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    marginBottom: 16,
    padding: 8,
    width: "100%",
  },
  errorText: {
    color: "red",
    marginBottom: 16,
  },
  logo: {
    marginBottom: 16,
    marginRight: 30,
  },
  text: {
    color: "#FFF",
    textAlign: "center",
    textShadowColor: "rgba(0, 0, 0, 0.25)",
    textShadowOffset: { width: 0, height: 4 },
    textShadowRadius: 4,
    fontFamily: "Inter",
    fontSize: 40,
    fontStyle: "normal",
    fontWeight: "800",
    lineHeight: 48,
  },
  masuk: {
    borderRadius: 10,
    backgroundColor: '#F8DD91',
    padding: 10,
    marginBottom: 16,
    width: 300, 
  },
  daftar:{
    borderRadius: 10,
    backgroundColor: '#FFF7E1',
    padding: 10,
    marginBottom: 16,
    width: 300, 
  },
  buttonText: {
    color: "#9D7F2C",
    textAlign: "center",
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default LandingPage;
