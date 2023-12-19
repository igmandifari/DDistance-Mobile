import React, { useState } from "react";
import {
  Image,
  View,
  Text,
  TextInput,
  StyleSheet,
  Alert,
  Button,
} from "react-native";
import axios from "axios";
import CustomButton from "../../components/CustomButton";
import { colors } from "../../constant/colors";
import { useFormik } from "formik";
import * as Yup from "yup";
import ErrorText from "../../components/ErrorText";
import { register } from "../../services/AuthService";

function Register({ navigation }) {
  const SignupSchema = Yup.object().shape({
    name: Yup.string()
      .min(3, "Too Short!")
      .max(20, "Too Long!")
      .required("Required"),
    addres: Yup.string()
      .min(3, "Too Short!")
      .max(20, "Too Long!")
      .required("Required"),
    phoneNumber: Yup.string()
      .min(10, "Too Short!")
      .max(15, "Too Long!")
      .required("Required"),
    email: Yup.string().email("Invalid email").required("Required"),
    accountNumber: Yup.string().required("Account number is required"),
    password: Yup.string()
      .min(5, "Too Short")
      .max(20, "Too Long")
      .required("Password is required"),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref("password"), null], "Passwords must match")
      .required("Confirm Password is required"),
  });

  const { values, isValid, errors, handleChange, handleSubmit } = useFormik({
    initialValues: {
      name: "",
      addres: "",
      phoneNumber: "",
      email: "",
      accountNumber: "",
      password: "",
      confirmPassword: "",
    },
    onSubmit: async (values) => {
      if (isValid) {
        const payload = {
          email,
          password,
          addres,
          phoneNumber,
          pan: accountNumber,
          name,
        };

        try {
          const data = await register(payload);
          console.log(data.data);
          if (data.statusCode == 201);
          alert("Success Register");
          navigation.navigate("register-success");
        } catch (error) {
          alert(error);
        }
      } else {
        alert("Register Failed");
      }
      // try {
      //   const data = await axios.post(
      //     "http://10.0.2.2:8080/api/auth/register/merchant",
      //     payload
      //   );
      //   console.log(data);
      //   console.log("succes");
      // } catch (error) {
      //   console.log("error");
      //   console.log(error);
      // }
    },
    validationSchema: SignupSchema,
  });

  const {
    name,
    addres,
    phoneNumber,
    email,
    accountNumber,
    password,
    confirmPassword,
  } = values;

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
        onChangeText={handleChange("name")}
        value={name}
      />
      <ErrorText text={errors.name} />
      <TextInput
        style={styles.input}
        placeholder="Alamat Toko"
        onChangeText={handleChange("addres")}
        value={addres}
      />
      <ErrorText text={errors.addres} />
      <TextInput
        style={styles.input}
        keyboardType="number-pad"
        placeholder="No. HP"
        onChangeText={handleChange("phoneNumber")}
        value={phoneNumber}
      />
      <ErrorText text={errors.phoneNumber} />
      <TextInput
        style={styles.input}
        keyboardType="email-addres"
        placeholder="Email"
        onChangeText={handleChange("email")}
        value={email}
      />
      <ErrorText text={errors.email} />
      <TextInput
        style={styles.input}
        placeholder="No. Rekening Danamon"
        onChangeText={handleChange("accountNumber")}
        value={accountNumber}
      />
      <ErrorText text={errors.accountNumber} />
      <TextInput
        style={styles.input}
        placeholder="Kata Sandi"
        secureTextEntry
        onChangeText={handleChange("password")}
        value={password}
      />
      <ErrorText text={errors.password} />
      <TextInput
        style={styles.input}
        placeholder="Konfirmasi Kata Sandi"
        secureTextEntry
        onChangeText={handleChange("confirmPassword")}
        value={confirmPassword}
      />
      <ErrorText text={errors.confirmPassword} />
      {/* <Button title="Register" onPress={han} /> */}
      <CustomButton
        text={"Register"}
        disabled={!isValid}
        handleClick={handleSubmit}
      />
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
    gap: 5,
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
