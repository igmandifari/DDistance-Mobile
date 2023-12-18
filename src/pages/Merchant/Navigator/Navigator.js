import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Profile from "../Profile";
import Bill from "../Bill/index";
import DashboardMerchant from "../Dashboard";
import { MaterialCommunityIcons, FontAwesome5 } from "@expo/vector-icons";
import RequestPage from "../Request";

const Tab = createBottomTabNavigator();

const tablist = [
  {
    name: "Dasbor",
    component: DashboardMerchant,
    iconName: "home",
  },
  {
    name: "Pengajuan",
    component: RequestPage,
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

function MyTabsMerchant() {
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

export default MyTabsMerchant;
