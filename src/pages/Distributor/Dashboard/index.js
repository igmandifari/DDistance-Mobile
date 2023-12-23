import {
  StyleSheet,
  Text,
  View,
  Image,
  TextInput,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import React from "react";
import { colors } from "../../../constant/colors";
import { Button } from "react-native-elements/dist/buttons/Button";
import { useSelector } from "react-redux";
import { useEffect } from "react";
import { getMerchants } from "../../../services/distributorService";

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

const merchantList = [
  {
    name: "Distributor A",
    limit: "Rp. 70,000,000/100,000,000",
    status: "Lancar",
  },
  {
    name: "Distributor B",
    limit: "Rp. 70,000,000/100,000,000",
    status: "Tidak Lancar",
  },
  {
    name: "Distributor C",
    limit: "Rp. 70,000,000/100,000,000",
    status: "Gagal",
  },
  {
    name: "Distributor A",
    limit: "Rp. 70,000,000/100,000,000",
    status: "Lancar",
  },
  {
    name: "Distributor B",
    limit: "Rp. 70,000,000/100,000,000",
    status: "Tidak Lancar",
  },
  {
    name: "Distributor C",
    limit: "Rp. 70,000,000/100,000,000",
    status: "Gagal",
  },
  {
    name: "Distributor A",
    limit: "Rp. 70,000,000/100,000,000",
    status: "Lancar",
  },
  {
    name: "Distributor B",
    limit: "Rp. 70,000,000/100,000,000",
    status: "Tidak Lancar",
  },
  {
    name: "Distributor C",
    limit: "Rp. 70,000,000/100,000,000",
    status: "Gagal",
  },
];

const DashboardDistributor = () => {
  const { token } = useSelector((state) => state.user);

  useEffect(() => {
    getData();
  }, []);
  const getData = () => {
    const result = getMerchants();
    console.log("result", result);
  };

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
          <Image
            source={require("../../../assets/img/notification.png")}
            style={{}}
          />
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
            <Text style={{ fontSize: 20, color: colors.ORANGE }}> Joshua</Text>
          </Text>
          <View style={styles.balance}>
            <Text
              style={{ fontSize: 16, fontWeight: "700", color: colors.WHITE }}
            >
              Rp 10,855,297,353.00
            </Text>
            <Button title={"test"} onPress={() => console.log(token)} />
            <Image source={require("../../../assets/img/View.png")} />
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
                onPress={() => setFilter(filter.name)}
                key={index}
                style={styles.filter}
              >
                <Text>{filter.name}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>
        <ScrollView>
          <View id="merchants" style={styles.merchantContainer}>
            {merchantList.map((item, index) => {
              const { status } = item;

              let bgColor;
              switch (status) {
                case "Lancar":
                  bgColor = colors.GREEN;
                  break;
                case "Tidak Lancar":
                  bgColor = colors.YELLOW_STATUS;
                  break;
                case "Gagal":
                  bgColor = colors.RED;
                  break;
              }
              return (
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
                    <Text style={styles.cityText}>Jakarta</Text>
                    <Text
                      style={{
                        fontSize: 15,
                        fontWeight: "700",
                      }}
                    >
                      Distributor A
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
                        {item.limit}
                      </Text>
                    </View>
                    <View
                      style={{
                        backgroundColor: colors.WHITE,
                        height: 20,
                        borderRadius: 10,
                        elevation: 5,
                        overflow: "hidden",
                      }}
                    >
                      <View
                        style={{
                          height: "100%",
                          backgroundColor: colors.ORANGE,
                          width: "50%",
                          borderRadius: 10,
                        }}
                      ></View>
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
                          {item.status}
                        </Text>
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
    gap: 20,
    padding: 3,
  },
  item: {
    backgroundColor: colors.FLORAL,
    borderRadius: 5,
    elevation: 5,
    flexDirection: "row",
    padding: 5,
    alignItems: "center",
    gap: 20,
    position: "relative",
  },
  cityText: {
    position: "absolute",
    top: -2,
    right: -2,
  },
});
