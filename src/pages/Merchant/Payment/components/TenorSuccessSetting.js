import { BackHandler, StyleSheet, Text, View } from "react-native";
import React, { useEffect } from "react";
import SuccessIcon from "../../../../assets/img/popUpSuccess.svg";
import { colors } from "../../../../constant/colors";
import { SafeAreaView } from "react-native-safe-area-context";

const TenorSuccessSetting = ({ route, navigation }) => {
  const { details } = route.params;
  console.log("Details received in TenorSuccessSetting:", details);

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

  console.log("Rendering TenorSuccessSetting...");

  return (
    <SafeAreaView style={{ marginTop: 100, height: "87%" }}>
      <View style={styles.container}>
        <Text style={{ fontWeight: "700", fontSize: 28 }}>
          Pengaturan Tenor
        </Text>
        <View
          style={{
            borderBottomColor: "black",
            borderWidth: 2,
            elevation: 2,
          }}
        />
        <View
          style={{
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <SuccessIcon />
          <Text style={{ fontWeight: "700", fontSize: 20 }}>
            Atur Cicilan Berhasil
          </Text>
        </View>

        {details ? (
          <View style={{ gap: 18, marginTop: 30 }}>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
              }}
            >
              <Text style={styles.text}>No. Faktur:</Text>
              <Text style={styles.text}>{details.id}</Text>
            </View>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
              }}
            >
              <Text style={styles.text}>Tanggal Faktur:</Text>
              <Text style={styles.text}>{details.tanggalTagihan}</Text>
            </View>
            {/* Tambahkan baris-baris berikut sesuai dengan data yang dibutuhkan */}
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
              }}
            >
              <Text style={styles.text}>Nama Toko:</Text>
              <Text style={styles.text}>{details.namaToko}</Text>
            </View>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
              }}
            >
              <Text style={styles.text}>Nama Distributor:</Text>
              <Text style={styles.text}>{details.namaDistributor}</Text>
            </View>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
              }}
            >
              <Text style={styles.text}>Jatuh Tempo:</Text>
              <Text style={styles.text}>{details.tanggalJatuhTempo}</Text>
            </View>
          </View>
        ) : (
          <Text style={{ textAlign: "center", marginTop: 20 }}>
            Tidak ada data yang diterima.
          </Text>
        )}

        <View
          style={{
            backgroundColor: colors.WHITE,
            borderColor: colors.GRAY,
            borderWidth: 1,
            padding: 25,
            borderRadius: 10,
          }}
        >
          {details ? (
            <View>
              <Text style={[styles.text2, styles.textCenter, { fontSize: 24 }]}>
                Tanggal Jatuh Tempo
              </Text>
              <Text style={[styles.text2, styles.textCenter, { fontSize: 24 }]}>
                {details.tanggalJatuhTempoPayment}
              </Text>
              <Text style={[styles.text2, styles.textCenter, { fontSize: 24 }]}>
                Rp. {details.bayarPerBulan} per Bulan
              </Text>
            </View>
          ) : (
            <Text style={{ textAlign: "center", marginTop: 20 }}>
              Tidak ada data yang diterima.
            </Text>
          )}
        </View>
      </View>
    </SafeAreaView>
  );
};

export default TenorSuccessSetting;

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.FLORAL_WHITE,
    height: "100%",
    flex: 1,
    padding: 25,
    gap: 10,
  },
  text: {
    fontSize: 13,
    fontWeight: "400",
  },
  text2: {
    fontSize: 14,
    fontWeight: "400",
  },
  textCenter: {
    textAlign: "center",
  },
});
