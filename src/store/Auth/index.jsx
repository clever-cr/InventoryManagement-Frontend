import { createSlice } from "@reduxjs/toolkit";

const mySlice = createSlice({
  name: "auth",
  initialState: {
    isFetching: false,
    all: null,
    selected: null,
    user: {}
  },
  reducers: {

    setIsFetching(state, action) {
      state.isFetching = action.payload;
    },
    setUser(state, action) {
      state.user = action.payload;
    },

  },
});

export const myAuth = mySlice.actions;

export default mySlice.reducer;
