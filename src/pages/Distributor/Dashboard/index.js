import {
  StyleSheet,
  Text,
  View,
  Image,
  TextInput,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import React, { useState } from "react";
import { colors } from "../../../constant/colors";
import { Button } from "react-native-elements/dist/buttons/Button";
import { useSelector,useDispatch } from "react-redux";
import { useEffect } from "react";
import { getMerchantsDashboard } from "../../../services/distributorService";
import { getUserDistributor } from "../../../services/AuthService";
import { formatIDRCurrency } from "../../../utils/formatIdr";
import { useIsFocused } from "@react-navigation/native";
import Icon from "react-native-vector-icons/FontAwesome";

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

const DashboardDistributor = ({ navigation }) => {
  const dispatch = useDispatch();
  const { token } = useSelector((state) => state.user);
  const [filter, setFilter] = useState("");
  const [merchants, setMerchants] = useState([]);
  const isFocused = useIsFocused();
  const [showBalance, setShowBalance] = useState(false);
  const getData = async () => {
    const response = await getMerchantsDashboard(token);
    console.log(response.data.data);
    if (response.data) {
      setMerchants(response.data.data);
    }
  };
  const handleShowBalance = () => {
    setShowBalance(!showBalance);
  }

  useEffect(() => {
    if (isFocused) {
      getData();
    }
  }, [isFocused]);

  const [userDetail, setUserDetail] = useState({
    name: null,
    belance: null,
    limit: null,
  });
  const { name, belance, limit } = userDetail;
  useEffect(() => {
    const fetchDataUser = async () => {
      try {
        const { data } = await getUserDistributor(token);
        setUserDetail(data.data);
        console.log("Halo", data.data);
      } catch (error) {
        alert(error);
      }
    };

    fetchDataUser();
  }, [isFocused]);
  return (
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
            onPress={() => navigation.navigate("notificationDistributor")}
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
            <Text style={{ fontSize: 20, color: colors.ORANGE }}>{name} </Text>
          </Text>
          <View style={styles.balance}>
            <Text
              style={{ fontSize: 16, fontWeight: "700", color: colors.WHITE }}
            >
              {!showBalance && formatIDRCurrency(belance || null)}
            </Text>
            {/*<Image source={require("../../../assets/img/View.png")} />*/}
            <TouchableOpacity onPress={handleShowBalance} style={styles.eyeIcon}>
              <Icon
                  name={showBalance ? "eye-slash" : "eye"}
                  size={20}
                  color="#F36C21"
              />
            </TouchableOpacity>
          </View>
        </View>
      </View>
      <View id="list-merchant" style={styles.listContainer}>
        <View>
          <Text style={{ fontSize: 20, marginBottom: 10 }}>Daftar Toko</Text>
          <View style={styles.searchContainer}>
            <Image source={require("../../../assets/img/Search.png")} />
            <TextInput
              style={styles.search}
              placeholder="Nama toko"
              underlineColorAndroid="transparent"
            />
          </View>
          <View style={styles.filterContainer}>
            {filterTypes.map((filter, index) => (
              <TouchableOpacity
                onPress={() => setFilter(filter.value)}
                key={index}
                style={[
                  styles.filter,
                  filter.value === filter && { backgroundColor: colors.YELLOW },
                ]}
              >
                <Text>{filter.name}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>
        <ScrollView>
          <View id="merchants" style={styles.merchantContainer}>
            {merchants
              .filter((item) => !filter || item.status === filter)
              .map((item, index) => {
                console.log(item);
                const { status, name, limit, id } = item;

                let bgColor;
                let textStatus;
                switch (status) {
                  case "LANCAR":
                    bgColor = colors.GREEN;
                    textStatus = "Lancar";
                    break;
                  case "TIDAK_LANCAR":
                    bgColor = colors.YELLOW_STATUS;
                    textStatus = "Tidak Lancar";
                    break;
                  case "GAGAL":
                    bgColor = colors.RED;
                    textStatus = "Gagal";
                    break;
                }
                return (
                  <TouchableOpacity
                    key={id}
                    onPress={() =>
                      navigation.navigate("detail-toko", {
                        details: item,
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
                          padding: 5,
                        }}
                      >
                        <Text style={styles.cityText}>{item.address}</Text>
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
                            alignItems: "center",
                          }}
                        >
                          <Text
                            style={{
                              fontSize: 12,
                              fontWeight: "400",
                            }}
                          >
                            Sisa Limit:
                          </Text>
                          <Text
                            style={{
                              fontSize: 13,
                              fontWeight: "400",
                              color: "rgba(0,0,0,0.25)",
                            }}
                          >
                            {!limit && "unknown"}
                          </Text>
                        </View>
                        
                        <View
                          style={{
                            flexDirection: "row",
                            justifyContent: "space-between",
                            alignItems: "center",
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
                              borderRadius: 10,
                              backgroundColor: bgColor,
                              flexDirection: "row",
                              justifyContent: "center",
                              paddingVertical: 5,
                              alignItems: "center",
                            }}
                          >
                            <Text
                              style={{
                                fontSize: 16,
                                fontWeight: "600",
                                color: "white",
                              }}
                            >
                            {textStatus}
                              {/* {!status && "unknown"} */}
                            </Text>
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
  );
};

export default DashboardDistributor;

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    justifyContent: "flex-start",
    height: "100%",
  },
  headerContainer: {
    backgroundColor: colors.ORANGE,
    justifyContent: "space-between",
    flexDirection: "row",
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    padding: 10,
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
    color: colors.WHITE,
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
    gap: 3,
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
    backgroundColor: colors.FLORAL_WHITE,
    gap: 20,
    flex: 1,
    padding: 25,
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
    height: "100%",
    gap: 20,
    padding: 5,
  },
  item: {
    backgroundColor: colors.FLORAL,
    borderRadius: 5,
    elevation: 5,
    flexDirection: "row",
    padding: 5,
    alignItems: "center",
    gap: 5,
    position: "relative",
  },
  cityText: {
    position: "absolute",
    top: -2,
    right: -2,
  },
});
