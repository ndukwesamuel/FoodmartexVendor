import { Text, TouchableOpacity, View } from "react-native";
import { useState } from "react";
import SignUp from "./SignUp";
import SignIn from "./SignIn";
import OtpScreen from "../../screens/OtpScreen";
import { useDispatch, useSelector } from "react-redux";
import ForgetPassowrd from "./ForgetPassowrd";
import ChangePassowrd from "./ChangePassowrd";
import VendorSignup from "./VendorSignup";
import RidersignUp from "./RidersignUp";
import ProfilePictureScreen from "./ProfilePictureScreen";
import Security from "./Security";

const AuthContainer = () => {
  const [authType, setAuthtype] = useState("sign-up");
  const [authType2, setAuthtype2] = useState("");
  const [signupType, setSignupType] = useState("user");

  const { otp } = useSelector((state) => state?.OnboardingSlice);

  const changeAuthType = (type) => {
    setAuthtype(type);
  };

  const changeAuthType2 = (type) => {
    setAuthtype2(type);
  };

  const changeSignupType = (type) => {
    setSignupType(type);
  };
  let user = false;
  return (
    <View style={{ flex: 1 }}>
      {user === false ? (
        <>
          {authType === "sign-up" ? (
            <SignUp onSetAuth={changeAuthType} />
          ) : authType === "sign-in" ? (
            <SignIn onSetAuth={changeAuthType} />
          ) : authType === "otp" ? (
            <OtpScreen onSetAuth={changeAuthType} />
          ) : (
            <ForgetPassowrd onSetAuth={changeAuthType} /> // Forgot Password screen
          )}
        </>
      ) : (
        <>
          {authType2 === "otp" ? (
            <OtpScreen
              onSetAuth={changeAuthType}
              onSetAuth2={changeAuthType2}
            />
          ) : authType2 === "change_passoword" ? (
            <ChangePassowrd
              onSetAuth2={changeAuthType2}
              onSetAuth={changeAuthType}
            />
          ) : authType2 === "security" ? (
            <Security onSetAuth2={changeAuthType2} onSetAuth={changeAuthType} />
          ) : (
            <ProfilePictureScreen
              onSetAuth2={changeAuthType2}
              onSetAuth={changeAuthType}
            />
          )}
        </>
      )}
    </View>
  );
};

const styles = {
  activeTab: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#FFA500", // Active tab color (e.g., orange)
  },
  inactiveTab: {
    fontSize: 16,
    color: "#A9A9A9", // Inactive tab color (e.g., gray)
  },
};
export default AuthContainer;
