import React, {useEffect, useRef, useState} from "react";
import {SafeAreaView, StyleSheet, Text, TouchableOpacity, View} from "react-native";
import PopUpSuccess from "../../../components/PopUpSuccess";
import {colors} from "../../../constant/colors";
import CustomButton from "../../../components/CustomButton";
import {useSelector} from "react-redux";
import {putChangePin, sendOtpChangePassword} from "../../../services/merchantServices";
import {putChangePinDistributor, sendOtpInvoiceDistributor} from "../../../services/distributorService";
import OtpInputs from "react-native-otp-inputs/lib";


const OtpChangePin = ({navigation, route}) => {
    const [popUp, setPopUp] = useState(false);
    const [timer, setTimer] = useState(60);
    const otpRef = useRef(null);
    const { oldPin, newPin, confirmPin } = route.params;
    const {token} = useSelector(state => state.user);
    const {role} = useSelector(state => state.user);

    useEffect(() => {
        if (timer > 0) {
            const intervalId = setInterval(() => {
                setTimer((prevTimer) => prevTimer - 1);
            }, 1000);

            return () => clearInterval(intervalId);
        }
    }, [timer]);

    const sendOtp = async () => {
        console.log("Sending OTP");
        if(role == "ROLE_MERCHANT"){
            await sendOtpChangePassword(token);
        }else if(role == "ROLE_DISTRIBUTOR"){
            await sendOtpInvoiceDistributor(token);
        }
        otpRef.current.setState({ otpCode: [] });
        setTimer(60);
    }

    const handleSubmit = async () => {
        const enteredOtp = otpRef.current.state.otpCode.join("");
        if (enteredOtp.length !== 6) {
            alert("OTP Not Valid");
            return;
        }

        try {
            if(role == "ROLE_MERCHANT"){
                putChangePin(token, enteredOtp, oldPin, newPin, confirmPin);
            }else if(role == "ROLE_DISTRIBUTOR"){
                putChangePinDistributor(token, enteredOtp, oldPin, newPin, confirmPin);
            }
            console.log("Password changed successfully");
            navigation.navigate("changePinSuccess")
        } catch (error) {
            console.error(error);
            alert("Failed to change password");
        }
    }

    return (
        <SafeAreaView style={{ marginTop: 25 }}>
            <View style={styles.container}>
                {popUp && <PopUpSuccess />}
                <View>
                    <Text style={{ textAlign: "center", fontSize: 20, fontWeight: "400" }}>
                        Masukkan Kode OTP yang telah {"\n"} dikirim ke alamat email Anda untuk
                        {"\n"} verifikasi ubah password:
                    </Text>
                    <View style={styles.otp}>
                        <OtpInputs
                            ref={otpRef}
                            handleChange={(code) => console.log("OTP changed:", code)}
                            numberOfInputs={6}
                        />
                    </View>
                    <View>
                        <TouchableOpacity onPress={() => sendOtp()}>
                            <Text
                                style={{
                                    textDecorationLine: "underline",
                                    color: colors.ORANGE,
                                    top: 100,
                                    textAlign: "center",
                                }}
                            >
                                {timer > 0 ? `00.${timer}` : ""} Kirim Ulang OTP
                            </Text>
                        </TouchableOpacity>
                    </View>
                </View>
                <View style={{ flex: 1, justifyContent: "flex-end" }}>
                    <CustomButton text={"Kirim Permintaan"} handleClick={() => handleSubmit()} />
                </View>
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        height: "100%",
        backgroundColor: colors.FLORAL_WHITE,
        padding: 25,
    },
    otp:{
        alignItems:"center",
    }
});

export default OtpChangePin;