import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { handleApiError } from "./shareApi";

import axios from "axios";

import Toast from "react-native-toast-message";
const API_BASEURL = process.env.EXPO_PUBLIC_API_URL;

console.log({
  kdkd: API_BASEURL,
});
// import { Alert } from "react-native";

// let userAPi = process.env.APIBASEURL + "user/login";

const initialState = {
  user_data: null,
  user_isError: false,
  user_isSuccess: false,
  user_isLoading: false,
  user_message: null,

  user_profile_data: null,
  user_profile_isError: false,
  user_profile_isSuccess: false,
  user_profile_isLoading: false,
  user_profile_message: null,
};

const Login_Fun_Service = async (data) => {
  let url = `${API_BASEURL}login`;
  console.log({ log: url });

  try {
    const response = await axios.post(url, data);
    console.log({ response: response.data });
    return response.data;
  } catch (error) {
    console.log({
      ddd: error,
    });
    throw error;
  }
};

export const Login_Fun = createAsyncThunk(
  "auth/Login_Fun",
  async (data, thunkAPI) => {
    try {
      return await Login_Fun_Service(data);
    } catch (error) {
      const errorMessage = handleApiError(error);
      return thunkAPI.rejectWithValue(errorMessage);
    }
  }
);

export const UserProfile_Fun = createAsyncThunk(
  "auth/UserProfile_Fun",
  async (_, thunkAPI) => {
    try {
      let token = thunkAPI.getState()?.Auth?.user_data?.data?.token;
      // ?.data?.token;
      const config = {
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: `Bearer ${token}`,
        },
      };
      const response = await axios.get(`${API_BASEURL}v1/profile`, config);

      return response.data;
    } catch (error) {
      const errorMessage = handleApiError(error);
      return thunkAPI.rejectWithValue(errorMessage);
    }
  }
);

export const AuthSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    reset_login: (state) => initialState,
  },
  extraReducers: (builder) => {
    builder
      .addCase(Login_Fun.pending, (state) => {
        state.user_isLoading = true;
      })
      .addCase(Login_Fun.fulfilled, (state, action) => {
        state.user_isLoading = false;
        state.user_isSuccess = true;
        state.user_isError = false;
        state.user_message = null;
        state.user_data = action.payload;
        Toast.show({
          type: "success",
          text1: "Login  successfully!",
          customStyles: {
            backgroundColor: "red", // Change color here
          },
        });
      })

      .addCase(Login_Fun.rejected, (state, action) => {
        state.user_isLoading = false;
        state.user_isError = true;
        state.user_message = action.payload;
        state.user_data = null;
        state.user_isSuccess = false;
      })
      .addCase(UserProfile_Fun.pending, (state) => {
        state.user_profile_isLoading = true;
      })
      .addCase(UserProfile_Fun.fulfilled, (state, action) => {
        state.user_profile_isLoading = false;
        state.user_profile_isSuccess = true;
        state.user_profile_isError = false;
        state.user_profile_message = null;
        state.user_profile_data = action.payload;
      })
      .addCase(UserProfile_Fun.rejected, (state, action) => {
        state.user_profile_isLoading = false;
        state.user_profile_isError = true;
        state.user_profile_message = action.payload;
        state.user_profile_data = null;
        state.user_profile_isSuccess = false;
      });
  },
});

export const { reset_login } = AuthSlice.actions;

export default AuthSlice.reducer;
