import { Component, OnInit, Inject } from '@angular/core';
import { AppStore } from 'src/redux/Store';
import { Store } from 'redux';
import { AppState } from 'src/redux/AppState';
import { ApiService } from 'src/services/ApiService';
import { ActionCreator } from 'src/redux/ActionCreator';
import { UserInfoResponse } from 'src/models/api/response/UserInfoResponse';
import { UpdateUserRequest } from 'src/models/api/request/UpdateUserRequest';
import { UserType } from 'src/models/api/UserType';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit {
  users: UserInfoResponse[];
  token: string;

  constructor(@Inject(AppStore) private store: Store<AppState>) { 
    this.store.subscribe(() => this.readItems());
    ApiService.getUsers(this.store.getState().user.token)
      .then((res) => {
        if (res && res.status) {
          const users = res.response.filter(x => typeof x.active === "boolean" && typeof x.type === "number");
          this.store.dispatch(ActionCreator.createUpdateManagerUsersAction(users));
        }
      });
  }

  private readItems() {
    const state = this.store.getState();
    this.users = state.manager.users;
    this.token = state.user.token;
  }

  private async switchActive(index: number) {
    const request: UpdateUserRequest = {
      active: !this.users[index].active,
      type: this.users[index].type
    };

    this.performUpdate(request, index);
  }

  private async switchType(index: number) {
    const request: UpdateUserRequest = {
      active: this.users[index].active,
      type: this.users[index].type === UserType.MANAGER ? UserType.CUSTOMER : UserType.MANAGER
    };

    this.performUpdate(request, index);
  }

  private async performUpdate(request: UpdateUserRequest, index: number) {
    const result = await ApiService.updateUser(this.token, request, this.users[index].id);
    if (result && result.status) {
      this.store.dispatch(ActionCreator.createUpdateUserAction(request.active, index, request.type));
    }
  }

  ngOnInit() {
  }
}