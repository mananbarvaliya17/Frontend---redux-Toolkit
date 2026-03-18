import { configureStore } from "@reduxjs/toolkit";
import searchReducer from "../redux/features/searchSlice";
import collectionReducer from "../redux/features/collectionSlice";

export const store = configureStore({
  reducer: {
    search: searchReducer,
    collection:collectionReducer
  },
});
