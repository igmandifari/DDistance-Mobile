import { SafeAreaView, StyleSheet, Text, View, Image } from "react-native";
import React, { useEffect, useState } from "react";
import { colors } from "../../../../constant/colors";
import BlankKtp from "../../../../assets/img/blank-ktp";
import BlankSIUP from "../../../../assets/img/blank-siup";
import BlankAgunan from "../../../../assets/img/blank-agunan";
import { useSelector } from "react-redux";
import {
  getDetailInsurance,
  getKtp,
} from "../../../../services/merchantServices";
import KtpComponent from "../../../../components/jsx/ktpImage";
import { Button } from "react-native-elements";

const files = [
  {
    key: "KTP",
    value: BlankKtp,
  },
  {
    key: "Surat Izin Usaha",
    value: BlankSIUP,
  },
  {
    key: "Agunan",
    value: BlankAgunan,
  },
];

const DetailRequest = ({ route }) => {
  const { token } = useSelector((state) => state.user);
  const { idInsurance } = route.params;
  const [data, setData] = useState({
    id: null,
    date: null,
    name: null,
    status: null,
  });
  const [images, setImages] = useState({
    ktp: null,
    agunan: null,
    siup: null,
  });

  const getDetail = async () => {
    const response = await getDetailInsurance(token, idInsurance);
    const { id, date, nameStore: name, status } = response.data.data;
    setData({
      id,
      date,
      name,
      status,
    });
  };

  const getKtpImage = async () => {
    const response = await getKtp(token, idInsurance);
    setImages((p) => ({
      ...p,
      ktp: response.data,
    }));
  };

  useEffect(() => {
    getDetail();
    getKtpImage();
  }, []);

  const details = [
    {
      key: "ID Pengajuan :",
      value: data.id,
    },
    {
      key: "Tanggal Pengajuan :",
      value: data.date,
    },
    {
      key: "Nama Toko :",
      value: data.name,
    },
    {
      key: "Status",
      value: data.status,
    },
  ];
  return (
    <SafeAreaView style={{ marginTop: 20 }}>
      <View style={styles.container}>
        <Text style={styles.title}>Pengajuan #1</Text>
        <View
          style={{
            borderBottomColor: "black",
            borderWidth: 2,
            elevation: 2,
            borderBottomWidth: StyleSheet.hairlineWidth,
          }}
        />
        <Button title={"test"} onPress={() => console.log(images.ktp)} />
        <View>
          {images.ktp && (
            <Image
              source={{
                uri: images.ktp,
              }}
              style={{ width: 400, height: 400 }}
            />
          )}
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
        {files.map((item, idx) => {
          return (
            <View
              key={idx}
              style={{
                borderColor: "red",
              }}
            >
              <Text
                style={{
                  fontSize: 20,
                  fontWeight: "700",
                  color: colors.ORANGE,
                }}
              >
                {item.key}
              </Text>
              <item.value />
            </View>
          );
        })}
        <Text>Alasan Ditolan</Text>
        <View style={{ flex: 1 }}>
          <View
            style={{
              backgroundColor: colors.WHITE,
              borderRadius: 10,
              padding: 10,
              flex: 1,
              elevation: 10,
            }}
          >
            <Text>KTP kurang jelas</Text>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default DetailRequest;

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
