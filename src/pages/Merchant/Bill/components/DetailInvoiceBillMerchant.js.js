import { SafeAreaView, StyleSheet, Text, View,Image } from "react-native";
import React, { useEffect, useRef, useState } from "react";
import { colors } from "../../../../constant/colors";
import BlankKtp from "../../../../assets/img/blank-ktp";
import BlankSIUP from "../../../../assets/img/blank-siup";
import BlankAgunan from "../../../../assets/img/blank-agunan";
import { useSelector } from "react-redux";
import { getInvoiceId } from "../../../../services/distributorService";
import {
  blobToBase64,
  getInvoiceImage,
} from "../../../../services/merchantServices";
import { formatIDRCurrency } from "../../../../utils/formatIdr";

const DetailInvoiceBillMerchant = ({ route }) => {
  const { token } = useSelector((state) => state.user);
  const { isSuccess, idInvoice } = route.params;
  console.log("Invoice id", idInvoice);
  const [data, setData] = useState({});
  const [images, setImages] = useState({
    fileInvoice: null,
  });
  const getDetail = async () => {
    try {
      const response = await getInvoiceId(token, idInvoice);
      const {
        namaDistributor,
        namaToko,
        jumlahTagihan,
        tanggalJatuhTempo,
        id,
        judul,
        dueDateAfterApproval,
        tanggalTagihan,
      } = response.data.data;
      setData({
        id,
        namaDistributor,
        tanggalTagihan,
        jumlahTagihan,
        tanggalJatuhTempo,
        namaToko,
        judul,
        dueDateAfterApproval
      });
      
      const invoiceBlob = await getInvoiceImage(token, id);
      const invoiceBase64 = await blobToBase64(invoiceBlob);
      setImages({
        fileInvoice: `data:image/jpeg;base64,${invoiceBase64}`,
      });
    } catch (error) {
      console.log("Error fetching image",error);
    }
  };

  // console.log("cek data", data);
  useEffect(() => {
    getDetail();
  }, []);

  const details = [
    {
      key: "No Faktur :",
      value: data.id || "unknown",
    },
    {
      key: "Tanggal Faktur :",
      value: data.tanggalTagihan || "unknown",
    },
    {
      key: "Nama Toko :",
      value: data.namaToko || "unknown",
    },
    {
      key: "Nama Distributor :",
      value: data.namaDistributor || "unknown",
    },
    {
      key: "Total Tagihan :",
      value: formatIDRCurrency(data.jumlahTagihan) || "unknown",
    },
    {
      key: "Tanggal Mulai Bayar :",
      value: data.tanggalJatuhTempo|| "unknown",
    },
    {
      key: "Tanggal Jatuh Tempo :",
      value: data.dueDateAfterApproval || "unknown",
    },
  ];

  return (
    <SafeAreaView style={{ marginTop: 20 }}>
      <View style={styles.container}>
        <Text style={styles.title}>Invoice {data.judul}</Text>
        <View
          style={{
            borderBottomColor: "black",
            borderWidth: 2,
            elevation: 2,
            borderBottomWidth: StyleSheet.hairlineWidth,
          }}
        />
        <Image
          source={{ uri: images.fileInvoice }}
          style={{ width: "100%", height: 300 }}
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
