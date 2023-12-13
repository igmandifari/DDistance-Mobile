import React from "react";
import { View, StyleSheet } from "react-native";
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { MaterialCommunityIcons, FontAwesome5 } from '@expo/vector-icons';
import Dashboard from './../pages/Merchant/Dashboard'; // Import your existing DashboardMerchant component

const Tab = createBottomTabNavigator();

const BottomNavigation = () => {
  return (
    <View style={styles.container}> 
    <Tab.Navigator
    style={styles.container}
        initialRouteName="BottomNavigation"
        screenOptions={{
            tabBarActiveTintColor: '#F36C21',
            tabBarLabelStyle: {
            fontSize: 12,
            fontWeight: 'bold',
            },
        }}
        >
      <Tab.Screen
      style={styles.container}
        name="Dashboard"
        component={Dashboard} 
        options={{
          tabBarLabel: 'Dashboard',
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="home" color={color} size={size} />
          ),
          headerShown: false, 
        }}
      />
      {/* <Tab.Screen
        name="Pengajuan"
        component={Pengajuan}
        options={{
          tabBarLabel: 'Pengajuan',
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="file-document-edit-outline" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="Invoice"
        component={Invoice}
        options={{
          tabBarLabel: 'Invoice',
          tabBarIcon: ({ color, size }) => (
            <FontAwesome5 name="file-invoice" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="Profile"
        component={Profile}
        options={{
          tabBarLabel: 'Profile',
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="account" color={color} size={size} />
          ),
        }}
      /> */}
    </Tab.Navigator>
    </View>
   
  );
};

export default BottomNavigation;

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#FFF1CD",
    // backgroundColor: "white",
    justifyContent: "flex-start",
    height: "100%",
  },
});