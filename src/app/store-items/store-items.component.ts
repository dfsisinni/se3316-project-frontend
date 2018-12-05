import { Component, OnInit, Inject } from '@angular/core';
import { AppStore } from 'src/redux/Store';
import { Store } from 'redux';
import { AppState } from 'src/redux/AppState';
import { ItemResponse } from 'src/models/api/response/ItemResponse';
import { UserType } from 'src/models/api/UserType';
import { ActionCreator } from 'src/redux/ActionCreator';

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
    this.store.subscribe(() => this.readItems());
  }

  private readItems() {
    const state = this.store.getState();
    this.authorizedCustomer = state.user && state.user.type === UserType.CUSTOMER;
    this.items = state.store;
  }

  ngOnInit() {
  }

  addToCart(index: number) {
    this.store.dispatch(ActionCreator.createChangeStoreQuantityAction(index, -1, -1));
  }

}
