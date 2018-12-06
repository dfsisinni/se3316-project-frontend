import { Component, OnInit, Inject } from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import { WishListResponse } from 'src/models/api/response/WishListResponse';
import { AppStore } from 'src/redux/Store';
import { Store } from 'redux';
import { AppState } from 'src/redux/AppState';
import { ItemResponse } from 'src/models/api/response/ItemResponse';
import { ApiService } from 'src/services/ApiService';
import { WishListRequest } from 'src/models/api/request/WishListRequest';
import { ActionCreator } from 'src/redux/ActionCreator';
import { ValidationUtility } from 'src/utilities/ValidationUtility';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class FormComponent implements OnInit {
  list: WishListResponse;
  token: string;
  items: ItemResponse[];
  newItem: boolean;
  index: number;
  canEdit: boolean;

  constructor(@Inject(MAT_DIALOG_DATA) public data: any, @Inject(AppStore) private store: Store<AppState>, public dialogRef: MatDialogRef<FormComponent>) { 
    this.token = data.token;
    this.newItem = data.newItem;
    this.index = data.index;
    this.canEdit = data.canEdit;

    if (this.data.wishList) {
      this.list = {
        ...this.data.wishList,
        items: [
          ...this.data.wishList.items
        ]
      };
    } else {
      this.list = {
        private: true,
        description: '',
        name: '',
        id: '',
        items: [],
        userId: ''
      };
    }
    
    this.store.subscribe(() => this.readItems());
    this.readItems();
  }

  private readItems() {
    const state = this.store.getState();
    this.items = state.store;
  }

  private remove(index: number) {
    this.list.items.splice(index, 1);
  }

  ngOnInit() {
  }

  private addItem() {
    this.list.items.push({
      quantity: 1,
      itemId: this.items[0].id
    });
  }

  //save wishlist
  private async save(index: number) {
    for (let i = 0; i < this.list.items.length; i++) {
      if (this.list.items[i].quantity <= 0) {
        alert("Enter valid quantities!");
        return;
      }
    }

    const request: WishListRequest = {
      name: ValidationUtility.cleanInput(this.list.name),
      private: this.list.private,
      description: ValidationUtility.cleanInput(this.list.description),
      items: this.list.items
    };
    if (this.newItem) {
      const result = await ApiService.createWishList(request, this.token);
      if (result && result.status) {
        this.dialogRef.close();
        this.store.dispatch(ActionCreator.createAddMyWishListAction(result.response));
      }
    } else {
      const result = await ApiService.updateWishList(request, this.list.id, this.token);
      if (result && result.status) {
        this.dialogRef.close();
        this.store.dispatch(ActionCreator.createUpdateMyWishListAction(this.index, this.list));
      }
    }
  }
}
