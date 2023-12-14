import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Dashboard from "../pages/Distributor/Dashboard";
import Profile from "../pages/Merchant/Profile";
import Bill from "../pages/Merchant/Bill";
import History from "../pages/Merchant/History";
import DashboardMerchant from "../pages/Merchant/Dashboard";
import { MaterialCommunityIcons, FontAwesome5 } from "@expo/vector-icons";

const Tab = createBottomTabNavigator();

const tablist = [
  {
    name: "Dasbor",
    component: DashboardMerchant,
    iconName: "home",
  },
  {
    name: "Pengajuan",
    component: History,
    iconName: "file-document-edit-outline",
  },
  {
    name: "Tagihan",
    component: Bill,
    iconName: "file-document-multiple",
  },
  {
    name: "Profile",
    component: Profile,
    iconName: "account",
  },
];

{
  /* <MaterialCommunityIcons name="account" color={color} size={size} />
<FontAwesome5 name="file-invoice" color={color} size={size} /> */
}

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
                <MaterialCommunityIcons
                  name={item.iconName}
                  color={color}
                  size={size}
                />
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
