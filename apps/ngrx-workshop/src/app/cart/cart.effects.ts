import { Actions, createEffect, ofType } from "@ngrx/effects";
import { catchError, map, of, switchMap, timer } from "rxjs";
import { cartActions } from "./actions";
import { inject } from "@angular/core";
import { CartService } from "./cart.service";
import { cartDetailsActions } from "./cart-details/actions";

const REFRESH_CART_ITEMS_INTERVAL_MS = 20_000; // 2 * 60 * 60 * 1000; // Hours * Minutes * Seconds * Milliseconds

// Call immediately, then do based on interval
export const init = createEffect(() => timer(0, REFRESH_CART_ITEMS_INTERVAL_MS).pipe(
  map(() => cartActions.timerTick())
), { functional: true });

export const fetchCartItems = createEffect(
  () => {
    const cartService = inject(CartService);
    return inject(Actions).pipe(
      ofType(
        cartActions.timerTick, // Not persisting to backend, so when fetch it erases cart count
        cartDetailsActions.pageOpened,
        cartDetailsActions.purchaseSuccess
      ),
      switchMap(() =>
        cartService.getCartProducts().pipe(
          map((cartItems) => cartActions.fetchCartItemsSuccess({ cartItems })),
          catchError(() =>
            of(
              cartActions.fetchCartItemsError({
                errorMessage: 'Error Fetching Cart Items',
              })
            )
          )
        )
      )
    );
  },
  { functional: true }
);
