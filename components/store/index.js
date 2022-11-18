import { configureStore } from "@reduxjs/toolkit";
import itemSlice from "./item-slice";
import listSlice from "./list-slice";
import userSlice from "./user-slice";

const store = configureStore({
  reducer: { lists: listSlice.reducer, users: userSlice.reducer, items: itemSlice.reducer },
});

export default store;
