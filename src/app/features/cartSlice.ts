import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { RootState } from "../store"; // Adjust the import path as needed
import { addProductToCart } from "../../utils";
import { IProduct } from "../../interfaces";

export interface IInitialState {
  cartProducts: IProduct[];
}

export const initialState: IInitialState = {
  cartProducts: [],
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action: PayloadAction<IProduct>) => {
      state.cartProducts = addProductToCart(action.payload, state.cartProducts);
    },
    RemoveFromCart: (state, action: PayloadAction<number>) => {
      state.cartProducts = state.cartProducts.filter(
        (product) => product.id !== action.payload
      );
    },
    clearCart: (state) => {
      state.cartProducts = [];
    },
  },
});

export const { addToCart, RemoveFromCart, clearCart } = cartSlice.actions;
export const selectCart = (state: RootState) => state.cart;
export default cartSlice.reducer;
