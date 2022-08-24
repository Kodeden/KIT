import { createSlice } from "@reduxjs/toolkit";
import uuid from "react-native-uuid";

const mysteryFriend = {
      id: 0, 
      firstName: 'Error', 
      lastName: 'Error', 
      phoneNumber: 'Error', 
      date: 'Error',
    }

const ExampleFriend1 = {
      id: uuid.v4(), 
      firstName: 'John', 
      lastName: 'Smith', 
      phoneNumber: '(555)555-5555', 
      date: new Date(2022, 7, 22).toISOString(),
      image: require('../assets/StockPhoto1.webp')
    }

const ExampleFriend2 = {
      id: uuid.v4(), 
      firstName: 'Jane', 
      lastName: 'Example', 
      phoneNumber: '(555)555-5555', 
      date: new Date(2008, 5, 18).toISOString(),
      image: require('../assets/StockPhoto2.jpg')
    }

const ExampleFriend3 = {
      id: uuid.v4(), 
      firstName: 'Mary', 
      lastName: 'Lamb', 
      phoneNumber: '(555)555-5555', 
      date: new Date(2021, 11, 30).toISOString(),
      image: require('../assets/StockPhoto3.webp')
    }

export const friendListSlice = createSlice({
  name: "friendList",
  initialState: [mysteryFriend, ExampleFriend1, ExampleFriend2, ExampleFriend3],
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