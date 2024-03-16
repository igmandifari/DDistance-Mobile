import { Image, StyleSheet, Text, View } from "react-native";
import React from "react";
import { colors } from "../../../constant/colors";
import { BackHandler } from "react-native";
import { useFocusEffect } from "@react-navigation/native";

const SuccessNewPassword = ({ route, navigation }) => {
  const email = route?.params?.email;
  
  if (!email) {
    return null;
  }

  useFocusEffect(
    React.useCallback(() => {
      const onBackPress = () => {
        navigation.navigate("login");
        return true;
      };

      BackHandler.addEventListener("hardwareBackPress", onBackPress);

      return () => BackHandler.removeEventListener("hardwareBackPress", onBackPress);
    }, [navigation])
  );

  return (
    <View
      style={{
        position: "absolute",
        top: 0,
        right: 0,
        left: 0,
        bottom: 0,
        marginTop: 25,
        justifyContent: "center",
        alignItems: "center",
        zIndex: 99,
        backgroundColor: "rgba(190, 190, 190, 0.6)",
      }}
    >
      <View
        style={{
          padding: 15,
          width: "100%",
          height: "100%",
          backgroundColor: colors.FLORAL_WHITE,
          alignItems: "center",
          gap: 20,
          justifyContent: "center",
        }}
      >
        <Image
          style={styles.image}
          source={require("../../../assets/img/success.png")}
        />
        <View style={[styles.description, { marginTop: 20 }]}>
          <Text style={styles.textDescription}>Pengiriman kata sandi </Text>
          <Text style={styles.textDescription}>baru berhasil</Text>
        </View>

        <View style={[styles.description, { marginTop: 10 }]}>
          <Text>Kata sandi baru telah dikirim ke </Text>
          <Text>email {email}</Text>
        </View>
      </View>
    </View>
  );
};

export default SuccessNewPassword;

const styles = StyleSheet.create({
  description: {
    justifyContent: "center",
    alignItems: "center",
  },
  textDescription: {
    fontWeight: "700",
    fontSize: 20,
    color: colors.ORANGE,
  },
  image: {
    width: 100,
    height: 100,
  },
});