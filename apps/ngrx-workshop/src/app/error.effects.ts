import { inject } from "@angular/core";
import { MatSnackBar } from "@angular/material/snack-bar";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { tap } from "rxjs";
import { productApiActions } from "./product/actions";
import { cartActions } from "./cart/actions";

// error.effects.ts
export const handleFetchErrors = createEffect(
  (actions$ = inject(Actions), snackBar = inject(MatSnackBar)) => {
    return actions$.pipe(
      ofType(
        productApiActions.productsFetchedError,
        cartActions.fetchCartItemsError
      ),
      tap(({ errorMessage }) => {
        snackBar.open(errorMessage, 'Error', {
          duration: 2500,
        });
      })
    );
  },
  { dispatch: false, functional: true }
);
