import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Pressable,
  ScrollView,
  ActivityIndicator,
  Button,
  TouchableOpacity,
  Modal,
  FlatList,
  TextInput,
  Alert,
} from "react-native";

import Toast from "react-native-toast-message";
import axios from "axios";
import { useMutation } from "react-query";
import { useDispatch, useSelector } from "react-redux";
import { useNavigation } from "@react-navigation/native";
import { checkOtp, setOtpEmail } from "../../Redux/OnboardingSlice";
import {
  CustomTextArea,
  Forminput,
  Forminputpassword,
  RadioButton,
  SelectInput,
} from "../shared/InputForm";
import { maincolors } from "../../utills/Themes";
import AppscreenLogo from "../shared/AppscreenLogo";
import { useApiRequest, useFormDataApiRequest } from "../../hooks/Mutate";
import { CenterReuseModals, MapReusableModal } from "../shared/ReuseModals";
import { MaterialIcons } from "@expo/vector-icons";
import { UserProfile_Fun } from "../../Redux/AuthSlice";

const API_BASEURL = process.env.EXPO_PUBLIC_API_URL;

const VendorSignup = ({ onSetAuth }) => {
  const navigation = useNavigation();
  const dispatch = useDispatch();

  const [step, setStep] = useState(1);

  const changeStep = (type) => {
    setStep(type);
  };

  return (
    <AppscreenLogo>
      {step === 1 ? (
        <StepOneSignUp onSetAuth={onSetAuth} changeStep={changeStep} />
      ) : step === 2 ? (
        <StepTwoSignUp onSetAuth={onSetAuth} changeStep={changeStep} />
      ) : step === 3 ? (
        <StepThreeSignUp onSetAuth={onSetAuth} changeStep={changeStep} />
      ) : step === 4 ? (
        <StepFourSignUp onSetAuth={onSetAuth} changeStep={changeStep} />
      ) : (
        <StepFourSignUp onSetAuth={onSetAuth} changeStep={changeStep} />
      )}
    </AppscreenLogo>
  );
};

export default VendorSignup;

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

