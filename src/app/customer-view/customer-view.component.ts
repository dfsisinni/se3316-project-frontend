import { Component, OnInit, Inject } from '@angular/core';
import { AppStore } from 'src/redux/Store';
import { Store } from 'redux';
import { AppState } from 'src/redux/AppState';
import { ApiService } from 'src/services/ApiService';
import { ActionCreator } from 'src/redux/ActionCreator';

@Component({
  selector: 'app-customer-view',
  templateUrl: './customer-view.component.html',
  styleUrls: ['./customer-view.component.css']
})
export class CustomerViewComponent implements OnInit {

  constructor(@Inject(AppStore) private store: Store<AppState>) {
    ApiService.getItems()
      .then((res) => {
        if (res && res.status) {
          store.dispatch(ActionCreator.setItemAction(res.response));
        }
      });
  }

  ngOnInit() {
  }
}
