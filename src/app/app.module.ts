import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { appStoreProviders } from '../redux/Store';
import { LoginComponent } from './login/login.component';
import { FormsModule } from '@angular/forms';


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

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    CustomerViewComponent,
    ShoppingCartComponent,
    ShoppingCartItemComponent,
    StoreItemsComponent
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
    MatTableModule
  ],
  providers: [appStoreProviders],
  bootstrap: [AppComponent],
})
export class AppModule { }
