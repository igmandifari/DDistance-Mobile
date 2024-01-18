import * as React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import LandingPage from "./src/pages/LandingPage";
import Login from "./src/pages/Login";
import Register from "./src/pages/Register";
import RegisterSuccess from "./src/pages/Register/components/RegisterSuccess";
import MyTabsDashboard from "./src/pages/Distributor/Navigator/NavigatorDashboard";
import MyTabsMerchant from "./src/pages/Merchant/Navigator/Navigator";
import EditProfile from "./src/pages/Merchant/Profile/components/EditProfile";
import KeamananAkun from "./src/pages/Merchant/Profile/components/KeamananAkun";
import ChangePassword from "./src/pages/ChangePassword/ChangePassword";
import ChangePasswordSuccess from "./src/pages/ChangePassword/ChangePasswordSuccess";
import FormInvoice from "./src/pages/Merchant/Bill/components/FormInvoice";
import Bill from "./src/pages/Merchant/Bill";
import DetailInvoice from "./src/pages/Merchant/Bill/components/DetailInvoice";
import store from "./src/store/store";
import { Provider } from "react-redux";
import OtpRequestMerchant from "./src/pages/Merchant/Insurance/components/OtpRequestInsurance";
import DetailRequestInsurance from "./src/pages/Merchant/Insurance/components/DetailRequest";
import FormRequestInsurance from "./src/pages/Merchant/Insurance/components/FormRequest";
import OtpInvoiceMerchant from "./src/pages/Merchant/Bill/components/OtpInvoiceMerchant";
import DetailInvoiceDistributor from "./src/pages/Distributor/Bill/components/DetailInvoiceDistributor";
import DetailDistributor from "./src/pages/Merchant/Dashboard/DetaiDistributor";
import HistoryBillInvoiceMerchant from "./src/pages/Merchant/Bill/components/HistoryBillInvoiceMerchant";
import DetailInvoiceBillMerchant from "./src/pages/Merchant/Bill/components/DetailInvoiceBillMerchant.js";
import DetailToko from "./src/pages/Distributor/Bill/components/DetailToko";
import HistoryInvoiceCicilanDistributor from "./src/pages/Distributor/Bill/components/HistoryInvoiceCicilanDistributor";
import InvoiceDistributor from "./src/pages/Distributor/Bill/components/InvoiceDistributor";
import TenorSetting from "./src/pages/Merchant/Payment";
import OtpTenor from "./src/pages/Merchant/Payment/components/OtpTenor";
import PinPayment from "./src/pages/Merchant/Payment/components/PinPayment.js";
import OtpPaymentInvoiceAll from "./src/pages/Merchant/Payment/components/OtpPaymentInvoiceAll.js";
import OtpPaymentInvoice from "./src/pages/Merchant/Payment/components/OtpPaymentInvoice.js";
import NotificationDistributor from "./src/pages/Distributor/Notification/notification";
import NotificationMerchant from "./src/pages/Merchant/Notification/notification";
import CreditHistory from "./src/pages/Distributor/CreditHistory/creditHistory";
import OtpChangePassword from "./src/pages/ChangePassword/OtpChangePassword";
import OtpInvoiceDistributor from "./src/pages/Distributor/Bill/components/OtpInvoiceDistributor";
import BillDistributor from "./src/pages/Distributor/Bill";
import SuccessNewPassword from "./src/pages/ForgetPassword/components/SuccessNewPassword.js";
import SuccessNewPIN from "./src/pages/Merchant/ForgetPIN/components/SuccessNewPIN.js";
import ChangePin from "./src/pages/ChangePin";
import ChangePinSuccess from "./src/pages/ChangePin/components/ChangePinSuccess";
import OtpChangePin from "./src/pages/ChangePin/components/OtpChangePin";

import PinPaymentAll from "./src/pages/Merchant/Payment/components/PinPaymentAll";
import Profile from "./src/pages/Merchant/Profile";
import HistoryTenorSet from "./src/pages/Merchant/Bill/components/HistoryTenorSet";
import TenorSuccessSetting from "./src/pages/Merchant/Payment/components/TenorSuccessSetting";
import ForgetPassword from "./src/pages/ForgetPassword/ForgetPassword";


