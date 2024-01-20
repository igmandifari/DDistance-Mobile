import { SafeAreaView, StyleSheet, Text, View } from "react-native";
import React, { useEffect, useState } from "react";
import { colors } from "../../../../constant/colors";
import BlankKtp from "../../../../assets/img/blank-ktp";
import BlankSIUP from "../../../../assets/img/blank-siup";
import BlankAgunan from "../../../../assets/img/blank-agunan";
import { getDetailInvoice } from "../../../../services/merchantServices";
import { useSelector } from "react-redux";
import { Button } from "react-native-elements";

const DetailInvoice = ({ route }) => {
  const { token } = useSelector((state) => state.user);
  const { idInvoice } = route.params;
  const [data, setData] = useState({});

  const getDetail = async () => {
    const response = await getDetailInvoice(token, idInvoice);
    setData(response.data.data);
    console.log("cek", response.data.data);
  };

  useEffect(() => {
    getDetail();
  }, []);

  const details = [
    {
      key: "No Invoice :",
      value: data.id,
    },
    {
      key: "Nama Toko :",
      value: data.namaToko,
    },
    {
      key: "Nama Distributor :",
      value: data.namaDistributor,
    },
    {
      key: "Tanggal Tagihan :",
      value: data.tanggalTagihan,
    },
    {
      key: "Total Tagihan :",
      value: data.jumlahTagihan,
    },
    {
      key: "Tanggal Jatuh Tempo :",
      value: data.tanggalJatuhTempo,
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

        <View style={{ alignItems: "center" }}>
          <Text
            style={{
              backgroundColor:
                data.status === "DITERIMA"
                  ? colors.GREEN
                  : data.status === "DITOLAK"
                  ? colors.RED
                  : data.status === "DALAM_PROSES"
                  ? colors.ORANGE
                  : null,
              color: colors.WHITE,
              width: 150,
              height: 50,
              borderRadius: 10,
              textAlign: "center",
              textAlignVertical: "center",
              fontSize:17,
            }}
          >
            {data.status}
          </Text>
        </View>

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
