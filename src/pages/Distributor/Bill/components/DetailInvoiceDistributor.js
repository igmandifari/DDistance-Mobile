import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  TextInput,
} from "react-native";
import React, { useState, useEffect } from "react";
import { colors } from "../../../../constant/colors";
import { getDetailInvoice } from "../../../../services/distributorService";
import { useSelector } from "react-redux";
import CustomButton from "../../../../components/CustomButton";
import PopUpConfirm from "../../../../components/PopUpConfirm";
import {
  putInvoiceDistributor,
  sendOtpInvoiceDistributor,
} from "../../../../services/distributorService";
import { useFormik } from "formik";
import * as Yup from "yup";
import { formatIDRCurrency } from "../../../../utils/formatIdr";
import { blobToBase64, getInvoiceImage } from "../../../../services/merchantServices";

const DetailInvoiceDistributor = ({ route, navigation }) => {
  const { token } = useSelector((state) => state.user);
  const { idInvoice } = route?.params;
  const [data, setData] = useState({
    image:null,
    id: null,
    judul: null,
    namaToko: null,
    namaDistributor: null,
    tanggalTagihan: null,
    jumlahTagihan: null,
    tanggalJatuhTempo: null,
    rejection: null,
    status: null,
  });
  const [popUp, setPopUp] = useState(false);

  const getDetail = async () => {
    try {
      const response = await getDetailInvoice(token, idInvoice);
      // console.log("=========>", response.data);
      const {
        id,
        judul,
        namaToko,
        namaDistributor,
        tanggalTagihan,
        jumlahTagihan,
        tanggalJatuhTempo,
        rejection: alasanPenolakan,
        status: installment,
      } = response.data.data;

      setData({
        id,
        judul,
        namaToko,
        namaDistributor,
        tanggalTagihan,
        jumlahTagihan,
        tanggalJatuhTempo,
        rejection: alasanPenolakan,
        status: installment,
      });

      const invoiceBlob = await getInvoiceImage(token, id);
      const invoiceBase64 = await blobToBase64(invoiceBlob);

      // setImages({
      //   file: `data:image/jpeg;base64,${invoiceBase64}`,
      // });
    } catch (error) {
      console.error("Error fetching invoice data:", error);
    }
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
      key: "Tanggal Invoice :",
      value: data.tanggalTagihan,
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
      key: "Total Tagihan :",
      value: formatIDRCurrency(data.jumlahTagihan),
    },
    {
      key: "Tanggal Jatuh Tempo :",
      value: data.tanggalJatuhTempo,
    },
    {
      key: "Rejection",
      value: data.rejection,
    },
  ];

  const handleSetuju = () => {
    console.log("Setuju");
    if (isValid) {
      setData({ ...data, status: "DITERIMA" });
    }
  };

  const handleTolak = () => {
    console.log("Tolak");
    if (isValid) {
      setData({ ...data, status: "DITOLAK" });
    }
  };

  const { handleSubmit, values, handleChange, isValid } = useFormik({
    initialValues: {
      installment: data.status,
      alasanPenolakan: data.rejection,
    },
    onSubmit: async (values) => {
      try {
        const formData = {
          id: data.id,
          alasanPenolakan: values.rejection,
          installemnt: data.status,
        };

        await sendOtpInvoiceDistributor(token);

        navigation.navigate("otp-invoice-ditributor", { formData });
      } catch (error) {
        console.error("Error sending OTP:", error);
      }
    },
  });

  return (
    <SafeAreaView style={{ marginTop: 20 }}>
      <View style={styles.container}>
        {popUp && (
          <PopUpConfirm
            handleOK={() => handleSubmit()}
            handleReject={() => handleSubmit(false)}
          />
        )}
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
              key={idx}
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                borderColor: "green",
                marginTop: 10,
              }}
              onPress={() => navigation.navigate("")}
            >
              <Text style={{ fontSize: 13, fontWeight: "400" }}>
                {item.key}
              </Text>
              <Text>{item.value} </Text>
            </View>
          );
        })}
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            padding: 10,
          }}
        >
          <TouchableOpacity
            onPress={handleSetuju}
            style={{
              borderRadius: 10,
              backgroundColor: "#00E817",
              paddingVertical: 10,
              width: 160,
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Text style={{ fontSize: 16, fontWeight: 600, color: "white" }}>
              Setuju
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={handleTolak}
            style={{
              borderRadius: 10,
              backgroundColor: "#FC0000",
              paddingVertical: 10,
              width: 160,
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Text style={{ fontSize: 16, fontWeight: 600, color: "white" }}>
              Tolak
            </Text>
          </TouchableOpacity>
        </View>
        <Text>Alasan Ditolak:</Text>
        <View style={{ flex: 1 }}>
          <View
            style={{
              backgroundColor: colors.WHITE,
              borderRadius: 10,
              padding: 10,
              elevation: 10,
              height: "20%",
            }}
          >
            <TextInput
              placeholder="Dokumen Belum Lengkap"
              onChangeText={handleChange("rejection")}
              value={values.rejection}
            />
          </View>
          <View style={{ marginTop: 20 }}></View>
          <View style={{ alignItems: "center" }}>
            {isValid.rejection && (
              <Text style={{ color: "red" }}>{isValid.rejection}</Text>
            )}
            <CustomButton handleClick={handleSubmit} text={"Kirim"} />
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default DetailInvoiceDistributor;

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
