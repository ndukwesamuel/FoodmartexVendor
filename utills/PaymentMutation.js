import { useState } from "react";
import axios from "axios";
import { useMutation } from "react-query";
import Toast from "react-native-toast-message";

const API_BASEURL = process.env.EXPO_PUBLIC_API_URL;

export const PaymentMutation = (token) => {
  return useMutation(
    (data_info) => {
      const config = {
        headers: {
          // Authorization: `Bearer ${data_info.token}`,
          Authorization: `Bearer ${token}`,
        },
      };

      return axios.post(`${API_BASEURL}api/trip`, data_info, config);
    },
    {
      onSuccess: (success) => {
        Toast.show({
          type: "success",
          text1: "payment successfull ",
        });
        // dispatch(UserProfile_Fun());
      },
      onError: (error) => {
        console.log({
          e: error,
        });
        Toast.show({
          type: "error",
          text1: `${error?.response?.data?.message} `,
        });
      },
    }
  );
};

export default PaymentMutation;