const StepOneSignUp = ({ onSetAuth, changeStep }) => {
  const navigation = useNavigation();
  const dispatch = useDispatch();

  const [formData, setFormData] = useState({
    Business_Name: "",
    Business_Registration_Number: "",
    Business_Address: "",
    Contact_Persons_Name: "",
    Contact_Persons_Email: "",
    Contact_Persons_Mobile_Number: "",
    Add_Emergency_Number: "",
    password: "",
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
    dispatch(setOtpEmail(formData.Contact_Persons_Email));
    Registration_Mutation.mutate(formData);
  };

  return (
    <ScrollView style={styles.container}>
      <View style={{}}>
        <View style={{ alignSelf: "center" }}>
          <Text style={styles.header}>Welcome!</Text>
          <Text style={styles.subHeader}>Let’s Get Started as a Vendor</Text>
        </View>

        <View style={{ gap: 10 }}>
          {/** Business Name */}
          <View style={styles.inputContainer}>
            <Text style={styles.labels}>Business Name</Text>
            <Forminput
              placeholder="Business Name"
              onChangeText={(text) => handleInputChange("Business_Name", text)}
              value={formData.Business_Name}
              style={styles.input}
            />
          </View>

          {/** Business Registration Number */}
          <View style={styles.inputContainer}>
            <Text style={styles.labels}>Business Registration Number</Text>
            <Forminput
              placeholder="Registration Number"
              onChangeText={(text) =>
                handleInputChange("Business_Registration_Number", text)
              }
              value={formData.Business_Registration_Number}
              style={styles.input}
            />
          </View>

          {/** Business Address */}
          <View style={styles.inputContainer}>
            <Text style={styles.labels}>Business Address</Text>
            <Forminput
              placeholder="Business Address"
              onChangeText={(text) =>
                handleInputChange("Business_Address", text)
              }
              value={formData.Business_Address}
              style={styles.input}
            />
          </View>

          {/** Contact Person's Name */}
          <View style={styles.inputContainer}>
            <Text style={styles.labels}>Contact Person's Name</Text>
            <Forminput
              placeholder="Contact Person's Name"
              onChangeText={(text) =>
                handleInputChange("Contact_Persons_Name", text)
              }
              value={formData.Contact_Persons_Name}
              style={styles.input}
            />
          </View>

          {/** Contact Person's Email */}
          <View style={styles.inputContainer}>
            <Text style={styles.labels}>Contact Person's Email</Text>
            <Forminput
              placeholder="Contact Person's Email"
              onChangeText={(text) =>
                handleInputChange("Contact_Persons_Email", text)
              }
              value={formData.Contact_Persons_Email}
              style={styles.input}
            />
          </View>

          {/** Contact Person's Mobile Number */}
          <View style={styles.inputContainer}>
            <Text style={styles.labels}>Contact Person's Mobile Number</Text>
            <Forminput
              placeholder="Contact Person's Mobile Number"
              onChangeText={(text) =>
                handleInputChange("Contact_Persons_Mobile_Number", text)
              }
              value={formData.Contact_Persons_Mobile_Number}
              style={styles.input}
            />
          </View>

          {/** Emergency Number */}
          <View style={styles.inputContainer}>
            <Text style={styles.labels}>Emergency Contact Number</Text>
            <Forminput
              placeholder="Emergency Contact Number"
              onChangeText={(text) =>
                handleInputChange("Add_Emergency_Number", text)
              }
              value={formData.Add_Emergency_Number}
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
          <Pressable onPress={() => changeStep(2)} style={styles.button}>
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
  );
};

// const StepTwoSignUp = ({ onSetAuth, changeStep }) => {
export const DeliveryAndPackaging = ({}) => {
  const navigation = useNavigation();
  const dispatch = useDispatch();

  const [lga, setlga] = useState([]);

  const [pickzone, setpickzone] = useState("");
  const [text, setText] = useState("");

  const [time, settime] = useState("");

  const { user_isLoading, user_data, user_message } = useSelector(
    (state) => state?.Auth
  );

  const { mutate: delivery_Data, isLoading: isLoadingDelivery } = useApiRequest(
    {
      url: `${API_BASEURL}v1/lgas`,
      method: "GET",
      token: user_data?.data?.token || "",
      onSuccess: (response) => {
        // dispatch(checkOtp(true));

        setlga(response?.data?.data);
      },
      onError: (error) => {
        // console.error("Registration failed:", error?.response?.data);

        Toast.show({
          type: "error",
          text1: `${error?.response?.data?.message || "Request failed."}`,
        });
      },
    }
  );

  const { mutate: postdelivery_Data, isLoading: isLoadingpostDelivery } =
    useApiRequest({
      url: `${API_BASEURL}v1/vendor/onboarding/delivery-details`,
      method: "POST",
      token: user_data?.data?.token || "",
      onSuccess: (response) => {
        // dispatch(checkOtp(true));
        // setlga(response?.data?.data);
      },
      onError: (error) => {
        // console.error("Registration failed:", error?.response?.data);

        Toast.show({
          type: "error",
          text1: `${error?.response?.data?.message || "Request failed."}`,
        });
      },
    });

  useEffect(() => {
    delivery_Data();

    return () => {};
  }, [delivery_Data]);

  const handleInputChange = (field, value) => {
    setFormData((prevData) => ({
      ...prevData,
      [field]: value,
    }));
  };

  const handleTextChange = (newText) => {
    setText(newText);
  };

  const handlesubmit = () => {
    console.log({
      jfjf: pickzone?.id,
      jsjs: text,
    });
    const formData = new FormData();

    if (pickzone) {
      formData.append(`delivery_zones[0][lga_id]`, pickzone?.id);
    }
    if (text) {
      formData.append(`packaging_details`, text);
    }
    if (time) {
      formData.append(`delivery_zones[0][min_timeframe]`, 5);
      formData.append(`delivery_zones[0][max_timeframe]`, 10);
    }

    Update_Mutation.mutate(formData);
  };
  const Update_Mutation = useMutation(
    (data_info) => {
      let url = `${API_BASEURL}v1/vendor/onboarding/delivery-details`;

      const config = {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${user_data?.data?.token}`,
        },
      };

      return axios.post(url, data_info, config);
    },
    {
      onSuccess: (success) => {
        dispatch(UserProfile_Fun());
      },

      onError: (error) => {
        console.log({
          iiii: error?.response?.data?.message,
        });
        Toast.show({
          type: "error",
          text1: `${error?.response?.data?.message}`,
        });
      },
    }
  );

  const [modalVisible, setModalVisible] = useState(false);
  return (
    <AppscreenLogo>
      <ScrollView style={styles.container}>
        <View style={{}}>
          <View style={{ alignSelf: "center" }}>
            <Text style={styles.header}>Delivery & Packaging</Text>
            <Text
              style={[
                styles.subHeader,
                {
                  textAlign: "center",
                },
              ]}
            >
              Fill out all fields...
            </Text>
          </View>

          <View style={{ gap: 10 }}>
            {/* Full Name */}
            <View style={styles.inputContainer}>
              <Text style={styles.labels}>Delivery Zones</Text>

              <TouchableOpacity
                style={styles.input}
                onPress={() => setModalVisible(true)}
              >
                <Text>{pickzone?.name || "Delivery Zones"}</Text>
              </TouchableOpacity>
            </View>

            <View style={styles.inputContainer}>
              <Text style={styles.labels}>Delivery Time Frame</Text>
              <Forminput
                placeholder="Delivery Time Frame"
                value={time}
                onChangeText={settime}
                style={styles.input}
              />
            </View>

            <View style={styles.inputContainer}>
              <Text style={styles.labels}>Packaging Details</Text>

              <CustomTextArea
                placeholder="Enter text here..."
                value={text}
                onChangeText={handleTextChange}
                style={{ width: "80%" }}
                inputStyle={{
                  textAlignVertical: "top", // Ensures text starts from the top
                  paddingTop: 10, // Add paddingTop to control vertical padding
                  paddingBottom: 10, // Add paddingBottom to balance padding
                  backgroundColor: "#F6F8FAE5",
                  paddingHorizontal: 10,
                  paddingTop: 10, // Add paddingTop to control the vertical padding
                  paddingBottom: 10, // Add paddingBottom to balance the padding
                  height: 100,
                  borderRadius: 6,
                  fontSize: 16,
                }}
              />
            </View>

            {Update_Mutation.isLoading ? (
              <ActivityIndicator size="small" color={maincolors.primary} />
            ) : (
              <View style={styles.buttonContainer}>
                <Pressable onPress={handlesubmit} style={styles.button}>
                  <Text style={styles.buttonText}>Continue</Text>
                </Pressable>
              </View>
            )}
          </View>
        </View>

        <CenterReuseModals
          visible={modalVisible}
          onClose={() => setModalVisible(false)}
        >
          <View
            style={{
              backgroundColor: "white",
              padding: 20,
              borderRadius: 10,
              elevation: 5,
              width: "90%",
              height: "50%",
            }}
          >
            <TouchableOpacity onPress={() => setModalVisible(false)}>
              <MaterialIcons name="cancel" size={24} color="black" />
            </TouchableOpacity>

            <ScrollView contentContainerStyle={styles.scrollViewContent}>
              {isLoadingDelivery ? (
                <ActivityIndicator color="yello" size="large" />
              ) : (
                <>
                  {!lga.length ? (
                    <Text>No LGAs available</Text>
                  ) : (
                    lga.map((item) => (
                      <Pressable
                        key={item?.id}
                        onPress={() => {
                          setpickzone(item);
                          setModalVisible(false);
                        }}
                        style={{ paddingVertical: 10, alignItems: "center" }}
                      >
                        <Text style={{ fontSize: 16 }}>{item?.name}</Text>
                      </Pressable>
                    ))
                  )}
                </>
              )}
            </ScrollView>
          </View>
        </CenterReuseModals>
      </ScrollView>
    </AppscreenLogo>
  );
};

export const BankDetails = ({ onSetAuth, changeStep }) => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const { user_data, user_isLoading } = useSelector((state) => state?.Auth);
  const [modalVisible, setModalVisible] = useState(false);

  const [account_name, setAccount_name] = useState("");
  const [account_number, setAccount_number] = useState("");
  const [bank_id, setBank_id] = useState("");
  const [bankinfp, setbankinfp] = useState([]);
  const [lga, setlga] = useState([]);

  // const [pickzone, setpickzone] = useState("");

  const { mutate: postBankDetails, isLoading: isLoadingpostBankDetails } =
    useApiRequest({
      url: `${API_BASEURL}v1/profile/bank-details`,
      method: "POST",
      token: user_data?.data?.token || "",
      onSuccess: (response) => {
        console.log({
          sd: response?.data,
        });
        dispatch(UserProfile_Fun());
      },
      onError: (error) => {
        // console.error("Registration failed:", error?.response?.data);
        console.log({
          jgjg: error?.response?.data,
        });
        Toast.show({
          type: "error",
          text1: `${error?.response?.data?.message || "Request failed."}`,
        });
      },
    });

  const { mutate: getBank, isLoading: isLoadinggetBank } = useApiRequest({
    url: `${API_BASEURL}v1/bank`,
    method: "GET",
    token: user_data?.data?.token || "",
    onSuccess: (response) => {
      setbankinfp(response?.data?.data);
    },
    onError: (error) => {
      Toast.show({
        type: "error",
        text1: `${error?.response?.data?.message || "Request failed."}`,
      });
    },
  });

  const otpemail = useSelector((state) => state?.OnboardingSlice);

  const handleSignUp = () => {
    // Assuming formData is defined similarly to before
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

  useEffect(() => {
    getBank();

    return () => {};
  }, []);

  const handlesubmitbank = () => {
    let data = {
      account_name: account_name,
      account_number: account_number,
      bank_id: bank_id?.id.toString(),
    };

    postBankDetails(data);
    console.log({
      kksks: data, // "dkjfkj",
    });
  };

  return (
    <AppscreenLogo>
      <ScrollView style={styles.container}>
        <View style={{}}>
          <View style={{ alignSelf: "center" }}>
            <Text style={styles.header}>Payment</Text>
            <Text
              style={[
                styles.subHeader,
                {
                  textAlign: "center",
                },
              ]}
            >
              Fill out all fields...
            </Text>
          </View>

          <View style={{ gap: 10 }}>
            {/* Full Name */}
            <View style={styles.inputContainer}>
              <Text style={styles.labels}>Account Name</Text>
              <Forminput
                placeholder="Account Name"
                onChangeText={setAccount_name}
                value={account_name}
                style={styles.input}
              />
            </View>

            <View style={styles.inputContainer}>
              <Text style={styles.labels}>Account Number</Text>
              <Forminput
                placeholder="Account Number"
                onChangeText={setAccount_number}
                value={account_number}
                style={styles.input}
              />
            </View>

            <View style={styles.inputContainer}>
              <Text style={styles.labels}>Bank Name</Text>

              <TouchableOpacity
                style={styles.input}
                onPress={() => setModalVisible(true)}
              >
                <Text>{bank_id?.name || "Bank"}</Text>
              </TouchableOpacity>
            </View>

            {/* Additional input fields */}

            {/* Action Button */}
            <View style={styles.buttonContainer}>
              {isLoadingpostBankDetails ? (
                <ActivityIndicator size="small" color={maincolors.primary} />
              ) : (
                <Pressable onPress={handlesubmitbank} style={styles.button}>
                  <Text style={styles.buttonText}>Continue</Text>
                </Pressable>
              )}
            </View>
          </View>
        </View>

        <CenterReuseModals
          visible={modalVisible}
          onClose={() => setModalVisible(false)}
        >
          <View
            style={{
              backgroundColor: "white",
              padding: 20,
              borderRadius: 10,
              elevation: 5,
              width: "90%",
              height: "50%",
            }}
          >
            <TouchableOpacity onPress={() => setModalVisible(false)}>
              <MaterialIcons name="cancel" size={24} color="black" />
            </TouchableOpacity>

            <ScrollView contentContainerStyle={styles.scrollViewContent}>
              {isLoadinggetBank ? (
                <ActivityIndicator color="yello" size="large" />
              ) : (
                <>
                  {!bankinfp.length ? (
                    <Text>No Bank available</Text>
                  ) : (
                    bankinfp.map((item) => (
                      <Pressable
                        key={item?.id}
                        onPress={() => {
                          setBank_id(item);
                          setModalVisible(false);
                        }}
                        style={{ paddingVertical: 10, alignItems: "center" }}
                      >
                        <Text style={{ fontSize: 16 }}>{item?.name}</Text>
                      </Pressable>
                    ))
                  )}
                </>
              )}
            </ScrollView>
          </View>
        </CenterReuseModals>
      </ScrollView>
    </AppscreenLogo>
  );
};

export const FoodSafetyCertification = ({ onSetAuth, changeStep }) => {
  const navigation = useNavigation();
  const dispatch = useDispatch();

  const [selectedOption, setSelectedOption] = useState(null); // Define selectedOption
  const { user_data, user_isLoading } = useSelector((state) => state?.Auth);

  const {
    mutate: postFoodSafetyCertification,
    isLoading: isLoadingpostFoodSafetyCertification,
  } = useApiRequest({
    url: `${API_BASEURL}v1/vendor/onboarding/safety-certification`,
    method: "POST",
    token: user_data?.data?.token || "",
    onSuccess: (response) => {
      console.log({
        sd: response?.data,
      });
      dispatch(UserProfile_Fun());
    },
    onError: (error) => {
      console.log({
        jgjg: error?.response?.data,
      });
      Toast.show({
        type: "error",
        text1: `${error?.response?.data?.message || "Request failed."}`,
      });
    },
  });

  const handleInputChange = (field, value) => {
    setFormData((prevData) => ({
      ...prevData,
      [field]: value,
    }));
  };

  const [text, setText] = useState("");

  const handleTextChange = (newText) => {
    setText(newText);
  };

  const handleRadioSelect = (option) => {
    setSelectedOption(option); // Update selectedOption state
  };

  const handlesubmit = () => {
    let data = {
      has_food_safety_certification: selectedOption,
      quality_control_measures: text,
    };

    console.log({
      kksks: data, // "dkjfkj",
    });
    postFoodSafetyCertification(data);
  };

  return (
    <AppscreenLogo>
      <ScrollView style={styles.container}>
        <View>
          <View style={{ gap: 10 }}>
            {/* Food Safety Certification */}
            <View style={styles.inputContainer}>
              <View style={{ marginTop: 15 }}>
                <Text style={styles.labels}>
                  Have a Food Safety Certification?
                </Text>
                <RadioButton
                  label="Yes"
                  selected={selectedOption === 1}
                  onSelect={() => handleRadioSelect(1)}
                />
                <RadioButton
                  label="No"
                  selected={selectedOption === 0}
                  onSelect={() => handleRadioSelect(0)}
                  inputStyle={styles.radioButton}
                />
              </View>
            </View>

            {/* Quality Control Measures */}
            <View style={styles.inputContainer}>
              <Text style={styles.labels}>Input Quality Control Measures</Text>
              <CustomTextArea
                placeholder="Enter text here..."
                value={text}
                onChangeText={handleTextChange}
                style={{ width: "80%" }}
                inputStyle={{
                  textAlignVertical: "top",
                  paddingTop: 10,
                  paddingBottom: 10,
                  backgroundColor: "#F6F8FAE5",
                  paddingHorizontal: 10,
                  height: 100,
                  borderRadius: 6,
                  fontSize: 16,
                }}
              />
            </View>

            {isLoadingpostFoodSafetyCertification ? (
              <ActivityIndicator size="small" color={maincolors.primary} />
            ) : (
              <View style={styles.buttonContainer}>
                <Pressable onPress={handlesubmit} style={styles.button}>
                  <Text style={styles.buttonText}>Continue</Text>
                </Pressable>
              </View>
            )}
          </View>
        </View>
      </ScrollView>
    </AppscreenLogo>
  );
};

const Dropdown = ({ data, selectedValue, onValueChange }) => {
  const [isModalVisible, setModalVisible] = useState(false);

  const renderItem = ({ item }) => (
    <TouchableOpacity
      style={{ padding: 10, backgroundColor: "#fff" }}
      onPress={() => {
        onValueChange(item.value);
        setModalVisible(false);
      }}
    >
      <Text style={{ color: "#000" }}>{item.label}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={{ flex: 1 }}>
      <TouchableOpacity
        style={{
          padding: 10,
          backgroundColor: "#F6F8FA",
          borderRadius: 4,
          borderWidth: 1,
          borderColor: "#00260E",
        }}
        onPress={() => setModalVisible(true)}
      >
        <Text style={{ color: "#000" }}>{selectedValue}</Text>
      </TouchableOpacity>

      <Modal
        transparent={true}
        animationType="slide"
        visible={isModalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View
          style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
        >
          <View
            style={{
              width: "80%",
              backgroundColor: "#FFF",
              borderRadius: 4,
              padding: 20,
              elevation: 5,
            }}
          >
            <FlatList
              data={data}
              renderItem={renderItem}
              keyExtractor={(item) => item.value}
            />
          </View>
        </View>
      </Modal>
    </View>
  );
};

export const OpeningHours = () => {
  const [selectedDays, setSelectedDays] = useState({});
  const [openingHours, setOpeningHours] = useState({});
  const [closingHours, setClosingHours] = useState({});
  const dispatch = useDispatch();
  const days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  const toggleDaySelection = (day) => {
    setSelectedDays((prev) => ({
      ...prev,
      [day]: !prev[day],
    }));

    if (!selectedDays[day]) {
      setOpeningHours((prev) => ({
        ...prev,
        [day]: "09:00",
      }));
      setClosingHours((prev) => ({
        ...prev,
        [day]: "22:00",
      }));
    }
  };

  const handleTimeChange = (day, time, type) => {
    if (type === "opening") {
      setOpeningHours((prev) => ({
        ...prev,
        [day]: time,
      }));
    } else {
      setClosingHours((prev) => ({
        ...prev,
        [day]: time,
      }));
    }
  };

  // const timeOptions = Array.from({ length: 24 }, (_, i) => ({
  //   label: `${(i + 1).toString().padStart(2, "0")}:00`,
  //   value: `${(i + 1).toString().padStart(2, "0")}:00`,
  // }));
  const timeOptions = Array.from({ length: 24 }, (_, i) => ({
    label: `${i.toString().padStart(2, "0")}:00:00`,
    value: `${i.toString().padStart(2, "0")}:00:00`,
  }));

  const handleSubmit = () => {
    const formData = new FormData();

    if (selectedDays["Sunday"]) {
      formData.append(`vendor_hours[0][day_of_week]`, 1);
      formData.append(`vendor_hours[0][open_time]`, openingHours["Sunday"]);
      formData.append(`vendor_hours[0][close_time]`, closingHours["Sunday"]);
      formData.append(`vendor_hours[0][is_closed]`, 1);
    }

    if (selectedDays["Monday"]) {
      formData.append(`vendor_hours[1][day_of_week]`, 2);
      formData.append(`vendor_hours[1][open_time]`, openingHours["Monday"]);
      formData.append(`vendor_hours[1][close_time]`, closingHours["Monday"]);
      formData.append(`vendor_hours[1][is_closed]`, 1);
    }

    if (selectedDays["Tuesday"]) {
      formData.append(`vendor_hours[2][day_of_week]`, 3);
      formData.append(`vendor_hours[2][open_time]`, openingHours["Tuesday"]);
      formData.append(`vendor_hours[2][close_time]`, closingHours["Tuesday"]);
      formData.append(`vendor_hours[2][is_closed]`, 1);
    }

    if (selectedDays["Wednesday"]) {
      formData.append(`vendor_hours[3][day_of_week]`, 4);
      formData.append(`vendor_hours[3][open_time]`, openingHours["Wednesday"]);
      formData.append(`vendor_hours[3][close_time]`, closingHours["Wednesday"]);
      formData.append(`vendor_hours[3][is_closed]`, 1);
    }

    if (selectedDays["Thursday"]) {
      formData.append(`vendor_hours[4][day_of_week]`, 5);
      formData.append(`vendor_hours[4][open_time]`, openingHours["Thursday"]);
      formData.append(`vendor_hours[4][close_time]`, closingHours["Thursday"]);
      formData.append(`vendor_hours[4][is_closed]`, 1);
    }

    if (selectedDays["Friday"]) {
      formData.append(`vendor_hours[5][day_of_week]`, 6);
      formData.append(`vendor_hours[5][open_time]`, openingHours["Friday"]);
      formData.append(`vendor_hours[5][close_time]`, closingHours["Friday"]);
      formData.append(`vendor_hours[5][is_closed]`, 1);
    }

    if (selectedDays["Saturday"]) {
      formData.append(`vendor_hours[6][day_of_week]`, 7);
      formData.append(`vendor_hours[6][open_time]`, openingHours["Saturday"]);
      formData.append(`vendor_hours[6][close_time]`, closingHours["Saturday"]);
      formData.append(`vendor_hours[6][is_closed]`, 1);
    }

    Update_Mutation.mutate(formData);

    console.log({
      vendor_hours: formData,
    });
  };

  const { user_data, user_isLoading } = useSelector((state) => state?.Auth);

  const Update_Mutation = useMutation(
    (data_info) => {
      let url = `${API_BASEURL}v1/vendor/onboarding/opening-hours`;

      const config = {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${user_data?.data?.token}`,
        },
      };

      return axios.post(url, data_info, config);
    },
    {
      onSuccess: (success) => {
        dispatch(UserProfile_Fun());
      },

      onError: (error) => {
        console.log({
          iiii: error?.response?.data?.message,
        });
        Toast.show({
          type: "error",
          text1: `${error?.response?.data?.message}`,
        });
      },
    }
  );
  const { mutate: postOpeningHours, isLoading: isLoadingpostOpeningHours } =
    useApiRequest({
      url: `${API_BASEURL}v1/vendor/onboarding/opening-hours`,
      method: "POST",
      token: user_data?.data?.token || "",
      onSuccess: (response) => {
        console.log({
          sd: response?.data,
        });
        dispatch(UserProfile_Fun());
      },
      onError: (error) => {
        console.log({
          jgjg: error?.response?.data?.errors,
        });
        Toast.show({
          type: "error",
          text1: `${error?.response?.data?.message || "Request failed."}`,
        });
      },
    });

  return (
    <AppscreenLogo>
      <ScrollView
        contentContainerStyle={{
          padding: 20,
          backgroundColor: "#fff",
        }}
      >
        <Text
          style={{
            fontSize: 24,
            fontWeight: "bold",
            color: "#00260E",
            textAlign: "center",
            marginBottom: 5,
          }}
        >
          Opening Hours
        </Text>
        <Text
          style={{
            fontSize: 16,
            color: "#00260E",
            textAlign: "center",
            marginBottom: 20,
          }}
        >
          Put in your work hours
        </Text>
        <Text
          style={{
            fontSize: 14,
            color: "#00260E",
            marginBottom: 10,
          }}
        >
          What Days would you be available? Select all that apply.
        </Text>

        {days.map((day) => (
          <View key={day}>
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                marginBottom: 15,
              }}
            >
              <TouchableOpacity
                style={{
                  width: 20,
                  height: 20,
                  borderWidth: 1,
                  borderColor: "#00260E",
                  marginRight: 10,
                  borderRadius: 4,
                  backgroundColor: selectedDays[day]
                    ? "#FFB742"
                    : "transparent",
                }}
                onPress={() => toggleDaySelection(day)}
              />
              <Text
                style={{
                  fontSize: 16,
                  color: "#00260E",
                }}
              >
                {day}
              </Text>
            </View>

            <View
              style={{
                flex: 1,
              }}
            >
              {selectedDays[day] && (
                <View
                  style={{
                    paddingHorizontal: 20,
                    flexDirection: "row",
                    justifyContent: "space-between",
                    gap: 10,
                    marginBottom: 10,
                  }}
                >
                  <View style={{ width: "50%" }}>
                    <Text>Opening Hour</Text>
                    <Dropdown
                      data={timeOptions}
                      selectedValue={openingHours[day]}
                      onValueChange={(value) =>
                        handleTimeChange(day, value, "opening")
                      }
                    />
                  </View>

                  <View style={{ width: "50%" }}>
                    <Text>Closing Hour</Text>
                    <Dropdown
                      data={timeOptions}
                      selectedValue={closingHours[day]}
                      onValueChange={(value) =>
                        handleTimeChange(day, value, "closing")
                      }
                    />
                  </View>
                </View>
              )}
            </View>
          </View>
        ))}

        {Update_Mutation?.isLoading ? (
          <ActivityIndicator size="small" color={maincolors.primary} />
        ) : (
          <TouchableOpacity
            style={{
              backgroundColor: "#FFB742",
              paddingVertical: 12,
              alignItems: "center",
              borderRadius: 6,
              marginTop: 20,
            }}
            onPress={handleSubmit}
          >
            <Text
              style={{
                color: "#fff",
                fontSize: 16,
                fontWeight: "bold",
              }}
            >
              Continue
            </Text>
          </TouchableOpacity>
        )}
      </ScrollView>
    </AppscreenLogo>
  );
};

