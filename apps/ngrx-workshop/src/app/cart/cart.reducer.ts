import { CartItem } from "@angular-monorepo/api-interfaces";
import { createReducer, on } from "@ngrx/store";
import { productDetailsActions } from "../product/product-details/actions";
import { cartActions } from "./actions";

// 1. Feature key since using Feature State for slicing
export const CART_FEATURE_KEY = 'cart';

// 2. State interface
export interface CartState {
  cartItems?: CartItem[];
}

// 3. State initial state
const initialState: CartState = {
  cartItems: [],
};

// 4. Stub reducer until need action

// 5. Add StoreModule.forFeature to feature Module (uses feature key + reducer: `StoreModule.forFeature(CART_FEATURE_KEY, cartReducer)`) and add feature Module to AppModule
// Will be different if not module-based app.

// 6. Create action using `createActionGroup()`

// 7. Finish reducer
export const cartReducer = createReducer(
  initialState,
  on(productDetailsActions.addToCart, (state, { productId }) => {
    const cartItemsClone = state.cartItems ? [...state.cartItems] : [];

    const cartItemIndex = cartItemsClone.findIndex(cartItem => cartItem.productId === productId);

    if (cartItemIndex < 0) {
      cartItemsClone.push({ productId, quantity: 1 });
    } else {
      cartItemsClone.splice(cartItemIndex, 1, { productId, quantity: cartItemsClone[cartItemIndex].quantity + 1 });
    }

    return {
      ...state,
      cartItems: cartItemsClone
    };
}),
on(cartActions.fetchCartItemsSuccess, (state, { cartItems }) => {
  return {
    ...state,
    cartItems: [...cartItems]
  };
}));

// 8. Create selectors for feature using `createFeatureSelector()` and state key
// 9. Create selectors derived from feature selector
// 10. Use selectors in components
// 11. Dispatch actions from components
