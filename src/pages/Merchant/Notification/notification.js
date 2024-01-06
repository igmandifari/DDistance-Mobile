import {
  StyleSheet,
  Text,
  View,
  Image,
  Icon,
  TextInput,
  SafeAreaView,
  Pressable,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import React from "react";
import { colors } from "../../../constant/colors";

const notification = [
  {
    status: "Pengajuan Invoice Ditolak",
    time: "8 Jam",
    description:
      "Pengajuan Invoice 0000001 ke Distributor A ditolak (Alasan penolakan: dokumen kurang jelas)",
  },
  {
    status: "Pembayaran Terlambat",
    time: "11 Jam",
    description:
      "Pembayaran ke Distributor A pada Invoice 0000000 dinyatakan “Terlambat” karna belum membayar tagihan periode ke 1 dari 3 bulan tenor yang jatuh tempo di tanggal 23 November 2023",
  },
  {
    status: "Pengajuan Invoice Diterima",
    time: "14 Jam",
    description: "Pengajuan Invoice 0000000 ke Distributor B telah diterima",
  },
  {
    status: "Reminder Pembayaran",
    time: "4 Hari",
    description: "Pembayaran Toko C dinyatakan Gagal.",
  },
  {
    status: "Pengajuan Jaminan Diterima",
    time: "5 Hari",
    description: "Pengajuan Jaminan ke Danamon telah diterima",
  },
  {
    status: "Pengajuan Jaminan Ditolak",
    time: "1 Minggu",
    description:
      "Pengajuan Jaminan ke Danamon ditolak (Alasan penolakan: dokumen salah)",
  },
];

const NotificationMerchant = ({ navigation }) => {
  return (
    <SafeAreaView style={{ marginTop: 25 }}>
      <View style={styles.container}>
        <View style={{ padding: 25, marginTop: 15, marginBottom: -35 }}>
          <Text style={{ fontWeight: "700", fontSize: 32 }}>Notifikasi</Text>
        </View>
        <View style={styles.detailContainer}>
          <View style={{ height: "100%", flex: 1 }}>
            <ScrollView style={{ width: "100%" }}>
              <View>
                {notification.map((item, index) => {
                  const { status } = item;

                  let bgColor, textColor;
                  switch (true) {
                    case status.includes("Diterima"):
                      bgColor = "#D2FED6";
                      textColor = colors.GREEN;
                      break;
                    case status.includes("Ditolak") ||
                      status.includes("Terlambat"):
                      bgColor = "#FFBEBE";
                      textColor = colors.RED;
                      break;
                    case status.includes("Reminder"):
                      bgColor = "#FFDB92";
                      textColor = colors.YELLOW;
                      break;
                    default:
                      bgColor = colors.FLORAL;
                      textColor = colors.BLACK;
                      break;
                  }
                  return (
                    <View
                      key={index}
                      style={{
                        backgroundColor: colors.FLORAL,
                        padding: 20,
                        backgroundColor: bgColor,
                        height: 115,
                        elevation: 100,
                        width: "100%",
                      }}
                    >
                      <View
                        style={{
                          flexDirection: "row",
                          justifyContent: "space-between",
                          alignItems: "flex-start",
                        }}
                      >
                        <View style={{ alignItems: "center" }}>
                          <Text
                            style={{
                              fontSize: 18,
                              fontWeight: 600,
                              color: textColor,
                            }}
                          >
                            {item.status}
                          </Text>
                        </View>

                        <Text
                          style={{
                            fontSize: 10,
                            fontWeight: "600",
                            color: colors.GRAY,
                            alignSelf: "flex-start",
                          }}
                        >
                          {item.time}
                        </Text>
                      </View>
                      <View
                        style={{
                          flexDirection: "row",
                          justifyContent: "space-between",
                          marginTop: 10,
                        }}
                      >
                        <Text style={{ fontSize: 10, fontWeight: "600" }}>
                          {item.description}
                        </Text>
                      </View>
                    </View>
                  );
                })}
              </View>
            </ScrollView>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default NotificationMerchant;

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.WHITE,
    justifyContent: "flex-start",
    height: "100%",
    alignContent: "center",
  },
  detailContainer: {
    flex: 1,
    backgroundColor: "#FFFAED",
    marginTop: 20,
    shadowRadius: 5,
    shadowOffset: {
      width: 10,
      height: -10,
    },
    shadowColor: "#000000",
    elevation: 20,
    borderTopEndRadius: 10,
  },
  detailItem: {
    backgroundColor: colors.ORANGE,
  },
});
