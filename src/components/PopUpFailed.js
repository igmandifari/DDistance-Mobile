import { StyleSheet, Text, View, Image, TouchableOpacity } from "react-native";
import React from "react";
import { colors } from "../constant/colors";
import FailedIcon from "../assets/img/failedIcon.svg";

const PopUpFailed = ({ handleOK, handleReject }) => {
  return (
    <View
      style={{
        position: "absolute",
        top: 0,
        right: 0,
        left: 0,
        bottom: 0,
        justifyContent: "center",
        alignItems: "center",
        zIndex: 99,
        backgroundColor: "rgba(190, 190, 190, 0.6)",
      }}
    >
      <View
        style={{
          padding: 15,
          width: 278,
          height: 343,
          backgroundColor: colors.FLORAL_WHITE,
          borderRadius: 15,
          alignItems: "center",
          gap: 8,
          justifyContent: "center",
        }}
      >
        <FailedIcon />
        <Text style={{ fontSize: 20, fontWeight: "700" }}>Gagal !</Text>
      </View>
    </View>
  );
};

export default PopUpFailed;

const styles = StyleSheet.create({});
