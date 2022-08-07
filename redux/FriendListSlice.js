import { createSlice } from "@reduxjs/toolkit";
import uuid from "react-native-uuid";

export const friendListSlice = createSlice({
  name: "friendList",
  initialState: [],
  reducers: {
    add: (state, { payload }) => {
      state.push({ id: uuid.v4(), firstName: payload.firstName, lastName: payload.lastName, phoneNumber: payload.phoneNumber, date: payload.date, month: payload.month, year: payload.year });
    },
    remove: (state, { payload }) => {
      return state.filter((friend) => friend.id !== payload);
    },
  },
});

// ACTIONS
export const { add, remove } = friendListSlice.actions;

export default friendListSlice.reducer;