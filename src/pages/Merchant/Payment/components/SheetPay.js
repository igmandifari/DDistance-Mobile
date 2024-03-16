import { StyleSheet, Text, View } from "react-native";
import React, { useEffect, useRef, useState } from "react";
import BillIcon from "../../../../assets/img/bill.svg";
import CustomButton from "../../../../components/CustomButton";
import { colors } from "../../../../constant/colors";
import { useSelector } from "react-redux";
import { getPaymentId } from "../../../../services/merchantServices";
import { formatIDRCurrency } from "../../../../utils/formatIdr";

const SheetPay = ({ handlePay, handlePayAll,selectedPaymentId }) => {
  const { token } = useSelector((state) => state.user);
  const [data, setData] = useState({});
  const getDetail = async () => {
    const response = await getPaymentId(token,selectedPaymentId);
    const {
      id,
      namaToko,
      namaDistributor,
      sisaTagihan,
      tagihan,
      tanggalFaktur,
      statusPembayaran,
      tanggalPembayaran,
    } = response.data.data;
    setData({
      id,
      namaToko,
      namaDistributor,
      sisaTagihan,
      tagihan,
      tanggalFaktur,
      statusPembayaran,
      tanggalPembayaran,
    });
  };

  useEffect(() => {
    getDetail(selectedPaymentId);
  }, [selectedPaymentId]);
  console.log("cek data pay", data);

  const payDetails = [
    {
      key: "No. Faktur:",
      value: data.id || "unknown",
    },
    {
      key: "Tanggal Faktur:",
      value: data.tanggalFaktur || "unknown",
    },
    {
      key: "Nama Toko",
      value: data.namaToko || "unknown",
    },
    {
      key: "Nama Distributor:",
      value: data.namaDistributor || "unknown",
    },
    {
      key: "Sisa Tagihan:",
      value: formatIDRCurrency(data.sisaTagihan) || "unknown",
    },
    {
      key: "Cicilan Tagihan",
      value: formatIDRCurrency(data.tagihan) || "unknown",
    },
    {
      key: "Tanggal Jatuh Tempo",
      value: data.tanggalPembayaran || "unknown",
    },
  ];

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
