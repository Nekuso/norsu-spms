import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

const initialState: any = {
  mainSuppliesCart: [],
};

const mainSuppliesCart = createSlice({
  name: "mainSuppliesCart",
  initialState: initialState,
  reducers: {
    addMainSuppliesToCart: (state, action: PayloadAction<any>) => {
      if (
        state.mainSuppliesCart.some(
          (mainSupply: any) => mainSupply.barcode === action.payload.barcode
        )
      ) {
        state.mainSuppliesCart = state.mainSuppliesCart.map(
          (mainSupply: any) => {
            if (mainSupply.barcode === action.payload.barcode) {
              return { ...mainSupply, quantity: mainSupply.quantity + 1 };
            }
            return mainSupply;
          }
        );
        return;
      }

      state.mainSuppliesCart.push(action.payload);
    },
    removeMainSuppliesFromCart: (state, action: PayloadAction<any>) => {
      state.mainSuppliesCart = state.mainSuppliesCart.filter(
        (mainSupply: any) => mainSupply.barcode !== action.payload
      );
    },

    incrementMainSuppliesQuantity: (state, action: PayloadAction<any>) => {
      state.mainSuppliesCart = state.mainSuppliesCart.map((mainSupply: any) => {
        if (mainSupply.barcode === action.payload) {
          return { ...mainSupply, quantity: mainSupply.quantity + 1 };
        }
        return mainSupply;
      });
    },
    decrementMainSuppliesQuantity: (state, action: PayloadAction<any>) => {
      state.mainSuppliesCart = state.mainSuppliesCart
        .map((mainSupply: any) => {
          if (mainSupply.barcode === action.payload) {
            if (mainSupply.quantity === 1) {
              return null; // Remove the mainSupply from cart
            } else {
              return { ...mainSupply, quantity: mainSupply.quantity - 1 };
            }
          }
          return mainSupply;
        })
        .filter((mainSupply: any) => mainSupply !== null);
    },
    resetCart: (state) => {
      state.mainSuppliesCart = [];
    },
  },
});

export const {
  addMainSuppliesToCart,
  removeMainSuppliesFromCart,
  incrementMainSuppliesQuantity,
  decrementMainSuppliesQuantity,
  resetCart,
} = mainSuppliesCart.actions;
export default mainSuppliesCart.reducer;
