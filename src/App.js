import * as React from "react";
import { View, Text } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import LandingPage from "./pages/LandingPage";
import Login from "./pages/Login";
import Register from "./pages/Register";
import header from "./components/header";
import RegisterSuccess from "./pages/Register/components/RegisterSuccess";
import DashboardDistributor from "./pages/Distributor/Dashboard";
import DashboardMerchant from "./pages/Merchant/Dashboard";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons } from "@expo/vector-icons";
import BottomNavigator from "./components/BottomNavigator";

const routerList = [
  {
    name: "landing-page",
    component: LandingPage,
    headerShown: false,
  },
  {
    name: "login",
    component: Login,
    headerShown: false,
  },
  {
    name: "register",
    component: Register,
    headerShown: false,
  },
  {
    name: "register-success",
    component: RegisterSuccess,
    headerShown: false,
  },
  {
    name: "dashboard-distributor",
    component: DashboardDistributor,
    headerShown: false,
  },
  {
    name: "bottom-navigator",
    component: BottomNavigator,
    headerShown: false,
  },

  {
    name: "dashboard-merchant",
    component: DashboardMerchant,
    headerShown: false,
  },
];

const Stack = createNativeStackNavigator();

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        {routerList.map((item) => {
          return (
            <Stack.Screen
              name={item.name}
              component={item.component}
              options={{ headerShown: item.headerShown }}
            />
          );
        })}
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
