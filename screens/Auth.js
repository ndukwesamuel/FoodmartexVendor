import { View, StatusBar, SafeAreaView } from "react-native";
import React, { useState } from "react";
import AuthContainer from "../components/Auth/AuthContainer";
import AuthOnboarding from "../components/Auth/AuthOnboarding";
import ProfilePictureScreen from "../components/Auth/CreateOrSkipScreen";

const Auth = () => {
  const [start, setStart] = useState(false);

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <StatusBar backgroundColor="#001272" barStyle="light-content" />
      {start ? <AuthContainer /> : <AuthOnboarding setStart={setStart} />}
    </SafeAreaView>
  );
};

export default Auth;
