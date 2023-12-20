import { SafeAreaView, StyleSheet, Text, View } from "react-native";
import React from "react";
import { colors } from "../../../../constant/colors";
import BlankKtp from "../../../../assets/img/blank-ktp";
import BlankSIUP from "../../../../assets/img/blank-siup";
import BlankAgunan from "../../../../assets/img/blank-agunan";

const details = [
  {
    key: "ID Pengajuan :",
    value: "123456",
  },
  {
    key: "Tanggal Pengajuan :",
    value: "08/09/2023",
  },
  {
    key: "Nama Toko :",
    value: "Toko A",
  },
  {
    key: "ID Pengajuan :",
    value: "123456",
  },
];

const files = [
  {
    key: "KTP",
    value: BlankKtp,
  },
  {
    key: "Surat Izin Usaha",
    value: BlankSIUP,
  },
  {
    key: "Agunan",
    value: BlankAgunan,
  },
];

const DetailRequest = () => {
  return (
    <SafeAreaView style={{ marginTop: 20 }}>
      <View style={styles.container}>
        <Text style={styles.title}>Pengajuan #1</Text>
        <View
          style={{
            borderBottomColor: "black",
            borderWidth: 2,
            elevation: 2,
            borderBottomWidth: StyleSheet.hairlineWidth,
          }}
        />
        {details.map((item, idx) => {
          return (
            <View
              key={idx}
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                borderColor: "green",
                marginTop: 10,
              }}
            >
              <Text style={{ fontSize: 13, fontWeight: "400" }}>
                {item.key}
              </Text>
              <Text>{item.value}</Text>
            </View>
          );
        })}
        {files.map((item, idx) => {
          return (
            <View
              key={idx}
              style={{
                borderColor: "red",
              }}
            >
              <Text
                style={{
                  fontSize: 20,
                  fontWeight: "700",
                  color: colors.ORANGE,
                }}
              >
                {item.key}
              </Text>
              <item.value />
            </View>
          );
        })}
        <Text>Alasan Ditolan</Text>
        <View style={{ flex: 1 }}>
          <View
            style={{
              backgroundColor: colors.WHITE,
              borderRadius: 10,
              padding: 10,
              flex: 1,
              elevation: 10,
            }}
          >
            <Text>KTP kurang jelas</Text>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default DetailRequest;

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.FLORAL_WHITE,
    height: "100%",
    padding: 25,
    gap: 10,
  },
  title: {
    fontSize: 32,
    fontWeight: "700",
  },
});
