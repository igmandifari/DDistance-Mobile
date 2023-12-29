import { StyleSheet, Text, View } from "react-native";
import React from "react";
import FailedIcon from "../../../../assets/img/failedIcon.svg";
import { colors } from "../../../../constant/colors";

const details = [
  {
    key: "No. Faktur:",
    value: "1234567890-",
  },
  {
    key: "Tanggal Faktur:",
    value: "08/09/2023",
  },
  {
    key: "Nama Toko",
    value: "Toko A",
  },
  {
    key: "Nama Distributor:",
    value: "Distributor A",
  },
  {
    key: "Tanggal Jatuh Tempo",
    value: "08/12/2023",
  },
];

const PaymentFailed = () => {
  return (
    <View>
      <Text style={{ fontSize: 32, fontWeight: "700", textAlign: "center" }}>
        Pembayaran #376
      </Text>
      <View
        style={{
          marginTop: 15,
          borderBottomColor: "black",
          borderWidth: 2,
          elevation: 2,
        }}
      />
      <View
        style={{
          justifyContent: "center",
          alignItems: "center",
          height: "80%",
        }}
      >
        <FailedIcon />
        <Text style={{ fontSize: 20, fontWeight: "700", textAlign: "center" }}>
          Transaksi Gagal !
        </Text>
        <Text style={{ fontSize: 20, textAlign: "center" }}>
          Mohon periksa {"\n"}
          koneksi Anda
        </Text>
      </View>
    </View>
  );
};

export default PaymentFailed;

const styles = StyleSheet.create({});
