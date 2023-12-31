import { Text, StyleSheet, View, SafeAreaView, ScrollView } from "react-native";
import React, { Component } from "react";
import { colors } from "../../../constant/colors";

const history = [
  {
    title: "Auto Credit",
    subTitle: "Invoice - 00000000",
    date: "22/11/2023",
    submission: "Rp. 50,000,000",
  },
  {
    title: "Auto Credit",
    subTitle: "Invoice - 00000001",
    date: "26/11/2023",
    submission: "Rp. 30,000,000",
  },
  {
    title: "Auto Credit",
    subTitle: "Invoice - 00000002",
    date: "27/11/2023",
    submission: "Rp. 35,000,000",
  },
  {
    title: "Reminder Pembayaran",
    subTitle: "4 Hari",
    date: "22/11/2023",
    submission: "Rp. 35,000,000",
  },
  {
    title: "Pengajuan Jaminan Diterima",
    subTitle: "5 Hari",
    date: "22/11/2023",
    submission: "Rp. 35,000,000",
  },
  {
    title: "Pengajuan Jaminan Ditolak",
    subTitle: "1 Minggu",
    date: "22/11/2023",
    submission: "Rp. 35,000,000",
  },
];

export default class CreditHistory extends Component {
  render() {
    return (
      <SafeAreaView style={{ marginTop: 25 }}>
        <View style={styles.container}>
          <View style={{ padding: 25, marginTop: 15, marginBottom: -35 }}>
            <Text style={{ fontWeight: "700", fontSize: 32 }}>
              Credit History
            </Text>
          </View>

          <View style={styles.detailContainer}>
            <View style={{ height: "100%", flex: 1 }}>
              <ScrollView style={{ width: "100%" }}>
                <View>
                  {history.map((item, index) => {
                    // const { status } = item;

                    // let bgColor, textColor;
                    // switch (true) {
                    //   case status.includes("Diterima"):
                    //     bgColor = "#D2FED6";
                    //     textColor = colors.GREEN;
                    //     break;
                    //   case status.includes("Ditolak") ||
                    //     status.includes("Terlambat"):
                    //     bgColor = "#FFBEBE";
                    //     textColor = colors.RED;
                    //     break;
                    //   case status.includes("Reminder"):
                    //     bgColor = "#FFDB92";
                    //     textColor = colors.YELLOW;
                    //     break;
                    //   default:
                    //     bgColor = colors.FLORAL;
                    //     textColor = colors.BLACK;
                    //     break;
                    // }
                    return (
                      <View
                        key={index}
                        style={{
                          backgroundColor: colors.FLORAL,
                          padding: 20,
                          backgroundColor: "#FFFAED",
                          height: 115,
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
                              }}
                            >
                              {item.title}
                            </Text>
                          </View>
                        </View>
                        <View
                          style={{
                            flexDirection: "row",
                            justifyContent: "space-between",
                          }}
                        >
                          <Text
                            style={{
                              fontSize: 15,
                              fontWeight: "600",
                              alignSelf: "flex-start",
                            }}
                          >
                            {item.subTitle}
                          </Text>

                          <Text style={{ fontSize: 20, fontWeight: "450" }}>
                            {item.submission}
                          </Text>
                        </View>
                        <Text
                          style={{
                            fontSize: 13,
                            fontWeight: 450,
                          }}
                        >
                          {item.date}
                        </Text>
                        <View
                            style={{
                              borderBottomWidth: 1,
                              marginVertical: 10,
                            }}
                          >
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
  }
}

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
