import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { persistStore, persistReducer } from "redux-persist";
import { combineReducers } from "redux";
import OnboardingSlice from "./OnboardingSlice";
import AuthSlice from "./AuthSlice";
import MenuSlice from "./MenuSlice";
import categoriesSlice from "./categoriesSlice";
import OrderSlice from "./OrderSlice";

// import { FLUSH, PAUSE, PERSIST, PURGE, REGISTER, REHYDRATE } from "redux-persist";

const reducers = combineReducers({
  OnboardingSlice: OnboardingSlice,
  Auth: AuthSlice,
  MenuSlice: MenuSlice,
  categoriesSlice: categoriesSlice,
  OrderSlice: OrderSlice,
});

const persistConfig = {
  key: "root",
  storage: AsyncStorage,
  blacklist: ["WalletSlice"],
};

const persistedReducer = persistReducer(persistConfig, reducers);

export const store = configureStore({
  reducer: persistedReducer,
  // middleware option needs to be provided for avoiding the error. ref: https://redux-toolkit.js.org/usage/usage-guide#use-with-redux-persist
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      // serializableCheck: {
      //   ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      // },

      serializableCheck: false,
      immutableCheck: false,
    }),
});

export const persistor = persistStore(store);
