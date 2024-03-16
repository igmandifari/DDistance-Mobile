import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import React, { useState, useRef, useEffect } from "react";
import { colors } from "../../../constant/colors";
import CustomButton from "../../../components/CustomButton";
import { sendOtpAturTenor } from "../../../services/merchantServices";
import { Dropdown } from "react-native-element-dropdown";
import { BottomSheet } from "react-native-sheet";
import TenorSuccessSetting from "./components/TenorSuccessSetting";
import BillIcon from "../../../assets/img/bill.svg";

import {
  cekTagihan,
  getDetailTagihan,
} from "../../../services/merchantServices";
import { useSelector } from "react-redux";
import { getInvoiceId } from "../../../services/distributorService";
import { formatIDRCurrency } from "../../../utils/formatIdr";
const data = [
  { label: "3 Bulan", value: 3 },
  { label: "6 Bulan", value: 6 },
  { label: "12 Bulan", value: 12 },
  { label: "Lunas", value: 1 },
];

const TenorSetting = ({ navigation, route }) => {
  const { token } = useSelector((state) => state.user);
  const { isSuccess,idInvoice } = route.params;
  console.log("ID Invoice",idInvoice);
  const sheetSuccess = useRef(null);
  const [hasilCekTagihan, setHasilCekTagihan] = useState(null);
  const [value, setValue] = useState(null);
  const [isFocus, setIsFocus] = useState(false);
  const [detail, setDetail] = useState({
    id: "",
    dateFaktur: "",
    merchantName: "",
    distributorName: "",
    expiredDate: "",
    totalTagihan: "",
  });

  const handleSubmitTenor = async () => {
    if (!value) {
      alert("tenor must be not null");
      return;
    }
    try {
      await sendOtpAturTenor(token);
      navigation.navigate("otp-tenor", {
        formData: {
          id: detail.id,         
          tenor: value,
        },
      });
    } catch (error) {
      console.error("Error sending OTP for tenor adjustment:", error);
      alert("Failed to send OTP for tenor adjustment. Please try again.");
    }
  };

  if (isSuccess) {
    sheetSuccess.current.show();
  }

  const getData = async () => {
    const response = await getInvoiceId(token,idInvoice);
    const {
      namaToko,
      namaDistributor,
      tanggalJatuhTempo,
      jumlahTagihan,
      id,
      tanggalTagihan,
    } = response.data.data;

    setDetail({
      id,
      dateFaktur: tanggalTagihan,
      merchantName: namaToko,
      distributorName: namaDistributor,
      expiredDate: tanggalJatuhTempo,
      totalTagihan: jumlahTagihan,
    });
  };

  useEffect(() => {
    // console.log(token);
    // console.log("test use effect");
    getData();
  }, []);

  const details = [
    {
      key: "No. Faktur:",
      value: detail.id || "unknown",
    },
    {
      key: "Tanggal Faktur:",
      value: detail.dateFaktur || "unknown",
    },
    {
      key: "Nama Toko",
      value: detail.merchantName || "unknown",
    },
    {
      key: "Nama Distributor:",
      value: detail.distributorName || "unknown",
    },
    {
      key: "Tanggal Jatuh Tempo",
      value: detail.expiredDate || "unknown",
    },
    {
      key: "Total Tagihan",
      value: formatIDRCurrency(detail.totalTagihan) || "unknown",
    },
  ];

  const handleCekTagihan = async () => {
    if (!value) {
      alert("Jumlah tenor harus diatur terlebih dahulu");
      return;
    }

    const bodyRequest = {
      id: detail.id,
      tenor: value,
    };

    try {
      const response = await cekTagihan(token, bodyRequest);
      console.log("body request", bodyRequest);;
      setHasilCekTagihan(response.data); // menyimpan hasil cek tagihan
    } catch (error) {
      console.error("Error saat cek tagihan:", error);
      alert("Terjadi kesalahan saat cek tagihan");
    }
  };

  return (
    <SafeAreaView style={{ marginTop: 25, height: "100%" }}>
      <View style={styles.container}>
        <BottomSheet
          height={700}
          sheetBackgroundColor="#ccc"
          sheetStyle={{
            backgroundColor: colors.FLORAL_WHITE,
            paddingHorizontal: 25,
            paddingVertical: 10,
            gap: 10,
          }}
          ref={sheetSuccess}
        >
          <TenorSuccessSetting/>
        </BottomSheet>
        {/* <TouchableOpacity onPress={() => sheetPay.current.show()}>
          <Text>open shet pay</Text>
        </TouchableOpacity> */}
        <Text style={{ fontWeight: "700", fontSize: 32 }}>
          Pengaturan Tenor
        </Text>
        <View
          style={{
            borderBottomColor: "black",
            borderWidth: 2,
            elevation: 2,
          }}
        />
        <View
          style={{
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <BillIcon />
        </View>
        <View style={{ gap: 18 }}>
          {details.map((item, index) => {
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
        {/* dropdown */}
        <View>
          {/* {renderLabel()} */}
          <Dropdown
            style={[styles.dropdown, isFocus && { borderColor: colors.GRAY }]}
            placeholderStyle={styles.placeholderStyle}
            selectedTextStyle={styles.selectedTextStyle}
            inputSearchStyle={styles.inputSearchStyle}
            iconStyle={styles.iconStyle}
            data={data}
            search
            maxHeight={300}
            labelField="label"
            valueField="value"
            placeholder={!isFocus ? "Jumlah Tenor" : ""}
            searchPlaceholder="Search..."
            value={value}
            onFocus={() => setIsFocus(true)}
            onBlur={() => setIsFocus(false)}
            onChange={(item) => {
              setValue(item.value);
              setIsFocus(false);
            }}
          />
        </View>

        <View
          style={{
            backgroundColor: colors.WHITE,
            padding: 10,
            borderRadius: 12,
            borderColor: colors.GRAY,
            borderWidth: 2,
          }}
        >
          {hasilCekTagihan && (
            <View>
              <Text style={[styles.text2, styles.textCenter]}>
                {hasilCekTagihan.data.bunga}% (Gross Per Tahun)
              </Text>
              <Text style={[styles.textCenter, styles.text2, { marginTop: 6 }]}>
                Total Rp. {hasilCekTagihan.data.grandTotal}
              </Text>
              <Text style={[styles.textCenter, { fontSize: 20 }]}>
                Rp. {hasilCekTagihan.data.bayarPerBulan} per Bulan
              </Text>
            </View>
          )}
        </View>

        <CustomButton
          text={"Cek Tagihan + Bunga / Bulan"}
          handleClick={() => handleCekTagihan()}
        />
        <CustomButton
          text={"Lanjut"}
          bgColor={colors.GREEN}
          handleClick={() => handleSubmitTenor()}
        />
      </View>
    </SafeAreaView>
  );
};

export default TenorSetting;

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.FLORAL_WHITE,
    height: "100%",
    flex: 1,
    padding: 25,
    gap: 10,
  },
  text: {
    fontSize: 13,
    fontWeight: "400",
  },
  text2: {
    fontSize: 14,
    fontWeight: "400",
  },
  textCenter: {
    textAlign: "center",
  },
  dropdown: {
    backgroundColor: colors.WHITE,
    borderWidth: 1,
    borderColor: colors.GRAY,
    borderRadius: 30,
    width: 218,
    paddingHorizontal: 10,
  },
  placeholderStyle: {
    color: colors.GRAY,
    fontSize: 14,
  },
});

