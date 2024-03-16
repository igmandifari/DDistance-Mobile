import {
    SafeAreaView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from "react-native";
import React, { useState, useEffect } from "react";
import { colors } from "../../constant/colors";
import OtpInputs from "react-native-otp-inputs";
import CustomButton from "../../components/CustomButton";
import {useSelector} from "react-redux";
import {sendOtpChangePassword} from "../../services/merchantServices";
import {sendOtpInvoiceDistributor} from "../../services/distributorService";
import {boolean} from "yup";

const ChangePin = ({navigation, route}) => {
    const {token} = useSelector(state => state.user);
    const {role} = useSelector(state => state.user);
    const [oldPin, setOldPin] = useState("");
    const [newPin, setNewPin] = useState("");
    const [confirmPin, setConfirmPin] = useState("");

    const handleSubmit = async () => {
        if(oldPin.length === 6 && newPin.length === 6 && confirmPin.length === 6){
        }else {
            alert("Lengkapi semua inputan");
            return;
        }

        if(role == "ROLE_MERCHANT"){
            await sendOtpChangePassword(token);
        }else if(role == "ROLE_DISTRIBUTOR"){
            await sendOtpInvoiceDistributor(token);
        }

        navigation.navigate("otpChangePin", {
            oldPin, newPin, confirmPin
        })
    }

    return (
        <SafeAreaView style={{ marginTop: 25 }}>
            <View style={styles.container}>
                <Text style={{ textAlign: "center", fontSize: 17, fontWeight: "400" }}>
                    Masukan PIN Lama
                </Text>
                <View style={styles.otp}>
                    <OtpInputs
                        value={oldPin}
                        handleChange={(code) => setOldPin(code)}
                        numberOfInputs={6}
                    />
                </View>
                <View>
                    <TouchableOpacity
                        onPress={() => navigation.navigate("forgetPIN")}>
                        <Text
                            style={{
                                textDecorationLine: "underline",
                                color: colors.ORANGE,
                                top: 100,
                                textAlign: "center",
                            }}
                        >
                            Lupa PIN?
                        </Text>
                    </TouchableOpacity>
                </View>

                <View style={{marginTop: "40%"}}>
                    <Text style={{ textAlign: "center", fontSize: 17, fontWeight: "400" }}>
                        Masukan PIN Baru
                    </Text>
                    <View style={styles.otp}>
                        <OtpInputs
                            value={newPin}
                            handleChange={(code) => setNewPin(code)}
                            numberOfInputs={6}
                        />
                    </View>
                </View>

                <View style={{marginTop: "40%"}}>
                    <Text style={{ textAlign: "center", fontSize: 17, fontWeight: "400" }}>
                        Konfirmasi PIN Baru
                    </Text>
                    <View style={styles.otp}>
                        <OtpInputs
                            value={confirmPin}
                            handleChange={(code) => setConfirmPin(code)}
                            numberOfInputs={6}
                        />
                    </View>
                </View>

                <View
                    style={{
                        flex: 1,
                        marginTop: 300,
                        justifyContent: "flex-end",
                    }}
                >
                    <CustomButton
                        text={"Lanjut"}
                        handleClick={() => handleSubmit()}
                    />
                </View>
            </View>


        </SafeAreaView>
    );
}

export default ChangePin;

const styles = StyleSheet.create({
    container: {
        height: "100%",
        backgroundColor: colors.FLORAL_WHITE,
        padding: 25,
    },
    otp: {
        alignItems: "center",
    },
});