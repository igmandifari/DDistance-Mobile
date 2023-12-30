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
    status: "Pembayaran Gagal",
    time: "14 Jam",
    description: "Pembayaran Toko C dinyatakan Gagal.",
  },
  {
    status: "Pending Approval",
    time: "11 Jam",
    description:
      "Toko A mengirimkan Invoice 00000000 untuk dilakukan persetujuan.",
  },
  {
    status: "Pembayaran oleh Danamon.",
    time: "11 Jam",
    description: "Pembayaran Toko C dinyatakan Gagal.",
  },
  {
    status: "Pembayaran oleh Danamon",
    time: "14 Jam",
    description: "Pembayaran Toko C dinyatakan Gagal.",
  },
];

const NotificationDistributor = ({ navigation }) => {
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
                  switch (status) {
                    case "Pembayaran Gagal":
                      bgColor = "#FFBEBE";
                      textColor = colors.RED;
                      break;
                    case "Pembayaran oleh Danamon":
                      bgColor = "#D2FED6";
                      textColor = colors.GREEN;
                      break;
                    case "Pembayaran oleh Danamon.":
                      bgColor = "#FFFAED";
                      textColor = colors.GREEN;
                      break;
                    case "Pending Approval":
                      bgColor = "#FFDB92";
                      textColor = colors.YELLOW;
                      break;

                    default:
                      break;
                  }
                  return (
                    <View
                      key={index}
                      style={{
                        backgroundColor: colors.FLORAL,
                        padding: 25,
                        backgroundColor: bgColor,
                        height: 111,
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
                            alignSelf: 'flex-start'
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

export default NotificationDistributor;

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
