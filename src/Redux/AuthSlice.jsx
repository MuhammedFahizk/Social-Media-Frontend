import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  accessToken: "",
  refreshToken: "",
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setTokens: (state, action) => {
      state.accessToken = action.payload.accessToken;
      state.refreshToken = action.payload.refreshToken;
    },
    updateAccessToken: (state, action) => {
      state.accessToken = action.payload.accessToken;
    },
  },
});

export const { setTokens, updateAccessToken } = authSlice.actions;
export default authSlice.reducer;
