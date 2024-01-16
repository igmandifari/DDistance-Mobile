import { Text, StyleSheet, View, SafeAreaView, ScrollView } from "react-native";
import React, { Component,useEffect, useRef, useState  } from "react";
import { colors } from "../../../constant/colors";
import { getCreditHistory } from "../../../services/distributorService";
import { useSelector } from "react-redux";


const CreditHistory = () => {
  const { token } = useSelector((state) => state.user);
  const [data, setData] = useState([]);
  
  const getDetail = async () => {
    const response = await getCreditHistory(token);
    console.log("response",response.data.data);
    setData(response.data.data);
  };
  
  useEffect(() => {
    getDetail();
  }, []);
  console.log("data",data);
  
  return (
    <SafeAreaView style={{ marginTop: 25 }}>
      <View style={styles.container}>
        <View style={{ padding: 25, marginTop: 15, marginBottom: -35 }}>
          <Text style={{ fontWeight: "700", fontSize: 32 }}>
            Credit History
          </Text>
        </View>

        <View style={styles.detailContainer}>
          <View style={{ height: "100%", flex: 1 }}>
            <ScrollView style={{ width: "100%" }}>
              {data.map((item, index) => (
                <View
                  key={index}
                  style={{
                    backgroundColor: colors.FLORAL,
                    padding: 20,
                    backgroundColor: "#FFFAED",
                    height: 115,
                    width: "100%",
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
                      <Text
                        style={{
                          fontSize: 18,
                          fontWeight: 600,
                        }}
                      >
                        {item.idInvoice}
                      </Text>
                    </View>
                  </View>
                  <View
                    style={{
                      flexDirection: "row",
                      justifyContent: "space-between",
                    }}
                  >
                    <Text
                      style={{
                        fontSize: 15,
                        fontWeight: "600",
                        alignSelf: "flex-start",
                      }}
                    >
                     
                    </Text>

                    <Text style={{ fontSize: 20, fontWeight: "400" }}>
                      {item.totalPembayaran}
                    </Text>
                  </View>
                  <Text
                    style={{
                      fontSize: 13,
                      fontWeight: "400",
                    }}
                  >
                    {item.tanggalTerakhirBayar}
                  </Text>
                  <View
                    style={{
                      borderBottomWidth: 1,
                      marginVertical: 10,
                    }}
                  />
                </View>
              ))}
            </ScrollView>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};
export default CreditHistory;

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.WHITE,
    justifyContent: "flex-start",
    height: "100%",
    alignContent: "center",
  },
  detailContainer: {
    flex: 1,
    backgroundColor: "#FFFAED",
    marginTop: 20,
    shadowRadius: 5,
    shadowOffset: {
      width: 10,
      height: -10,
    },
    shadowColor: "#000000",
    elevation: 20,
    borderTopEndRadius: 10,
  },
});

