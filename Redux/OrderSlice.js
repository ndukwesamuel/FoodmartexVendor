import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { handleApiError } from "./shareApi";
import Toast from "react-native-toast-message";
import { axiosInstance, getAxiosConfig, getToken } from "./ApiConfig";

const API_BASEURL = "https://foodmart-backend.gigtech.site/api/"; // process.env.EXPO_PUBLIC_API_URL;

const initialState = {
  vendor_order_data: null,
  vendor_order_isError: false,
  vendor_order_isSuccess: false,
  vendor_order_isLoading: false,
  vendor_order_message: null,
};

const fetchResponsData = async (url, thunkAPI) => {
  try {
    const token = getToken(thunkAPI);

    const response = await axiosInstance.get(url, getAxiosConfig(token));

    return response.data;
  } catch (error) {
    if (error.response) {
      throw new Error(
        `Failed to fetch data: ${error.response.status} - ${
          error.response.data?.message || error.response.statusText
        }`
      );
    } else if (error.request) {
      throw new Error(
        "No response received from the server. Please check your network connection."
      );
    } else {
      throw new Error(`Unexpected error: ${error.message}`);
    }
  }
};

export const Get_All_Vendor_Order_Fun = createAsyncThunk(
  "OrderSlice/Get_All_Vendor_Order_Fun",
  async (query, thunkAPI) => {
    // let url = "v1/vendor/orders?status=pending&search&per_page=50"
    let url = "v1/vendor/orders?per_page=50";

    try {
      const response = await fetchResponsData(url, thunkAPI);

      return response?.data;
    } catch (error) {
      console.log({ error });
      return thunkAPI.rejectWithValue(
        error.message || "An error occurred while fetching candidate profile"
      );
    }
  }
);

export const OrderSlice = createSlice({
  name: "OrderSlice",
  initialState,
  reducers: {
    resetVendor: (state) => {
      state.vendor_order_data = null;
      state.vendor_order_isError = false;
      state.vendor_order_isSuccess = false;
      state.vendor_order_isLoading = false;
      state.vendor_order_message = null;
    },
    // reset_CandidateSlice: (state) => {
    //   state.Candidate_data = null;
    //   state.Candidate_isError = false;
    //   state.Candidate_isSuccess = false;
    //   state.Candidate_isLoading = false;
    //   state.Candidate_message = null;
    // },
    // reset_other_login: (state) => {
    //   state.Candidate_isError = false;
    //   state.Candidate_isLoading = false;
    //   state.Candidate_isSuccess = false;
    //   state.Candidate_message = null;
    // },
  },
  extraReducers: (builder) => {
    builder
      .addCase(Get_All_Vendor_Order_Fun.pending, (state) => {
        state.vendor_order_isLoading = true;
      })
      .addCase(Get_All_Vendor_Order_Fun.fulfilled, (state, action) => {
        state.Get_All_Vendor_Order_Fun = false;
        state.vendor_order_isError = false;
        state.vendor_order_data = action.payload;
        state.vendor_order_isError = null;
        state.vendor_order_isSuccess = true;
      })
      .addCase(Get_All_Vendor_Order_Fun.rejected, (state, action) => {
        state.vendor_order_isLoading = false;
        state.vendor_order_isError = true;
        state.vendor_order_isError = action.payload;
        state.vendor_order_data = null;
        state.vendor_order_isSuccess = false;
      });
  },
});

export const {} = OrderSlice.actions;

export default OrderSlice.reducer;
