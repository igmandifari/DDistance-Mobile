import {
  SafeAreaView,
  StyleSheet,
  Text,
  Touchable,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useState } from "react";
import { colors } from "../../../../constant/colors";
import { CheckBox } from "react-native-elements";
import CustomButton from "../../../../components/CustomButton";

const FormRequest = () => {
  const [agree, setAgree] = useState(false);

  const inputsImages = [
    {
      title: "KTP",
      subtitle: "(KTP (Max. 10 MB, .jpg, .pdf)  )",
    },
    {
      title: "Surat Izin Usaha",
      subtitle: "(KTP (Max. 10 MB, .jpg, .pdf)  )",
    },
    {
      title: "Daftar Agunan",
      subtitle: "",
    },
  ];
  return (
    <SafeAreaView style={{ marginTop: 25 }}>
      <View style={styles.container}>
        <View style={styles.infoContainer}>
          <Text>
            Silahkan lengkapi berkas administrasi berikut untuk mengajukan
            permohonan:
          </Text>
        </View>
        <View id="image container">
          {inputsImages.map((item, index) => {
            return (
              <View key={index}>
                <View>
                  <Text
                    style={{
                      color: colors.ORANGE,
                      fontSize: 20,
                      fontWeight: "700",
                    }}
                  >
                    {item.title}
                    <Text style={{ fontSize: 10, color: "black" }}>
                      {item.subtitle}
                    </Text>
                  </Text>
                </View>
                <View
                  style={{
                    justifyContent: "center",
                    flexDirection: "row",
                    padding: 15,
                  }}
                >
                  <View
                    style={{
                      flexDirection: "row",
                      justifyContent: "center",
                      alignItems: "center",
                      borderStyle: "dashed",
                      borderWidth: 2,
                      borderRadius: 30,
                      borderColor: "black",
                      width: "100%",
                    }}
                  >
                    <TouchableOpacity
                      style={{
                        width: "100%",
                        justifyContent: "center",
                        paddingVertical: 25,
                        alignItems: "center",
                      }}
                    >
                      <View
                        style={{
                          width: 80,
                          height: 80,
                          justifyContent: "center",
                          alignItems: "center",
                          borderWidth: 2,
                          borderRadius: 100,
                          borderColor: "black",
                          borderStyle: "dashed",
                          borderWidth: 2,
                          borderColor: "black",
                        }}
                      >
                        <Text style={{ fontSize: 50 }}>+</Text>
                      </View>
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
            );
          })}
        </View>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
          }}
        >
          <CheckBox
            checked={agree}
            onPress={() => setAgree(!agree)}
            containerStyle={{
              margin: 0,
              padding: 0,
            }}
            checkedColor={colors.ORANGE}
          />
          <Text style={{ fontSize: 10, fontWeight: 500 }}>
            Saya setuju atas{" "}
            <Text
              style={{ color: colors.ORANGE, textDecorationLine: "underline" }}
            >
              Syarat & Ketentuan
            </Text>{" "}
            yang telah dibuat
          </Text>
        </View>
        <View
          style={{
            height: "100%",
            paddingTop: 20,
          }}
        >
          <CustomButton text={"Kirim Permohonan"} />
        </View>
      </View>
    </SafeAreaView>
  );
};

export default FormRequest;

const styles = StyleSheet.create({
  container: {
    padding: 30,
  },
  infoContainer: {
    backgroundColor: colors.FLORAL_WHITE,
    elevation: 2,
    marginBottom: 10,
    padding: 10,
    borderRadius: 30,
  },
});
