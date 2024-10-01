import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  selectedChatUser: null,
  chatList: []  // Store user objects in the chat list
};

const chattingSlice = createSlice({
  name: 'chatting',
  initialState,
  reducers: {
    ChooseUser: (state, action) => {
      state.selectedChatUser = action.payload;
    },
    addChat: (state, action) => {
      const userExists = state.chatList.some((item) => item._id === action.payload._id);
      if (!userExists) {
        console.log('Adding user to chat list:', action.payload);
        state.chatList.push(action.payload);
      } else {
        console.log('User already in chat list:', action.payload);
      }
    },
    clearChatList: (state) => {
      console.log('Clearing chat list',);
      state.chatList = [];
    },
  }
});

export const { ChooseUser, addChat, clearChatList } = chattingSlice.actions;
export default chattingSlice.reducer;
