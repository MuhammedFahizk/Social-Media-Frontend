import { createAction, createReducer } from '@reduxjs/toolkit';

// Define the initial state
const initialState = {
  user: {
    name: '',
    email: '',
    bio: '',
    profilePicture: '',
  }, 
};

const setUser = createAction('user/setUser');

const userReducer = createReducer(initialState, (builder) => {
  builder.addCase(setUser, (state, action) => {
    console.log('user Payload',action.payload);
    state.user = action.payload;
  });
});

export { setUser, userReducer };
