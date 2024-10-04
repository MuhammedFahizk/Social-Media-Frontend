import { createSlice } from '@reduxjs/toolkit';
import { produce } from 'immer';

const initialState = {
  role: null ,
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
    setRole: (state, action) => {
      state.role = action.payload;
    },
    setUser: (state, action) => {
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
      state.role = null 
    },
  },
});

export const { setUser,setRole, followUserSuccess, unfollowUserSuccess, logout } = userSlice.actions;
export default userSlice.reducer;
