import { configureStore } from "@reduxjs/toolkit";
import talentsReducer from "./talentsSlice.js";

const store = configureStore({
  reducer: {
    talents: talentsReducer
  }
});

export default store;
