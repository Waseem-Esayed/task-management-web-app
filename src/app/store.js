import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../features/auth/authSlice";
import themeReducer from "../features/theme/themeSlice";
import todoReducer from "../features/todo/todoSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    theme: themeReducer,
    todo: todoReducer,
  },
});
