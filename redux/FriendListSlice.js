import { createSlice } from "@reduxjs/toolkit";
import uuid from "react-native-uuid";

const mysteryFriend = {
      id: 0, 
      firstName: 'Error', 
      lastName: 'Error', 
      phoneNumber: 'Error', 
      date: 'Error',
    }

const HanSolo = {
      id: uuid.v4(), 
      firstName: 'Han', 
      lastName: 'Friend', 
      phoneNumber: '(555)555-5555', 
      date: new Date(1999, 2, 5).toISOString(),
    }

const LeiaOrgana = {
      id: uuid.v4(), 
      firstName: 'Leia', 
      lastName: 'Friend', 
      phoneNumber: '(555)555-5555', 
      date: new Date(2008, 5, 18).toISOString(),
    }

const Luke = {
      id: uuid.v4(), 
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
      state[currentIndex] = { ...state[currentIndex], ...payload}
    },
    setPhoto: (state, { payload }) => {
      const currentIndex = state.findIndex(entry => entry.id === payload.id);
      state[currentIndex].image = payload.image;
    },
    removePhoto: (state, { payload }) => {
      const currentIndex = state.findIndex(entry => entry.id === payload.id);
      state[currentIndex].image = 0;
    }
  },
});

export const { add, remove, dateStamp, update, setPhoto, removePhoto } = friendListSlice.actions;

export default friendListSlice.reducer;