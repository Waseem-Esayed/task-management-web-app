import { combineReducers } from "redux";
import { configureStore } from "@reduxjs/toolkit";
import { authReducer } from "../features/auth/authSlice";
import { themeReducer } from "../features/theme/themeSlice";
import { todoReducer } from "../features/todo/todoSlice";

const rootReducer = combineReducers({
  auth: authReducer,
  theme: themeReducer,
  todo: todoReducer
});

export const store = configureStore({
  reducer: rootReducer,
});
