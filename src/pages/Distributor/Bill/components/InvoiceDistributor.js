import { SafeAreaView, StyleSheet, Text, View } from "react-native";
import { colors } from "../../../../constant/colors";
import { useSelector } from "react-redux";
import React, { useEffect, useState } from "react";
import { getInvoiceId } from "../../../../services/distributorService";


const InvoiceDistributor = ({route,navigation}) => {
  const { token } = useSelector((state) => state.user);
  const [data, setData] = useState({});
  const { idInvoice } = route.params;
  console.log("id invoice", idInvoice);
  const getDetail = async () => {
    const response = await getInvoiceId(token, idInvoice);
    const {namaDistributor, jumlahTagihan, tanggalJatuhTempo, id} = response.data.data;
    setData({
    id,
    namaDistributor,
    jumlahTagihan,
    tanggalJatuhTempo,
    });
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
      value: data.namaDistributor || "unknown",
    },
    {
      key: "Nama Distributor:",
      value: data.namaDistributor || "unknown",
    },
    {
      key: "Total Tagihan:",
      value: `Rp. ${data.jumlahTagihan || 0}`,
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
