import { Component, OnInit, Inject, Input } from '@angular/core';
import { AppStore } from 'src/redux/Store';
import { Store } from 'redux';
import { AppState } from 'src/redux/AppState';
import { PolicyResponse } from 'src/models/api/response/PolicyResponse';
import { ApiService } from 'src/services/ApiService';
import { Response } from 'src/models/api/response/Response';
import { ActionCreator } from 'src/redux/ActionCreator';
import { UserType } from 'src/models/api/UserType';
import { NoticeRequest } from 'src/models/api/request/NoticeRequest';
import * as moment from 'moment';

@Component({
  selector: 'app-policy-view',
  templateUrl: './policy-view.component.html',
  styleUrls: ['./policy-view.component.css']
})
export class PolicyViewComponent implements OnInit {
  policies: PolicyResponse[];
  isUserManager: boolean;
  token: string;
  request: NoticeRequest;

  constructor(@Inject(AppStore) private store: Store<AppState>) {
    this.store.subscribe(() => this.readItems());
    this.readItems();

    this.request = {
      email: '',
      title: '',
      concern: '',
      date: moment().unix(),
      status: "Lodged"
    };
    

    ApiService.getPolicies()
      .then((res: Response<PolicyResponse[]>) => {
        if (res && res.status) {
          this.store.dispatch(ActionCreator.createSetPoliciesAction(res.response));
        }
      });
  }

  public readItems() {
    const state = this.store.getState();
    this.token = state.user ? state.user.token : "";
    this.policies = state.policies;
    this.isUserManager = state.user && state.user.type === UserType.MANAGER;
  }

  private async submitForm() {
    const result = await ApiService.createNotice(this.request);
    if (result && result.status) {
      this.request = {
        email: '',
        title: '',
        concern: '',
        date: moment().unix(),
        status: "Lodged"
      };
      alert("Notice lodged!");
    }
  }

  private save(index: number) {
    ApiService.updatePolicy({
      name: this.policies[index].name,
      body: this.policies[index].body
    }, this.policies[index].id, this.token)
      .then((res: Response<string>) => {
        if (!res.status) {
          alert(res.response);
        }
      })
  }

  ngOnInit() {
  }

}
