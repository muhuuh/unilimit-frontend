import { createSlice } from "@reduxjs/toolkit";

const defaultState = {
  expenses: [],
  totalExpense: 0,
  totalIncome: 0,
  total: 0,
};

const expenseSlice = createSlice({
  name: "expense",
  initialState: defaultState,
  reducers: {},
});

export const expenseActions = expenseSlice.actions;
export default expenseSlice;
