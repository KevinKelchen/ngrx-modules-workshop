import { Component, OnInit } from '@angular/core';
import { map, Observable, shareReplay } from 'rxjs';

import { Rating } from '@angular-monorepo/api-interfaces';
import { RatingService } from '../rating.service';

import { ProductModel } from '../../model/product';
import { ProductService } from '../product.service';
import { Store } from "@ngrx/store";
import { GlobalState } from "../product.reducer";
import { productsOpened } from "./actions";
import { selectProducts } from "../product.selector";

@Component({
  selector: 'ngrx-workshop-home',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss'],
})
export class ProductListComponent implements OnInit {
  // Assumption that if undefined, no data yet.
  products$?: Observable<ProductModel[] | undefined> = this.store.select(selectProducts);
  customerRatings$?: Observable<{ [productId: string]: Rating }>;

  constructor(
    private readonly productService: ProductService,
    private readonly ratingService: RatingService,
    private readonly store: Store<GlobalState>
  ) {}

  ngOnInit() {
    // Invoke action as function.
    this.store.dispatch(productsOpened());

    this.customerRatings$ = this.ratingService.getRatings().pipe(
      map((ratingsArray) =>
        // Convert from Array to Indexable.
        ratingsArray.reduce(
          (acc: { [productId: string]: Rating }, ratingItem) => {
            acc[ratingItem.productId] = ratingItem.rating;
            return acc;
          },
          {}
        )
      ),
      shareReplay({
        refCount: true,
        bufferSize: 1,
      })
    );
  }
}
