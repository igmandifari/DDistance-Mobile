import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import Dashboard from "../pages/Distributor/Dashboard";
import Profile from "../pages/Merchant/Profile";
import Bill from "../pages/Merchant/Bill";
import History from "../pages/Merchant/History";
import DashboardMerchant from "../pages/Merchant/Dashboard";

const Tab = createBottomTabNavigator();

const tablist = [
  {
    name: "Home",
    component: DashboardMerchant,
    iconName: "home",
  },
  {
    name: "History",
    component: History,
    iconName: "home",
  },
  {
    name: "Bill",
    component: Bill,
    iconName: "home",
  },
  {
    name: "Profile",
    component: Profile,
    iconName: "home",
  },
];

function MyTabs() {
  return (
    <Tab.Navigator>
      {tablist.map((item, index) => {
        return (
          <Tab.Screen
            key={index}
            name={item.name}
            component={item.component}
            options={{
              headerShown: false,
              tabBarLabel: item.name,
              tabBarIcon: ({ color, size }) => (
                <MaterialCommunityIcons name="home" color={color} size={size} />
              ),
            }}
          />
        );
      })}
      {/* <Tab.Screen
        name="Home"
        component={Dashboard}
        options={{
          tabBarLabel: "Home",
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="home" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen name="History" component={History} />
      <Tab.Screen name="Bill" component={Bill} />
      <Tab.Screen name="Profile" component={Profile} /> */}
      {/* <Tab.Screen name="Settings" component={SettingsScreen} /> */}
    </Tab.Navigator>
  );
}

export default MyTabs;
