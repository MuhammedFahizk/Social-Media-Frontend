import { createSlice } from '@reduxjs/toolkit';

// Define the initial state
const initialState = {
  user: {
    name: '',
    email: '',
    bio: '',
    profilePicture: '',
    following: [], // Ensure you have a following array
  }, 
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
    },
    followUserSuccess: (state, action) => {
      state.user.following.push({ _id: action.payload });
    },
    unfollowUserSuccess: (state, action) => {
      state.user.following = state.user.following.filter((item) => item._id !== action.payload);
    },
  },
});

export const { setUser, followUserSuccess, unfollowUserSuccess } = userSlice.actions;
export default userSlice.reducer;
