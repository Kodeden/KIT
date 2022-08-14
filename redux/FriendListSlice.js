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
      date: new Date(1999, 2, 5).toISOString(),
    }

const LeiaOrgana = {
      id: 2, 
      firstName: 'Leia', 
      lastName: 'Friend', 
      phoneNumber: '(555)555-5555', 
      date: new Date(2008, 5, 18).toISOString(),
    }

const Luke = {
      id: 3, 
      firstName: 'Luke', 
      lastName: 'Friend', 
      phoneNumber: '(555)555-5555', 
      date: new Date(2021, 11, 30).toISOString(),
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
    },
    update: (state, { payload }) => {
      const currentIndex = state.findIndex(entry => entry.id === payload.id);
      state[currentIndex].firstName = payload.firstName;
      state[currentIndex].lastName = payload.lastName;
      state[currentIndex].phoneNumber = payload.phoneNumber;
      state[currentIndex].date = payload.date;
    }
  },
});

export const { add, remove, dateStamp, update} = friendListSlice.actions;

export default friendListSlice.reducer;