import { createActionGroup, emptyProps } from "@ngrx/store";


export const cartDetailsActions = createActionGroup({
  source: 'Cart Details Actions',
  events: {
    pageOpened: emptyProps(),
    purchaseSuccess: emptyProps(),
  },
});
