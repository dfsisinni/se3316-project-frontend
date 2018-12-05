import { Component, OnInit, Inject } from '@angular/core';
import { AppStore } from 'src/redux/Store';
import { Store } from 'redux';
import { AppState } from 'src/redux/AppState';
import { ItemResponse } from 'src/models/api/response/ItemResponse';
import { UserType } from 'src/models/api/UserType';
import { ActionCreator } from 'src/redux/ActionCreator';
import { ApiService } from 'src/services/ApiService';

@Component({
  selector: 'app-store-items',
  templateUrl: './store-items.component.html',
  styleUrls: ['./store-items.component.css']
})
export class StoreItemsComponent implements OnInit {
  authorizedCustomer: boolean;
  items: ItemResponse[];
  displayedColumns = ['name', 'quantity', 'price', 'add'];

  constructor(@Inject(AppStore) private store: Store<AppState>) {
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
    if (state.user) {
      this.items = state.store;
    } else {
      this.items = state.store.filter(x => x.quantity > 0);
    }

    if (this.authorizedCustomer) {
      this.displayedColumns = ['name', 'quantity', 'price', 'add'];
    } else {
      this.displayedColumns = ['name', 'quantity', 'price'];
    }
  }

  ngOnInit() {
  }

  addToCart(index: number) {
    this.store.dispatch(ActionCreator.createChangeStoreQuantityAction(index, -1, -1));
  }

}
