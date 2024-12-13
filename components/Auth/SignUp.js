import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Pressable,
  ScrollView,
  ActivityIndicator,
  Modal,
  TouchableWithoutFeedback,
} from "react-native";
import Toast from "react-native-toast-message";
import axios from "axios";
import { useMutation, useQuery } from "react-query";
import { useDispatch, useSelector } from "react-redux";
import { useNavigation } from "@react-navigation/native";
import { checkOtp, setOtpEmail } from "../../Redux/OnboardingSlice";
import { Forminput, Forminputpassword } from "../shared/InputForm";
import { maincolors } from "../../utills/Themes";
import AppscreenLogo from "../shared/AppscreenLogo";
import DateTimePicker from "@react-native-community/datetimepicker";

const API_BASEURL = process.env.EXPO_PUBLIC_API_URL;

const SignUp = ({ setAuthType }) => {
  const navigation = useNavigation();
  const dispatch = useDispatch();

  const [formData, setFormData] = useState({
    business_name: "",
    business_registration_number: "",
    business_address: "",
    password: "",
    password_confirmation: "",
    contact_person_name: "",
    contact_person_email: "",
    contact_person_mobile_number: "",
    state_id: "",
    state_name: "",
    lga_id: "",
    lga_name: "",
    emergency_number: "",
    device_name: "",

    /// stop
  });
  const [isStateModalVisible, setStateModalVisible] = useState(false);

  const [city_date, setcity_date] = useState(null);

  const openStateModal = () => {
    setStateModalVisible(true);
  };

  const selectState = (state) => {
    setcity_date(state);
    handleInputChange("state_id", state.id); // or state.id if needed
    handleInputChange("state_name", state.name); // or state.id if needed
    setStateModalVisible(false);
  };

  const selectLga = (item) => {
    console.log({
      what: item,
    });

    handleInputChange("lga_name", item.name); // or state.id if needed
    handleInputChange("lga_id", item.id); // or state.id if needed
    // setStateModalVisible(false);
  };

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
      const url = `${API_BASEURL}v1/vendor/register`;
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

        // dispatch(checkOtp(true));

        // onSetAuth("otp");
      },
      onError: (error) => {
        console.log({
          ddd: error?.response?.data,
        });
        Toast.show({
          type: "error",
          text1: `${error?.response?.data?.message}`,
        });
      },
    }
  );

  const {
    data: states,
    isLoading: statesLoading,
    error: statesError,
  } = useQuery("states", async () => {
    const response = await axios.get(`${API_BASEURL}v1/states`);
    return response.data.data;
  });

  const handleSignUp = () => {
    const {
      business_name,
      business_registration_number,
      business_address,
      password,
      password_confirmation,
      contact_person_name,
      contact_person_email,
      contact_person_mobile_number,
      state_id,
      state_name,
      lga_id,
      lga_name,
      emergency_number,
      device_name,
    } = formData;

    let newmail = contact_person_email.toLowerCase();
    dispatch(setOtpEmail(newmail));

    console.log({
      jdjdj: formData,
    });

    Registration_Mutation.mutate({
      business_name,
      business_registration_number,
      business_address,
      password,
      password_confirmation: password,
      contact_person_name,
      contact_person_email,
      contact_person_mobile_number,
      state_id,
      state_name,
      lga_id,
      lga_name,
      emergency_number,
      device_name: "Test Device",
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
              <Text style={styles.labels}>Business Name</Text>
              <Forminput
                placeholder="Business Name"
                onChangeText={(text) =>
                  handleInputChange("business_name", text)
                }
                value={formData.name}
                style={styles.input}
              />
            </View>

            {/** Email */}
            <View style={styles.inputContainer}>
              <Text style={styles.labels}>Business Registration Number</Text>
              <Forminput
                placeholder="Business Registration Number"
                onChangeText={(text) =>
                  handleInputChange("business_registration_number", text)
                }
                value={formData.email}
                style={styles.input}
              />
            </View>

            {/** Mobile Number */}
            <View style={styles.inputContainer}>
              <Text style={styles.labels}>Business Address</Text>
              <Forminput
                placeholder="Business Address"
                onChangeText={(text) =>
                  handleInputChange("business_address", text)
                }
                value={formData.mobile_number}
                style={styles.input}
              />
            </View>

            <View style={styles.inputContainer}>
              <Text style={styles.labels}>Contact Person’s Name</Text>
              <Forminput
                placeholder="Contact Person’s Name"
                onChangeText={(text) =>
                  handleInputChange("contact_person_name", text)
                }
                value={formData.mobile_number}
                style={styles.input}
              />
            </View>

            <View style={styles.inputContainer}>
              <Text style={styles.labels}> Contact Person’s Email</Text>
              <Forminput
                placeholder="Contact Person’s Email"
                onChangeText={(text) =>
                  handleInputChange("contact_person_email", text)
                }
                value={formData.mobile_number}
                style={styles.input}
              />
            </View>

            <View style={styles.inputContainer}>
              <Text style={styles.labels}> Contact Person’s Mobile Number</Text>
              <Forminput
                placeholder="Contact Person’s Mobile Number"
                onChangeText={(text) =>
                  handleInputChange("contact_person_mobile_number", text)
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
              <View style={styles.inputContainer}>
                <Text style={styles.labels}>State</Text>
                <Pressable onPress={openStateModal} style={styles.input}>
                  <Text
                    style={{ color: formData.state_name ? "black" : "gray" }}
                  >
                    {formData.state_name || "Select State"}
                  </Text>
                </Pressable>
              </View>
              <View
                style={[
                  styles.inputContainer,
                  {
                    width: "40%",
                  },
                ]}
              >
                <Text style={styles.labels}>City</Text>
                <Pressable onPress={openGenderModal} style={styles.input}>
                  <Text style={{ color: formData.lga_name ? "black" : "gray" }}>
                    {formData?.lga_name || "Select State"}
                  </Text>
                </Pressable>
              </View>
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
            <Pressable
              style={{
                marginTop: 10,
              }}
            >
              <Text style={styles.footerText}>
                Already have an Account?
                <Text
                  onPress={() => setAuthType("signin")}
                  style={styles.loginText}
                >
                  Sign In
                </Text>
              </Text>
            </Pressable>
          </View>
        </View>
        <Modal
          transparent={true}
          visible={isStateModalVisible}
          onRequestClose={() => setStateModalVisible(false)}
        >
          <TouchableWithoutFeedback onPress={() => setStateModalVisible(false)}>
            <View style={styles.modalOverlay}>
              <TouchableWithoutFeedback>
                <View style={styles.modalContainer}>
                  <Text
                    style={{
                      textAlign: "center",
                    }}
                  >
                    Select State
                  </Text>
                  {statesLoading ? (
                    <ActivityIndicator size="large" />
                  ) : (
                    <ScrollView
                      contentContainerStyle={styles.scrollViewContent}
                    >
                      {states.map((state) => (
                        <Pressable
                          key={state.id}
                          onPress={() => {
                            selectState(state);
                            setStateModalVisible(false); // Close modal after selecting a state
                          }}
                          style={styles.modalOption}
                        >
                          <Text style={styles.modalOptionText}>
                            {state.name}
                          </Text>
                        </Pressable>
                      ))}
                    </ScrollView>
                  )}
                </View>
              </TouchableWithoutFeedback>
            </View>
          </TouchableWithoutFeedback>
        </Modal>

        {/* Gender Modal */}
        <Modal
          transparent={true}
          visible={isGenderModalVisible}
          onRequestClose={() => setGenderModalVisible(false)}
        >
          <TouchableWithoutFeedback
            onPress={() => setGenderModalVisible(false)}
          >
            <View style={styles.modalOverlay}>
              <TouchableWithoutFeedback>
                <View style={styles.modalContainer}>
                  <Text style={styles.modalHeader}>Select LGA</Text>
                  <ScrollView contentContainerStyle={styles.scrollViewContent}>
                    {city_date?.lgas.map((item) => (
                      <Pressable
                        key={item?.id}
                        onPress={() => {
                          // selectGender(option);
                          selectLga(item);
                          setGenderModalVisible(false); // Close modal on selection
                        }}
                        style={styles.modalOption}
                      >
                        <Text style={styles.modalOptionText}>{item?.name}</Text>
                      </Pressable>
                    ))}
                  </ScrollView>
                </View>
              </TouchableWithoutFeedback>
            </View>
          </TouchableWithoutFeedback>
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
    height: "60%",
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
