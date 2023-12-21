import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { Button } from "react-native-elements";

const BillDistributor = ({ navigation }) => {
  return (
    <View>
      <Text>BillDistributor</Text>
      <Button onPress={() => navigator.navigate("")} />
    </View>
  );
};

export default BillDistributor;

const styles = StyleSheet.create({});
