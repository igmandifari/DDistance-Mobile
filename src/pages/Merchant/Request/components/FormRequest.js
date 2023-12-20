import {
  Dimensions,
  Image,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useState } from "react";
import { colors } from "../../../../constant/colors";
import { Button, CheckBox } from "react-native-elements";
import CustomButton from "../../../../components/CustomButton";
import * as ImagePicker from "expo-image-picker";
import { useValidateRequestAssurance } from "../../../../utils/useValidateRequestAssurance";
import PopUpConfirm from "../../../../components/PopUpConfirm";

const FormRequest = ({ navigation }) => {
  const [agree, setAgree] = useState(false);
  const [images, setImages] = useState({
    ktp: null,
    siup: null,
    agunan: null,
  });

  const [popUp, setPopUp] = useState(false);

  const pickImage = async (id) => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [6, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setImages((ps) => ({
        ...ps,
        [id]: result.assets[0].uri,
      }));
    }
  };

  const inputsImages = [
    {
      id: "ktp",
      title: "KTP",
      subtitle: "(KTP (Max. 10 MB, .jpg, .pdf)  )",
      preview: images.ktp,
    },
    {
      id: "siup",
      title: "Surat Izin Usaha",
      subtitle: "(KTP (Max. 10 MB, .jpg, .pdf)  )",
      preview: images.siup,
    },
    {
      id: "agunan",
      title: "Daftar Agunan",
      subtitle: "",
      preview: images.agunan,
    },
  ];

  const handleSubmit = () => {
    const payload = {
      aggree: agree,
      ktp: images.ktp,
      siup: images.siup,
      agunan: images.agunan,
    };

    if (!useValidateRequestAssurance(payload)) {
      alert("data must not empty");
      return;
    }
    setPopUp(false);
    navigation.navigate("otp-request-insurance");
  };

  return (
    <SafeAreaView style={{ marginTop: 25 }}>
      <View style={styles.container}>
        {popUp && (
          <PopUpConfirm
            handleOK={() => handleSubmit()}
            handleReject={() => setPopUp(false)}
          />
        )}
        <ScrollView>
          <Image
            source={{ uri: images.ktp }}
            style={{ flex: 1 }}
            resizeMode="contain"
          />
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
                    <Image
                      source={{ uri: item.preview }}
                      style={{ flex: 1 }}
                      resizeMode="contain"
                    />
                  </View>
                  <View
                    style={{
                      justifyContent: "center",
                      flexDirection: "row",
                      padding: 15,
                    }}
                  >
                    {item.preview ? (
                      <View style={{ gap: 5, alignItems: "flex-start" }}>
                        <Image
                          source={{ uri: item.preview }}
                          style={{ width: 200, height: 100 }}
                        />
                        <TouchableOpacity
                          style={{
                            backgroundColor: colors.ORANGE,
                            flexDirection: "row",
                            paddingHorizontal: 4,
                            paddingVertical: 2,
                            borderRadius: 10,
                          }}
                          onPress={() => pickImage(item.id)}
                        >
                          <Text
                            style={{
                              fontSize: 10,
                              fontWeight: "500",
                              color: colors.WHITE,
                            }}
                          >
                            Ubah
                          </Text>
                        </TouchableOpacity>
                      </View>
                    ) : (
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
                          onPress={() => pickImage(item.id)}
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
                    )}
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
                style={{
                  color: colors.ORANGE,
                  textDecorationLine: "underline",
                }}
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
            <CustomButton
              handleClick={() => setPopUp(true)}
              text={"Kirim Permohonan"}
            />
          </View>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

export default FormRequest;

const styles = StyleSheet.create({
  container: {
    padding: 30,
    backgroundColor: colors.FLORAL_WHITE,
    height: Dimensions.get("window").height,
    position: "relative",
  },
  infoContainer: {
    backgroundColor: colors.FLORAL,
    elevation: 2,
    marginBottom: 10,
    padding: 10,
    borderRadius: 30,
  },
});
