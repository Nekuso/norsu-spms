import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState: any = {
  currentSession: {},
};

const currentEmployeeSlice = createSlice({
  name: "currentEmployee",
  initialState: initialState,
  reducers: {
    setCurrentSession: (state, action: PayloadAction<any>) => {
      state.currentSession = action.payload;
    },
  },
});

export const { setCurrentSession } = currentEmployeeSlice.actions;
export default currentEmployeeSlice.reducer;
