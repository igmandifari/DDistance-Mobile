import React, { useState } from "react";
import { colors } from "../../../../constant/colors";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  TextInput,
} from "react-native";
import { updateProfileUser } from "../../../../services/merchantServices";
import { useSelector } from "react-redux";

function EditProfile({ navigation }) {
  const [form, setForm] = useState({
    name: "",
    address: "",
    phoneNumber: "",
    email: "",
    pan: "",
  });

  const { token } = useSelector((state) => state.user);

  const handleSubmitUpdate = async () => {
    await updateProfileUser(token, form);
    navigation.navigate("profile");
  };

  const handleChange = (key, value) => {
    setForm((prevState) => ({
      ...prevState,
      [key]: value,
    }));
  };

  return (
    <View style={styles.container}>
      <View style={styles.textContainer}>
        <View style={styles.inputContainer}>
          <Text>Nama :</Text>
          <TextInput
            style={styles.input}
            placeholder="Nama"
            onChangeText={(text) => handleChange("name", text)}
            value={form.name}
          />
        </View>
        <View style={styles.inputContainer}>
          <Text>Alamat :</Text>
          <TextInput
            style={styles.input}
            placeholder="Alamat"
            onChangeText={(text) => handleChange("address", text)}
            value={form.address}
          />
        </View>
        <View style={styles.inputContainer}>
          <Text>No HP :</Text>
          <TextInput
            style={styles.input}
            placeholder="No HP"
            onChangeText={(text) => handleChange("phoneNumber", text)}
            value={form.phone}
          />
        </View>
        <View style={styles.inputContainer}>
          <Text>Email :</Text>
          <TextInput
            style={styles.input}
            placeholder="Email"
            onChangeText={(text) => handleChange("email", text)}
            value={form.email}
          />
        </View>
        <View style={styles.inputContainer}>
          <Text>No Rekening Danamon :</Text>
          <TextInput
            style={styles.input}
            placeholder="No Rekening Danamon"
            onChangeText={(text) => handleChange("pan", text)}
            value={form.pan}
          />
        </View>
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.button} onPress={handleSubmitUpdate}>
            <Text
              style={{ color: colors.WHITE, fontWeight: "800", fontSize: 12 }}
            >
              Simpan Profil
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

export default EditProfile;

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
    backgroundColor: colors.ORANGE,
    flexDirection: "row",
    justifyContent: "center",
    width: 138,
    height: 38,
    paddingVertical: 9,
    borderRadius: 10,
  },
  buttonContainer: {
    marginTop: "20%",
    alignItems: "center",
  },
});
