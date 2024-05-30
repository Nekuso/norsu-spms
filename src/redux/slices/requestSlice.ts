import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

const initialState: any = {
  requestOptions: [],
};

const requestSlice = createSlice({
  name: "requests",
  initialState: initialState,
  reducers: {
    setRequests: (state, action: PayloadAction<any>) => {
      const requestData = action.payload.allMainSuppliesData;
      const requestCart = action.payload.requestCart.requestCart;

      const updatedRequestCart = requestData
        ? requestData.map((request: any) => {
            const requestSupply = requestCart.find(
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

      state.requestOptions = updatedRequestCart;
    },
  },
});

export const { setRequests } = requestSlice.actions;
export default requestSlice.reducer;
