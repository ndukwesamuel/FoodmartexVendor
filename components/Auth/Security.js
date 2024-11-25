import React, { useEffect, useState } from "react";
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
import { useMutation, useQuery } from "react-query";
import { useDispatch, useSelector } from "react-redux";
import { useNavigation } from "@react-navigation/native";
import { checkOtp, setOtpEmail } from "../../Redux/OnboardingSlice";
import { Forminput } from "../shared/InputForm";
import { maincolors } from "../../utills/Themes";
import AppscreenLogo from "../shared/AppscreenLogo";

const API_BASEURL = process.env.EXPO_PUBLIC_API_URL;
console.log({
  ggg: API_BASEURL,
});
const Security = ({ onSetAuth2 }) => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const { user_data, user_isLoading } = useSelector((state) => state?.Auth);

  const [answer_question, setAnswer_question] = useState("");
  const [formData, setFormData] = useState({
    questions: "",
    answer: "",
  });
  const [securityQuestions, setsecurityQuestions] = useState(null);

  const [isQuestionModalVisible, setQuestionModalVisible] = useState(false);

  const otpemail = useSelector((state) => state?.OnboardingSlice);

  const fetchSecurityQuestions = async () => {
    try {
      const response = await fetch(`${API_BASEURL}v1/security-questions`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: `Bearer ${user_data?.data?.token}`,
        },
      });

      if (!response.ok) {
        throw new Error("Failed to fetch security questions");
      }

      const data = await response.json();

      console.log("Security Questions:", { kaka: data?.data });

      setsecurityQuestions(data?.data);
      return data;
    } catch (error) {
      console.log({
        jj: error?.response,
      });
      console.error("Error fetching security questions:", error.message);
      return null;
    }
  };

  useEffect(() => {
    fetchSecurityQuestions();

    return () => {};
  }, []);

  const handleInputChange = (field, value) => {
    setFormData((prevData) => ({
      ...prevData,
      [field]: value,
    }));
  };

  const selectQuestion = (question) => {
    handleInputChange("questions", question);
    setQuestionModalVisible(false);
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

  const SUbmitAnswer_Mutation = useMutation(
    (data_info) => {
      const url = `${API_BASEURL}v1/security-questions`;
      const config = {
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: `Bearer ${user_data?.data?.token}`,
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
    console.log({
      jgjg: formData,
    });
    let data = {
      question: formData?.questions,
      answer: formData?.answer,
    };
    SUbmitAnswer_Mutation.mutate(data);
  };

  return (
    <AppscreenLogo>
      <ScrollView style={styles.container}>
        <View style={{ alignSelf: "center" }}>
          <Text style={styles.header}>Set Security Question</Text>
        </View>

        <View style={styles.inputContainer}>
          <Text style={styles.labels}>Select security question</Text>
          <Pressable
            onPress={() => setQuestionModalVisible(true)}
            style={styles.input}
          >
            <Text style={{ color: formData.questions ? "black" : "gray" }}>
              {formData.questions || "Select a question"}
            </Text>
          </Pressable>
        </View>

        <View style={styles.inputContainer}>
          <Text style={styles.labels}>Answer</Text>
          <Forminput
            placeholder="Answer"
            onChangeText={(text) => handleInputChange("answer", text)}
            value={formData.answer}
            style={styles.input}
          />
        </View>

        <View>
          <Text style={styles.footerText}>
            By clicking this box, i have read, understood and agreed to the
            <Text
              onPress={() => console.log("this is me")}
              style={styles.loginText}
            >
              terms and conditions
            </Text>
            of FalconEx
          </Text>
        </View>

        <View style={styles.buttonContainer}>
          {SUbmitAnswer_Mutation.isLoading ? (
            <ActivityIndicator size="large" color={maincolors.primary} />
          ) : (
            <Pressable onPress={handleSignUp} style={styles.button}>
              <Text style={styles.buttonText}>Create</Text>
            </Pressable>
          )}
        </View>

        {/* Security Questions Modal */}
        <Modal
          transparent={true}
          visible={isQuestionModalVisible}
          onRequestClose={() => setQuestionModalVisible(false)}
        >
          <View style={styles.modalOverlay}>
            <View style={styles.modalContainer}>
              <Text style={styles.modalHeader}>Select a Question</Text>
              {!securityQuestions ? (
                <ActivityIndicator size="large" color={maincolors.primary} />
              ) : (
                securityQuestions?.["security-questions"]?.map(
                  (question, index) => (
                    <Pressable
                      key={index}
                      onPress={() => selectQuestion(question)}
                      style={styles.modalOption}
                    >
                      <Text style={styles.modalOptionText}>{question}</Text>
                    </Pressable>
                  )
                )
              )}
            </View>
          </View>
        </Modal>
      </ScrollView>
    </AppscreenLogo>
  );
};

export default Security;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 10,
    backgroundColor: maincolors.white,
  },
  header: {
    fontSize: 24,
    fontWeight: "700",
    textAlign: "center",
  },
  inputContainer: {
    marginVertical: 10,
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
    marginVertical: 20,
    alignItems: "center",
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
    // alignItems: "center",
  },
  modalOptionText: {
    fontSize: 16,
  },
});
