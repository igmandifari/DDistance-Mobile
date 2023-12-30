import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  SafeAreaView,
  Image,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import React from "react";
import { colors } from "../../../constant/colors";
import CustomButton from "../../../components/CustomButton";

const vw = Dimensions.get("window").width;

const requests = [
  {
    code: "#1",
    status: "Ditolak",
  },
  {
    code: "#2",
    status: "Diterima",
  },
  {
    code: "#3",
    status: "Dalam Proses",
  },
  {
    code: "#4",
    status: "Dalam Proses",
  },
  {
    code: "#5",
    status: "Ditolak",
  },
  {
    code: "#6",
    status: "Ditolak",
  },
];

const RequestPage = ({ navigation }) => {
  return (
    <SafeAreaView style={{ marginTop: 25 }}>
      <View style={styles.container}>
        <View style={styles.headerContainer}>
          <View style={styles.headerLeft}>
            <Image
              style={{ width: 37 }}
              source={require("../../../assets/img/logo_DD.png")}
            />
            <Text style={styles.headerTitle}>D-DISTANCE</Text>
          </View>
          <TouchableOpacity onPress={() => navigation.navigate("notificationDistributor")}>
            <Image source={require("../../../assets/img/notification.png")} />
          </TouchableOpacity>
        </View>
        <View style={{ padding: 25 }}>
          <Text style={{ fontWeight: "700", fontSize: 32 }}>
            Pengajuan ke {"\n"}Danamon
          </Text>
        </View>
        <View style={styles.detailContainer}>
          <View style={{ height: "85%" }}>
            <ScrollView>
              <View style={{ gap: 10 }}>
                {requests.map((item, index) => {
                  const { status } = item;

                  let bgColor;
                  switch (status) {
                    case "Ditolak":
                      bgColor = colors.RED;
                      break;
                    case "Diterima":
                      bgColor = colors.GREEN;
                      break;
                    case "Dalam Proses":
                      bgColor = colors.YELLOW;
                      break;

                    default:
                      break;
                  }
                  return (
                    <View
                      key={index}
                      style={{
                        backgroundColor: colors.FLORAL,
                        padding: 20,
                        elevation: 10,
                        gap: 10,
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
                          <Text style={{ fontSize: 24, fontWeight: 600 }}>
                            Pengajuan
                          </Text>
                          <Text style={{ fontSize: 24, fontWeight: 600 }}>
                            {item.code}
                          </Text>
                        </View>

                        <TouchableOpacity
                          style={{
                            borderRadius: 10,
                            backgroundColor: bgColor,
                            paddingVertical: 10,
                            width: 160,
                            alignItems: "center",
                            justifyContent: "center",
                          }}
                        >
                          <Text
                            style={{
                              fontSize: 16,
                              fontWeight: 600,
                              color: colors.WHITE,
                            }}
                          >
                            {status}
                          </Text>
                        </TouchableOpacity>
                      </View>
                      <View
                        style={{
                          flexDirection: "row",
                          justifyContent: "space-between",
                        }}
                      >
                        <Text style={{ fontSize: 13, fontWeight: "600" }}>
                          08/12/2023
                        </Text>
                        <TouchableOpacity
                          onPress={() =>
                            navigation.navigate("detail-request-insurance")
                          }
                        >
                          <Text>See More</Text>
                        </TouchableOpacity>
                      </View>
                    </View>
                  );
                })}
              </View>
            </ScrollView>
          </View>
          <View
            style={{
              flex: 1,
              flexDirection: "row",
              justifyContent: "flex-end",
              alignItems: "center",
            }}
          >
            <TouchableOpacity
              onPress={() => navigation.navigate("form-request-assurance")}
              style={{
                backgroundColor: colors.ORANGE,
                height: 49,
                width: 49,
                justifyContent: "center",
                alignItems: "center",
                borderRadius: 10,
              }}
            >
              <Text
                style={{ color: colors.WHITE, fontSize: 36, fontWeight: "800" }}
              >
                +
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default RequestPage;

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.WHITE,
    justifyContent: "flex-start",
    height: "100%",
    alignContent: "center",
  },
  headerContainer: {
    backgroundColor: colors.ORANGE,
    justifyContent: "space-between",
    flexDirection: "row",
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    paddingHorizontal: 10,
    marginTop: 0,
    paddingVertical: 10,
    shadowOffset: { width: 10, height: 10 },
    shadowColor: "black",
    shadowOpacity: 1,
    elevation: 10,
  },
  headerLeft: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: "800",
    color: colors.FLORAL_WHITE,
  },
  profileContainer: {
    flexDirection: "row",
    padding: 25,
    gap: 25,
    alignItems: "center",
  },
  profile: {
    width: 120,
    height: 120,
    borderRadius: 200,
    backgroundColor: colors.GRAY,
  },
  balanceContainer: {
    flex: 1,
    gap: 8,
  },
  balance: {
    backgroundColor: colors.YELLOW,
    color: colors.WHITE,
    borderRadius: 10,
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 4,
    alignItems: "center",
    shadowColor: "#000",
    elevation: 5,
    shadowOpacity: 0.25,
  },
  button: {
    backgroundColor: colors.ORANGE,
    flexDirection: "row",
    justifyContent: "center",
    width: vw / 3.3,
    paddingVertical: 10,
    borderRadius: 10,
  },
  detailContainer: {
    flex: 1,
    backgroundColor: colors.FLORAL_WHITE,
    marginTop: 20,
    shadowRadius: 5,
    shadowOffset: {
      width: 10,
      height: -10,
    },
    shadowColor: "#000000",
    elevation: 20,
    borderTopEndRadius: 10,
    padding: 20,
  },
  detailItem: {
    backgroundColor: colors.ORANGE,
  },
});
