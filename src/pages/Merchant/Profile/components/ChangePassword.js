import React, { useState } from "react";
import {
  Image,
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Alert,
  Button,
} from "react-native";
import axios from "axios";
import CustomButton from "../../../../components/CustomButton";
import { colors } from "../../../../constant/colors";
import { useFormik } from "formik";
import * as Yup from "yup";
import ErrorText from "../../../../components/ErrorText";
import Icon from "react-native-vector-icons/FontAwesome";
// import { register } from "../../services/AuthService";

function ChangePassword({ navigation }) {
  const [form, setForm] = useState({
    oldPassword: "",
    password: "",
    showPassword: false,
  });

  const ChangePassowrdSchema = Yup.object().shape({
    oldPassword: Yup.string()
      .min(5, "Too Short")
      .max(20, "Too Long")
      .required("Old Password is required"),
    password: Yup.string()
      .min(5, "Too Short")
      .max(20, "Too Long")
      .required("Password is required"),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref("password"), null], "Passwords must match")
      .required("Confirm Password is required"),
  });

  const handleTogglePassword = () => {
    setForm((prevState) => ({
      ...prevState,
      showPassword: !prevState.showPassword,
    }));
  };

  const { values, isValid, errors, handleChange, handleSubmit } = useFormik({
    initialValues: {
      oldPassword: "",
      password: "",
      confirmPassword: "",
    },
    onSubmit: async (values) => {
      if (isValid) {
        const payload = {
          password,
          confirmPassword,
        };

        // try {
        //   const data = await register(payload);
        //   console.log(data.data);
        //   if (data.statusCode == 201);
        //   alert("Success Register");
        //   navigation.navigate("landing-page");
        // } catch (error) {
        //   alert(error);
        // }
      } else {
        alert("Change Password Failed");
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
    validationSchema: ChangePassowrdSchema,
  });

  const { oldPassword, password, confirmPassword } = values;

  return (
    <View style={styles.container}>
      <View style={styles.passwordInputContainer}>
            <TextInput
            style={styles.input}
            placeholder="Kata Sandi Lama"
            secureTextEntry
            onChangeText={handleChange("oldPassword")}
            value={oldPassword}
            />
            {/* <TouchableOpacity onPress={handleTogglePassword} style={styles.eyeIcon}> */}
            {/* <Icon
                name={form.showPassword ? "eye-slash" : "eye"}
                size={20}
                color="#F36C21"
            /> */}
            {/* </TouchableOpacity> */}
            <ErrorText text={errors.password} />

        </View>    
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
        text={"Ubah Kata Sandi"}
        disabled={!isValid}
        handleClick={handleSubmit}
      />
      <TouchableOpacity onPress={()=>navigation.navigate("change-password-success")}>
        <Text>success</Text>
      </TouchableOpacity>
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
  passwordInputContainer: {
    alignItems: "center",
    
    width: "80%",
    borderRadius: 10,
    width: "100%",
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

export default ChangePassword;
