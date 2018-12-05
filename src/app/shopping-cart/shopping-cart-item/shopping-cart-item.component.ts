import { Component, OnInit, Input, Inject } from '@angular/core';
import { AppStore } from 'src/redux/Store';
import { Store } from 'redux';
import { AppState } from 'src/redux/AppState';
import { ItemResponse } from 'src/models/api/response/ItemResponse';

@Component({
  selector: 'app-shopping-cart-item',
  templateUrl: './shopping-cart-item.component.html',
  styleUrls: ['./shopping-cart-item.component.css']
})
export class ShoppingCartItemComponent implements OnInit {
  @Input()
  quantity: number;

  @Input()
  itemId: number;

  shoppingStore: ItemResponse[];

  constructor(@Inject(AppStore) private store: Store<AppState>) {
    this.store.subscribe(() => this.readItems());
  }

  private readItems() {
    const state = this.store.getState();
    this.shoppingStore = state.store;
  }

  ngOnInit() {
  }
}
