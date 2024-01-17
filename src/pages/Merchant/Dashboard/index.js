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
  BackHandler,
} from "react-native";
import React, { useEffect, useState } from "react";
import { colors } from "../../../constant/colors";
import { distributorList } from "./data";
import { getDistributorsDashboard } from "../../../services/merchantServices";
import { useSelector } from "react-redux";
import { getUserMerchant } from "../../../services/AuthService";
import { useDispatch } from "react-redux";
import { setUser } from "../../../store/userSlice";
import { Button } from "react-native-elements";

const DashboardMerchant = ({ navigation }) => {

  useEffect(() => {
    const backHandler = BackHandler.addEventListener(
      "hardwareBackPress",
      () => {
        navigation.navigate("dashboard-merchant");
        return true;
      }
    );

    return () => {
      backHandler.remove();
    };
  }, [navigation]);
  const dispatch = useDispatch();
  const [userDetail, setUserDetail] = useState({
    name: null,
    balance: null,
    limit: null,
  });
  const { name, balance, limit } = userDetail;
  const { token } = useSelector((state) => state.user);
  const [distributors, setDistributors] = useState([]);
  const [filter, setFilter] = useState("");

  const filterTypes = [
    {
      name: "Lancar",
      value: "LANCAR",
    },
    {
      name: "Tidak Lancar",
      value: "TIDAK_LANCAR",
    },
    {
      name: "Gagal",
      value: "GAGAL",
    },
  ];

  useEffect(() => {
    const getData = async (token) => {
      const { data } = await getDistributorsDashboard(token);
      setDistributors(data.data);
    };

    getData(token);
  }, []);

  useEffect(() => {
    const fetchDataUser = async () => {
      try {
        const { data } = await getUserMerchant(token);
        dispatch(setUser({ user: data.data }));
        setUserDetail({
          ...data.data,
        });
      } catch (error) {
        alert(error);
      }
    };

    fetchDataUser();
  }, []);
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
            <TouchableOpacity
              onPress={() => navigation.navigate("notificationMerchant")}
            >
              <Image source={require("../../../assets/img/notification.png")} />
            </TouchableOpacity>
          </View>
        </View>
        <View id="profile" style={styles.profileContainer}>
          <View style={styles.profile}></View>
          <View style={styles.balanceContainer}>
            <Text
              style={{
                color: colors.LIGHT_ORANGE,
                fontWeight: "700",
                fontSize: 16,
              }}
            >
              Halo,
              <Text style={{ fontSize: 20, color: colors.ORANGE }}>{name}</Text>
            </Text>
            <View style={styles.balance}>
              <Text
                style={{ fontSize: 16, fontWeight: "700", color: colors.WHITE }}
              >
                Rp {balance || "unknown"}
              </Text>
              <Image source={require("../../../assets/img/View.png")} />
            </View>
            <View>
              <Text>Sisa Limit: Rp. {limit || "unknown"}</Text>
              <View style={styles.progressBar}></View>
            </View>
          </View>
        </View>
        <View id="list-merchant" style={styles.listContainer}>
          <View>
            <Text style={{ fontSize: 20, marginBottom: 10 }}>
              Daftar Distributor
            </Text>
            <View style={styles.searchContainer}>
              <Image source={require("../../../assets/img/Search.png")} />
              <TextInput
                style={styles.search}
                placeholder="Nama distributor"
                underlineColorAndroid="transparent"
              />
            </View>
            <View style={styles.filterContainer}>
              {filterTypes.map((item, index) => (
                <TouchableOpacity
                  onPress={() => {
                    if (item.value == filter) {
                      setFilter("");
                    } else {
                      setFilter(item.value);
                    }
                  }}
                  key={index}
                  style={styles.filter}
                >
                  <Text>{item.name}</Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>
          <ScrollView>
            <View id="merchants" style={styles.merchantContainer}>
              {distributors
                .filter((item) => !filter || filter === item.status)
                .map((distributor, index) => {
                  const { name, address, status, tagihan, id } = distributor;
                  console.log(distributor);

                  let bgColor;
                  switch (status) {
                    case "LANCAR":
                      bgColor = colors.GREEN;
                      break;
                    case "TIDAK LANCAR":
                      bgColor = colors.YELLOW_STATUS;
                      break;
                    case "GAGAL":
                      bgColor = colors.RED;
                      break;
                  }

                  return (
                    <TouchableOpacity
                      key={index}
                      onPress={() =>
                        navigation.navigate("detail-distributor-merchant", {
                          idDistributor: id,
                          detail: distributor,
                        })
                      }
                    >
                      <View key={index} style={styles.item}>
                        <View
                          style={{
                            width: 65,
                            height: 65,
                            backgroundColor: colors.GRAY,
                            borderRadius: 100,
                          }}
                        ></View>
                        <View
                          style={{
                            height: "100%",
                            flex: 1,
                            gap: 5,
                          }}
                        >
                          <Text style={styles.city}>{address}</Text>
                          <Text
                            style={{
                              fontSize: 15,
                              fontWeight: "700",
                            }}
                          >
                            {name}
                          </Text>
                          <View
                            style={{
                              flexDirection: "row",
                              justifyContent: "space-between",
                            }}
                          >
                            <Text
                              style={{
                                fontSize: 14,
                                fontWeight: "700",
                              }}
                            >
                              Jumlah Tagihan
                            </Text>
                            <Text
                              style={{
                                fontSize: 14,
                                fontWeight: "600",
                                color: "rgba(0,0,0,0.25)",
                              }}
                            >
                              Rp. {tagihan}
                            </Text>
                          </View>
                          <View
                            style={{
                              flexDirection: "row",
                              justifyContent: "space-between",
                            }}
                          >
                            <Text
                              style={{
                                fontSize: 10,
                              }}
                            >
                              Status Pembayaran
                            </Text>
                            <View
                              style={{
                                width: 120,
                                bgColor: "red",
                                borderRadius: 15,
                                backgroundColor: bgColor,
                                flexDirection: "row",
                                justifyContent: "center",
                                paddingVertical: 5,
                              }}
                            >
                              <TouchableOpacity
                              // onPress={() =>
                              //   navigation.navigate(
                              //     "detail-distributor-merchant"
                              //   )
                              // }
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
                    </TouchableOpacity>
                  );
                })}
            </View>
          </ScrollView>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default DashboardMerchant;

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.FLORAL,
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
    flexDirection: "row",
    padding: 25,
    gap: 25,
    alignItems: "center",
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
    backgroundColor: colors.WHITE,
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
