import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { handleApiError } from "./shareApi";
import Toast from "react-native-toast-message";
import { axiosInstance, getAxiosConfig, getToken } from "./ApiConfig";

const API_BASEURL = process.env.EXPO_PUBLIC_API_URL;

const initialState = {
  categories_data: null,
  categories_isError: false,
  categories_isSuccess: false,
  categories_isLoading: false,
  categories_message: null,
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

export const categories_Fun = createAsyncThunk(
  "categoriesSlice/categories_Fun",
  async (query, thunkAPI) => {
    let url = `v1/vendor/categories`;
    try {
      const response = await fetchResponsData(url, thunkAPI);
      console.log({ response });
      return response?.data;
    } catch (error) {
      console.log({ error: error?.message });
      return thunkAPI.rejectWithValue(
        error.message || "An error occurred while fetching candidate details"
      );
    }
  }
);

export const categoriesSlice = createSlice({
  name: "categoriesSlice",
  initialState,
  reducers: {
    reset_CandidateSlice: (state) => {
      state.Candidate_data = null;
      state.Candidate_isError = false;
      state.Candidate_isSuccess = false;
      state.Candidate_isLoading = false;
      state.Candidate_message = null;
    },
    reset_other_login: (state) => {
      state.Candidate_isError = false;
      state.Candidate_isLoading = false;
      state.Candidate_isSuccess = false;
      state.Candidate_message = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(categories_Fun.pending, (state) => {
        state.categories_isLoading = true;
      })
      .addCase(categories_Fun.fulfilled, (state, action) => {
        state.categories_isLoading = false;
        state.categories_isError = false;
        state.categories_data = action.payload;
        state.categories_message = null;
        state.categories_isSuccess = true;
      })
      .addCase(categories_Fun.rejected, (state, action) => {
        state.categories_isLoading = false;
        state.categories_isError = true;
        state.categories_message = action.payload;
        state.categories_data = null;
        state.categories_isSuccess = false;
      });
  },
});

export const { reset_CandidateSlice } = categoriesSlice.actions;

export default categoriesSlice.reducer;
