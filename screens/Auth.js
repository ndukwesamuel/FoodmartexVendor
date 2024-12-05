import { View, StatusBar, SafeAreaView } from "react-native";
import React, { useState } from "react";
import AuthOnboarding from "../components/Auth/AuthOnboarding"; // Onboarding component
import SignIn from "../components/Auth/SignIn";
import SignUp from "../components/Auth/SignUp";

const Auth = () => {
  const [authType, setAuthType] = useState("main"); // Defaults to "main"

  console.log({
    lll: authType,
  });
  const renderAuthScreen = () => {
    switch (authType) {
      case "main":
        return <AuthOnboarding setAuthType={setAuthType} />;
      case "signup":
        return <SignUp setAuthType={setAuthType} />;
      case "signin":
        return <SignIn setAuthType={setAuthType} />;
      default:
        return <AuthOnboarding setAuthType={setAuthType} />;
    }
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <StatusBar backgroundColor="#001272" barStyle="light-content" />
      {renderAuthScreen()}
    </SafeAreaView>
  );
};

export default Auth;
