import React, { useState } from "react";
import { View, Text, TextInput, Button, StyleSheet } from "react-native";

const LandingPage = ({ navigation }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");


  return (
    <View style={styles.container}>
      <Button title="Masuk" onPress={() => navigation.navigate("login")} />
      <Button title="Daftar" onPress={() => navigation.navigate("register")} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 16,
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
});

export default LandingPage;
