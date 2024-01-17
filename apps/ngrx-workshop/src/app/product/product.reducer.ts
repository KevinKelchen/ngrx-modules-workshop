import { createReducer, on } from "@ngrx/store";
import { ProductModel } from "../model/product";
import * as productListActions from "./product-list/actions"; // Import all and Name after where came from.
import { data } from '@angular-monorepo/mock-data';

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
  on(productListActions.productsOpened, (state) => ({
      ...state,
      products: [...data],
  }))
);
