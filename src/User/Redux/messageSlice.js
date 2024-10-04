import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  realTimeMessages: [],
  messageStatusChanges: [],
  messageCount: {},
};

const messageSlice = createSlice({
  name: "message",
  initialState,
  reducers: {
    addRealTimeMessage: (state, action) => {
      console.log(action.payload);

      state.realTimeMessages.push(action.payload);
      console.log(JSON.stringify(state.realTimeMessages, null, 2));
    },

    removeRealTimeMessages: (state, action) => {
      // Filter out messages that have already been added to the component state
      state.realTimeMessages = state.realTimeMessages.filter(
        (message) => !action.payload.includes(message._id)
      );
    },

    changeMessageStatus: (state, action) => {
      console.log(action.payload);

      const { messageId, status } = action.payload;
      state.messageStatusChanges.push({ messageId, status });
    },
    removeMessageStatus: (state, action) => {
      const { messageId } = action.payload;
      state.messageStatusChanges = state.messageStatusChanges.filter(
        (change) => change.messageId !== messageId
      );
    },
    updateMessageCount: (state, action) => {
      const id = action.payload
      
      if (state.messageCount[id]) {
        state.messageCount[id] += 1
      }
      else {
        state.messageCount[id] = 1
      }
    },
    removeMessageCount: (state,action) => {
      const id = action.payload
      state.messageCount[id] = 0

    }

  },
});

export const {
  addRealTimeMessage,
  removeMessageStatus,
  removeRealTimeMessages,
  changeMessageStatus,
  updateMessageCount,
  removeMessageCount,
} = messageSlice.actions;

export default messageSlice.reducer;
