import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  selectedChatUser: null,
  chatList: []
};

const chattingSlice = createSlice({
  name: 'chatting',
  initialState,
  reducers: {
    ChooseUser: (state, action) => {
      console.log("Action payload in ChooseUser:", action.payload); // Should log the user ID
      if (action.payload) {
        state.selectedChatUser = action.payload;
      }
    },
    
    addChat: (state, action) => {
      const userExists = state.chatList.some((item) => item._id === action.payload._id);
      if (!userExists) {
        state.chatList.push(action.payload);
      }
    },
    clearChatList: (state) => {
      state.chatList = [];
    },
  }
});

export const { ChooseUser, addChat, clearChatList } = chattingSlice.actions;
export default chattingSlice.reducer;
