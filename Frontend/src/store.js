import { configureStore, combineReducers } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";

import userSlice from "./reducer/userSlice";
import bookSlice from "./reducer/bookSlice";

const persistConfig = {
  key: "root",
  storage,
  whitelist: ["users", "books"],
};

const rootReducer = {
  books: bookSlice.reducer,
  users: userSlice.reducer,
};

const persistedReducer = persistReducer(
  persistConfig,
  combineReducers(rootReducer)
);

const store = configureStore({
  reducer: persistedReducer,
});

export const persistor = persistStore(store);

export default store;
