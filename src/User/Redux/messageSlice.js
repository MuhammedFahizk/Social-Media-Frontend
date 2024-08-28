import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  realTimeMessages: [], // Store only real-time messages here
};

const messageSlice = createSlice({
  name: 'message',
  initialState,
  reducers: {
    addRealTimeMessage: (state, action) => {
      state.realTimeMessages.push(action.payload);
    },
    
  }
});

export const { addRealTimeMessage } = messageSlice.actions;
export default messageSlice.reducer;
