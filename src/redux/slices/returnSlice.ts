import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

const initialState: any = {
  returnOptions: [],
};

const returnSlice = createSlice({
  name: "requests",
  initialState: initialState,
  reducers: {
    setReturns: (state, action: PayloadAction<any>) => {
      const returnData = action.payload.allMainSuppliesData;
      const returnCart = action.payload.returnCart.returnCart;

      const updatedReturnCart = returnData
        ? returnData.map((request: any) => {
            const requestSupply = returnCart.find(
              (supply: any) => supply.mainSupplyId === request.id
            );

            if (requestSupply) {
              return {
                ...request,
                supply_quantity:
                  request.supply_quantity - requestSupply.quantity,
              };
            }
            return request;
          })
        : [];

      state.returnOptions = updatedReturnCart;
    },
  },
});

export const { setReturns } = returnSlice.actions;
export default returnSlice.reducer;
