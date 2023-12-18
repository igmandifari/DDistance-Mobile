import { StyleSheet, Text, View, Image } from "react-native";
import React from "react";
import { colors } from "../../../../constant/colors";
import CustomButton from "../../../../components/CustomButton";

const ChangePasswordSuccess = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <View style={styles.imageContainer}>
        <Image
          style={styles.image}
          source={require("../../../../assets/img/success.png")}
        />
      </View>
      <Text style={styles.title}>Kata Sandi berhasil diubah</Text>
      <Text style={styles.description}>
      Silahkan masuk ke akun menggunakan
kata sandi baru
      </Text>
      <View
        style={{
          height: "20%",
          justifyContent: "flex-end",
          width: "100%",
        }}
      >
        <CustomButton
          text="Masuk"
          handleClick={() => navigation.navigate("login")}
        />
      </View>
    </View>
  );
};

export default ChangePasswordSuccess;

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.FLORAL_WHITE,
    height: "100%",
    padding: 25,
    alignItems: "center",
    justifyContent: "flex-end",
    gap: 15,
  },
  imageContainer: {
    borderRadius: 1000,
    // backgroundColor: "white",
    width: 301,
    height:100,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 65,
  },
  image: {
    width: "60%",
  },
  title: {
    color: colors.ORANGE,
    fontSize: 20,
    fontWeight: "700",
  },
  description: {
    fontWeight: "400",
    fontSize: 15,
    color: colors.DARK_GRAY,
    marginBottom:20,
  },
});
