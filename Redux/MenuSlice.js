import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { handleApiError } from "./shareApi";
import Toast from "react-native-toast-message";
import { axiosInstance, getAxiosConfig, getToken } from "./ApiConfig";

const API_BASEURL = "https://foodmart-backend.gigtech.site/api/"; // process.env.EXPO_PUBLIC_API_URL;

const initialState = {
  menu_data: null,
  menu_isError: false,
  menu_isSuccess: false,
  menu_isLoading: false,
  menu_message: null,
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

export const Get_All_Menu_Fun = createAsyncThunk(
  "CandidateSlice/Get_All_Menu_Fun",
  async (query, thunkAPI) => {
    let url = "v1/vendor/menu-items";

    console.log({
      kkjjjj: url,
    });

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

export const Get_All_Assigned_guarantor__Fun = createAsyncThunk(
  "CandidateSlice/Get_All_Assigned_guarantor__Fun",
  async (query, thunkAPI) => {
    let url;
    console.log({
      sss: query,
    });
    if (query?.searchQuery) {
      url = `v1/guarantors?page=${query?.page}&perPage=${query?.perPage}&search=${query?.searchQuery}`;
    } else {
      url = `v1/guarantors?page=${query?.page}&perPage=${query?.perPage}`;
    }

    // `v1/candidates?page=${query?.page}&`;

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

export const CandidateDetails_Fun = createAsyncThunk(
  "CandidateSlice/CandidateDetails_Fun",
  async (query, thunkAPI) => {
    let url = `v1/candidates/details?staffId=${query?.staff_id}`;
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

export const MenuSlice = createSlice({
  name: "MenuSlice",
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
      .addCase(Get_All_Menu_Fun.pending, (state) => {
        state.menu_isLoading = true;
      })
      .addCase(Get_All_Menu_Fun.fulfilled, (state, action) => {
        state.menu_isLoading = false;
        state.menu_isError = false;
        state.menu_data = action.payload;
        state.menu_message = null;
        state.menu_isSuccess = true;
      })
      .addCase(Get_All_Menu_Fun.rejected, (state, action) => {
        state.menu_isLoading = false;
        state.menu_isError = true;
        state.menu_message = action.payload;
        state.menu_data = null;
        state.menu_isSuccess = false;
      });
  },
});

export const {} = MenuSlice.actions;

export default MenuSlice.reducer;
