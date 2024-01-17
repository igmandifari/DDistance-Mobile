import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Image,
} from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import { colors } from "../../constant/colors";
import CustomButton from "../../components/CustomButton";
import { login } from "../../services/AuthService";
import { useDispatch, useSelector } from "react-redux";
import { setIsAuthentication } from "../../store/userSlice";
import { useFocusEffect } from "@react-navigation/native";
import { useCallback } from "react";

function Login({ navigation }) {
  const { isAuthenticated = false, role } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const [form, setForm] = useState({
    email: "",
    password: "",
    showPassword: false,
  });

  const handleChange = (key, value) => {
    setForm((prevState) => ({
      ...prevState,
      [key]: value,
    }));
  };

  const handleTogglePassword = () => {
    setForm((prevState) => ({
      ...prevState,
      showPassword: !prevState.showPassword,
    }));
  };

  const handleForgotPassword = () => {
    navigation.navigate("forget-password");
  };

  const handleRegister = () => {
    navigation.navigate("register");
  };


  const handleLogin = async () => {
    const { email, password } = form;
    const payload = {
      email,
      password,
    };
    try {
      const { data } = await login(payload);
      const token = data.data.token;
      const role = data.data.role;

      if (token) {
        if (role === "ROLE_MERCHANT") {
          dispatch(setIsAuthentication({ token: token, role: role }));
          navigation.navigate("dashboard-merchant");
        } else if (role === "ROLE_DISTRIBUTOR") {
          dispatch(
            setIsAuthentication({
              token: token,
            })
          );
          navigation.navigate("dashboard-distributor");
        } else {
          alert("Unknown role");
        }
      } else {
        alert("Bad credential");
      }
    } catch (e) {
      alert(e);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.text}>D-DISTANCE</Text>
      <Image
        source={require("../../assets/img/truck.png")}
        style={styles.logo}
      />
      <TextInput
        style={styles.input}
        placeholder="Email"
        onChangeText={(text) => handleChange("email", text)}
        value={form.email}
      />
      <View style={styles.passwordInputContainer}>
        <TextInput
          style={styles.passwordInput}
          placeholder="Password"
          secureTextEntry={!form.showPassword}
          onChangeText={(text) => handleChange("password", text)}
          value={form.password}
        />
        <TouchableOpacity onPress={handleTogglePassword} style={styles.eyeIcon}>
          <Icon
            name={form.showPassword ? "eye-slash" : "eye"}
            size={20}
            color="#F36C21"
          />
        </TouchableOpacity>
      </View>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          width: "100%",
        }}
      >
        <View style={{ flexDirection: "cols" }}>
          <TouchableOpacity
            style={styles.forgetPassword}
            onPress={handleRegister}
          >
            <Text style={styles.textLink}>Register</Text>
          </TouchableOpacity>
        </View>
        <View style={{ flexDirection: "cols" }}>
          <TouchableOpacity
            style={styles.forgetPassword}
            onPress={handleForgotPassword}
          >
            <Text style={styles.textLink}>Lupa Kata Sandi?</Text>
          </TouchableOpacity>
        </View>
      </View>

      <CustomButton text={"Masuk"} handleClick={handleLogin} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.FLORAL_WHITE,
    // backgroundColor:'blue',
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    gap: 16,
    paddingHorizontal: 25,
  },
  input: {
    height: 50,
    width: "100%",
    borderColor: "#F36C21",
    borderWidth: 1,
    backgroundColor: "white",
    borderRadius: 10,
    padding: 8,
    textAlign: "center",
  },
  passwordInputContainer: {
    flexDirection: "row",
    alignItems: "center",
    width: "80%",
    borderRadius: 10,
    borderColor: "#F36C21",
    borderWidth: 1,
    backgroundColor: "white",
    width: "100%",
  },
  passwordInput: {
    flex: 1,
    height: 50,
    width: "100%",
    padding: 8,
    textAlign: "center",
    marginLeft: 40,
  },
  eyeIcon: {
    padding: 10,
  },
  masuk: {
    borderRadius: 10,
    backgroundColor: "#F36C21",
    padding: 10,
    width: 330,
    height: 50,
    justifyContent: "center",
  },
  text: {
    color: "#F36C21",
    textAlign: "center",
    textShadowColor: "#00000040",
    textShadowColor: "rgba(0, 0, 0, 0.25)",
    textShadowOffset: { width: 0, height: 4 },
    textShadowRadius: 4,
    fontSize: 40,
    fontStyle: "normal",
    fontWeight: "800",
    lineHeight: 48,
    marginBottom: 30,
  },
  buttonText: {
    color: "white",
    textAlign: "center",
    fontSize: 16,
    fontWeight: "bold",
  },
  logo: {
    marginBottom: 16,
    marginRight: 30,
  },
  forgetPassword: {
    width: "100%",
  },
  textLink: {
    textAlign: "left",
    color: "blue",
    textDecorationLine: "underline",
  },
  textLink2: {
    textAlign: "left",
    color: "blue",
    textDecorationLine: "underline",
  },
});

export default Login;
