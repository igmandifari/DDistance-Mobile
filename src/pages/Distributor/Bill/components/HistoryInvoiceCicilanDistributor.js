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
// import { historyList2 } from "./data";
import { useSelector } from "react-redux";
import { getDetailInvoiceId } from "../../../../services/merchantServices";

const HistoryInvoiceCicilanDistributor = ({ navigation, route }) => {
  const [filter, setFilter] = useState("");
  const { token } = useSelector((state) => state.user);
  const [data, setData] = useState([]);
  const [isProfileVisible, setIsProfileVisible] = useState(true);
  const { idInvoice } = route.params;
  console.log("id invoice", idInvoice);

  const getDetail = async () => {
    const response = await getDetailInvoiceId(token, idInvoice);
    setData(response.data.data);
  };
  console.log("cek data", data);

  const handleChangeFilter = (name) => {
    setFilter(name);
  };

  useEffect(() => {
    getDetail();
  }, []);

  const handleToggleProfile = () => {
    setIsProfileVisible((prev) => !prev);
  };

  return (
    <SafeAreaView style={{ marginTop: 25 }}>
      <View style={styles.container}>
        {isProfileVisible && (
          <View id="profile" style={{}}>
            <View style={styles.profileContainer}>
              <Text style={{ fontSize: 32, fontWeight: "700" }}>
                Distributor A
              </Text>
            </View>
          </View>
        )}
        <View id="list-merchant" style={styles.listContainer}>
          <View>
            <View>
              <Text style={{ fontSize: 20, fontWeight: 400 }}>
                Riwayat Cicilan Invoice
              </Text>
            </View>
          </View>
          <ScrollView>
            <View id="merchants" style={styles.merchantContainer}>
              {data.map((distributor, index) => {
                const {
                  InvoiceNo,
                  sisaTagihan,
                  tanggalFaktur,
                  statusPembayaran,
                  paymentAmount,
                  paymentTo,
                } = distributor;

                let bgColor;
                let textStatus;
                {
                  /* let isButtonDisabled = false; */
                }
                switch (statusPembayaran) {
                  case true:
                    bgColor = colors.GREEN;
                    textStatus = "Tepat Waktu";
                    break;
                  case false:
                    bgColor = colors.YELLOW_STATUS;
                    textStatus = "Terlambat";
                    break;
                  case null:
                    bgColor = colors.BUTTON_ORANGE;
                    textStatus = "Belum Bayar";
                    break;
                  case "Atur Tenor":
                    bgColor = colors.BUTTON_ORANGE;
                    break;
                }

                return (
                  <View key={index} style={styles.item}>
                    <View style={{ height: "100%", flex: 1 }}>
                      <View
                        style={{
                          flexDirection: "row",
                          justifyContent: "space-between",
                          alignItems: "center",
                        }}
                      >
                        {statusPembayaran === "Atur Tenor" ? (
                          <>
                            <Text
                              style={{
                                fontSize: 15,
                                fontWeight: "700",
                                flex: 1,
                              }}
                            >
                              Total Tagihan
                            </Text>
                            <Text style={{ fontSize: 20, fontWeight: "600" }}>
                              {sisaTagihan}
                            </Text>
                          </>
                        ) : (
                          <>
                            <Text style={{ fontSize: 15, fontWeight: "700" }}>
                              Cicilan {paymentTo}/{paymentAmount}
                            </Text>
                            <Text style={{ fontSize: 20, fontWeight: "600" }}>
                              {sisaTagihan}
                            </Text>
                          </>
                        )}
                      </View>
                      <View style={{ alignItems: "start" }}>
                        {statusPembayaran === "Atur Tenor" && (
                          <Text
                            style={{
                              fontSize: 15,
                              fontWeight: "700",
                              color: colors.ORANGE,
                            }}
                          >
                            Jatuh Tempo Pilih Tenor:
                          </Text>
                        )}
                        {/* <Text style={{ fontSize: 14, color: colors.BUTTON_ORANGE }}>{date}</Text> */}
                      </View>
                      <View
                        style={{
                          flexDirection: "row",
                          justifyContent: "space-between",
                        }}
                      >
                        <View style={{ alignItems: "center" }}>
                          {statusPembayaran === "Bayar" && (
                            <Text
                              style={{
                                fontSize: 15,
                                fontWeight: "700",
                                color: colors.ORANGE,
                              }}
                            >
                              Jatuh Tempo :
                            </Text>
                          )}
                          <Text
                            style={{
                              fontSize: 14,
                            }}
                          >
                            {tanggalFaktur}
                          </Text>
                        </View>
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
                          <TouchableOpacity>
                            <Text
                              style={{
                                fontSize: 16,
                                fontWeight: "600",
                                color: "white",
                              }}
                            >
                              {textStatus}
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

          <View
            style={{
              alignItems: "center",
              alignContent: "flex-end",
            }}
          >
            <TouchableOpacity
              onPress={() =>
                navigation.navigate("invoice-distributor", {
                  idInvoice: idInvoice,
                })
              }
              style={{
                backgroundColor: colors.ORANGE,
                height: 32,
                width: 150,
                justifyContent: "center",
                alignItems: "center",
                borderRadius: 10,
                elevation: 3,
              }}
            >
              <Text
                style={{ color: colors.WHITE, fontSize: 16, fontWeight: "600" }}
              >
                Lihat Invoice
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default HistoryInvoiceCicilanDistributor;

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
    gap: 30,
    flex: 1,
    padding: 15,
    backgroundColor: "#FFFAED",
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
    // backgroundColor:'red',
  },
  item: {
    borderRadius: 5,
    flexDirection: "row",
    padding: 12,
    alignItems: "center",
    gap: 5,
    position: "relative",
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
  city: {
    position: "absolute",
    top: -4,
    right: -2,
    fontSize: 12,
  },
});
