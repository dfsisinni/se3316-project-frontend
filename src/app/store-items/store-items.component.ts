import { Component, OnInit, Inject, Input } from '@angular/core';
import { AppStore } from 'src/redux/Store';
import { Store } from 'redux';
import { AppState } from 'src/redux/AppState';
import { ItemResponse } from 'src/models/api/response/ItemResponse';
import { UserType } from 'src/models/api/UserType';
import { ActionCreator } from 'src/redux/ActionCreator';
import { ApiService } from 'src/services/ApiService';
import { MatDialog } from '@angular/material';
import { ItemDetailsComponent } from '../item-details/item-details.component';
import { ItemWithRating } from 'src/models/ItemWithRating';
import { RatingUtility } from 'src/utilities/RatingUtility';
import { AddCommentComponent } from '../add-comment/add-comment.component';

@Component({
  selector: 'app-store-items',
  templateUrl: './store-items.component.html',
  styleUrls: ['./store-items.component.css']
})
export class StoreItemsComponent implements OnInit {
  authorizedCustomer: boolean;
  items: ItemWithRating[];
  displayedColumns = ['name', 'quantity', 'price', 'rating', 'add', 'details'];
  email: string;

  @Input() sortLimitTen: boolean;

  constructor(@Inject(AppStore) private store: Store<AppState>, public dialog: MatDialog) {
    ApiService.getItems()
      .then((res) => {
        if (res && res.status) {
          store.dispatch(ActionCreator.setItemAction(res.response));
        }
      });

    this.store.subscribe(() => this.readItems());
  }

  private readItems() {
    const state = this.store.getState();
    this.authorizedCustomer = state.user && state.user.type === UserType.CUSTOMER;
    if (!state.user || (state.user && state.user.type === UserType.CUSTOMER)) {
      this.items = state.store.filter(x => x.quantity> 0).map((it) => {
        const validComments = it.comments.filter(c => !c.hidden);
        const rating = RatingUtility.getRating(validComments);

        return {
          ...it,
          validComments: validComments.slice(0, 5),
          rating: rating
        };
      });

      console.log(this.sortLimitTen);
      if (this.sortLimitTen) {
        this.items = this.items.sort((a: ItemWithRating, b: ItemWithRating) => {
          return a.rating - b.rating;
        }).slice(0, 10);
      }

    } else {
      this.items = state.store.map((it) => {
        const rating = RatingUtility.getRating(it.comments);
        return {
          ...it,
          rating: rating
        };
      });
    }

    if (state.user) {
      this.email = state.user.email;
    }

    if (this.authorizedCustomer) {
      this.displayedColumns = ['name', 'quantity', 'price', 'rating', 'add', 'comment', 'details'];
    } else {
      this.displayedColumns = ['name', 'quantity', 'price', 'rating', 'details'];
    }
  }

  public details(index: number) {
    this.dialog.open(ItemDetailsComponent, {
      data: this.items[index]
    });
  }

  public addComment(index: number) {
    const item = this.items[index];
    if (item.comments.filter(x => x.email === this.email).length > 0) {
      alert("You have already commented on this item and are unable to add another comment!");
      return;
    }
    this.dialog.open(AddCommentComponent, {
      data: {
        item: this.items[index],
        userId: this.email
      }
    });
  }

  ngOnInit() {
  }

  addToCart(index: number) {
    this.store.dispatch(ActionCreator.createChangeStoreQuantityAction(this.items[index].id, -1, -1));
  }

}
