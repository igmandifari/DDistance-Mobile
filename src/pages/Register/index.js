import React, { useState } from "react";
import { Image, View, Text, TextInput, StyleSheet, Alert } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import CustomButton from "../../components/CustomButton";
import { colors } from "../../constant/colors";
import { useFormik } from "formik";

function Register({ navigation }) {
  const formik = useFormik({
    initialValues: {
      name: "",
      address: "",
      phone: "",
      email: "",
      accountNumber: "",
      password: "",
      confirmPassword: "",
    },
    onSubmit: (values) => {
      console.log(values);
    },
  });

  // const handeSubmit = () => {
  //   const {
  //     name,
  //     address,
  //     phone,
  //     email,
  //     accountNumber,
  //     password,
  //     confirmPassword,
  //   } = form;
  //   if (
  //     !name ||
  //     !address ||
  //     !phone ||
  //     !email ||
  //     !accountNumber ||
  //     !password ||
  //     !confirmPassword
  //   ) {
  //     Alert.alert("form is required");
  //     return;
  //   }
  //   navigation.navigate("register-success");
  // };

  const {
    name,
    address,
    phone,
    email,
    accountNumber,
    password,
    confirmPassword,
  } = formik.values;

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
        // onChangeTextText={(text) => handleChange("name", text)}
        onChangeText={formik.handleChange("name")}
        value={name}
      />
      <TextInput
        style={styles.input}
        placeholder="Alamat Toko"
        onChangeText={formik.handleChange("address")}
        value={address}
      />
      <TextInput
        style={styles.input}
        keyboardType="number-pad"
        placeholder="No. HP"
        onChangeText={formik.handleChange("phone")}
        value={phone}
      />
      <TextInput
        style={styles.input}
        keyboardType="email-address"
        placeholder="Email"
        onChangeText={formik.handleChange("email")}
        value={email}
      />
      <TextInput
        style={styles.input}
        placeholder="No. Rekening Danamon"
        onChangeText={formik.handleChange("accountNumber")}
        value={accountNumber}
      />
      <TextInput
        style={styles.input}
        placeholder="Kata Sandi"
        secureTextEntry
        onChangeText={formik.handleChange("password")}
        value={password}
      />
      <TextInput
        style={styles.input}
        placeholder="Konfirmasi Kata Sandi"
        secureTextEntry
        onChangeText={formik.handleChange("confirmPassword")}
        value={confirmPassword}
      />
      {/* <Button title="Register" onPress={handleFormSubmit} /> */}
      <CustomButton text="Register" handleClick={() => formik.handleSubmit()} />
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
