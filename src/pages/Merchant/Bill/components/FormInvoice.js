import {
  Image,
  Dimensions,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useState } from "react";
import * as ImagePicker from "expo-image-picker";
import { colors } from "../../../../constant/colors";
import { Button, CheckBox } from "react-native-elements";
import CustomButton from "../../../../components/CustomButton";
import { FontAwesome } from "@expo/vector-icons";
import { Dropdown } from "react-native-element-dropdown";
import PopUpConfirm from "../../../../components/PopUpConfirm";
import DateTimePicker from "@react-native-community/datetimepicker";
import { useValidateRequestAssurance } from "../../../../utils/useValidateRequestAssurance";
// import RNDateTimePicker from "@react-native-community/datetimepicker";

const FormInvoice = ({ navigation }) => {
  const [agree, setAgree] = useState(false);
  const [images, setImages] = useState({
    invoicePict: null,
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
      id: "invoice",
      title: "Invoice Fisik",
      preview: images.invoicePict,
    },
  ];

  const data = [
    { label: "Distributor 1", value: "1" },
    { label: "Distributor 2", value: "2" },
    { label: "Distributor 3", value: "3" },
    { label: "Distributor 4", value: "4" },
  ];

  const [date, setDate] = useState(new Date());
  const [showPicker, setShowPicker] = useState(false);
  const toggleDatePicker = () => {
    setShowPicker(!showPicker);
  };
  const onChange = (type, selectedDate) => {
    if (type == "set") {
      const currentDate = selectedDate;
      setDate(currentDate);
    } else {
      toggleDatePicker();
    }
  };
  const [value, setValue] = useState(null);

  const renderItem = (item) => {
    return (
      <View style={styles.item}>
        <Text style={styles.textItem}>{item.label}</Text>
        {item.value === value && (
          <Text style={styles.icon} color="black" name="Safety" size={20} />
        )}
      </View>
    );
  };

  const handleSubmit = async () => {
    const payload = {
      invoicePict: images.invoicePict,
    };

    if (!useValidateRequestAssurance(payload)) {
      alert("data must not empty");
      return;
    }
    setPopUp(false);
    await sendOtpInsurance("Bearer");
    console.log("send otp");
    navigation.navigate("otp-request-insurance", {
      payload,
    });
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
            width: "329px",
            height: "31",
          }}
        >
          <TextInput
            style={styles.input}
            placeholder="Judul Tagihan"
            // onChangeText={handleChange("addres")}
            // value={addres}
          />
        </View>
        <View
          style={{
            // flexDirection: "row",
            alignItems: "end",
            width: "329px",
            height: "31",
            marginTop: 15,
          }}
        >
          <Dropdown
            style={styles.dropdown}
            placeholderStyle={styles.placeholderStyle}
            selectedTextStyle={styles.selectedTextStyle}
            inputSearchStyle={styles.inputSearchStyle}
            iconStyle={styles.iconStyle}
            data={data}
            search
            labelField="label"
            valueField="value"
            placeholder="Pilih Distributor"
            searchPlaceholder="Search..."
            value={value}
            onChange={(item) => {
              setValue(item.value); 
            }}
            // renderLeftIcon={() => (
            //   <AntDesign style={styles.icon} color="black" name="Safety" size={20} />
            // )}
            renderItem={renderItem}
          />
        </View>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            width: "329px",
            height: "31",
            marginTop: 15,
          }}
        >
          <TextInput
            style={styles.input}
            placeholder="Jumlah Tagihan"
            // onChangeText={handleChange("addres")}
            // value={addres}
          />
        </View>

        <View style={styles.inputDateContainer}>
          {!showPicker && (
            <TouchableOpacity
              onPress={toggleDatePicker}
              style={styles.inputDate}
              disabled={true}
            >
              <TextInput placeholder="Tanggal Tagihan" editable={false} />
              <FontAwesome
                name="calendar"
                size={20}
                color="black"
                style={styles.icon}
              />
            </TouchableOpacity>
          )}
          {showPicker && (
            <DateTimePicker value={date} mode="date" onChange={onChange} />
          )}
        </View>

        <View style={styles.inputDateContainer}>
          {!showPicker && (
            <TouchableOpacity
              onPress={toggleDatePicker}
              style={styles.inputDate}
            >
              <TextInput placeholder="Tanggal Jatuh Tempo" editable={false} />
              <FontAwesome
                name="calendar"
                size={20}
                color="black"
                style={styles.icon}
              />
            </TouchableOpacity>
          )}
          {showPicker && (
            <DateTimePicker
              // style={styles.datePickerStyle}
              value={date}
              mode={"date"}
              onChange={onChange}
            />
          )}
        </View>

        <View
          style={{
            height: "100%",
            paddingTop: 20,
          }}
        >
          <CustomButton text={"Kirim Tagihan"} />
          <TouchableOpacity
            onPress={() => navigation.navigate("otp-invoice-merchant")}
          >
            <Text>kirim ssukses</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default FormInvoice;

const styles = StyleSheet.create({
  container: {
    padding: 30,
    height: Dimensions.get("window").height,
  },
  infoContainer: {
    backgroundColor: colors.FLORAL_WHITE,
    elevation: 2,
    marginBottom: 10,
    padding: 10,
    borderRadius: 30,
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    width: "100%",
    height: 40,
    marginBottom: 15,
  },
  input: {
    flex: 1,
    height: "100%",
    backgroundColor: "#FFF",
    borderRadius: 31,
    padding: 8,
    fontSize: 14,
    textAlign: "left",
    shadowColor: "rgba(0, 0, 0, 0.1)",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 1,
    shadowRadius: 4,
    elevation: 2,
  },
  inputDateContainer: {
    flexDirection: "row",
    alignItems: "center",
    width: "60%",
    marginTop: 15,
  },
  inputDate: {
    flex: 1,
    flexDirection: "row",
    justifyContent:"space-around",
    alignItems: "center",
    backgroundColor: "#FFF",
    borderRadius: 31,
    padding: 8,
    fontSize: 14,
    textAlign: "start",
    shadowColor: "rgba(0, 0, 0, 0.1)",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 1,
    shadowRadius: 4,
    elevation: 2,
  },
  buttonContainer: {
    height: "100%",
  },
  dropdown: {
    backgroundColor: "white",
    borderRadius: 31,
    padding: 8,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,

    elevation: 2,
  },
  icon: {
    marginRight: 5,
  },
  item: {
    padding: 17,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  textItem: {
    flex: 1,
    fontSize: 14,
  },
  placeholderStyle: {
    fontSize: 14,
  },
  selectedTextStyle: {
    fontSize: 14,
  },
  iconStyle: {
    width: 20,
    height: 20,
  },
  inputSearchStyle: {
    height: 40,
    fontSize: 14,
  },
});
