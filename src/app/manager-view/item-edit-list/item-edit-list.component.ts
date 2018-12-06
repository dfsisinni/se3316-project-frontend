import { Component, OnInit, Inject } from '@angular/core';
import { AppStore } from 'src/redux/Store';
import { Store } from 'redux';
import { AppState } from 'src/redux/AppState';
import { ItemResponse } from 'src/models/api/response/ItemResponse';
import { ItemRequest } from 'src/models/api/request/ItemRequest';
import { ApiService } from 'src/services/ApiService';
import { ActionCreator } from 'src/redux/ActionCreator';
import { ValidationUtility } from 'src/utilities/ValidationUtility';

@Component({
  selector: 'app-item-edit-list',
  templateUrl: './item-edit-list.component.html',
  styleUrls: ['./item-edit-list.component.css']
})
export class ItemEditListComponent implements OnInit {
  items: ItemResponse[];
  token: string;
  newItem: ItemRequest;

  //edit item list
  constructor(@Inject(AppStore) private store: Store<AppState>) { 
    this.store.subscribe(() => this.readItems());
    this.newItem = {
      name: '',
      description: '',
      quantity: 1,
      price: 1
    }
  }

  //read from state
  private readItems() {
    const state = this.store.getState();
    this.items = [
      ...state.store
    ];
    this.token = state.user.token;
  }

  ngOnInit() {
  }

  //save item
  async save(index: number) {
    const item = this.items[index];
    const err = this.validateItem(item);
    if (err.length > 0) {
      alert(err);
      return;
    }

    const itemRequest: ItemRequest = {
      name: ValidationUtility.cleanInput(item.name),
      quantity: item.quantity,
      price: item.price,
      description: ValidationUtility.cleanInput(item.description)
    };

    console.log(itemRequest);

    const result = await ApiService.updateItem(itemRequest, this.token, this.items[index].id);
    if (result && result.status) {
      const response: ItemResponse = {
        id: this.items[index].id,
        ...itemRequest,
        comments: this.items[index].comments
      }
      this.store.dispatch(ActionCreator.createReplaceItemAction(response));
    }
  }

  //validate item
  validateItem(item: ItemRequest | ItemResponse) {
    if (!item.name || item.name.length === 0) {
      return "Enter a valid name!";
    }

    if (!item.description || item.description.length === 0) {
      return "Enter a valid description!";
    }

    if (!item.quantity ||  isNaN(item.quantity) || item.quantity < 0) {
      return "Enter a valid quantity!";
    }

    if (!item.price || isNaN(item.price) || item.price < 0) {
      return "Enter a valid price!";
    }

    return "";
  }

  //add item
  async add() {
    const item = this.newItem;
    const err = this.validateItem(item);
    if (err.length > 0) {
      alert(err);
      return;
    }
    
    item.description = ValidationUtility.cleanInput(item.description);
    item.name = ValidationUtility.cleanInput(item.name);

    const result = await ApiService.createItem(item, this.token);
    if (result && result.status) {
      this.store.dispatch(ActionCreator.createAddItemAction(result.response));
      this.newItem = {
        name: '',
        description: '',
        quantity: 1,
        price: 1
      }
    }
  }

  //delete item
  async delete(index: number) {
    const itemId = this.items[index].id;

    const result = await ApiService.deleteItem(itemId, this.token);
    if (result && result.status) {
      this.store.dispatch(ActionCreator.createDeleteItemAction(itemId));
    }
  }

  //toggle item
  async toggle(email: string, index: number) {
    const item = this.items[index];
    const comment = item.comments.find(x => x.email === email);

    const res = await ApiService.modifyComment(!comment.hidden, this.token, item.id, comment.email);
    if (res && res.status) {
      comment.hidden = !comment.hidden;
    }
  }

}
