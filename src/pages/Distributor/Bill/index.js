import {
  StyleSheet,
  Text,
  View,
  Image,
  Icon,
  TextInput,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
  Dimensions,
} from "react-native";
import React, { useEffect, useState } from "react";
import { colors } from "../../../constant/colors";
import { distributorList,historyList } from "./components/data";

const vw = Dimensions.get("window").width;

// const [isActive, setIsActive] = useState(false);

// const handleClick = () => {
//   setIsActive(!isActive);
// };

const BillDistributor = ({ navigation }) => {
  const [filter, setFilter] = useState("Pending");
  const [data, setData] = useState(distributorList);

  const handleFilterChange = (selectedFilter) => {
    setFilter(selectedFilter);
    setData(selectedFilter === "Pending" ? distributorList : historyList);
  };

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
          <View>
            <Image
              source={require("../../../assets/img/notification.png")}
              style={{}}
            />
          </View>
        </View>
        <View style={{ padding: 25 }}>
          <Text style={{ fontWeight: "700", fontSize: 20 }}>
            Persetujuan Invoice
          </Text>
        </View>
        <View style={styles.detailContainer}>
          <View style={styles.menuBar}>
          <TouchableOpacity
            onPress={() => handleFilterChange("Pending")}
            style={[styles.menuBarItem, filter === "Pending" && styles.activeFilter]}
          >
            <Text style={{fontSize:15,fontWeight:700,}}>Pending </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => handleFilterChange("History")}
            style={[styles.menuBarItem, filter === "History" && styles.activeFilter]}
          >
            <Text style={{fontSize:15,fontWeight:700,}}>History</Text>
          </TouchableOpacity>
          </View>
          <View style={{ height: "100%" }}>
            <ScrollView>
              <View style={{ gap: 10 }}>
                {data.map((item, index) => {
                  const {
                    name,
                    store,
                    invoiceNo,
                    date,
                    status,
                    amount,
                    rejected,
                  } = item;

                  let bgColor;
                  switch (status) {
                    case "Ditolak":
                      bgColor = colors.RED;
                      break;
                    case "Diterima":
                      bgColor = colors.GREEN;
                      break;
                    case "Pending":
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
                        <View style={{}}>
                          <Text style={{ fontSize: 24, fontWeight: 600 }}>
                            {name} {invoiceNo}
                          </Text>
                          <Text style={{ fontSize: 13, fontWeight: "600" }}>
                            {date}
                          </Text>
                        </View>
                        <View style={{}}>
                          <TouchableOpacity
                            onPress={() =>
                              navigation.navigate("detail-invoice")
                            }
                          >
                            <Text style={{ textAlign: "right" }}>{store}</Text>
                            <Text style={{ fontSize: 20, fontWeight: 600 }}>
                              {amount}
                            </Text>
                          </TouchableOpacity>
                        </View>
                      </View>
                      <View
                        style={{
                          flexDirection: "row",
                          justifyContent: "space-between",
                        }}
                      >
                        <View>
                          <Text>Otomatis DItolak:</Text>
                          <Text style={{color:"red"}}>{rejected}</Text>
                        </View>

                        <TouchableOpacity
                         onPress={() =>
                              navigation.navigate("detail-invoice-distributor")
                          }
                          style={{
                            borderRadius: 10,
                            backgroundColor: bgColor,
                            paddingVertical: 10,
                            width: 160,
                            alignItems: "center",
                            justifyContent: "center",
                          }}
                        >
                          <Text style={{ fontSize: 16, fontWeight: 600,color:"white" }}>
                            {status}
                          </Text>
                        </TouchableOpacity>
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

export default BillDistributor;

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
  menuBar: {
    flexDirection: "row",
    fontSize:15,
    fontWeight:700,
  },
});
