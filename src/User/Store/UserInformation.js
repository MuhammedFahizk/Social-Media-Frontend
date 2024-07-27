import { createStore } from "@reduxjs/toolkit";
import { persistReducer,persistStore } from "redux-persist";
import storage from "redux-persist/lib/storage";
import  userReducer  from "../Redux/UserInformation";

const persistConfig =  { 
    key: 'root',
    storage,
    whitelist: ['user']
}



const persistedReducer = persistReducer(persistConfig,userReducer);

export const store = createStore(persistedReducer);
export const persistor = persistStore(store);