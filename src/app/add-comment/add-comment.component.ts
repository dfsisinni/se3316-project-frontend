import { Component, OnInit, Inject } from '@angular/core';
import { ItemWithRating } from 'src/models/ItemWithRating';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import { ApiService } from 'src/services/ApiService';
import { AppStore } from 'src/redux/Store';
import { AppState } from 'src/redux/AppState';
import { Store } from 'redux';
import { ActionCreator } from 'src/redux/ActionCreator';
import { CommentResponse } from 'src/models/api/response/CommentResponse';
import * as moment from 'moment';
import { ValidationUtility } from 'src/utilities/ValidationUtility';

@Component({
  selector: 'app-add-comment',
  templateUrl: './add-comment.component.html',
  styleUrls: ['./add-comment.component.css']
})
export class AddCommentComponent implements OnInit {
  item: ItemWithRating;
  email: string;

  comment: string;
  rating: number;
  token: string;

  constructor(@Inject(MAT_DIALOG_DATA) public data: any, @Inject(AppStore) private store: Store<AppState>, public dialogRef: MatDialogRef<AddCommentComponent>) {
    this.item = data.item;
    this.email = data.email
    this.token = data.token;
  }

  ngOnInit() {
  }

  //create comment
  async createComment() {
    if (!this.comment || this.comment.length === 0) {
      alert("Please enter a valid comment!");
      return;
    } 

    if (!this.rating || this.rating < 0 || this.rating > 5) {
      alert("Please enter a rating between 0 and 5 inclusive!");
      return;
    }

    if (confirm("Are you sure you want to create a comment?")) {
      const comment = await ApiService.createComment(this.comment, this.rating, this.item.id, this.token);
      if (comment && comment.status) {
        const resp: CommentResponse = {
          email: this.email,
          rating: this.rating,
          comment: ValidationUtility.cleanInput(this.comment),
          createdOn: moment().unix(),
          hidden: false
        };
        this.store.dispatch(ActionCreator.createAddCommentAction(resp, this.item.id));
        this.dialogRef.close();
      }
    }
  }

}
