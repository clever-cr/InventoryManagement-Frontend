import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./Auth";
import itemsReducer from "./item"



const store = configureStore({
  reducer: {
    auth: authReducer,
    items: itemsReducer
   
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export default store;
