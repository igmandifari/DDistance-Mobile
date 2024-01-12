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
import React, { useState, useEffect, useCallback } from "react";
import * as ImagePicker from "expo-image-picker";
import { colors } from "../../../../constant/colors";
import { Button, CheckBox } from "react-native-elements";
import CustomButton from "../../../../components/CustomButton";
import { FontAwesome } from "@expo/vector-icons";
import { Dropdown } from "react-native-element-dropdown";
import PopUpConfirm from "../../../../components/PopUpConfirm";
import DateTimePicker from "@react-native-community/datetimepicker";
// import { useValidateRequestAssurance } from "../../../../utils/useValidateRequestAssurance";
// import RNDateTimePicker from "@react-native-community/datetimepicker";
import { getAllDistributor } from "../../../../services/merchantServices";
import { useSelector } from "react-redux";
import { useFocusEffect } from "@react-navigation/native";
import {
  postInvoice,
  sendOtpInvoiceMerhant,
} from "../../../../services/merchantServices";
import { useFormik } from "formik";
import * as Yup from "yup";
import { current } from "@reduxjs/toolkit";

const FormInvoice = ({ navigation, route }) => {
  const { token } = useSelector((state) => state.user);
  const [image, setImage] = useState(null);
  const [popUp, setPopUp] = useState(false);

  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [6, 6],
      quality: 1,
    });

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

  const [distributors, setDistributors] = useState([]);
  const [selectedDistributor, setSelectedDistributor] = useState(null);

  getData = async () => {
    const response = await getAllDistributor(token);
    setDistributors(response.data.data);
  };
  useFocusEffect(
    useCallback(() => {
      getData();
    }, [])
  );

  useEffect(() => {
    const today = new Date();
    setDate(today);
  }, []);
  // const formatDateToString = (date) => {
  //   const options = { year: "numeric", month: "2-digit", day: "2-digit" };
  //   return date.toLocaleDateString("en-US", options);
  // };

  const [date, setDate] = useState(new Date());
  const [showPicker, setShowPicker] = useState(false);
  const [dueDate, setDueDate] = useState(new Date());

  const toggleDatePicker = () => {
    setShowPicker(!showPicker);
  };

  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShowPicker(false);
  
    if (event.nativeEvent.type === "set") {
      setDate(currentDate);
    } else {
      setDueDate(currentDate);
    }
  };
  
  // const [value, setValue] = useState(null);

  const renderItem = (item) => {
    return (
      <View style={styles.item}>
        <Text style={styles.textItem}>{item.name}</Text>
        {item.id === selectedDistributor && (
          <Text style={styles.icon} color="black" name="Safety" size={20} />
        )}
      </View>
    );
  };

  // const [judul, setJudul] = useState("");
  // const [jumlahTagihan, setJumlahTagihan] = useState("");

  const validationSchema = Yup.object().shape({
    judul: Yup.string().required("Judul is required"),
    idDistributor: Yup.string().required("Distributor is required"),
    jumlahTagihan: Yup.string().required("Jumlah Tagihan is required"),
    invoice: Yup.string().required("Invoice Picture is required"),
    tanggalTagihan: Yup.date().required("Tanggal Tagihan is required"),
    tanggalJatuhTempo: Yup.date().required("Tanggal Jatuh Tempo is required"),
  });
  const { handleSubmit, values, handleChange, errors, setFieldValue, isValid } =
    useFormik({
      initialValues: {
        judul: "",
        idDistributor: "",
        jumlahTagihan: "",
        invoice: image,
        tanggalTagihan: new Date(),
        tanggalJatuhTempo: new Date(), 
      },
      // validationSchema: validationSchema,s
      onSubmit: async (values) => {
        console.log("isvalid", isValid);
        if (!image) {
          alert("Please select an image for the invoice.");
          return;
        }
        if (!token) {
          console.error("Token is not available.");
          return;
        }
        // if (!isValid) {
        //   alert("Please fill in all required fields.");
        //   return;
        // }
          try {
            const formData = new FormData();
            formData.append("judul", values.judul);
            formData.append("idDistributor", values.idDistributor);
            formData.append("jumlahTagihan", values.jumlahTagihan);
            formData.append("invoice", {
              uri: image,
              type: "image/jpeg",
              name: "invoice.jpeg",
            });
            formData.append("tanggalTagihan","01-11-2024");
            formData.append("tanggalJatuhTempo","01-12-2024");

            await sendOtpInvoiceMerhant(token);
            navigation.navigate("otp-invoice-merchant", {
              formData,image
            });

            console.log(formData);
            console.log(token);
          } catch (error) {
            console.error(error);
            alert("Failed to send OTP or submit invoice");
          }
      },
    });
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
          <View>
            <View>
              <Text
                style={{
                  color: colors.ORANGE,
                  fontSize: 20,
                  fontWeight: "700",
                }}
              >
                Invoice
              </Text>
              <Button
                title={"test"}
                onPress={() => {
                  console.log(image);
                }}
              />
              <Image
                source={{ uri: image }}
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
              {image ? (
                <View style={{ gap: 5, alignItems: "flex-start" }}>
                  <Image
                    source={{ uri: image }}
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
                    onPress={() => {
                      pickImage();
                    }}
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
                    onPress={() => pickImage()}
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
            onChangeText={handleChange("judul")}
            value={values.judul}
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
            data={distributors}
            labelField="name"
            valueField="id"
            placeholder="Pilih Distributor"
            searchPlaceholder="Search..."
            value={selectedDistributor}
            onChange={(item) => {
              setSelectedDistributor(item.id);
              setFieldValue("idDistributor", item.id);
              console.log(item.id)
              console.log(selectedDistributor)
            }}
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
            onChangeText={handleChange("jumlahTagihan")}
            value={values.jumlahTagihan}
          />
        </View>

        <View style={styles.inputDateContainer}>
          {!showPicker && (
            <TouchableOpacity
              onPress={() => toggleDatePicker("tanggalTagihan")}
              style={styles.inputDate}
            >
              <TextInput
                placeholder="Tanggal Tagihan"
                editable={false}
                // value={currentDate}
              />
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
              value={date}
              mode="date"
              onChange={(event, date) => onChange(event, date)}
            />
          )}
        </View>

        <View style={styles.inputDateContainer}>
          {!showPicker && (
            <TouchableOpacity
              onPress={() => toggleDatePicker("tanggalJatuhTempo")}
              style={styles.inputDate}
            >
              <TextInput
                placeholder="Tanggal Jatuh Tempo"
                editable={false}
                value={dueDate}
              />
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
              value={dueDate}
              mode="date"
              onChange={(event, date) => onChange(event, date)}
            />
          )}
        </View>

        <View
          style={{
            height: "100%",
            paddingTop: 20,
          }}
        >
          <CustomButton
            handleClick={() => setPopUp(true)}
            text={"Kirim Tagihan"}
            // disabled={!isValid}
          />
          <TouchableOpacity
            onPress={() => navigation.navigate("otp-invoice-merchant")}
          >
            <Text>kirim ssaukses</Text>
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
    justifyContent: "space-around",
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
