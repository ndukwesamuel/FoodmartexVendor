import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import axios from "axios";

import Toast from "react-native-toast-message";
import { handleApiError } from "../shareApi";
const API_BASEURL = process.env.EXPO_PUBLIC_API_URL;

const initialState = {
  Get_All_drive_trip_data: null,
  Get_All_drive_trip_isError: false,
  Get_All_drive_trip_isSuccess: false,
  Get_All_drive_trip_isLoading: false,
  Get_All_drive_trip_message: null,

  get_single_driver_trip_data: null,
  get_single_driver_trip_isError: false,
  get_single_driver_trip_isSuccess: false,
  get_single_driver_trip_isLoading: false,
  get_single_driver_trip_message: null,

  driver_trip_data: null,
  driver_trip_isError: false,
  driver_trip_isSuccess: false,
  driver_trip_isLoading: false,
  driver_trip_message: null,
};

export const Get_all_driver_Trip_Fun = createAsyncThunk(
  "DriverTripSLice/Get_all_driver_Trip_Fun",
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

      const response = await axios.get(
        `${API_BASEURL}api/route/driver`,
        config
      );

      return response.data;
    } catch (error) {
      const errorMessage = handleApiError(error);

      return thunkAPI.rejectWithValue(errorMessage);
    }
  }
);

export const Get__Single_driver_Trip_Fun = createAsyncThunk(
  "DriverTripSLice/Get__Single_driver_Trip_Fun",
  async (id, thunkAPI) => {
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
      console.log({
        rerer: response.data,
      });
      return response.data;
    } catch (error) {
   
      // const errorMessage = handleApiError(error);

      return thunkAPI.rejectWithValue(errorMessage);
    }
  }
);

export const Driver_trip_Fun = createAsyncThunk(
  "DriverTripSLice/Driver_trip_Fun",
  async (data, thunkAPI) => {
    try {
      console.log({
        data: data,
      });
      let token = thunkAPI.getState()?.Auth?.user_data?.token;

      const config = {
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: `Bearer ${token}`,
        },
      };

      const response = await axios.patch(
        `${API_BASEURL}api/route/${data?.id}`,
        {
          status: data?.status,
        },
        config
      );

      console.log({
        response: response.data,
      });

      return response.data;
    } catch (error) {
      console.log({
        eee: error,
      });
      const errorMessage = handleApiError(error);

      return thunkAPI.rejectWithValue(errorMessage);
    }
  }
);

export const DriverTripSLice = createSlice({
  name: "DriverTripSLice",
  initialState,
  reducers: {
    reset_TripSLice: (state) => initialState,
    reset_Driver_trip_Fun: (state) => {
      state.driver_trip_data = null;
      state.driver_trip_isError = false;
      state.driver_trip_isSuccess = false;
      state.driver_trip_isLoading = false;
      state.driver_trip_message = null;
    },

    reset_get_single_driver_trip_Fun: (state) => {
      state.get_single_driver_trip_data = null;
      state.get_single_driver_trip_isError = false;
      state.get_single_driver_trip_isSuccess = false;
      state.get_single_driver_trip_isLoading = false;
      state.get_single_driver_trip_message = null;
    },

    UserBookSeats_fun: (state, action) => {
      state.UserBookSeats_data = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(Get_all_driver_Trip_Fun.pending, (state) => {
        state.Get_All_drive_trip_isLoading = true;
      })
      .addCase(Get_all_driver_Trip_Fun.fulfilled, (state, action) => {
        state.Get_All_drive_trip_isLoading = false;
        state.Get_All_drive_trip_isSuccess = true;
        state.Get_All_drive_trip_isError = false;
        state.Get_All_drive_trip_data = action.payload;
      })
      .addCase(Get_all_driver_Trip_Fun.rejected, (state, action) => {
        state.Get_All_drive_trip_isLoading = false;
        state.Get_All_drive_trip_isSuccess = false;
        state.Get_All_drive_trip_isError = true;
        state.Get_All_drive_trip_message = action.payload;
      })

      .addCase(Get__Single_driver_Trip_Fun.pending, (state) => {
        state.get_single_driver_trip_isLoading = true;
      })
      .addCase(Get__Single_driver_Trip_Fun.fulfilled, (state, action) => {
        state.get_single_driver_trip_isLoading = false;
        state.get_single_driver_trip_isSuccess = true;
        state.get_single_driver_trip_isError = false;
        state.get_single_driver_trip_data = action.payload;
        state.get_single_driver_trip_message = null;
      })
      .addCase(Get__Single_driver_Trip_Fun.rejected, (state, action) => {
        state.get_single_driver_trip_isLoading = false;
        state.get_single_driver_trip_isSuccess = false;
        state.get_single_driver_trip_isError = true;
        state.get_single_driver_trip_data = null;
        state.get_single_driver_trip_message = action.payload;
      })

      .addCase(Driver_trip_Fun.pending, (state) => {
        state.driver_trip_isLoading = true;
      })
      .addCase(Driver_trip_Fun.fulfilled, (state, action) => {
        state.driver_trip_isLoading = false;
        state.driver_trip_isSuccess = true;
        state.driver_trip_isError = false;
        state.driver_trip_data = action.payload;
        state.driver_trip_message = null;
      })
      .addCase(Driver_trip_Fun.rejected, (state, action) => {
        state.driver_trip_isLoading = false;
        state.driver_trip_isSuccess = false;
        state.driver_trip_isError = true;
        state.driver_trip_data = null;
        state.driver_trip_message = action.payload;
      });
  },
});

export const {
  reset_TripSLice,
  reset_Driver_trip_Fun,
  reset_get_single_driver_trip_Fun,
} = DriverTripSLice.actions;

export default DriverTripSLice.reducer;
