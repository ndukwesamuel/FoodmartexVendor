import { StyleSheet, Text, View, ActivityIndicator } from "react-native";
import "react-native-gesture-handler";
import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";
import React, { useEffect, useState } from "react";

import { useCallback } from "react";
import { Provider, useDispatch, useSelector } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { persistor, store } from "./Redux/store";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";

import { QueryClient, QueryClientProvider } from "react-query";

import { NavigationContainer, useNavigation } from "@react-navigation/native";
import Toast from "react-native-toast-message";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import AsyncStorage from "@react-native-async-storage/async-storage";

// onBoarding screen and actions
import { onBoaringAction, reset_isOnboarding } from "./Redux/OnboardingSlice";
import OnBoardingPage from "./screens/OnboardingPage";
import Auth from "./screens/Auth";

// otp screen
import OtpScreen from "./screens/OtpScreen";

import UserNavigation from "./Navigation/UserNavigation";
import Security from "./components/Auth/Security";
import { UserProfile_Fun, reset_login } from "./Redux/AuthSlice";
import {
  BankDetails,
  DeliveryAndPackaging,
  FoodSafetyCertification,
  OpeningHours,
  StepTwoSignUp,
  UploadCACDocument,
} from "./components/Auth/VendorSignup";

const queryClient = new QueryClient();

const Stack = createNativeStackNavigator();
const screenOptions = {
  headerShown: false, // This hides the header for all screens by default
};

SplashScreen.preventAutoHideAsync();
export default function App() {
  const [fontsLoaded] = useFonts({
    "RobotoSlab-SemiBold": require("./assets/font/RobotoSlab-SemiBold.ttf"),
    "RobotoSlab-Medium": require("./assets/font/RobotoSlab-Medium.ttf"),
    "RobotoSlab-Light": require("./assets/font/RobotoSlab-Light.ttf"),
    "RobotoSlab-Regular": require("./assets/font/RobotoSlab-Regular.ttf"),
    "Inter-Regular": require("./assets/font/Inter-Regular.ttf"),
    "Inter-SemiBold": require("./assets/font/Inter-SemiBold.ttf"),
  });

  const onLayoutRootView = useCallback(async () => {
    if (fontsLoaded) {
      await SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  if (!fontsLoaded) {
    return null;
  }
  return (
    <QueryClientProvider client={queryClient}>
      <Provider store={store}>
        <PersistGate persistor={persistor}>
          <SafeAreaProvider style={styles.container}>
            <View style={{ flex: 1 }} onLayout={onLayoutRootView}>
              <NavigationScreen />
            </View>
          </SafeAreaProvider>
        </PersistGate>
      </Provider>
    </QueryClientProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export const Loading = () => {
  return (
    <View style={{ flex: 1, justifyContent: "center" }}>
      <ActivityIndicator size="large" color="#001272" />
    </View>
  );
};

export const StartScreen = ({}) => {
  const { isOnboarding } = useSelector((state) => state.OnboardingSlice);

  console.log({ isOnboarding });

  const dispatch = useDispatch();

  return <Auth />;
};

export const NavigationScreen = () => {
  // const isAuth = useSelector((state) => state);
  const dispatch = useDispatch();

  const user = useSelector((state) => state.Auth);
  const { user_data } = useSelector((state) => state.Auth);

  // const [country, setCountry] = useState("Loading...");

  // dispatch(reset_login());
  return (
    <NavigationContainer>
      {user_data?.data?.token && <MainScreen />}
      {!user_data?.data?.token && <StartScreen />}

      <Toast />
    </NavigationContainer>
  );
};

const VerifyEmailOrMobile = () => (
  <View>
    <Text>Please verify your email or mobile number.</Text>
  </View>
);

const MainScreen = () => {
  const { user_profile_data, user_isLoading } = useSelector(
    (state) => state?.Auth
  );
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(UserProfile_Fun());
  }, [dispatch]);

  if (user_isLoading) {
    return (
      <View>
        <Text>Loading...</Text>
      </View>
    );
  }

  const onboarding = user_profile_data?.meta[0]?.onboarding;
  console.log({
    kgkg: onboarding,
  });
  // Mapping keys to their corresponding components
  const onboardingComponents = {
    has_verified_email_or_mobile_number: <OtpScreen />,
    has_filled_bank_details: <BankDetails />,
    has_filled_food_satefy_certification: <FoodSafetyCertification />,
    has_uploaded_cac_document: <UploadCACDocument />,
    has_filled_opening_hours: <OpeningHours />,
    has_filled_delivery_and_packaging: <DeliveryAndPackaging />,
  };

  // Find the first unmet onboarding step
  const unmetStep = Object.keys(onboardingComponents).find(
    (key) => onboarding && !onboarding[key]
  );

  if (unmetStep) {
    return onboardingComponents[unmetStep];
  }

  // If all steps are complete, show the main navigation
  return <UserNavigation />;
};

const BeforeLOginScreen = () => {
  const { user_data, user_isLoading } = useSelector((state) => state?.Auth);

  const dispatch = useDispatch();

  console.log({
    kk: user_data?.data?.user,
  });

  return <Text> kaka</Text>;
};
