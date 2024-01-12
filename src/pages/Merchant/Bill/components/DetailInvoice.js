import { SafeAreaView, StyleSheet, Text, View } from "react-native";
import React,{ useEffect, useState }  from "react";
import { colors } from "../../../../constant/colors";
import BlankKtp from "../../../../assets/img/blank-ktp";
import BlankSIUP from "../../../../assets/img/blank-siup";
import BlankAgunan from "../../../../assets/img/blank-agunan";
import { getDetailInvoice } from "../../../../services/merchantServices";
import { useSelector } from "react-redux";
import { Button } from "react-native-elements";


const DetailInvoice = ({route}) => {
  const { token } = useSelector((state) => state.user);
  const { idInvoice } = route.params;
  const [data, setData] = useState({
    id: null,
    judul:null,
    namaToko: null,
    namaDistributor: null,
    tanggalTagihan: null,
    jumlahTagihan: null,
    tanggalJatuhTempo:null,
    rejection:null,
  });

  const getDetail = async () => {
    const response = await getDetailInvoice(token, idInvoice);
    const { id, judul, namaToko, namaDistributor,tanggalTagihan,jumlahTagihan,tanggalJatuhTempo,rejection } = response.data.data;
    setData({
    id,
    judul,
    namaToko,
    namaDistributor,
    tanggalTagihan,
    jumlahTagihan,
    tanggalJatuhTempo,
    rejection,
    });
  };

  useEffect(() => {
    getDetail();
  }, []);

  const details = [
    {
      key: "No Invoice :",
      value: data.judul,
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
    {
      key: "Alasan Ditolak :",
      value: data.rejection,
    },
  ];
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
            <Text>{data.rejection}</Text>
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
