import { configureStore } from "@reduxjs/toolkit";
import counterReducer from "../features/Counter/CounterSlice";


export default configureStore({
  reducer: {
    counter: counterReducer,
  }
})