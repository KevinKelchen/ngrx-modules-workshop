import { createFeature, createReducer, on } from '@ngrx/store';
import { EntityAdapter, createEntityAdapter, EntityState } from '@ngrx/entity';
import { ProductModel } from '../model/product';
import { productApiActions } from './actions';

export interface ProductState {
  products: EntityState<ProductModel>;
}

// If your entity's id property is different you can specify it during
// entity adapter creation.
export const productAdapter: EntityAdapter<ProductModel> = createEntityAdapter();

const initState: ProductState = {
  products: productAdapter.getInitialState()
};

export const productFeature = createFeature({
  name: 'product',
  reducer: createReducer(
    initState,
    on(productApiActions.productsFetchedSuccess, (state, { products }) => ({
      products: productAdapter.setAll(products, state.products),
    })),
    on(productApiActions.productsFetchedError, (state) => ({
      products: productAdapter.removeAll(state.products),
    })),
    on(productApiActions.singleProductFetchedSuccess, (state, { product }) => ({
      products: productAdapter.upsertOne(product, state.products),
    }))
  ),
});


// {
//       const productsClone = state.products ? [...state.products] : [];
//       const indexOfProduct = productsClone.findIndex(
//         (p) => p.id === product.id
//       );
//       // Remove old one and replace with a single product fetched
//       if (indexOfProduct < 0) {
//         productsClone.push(product);
//       } else {
//         productsClone.splice(indexOfProduct, 1, product);
//       }
//       return {
//         ...state,
//         products: productsClone,
//       };
//     }
