import { StyleSheet, Text, View } from "react-native";
import React from "react";
import SuccessIcon from "../../../../assets/img/popUpSuccess.svg";

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

const TenorSuccessSetting = () => {
  return (
    <View>
      <Text>Pengaturan Tenor #376</Text>
      <View
        style={{
          borderBottomColor: "black",
          borderWidth: 2,
          elevation: 2,
        }}
      />
      <SuccessIcon />
      <Text>Atur Cicilan Berhasil</Text>
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
          backgroundColor: colors.WHITE,
          borderColor: colors.GRAY,
          borderWidth: 1,
          padding: 25,
          borderRadius: 10,
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

export default TenorSuccessSetting;

const styles = StyleSheet.create({});
