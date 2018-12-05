import { Component, OnInit, Inject } from '@angular/core';
import { AppStore } from 'src/redux/Store';
import { Store } from 'redux';
import { AppState } from 'src/redux/AppState';
import { ApiService } from '../../services/ApiService';


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

  login() {
    ApiService.login(this.email, this.password)
      .then((value) => {
        if (value) {
          //TODO dispatch
          console.log(value);
        }
      });
  }

  register() {

  }

}
