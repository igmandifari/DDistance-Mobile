import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  Image,
  Dimensions,
  TouchableOpacity,
} from "react-native";
import React from "react";
import { colors } from "../../../constant/colors";
import CustomButton from "../../../components/CustomButton";

const vw = Dimensions.get("window").width;

const details = [
  {
    key: "Name Lengkap",
    value: "Joshua",
  },
  {
    key: "Alamat",
    value: "Jl. Ciawi",
  },
  {
    key: "No. HP",
    value: "-859-6678-6370",
  },
  {
    key: "Email",
    value: "joshua@gmail.com",
  },
  {
    key: "No. Rekening Danamon",
    value: "12939482",
  },
  {
    key: "Nama Pemilik Rekening",
    value: "Joshua",
  },
];

const Profile = ({navigation}) => {
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
        <View
          style={{
            paddingVertical: 20,
            alignItems: "center",
            gap: 15,
          }}
        >
          <View style={styles.profile}></View>
          <View
            style={{
              width: "100%",
              flexDirection: "row",
              justifyContent: "space-evenly",
            }}
          >
            <TouchableOpacity style={styles.button}
            onPress={() => navigation.navigate("edit-profile")}>
              <Text
                style={{ color: colors.WHITE, fontWeight: "800", fontSize: 12 }}
              >
                Edit Profil
              </Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.button}
            onPress={() => navigation.navigate("keamanan-akun")}>
              <Text
                style={{ color: colors.WHITE, fontWeight: "800", fontSize: 12 }}
              >
                Keamanan
              </Text>
            </TouchableOpacity>
          </View>
        </View>
        <View style={styles.detailContainer}>
          <View style={{ gap: 12 }}>
            {details.map((item, index) => {
              return (
                <View key={index}>
                  <Text style={{ fontSize: 13, fontWeight: 500 }}>
                    {item.key}
                  </Text>
                  <Text style={{ fontSize: 13, fontWeight: 500 }}>
                    {item.value}
                  </Text>
                </View>
              );
            })}
          </View>
          <View
            style={{
              flex: 1,
              justifyContent: "flex-end",
            }}
          >
            <CustomButton bgColor={colors.RED} text={"Keluar"} />
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default Profile;

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
