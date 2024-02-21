import { configureStore } from "@reduxjs/toolkit";
import letters from "reduxStore/modules/letterSlice";
import member from "reduxStore/modules/memberSlice";
import auth from "reduxStore/modules/authSlice";

const store = configureStore({
  reducer: {
    letters,
    member,
    auth,
  },
});

export default store;
