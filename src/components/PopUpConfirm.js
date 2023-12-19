import { StyleSheet, Text, View, Image, TouchableOpacity } from "react-native";
import React from "react";
import { colors } from "../constant/colors";
import AlertIcon from "../assets/img/alert-icon.svg";

const PopUpConfirm = ({ handleOK, handleReject }) => {
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
        }}
      >
        <AlertIcon />
        <Text style={{ fontSize: 20, fontWeight: "700" }}>
          Apakah Anda yakin ?
        </Text>
        <Text style={{ fontSize: 20, fontWeight: "400", textAlign: "center" }}>
          Pastikan data sudah {"\n"} sesuai
        </Text>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-evenly",
            width: "100%",
          }}
        >
          <TouchableOpacity
            style={{
              width: 85,
              justifyContent: "center",
              alignItems: "center",
              paddingVertical: 10,
              borderRadius: 10,
              backgroundColor: colors.GREEN,
            }}
            onPress={handleOK}
          >
            <Text
              style={{ fontSize: 16, fontWeight: "700", color: colors.WHITE }}
            >
              Ya
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={{
              width: 85,
              justifyContent: "center",
              alignItems: "center",
              paddingVertical: 10,
              borderRadius: 10,
              backgroundColor: colors.RED,
            }}
            onPress={handleReject}
          >
            <Text
              style={{ fontSize: 16, fontWeight: "700", color: colors.WHITE }}
            >
              Tidak
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default PopUpConfirm;

const styles = StyleSheet.create({});
