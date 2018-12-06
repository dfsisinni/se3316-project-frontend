import { Component, OnInit, Inject } from '@angular/core';
import { ItemWithRating } from 'src/models/ItemWithRating';
import {MAT_DIALOG_DATA} from '@angular/material';

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

  constructor(@Inject(MAT_DIALOG_DATA) public data: any) {
    this.item = data.item;
    this.email = data.email
  }

  ngOnInit() {
  }

  values() {
    console.log(this.comment);
    console.log(this.rating);
    console.log(this.item);
  }

}
