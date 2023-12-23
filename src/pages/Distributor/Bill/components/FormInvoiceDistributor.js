import {
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  Touchable,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useState } from "react";
import { colors } from "../../../../constant/colors";
import { CheckBox } from "react-native-elements";
import CustomButton from "../../../../components/CustomButton";
import { Dropdown } from "react-native-element-dropdown";
import DatePicker from "react-native-datepicker";
// import RNDateTimePicker from "@react-native-community/datetimepicker";

const FormInvoiceDistributor = ({navigation}) => {
  const [agree, setAgree] = useState(false);

  const inputsImages = [
    {
      title: "Invoice Fisik",
    },
  ];

  const data = [
    { label: "Distributor 1", value: "1" },
    { label: "Distributor 2", value: "2" },
    { label: "Distributor 3", value: "3" },
    { label: "Distributor 4", value: "4" },
  ];

  const [date, setDate] = useState("09-10-2023");
  const [value, setValue] = useState(null);

  const renderItem = (item) => {
    return (
      <View style={styles.item}>
        <Text style={styles.textItem}>{item.label}</Text>
        {item.value === value && (
          <Text
            style={styles.icon}
            color="black"
            name="Safety"
            size={20}
          />
        )}
      </View>
    );
  };
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
            marginTop:15,
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
            marginTop:15,
          }}
        >
          <TextInput
            style={styles.input}
            placeholder="Jumlah Tagihan"
            // onChangeText={handleChange("addres")}
            // value={addres}
          />
        </View>

        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            width: "329px",
            marginTop: 15,
          }}
        >
          <DatePicker
            style={styles.datePickerStyle}
            date={date}
            mode="date"
            placeholder="select date"
            format="DD/MM/YYYY"
            minDate="01-01-1900"
            maxDate="01-01-2000"
            confirmBtnText="Confirm"
            cancelBtnText="Cancel"
            customStyles={{
              dateIcon: {
                position: "absolute",
                right: -5,
                top: 4,
                marginLeft: 0,
              },
              dateInput: {
                borderColor: "gray",
                alignItems: "flex-start",
                borderWidth: 0,
                borderBottomWidth: 1,
              },
              placeholderText: {
                fontSize: 17,
                color: "gray",
              },
              dateText: {
                fontSize: 17,
              },
            }}
            onDateChange={(date) => {
              setDate(date);
            }}
          />
          {/* <RNDateTimePicker maximumDate={new Date(2030, 10, 20)} /> */}
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
          <DatePicker
            style={styles.datePickerStyle}
            date={date}
            mode="date"
            placeholder="select date"
            format="DD/MM/YYYY"
            minDate="01-01-1900"
            maxDate="01-01-2000"
            confirmBtnText="Confirm"
            cancelBtnText="Cancel"
            customStyles={{
              dateIcon: {
                position: "absolute",
                right: -5,
                top: 4,
                marginLeft: 0,
              },
              dateInput: {
                borderColor: "gray",
                alignItems: "flex-start",
                borderWidth: 0,
                borderBottomWidth: 1,
              },
              placeholderText: {
                fontSize: 17,
                color: "gray",
              },
              dateText: {
                fontSize: 17,
              },
            }}
            onDateChange={(date) => {
              setDate(date);
            }}
          />
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

export default FormInvoiceDistributor;

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
