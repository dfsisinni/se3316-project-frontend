import { Component, OnInit, Inject } from '@angular/core';
import { NoticeResponse } from 'src/models/api/response/NoticeResponse';
import { ApiService } from 'src/services/ApiService';
import { AppStore } from 'src/redux/Store';
import { Store } from 'redux';
import { AppState } from 'src/redux/AppState';
import { Response } from 'src/models/api/response/Response';
import { NoticeRequest } from 'src/models/api/request/NoticeRequest';
import * as moment from 'moment';

@Component({
  selector: 'app-notice-view',
  templateUrl: './notice-view.component.html',
  styleUrls: ['./notice-view.component.css']
})
export class NoticeViewComponent implements OnInit {
  notices: NoticeResponse[];
  token: string;

  constructor(@Inject(AppStore) private store: Store<AppState>) { 
    const self = this;
    ApiService.getNotices(this.store.getState().user.token)
      .then((res: Response<NoticeResponse[]>) => {
        if (res && res.status) {
          self.notices = res.response;
        }
      });
      store.subscribe(() => this.readItems());
  }

  private readItems() {
    this.token = this.store.getState().user.token;
  }

  dispute(index: number) {
    const notice = this.notices[index];
    this.update(notice, index, "disputed");
  }

  resolve(index: number) {
    const notice = this.notices[index];
    this.update(notice, index, "resolved")
  }

  reinstate(index: number) {
    const notice = this.notices[index];
    let date = moment().subtract(14, "days");
    const dateOfNotice = moment.unix(notice.date);
    if (dateOfNotice.isBefore(date)) {
      alert("Unable to reinstate this notice as it is older than 14 days!");
      return;
    }

    this.update(notice, index, "reinstated");
  }

  async update(notice: NoticeResponse, index: number, status: string) {
    const request: NoticeRequest = {
      email: notice.email,
      title: notice.title,
      concern: notice.concern,
      date: notice.date,
      status: status
    };

    const result = await ApiService.updateNotice(request, notice.id, this.token);
    if (result && result.status) {
      this.notices[index].status = status;
    }
  }

  ngOnInit() {
  }

}
