import { SafeAreaView, StyleSheet, Text, View } from "react-native";
import React from "react";
import { colors } from "../../../../constant/colors";
import BlankKtp from "../../../../assets/img/blank-ktp";
import BlankSIUP from "../../../../assets/img/blank-siup";
import BlankAgunan from "../../../../assets/img/blank-agunan";

const details = [
  {
    key: "No Faktur :",
    value: "123456789",
  },
  {
    key: "Tanggal Faktur :",
    value: "08/09/2023",
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
    key: "Total Tagihan :",
    value: "Rp. 10.000.000",
  },
  {
    key: "Tanggal Mulai Bayar :",
    value: "08/12/2022",
  },
  {
    key: "Tanggal Jatuh Tempo :",
    value: "08/12/2023",
  },
];


const DetailInvoiceBillMerchant = () => {
  return (
    <SafeAreaView style={{ marginTop: 20 }}>
      <View style={styles.container}>
        <Text style={styles.title}>Invoice 0000000</Text>
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
      </View>
    </SafeAreaView>
  );
};

export default DetailInvoiceBillMerchant;

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
