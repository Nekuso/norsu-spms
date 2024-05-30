import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

const initialState: any = {
  requestCart: [],
};

const requestCart = createSlice({
  name: "requestCart",
  initialState: initialState,
  reducers: {
    setRequestCart: (state, action: PayloadAction<any>) => {
      if (
        state.requestCart.some(
          (request: any) => request.barcode === action.payload.barcode
        )
      ) {
        state.requestCart = state.requestCart
          .map((request: any) => {
            if (request.barcode === action.payload.barcode) {
              return { ...request, quantity: action.payload.quantity };
            }
            return request;
          })
          .filter((request: any) => request.quantity > 0); // remove items with quantity <= 0
        return;
      }

      if (action.payload.quantity > 0) {
        // only add items with quantity > 0
        state.requestCart.push(action.payload);
      }
    },
    addRequestToCart: (state, action: PayloadAction<any>) => {
      if (
        state.requestCart.some(
          (request: any) => request.barcode === action.payload.barcode
        )
      ) {
        state.requestCart = state.requestCart.map((request: any) => {
          if (request.barcode === action.payload.barcode) {
            return { ...request, quantity: request.quantity + 1 };
          }
          return request;
        });
        return;
      }

      state.requestCart.push(action.payload);
    },
    removeRequestFromCart: (state, action: PayloadAction<any>) => {
      state.requestCart = state.requestCart.filter(
        (request: any) => request.barcode !== action.payload
      );
    },

    incrementRequestQuantity: (state, action: PayloadAction<any>) => {
      state.requestCart = state.requestCart.map((request: any) => {
        if (request.barcode === action.payload) {
          return { ...request, quantity: request.quantity + 1 };
        }
        return request;
      });
    },
    decrementRequestQuantity: (state, action: PayloadAction<any>) => {
      state.requestCart = state.requestCart
        .map((request: any) => {
          if (request.barcode === action.payload) {
            if (request.quantity <= 1) {
              state.requestCart = state.requestCart.filter(
                (r: any) => r.barcode !== action.payload
              );
              return null; // Remove the request from cart
            } else {
              return { ...request, quantity: request.quantity - 1 };
            }
          }
          return request;
        })
        .filter((request: any) => request !== null);
    },
    resetCart: (state) => {
      state.requestCart = [];
    },
  },
});

export const {
  setRequestCart,
  addRequestToCart,
  removeRequestFromCart,
  incrementRequestQuantity,
  decrementRequestQuantity,
  resetCart,
} = requestCart.actions;
export default requestCart.reducer;
