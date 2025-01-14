import { createSlice } from "@reduxjs/toolkit";

const mySlice = createSlice({
  name: "item",
  initialState: {
    isFetching: false,
    all: null,
    selected: null,
    notifications: null,
    itemsSold:null
  },
  reducers: {

    setIsFetching(state, action) {
      state.isFetching = action.payload;
    },
    setselected(state, action) {
      state.selected = action.payload;
    },

    setAll(state, action) {
      state.all = action.payload;
    },
    setNotification(state, action) {
      state.notifications = action.payload
    },
    setSoldItems(state,action){
      state.itemsSold = action.payload
    }
  },
});

export const myItem = mySlice.actions;

export default mySlice.reducer;
