import { SafeAreaView, StyleSheet, Text, View, Image } from "react-native";
import { colors } from "../../../../constant/colors";
import { useSelector } from "react-redux";
import React, { useEffect, useState } from "react";
import { getInvoiceId } from "../../../../services/distributorService";
import { formatIDRCurrency } from "../../../../utils/formatIdr";
import { blobToBase64, getInvoiceImage } from "../../../../services/merchantServices";

const InvoiceDistributor = ({ route, navigation }) => {
  const { token } = useSelector((state) => state.user);
  const [data, setData] = useState({});
  const { idInvoice } = route.params;
  // console.log("id invoice", idInvoice);
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
      } = response.data.data;
      setData({
        id,
        namaDistributor,
        jumlahTagihan,
        tanggalJatuhTempo,
        namaToko,
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

  useEffect(() => {
    getDetail();
  }, []);
  const details = [
    {
      key: "ID Invoice:",
      value: data.id || "unknown",
    },
    {
      key: "Tanggal Jatuh Tempo:",
      value: data.tanggalJatuhTempo || "unknown",
    },
    {
      key: "Nama Toko:",
      value: data.namaToko || "unknown",
    },
    {
      key: "Nama Distributor:",
      value: data.namaDistributor || "unknown",
    },
    {
      key: "Total Tagihan:",
      value: formatIDRCurrency(data.jumlahTagihan),
    },
  ];

  console.log("data", data);
  return (
    <SafeAreaView style={{ marginTop: 20 }}>
      <View style={styles.container}>
        <Text style={styles.title}>Invoice {data.id}</Text>
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
          style={{ width: "100%", height: 400 }}
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

export default InvoiceDistributor;

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
