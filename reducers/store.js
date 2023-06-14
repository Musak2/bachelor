import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "./cartSlice";
import userReducer from "./userSlice";

export const store = configureStore({
  reducer: {
    cart: cartReducer,
    user: userReducer,
  },
  devTools: process.env.NODE_ENV !== "production",
});

export var AppDispatch = store.dispatch;
export var RootState = store.getState;
