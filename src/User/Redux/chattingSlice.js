import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  selectedChatUser: null // More descriptive name for the receiver
};

const chattingSlice = createSlice({
  name: 'chatting',
  initialState,
  reducers: {
    ChooseUser: (state, action) => {
      state.selectedChatUser = action.payload;
      console.log(action.payload);
      
    }
  }
});

export const { ChooseUser } = chattingSlice.actions;
export default chattingSlice.reducer;
