import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  Image,
  ScrollView,
} from "react-native";
import React, { useEffect, useState } from "react";
import { colors } from "../../../../constant/colors";
import BlankKtp from "../../../../assets/img/blank-ktp";
import BlankSIUP from "../../../../assets/img/blank-siup";
import BlankAgunan from "../../../../assets/img/blank-agunan";
import { useSelector } from "react-redux";
import {
  blobToBase64,
  getAgunan,
  getDetailInsurance,
  getKtp,
  getSiu,
} from "../../../../services/merchantServices";
import { Button } from "react-native-elements";

const DetailRequest = ({ route }) => {
  const { token } = useSelector((state) => state.user);
  const { idInsurance } = route.params;
  const [data, setData] = useState({
    id: null,
    date: null,
    name: null,
    status: null,
    rejection: null,
    limit: null,
  });
  const [images, setImages] = useState({
    ktp: null,
    agunan: null,
    siu: null,
  });

  const getDetail = async () => {
    try {
      const response = await getDetailInsurance(token, idInsurance);
      const {
        id,
        date,
        nameStore: name,
        status,
        rejection,
        limit,
        images,
      } = response.data.data;
      setData({
        id,
        date,
        name,
        status,
        rejection,
        limit,
      });

      const ktpBlob = await getKtp(token, id);
      const ktpBase64 = await blobToBase64(ktpBlob);

      const siuBlob = await getSiu(token, id);
      const siuBase64 = await blobToBase64(siuBlob);

      const agunanBlob = await getAgunan(token, id);
      const agunanBase64 = await blobToBase64(agunanBlob);

      setImages({
        ktp: ktpBase64,
        siu: siuBase64,
        agunan: agunanBase64,
      });
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    getDetail();
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
    <SafeAreaView style={{ flex: 1, marginTop: 20 }}>
      <ScrollView>
        <View style={styles.container}>
          <Text style={styles.title}>Pengajuan</Text>
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
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                  borderColor: "green",
                  marginTop: 10,
                }}
                key={idx}
              >
                <Text style={{ fontSize: 13, fontWeight: "400" }}>
                  {item.key}
                </Text>
                <Text>{item.value}</Text>
              </View>
            );
          })}

          <View
            style={{
              borderColor: "red",
              marginTop: 10,
            }}
          >
            <Text
              style={{
                fontSize: 20,
                fontWeight: "700",
                color: colors.ORANGE,
              }}
            >
              KTP
            </Text>
            <View>
              {images.ktp && (
                <Image
                  source={{
                    uri: images.ktp,
                  }}
                  style={{ width: "100%", height: 200 }}
                />
              )}
            </View>
          </View>

          <View style={{ borderColor: "red", marginTop: 10 }}>
            <Text
              style={{
                fontSize: 20,
                fontWeight: "700",
                color: colors.ORANGE,
              }}
            >
              Surat Izin Usaha
            </Text>
            <View>
              {images.siu && (
                <Image
                  source={{
                    uri: images.siu,
                  }}
                  style={{ width: "100%", height: 200 }}
                />
              )}
            </View>
          </View>

          <View style={{ borderColor: "red", marginTop: 10 }}>
            <Text
              style={{
                fontSize: 20,
                fontWeight: "700",
                color: colors.ORANGE,
              }}
            >
              Daftar Agunan
            </Text>
            <View>
              {images.agunan && (
                <Image
                  source={{
                    uri: images.agunan,
                  }}
                  style={{ width: "100%", height: 200 }}
                />
              )}
            </View>
          </View>

          {data.limit && (
            <>
              <View
                style={{
                  borderColor: "red",
                  marginTop: 10,
                  flexDirection: "row",
                  justifyContent: "space-between",
                }}
              >
                <Text
                  style={{
                    fontSize: 17,
                    fontWeight: "400",
                  }}
                >
                  Limit
                </Text>
                <Text
                  style={{
                    fontSize: 20,
                    fontWeight: "700",
                  }}
                >
                  {data.limit
                    ? `Rp. ${Intl.NumberFormat("id-ID").format(data.limit)}`
                    : "Not specified"}
                </Text>
              </View>
            </>
          )}

          {data.rejection && (
            <>
              <Text style={{ marginTop: 10, fontSize: 17, fontWeight: "400" }}>
                Alasan Ditolak
              </Text>
              <View style={{ marginTop: 10 }}>
                <View
                  style={{
                    backgroundColor: colors.WHITE,
                    borderRadius: 10,
                    padding: 10,
                    elevation: 10,
                  }}
                >
                  <Text>{data.rejection}</Text>
                </View>
              </View>
            </>
          )}
          
        </View>
      </ScrollView>
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
