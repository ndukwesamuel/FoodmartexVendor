import { View, Text } from "react-native";
import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Home from "../screens/UserScreens/Home";
import DeliveryMap from "../screens/UserScreens/DeliveryMap";
import RatingPage from "../screens/UserScreens/RatingPage";
import FoodDetails from "../screens/UserScreens/FoodDetails";
import GetEverythingPage from "../screens/UserScreens/GetEverythingPage";
import DeliveredOrders from "../screens/Orders/DeliveredOrders";
import MyOrder from "../screens/Orders/MyOrder";
import MyFavorite from "../screens/Orders/MyFavorite";
import FAQs from "../screens/FAQs";
import FirstRewardScreen from "../screens/Reward/RewardSreen1";
// import SecondRewardScreen from "../screens/Reward/RewardScreen2";
import HomeScreen from "../screens/HomeScreen";
import MainHomescreen from "../screens/UserScreens/MainHomescreen";
import RestaurantMenuScreen from "../screens/UserScreens/RestaurantMenuScreen";
import CheckoutPage from "../screens/UserScreens/CheckoutPage";
import SupportMainPage from "../screens/Support/supportMainPage";
import ReportIssuePage from "../screens/Support/reportIssuePage";
import ChatPage from "../screens/Support/chatPage";
import Wallet from "../screens/Wallet/Wallet";
import WithdrawalScreen from "../screens/Wallet/WithdrawalScreen";
import TopupScreen from "../screens/Wallet/TopupScreen";
// import PersonalInfomationScreen from "../screens/UserScreens/PersonalInfomationScreen";
import SecondRewardScreen from "../screens/Reward/RewardScreen2";
import PersonalInfomationScreen from "../screens/UserScreens/PersonalInfomationScreen";
import DetailsPage from "../screens/Detail/detailsPage";
import TopupScreen2 from "../screens/Wallet/TopupScreen2";
import Notification from "../screens/Notification";
import CompleteOrder from "../screens/UserScreens/CompleteOrder";
import UpdatePassword from "../screens/Detail/updatePassword";
import CancelDelivery from "../screens/UserScreens/CancelDelivery";
import OrderStatus from "../screens/UserScreens/OrderStatus";
// import DeliveredOrders from "../screens/Orders/DeliveredOrders";
const Stack = createNativeStackNavigator();

export default function UserNavigation() {
  return (
    <Stack.Navigator
      initialRouteName="Home"
      screenOptions={{ headerShown: false }}
    >
      <Stack.Screen name="Home" component={HomeScreen} />
      <Stack.Screen name="MainHomescreen" component={MainHomescreen} />
      <Stack.Screen
        name="RestaurantMenuScreen"
        component={RestaurantMenuScreen}
      />

      <Stack.Screen name="FoodDetails" component={FoodDetails} />
      <Stack.Screen name="GetEverything" component={GetEverythingPage} />
      <Stack.Screen name="CheckoutPage" component={CheckoutPage} />

      <Stack.Screen name="DeliveryMap" component={DeliveryMap} />
      <Stack.Screen name="RatingPage" component={RatingPage} />
      <Stack.Screen name="CompleteOrder" component={CompleteOrder} />
      <Stack.Screen name="Notification" component={Notification} />
      <Stack.Screen name="CancelDelivery" component={CancelDelivery} />
      <Stack.Screen name="OrderStatus" component={OrderStatus} />
      {/* this group of screen is for order  start  dont remove it */}
      <Stack.Screen name="DeliveredOrders" component={DeliveredOrders} />
      <Stack.Screen name="MyFavorite" component={MyFavorite} />
      <Stack.Screen name="MyOrder" component={MyOrder} />

      <Stack.Screen name="FirstRewardPage" component={FirstRewardScreen} />
      {/* <Stack.Screen name="SecondRewardPage" component={SecondRewardScreen} /> */}
      <Stack.Screen name="Support" component={SupportMainPage} />
      <Stack.Screen name="ReportIssue" component={ReportIssuePage} />
      <Stack.Screen name="Chat" component={ChatPage} />
      <Stack.Screen name="RewardsScreen" component={FirstRewardScreen} />
      <Stack.Screen name="PointHistory" component={SecondRewardScreen} />
      <Stack.Screen name="Detail" component={DetailsPage} />
      <Stack.Screen name="Detail" component={DetailsPage} />
      <Stack.Screen name="updatePassword" component={UpdatePassword} />

      {/* the order screen end here */}

      <Stack.Screen name="FAQs" component={FAQs} />
      <Stack.Screen
        name="PersonalInfomationScreen"
        component={PersonalInfomationScreen}
      />

      {/* { Wallet screens start here} */}
      <Stack.Screen name="WithdrawalScreen" component={WithdrawalScreen} />
      <Stack.Screen name="TopupScreen" component={TopupScreen} />
      <Stack.Screen name="TopupScreen2" component={TopupScreen2} />
      <Stack.Screen name="Wallet" component={Wallet} />
    </Stack.Navigator>
  );
}
