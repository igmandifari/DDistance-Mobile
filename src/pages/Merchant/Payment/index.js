import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
} from "react-native";
import React, { useState, useMemo, useRef, useEffect } from "react";
import { colors } from "../../../constant/colors";
import CustomButton from "../../../components/CustomButton";
import { Dropdown } from "react-native-element-dropdown";
import { BottomSheet } from "react-native-sheet";
import SuccessIcon from "../../../assets/img/popUpSuccess.svg";
import BillIcon from "../../../assets/img/bill.svg";
import {
  cekTagihan,
  getDetailTagihan,
} from "../../../services/merchantServices";
import { useSelector } from "react-redux";
const data = [
  { label: "3 Bulan", value: 3 },
  { label: "6 Bulan", value: 6 },
  { label: "12 Bulan", value: 12 },
  { label: "Lunas", value: 1 },
];

const TenorSetting = ({ navigation, route }) => {
  const { token } = useSelector((state) => state.user);
  const { isSuccess } = route.params;
  const sheetSuccess = useRef(null);
  const sheetPay = useRef(null);
  const [value, setValue] = useState(null);
  const [isFocus, setIsFocus] = useState(false);
  const [detail, setDetail] = useState({
    id: "",
    merchantName: "",
    date: "",
    distributorName: "",
    expiredDate: "",
    totalTagihan: "",
  });

  const handleSubmitTenor = () => {
    if (!value) {
      alert("tenor must be not null");
      return;
    }
    navigation.navigate("otp-tenor");
    return;
  };

  if (isSuccess) {
    sheetSuccess.current.show();
  }

  const getData = async () => {
    const response = await getDetailTagihan(token);
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
      merchantName: namaToko,
      distributorName: namaDistributor,
      expiredDate: tanggalJatuhTempo,
      totalTagihan: jumlahTagihan,
      date: tanggalTagihan,
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
      value: detail.id,
    },
    {
      key: "Tanggal Faktur:",
      value: detail.date,
    },
    {
      key: "Nama Toko",
      value: detail.merchantName,
    },
    {
      key: "Nama Distributor:",
      value: detail.distributorName,
    },
    {
      key: "Tanggal Jatuh Tempo",
      value: detail.expiredDate,
    },
  ];

  const handleCekTagihan = async () => {
    const bodyRequest = {
      id: "ff8081818cfeaf98018cfeafae7f0007",
      tenor: value,
    };
    const response = await cekTagihan(token, bodyRequest);
    console.log(response);
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
          <SuccessTenorSetting />
        </BottomSheet>
        <TouchableOpacity onPress={() => sheetPay.current.show()}>
          <Text>open shet pay</Text>
        </TouchableOpacity>
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
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
            }}
          >
            <Text style={styles.text2}>Total Tagihan</Text>
            <Text style={styles.text2}>10.00.00</Text>
          </View>
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
          <Text style={[styles.text2, styles.textCenter]}>
            Bunga 2.00% (Gross Per Tahun)
          </Text>
          <Text style={[styles.textCenter, styles.text2, { marginTop: 15 }]}>
            Total Rp. 10.100.000
          </Text>
          <Text style={[styles.textCenter, { fontSize: 24 }]}>
            Rp. 1.683.333 per Bulan
          </Text>
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
    fontSize: 16,
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

const SuccessTenorSetting = () => {
  return (
    <View>
      <Text style={{ fontSize: 24, fontWeight: "700" }}>
        Pengaturan Tenor #376
      </Text>
      <View
        style={{
          marginTop: 10,
          borderBottomColor: "black",
          borderWidth: 2,
          elevation: 2,
        }}
      />
      <View style={{ alignItems: "center", padding: 10 }}>
        <SuccessIcon />
        <Text style={{ fontSize: 20, fontWeight: "700" }}>
          Atur Cicilan Berhasil
        </Text>
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
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
          }}
        >
          <Text style={styles.text2}>Total Tagihan</Text>
          <Text style={styles.text2}>10.00.00</Text>
        </View>
      </View>
      <View
        style={{
          marginTop: 20,
          backgroundColor: colors.WHITE,
          borderColor: colors.GRAY,
          borderWidth: 1,
          padding: 15,
          borderRadius: 20,
        }}
      >
        <Text style={[styles.text2, styles.textCenter, { fontSize: 24 }]}>
          Tanggal Jatuh Tempo
        </Text>
        <Text style={[styles.text2, styles.textCenter, { fontSize: 24 }]}>
          15/12/2023
        </Text>
        <Text style={[styles.text2, styles.textCenter, { fontSize: 24 }]}>
          Rp. 1.683.333 per Bulan
        </Text>
      </View>
    </View>
  );
};