import * as DocumentPicker from "expo-document-picker";
import { Ionicons } from "@expo/vector-icons";

export const UploadCACDocument = () => {
  const [cacNumber, setCacNumber] = useState("");
  const [document, setDocument] = useState(null);
  const [errors, setErrors] = useState({});
  const dispatch = useDispatch();

  const { user_data, user_isLoading } = useSelector((state) => state?.Auth);

  console.log({ ppp: user_data?.data?.token });

  const handleDocumentPick = async () => {
    try {
      const result = await DocumentPicker.getDocumentAsync({
        type: "*/*",
        copyToCacheDirectory: true,
      });

      if (result.assets && result.assets.length > 0) {
        setDocument(result);
        setErrors((prev) => ({ ...prev, document: null }));
      }
    } catch (err) {
      console.log("Document picking error:", err);
    }
  };

  const handleRemoveDocument = () => {
    setDocument(null);
  };

  const validateForm = () => {
    let formErrors = {};
    let isValid = true;

    if (!cacNumber.trim()) {
      formErrors.cac_number = "CAC number is required";
      isValid = false;
    }

    if (!document || !document.assets || !document.assets.length) {
      formErrors.document = "Document is required";
      isValid = false;
    }

    setErrors(formErrors);
    return isValid;
  };

  const handleSubmit = async () => {
    if (!validateForm()) {
      // Show first error message
      const firstError = Object.values(errors)[0];
      if (firstError) {
        Toast.show({
          type: "error",
          text1: firstError,
        });
      }
      return;
    }

    const formData = new FormData();
    console.log({
      kk: typeof cacNumber,
    });
    formData.append("cac_number", cacNumber);
    formData.append("document", {
      uri: document?.assets[0]?.uri,
      name: document?.assets[0]?.name,
      type: document?.assets[0]?.mimeType || "application/pdf",
    });

    Update_Mutation.mutate(formData);
  };

  const Update_Mutation = useMutation(
    (data_info) => {
      // let url = `${API_BASEURL}profile/update`;

      let url = `${API_BASEURL}v1/vendor/onboarding/cac-upload`;

      const config = {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${user_data?.data?.token}`,
        },
      };

      return axios.post(url, data_info, config);
    },
    {
      onSuccess: (success) => {
        dispatch(UserProfile_Fun());
      },

      onError: (error) => {
        console.log({
          iiii: error?.response?.data?.message,
        });
        Toast.show({
          type: "error",
          text1: `${error?.response?.data?.message}`,
        });
      },
    }
  );

  return (
    <AppscreenLogo>
      <View
        style={{
          flex: 1,
          padding: 20,
          backgroundColor: "#fff",
        }}
      >
        <Text
          style={{
            fontSize: 24,
            fontWeight: "bold",
            color: "#006241",
            marginBottom: 4,
          }}
        >
          Document Upload
        </Text>

        <Text
          style={{
            fontSize: 16,
            color: "#666",
            marginBottom: 20,
          }}
        >
          (required)
        </Text>

        <View
          style={{
            marginBottom: 20,
          }}
        >
          <Text
            style={{
              fontSize: 16,
              color: "#333",
              marginBottom: 8,
            }}
          >
            CAC Number
          </Text>

          <TextInput
            style={{
              borderWidth: 1,
              borderColor: errors.cac_number ? "#FF6B6B" : "#ddd",
              borderRadius: 8,
              padding: 12,
              fontSize: 16,
            }}
            value={cacNumber}
            onChangeText={(text) => {
              setCacNumber(text);
              setErrors((prev) => ({ ...prev, cac_number: null }));
            }}
            placeholder="Enter CAC Number"
          />
          {errors.cac_number && (
            <Text
              style={{
                color: "#FF6B6B",
                fontSize: 12,
                marginTop: 4,
              }}
            >
              {errors.cac_number[0]}
            </Text>
          )}
        </View>

        <TouchableOpacity
          style={{
            marginVertical: 20,
          }}
          onPress={handleDocumentPick}
        >
          <View
            style={{
              borderWidth: 2,
              borderStyle: "dashed",
              borderColor: errors.document ? "#FF6B6B" : "#ccc",
              borderRadius: 8,
              padding: 20,
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            {document ? (
              <View
                style={{
                  width: "100%",
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "space-between",
                }}
              >
                <View style={{ flex: 1 }}>
                  <View style={{ flexDirection: "row", alignItems: "center" }}>
                    <Ionicons
                      name="document-outline"
                      size={24}
                      color="#006241"
                    />
                    <Text
                      style={{
                        fontSize: 16,
                        color: "#333",
                        marginLeft: 10,
                        flex: 1,
                      }}
                    >
                      {document?.assets[0]?.name}
                    </Text>
                  </View>
                  <Text
                    style={{
                      fontSize: 12,
                      color: "#666",
                      marginTop: 4,
                    }}
                  >
                    {(document?.assets[0]?.size / 1024 / 1024).toFixed(2)} MB
                  </Text>
                </View>

                <TouchableOpacity
                  onPress={handleRemoveDocument}
                  style={{
                    padding: 8,
                  }}
                >
                  <Ionicons name="close-circle" size={24} color="#FF6B6B" />
                </TouchableOpacity>
              </View>
            ) : (
              <>
                <Ionicons
                  name="cloud-upload-outline"
                  size={32}
                  color="#006241"
                />
                <Text
                  style={{
                    fontSize: 16,
                    color: "#333",
                    marginTop: 10,
                  }}
                >
                  Upload Document
                </Text>
                <Text
                  style={{
                    fontSize: 14,
                    color: "#666",
                    marginVertical: 8,
                  }}
                >
                  or
                </Text>
                <Text
                  style={{
                    fontSize: 16,
                    color: "#F4A460",
                  }}
                >
                  Browse
                </Text>
              </>
            )}
          </View>
        </TouchableOpacity>

        {Update_Mutation?.isLoading ? (
          <ActivityIndicator size="small" color={maincolors.primary} />
        ) : (
          <TouchableOpacity
            style={{
              backgroundColor: "#F4A460",
              padding: 15,
              borderRadius: 8,
              alignItems: "center",
              marginTop: "auto",
            }}
            onPress={handleSubmit}
          >
            <Text
              style={{
                color: "#fff",
                fontSize: 16,
                fontWeight: "600",
              }}
            >
              Continue
            </Text>
          </TouchableOpacity>
        )}
      </View>
    </AppscreenLogo>
  );
};
