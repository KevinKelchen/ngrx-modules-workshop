import { GlobalState } from "./product.reducer";

// Start with to demonstrate NgRx magic:
// All these creator functions are done to condense code/sugar.
// Very basic underneath. Pure fucntions.
// Very important role.
// Selector abstracting the structure of the store and not
// select in component the entire structure of `GlobalState`.
// Selector abstracts so doesn't know how pull data from Store.
// Selector can also pull from diferent palces and combine data, too
export function selectProducts(state: GlobalState) {
  return state.product.products;
}
