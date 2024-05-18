import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

const initialState: any = [];

const mainSuppliesSlice = createSlice({
  name: "mainSupplies",
  initialState: initialState,
  reducers: {
    setMainSupplies: (state, action: PayloadAction<any>) => {
      return (state = action.payload);
    },
  },
});

export const { setMainSupplies } = mainSuppliesSlice.actions;
export default mainSuppliesSlice.reducer;
