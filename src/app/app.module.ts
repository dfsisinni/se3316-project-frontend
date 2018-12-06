import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { appStoreProviders } from '../redux/Store';
import { LoginComponent } from './login/login.component';
import { FormsModule } from '@angular/forms';
import { MatDialogModule, MatCheckboxModule, MatSelectModule } from '@angular/material';


import {
  MatButtonModule,
  MatFormFieldModule,
  MatInputModule,
  MatRippleModule,
  MatTabsModule,
  MatTableModule
} from '@angular/material';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { CustomerViewComponent } from './customer-view/customer-view.component';
import { ShoppingCartComponent } from './shopping-cart/shopping-cart.component';
import { ShoppingCartItemComponent } from './shopping-cart/shopping-cart-item/shopping-cart-item.component';
import { StoreItemsComponent } from './store-items/store-items.component';
import { GenericComponent } from './generic/generic.component';
import { ItemDetailsComponent } from './item-details/item-details.component';
import { AddCommentComponent } from './add-comment/add-comment.component';
import { WishlistViewComponent } from './wishlist-view/wishlist-view.component';
import { FormComponent } from './wishlist-view/form/form.component';
import { ManagerViewComponent } from './manager-view/manager-view.component';
import { UserListComponent } from './manager-view/user-list/user-list.component';
import { ItemEditListComponent } from './manager-view/item-edit-list/item-edit-list.component';
import { PolicyViewComponent } from './policy-view/policy-view.component';
import { NoticeViewComponent } from './notice-view/notice-view.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    CustomerViewComponent,
    ShoppingCartComponent,
    ShoppingCartItemComponent,
    StoreItemsComponent,
    GenericComponent,
    ItemDetailsComponent,
    AddCommentComponent,
    WishlistViewComponent,
    FormComponent,
    ManagerViewComponent,
    UserListComponent,
    ItemEditListComponent,
    PolicyViewComponent,
    NoticeViewComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatRippleModule,
    BrowserAnimationsModule,
    FormsModule,
    MatTabsModule,
    MatTableModule,
    MatDialogModule,
    MatCheckboxModule,
    MatSelectModule
  ],
  exports: [ItemDetailsComponent, AddCommentComponent, FormComponent, MatInputModule, MatFormFieldModule],
  providers: [appStoreProviders],
  bootstrap: [AppComponent],
  entryComponents: [ItemDetailsComponent, AddCommentComponent, FormComponent]
})
export class AppModule { }
