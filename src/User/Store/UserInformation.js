import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { persistReducer, persistStore } from "redux-persist";
import storage from "redux-persist/lib/storage";
import userReducer from "../Redux/UserInformation";
import chattingReducer from "../Redux/chattingSlice";
import messageSlice from "../Redux/messageSlice";

// Persist configuration
const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['user'], // Persist only the 'user' slice
};

// Combine all reducers into one root reducer
const rootReducer = combineReducers({
  user: userReducer,
  chatting: chattingReducer,
  message: messageSlice,
});

// Create the persisted reducer
const persistedReducer = persistReducer(persistConfig, rootReducer);

// Configure the store with the persisted reducer and middleware
export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ['persist/PERSIST', 'persist/REHYDRATE'],
      },
    }),
});

// Create the persistor
export const persistor = persistStore(store);
