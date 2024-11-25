import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Pressable,
  ScrollView,
  ActivityIndicator,
  Modal,
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
import DateTimePicker from "@react-native-community/datetimepicker";

const API_BASEURL = process.env.EXPO_PUBLIC_API_URL;

const SignUp = ({ onSetAuth }) => {
  const navigation = useNavigation();
  const dispatch = useDispatch();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
    name: "",
    mobile_number: "",
    phoneNumber: "",
    homeAddress: "",
    referral_code: "",
    gender: "",
    occupation: "",
    hobbies: "",
    dob: new Date(), // Initial DOB
  });

  const [showDatePicker, setShowDatePicker] = useState(false);

  const [isGenderModalVisible, setGenderModalVisible] = useState(false);

  const otpemail = useSelector((state) => state?.OnboardingSlice);
  const { user_data, user_isLoading } = useSelector((state) => state?.Auth);

  const handleInputChange = (field, value) => {
    setFormData((prevData) => ({
      ...prevData,
      [field]: value,
    }));
  };

  const onChangeDOB = (event, selectedDate) => {
    const currentDate = selectedDate || formData.dob;
    setShowDatePicker(false); // Hide date picker after selection
    handleInputChange("dob", currentDate);
  };
  const Registration_Mutation = useMutation(
    (data_info) => {
      const url = `${API_BASEURL}register`;
      const config = {
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
      };
      console.log({
        data_info,
      });
      return axios.post(url, data_info, config);
    },
    {
      onSuccess: (success) => {
        console.log({
          ksksk: success?.data?.data,
          ksksk: success?.data?.message,
        });
        Toast.show({
          type: "success",
          text1: `${success?.data?.message}`,
        });

        dispatch(checkOtp(true));

        onSetAuth("otp");
      },
      onError: (error) => {
        console.log({
          ddd: error?.response?.data,
          ddd: error?.response?.data?.errors,
        });
        Toast.show({
          type: "error",
          text1: `${error?.response?.data?.message}`,
        });
      },
    }
  );

  const handleSignUp = () => {
    const {
      name,
      password,
      email,
      mobile_number,
      gender,
      dob,
      occupation,
      hobbies,
      referral_code,
      homeAddress,
    } = formData;

    let newmail = email.toLowerCase();
    dispatch(setOtpEmail(newmail));

    console.log({
      jdjdj: formData,
    });

    console.log({
      name,
      email,
      mobile_number,
      gender,
      date_of_birth: dob,
      occupation,
      referral_code,
      hobbies,
      password,
      password_confirmation: password,
      homeAddress,
    });
    Registration_Mutation.mutate({
      name,
      email: email.toLowerCase(),
      mobile_number,
      gender,
      date_of_birth: dob,
      occupation,
      referral_code,
      hobbies,
      password,
      password_confirmation: password,
      homeAddress,
      user_type: "customer",
    });
  };

  const openGenderModal = () => {
    setGenderModalVisible(true);
  };

  const selectGender = (gender) => {
    handleInputChange("gender", gender);
    setGenderModalVisible(false);
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
                onChangeText={(text) => handleInputChange("name", text)}
                value={formData.name}
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
                onChangeText={(text) =>
                  handleInputChange("mobile_number", text)
                }
                value={formData.mobile_number}
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
                <Text style={styles.labels}>Gender</Text>
                <Pressable onPress={openGenderModal} style={styles.input}>
                  <Text style={{ color: formData.gender ? "black" : "gray" }}>
                    {formData.gender || "Select Gender"}
                  </Text>
                </Pressable>
              </View>

              <View style={styles.inputContainer}>
                <Text style={styles.labels}>Date of Birth (optional)</Text>
                <Pressable onPress={() => setShowDatePicker(true)}>
                  <Text style={styles.input}>
                    {formData.dob.toDateString()}
                  </Text>
                </Pressable>
                {showDatePicker && (
                  <DateTimePicker
                    value={formData.dob}
                    mode="date"
                    display="default"
                    onChange={onChangeDOB}
                  />
                )}
              </View>
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
                <Text style={styles.labels}>Occupation (optional)</Text>
                <Forminput
                  placeholder="Occupation"
                  onChangeText={(text) => handleInputChange("occupation", text)}
                  value={formData.occupation}
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
                <Text style={styles.labels}>Hobbies (optional)</Text>
                <Forminput
                  placeholder="Hobbies"
                  onChangeText={(text) => handleInputChange("hobbies", text)}
                  value={formData.hobbies}
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
                onChangeText={(text) =>
                  handleInputChange("referral_code", text)
                }
                value={formData.referral_code}
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

        {/* Gender Modal */}
        <Modal
          transparent={true}
          visible={isGenderModalVisible}
          onRequestClose={() => setGenderModalVisible(false)}
        >
          <View style={styles.modalOverlay}>
            <View style={styles.modalContainer}>
              <Text style={styles.modalHeader}>Select Gender</Text>
              {["male", "female"].map((option) => (
                <Pressable
                  key={option}
                  onPress={() => selectGender(option)}
                  style={styles.modalOption}
                >
                  <Text style={styles.modalOptionText}>{option}</Text>
                </Pressable>
              ))}
            </View>
          </View>
        </Modal>
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
    borderColor: maincolors.inputcolor,
    backgroundColor: maincolors.inputcolor,
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
    backgroundColor: maincolors.primary,
    width: "100%",
  },
  buttonText: {
    textAlign: "center",
    color: "white",
    fontSize: 16,
    fontWeight: "700",
    lineHeight: 24.05,
  },
  modalOverlay: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContainer: {
    width: "80%",
    backgroundColor: "white",
    borderRadius: 10,
    padding: 20,
  },
  modalHeader: {
    fontSize: 18,
    fontWeight: "600",
    marginBottom: 15,
    textAlign: "center",
  },
  modalOption: {
    paddingVertical: 10,
    alignItems: "center",
  },
  modalOptionText: {
    fontSize: 16,
  },
});
