import { useMutation } from "react-query";
import axios from "axios";
import Toast from "react-native-toast-message";

export const useApiRequest = ({
  url,
  token,
  method = "POST",
  onSuccess,
  onError,
}) => {
  return useMutation(
    (data) => {
      const config = {
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: `Bearer ${token}`,
        },
      };
      if (method === "GET") {
        return axios.get(url, { ...config, params: data });
      } else if (method === "POST") {
        return axios.post(url, data, config);
      } else if (method === "PUT") {
        return axios.put(url, data, config);
      }
      return axios[method.toLowerCase()](url, data, config);
    },
    {
      onSuccess: (response) => {
        if (onSuccess) onSuccess(response);
      },
      onError: (error) => {
        if (onError) onError(error);
      },
    }
  );
};

// import { useMutation } from "react-query";
// import axios from "axios";
// import Toast from "react-native-toast-message";

export const useFormDataApiRequest = ({
  url,
  token,
  method = "POST",
  onSuccess,
  onError,
}) => {
  console.log({
    ggg: token,
    sdd: method,
  });
  return useMutation(
    (formData) => {
      const config = {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
          // "Content-Type": "multipart/form-data",
          // Authorization: `Bearer ${user_data?.token}`,
        },
      };

      return axios({
        method,
        url: url,
        formData,
        config,
      });
    },
    {
      onSuccess: (response) => {
        if (onSuccess) onSuccess(response);
      },
      onError: (error) => {
        if (onError) onError(error);
        Toast.show({
          type: "error",
          text1: "Error",
          text2: error.response?.data?.message || "Something went wrong",
        });
      },
    }
  );
};
