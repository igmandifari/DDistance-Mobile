import { Button, StyleSheet, Text, TouchableOpacity } from "react-native";
import React from "react";

const CustomButton = ({ text, bgColor, color, handleClick, disabled }) => {
  const styles = StyleSheet.create({
    container: {
      width: "100%",
      alignContent: "center",
      paddingVertical: 15,
      backgroundColor: bgColor || "#F36C21",
      borderRadius: 10,
    },
    text: {
      color: color || "white",
      textAlign: "center",
      fontSize: 18,
      fontWeight: "700",
    },
  });
  return (
    <TouchableOpacity
      disabled={disabled}
      style={styles.container}
      onPress={handleClick}
    >
      <Text style={styles.text}>{text}</Text>
    </TouchableOpacity>
  );
};

export default CustomButton;
