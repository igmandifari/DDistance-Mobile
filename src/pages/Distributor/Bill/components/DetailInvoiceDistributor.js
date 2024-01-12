import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
} from "react-native";
import React,{useState, useEffect} from "react";
import { colors } from "../../../../constant/colors";
import { getDetailInvoice } from "../../../../services/distributorService";
import { useSelector } from "react-redux";
import CustomButton from "../../../../components/CustomButton";
import PopUpConfirm from "../../../../components/PopUpConfirm";
import { TextInput } from "react-native-gesture-handler";

const DetailInvoiceDistributor = ({route,navigation}) => {
  const { token } = useSelector((state) => state.user);
  const { idInvoice } = route?.params;
  console.log("ini id ====>",idInvoice);
  const [data, setData] = useState({
    id: null,
    judul:null,
    namaToko: null,
    namaDistributor: null,
    tanggalTagihan: null,
    jumlahTagihan: null,
    tanggalJatuhTempo:null,
    rejection:null,
  });
  const [popUp, setPopUp] = useState(false);
  
  const getDetail = async () => {
    try{
      const response = await getDetailInvoice(token, idInvoice);
      console.log("=========>",response.data)
      const { id, judul, namaToko, namaDistributor,tanggalTagihan,jumlahTagihan,tanggalJatuhTempo,rejection} = response.data.data;
      setData({
      id,
      judul,
      namaToko,
      namaDistributor,
      tanggalTagihan,
      jumlahTagihan,
      tanggalJatuhTempo,
      rejection,
      });
    }catch (error) {
      console.error("Error fetching invoice data:", error);
    }
  };

  useEffect(() => {
    getDetail();
  }, []);

const details = [
  {
    key: "No Invoice :",
    value: "Invoice " + data.judul,
  },
  {
    key: "Tanggal Invoice :",
    value: data.tanggalTagihan,
  },
  {
    key: "Nama Toko :",
    value: data.namaToko,
  },
  {
    key: "Nama Distributor :",
    value: data.namaDistributor,
  },
  {
    key: "Total Tagihan :",
    value: data.jumlahTagihan,
  },
  {
    key: "Tanggal Jatuh Tempo :",
    value: data.tanggalJatuhTempo,
  },
  {
    key: "Rejection",
    value: data.rejection,
  },
];


/* const DetailInvoiceDistributor = ({navigation}) => {
  const [popUp, setPopUp] = useState(false);
  const handleSubmit = () => { */
    // const payload = {

    // };
  
    // if (!useValidate(payload)) {
    //   alert("data must not empty");
    //   return;
    // }
/*     setPopUp(true);
    navigation.navigate("otp-invoice-merchant");
  }; */
  return (
    <SafeAreaView style={{ marginTop: 20 }}>
      <View style={styles.container}>
      {popUp && (<PopUpConfirm
            handleOK={() => handleSubmit()}
            handleReject={() => setPopUp(false)}
          />
        )}
        <Text style={styles.title}>Pengajuan 0000000</Text>
        <View
          style={{
            borderBottomColor: "black",
            borderWidth: 2,
            elevation: 2,
            borderBottomWidth: StyleSheet.hairlineWidth,
          }}
        />
        {details.map((item, idx) => {
          return (
            <View
              key={idx}
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                borderColor: "green",
                marginTop: 10,
              }}
            >
              <Text style={{ fontSize: 13, fontWeight: "400" }}>
                {item.key} 
              </Text>
              <Text>{item.value} </Text>
            </View>
          );
        })}
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            padding: 10,
          }}
        >
          <TouchableOpacity
            onPress={() => navigation.navigate("")}
            style={{
              borderRadius: 10,
              backgroundColor: "#00E817",
              paddingVertical: 10,
              width: 160,
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Text style={{ fontSize: 16, fontWeight: 600, color: "white" }}>
              Setuju
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => navigation.navigate("")}
            style={{
              borderRadius: 10,
              backgroundColor: "#FC0000",
              paddingVertical: 10,
              width: 160,
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Text style={{ fontSize: 16, fontWeight: 600, color: "white" }}>
              Tolak
            </Text>
          </TouchableOpacity>
        </View>
        <Text>Alasan Ditolak:</Text>
        <View style={{ flex: 1 }}>
          <View
            style={{
              backgroundColor: colors.WHITE,
              borderRadius: 10,
              padding: 10,
              // flex: 1,
              elevation: 10,
              height: "20%",
            }}
          >
            <Text>Dokumen belum lengkap</Text>
          </View>
          <View style={{ marginTop: 20 }}>
            <Text>Lainnya:</Text>
            <View
              style={{
                backgroundColor: colors.WHITE,
                borderRadius: 10,
                elevation: 10,
                height: "35%",
                marginTop: 8,
              }}
            >
              <Text></Text>
            </View>
          </View>
          <View style={{ alignItems: "center" }}>
          <CustomButton
           handleClick={() => setPopUp(true)}
           text={"Kirim"}
          />
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default DetailInvoiceDistributor;

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.FLORAL_WHITE,
    height: "100%",
    padding: 25,
    gap: 10,
  },
  title: {
    fontSize: 32,
    fontWeight: "700",
  },
});
