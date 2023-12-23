import { SafeAreaView, StyleSheet, Text, View } from "react-native";
import React from "react";
import { colors } from "../../../../constant/colors";
import BlankKtp from "../../../../assets/img/blank-ktp";
import BlankSIUP from "../../../../assets/img/blank-siup";
import BlankAgunan from "../../../../assets/img/blank-agunan";

const details = [
  {
    key: "No Invoice :",
    value: "123456789",
  },
  {
    key: "Nama Toko :",
    value: "Toko A",
  },
  {
    key: "Nama Distributor :",
    value: "Distributor A",
  },
  {
    key: "Tanggal Faktur :",
    value: "08/09/2023",
  },
  {
    key: "Total Tagihan :",
    value: "Rp. 10.000.000",
  },
  {
    key: "Tanggal Jatuh Tempo :",
    value: "08/12/2023",
  },
];


const DetailInvoice = () => {
  return (
    <SafeAreaView style={{ marginTop: 20 }}>
      <View style={styles.container}>
        <Text style={styles.title}>Pengajuan 0000000</Text>
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
        <Text>Alasan Ditolak:</Text>
        <View style={{ flex: 1 }}>
          <View
            style={{
              backgroundColor: colors.WHITE,
              borderRadius: 10,
              padding: 10,
              // flex: 1,
              elevation: 10,
              height:"20%",
            }}
          >
            <Text>Dokumen belum lengkap</Text>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default DetailInvoice;

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
