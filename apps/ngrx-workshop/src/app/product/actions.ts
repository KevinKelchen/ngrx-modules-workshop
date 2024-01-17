import { createActionGroup, props } from "@ngrx/store";
import { BasicProduct } from "@angular-monorepo/api-interfaces";


export const productApiActions = createActionGroup({
  source: 'Product API',
  events: {
    productsFetchedSuccess: props<{ products: BasicProduct[] }>(),
    productsFetchedError: props<{ errorMessage: string }>(),
  },
});
