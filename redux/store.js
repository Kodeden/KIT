import { configureStore } from "@reduxjs/toolkit";
import friendListReducer from "./FriendListSlice";
import { combineReducers } from "redux";
import AsyncStorage from "@react-native-async-storage/async-storage";

import { 
    FLUSH, 
    PAUSE,
    PERSIST,
    persistReducer,
    persistStore,
    PURGE,
    REGISTER,
    REHYDRATE
    } from "redux-persist";

const rootReducer = combineReducers({
    friendList: friendListReducer
})

const persistConfig = {
    key: "new4",
    version: 1,
    storage: AsyncStorage,
}

const persistedReducer = persistReducer(persistConfig, rootReducer)

export const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: {
                ignoreActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
            },
        }),
  });
  
export const persistor = persistStore(store);
export default store;