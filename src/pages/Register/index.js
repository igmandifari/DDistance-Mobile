import React, { useState } from "react";
import { Image, View, Text, TextInput, StyleSheet, Alert } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import CustomButton from "../../components/CustomButton";
import { colors } from "../../constant/colors";

function Register({ navigation }) {
  const [form, setForm] = useState({
    name: "",
    address: "",
    phone: "",
    email: "",
    accountNumber: "",
    password: "",
    confirmPassword: "",
  });

  const handleChange = (name, value) => {
    setForm((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handeSubmit = () => {
    const {
      name,
      address,
      phone,
      email,
      accountNumber,
      password,
      confirmPassword,
    } = form;
    if (
      !name ||
      !address ||
      !phone ||
      !email ||
      !accountNumber ||
      !password ||
      !confirmPassword
    ) {
      Alert.alert("form is required");
      return;
    }
    navigation.navigate("register-success");
  };

  return (
    <View style={styles.container}>
      <Text style={styles.text}>D-DISTANCE</Text>
      <Image
        style={styles.image}
        source={require("../../assets/img/truck.png")}
      />
      <TextInput
        style={styles.input}
        placeholder="Nama Lengkap Pemilik Toko"
        onChangeText={(text) => handleChange("name", text)}
        value={form.name}
      />
      <TextInput
        style={styles.input}
        placeholder="Alamat Toko"
        onChangeText={(text) => handleChange("address", text)}
        value={form.address}
      />
      <TextInput
        style={styles.input}
        keyboardType="number-pad"
        placeholder="No. HP"
        onChangeText={(text) => handleChange("phone", text)}
        value={form.phone}
      />
      <TextInput
        style={styles.input}
        keyboardType="email-address"
        placeholder="Email"
        onChangeText={(text) => handleChange("email", text)}
        value={form.email}
      />
      <TextInput
        style={styles.input}
        placeholder="No. Rekening Danamon"
        onChangeText={(text) => handleChange("accountNumber", text)}
        value={form.accountNumber}
      />
      <TextInput
        style={styles.input}
        placeholder="Kata Sandi"
        secureTextEntry
        onChangeText={(text) => handleChange("password", text)}
        value={form.password}
      />
      <TextInput
        style={styles.input}
        placeholder="Konfirmasi Kata Sandi"
        secureTextEntry
        onChangeText={(text) => handleChange("confirmPassword", text)}
        value={form.confirpassword}
      />
      {/* <Button title="Register" onPress={handleFormSubmit} /> */}
      <CustomButton text="Register" handleClick={() => handeSubmit()} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.FLORAL_WHITE,
    height: "100%",
    paddingHorizontal: 25,
    justifyContent: "center",
    alignItems: "center",
    gap: 16,
  },
  input: {
    height: 50,
    width: "100%",
    borderColor: "#F36C21",
    backgroundColor: "white",
    borderWidth: 1,
    borderRadius: 10,
    padding: 8,
    textAlign: "center",
    fontSize: 16,
    fontWeight: "700",
  },
  text: {
    color: "#F36C21",
    textAlign: "center",
    textShadowColor: "#00000040",
    textShadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    textShadowRadius: 4,
    fontSize: 40,
    fontStyle: "normal",
    fontWeight: "800",
  },
  image: {
    paddingVertical: 0,
    margin: 0,
    width: 170,
    resizeMode: "contain",
  },
});

export default Register;
