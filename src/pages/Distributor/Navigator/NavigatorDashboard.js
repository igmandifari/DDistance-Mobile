import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Profile from "../../Merchant/Profile/index";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import DashboardDistributor from "../Dashboard/index";
import BillDistributor from "../Bill";
import RequestPage from "../../Merchant/Insurance";

const Tab = createBottomTabNavigator();

const tablist = [
  {
    name: "Dasbor",
    component: DashboardDistributor,
    iconName: "home",
  },
  {
    name: "History",
    component: RequestPage,
    iconName: "file-document-edit-outline",
  },
  {
    name: "Tagihan",
    component: BillDistributor,
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

function MyTabsDashboard() {
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

export default MyTabsDashboard;
