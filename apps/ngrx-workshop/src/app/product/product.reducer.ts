import { createReducer, on } from "@ngrx/store";
import { ProductModel } from "../model/product";
import * as productApiActions from './actions'; // Import all and Name after where came from.

export interface GlobalState {
  product: ProductState;
}

export interface ProductState {
  products?: ProductModel[]; // Nullable because nothing to start with?
}

// Typed correctly for reducer inferring
const initialState: ProductState = {
  products: undefined,
};

export const productReducer = createReducer(
  initialState,
  on(productApiActions.productApiActions.productsFetchedSuccess, (state, {products}) => ({
      ...state,
      products: [...products],
  })),
  on(productApiActions.productApiActions.productsFetchedError, (state) => ({
    ...state,
    products: []
  })),
);
