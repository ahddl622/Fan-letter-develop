import { configureStore } from "@reduxjs/toolkit";
import letterReducer from "../modules/letterSlice";
import member from "../modules/member";

const store = configureStore({
  reducer: {
    letters: letterReducer,
    member,
  },
});

export default store;
