import { StyleSheet, Text, View } from "react-native";
import React from "react";
import SuccessIcon from "../../../../assets/img/popUpSuccess.svg";
import { colors } from "../../../../constant/colors";
import CustomButton from "../../../../components/CustomButton";

const details = [
  {
    key: "ID Pembayaran:",
    value: "1234567890-",
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
    key: "Tanggal Pembayaran:",
    value: "08/09/2023",
  },
  {
    key: "Jumlah Dibayarkan",
    value: "08/12/2023",
  },
];

const PaymentSuccess = () => {
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
      <View style={{ justifyContent: "center", alignItems: "center" }}>
        <SuccessIcon />
        <Text style={{ fontSize: 20, fontWeight: "700", textAlign: "center" }}>
          Transaksi Berhasil
        </Text>

        <View style={{ padding: 20 }}>
          <CustomButton
            text={"Tepat Waktu"}
            bgColor={colors.GREEN}
            textStyle={{ fontSize: 16 }}
          />
        </View>
      </View>
      <View style={{ gap: 18 }}>
        {details.map((item, index) => {
          return (
            <View
              key={index}
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
              }}
            >
              <Text style={styles.text}>{item.key}</Text>
              <Text style={styles.text}>{item.value}</Text>
            </View>
          );
        })}
      </View>
    </View>
  );
};

export default PaymentSuccess;

const styles = StyleSheet.create({});
