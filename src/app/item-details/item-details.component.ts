import { Component, OnInit, Inject } from '@angular/core';
import {MAT_DIALOG_DATA} from '@angular/material';
import { ItemResponse } from 'src/models/api/response/ItemResponse';
import { RatingUtility } from 'src/utilities/RatingUtility';

@Component({
  selector: 'app-item-details',
  templateUrl: './item-details.component.html',
  styleUrls: ['./item-details.component.css']
})
export class ItemDetailsComponent implements OnInit {
  rating: number;
  item: ItemResponse;

  //details about each item
  constructor(@Inject(MAT_DIALOG_DATA) public data: ItemResponse) {   
    this.item = {
      ...data,
      comments: data.comments.filter(x => !x.hidden).slice(0, 5)
    };
    
    this.rating = RatingUtility.getRating(this.item.comments);
  }

  ngOnInit() {
  }

}
