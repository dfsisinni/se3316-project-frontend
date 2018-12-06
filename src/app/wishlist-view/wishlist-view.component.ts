import { Component, OnInit, Input, Inject } from '@angular/core';
import { WishListResponse } from 'src/models/api/response/WishListResponse';
import { AppStore } from 'src/redux/Store';
import { Store } from 'redux';
import { AppState } from 'src/redux/AppState';
import { ApiService } from 'src/services/ApiService';
import { ActionCreator } from 'src/redux/ActionCreator';
import { MatDialog } from '@angular/material';
import { FormComponent } from './form/form.component';

@Component({
  selector: 'app-wishlist-view',
  templateUrl: './wishlist-view.component.html',
  styleUrls: ['./wishlist-view.component.css']
})
export class WishlistViewComponent implements OnInit {
  wishLists: WishListResponse[];
  token: string;

  @Input()
  me: string;

  constructor(@Inject(AppStore) private store: Store<AppState>,  public dialog: MatDialog) { 
    this.store.subscribe(() => this.readItems());
    this.readItems();
    
    ApiService.getMyWishLists(this.store.getState().user.token)
    .then((response) => {
      if (response && response.status) {
        this.store.dispatch(ActionCreator.createSetMyWishListsAction(response.response));
      }
    });

    ApiService.getOtherWishLists(this.store.getState().user.token)
    .then((response) => {
      if (response && response.status) {
        this.store.dispatch(ActionCreator.createSetOtherWishListAction(response.response));
      }
    })
  }

  //read items from state
  private readItems() {
    const state = this.store.getState();
    if (this.me === "true") {
      this.wishLists = state.user.wishLists;
    } else {
      this.wishLists = state.otherLists;
    }
    this.token = state.user.token;
  }

  //remove wishlist
  async remove(index: number) {
    if (confirm("Are you sure you want to remove?")) {
      const result = await ApiService.deleteMyWishList(this.token, this.wishLists[index].id);
      if (result && result.status) {
        this.store.dispatch(ActionCreator.createDeleteMyWishListAction(index));
      }
    }
  }

  //open form dialog
  async details(index: number) {
        this.dialog.open(FormComponent, {
          data: {
            token: this.token,
            wishList: this.wishLists[index],
            newItem: false,
            index: index,
            canEdit: this.me === "true"
          }
        });
  }

  //open form dialog
  async add() {
    this.dialog.open(FormComponent, {
      data: {
        token: this.token,
        newItem: true,
        canEdit: true
      }
    })
  }



  ngOnInit() {
  }
}
