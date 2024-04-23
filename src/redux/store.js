import { configureStore } from "@reduxjs/toolkit";
import todoReducer from "./features/todoSlice";
import userReducer from "./features/userSlice";
import folderReducer from "./features/folderSlice";

export const store = configureStore({
  reducer: {
    todoReducer: todoReducer,
    userReducer: userReducer,
    folderReducer: folderReducer,
  },
});
