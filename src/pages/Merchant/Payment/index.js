import { SafeAreaView, StyleSheet, Text, View } from "react-native";
import React, { useState, useMemo } from "react";
import { colors } from "../../../constant/colors";
import BillIcon from "../../../assets/img/bill.svg";
import CustomButton from "../../../components/CustomButton";
import { Dropdown } from "react-native-element-dropdown";
// import BottomSheet from "@gorhom/bottom-sheet";

const data = [
  { label: "Item 1", value: "1" },
  { label: "Item 2", value: "2" },
  { label: "Item 3", value: "3" },
  { label: "Item 4", value: "4" },
  { label: "Item 5", value: "5" },
  { label: "Item 6", value: "6" },
  { label: "Item 7", value: "7" },
  { label: "Item 8", value: "8" },
];

const TenorSetting = ({ navigation }) => {
  // // ref
  // const bottomSheetRef = useRef < BottomSheet > null;

  // variables
  const snapPoints = useMemo(() => ["25%", "50%"], []);

  // // callbacks
  // const handleSheetChanges = useCallback((index) => {
  //   console.log("handleSheetChanges", index);
  // }, []);
  const [value, setValue] = useState(null);
  const [isFocus, setIsFocus] = useState(false);
  const details = [
    {
      key: "No. Faktur:",
      value: "1234567890-",
    },
    {
      key: "Tanggal Faktur:",
      value: "08/09/2023",
    },
    {
      key: "Nama Toko",
      value: "Toko A",
    },
    {
      key: "Nama Distributor:",
      value: "Distributor A",
    },
    {
      key: "Tanggal Jatuh Tempo",
      value: "08/12/2023",
    },
  ];

  return (
    <SafeAreaView style={{ marginTop: 25, height: "100%" }}>
      <View style={styles.container}>
        <Text style={{ fontWeight: "700", fontSize: 32 }}>
          Pengaturan Tenor
        </Text>
        <View
          style={{
            borderBottomColor: "black",
            borderWidth: 2,
            elevation: 2,
            borderBottomWidth: StyleSheet.hairlineWidth,
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
            // renderLeftIcon={() => (
            //   <AntDesign
            //     style={styles.icon}
            //     color={isFocus ? "blue" : "black"}
            //     name="Safety"
            //     size={20}
            //   />
            // )}
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
        <CustomButton text={"Cek Tagihan + Bunga / Bulan"} />
        <CustomButton
          text={"Lanjut"}
          bgColor={colors.GREEN}
          handleClick={() => navigation.navigate("otp-tenor")}
        />
        <BottomSheet
          // ref={bottomSheetRef}
          index={1}
          // snapPoints={snapPoints}
          onChange={handleSheetChanges}
        >
          <View style={styles.contentContainer}>
            <Text>Awesome 🎉</Text>
          </View>
        </BottomSheet>
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
