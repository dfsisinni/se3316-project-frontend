import { Component, Inject } from '@angular/core';
import { AppStore } from '../redux/Store';
import { Store } from 'redux';
import { AppState } from '../redux/AppState';
import { ApiService } from '../services/ApiService';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title: string;

  constructor(@Inject(AppStore) private store: Store<AppState>) {
    store.subscribe(() => this.readState());
    this.readState();
  }

  readState() {
    const state: AppState = this.store.getState();
    this.title = state.title;
  }
}
