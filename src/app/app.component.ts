import { Component, Inject } from '@angular/core';
import { AppStore } from '../redux/Store';
import { Store } from 'redux';
import { AppState } from '../redux/AppState';
import { ApiService } from '../services/ApiService';
import { User } from 'src/redux/objects/User';
import { UserType } from 'src/models/api/UserType';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title: string;
  user: User;

  constructor(@Inject(AppStore) private store: Store<AppState>) {
    store.subscribe(() => this.readState());
    this.readState();
  }

  readState() {
    const state: AppState = this.store.getState();
    this.title = state.title;
    this.user = state.user;
  }

  isAuthenticatedCustomer() {
    return this.user && this.user.type === UserType.CUSTOMER;
  }
}
