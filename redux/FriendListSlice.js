import { createSlice } from "@reduxjs/toolkit";
import uuid from "react-native-uuid";

const mysteryFriend = {
      id: 0, 
      firstName: 'Mysterious', 
      lastName: 'Friend', 
      phoneNumber: '(555)555-5555', 
      date: '0',
    }

const HanSolo = {
      id: 1, 
      firstName: 'Han', 
      lastName: 'Friend', 
      phoneNumber: '(555)555-5555', 
      date: '08/6/2022',
    }

const LeiaOrgana = {
      id: 2, 
      firstName: 'Leia', 
      lastName: 'Friend', 
      phoneNumber: '(555)555-5555', 
      date: '08/2/2021',
    }

const Luke = {
      id: 3, 
      firstName: 'Luke', 
      lastName: 'Friend', 
      phoneNumber: '(555)555-5555', 
      date: '08/4/2021',
    }

export const friendListSlice = createSlice({
  name: "friendList",
  initialState: [mysteryFriend, HanSolo, LeiaOrgana, Luke],
  reducers: {
    add: (state, { payload }) => {
      state.push({ id: uuid.v4(), firstName: payload.firstName, lastName: payload.lastName, phoneNumber: payload.phoneNumber, date: payload.date });
    },
    remove: (state, { payload }) => {
      return state.filter((friend) => friend.id !== payload);
    },
    dateStamp: (state, { payload }) => {
      const currentIndex = state.findIndex(entry => entry.id === payload.id);
      state[currentIndex].date = payload.date;
    }
  },
});

export const { add, remove, dateStamp} = friendListSlice.actions;

export default friendListSlice.reducer;