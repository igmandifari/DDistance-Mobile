import React, { useEffect, useRef, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
} from "react-native";
import { colors } from "../../../../constant/colors";
// import { historyList } from "../../Dashboard/data";
import { BottomSheet } from "react-native-sheet";
import SheetPay from "../../Payment/components/SheetPay";
import { Button } from "react-native-elements";
import PaymentSuccess from "../../Payment/components/PaymentSuccess";
import PaymentFailed from "../../Payment/components/PaymentFailed";
import { getDetailInvoiceId } from "../../../../services/merchantServices";
import { useSelector } from "react-redux";
import { getInvoiceId } from "../../../../services/distributorService";

const HistoryTenorSet = ({ navigation, route }) => {
  const { token } = useSelector((state) => state.user);
  const [isProfileVisible, setIsProfileVisible] = useState(true);
  const sheetPay = useRef(null);
  const paySuccess = useRef(null);
  const payFailed = useRef(null);
  const { isSuccess,idInvoice,distributorData } = route.params;
  console.log("Invoice ID:", idInvoice);
  console.log("Data:", distributorData);

  const [filter, setFilter] = useState("");
  const [data, setData] = useState({});


  const getDetail = async () => {
    const response = await getInvoiceId(token, idInvoice);
    const {namaDistributor, jumlahTagihan, tanggalJatuhTempo, id} = response.data.data;
    setData({
    id,
    namaDistributor,
    jumlahTagihan,
    tanggalJatuhTempo,
    });
  };

  useEffect(() => {
    getDetail();
  }, []);
  
  console.log("data",data);

  const handleToggleProfile = () => {
    setIsProfileVisible((prev) => !prev);
  };

  const handleClickStatus = () => {
        navigation.navigate("tenor-setting");
  };

  if (isSuccess) {
    console.log("success");
  }


  return (
    <SafeAreaView style={{ marginTop: 25 }}>
      <View style={styles.container}>
        <BottomSheet
          height={700}
          sheetBackgroundColor="#ccc"
          sheetStyle={{
            backgroundColor: colors.FLORAL_WHITE,
            paddingHorizontal: 25,
            paddingVertical: 10,
            gap: 10,
          }}
          ref={sheetPay}
        >
          <SheetPay
            handlePayAll={() => {
              console.log("pay all");
            }}
            handlePay={() => navigation.navigate("pin-payment")}
          />
        </BottomSheet>
        <BottomSheet
          height={700}
          sheetBackgroundColor="#ccc"
          sheetStyle={{
            backgroundColor: colors.FLORAL_WHITE,
            paddingHorizontal: 25,
            paddingVertical: 10,
            gap: 10,
          }}
          ref={paySuccess}
        >
          <PaymentSuccess />
        </BottomSheet>
        <BottomSheet
          height={700}
          sheetBackgroundColor="#ccc"
          sheetStyle={{
            backgroundColor: colors.FLORAL_WHITE,
            paddingHorizontal: 25,
            paddingVertical: 10,
            gap: 10,
          }}
          ref={payFailed}
        >
          <PaymentFailed />
        </BottomSheet>
        {isProfileVisible && (
          <View id="profile" style={{}}>
            <View style={styles.profileContainer}>
              <Text style={{ fontSize: 32, fontWeight: "700" }}>
                Distributor {data.namaDistributor}
              </Text>
            </View>
          </View>
        )}

        <View id="list-merchant" style={styles.listContainer}>
          <View>
            <View>
              <Text style={{ fontSize: 20, fontWeight: 400 }}>
                {/* Riwayat Cicilan Invoice {idInvoice} */}
                Riwayat Cicilan Invoice 
              </Text>
            </View>
          </View>
          <ScrollView>
            <View id="merchants" style={styles.merchantContainer}>
              
            {/* {data !== null &&
              data.map((distributor, index) => {
                const { sisaTagihan, tanggalFaktur, paymentTo, paymentAmount } = distributor;
                console.log('distiebuor', distributor); */}
                  <View style={styles.item}>
                    <View style={{ height: "100%", flex: 1 }}>
                      <View
                        style={{
                          flexDirection: "row",
                          justifyContent: "space-between",
                          alignItems: "center",
                        }}
                      >

                            <Text
                              style={{
                                fontSize: 15,
                                fontWeight: "700",
                                flex: 1,
                              }}
                            >
                              Total Tagihan
                            </Text>
                            {/* <Text style={{ fontSize: 20, fontWeight: "600" }}>
                              {sisaTagihan}
                            </Text> */}

                            {/* <Text style={{ fontSize: 15, fontWeight: "700" }}>
                              Cicilan {paymentTo}/{paymentAmount}
                            </Text> */}
                            <Text style={{ fontSize: 20, fontWeight: "600" }}>
                              Rp. {data.jumlahTagihan}
                            </Text>
    
                      </View>
                      <View style={{ alignItems: "start" }}>
                        
                          <Text
                            style={{
                              fontSize: 15,
                              fontWeight: "700",
                              color: colors.ORANGE,
                            }}
                          >
                            Jatuh Tempo Pilih Tenor:
                          </Text>
                        
                        {/* <Text style={{ fontSize: 14, color: colors.BUTTON_ORANGE }}>{date}</Text> */}
                      </View>
                      <View
                        style={{
                          flexDirection: "row",
                          justifyContent: "space-between",
                        }}
                      >
                        <View style={{ alignItems: "center" }}>
      
                          <Text
                            style={{
                              fontSize: 14,
                              color: colors.BUTTON_ORANGE,
                            }}
                          >
                            {data.tanggalJatuhTempo}
                          </Text>
                        </View>
                        <View
                          style={{
                            width: 120,
                            borderRadius: 10,
                            backgroundColor: colors.BUTTON_ORANGE,
                            flexDirection: "row",
                            justifyContent: "center",
                            paddingVertical: 5,
                          }}
                        >
                          <TouchableOpacity
                            onPress={() => handleClickStatus()}
                          >
                            <Text
                              style={{
                                fontSize: 16,
                                fontWeight: "600",
                                color: "white",
                              }}
                            >
                             Atur Tenor
                            </Text>
                          </TouchableOpacity>
                        </View>
                      </View>
                    </View>
                  </View>
                {/* ); */}
              {/* })} */}
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
                navigation.navigate("detail-invoice-bill-merchant")
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
  ) 
};

export default HistoryTenorSet;

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
