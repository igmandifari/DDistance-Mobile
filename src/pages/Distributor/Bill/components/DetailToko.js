import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
} from "react-native";
import { colors } from "../../../../constant/colors";
import { detailListInvoice } from "./data";
import { Button } from "react-native-elements";

const DetailToko = ({ navigation, route }) => {
  const {
    details: { id, address, phoneNumber, email },
  } = route.params;
  const [filter, setFilter] = useState("");
  const [data, setData] = useState(detailListInvoice);
  const [isProfileVisible, setIsProfileVisible] = useState(true);

  const filterTypes = [
    {
      name: "Lancar",
    },
    {
      name: "Tidak Lancar",
    },
    {
      name: "Gagal",
    },
  ];

  const handleChangeFilter = (name) => {
    setFilter(name);
  };

  useEffect(() => {
    if (!filter) {
      setData(detailListInvoice);
      return;
    }
    const filtered = detailListInvoice.filter((item) => item.status === filter);
    setData(filtered);
  }, [filter]);

  const handleToggleProfile = () => {
    setIsProfileVisible((prev) => !prev);
  };

  return (
    <SafeAreaView style={{ marginTop: 25 }}>
      <View style={styles.container}>
        {isProfileVisible && (
          <View id="profile" style={{}}>
            <View style={styles.profileContainer}>
              <Button title={"test"} onPress={() => console.log(details)} />
              <Text
                style={{
                  fontSize: 32,
                  fontWeight: "700",
                  borderBottomWidth: StyleSheet.hairlineWidth,
                }}
              >
                Distributor A
              </Text>
              <Text>ID Toko: {id}</Text>
              <Text>Alamat: {address}</Text>
              <Text>No Telp: {phoneNumber}</Text>
              <Text>Email: {email}</Text>
              <View style={{ alignItems: "center" }}>
                <TouchableOpacity onPress={handleToggleProfile}>
                  <Text
                    style={{
                      color: colors.LIGHT_ORANGE,
                      fontSize: 16,
                      fontWeight: 700,
                    }}
                  >
                    Hide
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        )}
        {!isProfileVisible && (
          <View style={{ alignItems: "center", marginVertical: 10 }}>
            <TouchableOpacity onPress={handleToggleProfile}>
              <Text
                style={{
                  color: colors.LIGHT_ORANGE,
                  fontSize: 16,
                  fontWeight: 700,
                }}
              >
                Show
              </Text>
            </TouchableOpacity>
          </View>
        )}
        <View id="list-merchant" style={styles.listContainer}>
          <View>
            <View>
              <Text>Sisa Limitmu:</Text>
              <Text>Rp. 70.000.0000/100/000/000</Text>

              <View style={styles.progressBar}></View>
            </View>
          </View>
          <ScrollView>
            <View id="merchants" style={styles.merchantContainer}>
              {data.map((distributor, index) => {
                const { InvoiceNo, month, status, total } = distributor;

                let bgColor;
                switch (status) {
                  case "Sudah Bayar":
                    bgColor = colors.GREEN;
                    break;
                  case "Belum Bayar":
                    bgColor = colors.YELLOW_STATUS;
                    break;
                  case "Gagal":
                    bgColor = colors.RED;
                    break;
                }

                return (
                  <View key={index} style={styles.item}>
                    <View style={{ height: "100%", flex: 1, gap: 5 }}>
                      <Text style={{ fontSize: 15, fontWeight: "700" }}>
                        Invoice {InvoiceNo}
                      </Text>
                      <View
                        style={{
                          flexDirection: "row",
                          justifyContent: "space-between",
                        }}
                      >
                        <Text style={{ fontSize: 14, fontWeight: "700" }}>
                          {month}
                        </Text>
                        <Text style={{ fontSize: 14, fontWeight: "600" }}>
                          {total}
                        </Text>
                      </View>
                      <View
                        style={{
                          flexDirection: "row",
                          justifyContent: "space-between",
                        }}
                      >
                        <Text style={{ fontSize: 14 }}>Status :</Text>
                        <View
                          style={{
                            width: 120,
                            borderRadius: 10,
                            backgroundColor: bgColor,
                            flexDirection: "row",
                            justifyContent: "center",
                            paddingVertical: 5,
                          }}
                        >
                          <TouchableOpacity
                            onPress={() =>
                              navigation.navigate("history-bill-distributor")
                            }
                          >
                            <Text
                              style={{
                                fontSize: 16,
                                fontWeight: "600",
                                color: "white",
                              }}
                            >
                              {status}
                            </Text>
                          </TouchableOpacity>
                        </View>
                      </View>
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

export default DetailToko;

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.WHITE,
    justifyContent: "flex-start",
    height: "100%",
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
    flexDirection: "col",
    padding: 25,
    gap: 5,
  },
  profile: {
    width: 68,
    height: 68,
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
  listContainer: {
    backgroundColor: "#FFFAED",
    gap: 20,
    flex: 1,
    padding: 15,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    shadowOffset: { width: 4, height: 4 },
    shadowColor: "#000",
    shadowOpacity: 1,
    elevation: 20,
  },
  searchContainer: {
    flexDirection: "row",
    gap: 5,
    alignItems: "center",
    backgroundColor: colors.WHITE,
    paddingHorizontal: 15,
    paddingVertical: 3,
    borderRadius: 30,
    elevation: 4,
  },
  search: {
    color: colors.GRAY,
  },
  filterContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginTop: 20,
  },
  filter: {
    backgroundColor: colors.WHITE,
    paddingHorizontal: 30,
    paddingVertical: 5,
    borderRadius: 15,
    elevation: 5,
  },
  merchantContainer: {
    gap: 20,
    padding: 3,
    // backgroundColor:'red',
  },
  item: {
    backgroundColor: colors.FLORAL,
    borderRadius: 5,
    elevation: 5,
    flexDirection: "row",
    padding: 12,
    alignItems: "center",
    gap: 5,
    position: "relative",
  },
  city: {
    position: "absolute",
    top: -4,
    right: -2,
    fontSize: 12,
  },
});
