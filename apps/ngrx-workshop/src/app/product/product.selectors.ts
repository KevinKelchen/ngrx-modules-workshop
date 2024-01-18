import { createSelector } from "@ngrx/store";
import { selectRouterParam } from "../router/router.selectors";
import { productFeature } from './product.reducer';

export const selectProducts = productFeature.selectProducts;

export const selectCurrentProductId = selectRouterParam('productId');

export const selectCurrentProduct = createSelector(
 selectProducts,
 selectCurrentProductId,
 (products, id) => { // Projector function
   if (id == null || !products) return undefined; // double equal covers undefined as well
   return products.find((p) => p.id === id);
 }
);
