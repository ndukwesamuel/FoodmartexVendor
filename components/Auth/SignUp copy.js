import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Pressable,
  ScrollView,
  ActivityIndicator,
} from "react-native";
import Toast from "react-native-toast-message";
import axios from "axios";
import { useMutation } from "react-query";
import { useDispatch, useSelector } from "react-redux";
import { useNavigation } from "@react-navigation/native";
import { checkOtp, setOtpEmail } from "../../Redux/OnboardingSlice";
import { Forminput, Forminputpassword } from "../shared/InputForm";
import { maincolors } from "../../utills/Themes";
import AppscreenLogo from "../shared/AppscreenLogo";

const API_BASEURL = process.env.EXPO_PUBLIC_API_URL;

const SignUp = ({ onSetAuth }) => {
  const navigation = useNavigation();
  const dispatch = useDispatch();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
    firstName: "",
    lastName: "",
    phoneNumber: "",
    homeAddress: "",
    referralCode: "",
  });

  const otpemail = useSelector((state) => state?.OnboardingSlice);
  const { user_data, user_isLoading } = useSelector((state) => state?.Auth);

  const handleInputChange = (field, value) => {
    setFormData((prevData) => ({
      ...prevData,
      [field]: value,
    }));
  };

  const Registration_Mutation = useMutation(
    (data_info) => {
      const url = `${API_BASEURL}api/auth/signup`;
      const config = {
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
      };
      return axios.post(url, data_info, config);
    },
    {
      onSuccess: (success) => {
        Toast.show({
          type: "success",
          text1: `${success?.data?.message}`,
        });
        dispatch(checkOtp(true));
      },
      onError: (error) => {
        Toast.show({
          type: "error",
          text1: `${error?.response?.data?.message}`,
        });
      },
    }
  );

  const handleSignUp = () => {
    const { email, password, firstName, lastName, phoneNumber, homeAddress } =
      formData;
    dispatch(setOtpEmail(email));
    Registration_Mutation.mutate({
      email,
      password,
      userName: firstName,
      lastName,
      phoneNumber,
      homeLocation: homeAddress,
    });
  };

  return (
    <AppscreenLogo>
      <ScrollView style={styles.container}>
        <View style={{}}>
          <View style={{ alignSelf: "center" }}>
            <Text style={styles.header}>Welcome!</Text>
            <Text style={styles.subHeader}>Let’s Get Started</Text>
          </View>

          <View
            style={{
              gap: 10,
            }}
          >
            {/** Full Name */}
            <View style={styles.inputContainer}>
              <Text style={styles.labels}>Full Name</Text>
              <Forminput
                placeholder="Full Name"
                onChangeText={(text) => handleInputChange("firstName", text)}
                value={formData.firstName}
                style={styles.input}
              />
            </View>

            {/** Email */}
            <View style={styles.inputContainer}>
              <Text style={styles.labels}>Email</Text>
              <Forminput
                placeholder="Email"
                onChangeText={(text) => handleInputChange("email", text)}
                value={formData.email}
                style={styles.input}
              />
            </View>

            {/** Mobile Number */}
            <View style={styles.inputContainer}>
              <Text style={styles.labels}>Mobile Number</Text>
              <Forminput
                placeholder="Mobile Number"
                onChangeText={(text) => handleInputChange("phoneNumber", text)}
                value={formData.phoneNumber}
                style={styles.input}
              />
            </View>

            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                gap: 10,
              }}
            >
              <View
                style={[
                  styles.inputContainer,
                  {
                    width: "40%",
                  },
                ]}
              >
                <Text style={styles.labels}>Mobile Number</Text>
                <Forminput
                  placeholder="Mobile Number"
                  onChangeText={(text) =>
                    handleInputChange("phoneNumber", text)
                  }
                  value={formData.phoneNumber}
                  style={styles.input}
                />
              </View>
              <View
                style={[
                  styles.inputContainer,
                  {
                    width: "50%",
                  },
                ]}
              >
                <Text style={styles.labels}>Date of Birth (optional)</Text>
                <Forminput
                  placeholder="DOB"
                  onChangeText={(text) =>
                    handleInputChange("phoneNumber", text)
                  }
                  value={formData.phoneNumber}
                  style={styles.input}
                />
              </View>
            </View>

            {/** Home Address */}
            <View style={styles.inputContainer}>
              <Text style={styles.labels}>Home Address</Text>
              <Forminput
                placeholder="Home Address"
                onChangeText={(text) => handleInputChange("homeAddress", text)}
                value={formData.homeAddress}
                style={styles.input}
              />
            </View>

            {/** Referral Code */}
            <View style={styles.inputContainer}>
              <Text style={styles.labels}>Referral Code (If Applicable)</Text>
              <Forminput
                placeholder="Referral Code"
                onChangeText={(text) => handleInputChange("referralCode", text)}
                value={formData.referralCode}
                style={styles.input}
              />
            </View>

            {/** Password */}
            <View style={styles.inputContainer}>
              <Text style={styles.labels}>Password</Text>
              <Forminputpassword
                placeholder="Enter your password"
                onChangeText={(text) => handleInputChange("password", text)}
                value={formData.password}
                style={styles.input}
              />
            </View>
          </View>

          {/** Action Button */}
          <View style={styles.buttonContainer}>
            <Pressable onPress={handleSignUp} style={styles.button}>
              {Registration_Mutation.isLoading ? (
                <ActivityIndicator size="small" color="white" />
              ) : (
                <Text style={styles.buttonText}>Sign Up</Text>
              )}
            </Pressable>
            <Pressable>
              <Text style={styles.footerText}>
                Already have an Account?
                <Text
                  onPress={() => onSetAuth("sign-in")}
                  style={styles.loginText}
                >
                  Sign In
                </Text>
              </Text>
            </Pressable>
          </View>
        </View>
      </ScrollView>
    </AppscreenLogo>
  );
};

export default SignUp;

const styles = StyleSheet.create({
  container: {
    flex: 1,

    paddingHorizontal: 10,
    backgroundColor: maincolors.white,
  },
  header: {
    fontSize: 24,
    lineHeight: 36,
    fontWeight: "900",
    textAlign: "center",
  },
  subHeader: {
    fontSize: 12,
    lineHeight: 36,
    fontWeight: "400",
  },
  inputContainer: {
    gap: 5,
  },
  labels: {
    fontSize: 14,
    fontWeight: "500",
  },
  input: {
    borderWidth: 1,
    borderColor: maincolors.inputcolor, // "#ccc",
    backgroundColor: maincolors.inputcolor, // "#ccc",
    borderRadius: 5,
    padding: 10,
  },
  buttonContainer: {
    justifyContent: "flex-end",
    alignItems: "center",
    paddingVertical: 30,
  },
  button: {
    padding: 10,
    borderRadius: 5,
    backgroundColor: maincolors.primary, //"#001272",
    width: "100%",
  },
  buttonText: {
    textAlign: "center",
    color: "white",
    fontSize: 16,
    fontWeight: "700",
    lineHeight: 24.05,
  },
  footerText: {
    fontSize: 14,
    lineHeight: 22.4,
  },
  loginText: {
    fontSize: 16,
    fontWeight: "500",
    lineHeight: 25.6,
  },
});
