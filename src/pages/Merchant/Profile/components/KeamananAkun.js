import React, { useState } from "react";
import { colors } from "../../../../constant/colors";
import {
  Dimensions,
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Image,
  Button,
  TextInput,
} from "react-native";
import CustomButton from "../../../../components/CustomButton";

// const vw = Dimensions.get("window").width;

function KeamananAkun({navigation}) {
  const [form, setForm] = useState({
    name: "",
    address: "",
    phone: "",
    email: "",
    norek: "",
  });

  const handleChange = (key, value) => {
    setForm((prevState) => ({
      ...prevState,
      [key]: value,
    }));
  };

  return (
    <View style={styles.container}>
      <View style={styles.textContainer}>
        <Text style={{ fontSize: 20 }}>Pengaturan Keamanan</Text>
        <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate("change-password")}
        >
          <Text
            style={{ color:'black', fontWeight: "600", fontSize: 16 }}
          >
            Ubah Kata Sandi
          </Text>
        </TouchableOpacity>
        </View>
        <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate("")}
        >
          <Text
            style={{ color:'black', fontWeight: "600", fontSize: 16 }}
          >
            Ubah PIN Transaksi
          </Text>
        </TouchableOpacity>
      </View>
      </View>

      
    </View>
  );
}

export default KeamananAkun;

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.FLORAL_WHITE,
    alignItems: "center",
    height: "100%",
    marginTop: "6%",
  },
  textContainer: {
    marginTop: "15%",
    width: 320,
    justifyContent: "center",
  },
  input: {
    borderBottomWidth: 1,
  },
  inputContainer: {
    padding: 5,
    marginBottom: 15,
  },
  button: {
    flexDirection: "row",
    justifyContent: "start",
    width: 138,
    height: 38,
    paddingVertical: 9,
    borderRadius: 10,
    
  },
  buttonContainer: {
    // backgroundColor:'blue',
    marginTop:'5%',
    alignItems: "start",
    borderBottomWidth : 1,
  },
});
