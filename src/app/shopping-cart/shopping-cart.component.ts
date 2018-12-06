import { Component, OnInit, Inject } from '@angular/core';
import { AppStore } from 'src/redux/Store';
import { Store } from 'redux';
import { AppState } from 'src/redux/AppState';
import { ItemResponse } from 'src/models/api/response/ItemResponse';
import { ActionCreator } from 'src/redux/ActionCreator';
import { ShoppingCartEntry } from 'src/redux/objects/ShoppingCartEntry';
import { ApiService } from 'src/services/ApiService';

@Component({
  selector: 'app-shopping-cart',
  templateUrl: './shopping-cart.component.html',
  styleUrls: ['./shopping-cart.component.css']
})
export class ShoppingCartComponent implements OnInit {
  cartItems: ShoppingCartEntry[];
  token: string;
  items: ItemResponse[];
  displayedColumns = ['name', 'quantity', 'price', 'increment', 'decrement', 'remove'];
  price: number = 0;

  constructor(@Inject(AppStore) private store: Store<AppState>) {
    this.store.subscribe(() => this.readItems());
  }

  //read items from state
  private readItems() {
    const state = this.store.getState();
    this.token = state.user.token;
    this.items = state.store;
    this.cartItems = state.user.shoppingCart.items;
    
    let sum = 0;

    for (let i = 0; i < this.cartItems.length; i++) {
      const price = this.getPrice(i);
      sum += price*this.cartItems[i].quantity;
    }

    this.price = sum;
  }

  ngOnInit() {
  }

  //increment cart item
  increment(cartIndex: number) {
    const storeIndex = this.items.findIndex((item) => item.id === this.cartItems[cartIndex].itemId);
    const item = this.items[storeIndex];
    if (item.quantity === 0) {
      alert("Not enough available!");
      return;
    }

    this.store.dispatch(ActionCreator.createChangeStoreQuantityAction(this.cartItems[cartIndex].itemId, -1, cartIndex));
  }

  //decrement cart item
  decrement(cartIndex: number) {
    if (this.cartItems[cartIndex].quantity === 1) {
      alert("Click remove to remove the item from the cart!");
      return;
    }

    this.store.dispatch(ActionCreator.createChangeStoreQuantityAction(this.cartItems[cartIndex].itemId, 1, cartIndex));
  }

  //remove item from cart
  remove(index: number) {
    this.store.dispatch(ActionCreator.removeItemFromCart(index));
  }

  //retrieve cart price
  getPrice(cartIndex: number): number {
    const storeIndex = this.items.findIndex((item) => item.id === this.cartItems[cartIndex].itemId);
    return this.items[storeIndex].price;
  }

  //retrieve item name
  getName(cartIndex: number): string {
    const storeIndex = this.items.findIndex((item) => item.id === this.cartItems[cartIndex].itemId);
    return this.items[storeIndex].name;
  }

  //clear cart
  clear() {
    if (confirm("Are you sure you want to clear the cart?")) {
      this.store.dispatch(ActionCreator.createClearCartAction());
    }
  }

  //buy item
  async buy() {
    if (confirm("Are you sure you want to purchase these items?")) {
      const result = await ApiService.purchaseItem(this.cartItems, this.token);
      if (result && result.status) {
        alert("RECEIPT: \n" + JSON.stringify(this.cartItems));
        this.store.dispatch(ActionCreator.createPurchaseItemsAction(result.response));
      }
    }
  }
}
