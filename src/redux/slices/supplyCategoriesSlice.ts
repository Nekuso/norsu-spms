import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

const initialState: any = [];

const supplyCategoriesSlice = createSlice({
  name: "supplyCategories",
  initialState: initialState,
  reducers: {
    setSupplyCategories: (state, action: PayloadAction<any>) => {
      return (state = action.payload);
    },
  },
});

export const { setSupplyCategories } = supplyCategoriesSlice.actions;
export default supplyCategoriesSlice.reducer;
