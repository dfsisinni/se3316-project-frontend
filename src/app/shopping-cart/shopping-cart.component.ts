import { Component, OnInit, Inject } from '@angular/core';
import { AppStore } from 'src/redux/Store';
import { Store } from 'redux';
import { AppState } from 'src/redux/AppState';
import { ShoppingCart } from 'src/redux/objects/ShoppingCart';
import { ItemResponse } from 'src/models/api/response/ItemResponse';
import { ActionCreator } from 'src/redux/ActionCreator';

@Component({
  selector: 'app-shopping-cart',
  templateUrl: './shopping-cart.component.html',
  styleUrls: ['./shopping-cart.component.css']
})
export class ShoppingCartComponent implements OnInit {
  cart: ShoppingCart;
  token: string;
  items: ItemResponse[];

  constructor(@Inject(AppStore) private store: Store<AppState>) {
    this.store.subscribe(() => this.readItems());
  }

  private readItems() {
    const state = this.store.getState();
    this.cart = state.user.shoppingCart;
    this.token = state.user.token;
    this.items = state.store;
  }

  ngOnInit() {
  }

  increment(cartIndex: number) {
    const storeIndex = this.items.findIndex((item) => item.id === this.cart.items[cartIndex].itemId);
    const item = this.items[storeIndex];
    if (item.quantity === 0) {
      alert("Not enough available!");
      return;
    }

    this.store.dispatch(ActionCreator.createChangeStoreQuantityAction(storeIndex, -1, cartIndex));
  }

  decrement(cartIndex: number) {
    if (this.cart.items[cartIndex].quantity === 1) {
      alert("Click remove to remove the item from the cart!");
      return;
    }

    const storeIndex = this.items.findIndex((item) => item.id === this.cart.items[cartIndex].itemId);
    this.store.dispatch(ActionCreator.createChangeStoreQuantityAction(storeIndex, 1, cartIndex));
  }

  remove(index: number) {

  }

  getPrice(index: number): number {
    return 3.5;
  }

}
