import Toast from "react-native-toast-message";

import { useNavigation } from "@react-navigation/native";
import { Alert } from "react-native";

export const handleApiError = (error) => {
  // const navigation = useNavigation();

  console.log({ errorMessage_2: error?.response });
  console.log({ errorMessage_3: error?.response?.data });

  if (error?.response?.data) {
    // return error?.response?.data?.message;

    let bad_Data =
      error?.response?.data ||
      error?.response?.data?.error ||
      error?.response?.data?.message;

    console.log({
      bad_Data: bad_Data,
    });

    if (error?.response?.data?.message === "Invalid token") {
      // navigation.navigate("Login");
      Toast.show({
        type: "error",
        text1: `${error?.response?.data?.message}`,

        text2: `pls logout and login again`,

        // text2: `${error?.response?.data?.error} `,

        // text2: 'Toast message',
      });
    } else {
      Toast.show({
        type: "error",

        text1: `${error?.response?.data?.message} `,

        // text2: `${error?.response?.data?.error} `,

        // text2: 'Toast message',
      });
    }

    // const navigation = useNavigation();

    // if (error?.response?.data?.message == "Invalid token") {
    //   navigation.navigate("Login");
    // }
  }

  const message =
    (error.response && error.response.data && error.response.data.message) ||
    error.message ||
    error.toString();

  // const navigation = useNavigation();

  return message;
};

export const showToast = ({ type, text1, text2 }) => {
  Toast.show({
    type,
    text1,
    text2,
  });
};
