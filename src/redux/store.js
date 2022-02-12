import { configureStore } from "@reduxjs/toolkit";
import booksReducer from "./slices/books";
import authReducer from "./slices/auth";
import commentsReducer from "./slices/comments";
import thunk from "redux-thunk";

const reducers = {
  auth: authReducer,
  books: booksReducer,
  comments: commentsReducer,
};

const store = configureStore({
  reducer: reducers,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(thunk),
  serializableCheck: false,
  devTools: true,
});

export default store;
