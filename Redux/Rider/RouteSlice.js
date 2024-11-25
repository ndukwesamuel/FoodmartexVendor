import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
// import { handleApiError } from "./shareApi";

import axios from "axios";

import Toast from "react-native-toast-message";
import { handleApiError } from "../shareApi";
const API_BASEURL = process.env.EXPO_PUBLIC_API_URL;

// import { Alert } from "react-native";

// let userAPi = process.env.APIBASEURL + "user/login";

const initialState = {
  Get_All_Routes_data: null,
  Get_All_Routes_isError: false,
  Get_All_Routes_isSuccess: false,
  Get_All_Routes_isLoading: false,
  Get_All_Routes_message: null,

  get_all_bustops_data: null,
  get_all_bustops_isError: false,
  get_all_bustops_isSuccess: false,
  get_all_bustops_isLoading: false,
  get_all_bustops_message: null,

  get_single_route_data: null,
  get_single_route_isError: false,
  get_single_route_isSuccess: false,
  get_single_route_isLoading: false,
  get_single_route_message: null,

  UserBookSeats_data: null,
};

export const Get_All_Routes_Fun = createAsyncThunk(
  "RouteSlice/Get_All_Routes_Fun",
  async (data, thunkAPI) => {
    try {
      let token = thunkAPI.getState()?.Auth?.user_data?.token;

      const config = {
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: `Bearer ${token}`,
        },
      };
      // const response = await axios.get(
      //   `${API_BASEURL}api/route?pickUp=${busStop?.name}&dropOff=${dest?.name}`,
      //   config
      // );
      const response = await axios.get(`${API_BASEURL}api/route`, config);

      return response.data;
    } catch (error) {
      const errorMessage = handleApiError(error);

      return thunkAPI.rejectWithValue(errorMessage);
    }
  }
);
export const Get_Single_Routes_Fun = createAsyncThunk(
  "RouteSlice/Get_Single_Routes_Fun",
  async (id, thunkAPI) => {
    console.log({
      bbbb: id,
    });
    try {
      let token = thunkAPI.getState()?.Auth?.user_data?.token;

      const config = {
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: `Bearer ${token}`,
        },
      };

      const response = await axios.get(`${API_BASEURL}api/route/${id}`, config);

      return response.data;
    } catch (error) {
      const errorMessage = handleApiError(error);

      return thunkAPI.rejectWithValue(errorMessage);
    }
  }
);

export const Get_All_Bustop_Fun = createAsyncThunk(
  "RouteSlice/Get_All_Bustop_Fun",
  async (_, thunkAPI) => {
    try {
      let token = thunkAPI.getState()?.Auth?.user_data?.token;

      const config = {
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: `Bearer ${token}`,
        },
      };

      const response = await axios.get(`${API_BASEURL}api/location`, config);

      return response.data;
    } catch (error) {
      const errorMessage = handleApiError(error);

      return thunkAPI.rejectWithValue(errorMessage);
    }
  }
);

export const RouteSlice = createSlice({
  name: "RouteSlice",
  initialState,
  reducers: {
    reset_RouteSlice: (state) => initialState,

    UserBookSeats_fun: (state, action) => {
      state.UserBookSeats_data = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(Get_All_Routes_Fun.pending, (state) => {
        state.Get_All_Routes_isLoading = true;
      })
      .addCase(Get_All_Routes_Fun.fulfilled, (state, action) => {
        state.Get_All_Routes_isLoading = false;
        state.Get_All_Routes_isError = false;
        state.Get_All_Routes_isSuccess = true;
        state.Get_All_Routes_message = null;
        state.Get_All_Routes_data = action.payload;

        // Toast.show({
        //   type: "success",
        //   text1: "Login  successfully!",
        //   customStyles: {
        //     backgroundColor: "red", // Change color here
        //   },
        // });
      })

      .addCase(Get_All_Routes_Fun.rejected, (state, action) => {
        state.Get_All_Routes_isLoading = false;
        state.Get_All_Routes_isError = true;
        state.Get_All_Routes_isSuccess = false;
        state.Get_All_Routes_message = action.payload;
        // Toast.show({
        //   type: "error",
        //   text1: "Login failed!",
        //   customStyles: {
        //     backgroundColor: "red", // Change color here
        //   },
        // });
      })
      .addCase(Get_Single_Routes_Fun.pending, (state) => {
        state.get_single_route_isLoading = true;
      })
      .addCase(Get_Single_Routes_Fun.fulfilled, (state, action) => {
        state.get_single_route_isLoading = false;
        state.get_single_route_isError = false;
        state.get_single_route_isSuccess = true;
        state.get_single_route_message = null;
        state.get_single_route_data = action.payload;
      })
      .addCase(Get_Single_Routes_Fun.rejected, (state, action) => {
        state.get_single_route_isLoading = false;
        state.get_single_route_isError = true;
        state.get_single_route_isSuccess = false;
        state.get_single_route_message = action.payload;
      })

      .addCase(Get_All_Bustop_Fun.pending, (state) => {
        state.get_all_bustops_isLoading = true;
      })
      .addCase(Get_All_Bustop_Fun.fulfilled, (state, action) => {
        state.get_all_bustops_isLoading = false;
        state.get_all_bustops_isError = false;
        state.get_all_bustops_isSuccess = true;
        state.get_all_bustops_message = null;
        state.get_all_bustops_data = action.payload;
      })
      .addCase(Get_All_Bustop_Fun.rejected, (state, action) => {
        state.get_all_bustops_isLoading = false;
        state.get_all_bustops_isError = true;
        state.get_all_bustops_isSuccess = false;
        state.get_all_bustops_message = action.payload;
      });
  },
});

export const { reset_RouteSlice, UserBookSeats_fun } = RouteSlice.actions;

export default RouteSlice.reducer;
