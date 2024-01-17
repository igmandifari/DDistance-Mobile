import {
  StyleSheet,
  View,
  Text,
  SafeAreaView,
  ScrollView,
} from "react-native";
import React, { useEffect, useState } from "react";
import { colors } from "../../../constant/colors";
import { useSelector } from "react-redux";
import { getNotification } from "../../../services/merchantServices";

const NotificationMerchant = ({ navigation }) => {
  const { token } = useSelector((state) => state.user);
  const [data, setData] = useState([]);

  const getDetail = async () => {
    const response = await getNotification(token);
    setData(response.data.data);
  };

  useEffect(() => {
    getDetail();
  }, []);

  return (
    <SafeAreaView style={{ marginTop: 25 }}>
      <View style={styles.container}>
        <View style={{ padding: 25, marginTop: 15, marginBottom: -35 }}>
          <Text style={{ fontWeight: "700", fontSize: 32 }}>Notifikasi</Text>
        </View>
        <View style={styles.detailContainer}>
          <ScrollView style={{ width: "100%" }}>
            <View>
              {data.map((item, index) => {
                const { title, dateTime, desc, ecolorNotif } = item;

                let bgColor, textColor;
                switch (ecolorNotif) {
                  case "GREEN":
                    bgColor = "#D2FED6";
                    textColor = colors.GREEN;
                    break;
                  case "RED":
                    bgColor = "#FFBEBE";
                    textColor = colors.RED;
                    break;
                  case "YELLOW":
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
                      backgroundColor: bgColor,
                      padding: 20,
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
                            fontSize: 20,
                            fontWeight: 600,
                            color: textColor,
                          }}
                        >
                          {title}
                        </Text>
                      </View>

                      <Text
                        style={{
                          fontSize: 11,
                          fontWeight: "600",
                          color: "black",
                          alignSelf: "flex-start",
                        }}
                      >
                        {dateTime}
                      </Text>
                    </View>
                    <View
                      style={{
                        flexDirection: "row",
                        justifyContent: "space-between",
                        marginTop: 10,
                      }}
                    >
                      <Text style={{ fontSize: 14, fontWeight: "600" }}>
                        {desc}
                      </Text>
                    </View>
                  </View>
                );
              })}
            </View>
          </ScrollView>
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
