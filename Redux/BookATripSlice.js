import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  busStop: null,
  destination: null,
  time: null,
};

export const BookATripSlice = createSlice({
  name: "BookATripSlice",
  initialState,
  reducers: {
    BookATripSlice_reset: (state) => initialState,
    setBustStop: (state, action) => {
      state.busStop = action.payload;
    },
    setDestination: (state, action) => {
      state.destination = action.payload;
    },
    setLeaveTime: (state, action) => {
      state.time = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function

export const {
  BookATripSlice_reset,
  setBustStop,
  setDestination,
  setLeaveTime,
  BookATripAction,
} = BookATripSlice.actions;

// export const BookATripAction = BookATripSlice.actions;
export default BookATripSlice.reducer;
