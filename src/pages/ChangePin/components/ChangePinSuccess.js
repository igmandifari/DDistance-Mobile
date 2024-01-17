import { StyleSheet, Text, View, Image } from "react-native";
import React from "react";
import {colors} from "../../../../src/constant/colors"
import CustomButton from "../../../components/CustomButton";
import {useSelector} from "react-redux";
import {putChangePin} from "../../../services/merchantServices";
import {putChangePinDistributor} from "../../../services/distributorService";

const ChangePinSuccess = ({navigation}) => {
    const {token} = useSelector(state => state.user);
    const {role} = useSelector(state => state.user);

    return (
        <View style={styles.container}>
            <View style={styles.imageContainer}>
                <Image
                    style={styles.image}
                    source={require("../../../assets/img/success.png")}
                />
            </View>
            <Text style={styles.title}>PIN berhasil diubah</Text>
            <Text style={styles.description}>
                Silahkan kembali ke menu utama
            </Text>
            <View
                style={{
                    height: "20%",
                    justifyContent: "flex-end",
                    width: "100%",
                }}
            >
                <CustomButton
                    text="Kembali"
                    handleClick={() => {
                        if(role == "ROLE_MERCHANT"){
                            navigation.navigate("dashboard-merchant");
                        }else if(role == "ROLE_DISTRIBUTOR"){
                            navigation.navigate("dashboard-distributor");
                        }
                    }}
                />
            </View>
        </View>
    );
}

export default ChangePinSuccess;

const styles = StyleSheet.create({
    container: {
        backgroundColor: colors.FLORAL_WHITE,
        height: "100%",
        padding: 25,
        alignItems: "center",
        justifyContent: "flex-end",
        gap: 15,
    },
    imageContainer: {
        borderRadius: 1000,
        // backgroundColor: "white",
        width: 301,
        height:100,
        justifyContent: "center",
        alignItems: "center",
        marginBottom: 65,
    },
    image: {
        width: "60%",
    },
    title: {
        color: colors.ORANGE,
        fontSize: 20,
        fontWeight: "700",
    },
    description: {
        fontWeight: "400",
        fontSize: 15,
        color: colors.DARK_GRAY,
        marginBottom:20,
    },
});