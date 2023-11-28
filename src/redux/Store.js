import { configureStore } from "@reduxjs/toolkit";
import { combineReducers } from "redux";
import { alertsSlice } from "./AlertSlice";
import { doctorSlice } from "./DoctorSlice";
import { persistReducer, persistStore } from "redux-persist";
import storage from "redux-persist/lib/storage";
import { adminSlice } from "./AdminSlice";
import { userSlice } from "./UserSlice";
import { consultSlice } from "./ConsultSlice";
import {  appointmentSlice } from "./AppointmentSlice";
import { walletSlice } from "./WalletSlice"

const rootReducer = combineReducers({
  alerts: alertsSlice.reducer,
  doctor: doctorSlice.reducer,
  admin: adminSlice.reducer,
  user: userSlice.reducer,
  slot: consultSlice.reducer,
  appointment: appointmentSlice.reducer,
  wallet:walletSlice.reducer
});

const persistConfig = {
  key: "root",
  storage,
};

const persistedReducer = persistReducer(persistConfig, rootReducer);
//to save redux store details after refresh

const store = configureStore({
  reducer: persistedReducer,
});
const persistor = persistStore(store);
export { store, persistor };
