import { Text, SafeAreaView, StatusBar } from "react-native";
import React from "react";
import OnBoarding from "../components/OnBoading/OnBoarding";

const OnBoardingPage = () => {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <StatusBar backgroundColor="#001272" barStyle="light-content" />
      <OnBoarding />
    </SafeAreaView>
  );
};

export default OnBoardingPage;
