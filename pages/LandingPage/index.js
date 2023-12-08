import React, { useState } from "react";
import { View, Text, TextInput, Button, StyleSheet } from "react-native";

const LandingPage = ({ navigation }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = ({ navigation }) => {
    if (username === "user" && password === "password") {
      setError("");

      alert("Login berhasil!");
    } else {
      setError("Username atau password salah");
    }
  };
  const handleRegister = () => {
    if (username === "user" && password === "password") {
      setError("");

      alert("Login berhasil!");
    } else {
      setError("Username atau password salah");
    }
  };

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
  title: {
    fontSize: 24,
    marginBottom: 16,
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
