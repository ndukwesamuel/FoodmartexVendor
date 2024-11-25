import { useState } from "react";
import axios from "axios";
import { useMutation } from "react-query";
import Toast from "react-native-toast-message";

const API_BASEURL = process.env.EXPO_PUBLIC_API_URL;

export const ReportTripMutation = (token) => {
  return useMutation(
    (data_info) => {
      const config = {
        headers: {
          // Authorization: `Bearer ${data_info.token}`,
          Authorization: `Bearer ${token}`,
        },
      };

      let newdata = {
        star: data_info?.star,
        comment: data_info?.comment,
      };

      return axios.post(
        `${API_BASEURL}api/rating/${data_info?.id}`,
        newdata,
        config
      );
    },
    {
      onSuccess: (success) => {
        Toast.show({
          type: "success",
          text1: "Rating successfull",
        });
      },
      onError: (error) => {
        Toast.show({
          type: "error",
          text1: `${error?.response?.data?.message} `,
        });
      },
    }
  );
};

export default ReportTripMutation;
