import {
  StyleSheet,
  Text,
  View,
  Image,
  Icon,
  TextInput,
  Pressable,
  ScrollView,
} from "react-native";
import React from "react";
import { colors } from "../../../constant/colors";
import BottomNavigation from "../../../components/BottomNavigator";

const DashboardMerchant = () => {
  const statusTypes = {
    lancar: { label: "Lancar", style: styles.statusTagihanLancar },
    tidakLancar: {
      label: "Tidak Lancar",
      style: styles.statusTagihanTidakLancar,
    },
    gagal: { label: "Gagal", style: styles.statusTagihanGagal },
  };

  const filterTypes = {
    lancar: { label: "Lancar", value: "lancar" },
    tidakLancar: { label: "Tidak Lancar", value: "tidakLancar" },
    gagal: { label: "Gagal", value: "gagal" },
  };

  const distributorList = [
    {
      name: "Distributor A",
      totalTagihan: 100000000,
      statusPembayaran: "lancar",
    },
    {
      name: "Distributor B",
      totalTagihan: 300000000,
      statusPembayaran: "tidakLancar",
    },
    {
      name: "Distributor C",
      totalTagihan: 200000000,
      statusPembayaran: "gagal",
    },
    {
      name: "Distributor D",
      totalTagihan: 100000000,
      statusPembayaran: "lancar",
    },
    {
      name: "Distributor E",
      totalTagihan: 300000000,
      statusPembayaran: "tidakLancar",
    },
    {
      name: "Distributor F",
      totalTagihan: 200000000,
      statusPembayaran: "gagal",
    },
  ];

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
            <Image source={require("../../../assets/img/View.png")} />
          </View>
          <View>
            <Text>Sisa Limit: Rp. 70.000.0000/100/000/000</Text>
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
              placeholder="Nama toko"
              underlineColorAndroid="transparent"
            />
          </View>
          <View style={styles.filterContainer}>
            {Object.values(filterTypes).map((filter) => (
              <Pressable key={filter.value} style={styles.filter}>
                <Text>{filter.label}</Text>
              </Pressable>
            ))}
          </View>
        </View>
        <ScrollView>
          <View id="merchants" style={styles.merchantContainer}>
            {distributorList.map((distributor, index) => {
              const { name, totalTagihan, statusPembayaran } = distributor;

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
                  <View>
                    <Text style={styles.textName}>{name}</Text>
                    <View style={styles.tagihanContainer}>
                      <Text style={styles.jumlahagihan}>Jumlah Tagihan:</Text>
                      <Text style={styles.angkaTagihan}>
                        Rp. {totalTagihan.toLocaleString()}
                      </Text>
                    </View>
                    <View style={styles.statusContainer}>
                      <Text style={styles.textStatus}>Status Pembayaran:</Text>
                      <Text style={statusTypes[statusPembayaran].style}>
                        {statusTypes[statusPembayaran].label}
                      </Text>
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

export default DashboardMerchant;

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
    paddingHorizontal: 10,
    marginTop: 25,
    paddingVertical: 20,
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
    // backgroundColor:'red',
  },
  item: {
    backgroundColor: colors.FLORAL,
    borderRadius: 5,
    elevation: 5,
    flexDirection: "row",
    padding: 5,
    alignItems: "center",
    gap: 20,
  },
  progressBar: {
    height: 23,
    width: "100%",
    backgroundColor: "white",
    borderColor: "#000",
    borderWidth: 1,
    borderRadius: 10,
    shadowColor: "rgba(0, 0, 0, 0.25)",
    shadowOffset: { width: 0, height: 0 },
    shadowRadius: 8.2,
    shadowOpacity: 1,
  },
  textName: {
    fontWeight: "700",
    width: "107",
    height: "24",
  },
  tagihanContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  jumlahagihan: {
    fontSize: 14,
    fontWeight: "600",
  },
  angkaTagihan: {
    color: "#6C6C6C",
    fontSize: 14,
    fontWeight: "600",
  },
  statusContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  textStatus: {
    fontSize: 14,
    fontWeight: "600",
  },
  statusTagihanTidakLancar: {
    color: "white",
    textAlign: "center",
    fontSize: 16,
    fontWeight: "600",
    borderRadius: 10,
    backgroundColor: "#FFC700",
    width: 122,
    height: 32,
  },
  statusTagihanLancar: {
    color: "white",
    textAlign: "center",
    fontSize: 16,
    fontWeight: "600",
    borderRadius: 10,
    backgroundColor: "#00E817",
    width: 122,
    height: 32,
  },
  statusTagihanGagal: {
    color: "white",
    textAlign: "center",
    fontSize: 16,
    fontWeight: "600",
    borderRadius: 10,
    backgroundColor: "#FC0000",
    width: 122,
    height: 32,
  },
});
