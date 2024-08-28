import { createSlice } from '@reduxjs/toolkit';
import { produce } from 'immer';

const initialState = {
  user: {
    name: '',
    email: '',
    bio: '',
    profilePicture: '',
    following: [],
  },
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser: (state, action) => {
      // If using Immer, ensure immutability
      return produce(state, draft => {
        draft.user = action.payload;
      });
    },
    followUserSuccess: (state, action) => {
      state.user.following.push({ _id: action.payload });
    },
    unfollowUserSuccess: (state, action) => {
      state.user.following = state.user.following.filter((item) => item._id !== action.payload);
    },
    logout: (state) => {
      // Reset user state to initial state
      state.user = initialState.user;
    },
  },
});

export const { setUser, followUserSuccess, unfollowUserSuccess, logout } = userSlice.actions;
export default userSlice.reducer;
