import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  userName: null,
  email: null,
  isic: null,
  id: null,
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.userName = action.payload.username;
      state.email = action.payload.email;
      state.isic = action.payload.isic;
      state.id = action.payload.id;
    },
  },
});

export const { setUser } = userSlice.actions;
export const selectUser = (state) => state.user.value;
export default userSlice.reducer;
