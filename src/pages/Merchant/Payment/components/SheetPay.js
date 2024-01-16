import { StyleSheet, Text, View } from "react-native";
import React from "react";
import BillIcon from "../../../../assets/img/bill.svg";
import CustomButton from "../../../../components/CustomButton";
import { colors } from "../../../../constant/colors";
import { useSelector } from "react-redux";

const payDetails = [
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
    key: "Sisa Tagihan:",
    value: "Rp.4.100.00",
  },
  {
    key: "Cicilan Tagihan",
    value: "Rp.5.100.456",
  },
  {
    key: "Tanggal Jatuh Tempo",
    value: "08/12/2023",
  },
];



const SheetPay = ({ handlePay, handlePayAll }) => {

  const handleClickPay = () => {
    handlePay();
  };

  const handleClickPayAll = () => {
    handlePayAll();
  };
  return (
    <View>
      <Text style={{ fontSize: 32, fontWeight: "700" }}>Pembayaran</Text>
      <View
        style={{
          marginTop: 10,
          borderBottomColor: "black",
          borderWidth: 2,
          elevation: 2,
        }}
      />
      <View style={{ alignItems: "center", padding: 10 }}>
        <BillIcon />
      </View>
      <View style={{ gap: 18 }}>
        {payDetails.map((item, index) => {
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
      <View
        style={{
          flexDirection: "row",
          padding: 20,
          justifyContent: "space-around",
        }}
      >
        <View style={{ width: "40%" }}>
          <CustomButton
            text={"Bayar Cicilan"}
            textStyle={{ fontSize: 12 }}
            bgColor={colors.GREEN}
            handleClick={() => handleClickPay()}
          />
        </View>
        <View style={{ width: "40%" }}>
          <CustomButton
            text={"Bayar Sisa Tagihan"}
            textStyle={{ fontSize: 12 }}
            bgColor={colors.RED}
            handleClick={() => handleClickPayAll()}
          />
        </View>
      </View>
    </View>
  );
};

export default SheetPay;

const styles = StyleSheet.create({});
