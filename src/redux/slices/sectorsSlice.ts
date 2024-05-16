import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

const initialState: any = [];

const sectorsSlice = createSlice({
  name: "sectors",
  initialState: initialState,
  reducers: {
    setSectorsData: (state, action: PayloadAction<any>) => {
      return (state = action.payload);
    },
  },
});

export const { setSectorsData } = sectorsSlice.actions;
export default sectorsSlice.reducer;
