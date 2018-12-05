import { Component, OnInit, Inject } from '@angular/core';
import { AppStore } from 'src/redux/Store';
import { Store } from 'redux';
import { AppState } from 'src/redux/AppState';
import { ApiService } from '../../services/ApiService';
import { ActionCreator } from 'src/redux/ActionCreator';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  email: string;
  password: string;

  constructor(@Inject(AppStore) private store: Store<AppState>) {
    this.email = '';
    this.password = '';
  }

  ngOnInit() {
  }

  async login() {
    const response = await ApiService.login(this.email, this.password);
    if (response && response.status) {
      const token = response.response.token;
      const me = await ApiService.me(token);
      if (me && me.status) {
        if (!me.response.active) {
          alert("Contact the store manager your account is inactie!");
        } else {
          this.store.dispatch(ActionCreator.createLoginAction(token, me.response));
        }
      }
    }
  }

  async register() {
    const response = await ApiService.register(this.email, this.password);
    if (response && response.status) {
      const token = response.response.token;
      const me = await ApiService.me(token);
      if (me && me.status) {
          this.store.dispatch(ActionCreator.createLoginAction(token, me.response));
      }
    }
  }
}