const routerList = [
  {
    name: "landing-page",
    component: LandingPage,
    headerShown: false,
  },

  {
    name: "dashboard-merchant",
    component: MyTabsMerchant,
    headerShown: false,
  },
  {
    name: "dashboard-distributor",
    component: MyTabsDashboard,
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
    name: "forget-password",
    component: ForgetPassword,
    headerShown: false,
  },
  {
    name: "register-success",
    component: RegisterSuccess,
    headerShown: false,
  },
  {
    name: "form-request-assurance",
    component: FormRequestInsurance,
    headerShown: false,
  },
  {
    name: "otp-request-insurance",
    component: OtpRequestMerchant,
    headerShown: false,
  },
  {
    name: "detail-request-insurance",
    component: DetailRequestInsurance,
    headerShown: false,
  },
  {
    name: "edit-profile",
    component: EditProfile,
    headerShown: false,
  },
  {
    name: "profile",
    component: Profile,
    headerShown: false,
  },
  {
    name: "keamanan-akun",
    component: KeamananAkun,
    headerShown: false,
  },
  {
    name: "change-password",
    component: ChangePassword,
    headerShown: false,
  },
  {
    name: "change-password-success",
    component: ChangePasswordSuccess,
    headerShown: false,
  },
  {
    name: "form-invoice",
    component: FormInvoice,
    headerShown: false,
  },
  {
    name: "Bill",
    component: Bill,
    headerShown: false,
  },
  {
    name: "detail-invoice",
    component: DetailInvoice,
    headerShown: false,
  },
  {
    name: "otp-invoice-merchant",
    component: OtpInvoiceMerchant,
    headerShown: false,
  },
  {
    name: "detail-invoice-distributor",
    component: DetailInvoiceDistributor,
    headerShown: false,
  },
  {
    name: "detail-distributor-merchant",
    component: DetailDistributor,
    headerShown: false,
  },
  {
    name: "history-bill-merchant",
    component: HistoryBillInvoiceMerchant,
    headerShown: false,
  },
  {
    name: "detail-invoice-bill-merchant",
    component: DetailInvoiceBillMerchant,
    headerShown: false,
  },
  {
    name: "detail-toko",
    component: DetailToko,
    headerShown: false,
  },
  {
    name: "history-bill-distributor",
    component: HistoryInvoiceCicilanDistributor,
    headerShown: false,
  },
  {
    name: "invoice-distributor",
    component: InvoiceDistributor,
    headerShown: false,
  },
  // Payment menu
  {
    name: "tenor-setting",
    component: TenorSetting,
    headerShown: false,
  },
  {
    name: "tenor-success-setting",
    component: TenorSuccessSetting,
    headerShown: false,
  },
  {
    name: "otp-tenor",
    component: OtpTenor,
    headerShown: false,
  },
  {
    name: "pin-payment",
    component: PinPayment,
    headerShown: false,
  },
  {
    name: "pin-payment-all",
    component: PinPaymentAll,
    headerShown: false,
  },
  {
    name: "otp-change-merchant",
    component: OtpChangePassword,
    headerShown: false,
  },
  {
    name: "otp-payment-invoice",
    component: OtpPaymentInvoice,
    headerShown: false,
  },

  {
    name: "notificationDistributor",
    component: NotificationDistributor,
    headerShown: false,
  },
  {
    name: "tenor-setting-history",
    component: HistoryTenorSet,
    headerShown: false,
  },
  {
    name: "notificationMerchant",
    component: NotificationMerchant,
    headerShown: false,
  },
  {
    name: "creditHistory",
    component: CreditHistory,
    headerShown: false,
  },
  {
    name: "otp-invoice-ditributor",
    component: OtpInvoiceDistributor,
    headerShown: false,
  },
  {
    name: "otp-payment-invoice-all",
    component: OtpPaymentInvoiceAll,
    headerShown: false,
  },
  {
    name: "bill-distributor",
    component: BillDistributor,
    headerShown: false,
  },
  {
    name: "successNewPassword",
    component: SuccessNewPassword,
    headerShown: false,
  },
  {
    name: "successNewPIN",
    component: SuccessNewPIN,
    headerShown: false,
  },
  {
    name: "changePin",
    component: ChangePin,
    headerShown: false,
  },
  {
    name: "changePinSuccess",
    component: ChangePinSuccess,
    headerShown: false,
  },
  {
    name: "otpChangePin",
    component: OtpChangePin,
    headerShown: false,
  },
];

const Stack = createNativeStackNavigator();

function App() {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <Stack.Navigator>
          {routerList.map((item, index) => {
            return (
              <Stack.Screen
                key={index}
                name={item.name}
                component={item.component}
                options={{ headerShown: item.headerShown }}
                initialParams={{ isSuccess: false }}
              />
            );
          })}
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
}

export default App;

// /home/user/Android/Sdk
