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
import {
  CustomTextArea,
  Forminput,
  Forminputpassword,
  RadioButton,
  SelectInput,
} from "../shared/InputForm";
import { maincolors } from "../../utills/Themes";
import AppscreenLogo from "../shared/AppscreenLogo";

const API_BASEURL = process.env.EXPO_PUBLIC_API_URL;

const RidersignUp = ({ onSetAuth }) => {
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

export default RidersignUp;

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

const StepTwoSignUp = ({ onSetAuth, changeStep }) => {
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
    gender: "", // Added gender here
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

  const [text, setText] = useState("");

  const handleTextChange = (newText) => {
    setText(newText);
  };

  return (
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
            <Forminput
              placeholder="Delivery Zones"
              onChangeText={(text) => handleInputChange("firstName", text)}
              value={formData.firstName}
              style={styles.input}
            />
          </View>

          <View style={styles.inputContainer}>
            <Text style={styles.labels}>Delivery Time Frame</Text>
            <Forminput
              placeholder="Delivery Time Frame"
              onChangeText={(text) => handleInputChange("firstName", text)}
              value={formData.firstName}
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

          {/* Additional input fields */}

          {/* Action Button */}
          <View style={styles.buttonContainer}>
            <Pressable onPress={() => changeStep(3)} style={styles.button}>
              {Registration_Mutation.isLoading ? (
                <ActivityIndicator size="small" color="white" />
              ) : (
                <Text style={styles.buttonText}>Continue</Text>
              )}
            </Pressable>
          </View>
        </View>
      </View>
    </ScrollView>
  );
};

const StepThreeSignUp = ({ onSetAuth, changeStep }) => {
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
    gender: "", // Added gender here
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

  const [text, setText] = useState("");

  const handleTextChange = (newText) => {
    setText(newText);
  };

  return (
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
              onChangeText={(text) => handleInputChange("firstName", text)}
              value={formData.firstName}
              style={styles.input}
            />
          </View>

          <View style={styles.inputContainer}>
            <Text style={styles.labels}>Account Number</Text>
            <Forminput
              placeholder="Delivery Time Frame"
              onChangeText={(text) => handleInputChange("firstName", text)}
              value={formData.firstName}
              style={styles.input}
            />
          </View>

          <View style={styles.inputContainer}>
            <Text style={styles.labels}>Bank Name</Text>
            <Forminput
              placeholder="Bank"
              onChangeText={(text) => handleInputChange("firstName", text)}
              value={formData.firstName}
              style={styles.input}
            />
          </View>

          {/* Additional input fields */}

          {/* Action Button */}
          <View style={styles.buttonContainer}>
            <Pressable onPress={() => changeStep(4)} style={styles.button}>
              {Registration_Mutation.isLoading ? (
                <ActivityIndicator size="small" color="white" />
              ) : (
                <Text style={styles.buttonText}>Continue</Text>
              )}
            </Pressable>
          </View>
        </View>
      </View>
    </ScrollView>
  );
};

const StepFourSignUp = ({ onSetAuth, changeStep }) => {
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
    gender: "", // Added gender here
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

  const [text, setText] = useState("");

  const handleTextChange = (newText) => {
    setText(newText);
  };

  return (
    <ScrollView style={styles.container}>
      <View style={{}}>
        <View style={{ gap: 10 }}>
          {/* Full Name */}
          <View style={styles.inputContainer}>
            <Text style={styles.labels}>Have a Food Safety Certification?</Text>
            <Forminput
              placeholder="Account Name"
              onChangeText={(text) => handleInputChange("firstName", text)}
              value={formData.firstName}
              style={styles.input}
            />

            <View style={{ marginTop: 15 }}>
              <Text>Choose Gender:</Text>
              <RadioButton
                label="Male"
                selected={selectedOption === 1}
                onSelect={() => handleRadioSelect(1)}
              />
              <RadioButton
                label="Female"
                selected={selectedOption === 2}
                onSelect={() => handleRadioSelect(2)}
                inputStyle={styles.radioButton}
              />
            </View>
          </View>

          <View style={styles.inputContainer}>
            <Text style={styles.labels}>Input Quality Control Measures</Text>

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

          {/* Additional input fields */}

          {/* Action Button */}
          <View style={styles.buttonContainer}>
            <Pressable onPress={() => changeStep(3)} style={styles.button}>
              {Registration_Mutation.isLoading ? (
                <ActivityIndicator size="small" color="white" />
              ) : (
                <Text style={styles.buttonText}>Continue</Text>
              )}
            </Pressable>
          </View>
        </View>
      </View>
    </ScrollView>
  );
};
